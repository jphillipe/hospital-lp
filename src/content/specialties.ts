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
 * ## About `conditions` and `services`
 *
 * These were empty until the owner asked for them to be drafted. **Every entry
 * is ordinary scope of practice for the discipline, and none of it has been
 * confirmed by the practice** — which is why `listsConfirmed` is `false` on all
 * four. That flag is load-bearing: the detail page prints a provisional note
 * beside the lists, and the chat corpus labels them unconfirmed so the
 * assistant never offers one of them as a service the practice provides.
 *
 * The line held while drafting: name what the discipline ordinarily helps with,
 * and never anything implying a piece of equipment, a named programme, a
 * protocol, a credential or a clinician this practice has not said it has.
 * Nothing here mentions video visits, because `faqs.ts` says they do not exist
 * yet — the two files have to agree.
 *
 * Flip `listsConfirmed` to `true` per specialty as the practice signs each one
 * off, and delete anything it does not actually do.
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
    conditions: [
      "High blood pressure",
      "Type 2 diabetes",
      "High cholesterol",
      "Asthma and long-term breathing problems",
      "Thyroid conditions",
      "Coughs, colds and infections",
      "Rashes and other skin complaints",
      "Aches, sprains and minor injuries",
      "Heartburn and digestive complaints",
      "Stress, low mood and anxiety — the first conversation",
    ],
    services: [
      "Annual physicals and well visits",
      "Ongoing care for long-term conditions",
      "Appointments for new symptoms",
      "Blood pressure and blood sugar checks",
      "Vaccinations",
      "Prescription reviews and repeat prescriptions",
      "Well-child checks and school forms",
      "Referrals into the other three services here",
    ],
    listsConfirmed: false,
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
    conditions: [
      "Several long-term conditions at once",
      "A long list of medicines to keep track of",
      "Memory changes and confusion",
      "Falls and unsteadiness",
      "Losing strength, appetite or weight",
      "Trouble getting around the house",
      "Bladder and bowel problems",
      "Sleep problems",
      "Low mood and isolation in later life",
    ],
    services: [
      "Unhurried first visits that cover the whole picture",
      "Reviews of everything the person is taking",
      "A first conversation about memory concerns",
      "Falls and steadiness reviews",
      "Appointments arranged with a family member in the room",
      "Planning conversations with the family",
      "Coordination with the other services here",
    ],
    listsConfirmed: false,
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
    conditions: [
      "Anxiety and constant worry",
      "Low mood and depression",
      "Stress and burnout",
      "Grief and bereavement",
      "A change you did not choose",
      "Trouble sleeping",
      "Strain in a relationship or a family",
      "Adjusting to a new diagnosis",
      "The weight of caring for someone else",
    ],
    services: [
      "Talking therapy, one to one",
      "A first appointment without a referral",
      "Sessions planned around what you want to change",
      "Support for family carers",
      "Working alongside your primary care clinician",
    ],
    listsConfirmed: false,
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
    conditions: [
      "Back and neck pain",
      "Knee, hip and shoulder pain",
      "Recovering from an operation",
      "Sports and everyday injuries",
      "Arthritis and stiff joints",
      "Balance problems and unsteadiness",
      "Getting going again after an illness",
    ],
    services: [
      "An assessment of how you move",
      "Hands-on treatment sessions",
      "Exercises written to do at home",
      "Rehabilitation after surgery or injury",
      "Balance work and falls prevention",
      "Advice on getting back to work or to a sport",
    ],
    listsConfirmed: false,
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
