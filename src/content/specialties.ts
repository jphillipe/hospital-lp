import type { SpecialtiesSectionContent, Specialty } from "@/types/content";
import { site } from "@/content/site";

export const specialtiesSection = {
  eyebrow: "Specialties",
  heading: "Care for every stage, on one campus.",
  lead: "Our centers of excellence share one medical record and one scheduling line, so a referral does not mean starting over somewhere else.",
  conditionsLabel: "Conditions we treat",
  moreLabel: "Also on campus:",
} as const satisfies SpecialtiesSectionContent;

/**
 * Conditions and services are general medicine, not claims about this
 * hospital. Nothing here asserts an outcome, a volume, a ranking or an
 * accreditation, because none of that has been supplied.
 *
 * `floor` is `null` throughout on purpose: there is no campus map yet, and a
 * pavilion and level invented here would send a real visitor down a real
 * corridor. `phone` reuses the numbers already in `site.ts` rather than ten
 * invented departmental lines.
 */
export const specialties = [
  {
    slug: "cardiology",
    name: "Cardiology",
    tagline: "Heart care from prevention through complex intervention.",
    description:
      "Our cardiology team treats the full range of cardiovascular disease, from blood pressure and cholesterol management through to catheter-based intervention. Diagnostics, procedures and cardiac rehabilitation sit within the same service, so a workup does not become a tour of the building.",
    icon: "heart-pulse",
    featured: true,
    order: 1,
    conditions: [
      "Coronary artery disease",
      "Atrial fibrillation",
      "Heart failure",
    ],
    services: [
      "Echocardiography",
      "Cardiac catheterization",
      "Cardiac rehabilitation",
    ],
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
      title: "Cardiology",
      description:
        "Cardiovascular care at Dighton Medical Center: prevention, diagnostics, intervention and cardiac rehabilitation.",
    },
  },
  {
    slug: "neurology",
    name: "Neurology & Stroke",
    tagline: "Time-critical stroke care and long-term neurological support.",
    description:
      "Stroke is treated as a clock rather than a queue: imaging, assessment and treatment run in parallel from the moment you arrive. Beyond stroke, the team manages the long-term neurological conditions that need the same clinician year after year.",
    icon: "brain",
    featured: true,
    order: 2,
    conditions: ["Stroke", "Epilepsy", "Multiple sclerosis"],
    services: [
      "CT and MR imaging",
      "EEG monitoring",
      "Neurological rehabilitation",
    ],
    locationSlug: "main-campus",
    floor: null,
    phone: site.phones.appointments,
    acceptingNewPatients: true,
    booking: {
      enabled: true,
      requiresReferral: true,
      appointmentTypes: ["new-patient", "follow-up", "second-opinion"],
    },
    seo: {
      title: "Neurology & Stroke",
      description:
        "Stroke care, epilepsy and long-term neurological conditions at Dighton Medical Center.",
    },
  },
  {
    slug: "orthopedics",
    name: "Orthopedics & Sports Medicine",
    tagline: "Getting bones, joints and muscles back to work.",
    description:
      "From a fracture that arrives through the emergency department to a planned joint replacement, orthopedic care runs through one team. Physical therapy is part of the plan from the first appointment rather than an afterthought at the end.",
    icon: "bone",
    featured: true,
    order: 3,
    conditions: ["Osteoarthritis", "Sports injuries", "Fractures"],
    services: ["Joint replacement", "Arthroscopic surgery", "Physical therapy"],
    locationSlug: "main-campus",
    floor: null,
    phone: site.phones.appointments,
    acceptingNewPatients: true,
    booking: {
      enabled: true,
      requiresReferral: false,
      appointmentTypes: ["new-patient", "follow-up", "second-opinion"],
    },
    seo: {
      title: "Orthopedics & Sports Medicine",
      description:
        "Joint replacement, arthroscopic surgery, fracture care and physical therapy at Dighton Medical Center.",
    },
  },
  {
    slug: "oncology",
    name: "Cancer Care",
    tagline: "One team around you, from diagnosis through survivorship.",
    description:
      "Medical oncology, radiation oncology and surgery meet as a single tumor board, so treatment decisions are made together rather than passed between offices. Infusion, imaging and supportive care are on the same campus as your appointments.",
    icon: "syringe",
    featured: true,
    order: 4,
    conditions: ["Breast cancer", "Colorectal cancer", "Lung cancer"],
    services: ["Medical oncology", "Radiation therapy", "Infusion services"],
    locationSlug: "main-campus",
    floor: null,
    phone: site.phones.appointments,
    acceptingNewPatients: true,
    booking: {
      enabled: true,
      requiresReferral: true,
      appointmentTypes: ["new-patient", "follow-up", "second-opinion"],
    },
    seo: {
      title: "Cancer Care",
      description:
        "Medical oncology, radiation therapy and infusion services at Dighton Medical Center.",
    },
  },
  {
    slug: "womens-health",
    name: "Women’s Health & Maternity",
    tagline: "Obstetric, gynecologic and newborn care in one place.",
    description:
      "Prenatal visits, delivery and postpartum care are handled by a team that stays with you throughout rather than handing you on at each stage. Gynecologic care continues well past the childbearing years, including menopause and pelvic health.",
    icon: "baby",
    featured: true,
    order: 5,
    conditions: ["High-risk pregnancy", "Endometriosis", "Uterine fibroids"],
    services: ["Prenatal care", "Labor and delivery", "Gynecologic surgery"],
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
      title: "Women’s Health & Maternity",
      description:
        "Prenatal care, labor and delivery, gynecologic surgery and pelvic health at Dighton Medical Center.",
    },
  },
  {
    slug: "primary-care",
    name: "Primary Care",
    tagline: "The physician who knows your whole history.",
    description:
      "Primary care is the front door: annual physicals, chronic disease management, vaccinations, and the referrals that open every other service here. Seeing the same physician over years is what makes the rest of this list work.",
    icon: "stethoscope",
    featured: true,
    order: 6,
    conditions: ["Hypertension", "Type 2 diabetes", "High cholesterol"],
    services: [
      "Annual physicals",
      "Chronic disease management",
      "Immunizations",
    ],
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
        "Annual physicals, chronic disease management and immunizations at Dighton Medical Center.",
    },
  },
  {
    slug: "emergency-medicine",
    name: "Emergency Medicine",
    tagline: "Round-the-clock care for injury and acute illness.",
    description:
      "The emergency department is staffed every hour of every day and is the right route for any symptom that cannot wait. It is not a bookable service: come in, or call 911 if the situation is life-threatening.",
    icon: "activity",
    featured: false,
    order: 7,
    conditions: ["Chest pain", "Severe injury", "Acute infection"],
    services: ["Trauma resuscitation", "Emergency imaging", "Observation unit"],
    locationSlug: "main-campus",
    floor: null,
    phone: site.phones.emergencyDepartment,
    acceptingNewPatients: true,
    booking: {
      enabled: false,
      requiresReferral: false,
      appointmentTypes: [],
    },
    seo: {
      title: "Emergency Medicine",
      description:
        "The Dighton Medical Center emergency department, open 24 hours a day, every day.",
    },
  },
  {
    slug: "imaging",
    name: "Imaging & Radiology",
    tagline: "The pictures the rest of your care depends on.",
    description:
      "Imaging supports nearly every service on this campus, from a suspected fracture in the emergency department through to staging a tumor. Studies are read by radiologists who sit on the same campus as the team that ordered them.",
    icon: "scan",
    featured: false,
    order: 8,
    conditions: ["Suspected fracture", "Abdominal pain", "Vascular disease"],
    services: ["MRI", "CT", "Ultrasound"],
    locationSlug: "main-campus",
    floor: null,
    phone: site.phones.appointments,
    acceptingNewPatients: true,
    booking: {
      enabled: true,
      requiresReferral: true,
      appointmentTypes: ["new-patient"],
    },
    seo: {
      title: "Imaging & Radiology",
      description:
        "MRI, CT and ultrasound at Dighton Medical Center, read on campus by our radiologists.",
    },
  },
  {
    slug: "ophthalmology",
    name: "Ophthalmology",
    tagline: "Sight, checked and protected.",
    description:
      "Routine vision screening sits alongside surgical care for cataracts and glaucoma, so a finding at a check-up does not mean a referral off campus. Patients living with diabetes are screened here for retinal disease on the same visit schedule as their other care.",
    icon: "eye",
    featured: false,
    order: 9,
    conditions: ["Cataracts", "Glaucoma", "Diabetic retinopathy"],
    services: ["Cataract surgery", "Retinal imaging", "Vision screening"],
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
      title: "Ophthalmology",
      description:
        "Cataract surgery, glaucoma care, retinal imaging and vision screening at Dighton Medical Center.",
    },
  },
  {
    slug: "laboratory",
    name: "Laboratory Medicine",
    tagline: "Results your care team can act on the same day.",
    description:
      "Blood work, pathology and microbiology run on campus, which is what lets a clinic visit end with an answer rather than a wait. Specimens are collected here with an order from any Dighton physician.",
    icon: "microscope",
    featured: false,
    order: 10,
    conditions: ["Anemia", "Thyroid disorders", "Infection"],
    services: ["Blood testing", "Pathology", "Microbiology"],
    locationSlug: "main-campus",
    floor: null,
    phone: site.phones.main,
    acceptingNewPatients: true,
    booking: {
      enabled: false,
      requiresReferral: true,
      appointmentTypes: [],
    },
    seo: {
      title: "Laboratory Medicine",
      description:
        "Blood testing, pathology and microbiology performed on campus at Dighton Medical Center.",
    },
  },
] as const satisfies readonly Specialty[];
