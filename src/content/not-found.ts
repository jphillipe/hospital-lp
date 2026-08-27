import type { NotFoundContent } from "@/types/content";
import { primaryNav } from "@/content/navigation";
import { site } from "@/content/site";

/**
 * Covers two cases with one page: an address that never existed, and one that
 * does not exist *yet*. The footer's four legal routes are the second kind
 * today, and so is every v2 route reserved in `navigation.ts`.
 *
 * The destinations are `primaryNav` itself rather than a copy, so adding a nav
 * item cannot leave this page pointing at a stale set.
 */
export const notFoundPage = {
  eyebrow: "404",
  heading: "This page does not exist — or does not exist yet.",
  lead: "The address you followed is either wrong or still being built. Nothing to do with your care has gone wrong, and everything below still works.",
  destinationsLabel: "Try one of these instead",
  destinations: [
    {
      label: "Home",
      href: "/",
      description: "Back to the start.",
    },
    ...primaryNav,
  ],
  emergencyNote: site.emergencyNotice,
} as const satisfies NotFoundContent;
