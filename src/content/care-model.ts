import type { CareModelContent } from "@/types/content";

/**
 * The four services read as four separate cards in the grid above this. They
 * are not four practices, and nothing on the site said so until now — this is
 * the section that says it.
 *
 * **Everything here is traceable, and has to stay that way.** No step describes
 * a care-coordination programme, a pathway, a protocol or a team meeting,
 * because the practice has described none of those and a numbered diagram is
 * the easiest place on a site to smuggle a claim in:
 *
 * - `start` — `faqs.ts` `how-do-i-book-an-appointment`: one number covers every
 *   service and you do not need to know which one you need.
 * - `primary` — `doctors.ts`, Dr. Whitlock: "the referrals that open every
 *   other service here".
 * - `open` — `faqs.ts` `do-i-need-a-referral`: none of the four requires a
 *   referral from us.
 * - `place` — `locations.ts`: one building, one entrance, ground level.
 * - `together` — `faqs.ts` `can-someone-come-with-me` and
 *   `can-i-book-for-my-parent`.
 *
 * It replaced `QuickAccess`, which PLAN.md's second pass had already named as
 * the next cut: Call and Book are fixed to every screen in `MobileActionBar`
 * and repeated in the header, so the strip was mostly saying them a third time.
 */
export const careModel = {
  eyebrow: "One connected team",
  heading: "Four services, one practice, one place to start.",
  lead: "You do not have to work out which door is yours. Whichever way you come in, the same team is on the other side of it.",
  steps: [
    {
      id: "start",
      title: "Start anywhere",
      body: "One number and one form cover all four services. Describe what is going on in your own words — you do not need to know which service you need before you get in touch.",
      specialtySlug: null,
    },
    {
      id: "primary",
      title: "Primary care holds the thread",
      body: "For most people the first appointment is primary care. It is where check-ups, long-term conditions and anything new get looked at, and where the referrals that open the other services here come from.",
      specialtySlug: "primary-care",
    },
    {
      id: "open",
      title: "The other three open from there — or on their own",
      body: "Geriatric care, psychology and physical therapy take patients directly as well. None of the four needs a referral from us to book, so nothing waits on an appointment you have not had yet.",
      specialtySlug: null,
    },
    {
      id: "place",
      title: "In one building",
      body: "Every service on this site happens at the same address, at ground level, through one entrance, with free parking outside it. Moving between them does not mean moving across town.",
      specialtySlug: null,
    },
    {
      id: "together",
      title: "With whoever you bring",
      body: "A family member, a friend or a carer is welcome in the room, and a son or daughter can call and book on an older adult's behalf. For most people it is the thing that makes the appointment work.",
      specialtySlug: null,
    },
  ],
  closingLabel: "Still not sure where to start?",
  closingBody:
    "That is the most common reason people get in touch, and it is a fine one. Two questions will usually narrow it down, and if they do not, we will work it out with you on the phone.",
  action: {
    label: "Help me find care",
    href: "/#care-finder",
  },
} as const satisfies CareModelContent;
