import type { BookingContent } from "@/types/content";
import { site } from "@/content/site";

/**
 * The copy for `/book` — the route `navigation.ts` has reserved since the first
 * commit and that 404'd until now.
 *
 * **This form does not ask what is wrong.** Name, a number to ring back, when
 * to ring, and which of the four services — that is all, and it is deliberate.
 * PLAN.md §5 item 5 rules out PHI, `site.legal.hipaaNotice` promises the site
 * collects none, and a free-text symptom box is the exact field that would
 * break both. `notesHelp` says so where somebody is about to type.
 *
 * `confirmation.pendingNotice` is required by the type rather than remembered:
 * no scheduler has been chosen, so nothing is actually sent. A page that thanks
 * someone for a request that went nowhere is the failure PLAN.md's fourth pass
 * recorded when the assistant band posted nowhere, and the fix then was the
 * same — say so.
 */
export const booking = {
  eyebrow: "Request an appointment",
  title: "Tell us how to reach you.",
  lead: "Four short questions. Someone from the practice calls you back to fix a time — you will not be left holding a form and no answer.",
  homeLabel: "Home",
  breadcrumbLabel: "Request an appointment",

  serviceLegend: "What can we help you with?",
  serviceHelp:
    "Pick whatever sounds closest. You will not be held to it, and we will move the appointment if it belongs somewhere else.",
  unsureLabel: "I'm not sure",
  unsureDescription:
    "Most people who call say this. It is a real answer and it is enough to book on.",
  unsureHelpHeading: "That is fine — carry on.",
  unsureHelpBody:
    "You can send this as it is and we will work it out with you on the phone. If you would rather narrow it down first, two questions will usually do it.",
  unsureFinderLabel: "Help me find care",

  clinicianLabel: "Requesting",
  clearClinicianLabel: "Remove",

  detailsLegend: "How should we reach you?",
  fullNameLabel: "Your name",
  phoneLabel: "Phone number",
  phoneHelp: "The number to call you back on.",
  emailLabel: "Email",
  emailHelp: "Only used if we cannot reach you by phone.",
  optionalSuffix: "optional",

  callbackLegend: "When is a good time to call?",
  callbackHelp: "The appointment line runs Monday to Friday, 8am to 6pm.",
  callbackWindows: [
    { id: "morning", label: "Morning", detail: "8am to 12pm" },
    { id: "afternoon", label: "Afternoon", detail: "12pm to 6pm" },
    { id: "any", label: "Any time", detail: "Whenever you can reach me" },
  ],

  notesLabel: "Anything that would help us schedule?",
  notesHelp:
    "Days that suit you, whether you need an interpreter, or if someone is coming with you. Please do not describe symptoms or health details here — this form is not a secure place for them, and you will be asked on the phone instead.",
  notesPlaceholder: "Tuesdays and Thursdays are easiest for me.",

  submitLabel: "Send request",
  submittingLabel: "Sending…",

  privacyNotice: site.legal.hipaaNotice,
  emergencyNote: site.emergencyNotice,

  errors: {
    service: "Choose a service, or pick “I'm not sure”.",
    fullName: "Tell us your name so we know who we are calling.",
    phone: "We need a phone number to call you back on.",
    email: "That email address does not look right. Leave it blank if you would rather not give one.",
    callback: "Choose when we should call.",
    notes: "That is longer than we can take — keep it under 300 characters.",
    summaryHeading: "Please check the following before sending:",
    generic: "Something went wrong sending that. Please call the appointment line instead.",
  },

  confirmation: {
    eyebrow: "Request received",
    heading: "Thank you — that is everything we need.",
    body: "Someone from the practice would normally call you back within one working day to fix a time.",
    phoneLabel: "Appointment line",
    restartLabel: "Send another request",
    pendingNotice:
      "This is a demonstration site and nothing was actually sent. No scheduling system is connected yet, and nothing you typed was stored anywhere. To book a real appointment, call the appointment line.",
  },
} as const satisfies BookingContent;
