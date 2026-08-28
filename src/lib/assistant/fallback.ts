import "server-only";

import { getFaqs } from "@/content/queries";
import { site } from "@/content/site";
import { formatPhone } from "@/lib/format";

/**
 * What the assistant says when the model is unreachable.
 *
 * The Gemini free tier is not a contract: Google cut free quotas by 50-80% in
 * December 2025 without notice, the allowance disappears the moment billing is
 * enabled on the project, and the practical rate varies by region. Any of
 * those turns into a failed request here. The answer to that is not a retry
 * banner — it is the corpus the FAQ was always meant to be, searched directly.
 *
 * The scoring is intentionally crude: stemmed word overlap, no embeddings, no
 * dependency. It only has to beat "something went wrong".
 */

/** Words too common to distinguish one FAQ from another. */
const STOP_WORDS = new Set([
  "about",
  "and",
  "any",
  "are",
  "been",
  "but",
  "can",
  "does",
  "for",
  "from",
  "get",
  "got",
  "has",
  "have",
  "how",
  "its",
  "need",
  "not",
  "some",
  "than",
  "that",
  "the",
  "their",
  "them",
  "there",
  "they",
  "this",
  "use",
  "want",
  "was",
  "what",
  "when",
  "where",
  "which",
  "who",
  "why",
  "will",
  "with",
  "would",
  "you",
  "your",
]);

/**
 * Enough of a stemmer that "where can I park" reaches an answer that says
 * "parking". A real stemmer would be a dependency, and this is not a search
 * engine — it is the thing that runs when the search engine is down.
 */
function stem(word: string): string {
  if (word.length > 4) {
    if (word.endsWith("ing")) return word.slice(0, -3);
    if (word.endsWith("ies")) return `${word.slice(0, -3)}y`;
    if (word.endsWith("es")) return word.slice(0, -2);
    if (word.endsWith("ed")) return word.slice(0, -2);
  }
  if (word.length > 3 && word.endsWith("s")) return word.slice(0, -1);
  return word;
}

function stems(text: string): ReadonlySet<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .split(" ")
      .filter((word) => word.length > 2 && !STOP_WORDS.has(word))
      .map(stem),
  );
}

function overlap(asked: ReadonlySet<string>, corpus: ReadonlySet<string>) {
  let count = 0;
  for (const word of asked) {
    if (corpus.has(word)) count += 1;
  }
  return count;
}

/**
 * A hit in the question counts double: "Where do I park?" is six words long
 * and every one of them is about parking, while an answer is a paragraph in
 * which an incidental match means much less.
 */
const QUESTION_WEIGHT = 2;

/** Below this, the honest answer is a phone number rather than a near miss. */
const MIN_SCORE = 3;

/**
 * The published answer closest to the question, or the practice's own "call
 * us" line when nothing is close enough. Never empty, never an error string.
 */
export async function buildFallbackAnswer(question: string): Promise<string> {
  const asked = stems(question);
  const faqs = await getFaqs();

  let best: { readonly answer: string; readonly score: number } | undefined;

  for (const faq of faqs) {
    const score =
      QUESTION_WEIGHT * overlap(asked, stems(faq.question)) +
      overlap(asked, stems(faq.answer));

    if (best === undefined || score > best.score) {
      best = { answer: faq.answer, score };
    }
  }

  if (best === undefined || best.score < MIN_SCORE) {
    return `I could not reach the assistant just now, so I can only give you what is already published on this site — and it does not cover that. Call the main line on ${formatPhone(site.phones.main)} and say what you are trying to do; whoever picks up can route you, and there is no wrong department to start from.`;
  }

  return `I could not reach the assistant just now, so here is the closest answer already published on this site.\n\n${best.answer}\n\nIf that is not what you needed, call the main line on ${formatPhone(site.phones.main)}.`;
}
