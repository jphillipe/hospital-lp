import type { InfoPage } from "@/types/content";

/**
 * The three practical pages a clinic is judged on and this site did not have:
 * what happens on a first visit, whether you are covered, and whether you can
 * get through the door.
 *
 * **Almost none of this is new copy.** `faqs.ts` already carried what to bring,
 * who may come with you, booking for a parent, referrals, insurance, financial
 * assistance, language and parking — it was just buried in an accordion at the
 * bottom of the home page, where somebody deciding whether to call will not
 * find it. Each section names the FAQ slugs it renders, so the page and the
 * accordion cannot drift apart and the chat corpus keeps one source per fact.
 *
 * Two things are written fresh, and both are things we can state truthfully
 * about ourselves rather than claims about the practice: the summary of how
 * booking now works, and the website's own accessibility statement.
 *
 * `insurancePage.pendingNotice` is the important one. The carrier categories in
 * the insurance FAQ were written for the hospital era and have never been
 * verified against this practice — PLAN.md records that as known inconsistency
 * 4. The page says so rather than presenting a list nobody has checked.
 */

export const newPatientsPage = {
  slug: "new-patients",
  eyebrow: "New patients",
  title: "What happens before your first visit.",
  lead: "Nothing here is complicated, and none of it has to be done online. If you would rather do the whole thing by phone, that is a normal way to do it.",
  sections: [
    {
      id: "booking",
      heading: "Getting the appointment",
      body: "You can request an appointment on this site or call the appointment line. The form is a callback request rather than a live calendar: someone from the practice rings you to fix a time, so you are not left choosing a slot without knowing what the visit should be.",
      faqSlugs: ["how-do-i-book-an-appointment", "do-i-need-a-referral"],
    },
    {
      id: "for-someone-else",
      heading: "Booking for someone else",
      faqSlugs: ["can-i-book-for-my-parent"],
    },
    {
      id: "bring",
      heading: "What to bring",
      faqSlugs: ["what-should-i-bring"],
      points: [
        "Your insurance card",
        "A photo ID",
        "A referral, if your plan requires one",
        "A list of your medicines, including doses",
      ],
    },
    {
      id: "arriving",
      heading: "Arriving",
      faqSlugs: ["where-do-i-park", "can-someone-come-with-me"],
    },
    {
      id: "afterwards",
      heading: "Afterwards",
      faqSlugs: ["how-do-i-get-test-results"],
    },
  ],
  pendingNotice: null,
  closingLabel: "Anything else you want to check first?",
  closingBody:
    "Call the appointment line and ask. There is no wrong question to start from, and nobody here minds being asked something twice.",
  phoneLabel: "Appointment line",
  homeLabel: "Home",
  breadcrumbLabel: "Breadcrumb",
  seo: {
    title: "New Patients",
    description:
      "What to expect before your first appointment at Dighton Medical Center: how booking works, what to bring, booking for a parent, parking, and getting your results.",
  },
} as const satisfies InfoPage;

export const insurancePage = {
  slug: "insurance",
  eyebrow: "Insurance & billing",
  title: "Whether you are covered, and what to do if you are not.",
  lead: "The honest answer to “do you take my plan?” is almost always “call us with your member ID and we will check”. Coverage varies by plan and by service, and a general list cannot tell you about yours.",
  sections: [
    {
      id: "coverage",
      heading: "What the practice accepts",
      faqSlugs: ["do-you-take-my-insurance"],
    },
    {
      id: "referrals",
      heading: "Referrals and your plan",
      body: "There are two different questions here and they are easy to confuse: what the practice needs, and what your insurer needs. The practice needs nothing.",
      faqSlugs: ["do-i-need-a-referral"],
    },
    {
      id: "cost",
      heading: "If you cannot afford to pay",
      faqSlugs: ["what-if-i-cannot-pay"],
    },
  ],
  pendingNotice:
    "The coverage categories above have not been confirmed against this practice — they are carried over from an earlier version of this site and no named list of accepted plans has been published. Call the appointment line with your member ID before you rely on any of it.",
  closingLabel: "Check your own plan before your visit",
  closingBody:
    "Have your member ID to hand and call the appointment line. It takes a few minutes and it is the difference between knowing what you will owe and finding out afterwards.",
  phoneLabel: "Appointment line",
  homeLabel: "Home",
  breadcrumbLabel: "Breadcrumb",
  seo: {
    title: "Insurance & Billing",
    description:
      "Insurance coverage, referrals and financial assistance at Dighton Medical Center, and how to check your own plan before your visit.",
  },
} as const satisfies InfoPage;

export const accessibilityPage = {
  slug: "accessibility",
  eyebrow: "Accessibility",
  title: "Getting in, and getting through the appointment.",
  lead: "Most of the people this practice looks after are older adults, so accessibility is not an accommodation here — it is the ordinary case, and the building and this website are both built for it.",
  sections: [
    {
      id: "building",
      heading: "The building",
      body: "One building, one entrance, at ground level, with no stairs between the door and reception. Parking is free and directly outside, with accessible bays and a drop-off lane at the entrance. If you are bringing someone who cannot walk far, use the drop-off lane and say so at the desk — someone will meet you there.",
      faqSlugs: ["where-do-i-park"],
    },
    {
      id: "companions",
      heading: "Bringing someone with you",
      faqSlugs: ["can-someone-come-with-me"],
    },
    {
      id: "language",
      heading: "Language",
      faqSlugs: ["doctor-who-speaks-my-language"],
    },
    {
      id: "website",
      heading: "This website",
      body: "This site is built to meet WCAG 2.2 level AA. In practice that means everything works from the keyboard alone, focus is always visible, every control is at least 44 pixels tall, text and background hold a contrast ratio of at least 4.5:1 in both the light and dark themes, nothing moves or plays on its own, and the page follows whichever theme your device is set to. Text can be enlarged to 200% without anything being cut off or overlapping.",
      faqSlugs: [],
      points: [
        "Full keyboard operation, with a skip link to the main content",
        "Visible focus on every interactive element",
        "Tap targets of 44 pixels or more throughout",
        "AA contrast in both the light and dark themes",
        "No autoplay, no motion that cannot be stopped",
        "Headings, landmarks and labels on every field",
      ],
    },
    {
      id: "problem",
      heading: "If something here does not work for you",
      body: "Tell us. Call the main line and describe what happened — which page, and what you were trying to do. An accessibility problem on this site is a fault to be fixed, not a preference to be noted, and it should never be the reason somebody cannot get an appointment. Anything on this website can also be done by phone.",
      faqSlugs: [],
    },
  ],
  pendingNotice: null,
  closingLabel: "Everything here can be done by phone",
  closingBody:
    "If this website is not the easiest way for you to do something, it is not the only way. Call and say what you need.",
  phoneLabel: "Main line",
  homeLabel: "Home",
  breadcrumbLabel: "Breadcrumb",
  seo: {
    title: "Accessibility",
    description:
      "Accessibility at Dighton Medical Center: step-free entrance, accessible parking and a drop-off lane, companions welcome, language support, and this website's WCAG 2.2 AA commitments.",
  },
} as const satisfies InfoPage;
