import type { DoctorPageContent } from "@/types/content";

/**
 * Chrome for the clinician directory and the profile pages, in the shape
 * `specialty-page.ts` established: one module for every page of the kind, and
 * not one clinician-specific word in it.
 *
 * The `Doctor` record has carried education, board certifications, languages
 * and years in practice since the type was written, and until now nothing read
 * any of it — the home page showed a card with a name and a language list. This
 * is the page those fields were for.
 *
 * `unstaffedLabel` and `unstaffedBody` exist because three of the four services
 * have no named clinician. An absent group would read as "there is nobody",
 * which is a different claim from "we have not published them yet" — the same
 * distinction `specialty-page.ts` draws for the empty condition lists.
 */
export const doctorPage = {
  eyebrow: "Our clinicians",
  homeLabel: "Home",
  breadcrumbLabel: "Breadcrumb",

  directoryTitle: "Who practises here.",
  directoryLead:
    "Every clinician at the practice, what they look after, and which languages they speak. You can ask for any of them by name, and you do not have to — say what is going on and we will match you.",
  serviceLinkLabel: "About this service",
  unstaffedLabel: "Not yet listed",
  unstaffedBody:
    "These services run at the practice, but the clinicians who lead them are not published on this site yet.",

  aboutLabel: "About",
  educationLabel: "Education and training",
  certificationsLabel: "Board certifications",
  languagesLabel: "Languages",
  experienceLabel: "%n years in practice",
  specialtiesLabel: "Practises in",
  locationLabel: "Where they practise",
  locationLinkLabel: "Location and hours",

  bookingLabel: "Book with this clinician",
  bookingLead:
    "Request an appointment and we will call you back to fix a time, or ring the appointment line and ask for them by name.",
  phoneLabel: "Appointment line",
  acceptingLabel: "Accepting new patients",
  notAcceptingLabel: "Not accepting new patients",
  notAcceptingBody:
    "You can still request an appointment — we will tell you honestly whether a place is likely, and offer you the clinicians who do have room.",

  otherCliniciansLabel: "Other clinicians here",
  seoDescriptionSuffix: "at Dighton Medical Center in Dighton, Massachusetts.",
} as const satisfies DoctorPageContent;
