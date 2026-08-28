import type { SpecialtyPageContent } from "@/types/content";

/**
 * Chrome for all four `/specialties/[slug]` pages. Nothing specialty-specific
 * lives here — the name, tagline, description, conditions, services, phone and
 * referral rule all come off the `Specialty` record, so adding a fifth service
 * needs no edit to this file.
 *
 * Three of these labels are notices rather than headings, and all three exist
 * because something is not settled yet. `listsPendingNotice` stands in when a
 * specialty has no `conditions` or `services` at all; `listsProvisionalNotice`
 * sits under them while `listsConfirmed` is `false`, which is every specialty
 * today; `cliniciansPendingNotice` covers the three services with no clinician
 * assigned. Saying so in plain words is what `CLAUDE.md` asks for when content
 * is missing or unverified.
 */
export const specialtyPage = {
  eyebrow: "Our Services",
  homeLabel: "Home",
  breadcrumbLabel: "Breadcrumb",
  coversLabel: "What this service covers",
  conditionsLabel: "What we help with",
  servicesLabel: "What we offer",
  listsPendingNotice:
    "The full list of what this service covers is still being confirmed with the practice. Until it is here, call the appointment line and describe what you need — they will tell you straight away whether this is the right place.",
  listsProvisionalNotice:
    "These two lists are a starting point and are still being confirmed with the practice, so treat them as the sort of thing this service covers rather than a complete or final list. Call the appointment line and describe what you need — they will tell you straight away whether this is the right place.",
  cliniciansLabel: "Who you would see",
  cliniciansPendingNotice:
    "The clinicians for this service have not been listed yet. They are left blank rather than invented — call the appointment line and ask who is taking new patients.",
  bookingLabel: "Booking a visit",
  bookingLead:
    "Appointments are booked by phone, and you can book on someone else's behalf.",
  phoneLabel: "Appointment line",
  acceptingLabel: "Accepting new patients",
  notAcceptingLabel: "Not taking new patients right now",
  referralRequiredLabel: "A referral is needed to book",
  referralNotRequiredLabel: "No referral needed",
  locationLabel: "Where to find us",
  locationLinkLabel: "Address, parking and hours",
  otherServicesLabel: "Our other services",
} as const satisfies SpecialtyPageContent;
