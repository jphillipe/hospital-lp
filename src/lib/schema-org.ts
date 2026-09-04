import { formatDoctorName } from "@/lib/format";
import type { Doctor, Faq, Location, OpeningHours } from "@/types/content";

/**
 * Structured data — PLAN.md §1 item 11 and §7 item 9.
 *
 * Pure, so it is unit-testable without a DOM and without a render, and it
 * takes the origin as an argument rather than reading `env` so the module
 * carries no build-time state.
 *
 * **The organisation is a `MedicalClinic`, not a `Hospital`.** It was
 * `Hospital` from the hospital era and stayed that way through the repositioning.
 * `Hospital` is the schema.org type for an inpatient institution, while
 * `site.ts` states in its own doc comment that this is an outpatient practice
 * with no emergency department and `site.emergencyNotice` says so to every
 * visitor. Emitting `Hospital` told search engines the opposite of what the page
 * says — and on a medical site the consequence of that is somebody arriving at
 * the door with chest pain. `MedicalClinic` is the truthful type and, being a
 * `MedicalOrganization` too, keeps every property already used here.
 */

interface JsonLdPostalAddress {
  readonly "@type": "PostalAddress";
  readonly streetAddress: string;
  readonly addressLocality: string;
  readonly addressRegion: string;
  readonly postalCode: string;
  readonly addressCountry: string;
}

interface JsonLdOpeningHours {
  readonly "@type": "OpeningHoursSpecification";
  readonly name: string;
  readonly dayOfWeek: readonly string[];
  readonly opens: string;
  readonly closes: string;
}

export interface MedicalClinicSchema {
  readonly "@context": "https://schema.org";
  readonly "@type": "MedicalClinic";
  readonly "@id": string;
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly telephone: string;
  readonly address: JsonLdPostalAddress;
  readonly openingHoursSpecification: readonly JsonLdOpeningHours[];
  readonly medicalSpecialty?: readonly string[];
  readonly geo?: {
    readonly "@type": "GeoCoordinates";
    readonly latitude: number;
    readonly longitude: number;
  };
}

/**
 * schema.org has no way to say "never closes", so the convention is a full
 * midnight-to-midnight span — `23:59` rather than `24:00`, which validators
 * reject.
 */
const ALL_DAY = { opens: "00:00", closes: "23:59" } as const;

function toPostalAddress(location: Location): JsonLdPostalAddress {
  return {
    "@type": "PostalAddress",
    streetAddress: location.address.street,
    addressLocality: location.address.city,
    addressRegion: location.address.region,
    postalCode: location.address.postalCode,
    addressCountry: location.address.country,
  };
}

function toOpeningHours(hours: OpeningHours): JsonLdOpeningHours {
  const span =
    hours.opens === null || hours.closes === null
      ? ALL_DAY
      : { opens: hours.opens, closes: hours.closes };

  return {
    "@type": "OpeningHoursSpecification",
    name: hours.label,
    dayOfWeek: hours.days,
    ...span,
  };
}

interface MedicalClinicSchemaInput {
  readonly location: Location;
  /** Canonical origin. A trailing slash is tolerated and stripped. */
  readonly origin: string;
  /** Display names, for `medicalSpecialty`. Omitted from the output when empty. */
  readonly specialties?: readonly string[];
}

export function buildMedicalClinicSchema({
  location,
  origin,
  specialties,
}: MedicalClinicSchemaInput): MedicalClinicSchema {
  const base = origin.replace(/\/+$/, "");

  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    // Stable identity — every Physician node points back at this id.
    "@id": `${base}/#${location.slug}`,
    name: location.name,
    description: location.description,
    url: base,
    telephone: location.phone,
    address: toPostalAddress(location),
    openingHoursSpecification: location.hours.map(toOpeningHours),
    ...(specialties === undefined || specialties.length === 0
      ? {}
      : { medicalSpecialty: specialties }),
    ...(location.geo === null
      ? {}
      : {
          geo: {
            "@type": "GeoCoordinates" as const,
            latitude: location.geo.latitude,
            longitude: location.geo.longitude,
          },
        }),
  };
}

export interface PhysicianSchema {
  readonly "@context": "https://schema.org";
  readonly "@type": "Physician";
  readonly "@id": string;
  readonly name: string;
  readonly url: string;
  readonly jobTitle: string;
  readonly description: string;
  readonly medicalSpecialty: readonly string[];
  readonly knowsLanguage: readonly string[];
  readonly worksFor: { readonly "@id": string };
  readonly address: JsonLdPostalAddress;
  readonly telephone: string;
  readonly alumniOf?: readonly {
    readonly "@type": "EducationalOrganization";
    readonly name: string;
  }[];
  readonly image?: string;
}

/**
 * `Physician` structured data for a profile page.
 *
 * The `Doctor` record has carried education, board certifications and languages
 * since it was written and none of it was ever expressed to a crawler. This is
 * the node that does it, and `worksFor` points at the clinic's `@id` — which is
 * what PLAN.md §5 item 4 reserved the slug-as-identity for.
 *
 * `image` is omitted rather than emitted empty while `photo.src` is `null`: an
 * absent portrait is not a broken one.
 */
export function buildPhysicianSchema({
  doctor,
  origin,
  location,
  specialtyNames,
  languageNames,
}: {
  readonly doctor: Doctor;
  readonly origin: string;
  readonly location: Location;
  readonly specialtyNames: Readonly<Record<string, string>>;
  readonly languageNames: Readonly<Record<string, string>>;
}): PhysicianSchema {
  const base = origin.replace(/\/+$/, "");
  const url = `${base}/doctors/${doctor.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${url}#physician`,
    name: formatDoctorName(doctor),
    url,
    jobTitle: doctor.title,
    description: doctor.bio,
    medicalSpecialty: doctor.specialtySlugs.map(
      (slug) => specialtyNames[slug] ?? slug,
    ),
    knowsLanguage: doctor.languages.map((code) => languageNames[code] ?? code),
    worksFor: { "@id": `${base}/#${location.slug}` },
    address: toPostalAddress(location),
    telephone: location.phone,
    ...(doctor.education.length === 0
      ? {}
      : {
          alumniOf: doctor.education.map((entry) => ({
            "@type": "EducationalOrganization" as const,
            name: entry.institution,
          })),
        }),
    ...(doctor.photo.src === null ? {} : { image: `${base}${doctor.photo.src}` }),
  };
}

export interface BreadcrumbListSchema {
  readonly "@context": "https://schema.org";
  readonly "@type": "BreadcrumbList";
  readonly itemListElement: readonly {
    readonly "@type": "ListItem";
    readonly position: number;
    readonly name: string;
    readonly item: string;
  }[];
}

/**
 * `BreadcrumbList` for the detail routes. The trail rendered on the page and
 * the one emitted here take the same array, so they cannot disagree.
 */
export function buildBreadcrumbSchema({
  trail,
  origin,
}: {
  readonly trail: readonly { readonly name: string; readonly path: string }[];
  readonly origin: string;
}): BreadcrumbListSchema {
  const base = origin.replace(/\/+$/, "");

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: `${base}${entry.path}`,
    })),
  };
}

interface JsonLdQuestion {
  readonly "@type": "Question";
  readonly "@id": string;
  readonly name: string;
  readonly acceptedAnswer: {
    readonly "@type": "Answer";
    readonly text: string;
  };
}

export interface FaqPageSchema {
  readonly "@context": "https://schema.org";
  readonly "@type": "FAQPage";
  readonly mainEntity: readonly JsonLdQuestion[];
}

/**
 * `FAQPage` structured data — PLAN.md §1 item 12 and §7 item 9.
 *
 * Each question is addressed by slug against the origin, which gives the v2
 * chat a citation anchor it can link to and Google a stable node id.
 */
export function buildFaqPageSchema({
  faqs,
  origin,
}: {
  readonly faqs: readonly Faq[];
  readonly origin: string;
}): FaqPageSchema {
  const base = origin.replace(/\/+$/, "");

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      "@id": `${base}/#faq-${faq.slug}`,
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
