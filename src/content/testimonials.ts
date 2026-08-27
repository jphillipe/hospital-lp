import type { TestimonialsSectionContent } from "@/types/content";

/**
 * PLAN.md §1 item 09. Invented, like the rest of this hospital, and the
 * `disclaimer` below is required by the type rather than by memory.
 *
 * Every quote is about **the experience** — coordination, language, whether
 * anyone explained — and none is about an outcome. A fictional patient saying
 * a treatment worked is a claim about medical efficacy wearing a human face,
 * which is a worse thing to invent than a bed count. Keep new quotes on the
 * same side of that line.
 */
export const testimonialsSection = {
  eyebrow: "Patient stories",
  heading: "What people remember afterwards.",
  lead: "Rarely the diagnosis. Usually whether anyone explained, and whether they had to tell the story twice.",
  testimonials: [
    {
      id: "mary",
      quote:
        "I came in through the emergency department and left with a cardiology appointment already booked. Nobody asked me to repeat my history twice.",
      attribution: "Mary R.",
      context: "Cardiology patient",
    },
    {
      id: "tiago",
      quote:
        "My mother speaks very little English. They found a physician who speaks Portuguese, and the whole thing stopped being frightening for her.",
      attribution: "Tiago F.",
      context: "Son of a patient",
    },
    {
      id: "alan",
      quote:
        "The surgeon explained what would happen in plain language, and then again when I asked. That is the part I remember.",
      attribution: "Alan W.",
      context: "Orthopedics patient",
    },
  ],
  disclaimer:
    "These stories were written for this demonstration site. They are not real patients and describe no real episode of care.",
} as const satisfies TestimonialsSectionContent;
