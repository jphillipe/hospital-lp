import { describe, expect, it } from "vitest";

import { buildHospitalSchema } from "@/lib/schema-org";
import type { Location } from "@/types/content";

const location: Location = {
  slug: "main-campus",
  name: "Dighton Medical Center",
  description: "A full-service hospital.",
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

describe("buildHospitalSchema", () => {
  it("emits a Hospital node addressed by the canonical origin", () => {
    const schema = buildHospitalSchema({
      location,
      origin: "https://dighton.example",
    });

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("Hospital");
    expect(schema["@id"]).toBe("https://dighton.example/#main-campus");
    expect(schema.url).toBe("https://dighton.example");
    expect(schema.telephone).toBe("+15085550100");
  });

  it("strips a trailing slash from the origin", () => {
    const schema = buildHospitalSchema({
      location,
      origin: "https://dighton.example/",
    });

    expect(schema["@id"]).toBe("https://dighton.example/#main-campus");
    expect(schema.url).toBe("https://dighton.example");
  });

  it("maps the address onto PostalAddress", () => {
    const { address } = buildHospitalSchema({
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
    const [allDay] = buildHospitalSchema({
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
    const [, bounded] = buildHospitalSchema({
      location,
      origin: "https://dighton.example",
    }).openingHoursSpecification;

    expect(bounded?.opens).toBe("07:00");
    expect(bounded?.closes).toBe("18:00");
    expect(bounded?.dayOfWeek).toEqual(["Monday", "Friday"]);
  });

  it("omits medicalSpecialty and geo rather than emitting empty ones", () => {
    const schema = buildHospitalSchema({
      location,
      origin: "https://dighton.example",
      specialties: [],
    });

    expect("medicalSpecialty" in schema).toBe(false);
    expect("geo" in schema).toBe(false);
  });

  it("includes medicalSpecialty and geo when they are supplied", () => {
    const schema = buildHospitalSchema({
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
    const schema = buildHospitalSchema({
      location,
      origin: "https://dighton.example",
    });

    expect(JSON.parse(JSON.stringify(schema))).toEqual(schema);
  });
});
