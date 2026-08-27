import type { HeroContent } from "@/types/content";

/**
 * No figure, ranking, award or wait time appears here: none of it has been
 * supplied, and none of it may be invented.
 *
 * `alt` describes what is in the photograph, not what the slide is arguing —
 * a screen reader user should learn the picture, not hear the headline twice.
 */
export const hero = {
  carouselLabel: "Dighton Medical Center highlights",
  slides: [
    {
      id: "emergency",
      eyebrow: "Emergency department",
      title: "Open every hour of every day.",
      body: "Our emergency department is staffed around the clock, every day of the year.",
      cta: { label: "Emergency & urgent care", href: "/#emergency" },
      media: {
        src: "/images/hero/hero-emergency.jpg",
        alt: "A surgical team at work around an operating table, seen through the theatre doorway.",
      },
    },
    {
      id: "specialties",
      eyebrow: "Centers of excellence",
      title: "Specialty care, close to home.",
      body: "Specialty services sit on one campus, so your records, referrals and care team stay in one place.",
      cta: { label: "Explore specialties", href: "/#specialties" },
      media: {
        src: "/images/hero/hero-specialties.jpg",
        alt: "A laboratory technician in a white coat and cap examining a sample under a microscope.",
      },
    },
    {
      id: "doctors",
      eyebrow: "Find a doctor",
      title: "Start with the right physician.",
      body: "Search our physicians by specialty and by the languages they speak, then book by phone.",
      cta: { label: "Find a doctor", href: "/#doctors" },
      media: {
        src: "/images/hero/hero-doctors.jpg",
        alt: "A clinician in blue scrubs with arms folded, holding a stethoscope, in a hospital corridor.",
      },
    },
  ],
  labels: {
    previous: "Previous slide",
    next: "Next slide",
    pause: "Pause the carousel",
    play: "Play the carousel",
    slidePosition: "Slide %n of %total",
    progressLabel: "Go to slide %n",
  },
} as const satisfies HeroContent;
