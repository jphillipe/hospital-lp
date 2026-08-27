import type { HeroContent } from "@/types/content";

/**
 * Three slides, identical structure. No figure, ranking, award or wait time
 * appears here: none of it has been supplied, and none of it may be invented.
 * Every `media.src` is `null`, so `HeroMedia` renders a marked block and the
 * `alt` string doubles as the brief for the photographer.
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
        src: null,
        alt: "Emergency department entrance at night, ambulance canopy lit.",
      },
    },
    {
      id: "specialties",
      eyebrow: "Centers of excellence",
      title: "Specialty care, close to home.",
      body: "Specialty services sit on one campus, so your records, referrals and care team stay in one place.",
      cta: { label: "Explore specialties", href: "/#specialties" },
      media: {
        src: null,
        alt: "Clinician and patient in consultation, natural light, mid-shot.",
      },
    },
    {
      id: "doctors",
      eyebrow: "Find a doctor",
      title: "Start with the right physician.",
      body: "Search our physicians by specialty and by the languages they speak, then book by phone.",
      cta: { label: "Find a doctor", href: "/#doctors" },
      media: {
        src: null,
        alt: "Physician portrait in a clinic corridor, shallow depth of field.",
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
