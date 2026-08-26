import type { SiteConfig } from "@/types/content";
import { telHref } from "@/lib/format";

const phones = {
  main: "+15085550100",
  appointments: "+15085550142",
  emergencyDepartment: "+15085550911",
  nurseLine: "+15085550188",
} as const;

export const site = {
  name: "Dighton Medical Center",
  shortName: "Dighton Medical",
  tagline: "Academic-level care, close to home.",
  description:
    "Dighton Medical Center is a full-service hospital in Dighton, Massachusetts, with a 24/7 emergency department, primary care and specialty services.",
  locale: "en-US",
  address: {
    street: "1 Dighton Commons Drive",
    city: "Dighton",
    region: "MA",
    postalCode: "02715",
    country: "US",
  },
  phones,
  emergencyNumber: "911",
  emergencyNotice:
    "If this is a medical emergency, call 911 or go to the nearest emergency department.",
  patientPortalUrl: "https://portal.dightonmedical.example",
  booking: {
    ctaHref: telHref(phones.appointments),
    ctaLabel: "Book an Appointment",
  },
  legal: {
    disclaimer:
      "Dighton Medical Center is a fictional hospital. Every physician, credential, statistic and phone number on this site is invented for demonstration purposes and must not be used to seek care.",
    hipaaNotice:
      "This site does not collect protected health information. Do not send personal health details through any form or chat on this site.",
    copyrightHolder: "Dighton Medical Center",
  },
} as const satisfies SiteConfig;
