import { google } from "@ai-sdk/google";
import { streamText } from "ai";

import { assistant } from "@/content/assistant";
import { buildFallbackAnswer } from "@/lib/assistant/fallback";
import { buildKnowledgeContext } from "@/lib/assistant/knowledge";
import { buildSystemPrompt } from "@/lib/assistant/prompt";
import { clientKey, consume } from "@/lib/assistant/rate-limit";
import { detectEmergency } from "@/lib/assistant/safety";
import { chatRequestSchema } from "@/lib/assistant/schema";
import { hasModelKey, serverEnv } from "@/lib/env.server";

/**
 * PLAN.md §2 reserved this file; the last line of that document says it is
 * "what settles it". The assistant band has posted nowhere since v1.
 *
 * Node runtime, not edge: `env.server.ts` and `queries.ts` are both
 * `server-only`, and the corpus is built per request from the content layer.
 *
 * The route never returns an error to the user. Every failure path — no key,
 * bad key, exhausted quota, a timeout, a throw mid-stream — ends in
 * `buildFallbackAnswer`, which searches the published FAQ instead. A free tier
 * that Google can cut without notice is not something to hang a feature on
 * without a floor underneath it.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Generous, because the answer streams: a slow reply is visibly arriving, so
 * this is a ceiling on a hung request rather than a speed limit. Measured
 * warm at 7s a question against the free tier, which contends.
 */
const MODEL_TIMEOUT_MS = 30_000;

/**
 * Gemini 3.x counts its reasoning against this budget, not just the words the
 * visitor reads. At 700 the thinking ate most of it and answers arrived cut off
 * mid-sentence, so the ceiling is set for the worst case rather than the
 * typical one — nothing is billed for headroom that goes unused.
 */
const MAX_OUTPUT_TOKENS = 2000;

/** A complete answer, sent as one chunk on the same stream shape as the model. */
function textResponse(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export async function POST(request: Request): Promise<Response> {
  const limit = consume(clientKey(request));
  if (!limit.allowed) {
    return new Response(assistant.panel.rateLimitReply, {
      status: 429,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store",
        "retry-after": String(limit.retryAfter),
      },
    });
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return textResponse(assistant.panel.errorMessage, 400);
  }

  const { messages } = parsed.data;
  const question = messages[messages.length - 1]?.content ?? "";

  /*
   * Before the model, before the corpus, before anything that can vary between
   * runs. `safety.ts` explains why this is a regex and not an instruction.
   */
  if (detectEmergency(question)) {
    return textResponse(assistant.panel.emergencyReply);
  }

  if (!hasModelKey) {
    return textResponse(await buildFallbackAnswer(question));
  }

  const system = buildSystemPrompt(await buildKnowledgeContext());

  /*
   * `streamText` does not reject, and it does not throw on the stream either:
   * a rejected key or an exhausted quota is reported to `onError` and the text
   * stream simply ends with nothing in it. So a silent empty stream is a
   * failure, and has to be treated as one — the first version of this route
   * returned a cheerful `200` with an empty body for every bad key.
   *
   * Pulling the first chunk here is what makes the fallback possible: nothing
   * has been sent to the client yet, so it can still take over the whole
   * response rather than trail an apology after half an answer.
   */
  let failed = false;
  let iterator: AsyncIterator<string>;
  let first: IteratorResult<string>;

  try {
    const result = streamText({
      model: google(serverEnv.ASSISTANT_MODEL),
      system,
      messages,
      temperature: 0.3,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      abortSignal: AbortSignal.timeout(MODEL_TIMEOUT_MS),
      /*
       * Every fact this assistant is allowed to state is already in the prompt,
       * so extended reasoning buys nothing and costs ten seconds a question.
       * `thinkingLevel` is the Gemini 3.x control; `thinkingBudget` is the 2.5
       * one and is rejected here.
       */
      providerOptions: {
        google: { thinkingConfig: { thinkingLevel: "minimal" } },
      },
      onError: ({ error }) => {
        failed = true;
        /* The fallback hides this from the visitor; it must not hide it from the logs. */
        console.error("[api/chat] model call failed", error);
      },
    });

    iterator = result.textStream[Symbol.asyncIterator]();
    first = await iterator.next();
  } catch (error) {
    console.error("[api/chat] model call threw", error);
    return textResponse(await buildFallbackAnswer(question));
  }

  if (failed || first.done === true) {
    return textResponse(await buildFallbackAnswer(question));
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();

      /*
       * Past this point the answer is already part-sent, so the fallback
       * cannot replace it. Finishing with a phone number beats leaving a
       * truncated sentence on screen — which is what a mid-stream failure
       * looks like, since the stream ends rather than throwing.
       */
      const apologise = () => {
        controller.enqueue(
          encoder.encode(`\n\n${assistant.panel.errorMessage}`),
        );
      };

      try {
        controller.enqueue(encoder.encode(first.value));

        let next = await iterator.next();
        while (next.done !== true) {
          controller.enqueue(encoder.encode(next.value));
          next = await iterator.next();
        }

        if (failed) apologise();
      } catch (error) {
        console.error("[api/chat] stream failed mid-answer", error);
        apologise();
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
