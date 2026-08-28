import type { CtaBandContent } from "@/types/content";
import { site } from "@/content/site";

/**
 * PLAN.md §1 item 13 — the last conversion, phone and Book.
 *
 * The two are not redundant even though `BookCta` is a `tel:` href today. One
 * is a tap target, the other is a number you can read off the screen and dial
 * from another phone, and in v2 `BookCta` becomes `/book` while the number
 * stays a number. That is why the plan lists both.
 */
export const ctaBand = {
  heading: "Ready when you are.",
  body: "One number books every service here, and you can call on someone else's behalf.",
  phoneLabel: "Or call the appointment line",
  emergencyNote: site.emergencyNotice,
} as const satisfies CtaBandContent;
