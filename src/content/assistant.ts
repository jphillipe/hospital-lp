import type { AssistantContent } from "@/types/content";

/** UI copy only. There is no model, no endpoint and no request behind this. */
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
} as const satisfies AssistantContent;
