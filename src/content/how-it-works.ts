import type { HowItWorksContent } from "@/types/content";

/**
 * PLAN.md §1 item 08. The section exists to take the anxiety out of the
 * process and to pre-sell the v2 scheduling flow.
 *
 * TODO(v2): the third step is the seam. When online scheduling ships it
 * becomes "Pick a time online" with a body to match, and `lead` drops its
 * second sentence. **Nothing else changes** — not the step count, not the
 * component, not the layout. Keep the replacement copy the same rough length
 * so the column heights do not jump on the day it lands.
 */
export const howItWorks = {
  eyebrow: "How it works",
  heading: "Booking a visit, start to finish.",
  lead: "Every appointment here starts with one phone call. Booking online is coming; until it does, this is the whole process.",
  steps: [
    {
      id: "find",
      title: "Find your service, or let us find it",
      body: "Pick whichever of the four services sounds closest, or answer two questions in “Help me find care” above. If you are still not sure, that is fine — the appointment line will work it out with you.",
    },
    {
      id: "gather",
      title: "Gather what we will ask for",
      body: "Your insurance card, a referral if your plan requires one, and a list of the medicines you take. Having these to hand is what keeps the call to a few minutes.",
    },
    {
      id: "confirm",
      title: "Call us and we will confirm your time",
      body: "One number covers every service, and you can call on someone else's behalf. We will find a slot with the right clinician and tell you where to go and what to expect on the day.",
    },
  ],
} as const satisfies HowItWorksContent;
