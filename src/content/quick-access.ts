import type { QuickAccessContent } from "@/types/content";
import { site } from "@/content/site";

/**
 * Intent triage — PLAN.md §1 item 04. Four arrival states, four doors, before
 * any marketing scroll.
 *
 * Deliberately no figures here (no wait time, no physician count): PLAN.md's
 * direction G amendment parks the trust proof in item 06 `StatsSection` until
 * the numbers exist. Every line below is a standing fact, not a claim.
 */
export const quickAccess = {
  heading: "Where would you like to start?",
  items: [
    {
      id: "emergency",
      title: "Emergency 24/7",
      description:
        "Chest pain, difficulty breathing, severe bleeding or any life-threatening symptom. Call 911 or come straight to the Emergency Department.",
      meta: "Open 24 hours, every day",
      actionLabel: "Emergency contacts",
      href: "/#emergency",
      tone: "alert",
      icon: "emergency",
    },
    {
      id: "urgent-care",
      title: "Urgent Care",
      description:
        "Fevers, sprains, minor cuts and infections that cannot wait for your primary care visit.",
      meta: "Walk in — no appointment needed",
      actionLabel: "Hours and locations",
      href: "/#locations",
      icon: "urgent-care",
    },
    {
      id: "find-a-doctor",
      title: "Find a Doctor",
      description:
        "Browse our physicians by name or specialty and see who is accepting new patients.",
      meta: "Then call to book your visit",
      actionLabel: "Browse physicians",
      href: "/#doctors",
      icon: "find-a-doctor",
    },
    {
      id: "patient-portal",
      title: "Patient Portal",
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
