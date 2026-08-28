import type { Faq, FaqSectionContent } from "@/types/content";

export const faqSection = {
  eyebrow: "FAQ",
  heading: "The questions people actually call to ask.",
  lead: "If the answer you need is not here, the main line will not make you navigate a menu to find a person.",
  fallbackLabel: "Still not answered?",
  fallbackBody:
    "Call the main line and say what you are trying to do. Whoever picks up can route you, and there is no wrong department to start from.",
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
 * `how-it-works.ts`, services with `specialties.ts`. When one of those
 * changes, this file is the second edit.
 *
 * Three answers were removed when the practice stopped being a hospital: the
 * emergency-versus-urgent-care comparison, inpatient visiting hours, and the
 * second-opinion service. What replaced them is what this audience actually
 * asks — booking for a parent, and whether video visits exist yet.
 */
export const faqs = [
  {
    slug: "what-should-i-do-in-an-emergency",
    question: "What should I do in an emergency?",
    answer:
      "Call 911, or go to the nearest emergency department. Dighton Medical Center is an outpatient practice and does not have an emergency room, so it is not the right place for chest pain, difficulty breathing, severe bleeding, a serious injury, or any symptom that cannot wait. If you are unsure whether something is an emergency, the 24/7 nurse line will tell you plainly.",
    category: "care",
    order: 1,
  },
  {
    slug: "how-do-i-book-an-appointment",
    question: "How do I book an appointment?",
    answer:
      "Appointments at Dighton Medical Center are booked by phone. One number covers every service: call the appointment line, describe what is going on in your own words, and whoever picks up will find the right visit. You do not need to know which service you need before you call. Online booking is not available yet.",
    category: "booking",
    order: 2,
  },
  {
    slug: "can-i-book-for-my-parent",
    question: "Can I book an appointment for my parent?",
    answer:
      "Yes. Dighton Medical Center takes appointment calls from family members acting on an older adult's behalf, and the geriatric team is used to speaking with sons and daughters first. Describe what you have noticed and the appointment line will tell you what the first visit should be. You do not need paperwork to make the call, though the person you are calling about will need to consent to their own care once they are seen.",
    category: "booking",
    order: 3,
  },
  {
    slug: "do-i-need-a-referral",
    question: "Do I need a referral?",
    answer:
      "None of the four services at Dighton Medical Center — primary care, geriatric care, psychology and physical therapy — requires a referral from us to book. Your insurance plan may still require one, which is a separate question from what the practice needs, so check with the appointment line before you book if you are not sure how your plan works.",
    category: "booking",
    order: 4,
  },
  {
    slug: "do-you-take-my-insurance",
    question: "Do you take my insurance?",
    answer:
      "Dighton Medical Center accepts Medicare, MassHealth and other state Medicaid coverage, most commercial PPO and HMO plans, plans bought through the Health Insurance Marketplace, TRICARE and veterans' benefits. Coverage varies by plan and by service, so call the appointment line with your member ID before your visit and we will check your specific plan and tell you what you are likely to owe.",
    category: "cost",
    order: 5,
  },
  {
    slug: "what-should-i-bring",
    question: "What should I bring to my first visit?",
    answer:
      "Bring your insurance card, a photo ID, a referral if your plan requires one, and a list of the medicines you take including doses. Having these to hand is the difference between a five-minute check-in at Dighton Medical Center and a long one. If you are bringing an older adult, the medicine list matters more than anything else on this list.",
    category: "visiting",
    order: 6,
  },
  {
    slug: "can-someone-come-with-me",
    question: "Can someone come to the appointment with me?",
    answer:
      "Yes. A family member, a friend or a carer is welcome in the room at Dighton Medical Center, and for older adults it is often the thing that makes an appointment work — someone else remembers the questions. Tell reception when you arrive so the room is set up for two.",
    category: "visiting",
    order: 7,
  },
  {
    slug: "do-you-offer-video-visits",
    question: "Do you offer video visits?",
    answer:
      "Not yet. Video visits at Dighton Medical Center are being set up and no date has been announced, so there is nothing to sign up for today. In the meantime, call the appointment line and ask what can be handled over the phone — some things genuinely can be, and the practice will say honestly when they cannot.",
    category: "care",
    order: 8,
  },
  {
    slug: "what-if-i-cannot-pay",
    question: "What happens if I cannot afford to pay?",
    answer:
      "Dighton Medical Center runs a financial assistance programme, and instalment plans and prompt-payment discounts are available for self-pay patients. Ask at the desk or when you call to book — there is no penalty for asking, and the question is better asked before the visit than after the bill.",
    category: "cost",
    order: 9,
  },
  {
    slug: "doctor-who-speaks-my-language",
    question: "Can I see a clinician who speaks my language?",
    answer:
      "The clinicians currently listed on the Dighton Medical Center site speak English, Arabic and French between them, and each one's languages appear with their profile. Tell the appointment line which language you would prefer and it will be taken into account when your appointment is made. If nobody here speaks it, say so on the call rather than arriving and hoping.",
    category: "care",
    order: 10,
  },
  {
    slug: "how-do-i-get-test-results",
    question: "How do I get my test results?",
    answer:
      "Test results, visit summaries, messages to your care team, bills and prescription refills are all in the Dighton Medical Center patient portal, which is a separate secure sign-in from this website. If you would rather not use a computer, ask at your appointment and the practice will call you with results instead.",
    category: "care",
    order: 11,
  },
  {
    slug: "where-do-i-park",
    question: "Where do I park?",
    answer:
      "Parking at Dighton Medical Center is free and directly outside the building, with accessible bays and a drop-off lane at the entrance. There is no garage and nothing to pay. The entrance is at ground level with no stairs between the door and reception, and if you are bringing someone who cannot walk far, use the drop-off lane and say so at the desk.",
    category: "visiting",
    order: 12,
  },
] as const satisfies readonly Faq[];
