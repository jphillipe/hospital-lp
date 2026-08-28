/**
 * Turning what the model wrote into links the site can stand behind.
 *
 * `prompt.ts` asks it to mark a service it is pointing at as `[primary-care]`.
 * This pulls those markers out of the prose and returns the slugs separately,
 * so the interface can build the link from `specialtyNames` — our own content —
 * rather than from anything the model produced.
 *
 * That is the whole point of the marker over a plain URL: a slug that is not in
 * `specialtyNames` is left in the text as written and never becomes a link, so
 * an invented service cannot turn into a 404. No markdown parser, and no
 * dependency, for the same reason.
 */
const SLUG_MARKER = /\[([a-z][a-z0-9-]*)\]/g;

export interface ParsedAnswer {
  readonly text: string;
  readonly slugs: readonly string[];
}

export function parseAnswer(
  content: string,
  specialtyNames: Readonly<Record<string, string>>,
): ParsedAnswer {
  const slugs: string[] = [];

  const text = content
    .replace(SLUG_MARKER, (marker, slug: string) => {
      if (!Object.hasOwn(specialtyNames, slug)) return marker;
      if (!slugs.includes(slug)) slugs.push(slug);
      return "";
    })
    /* A removed marker leaves a doubled space, or a space before punctuation. */
    .replace(/ {2,}/g, " ")
    .replace(/ ([.,;:!?])/g, "$1")
    .trim();

  return { text, slugs };
}
