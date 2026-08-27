import type { NavGroup, NavItem } from "@/types/content";
import { site } from "@/content/site";

export const primaryNav = [
  {
    label: "Specialties",
    href: "/#specialties",
    description: "Centers of excellence and the conditions we treat.",
    hasSubmenu: true,
  },
  {
    label: "Find a Doctor",
    href: "/#doctors",
    description: "Browse our physicians by name and specialty.",
  },
  {
    label: "Patient Info",
    href: "/#patient-info",
    description: "Insurance, billing and what to bring to your visit.",
  },
  {
    label: "Locations",
    href: "/#locations",
    description: "Campuses, hours, parking and directions.",
  },
  {
    label: "About",
    href: "/#about",
    description: "Who we are and how we measure our care.",
  },
] as const satisfies readonly NavItem[];

/** Reserved now so the v2 scheduling flow is born with a URL. */
export const bookingRoute = "/book" as const;

export const footerNav = [
  {
    title: "Care",
    items: [
      { label: "Specialties", href: "/#specialties" },
      { label: "Find a Doctor", href: "/#doctors" },
      { label: "Emergency & Urgent Care", href: "/#emergency" },
      { label: "Locations & Hours", href: "/#locations" },
    ],
  },
  {
    title: "Patients & Visitors",
    items: [
      { label: "Patient Portal", href: site.patientPortalUrl, external: true },
      { label: "Insurance & Billing", href: "/#insurance" },
      { label: "Financial Assistance", href: "/#insurance" },
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
