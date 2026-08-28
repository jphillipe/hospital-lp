import type { AssistantContent } from "@/types/content";
import { site } from "@/content/site";
import { formatPhone } from "@/lib/format";

/**
 * Copy for the assistant, band and panel.
 *
 * `panel.emergencyReply` and `panel.rateLimitReply` are answers, not labels:
 * the route returns them verbatim in place of a model response, so they are
 * written as something a person would want to read, not as an error string.
 * The emergency wording is `site.emergencyNotice` plus the nurse line, and it
 * has to stay in agreement with `faqs.ts` and `emergency.ts`.
 */
export const assistant = {
  heading: "Ask the Dighton assistant",
  intro: "Get pointed to the right department, form or phone number.",
  shortcuts: [
    { label: "Find a specialist", icon: "specialist" },
    { label: "What should I bring?", icon: "visit" },
    { label: "Insurance & billing", icon: "billing" },
    { label: "Visiting hours", icon: "hours" },
  ],
  inputLabel: "Your question",
  inputPlaceholder: "Type your question",
  submitLabel: "Ask",
  disclaimer:
    "Virtual assistant — not medical advice. In an emergency, call 911.",
  panel: {
    title: "Dighton assistant",
    description:
      "Answers about this practice, drawn from what is published on this site.",
    closeLabel: "Close the assistant",
    inputLabel: "Your question",
    inputPlaceholder: "Ask another question",
    sendLabel: "Send",
    thinkingLabel: "Thinking…",
    relatedLabel: "Read more:",
    errorMessage:
      "Something went wrong on our side. Call the main line on " +
      `${formatPhone(site.phones.main)} and whoever picks up can help.`,
    emergencyReply:
      `${site.emergencyNotice} If you are not sure whether this is an ` +
      "emergency, the 24/7 nurse line will tell you plainly — call " +
      `${formatPhone(site.phones.nurseLine)}. Please do not wait for an ` +
      "answer here.",
    rateLimitReply:
      "That is a lot of questions in a short time, so the assistant has " +
      "paused for a minute. If it is quicker to ask a person, call the main " +
      `line on ${formatPhone(site.phones.main)}.`,
    privacyNotice: site.legal.hipaaNotice,
  },
} as const satisfies AssistantContent;
