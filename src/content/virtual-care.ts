import type { VirtualCareContent } from "@/types/content";

/**
 * **Virtual care does not exist yet.** The client asked for it in the hero
 * ("in person or virtually") and in the persistent header actions, so it needs
 * a destination — but nothing here may describe a service anyone could try to
 * use today.
 *
 * `pendingNotice` is required by the type rather than remembered, for the same
 * reason the testimonials disclaimer is: the section cannot ship without it.
 *
 * TODO: when the platform is chosen, this becomes a real section — the how,
 * the what-you-need, and a link. `statusLabel`, `meanwhile*` and
 * `pendingNotice` all come out together on that day.
 */
export const virtualCare = {
  eyebrow: "Virtual Care",
  heading: "See a clinician without leaving home.",
  lead: "For the visits that do not need you to travel — a follow-up, a question about a medicine, or a first conversation before you come in.",
  statusLabel: "Coming soon",
  body: "We are setting up video visits so that a check-in can happen from your own living room, on a phone or a computer, with someone helping you if you would like them to.",
  meanwhileLabel: "In the meantime",
  meanwhileBody:
    "Call the appointment line and ask what can be handled over the phone. Some things genuinely can be, and we will tell you honestly when they cannot.",
  phoneLabel: "Appointment line",
  pendingNotice:
    "Video visits are not available yet. There is nothing to sign up for on this page, and no date has been set.",
} as const satisfies VirtualCareContent;
