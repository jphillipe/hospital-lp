import "server-only";

import { z } from "zod";

/**
 * Server-only environment, kept apart from `env.ts` on purpose.
 *
 * `env.ts` is imported by modules that end up in the browser bundle, where
 * `process.env.GOOGLE_GENERATIVE_AI_API_KEY` is `undefined` — putting the key
 * in that schema would either leak it or fail the parse on every page load.
 * `import "server-only"` makes the mistake a build error rather than a bug.
 *
 * The key is **optional**. `/api/chat` degrades to the FAQ fallback when it is
 * missing, so the site builds and runs without a Google account — and so a
 * revoked or exhausted key never takes the assistant down.
 */
const serverEnvSchema = z.object({
  GOOGLE_GENERATIVE_AI_API_KEY: z
    .string()
    .trim()
    .min(1)
    .optional()
    .catch(undefined),
  /**
   * Google moves which models carry a free tier without notice, so the model
   * id is configuration, not a constant. See `.env.example`.
   */
  ASSISTANT_MODEL: z.string().trim().min(1).default("gemini-3.5-flash"),
});

const parsed = serverEnvSchema.safeParse({
  GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  ASSISTANT_MODEL: process.env.ASSISTANT_MODEL,
});

if (!parsed.success) {
  throw new Error(
    `Invalid server environment variables:\n${z.prettifyError(parsed.error)}`,
  );
}

export const serverEnv = parsed.data;

export type ServerEnv = z.infer<typeof serverEnvSchema>;

/** Whether the model can be reached at all. Drives the fallback branch. */
export const hasModelKey = serverEnv.GOOGLE_GENERATIVE_AI_API_KEY !== undefined;
