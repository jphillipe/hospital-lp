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
    href: "/doctors",
    description: "Who practises here, and which languages they speak.",
  },
  {
    label: "Location & Hours",
    href: "/#locations",
    description: "Where we are, parking, and when you can be seen.",
  },
  {
    label: "Questions",
    href: "/#faq",
    description: "Insurance, what to bring, and booking for a parent.",
  },
] as const satisfies readonly NavItem[];

/**
 * The scheduling route. It was reserved here before it existed so the flow
 * would be born with a URL (PLAN.md §5 item 1); it is now `/book` for real, and
 * it reads off `site` so the constant and every `BookCta` cannot disagree.
 */
export const bookingRoute = site.booking.ctaHref;

export const footerNav = [
  {
    title: "Care",
    items: [
      { label: "Our Services", href: "/#specialties" },
      { label: "Help me find care", href: "/#care-finder" },
      { label: "Caring for an older adult", href: "/#caregivers" },
      { label: "Find a Clinician", href: "/doctors" },
      { label: "In an emergency", href: "/#emergency" },
    ],
  },
  {
    title: "Patients & Visitors",
    items: [
      { label: "New Patients", href: "/new-patients" },
      { label: "Insurance & Billing", href: "/insurance" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Patient Portal", href: site.patientPortalUrl, external: true },
      { label: "Location & Hours", href: "/#locations" },
      { label: "Questions", href: "/#faq" },
    ],
  },
  /*
   * There is no "About" group. The stats band that `/#about` pointed at was
   * written for a 248-bed hospital and was cut; four footer links to an anchor
   * that no longer exists is worse than three honest ones.
   * TODO: bring it back when there is an About page to point at.
   */
] as const satisfies readonly NavGroup[];

/**
 * Three of these four pointed at routes that did not exist and 404'd on every
 * page of the site. `/accessibility` is now a real page written from what
 * `locations.ts` and `faqs.ts` already assert; the other three are legal
 * instruments this project does not draft, so they ship as stated placeholders
 * for the practice's counsel rather than as invented policy or as dead links.
 */
export const legalNav = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Notice of Privacy Practices", href: "/legal/privacy-practices" },
  { label: "Nondiscrimination", href: "/legal/nondiscrimination" },
  { label: "Accessibility Statement", href: "/accessibility" },
] as const satisfies readonly NavItem[];
