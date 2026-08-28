import type { QuickAccessContent } from "@/types/content";
import { site } from "@/content/site";

/**
 * Intent triage — PLAN.md §1 item 04, retargeted at an outpatient practice.
 *
 * The emergency and urgent-care doors are gone because the practice has
 * neither; `EmergencyBlock` sits above this strip and sends people to 911
 * instead. What replaces them are the two routes the client asked to keep
 * permanently visible — booking and virtual care — so the on-page strip and
 * the persistent action bar name the same things.
 *
 * Deliberately no figures here. Every line below is a standing fact, not a
 * claim, and `virtual-care` is honest about not existing yet.
 */
export const quickAccess = {
  heading: "Where would you like to start?",
  items: [
    {
      id: "book",
      title: "Book an appointment",
      description:
        "One number books every service here. Tell us what is going on in your own words and we will find the right visit.",
      meta: "By phone, Monday to Friday",
      actionLabel: "Call the appointment line",
      href: site.booking.ctaHref,
      icon: "book",
    },
    {
      id: "find-a-doctor",
      title: "Find a clinician",
      description:
        "See who practises here, which languages they speak, and who is taking new patients.",
      meta: "Then call to book your visit",
      actionLabel: "Browse clinicians",
      href: "#doctors",
      icon: "find-a-doctor",
    },
    {
      id: "virtual-care",
      title: "Virtual care",
      description:
        "Video visits for the appointments that do not need you to travel. We are still setting this up.",
      meta: "Coming soon",
      actionLabel: "What is planned",
      href: "#virtual-care",
      icon: "virtual-care",
    },
    {
      id: "patient-portal",
      title: "Patient portal",
      description:
        "Test results, visit summaries, messages to your care team, bills and prescription refills.",
      meta: "Secure sign-in",
      actionLabel: "Go to the portal",
      href: site.patientPortalUrl,
      external: true,
      icon: "patient-portal",
    },
  ],
} as const satisfies QuickAccessContent;
