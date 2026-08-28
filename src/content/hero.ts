import type { HeroContent } from "@/types/content";

/**
 * One frame. The carousel that used to live here rotated the offer away from
 * anyone who reads slowly, and most people arriving at this site are either an
 * older adult or the adult child of one.
 *
 * `handoff` is the line that carries the eye into the specialties grid, so the
 * two are written as one sentence split across two sections. Change one and
 * change the other.
 *
 * `alt` describes what is in the photograph, not what the hero is arguing — a
 * screen reader user should learn the picture, not hear the headline twice.
 */
export const hero = {
  eyebrow: "Dighton Medical Center",
  title: "Personalized care. Close to home.",
  body: "Healthcare for you and your family, in person or virtually.",
  handoff: "How can we help you?",
  secondaryAction: {
    label: "Not sure what you need?",
    href: "#care-finder",
  },
  media: {
    src: "/images/hero/hero-doctors.jpg",
    alt: "A clinician in blue scrubs with arms folded, holding a stethoscope, in a hospital corridor.",
  },
} as const satisfies HeroContent;
