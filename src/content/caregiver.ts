import type { CaregiverBandContent } from "@/types/content";

/**
 * Written for the son or daughter, not for the patient. It is the only section
 * on the page addressed to someone acting on another person's behalf, and it
 * is deliberately placed straight after the specialties grid — the moment
 * where a caregiver has just read "Geriatric Care" and is wondering whether it
 * is the right door.
 *
 * `points` describe **how starting works**, never what the clinic can achieve.
 * A promise about an outcome is a clinical claim; a promise that one phone
 * call is enough is a process the practice controls. Keep new lines on the
 * same side of that.
 */
export const caregiverBand = {
  eyebrow: "For families",
  heading: "Caring for an older adult?",
  lead: "Our geriatric team is here to help.",
  body: "You do not need to know what to ask for. Call on your parent's behalf, describe what you have noticed, and we will tell you what the first appointment should be.",
  points: [
    "You can call for a parent, and book on their behalf.",
    "One number covers every service here — there is no wrong department to start from.",
    "Bring the list of medicines they take, or read it to us over the phone.",
  ],
  action: { label: "Learn about Geriatric Care", href: "#specialties" },
  phoneLabel: "Or call and ask for geriatric care",
} as const satisfies CaregiverBandContent;
