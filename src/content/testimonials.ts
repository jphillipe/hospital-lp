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
      id: "tiago",
      quote:
        "I called about my mother, not about myself, and nobody made that awkward. They told me which appointment to book before I had finished explaining.",
      attribution: "Tiago F.",
      context: "Son of a patient",
    },
    {
      id: "mary",
      quote:
        "I take nine different medicines and I have never once had to list them from memory here. Somebody had already read the file.",
      attribution: "Mary R.",
      context: "Geriatric care patient",
    },
    {
      id: "alan",
      quote:
        "She explained what the exercises were for in plain language, and then again when I asked. That is the part I remember.",
      attribution: "Alan W.",
      context: "Physical therapy patient",
    },
  ],
  disclaimer:
    "These stories were written for this demonstration site. They are not real patients and describe no real episode of care.",
} as const satisfies TestimonialsSectionContent;
