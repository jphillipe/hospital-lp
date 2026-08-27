import type { Faq, FaqSectionContent } from "@/types/content";

export const faqSection = {
  eyebrow: "FAQ",
  heading: "The questions people actually call to ask.",
  lead: "If the answer you need is not here, the switchboard will not make you navigate a menu to find a person.",
  fallbackLabel: "Still not answered?",
  fallbackBody:
    "Call the main switchboard and say what you are trying to do. Whoever picks up can route you, and there is no wrong department to start from.",
} as const satisfies FaqSectionContent;

/**
 * PLAN.md §1 item 12 and §5 item 6. This is the reason the FAQ is content and
 * not JSX: **it is the first grounding corpus for the v2 chat.**
 *
 * Every `answer` therefore has to stand on its own, without the question above
 * it and without the page around it. Write "Dighton Medical Center accepts
 * Medicare", not "yes, we do" — a retrieved chunk arrives with no context.
 *
 * Every answer here also has to agree with the section that owns the subject:
 * insurance with `insurance.ts`, hours with `locations.ts`, booking with
 * `how-it-works.ts`. When one of those changes, this file is the second edit.
 */
export const faqs = [
  {
    slug: "do-you-take-my-insurance",
    question: "Do you take my insurance?",
    answer:
      "Dighton Medical Center accepts Medicare, MassHealth and other state Medicaid coverage, most commercial PPO and HMO plans, plans bought through the Health Insurance Marketplace, TRICARE and veterans' benefits. Coverage varies by plan and by service, so call the appointment line with your member ID before your visit and we will check your specific plan and tell you what you are likely to owe.",
    category: "cost",
    order: 1,
  },
  {
    slug: "how-do-i-book-an-appointment",
    question: "How do I book an appointment?",
    answer:
      "Appointments at Dighton Medical Center are booked by phone. One number covers every service: find the doctor or specialty you need, have your insurance card and any referral to hand, then call and we will find a slot and tell you where to go on the day. Online booking is not available yet.",
    category: "booking",
    order: 2,
  },
  {
    slug: "do-i-need-a-referral",
    question: "Do I need a referral to see a specialist?",
    answer:
      "It depends on both the plan and the service. Neurology, cancer care and imaging at Dighton Medical Center require a referral; cardiology, orthopedics, women's health, primary care and ophthalmology do not. Separately, your insurance plan may require one regardless of what the department needs, so check with the appointment line before you book.",
    category: "booking",
    order: 3,
  },
  {
    slug: "emergency-or-urgent-care",
    question:
      "What is the difference between the emergency department and urgent care?",
    answer:
      "The emergency department at Dighton Medical Center treats anything life-threatening — chest pain, difficulty breathing, severe bleeding, serious injury — and is open 24 hours a day, every day. Urgent care treats things that cannot wait for a primary care visit but are not emergencies, such as fevers, sprains, minor cuts and infections, and is open from 8:00 AM to 8:00 PM every day. If you are unsure, call the 24/7 nurse line, and in a genuine emergency call 911 rather than deciding.",
    category: "care",
    order: 4,
  },
  {
    slug: "what-should-i-bring",
    question: "What should I bring to my first visit?",
    answer:
      "Bring your insurance card, a photo ID, a referral if your plan requires one, and a list of the medicines you take including doses. Having these to hand is the difference between a five-minute check-in and a long one at Dighton Medical Center.",
    category: "visiting",
    order: 5,
  },
  {
    slug: "what-if-i-cannot-pay",
    question: "What happens if I cannot afford to pay?",
    answer:
      "Federal law requires emergency care regardless of ability to pay, and Dighton Medical Center's financial assistance programme goes beyond that requirement. Ask at any desk or when you call to book — there is no penalty for asking, and instalment plans and prompt-payment discounts are available for self-pay patients.",
    category: "cost",
    order: 6,
  },
  {
    slug: "doctor-who-speaks-my-language",
    question: "Can I see a doctor who speaks my language?",
    answer:
      "Physicians at Dighton Medical Center between them speak English, Spanish, Portuguese, French, Mandarin and Arabic. Each physician's languages are listed with their profile. Tell the appointment line which language you would prefer and it will be taken into account when your appointment is made.",
    category: "care",
    order: 7,
  },
  {
    slug: "how-do-i-get-test-results",
    question: "How do I get my test results?",
    answer:
      "Test results, visit summaries, messages to your care team, bills and prescription refills are all in the patient portal, which is a separate secure sign-in from this website. Laboratory and imaging run on the Dighton Medical Center campus, which is what usually lets a clinic visit end with an answer rather than a wait.",
    category: "care",
    order: 8,
  },
  {
    slug: "where-do-i-park",
    question: "Where do I park?",
    answer:
      "Parking at Dighton Medical Center is free and on site, with accessible bays and a drop-off lane at the main entrance. The emergency entrance has its own approach and its own parking, separate from the outpatient lot. The campus has three marked entrances — emergency, outpatient and maternity — and the switchboard will tell you which one you need before you set off.",
    category: "visiting",
    order: 9,
  },
  {
    slug: "can-i-get-a-second-opinion",
    question: "Can I get a second opinion here?",
    answer:
      "Yes. Neurology, orthopedics and cancer care at Dighton Medical Center all take second-opinion appointments. Bring or forward the records and imaging from the first opinion, since a second opinion without the original workup usually means repeating tests you have already had.",
    category: "care",
    order: 10,
  },
  {
    slug: "when-can-i-visit-a-patient",
    question: "When can I visit someone who is admitted?",
    answer:
      "General visiting hours at Dighton Medical Center run from 11:00 AM to 8:00 PM every day. Some units set their own hours around treatment schedules, so call the switchboard before travelling if you are visiting outside a general ward.",
    category: "visiting",
    order: 11,
  },
] as const satisfies readonly Faq[];
