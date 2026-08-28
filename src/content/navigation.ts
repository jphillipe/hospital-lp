import type { NavGroup, NavItem } from "@/types/content";
import { site } from "@/content/site";

/**
 * Five items, and the first two are the two things people come here to do.
 * "Emergency & Urgent Care" is gone from every nav on the site: the practice
 * has neither, and a nav item is a promise of a destination.
 */
export const primaryNav = [
  {
    label: "Our Services",
    href: "/#specialties",
    description: "The four kinds of care we offer, in plain words.",
    hasSubmenu: true,
  },
  {
    label: "Find Care",
    href: "/#care-finder",
    description: "Two questions, and we point you to the right place to start.",
  },
  {
    label: "Find a Clinician",
    href: "/#doctors",
    description: "Who practises here, and which languages they speak.",
  },
  {
    label: "Patient Info",
    href: "/#patient-info",
    description: "Insurance, billing and what to bring to your visit.",
  },
  {
    label: "Location & Hours",
    href: "/#locations",
    description: "Where we are, parking, and when you can be seen.",
  },
] as const satisfies readonly NavItem[];

/** Reserved now so the v2 scheduling flow is born with a URL. */
export const bookingRoute = "/book" as const;

export const footerNav = [
  {
    title: "Care",
    items: [
      { label: "Our Services", href: "/#specialties" },
      { label: "Help me find care", href: "/#care-finder" },
      { label: "Caring for an older adult", href: "/#caregivers" },
      { label: "Find a Clinician", href: "/#doctors" },
      { label: "Virtual Care", href: "/#virtual-care" },
    ],
  },
  {
    title: "Patients & Visitors",
    items: [
      { label: "Patient Portal", href: site.patientPortalUrl, external: true },
      { label: "Insurance & Billing", href: "/#insurance" },
      { label: "Financial Assistance", href: "/#insurance" },
      { label: "Location & Hours", href: "/#locations" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "About",
    items: [
      { label: "About Dighton Medical", href: "/#about" },
      { label: "Quality & Safety", href: "/#about" },
      { label: "Careers", href: "/#about" },
      { label: "Contact Us", href: "/#locations" },
    ],
  },
] as const satisfies readonly NavGroup[];

export const legalNav = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Notice of Privacy Practices", href: "/privacy-practices" },
  { label: "Nondiscrimination", href: "/nondiscrimination" },
  { label: "Accessibility Statement", href: "/accessibility" },
] as const satisfies readonly NavItem[];
