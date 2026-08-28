import type { SpecialtyPageContent } from "@/types/content";

/**
 * Chrome for all four `/specialties/[slug]` pages. Nothing specialty-specific
 * lives here — the name, tagline, description, conditions, services, phone and
 * referral rule all come off the `Specialty` record, so adding a fifth service
 * needs no edit to this file.
 *
 * Two of these labels are pending notices rather than headings. `conditions`
 * and `services` are empty on every specialty and no clinician is assigned to
 * three of the four; the page says so in plain words instead of rendering an
 * empty list, which is what `CLAUDE.md` asks for when content is missing.
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
