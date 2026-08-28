import type { Doctor, DoctorsSectionContent } from "@/types/content";

export const doctorsSection = {
  eyebrow: "Find a clinician",
  heading: "Every referral here has a name attached.",
  lead: "Call the appointment line and ask for any of them by name. If you would rather not choose, say so — we will match you.",
  bookWithLabel: "Book with Dr.",
  languagesLabel: "Speaks",
  acceptingLabel: "Accepting new patients",
  notAcceptingLabel: "Not accepting new patients",
  moreLabel: "Also practising here:",
  pendingNotice:
    "Only the primary care clinicians are listed so far. The geriatric, psychology and physical therapy teams will appear here once the practice supplies them — they are left blank rather than invented.",
  languageNames: {
    en: "English",
    es: "Spanish",
    pt: "Portuguese",
    fr: "French",
    zh: "Mandarin",
    ar: "Arabic",
  },
} as const satisfies DoctorsSectionContent;

/**
 * Two invented physicians for an invented practice; the footer disclaimer
 * covers them.
 *
 * The roster was ten longer when this site described a full hospital. Those
 * ten led cardiology, neurology, oncology, maternity, imaging, the laboratory
 * and the emergency department — none of which the practice offers — so they
 * were removed with the services rather than relabelled. **Do not replace them
 * by inventing a geriatrician, a psychologist and a physical therapist.**
 * `doctorsSection.pendingNotice` says the roster is incomplete, which is true
 * and is the behaviour `CLAUDE.md` asks for; the names are the client's to
 * supply. Git holds the removed twelve if any of them come back.
 *
 * `photo.src` is `null` for both and the card renders a monogram: a stock or
 * generated face would put a real person's likeness behind a physician who
 * does not exist. The 600x800 dimensions are already in the record so the
 * switch to real portraits is a one-field edit with no layout drift.
 */
const photoOf = (name: string) =>
  ({
    src: null,
    alt: `Portrait of ${name}`,
    width: 600,
    height: 800,
  }) as const;

export const doctors = [
  {
    slug: "leila-haddad",
    firstName: "Leila",
    lastName: "Haddad",
    credentials: ["MD", "FAAP"],
    title: "Family Medicine Physician",
    primarySpecialtySlug: "primary-care",
    specialtySlugs: ["primary-care"],
    photo: photoOf("Dr. Leila Haddad"),
    bio: "Dr. Haddad looks after whole families, from newborn checks through to adult chronic care, and keeps the histories connected across them.",
    education: [
      {
        institution: "American University of Beirut Faculty of Medicine",
        degree: "MD",
        year: 2012,
      },
      {
        institution: "Lahey Hospital and Medical Center",
        degree: "Residency, Family Medicine",
        year: 2016,
      },
    ],
    boardCertifications: [
      "American Board of Family Medicine",
      "American Board of Pediatrics",
    ],
    languages: ["en", "ar", "fr"],
    yearsOfExperience: 13,
    locationSlugs: ["main-campus"],
    acceptingNewPatients: true,
    featured: true,
    order: 1,
    booking: {
      enabled: true,
      providerId: null,
      appointmentTypes: ["new-patient", "annual-physical", "telehealth"],
    },
  },
  {
    slug: "james-whitlock",
    firstName: "James",
    lastName: "Whitlock",
    credentials: ["DO"],
    title: "Primary Care Physician",
    primarySpecialtySlug: "primary-care",
    specialtySlugs: ["primary-care"],
    photo: photoOf("Dr. James Whitlock"),
    bio: "Dr. Whitlock has kept the same panel of patients for over a decade. He handles annual physicals, blood pressure, diabetes and the referrals that open every other service here.",
    education: [
      {
        institution: "Philadelphia College of Osteopathic Medicine",
        degree: "DO",
        year: 2010,
      },
      {
        institution: "Baystate Medical Center",
        degree: "Residency, Family Medicine",
        year: 2013,
      },
    ],
    boardCertifications: ["American Board of Family Medicine"],
    languages: ["en"],
    yearsOfExperience: 15,
    locationSlugs: ["main-campus"],
    acceptingNewPatients: false,
    featured: true,
    order: 2,
    booking: {
      enabled: true,
      providerId: null,
      appointmentTypes: ["follow-up", "annual-physical", "telehealth"],
    },
  },
] as const satisfies readonly Doctor[];
