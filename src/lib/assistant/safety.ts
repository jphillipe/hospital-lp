/**
 * The emergency interceptor — the one safety layer that is not a prompt.
 *
 * PLAN.md §5 item 11 requires an emergency route beside every chat entry
 * point, and `site.ts` is explicit that this practice has no emergency
 * department. A model instructed to say "call 911" is a model that will
 * usually say it; a regex that fires before the request leaves the server
 * always says it, in the same words, with no latency and no token spend.
 *
 * Bias is deliberately toward false positives. Someone typing "I am not
 * having chest pain" gets an unnecessary 911 notice, which costs them one
 * sentence. The inverse costs more, so negation is not modelled.
 *
 * Bare "emergency" is **not** a pattern: "do you have an emergency room?" is a
 * question about the practice, answered from `faqs.ts`, not a crisis.
 */
const EMERGENCY_PATTERNS: readonly RegExp[] = [
  // Cardiac
  /\bchest (?:pain|pressure|tightness)\b/,
  /\bpain in (?:my|his|her|their) chest\b/,
  /\bheart attack\b/,
  /\bcardiac arrest\b/,

  // Airway and breathing
  /\b(?:can ?not|cant|can't|unable to|struggling to) breathe\b/,
  /\b(?:trouble|difficulty|problems) breathing\b/,
  /\bshort(?:ness)? of breath\b/,
  /\bchoking\b/,
  /\bthroat (?:is )?closing\b/,
  /\banaphyla(?:xis|ctic)\b/,
  /\bsevere allergic reaction\b/,

  // Neurological
  /\bstroke\b/,
  /\bface (?:is )?drooping\b/,
  /\bslurred speech\b/,
  /\bsudden (?:numbness|weakness|confusion)\b/,
  /\b(?:seizure|convulsion|convulsing)\b/,

  // Trauma and bleeding
  /\bsevere bleeding\b/,
  /\bbleeding (?:heavily|badly|a lot)\b/,
  /\b(?:will ?not|wont|won't) stop bleeding\b/,
  /\bbleeding (?:will ?not|wont|won't|does ?n'?t) stop\b/,
  /\bh(?:a)?emorrhag(?:e|ing)\b/,
  /\bsevere burn\b/,

  // Consciousness
  /\bunconscious\b/,
  /\bunresponsive\b/,
  /\bpassed out\b/,
  /\b(?:not|isn't|isnt) (?:waking|responding)\b/,

  // Poisoning
  /\boverdos(?:e|ed|ing)\b/,
  /\bpoison(?:ed|ing)\b/,

  // Self-harm — routed to 911 with the same certainty as the rest.
  /\bsuicid(?:e|al)\b/,
  /\bkill(?:ing)? (?:myself|himself|herself|themselves)\b/,
  /\bend (?:my|his|her|their) life\b/,
  /\b(?:self[- ]harm|harm(?:ing)? myself|hurt(?:ing)? myself)\b/,
];

/** Lowercase, and every non-letter run collapsed to one space. */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9']+/g, " ")
    .trim();
}

/**
 * Whether the message describes something that belongs in an ambulance rather
 * than in this chat. The route short-circuits on `true` and never calls the
 * model.
 */
export function detectEmergency(text: string): boolean {
  const normalized = normalize(text);
  if (normalized === "") return false;

  return EMERGENCY_PATTERNS.some((pattern) => pattern.test(normalized));
}
