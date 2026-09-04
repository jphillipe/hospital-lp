import type { ErrorPageContent } from "@/types/content";
import { site } from "@/content/site";

/**
 * What the error boundary says. It does not apologise at length and it does not
 * speculate about what broke — it gives the visitor the two routes that do not
 * depend on this site working at all: a phone number and 911.
 */
export const errorPage = {
  eyebrow: "Something went wrong",
  heading: "This page did not load.",
  lead: "The fault is ours, not yours. Try again, and if it keeps happening call us — the appointment line can do everything this site can.",
  retryLabel: "Try again",
  homeLabel: "Go to the home page",
  phoneLabel: "Appointment line",
  emergencyNote: site.emergencyNotice,
} as const satisfies ErrorPageContent;
