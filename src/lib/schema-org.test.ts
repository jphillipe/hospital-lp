import { describe, expect, it } from "vitest";

import {
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildMedicalClinicSchema,
  buildPhysicianSchema,
} from "@/lib/schema-org";
import type { Doctor, Faq, Location } from "@/types/content";

const location: Location = {
  slug: "main-campus",
  name: "Dighton Medical Center",
  description: "An outpatient practice.",
  address: {
    street: "1 Dighton Commons Drive",
    city: "Dighton",
    region: "MA",
    postalCode: "02715",
    country: "US",
  },
  phone: "+15085550100",
  geo: null,
  hours: [
    {
      id: "emergency",
      label: "Emergency Department",
      days: ["Saturday", "Sunday"],
      opens: null,
      closes: null,
    },
    {
      id: "clinics",
      label: "Outpatient clinics",
      days: ["Monday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
  ],
  parking: "Free on-site parking.",
  gettingHere: "Three marked entrances.",
  directionsUrl: null,
  order: 1,
};

describe("buildMedicalClinicSchema", () => {
  it("emits a MedicalClinic node addressed by the canonical origin", () => {
    const schema = buildMedicalClinicSchema({
      location,
      origin: "https://dighton.example",
    });

    expect(schema["@context"]).toBe("https://schema.org");
    // Not "Hospital": this practice has no emergency department and no beds.
    expect(schema["@type"]).toBe("MedicalClinic");
    expect(schema["@id"]).toBe("https://dighton.example/#main-campus");
    expect(schema.url).toBe("https://dighton.example");
    expect(schema.telephone).toBe("+15085550100");
  });

  it("strips a trailing slash from the origin", () => {
    const schema = buildMedicalClinicSchema({
      location,
      origin: "https://dighton.example/",
    });

    expect(schema["@id"]).toBe("https://dighton.example/#main-campus");
    expect(schema.url).toBe("https://dighton.example");
  });

  it("maps the address onto PostalAddress", () => {
    const { address } = buildMedicalClinicSchema({
      location,
      origin: "https://dighton.example",
    });

    expect(address).toEqual({
      "@type": "PostalAddress",
      streetAddress: "1 Dighton Commons Drive",
      addressLocality: "Dighton",
      addressRegion: "MA",
      postalCode: "02715",
      addressCountry: "US",
    });
  });

  it("expands never-closing hours to a full-day span", () => {
    const [allDay] = buildMedicalClinicSchema({
      location,
      origin: "https://dighton.example",
    }).openingHoursSpecification;

    expect(allDay).toEqual({
      "@type": "OpeningHoursSpecification",
      name: "Emergency Department",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "00:00",
      // Not "24:00" — validators reject it.
      closes: "23:59",
    });
  });

  it("passes bounded hours through unchanged", () => {
    const [, bounded] = buildMedicalClinicSchema({
      location,
      origin: "https://dighton.example",
    }).openingHoursSpecification;

    expect(bounded?.opens).toBe("07:00");
    expect(bounded?.closes).toBe("18:00");
    expect(bounded?.dayOfWeek).toEqual(["Monday", "Friday"]);
  });

  it("omits medicalSpecialty and geo rather than emitting empty ones", () => {
    const schema = buildMedicalClinicSchema({
      location,
      origin: "https://dighton.example",
      specialties: [],
    });

    expect("medicalSpecialty" in schema).toBe(false);
    expect("geo" in schema).toBe(false);
  });

  it("includes medicalSpecialty and geo when they are supplied", () => {
    const schema = buildMedicalClinicSchema({
      location: { ...location, geo: { latitude: 41.81, longitude: -71.16 } },
      origin: "https://dighton.example",
      specialties: ["Cardiology", "Neurology & Stroke"],
    });

    expect(schema.medicalSpecialty).toEqual([
      "Cardiology",
      "Neurology & Stroke",
    ]);
    expect(schema.geo).toEqual({
      "@type": "GeoCoordinates",
      latitude: 41.81,
      longitude: -71.16,
    });
  });

  it("survives a round trip through JSON, which is how it ships", () => {
    const schema = buildMedicalClinicSchema({
      location,
      origin: "https://dighton.example",
    });

    expect(JSON.parse(JSON.stringify(schema))).toEqual(schema);
  });
});

const doctor: Doctor = {
  slug: "leila-haddad",
  firstName: "Leila",
  lastName: "Haddad",
  credentials: ["MD", "FAAP"],
  title: "Family Medicine Physician",
  primarySpecialtySlug: "primary-care",
  specialtySlugs: ["primary-care"],
  photo: { src: null, alt: "Portrait", width: 600, height: 800 },
  bio: "Dr. Haddad looks after whole families.",
  education: [
    { institution: "Lahey Hospital and Medical Center", degree: "MD", year: 2012 },
  ],
  boardCertifications: ["American Board of Family Medicine"],
  languages: ["en", "ar"],
  yearsOfExperience: 13,
  locationSlugs: ["main-campus"],
  acceptingNewPatients: true,
  featured: true,
  order: 1,
  booking: { enabled: true, providerId: null, appointmentTypes: ["new-patient"] },
};

const specialtyNames = { "primary-care": "Primary Care" };
const languageNames = { en: "English", ar: "Arabic" };

describe("buildPhysicianSchema", () => {
  it("addresses the physician by their profile URL and links them to the clinic", () => {
    const schema = buildPhysicianSchema({
      doctor,
      origin: "https://dighton.example/",
      location,
      specialtyNames,
      languageNames,
    });

    expect(schema["@type"]).toBe("Physician");
    expect(schema["@id"]).toBe(
      "https://dighton.example/doctors/leila-haddad#physician",
    );
    expect(schema.url).toBe("https://dighton.example/doctors/leila-haddad");
    // The same id `buildMedicalClinicSchema` emits, so the two nodes join up.
    expect(schema.worksFor).toEqual({
      "@id": "https://dighton.example/#main-campus",
    });
  });

  it("resolves slugs and language codes to display names", () => {
    const schema = buildPhysicianSchema({
      doctor,
      origin: "https://dighton.example",
      location,
      specialtyNames,
      languageNames,
    });

    expect(schema.medicalSpecialty).toEqual(["Primary Care"]);
    expect(schema.knowsLanguage).toEqual(["English", "Arabic"]);
    expect(schema.name).toBe("Leila Haddad, MD, FAAP");
  });

  it("omits the image while the portrait does not exist", () => {
    const schema = buildPhysicianSchema({
      doctor,
      origin: "https://dighton.example",
      location,
      specialtyNames,
      languageNames,
    });

    expect("image" in schema).toBe(false);
  });

  it("emits the image once a portrait is supplied", () => {
    const schema = buildPhysicianSchema({
      doctor: {
        ...doctor,
        photo: { ...doctor.photo, src: "/images/doctors/leila-haddad.webp" },
      },
      origin: "https://dighton.example",
      location,
      specialtyNames,
      languageNames,
    });

    expect(schema.image).toBe(
      "https://dighton.example/images/doctors/leila-haddad.webp",
    );
  });
});

describe("buildBreadcrumbSchema", () => {
  it("numbers the trail from one and resolves each path against the origin", () => {
    const schema = buildBreadcrumbSchema({
      trail: [
        { name: "Home", path: "/" },
        { name: "Our clinicians", path: "/doctors" },
        { name: "Leila Haddad, MD", path: "/doctors/leila-haddad" },
      ],
      origin: "https://dighton.example/",
    });

    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(schema.itemListElement.map((entry) => entry.position)).toEqual([
      1, 2, 3,
    ]);
    expect(schema.itemListElement[2]?.item).toBe(
      "https://dighton.example/doctors/leila-haddad",
    );
  });
});

const faqs: readonly Faq[] = [
  {
    slug: "do-you-take-my-insurance",
    question: "Do you take my insurance?",
    answer: "Dighton Medical Center accepts Medicare and MassHealth.",
    category: "cost",
    order: 1,
  },
  {
    slug: "where-do-i-park",
    question: "Where do I park?",
    answer: "Parking is free and on site.",
    category: "visiting",
    order: 2,
  },
];

describe("buildFaqPageSchema", () => {
  it("emits one Question per FAQ, in the order given", () => {
    const schema = buildFaqPageSchema({
      faqs,
      origin: "https://dighton.example",
    });

    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(2);
    expect(schema.mainEntity.map((q) => q.name)).toEqual([
      "Do you take my insurance?",
      "Where do I park?",
    ]);
  });

  it("addresses each question by slug so the chat has a citation anchor", () => {
    const [first] = buildFaqPageSchema({
      faqs,
      origin: "https://dighton.example/",
    }).mainEntity;

    expect(first?.["@id"]).toBe(
      "https://dighton.example/#faq-do-you-take-my-insurance",
    );
  });

  it("wraps the answer in an Answer node", () => {
    const [first] = buildFaqPageSchema({
      faqs,
      origin: "https://dighton.example",
    }).mainEntity;

    expect(first?.acceptedAnswer).toEqual({
      "@type": "Answer",
      text: "Dighton Medical Center accepts Medicare and MassHealth.",
    });
  });

  it("returns an empty mainEntity rather than throwing on no FAQs", () => {
    expect(
      buildFaqPageSchema({ faqs: [], origin: "https://dighton.example" })
        .mainEntity,
    ).toEqual([]);
  });
});
