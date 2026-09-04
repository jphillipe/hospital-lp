import type { SiteConfig } from "@/types/content";

/**
 * Dighton Medical Center is an outpatient practice: primary care, geriatrics,
 * psychology and physical therapy. **It does not run an emergency department.**
 * `emergencyNotice` therefore sends people to 911 or to the nearest emergency
 * department rather than to a door here, and no copy anywhere on this site may
 * imply otherwise.
 */
const phones = {
  main: "+15085550100",
  appointments: "+15085550142",
  nurseLine: "+15085550188",
} as const;

export const site = {
  name: "Dighton Medical Center",
  shortName: "Dighton Medical",
  tagline: "Personalized care. Close to home.",
  description:
    "Dighton Medical Center is an outpatient practice in Dighton, Massachusetts, offering primary care, geriatric care, psychology and physical therapy for you and your family.",
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
    "If this is a medical emergency, call 911 or go to the nearest emergency department. We are an outpatient practice and do not have an emergency room.",
  patientPortalUrl: "https://portal.dightonmedical.example",
  /*
   * `ctaHref` was `tel:` for as long as there was no form. It is the route now
   * that `/book` exists, and because every scheduling control on the site goes
   * through `BookCta`, this line is the whole migration — PLAN.md §5 item 1.
   * The appointment number is not withdrawn anywhere it appeared; the phone is
   * still the faster route for anyone who would rather talk to someone.
   */
  booking: {
    ctaHref: "/book",
    ctaLabel: "Book Appointment",
  },
  legal: {
    disclaimer:
      "Dighton Medical Center is a fictional practice. Every clinician, credential, statistic and phone number on this site is invented for demonstration purposes and must not be used to seek care.",
    hipaaNotice:
      "This site does not collect protected health information. Do not send personal health details through any form or chat on this site.",
    copyrightHolder: "Dighton Medical Center",
  },
} as const satisfies SiteConfig;
