import type { InsuranceSectionContent } from "@/types/content";
import { site } from "@/content/site";

/**
 * PLAN.md §1 item 10 — the section that stops the booking flow collecting
 * leads it cannot convert.
 *
 * **Coverage is listed by category, not by brand.** Writing "we accept Aetna"
 * asserts a contractual relationship with a real company on behalf of a
 * hospital that does not exist, which is a different act from inventing a bed
 * count — and it is the claim most likely to mislead if this page is ever seen
 * out of context. Medicare, MassHealth and TRICARE are named because they are
 * public programmes rather than a network any private company owns.
 *
 * The plan's file tree reserves `public/images/logos/insurers/<slug>.svg`.
 * Nothing renders logos for the same reason: they are trademarks.
 *
 * TODO: swapping in real carrier names is a `coverage` edit and nothing else —
 * the component reads whatever is here.
 */
export const insuranceSection = {
  eyebrow: "Insurance & Billing",
  heading: "Find out what you owe before you come in.",
  lead: "Most people asking about a hospital are really asking two things: will my plan cover this, and what happens if it does not. Both have an answer here.",
  coverageLabel: "Coverage we accept",
  coverage: [
    {
      id: "medicare",
      label: "Medicare",
      detail: "Parts A and B, and most Medicare Advantage plans.",
    },
    {
      id: "medicaid",
      label: "MassHealth and state Medicaid",
      detail: "Including coverage carried over from another state.",
    },
    {
      id: "commercial",
      label: "Commercial PPO and HMO plans",
      detail: "Most major employer-sponsored plans.",
    },
    {
      id: "marketplace",
      label: "Health Insurance Marketplace plans",
      detail: "Plans bought through the state exchange.",
    },
    {
      id: "military",
      label: "TRICARE and veterans' benefits",
      detail: "Including community care referrals.",
    },
    {
      id: "self-pay",
      label: "Self-pay",
      detail: "Prompt-payment discounts and instalment plans.",
    },
  ],
  verifyNotice:
    "Coverage varies by plan and by service, so treat this list as a starting point rather than a promise. Call the appointment line with your member ID before your visit and we will check your specific plan and tell you what you are likely to owe.",
  notes: [
    {
      id: "before-visit",
      icon: "before-visit",
      title: "Bring these with you",
      body: "Your insurance card, a photo ID, a referral if your plan requires one, and a list of the medicines you take. It is the difference between a five-minute check-in and a long one.",
    },
    {
      id: "assistance",
      icon: "assistance",
      title: "If you cannot pay",
      body: "We run a financial assistance programme, and instalment plans and prompt-payment discounts are available for self-pay patients. Ask at the desk, or when you call to book — there is no penalty for asking, and it is better asked before the visit than after the bill.",
    },
    {
      id: "billing",
      icon: "billing",
      title: "Questions about a bill",
      body: "One number for statements, instalment plans, and anything on a bill you do not recognise.",
      phone: site.phones.main,
    },
  ],
} as const satisfies InsuranceSectionContent;
