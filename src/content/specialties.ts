import type { SpecialtiesSectionContent, Specialty } from "@/types/content";
import { site } from "@/content/site";

export const specialtiesSection = {
  eyebrow: "Care for every stage of life",
  heading: "How can we help you?",
  lead: "Four services, described the way you would describe them yourself. You do not need to know which kind of clinician you need — pick what sounds closest, or let us work it out with you.",
  moreLabel: "Also available here:",
  pendingNotice:
    "This is the starting list. More services will be added here once they are confirmed.",
} as const satisfies SpecialtiesSectionContent;

/**
 * The four services the client named, in her words.
 *
 * `tagline` is the whole card. It is written for someone who does not know
 * the difference between a primary care physician, a geriatrician and a
 * psychologist, and should not have to learn it to book a visit.
 *
 * **`conditions` and `services` are empty on purpose.** They feed the v2
 * detail page and the chat's grounding corpus, and neither can be filled in
 * from here without inventing clinical claims — `CLAUDE.md` forbids that.
 * `SpecialtiesSection` renders `pendingNotice` while they are empty.
 *
 * `floor` is `null` throughout for the same reason it always was: there is no
 * campus map yet. `phone` reuses the numbers in `site.ts` rather than four
 * invented departmental lines.
 */
export const specialties = [
  {
    slug: "primary-care",
    name: "Primary Care",
    tagline: "Your everyday healthcare needs.",
    description:
      "Primary care is the front door. It is where check-ups, ongoing conditions and new symptoms are handled, and where a referral to anything else here starts. Seeing the same clinician over years is what makes the rest of this list work.",
    icon: "stethoscope",
    featured: true,
    order: 1,
    conditions: [],
    services: [],
    locationSlug: "main-campus",
    floor: null,
    phone: site.phones.appointments,
    acceptingNewPatients: true,
    booking: {
      enabled: true,
      requiresReferral: false,
      appointmentTypes: [
        "new-patient",
        "annual-physical",
        "follow-up",
        "telehealth",
      ],
    },
    seo: {
      title: "Primary Care",
      description:
        "Everyday healthcare at Dighton Medical Center: check-ups, ongoing conditions and new symptoms.",
    },
  },
  {
    slug: "geriatric-care",
    name: "Geriatric Care",
    tagline: "Specialized care for older adults.",
    description:
      "Care built around getting older: several conditions at once, a long list of medicines, memory and mobility, and the questions families ask on an older adult's behalf. You can call about a parent, and you do not need to know what to ask for first.",
    icon: "heart-handshake",
    featured: true,
    order: 2,
    conditions: [],
    services: [],
    locationSlug: "main-campus",
    floor: null,
    phone: site.phones.appointments,
    acceptingNewPatients: true,
    booking: {
      enabled: true,
      requiresReferral: false,
      appointmentTypes: ["new-patient", "follow-up", "telehealth"],
    },
    seo: {
      title: "Geriatric Care",
      description:
        "Specialized care for older adults at Dighton Medical Center, for patients and for the families who help them.",
    },
  },
  {
    slug: "psychology",
    name: "Psychology",
    tagline: "Mental health and emotional well-being.",
    description:
      "Talking to someone about how you are coping — with stress, low mood, anxiety, grief or a change you did not choose. You do not need a diagnosis or a referral to make the first call.",
    icon: "brain",
    featured: true,
    order: 3,
    conditions: [],
    services: [],
    locationSlug: "main-campus",
    floor: null,
    phone: site.phones.appointments,
    acceptingNewPatients: true,
    booking: {
      enabled: true,
      requiresReferral: false,
      appointmentTypes: ["new-patient", "follow-up", "telehealth"],
    },
    seo: {
      title: "Psychology",
      description:
        "Mental health and emotional well-being support at Dighton Medical Center.",
    },
  },
  {
    slug: "physical-therapy",
    name: "Physical Therapy",
    tagline: "Movement, rehabilitation and recovery.",
    description:
      "Getting moving again after an injury, an operation or a long stretch of pain — and staying steady on your feet. Sessions are hands-on and the plan is written around what you actually need to be able to do.",
    icon: "person-standing",
    featured: true,
    order: 4,
    conditions: [],
    services: [],
    locationSlug: "main-campus",
    floor: null,
    phone: site.phones.appointments,
    acceptingNewPatients: true,
    booking: {
      enabled: true,
      requiresReferral: false,
      appointmentTypes: ["new-patient", "follow-up"],
    },
    seo: {
      title: "Physical Therapy",
      description:
        "Movement, rehabilitation and recovery at Dighton Medical Center.",
    },
  },
] as const satisfies readonly Specialty[];
