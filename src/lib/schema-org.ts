import type { Faq, Location, OpeningHours } from "@/types/content";

/**
 * `Hospital` structured data — PLAN.md §1 item 11 and §7 item 9.
 *
 * Pure, so it is unit-testable without a DOM and without a render, and it
 * takes the origin as an argument rather than reading `env` so the module
 * carries no build-time state.
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

export interface HospitalSchema {
  readonly "@context": "https://schema.org";
  readonly "@type": "Hospital";
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

interface HospitalSchemaInput {
  readonly location: Location;
  /** Canonical origin. A trailing slash is tolerated and stripped. */
  readonly origin: string;
  /** Display names, for `medicalSpecialty`. Omitted from the output when empty. */
  readonly specialties?: readonly string[];
}

export function buildHospitalSchema({
  location,
  origin,
  specialties,
}: HospitalSchemaInput): HospitalSchema {
  const base = origin.replace(/\/+$/, "");

  return {
    "@context": "https://schema.org",
    "@type": "Hospital",
    // Stable identity, so a v2 Physician or Department can point back at it.
    "@id": `${base}/#${location.slug}`,
    name: location.name,
    description: location.description,
    url: base,
    telephone: location.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address.street,
      addressLocality: location.address.city,
      addressRegion: location.address.region,
      postalCode: location.address.postalCode,
      addressCountry: location.address.country,
    },
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
