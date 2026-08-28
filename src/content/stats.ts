import type { StatsSectionContent } from "@/types/content";

/**
 * PLAN.md §1 item 06.
 *
 * **This section still argues the old positioning and is flagged, not
 * rewritten.** It was written for a 248-bed hospital with an emergency
 * department; the practice it now describes has neither. What has been
 * corrected here is only what became *false* when the emergency department
 * went away — the round-the-clock reason, and the four figures that counted
 * beds, inpatients, emergency waits and accreditations. Those four are back to
 * `null`, which is this file's own idiom for "not supplied": the card renders
 * a marked placeholder and `pendingNotice` returns with it.
 *
 * The remaining figures are invented, on the owner's instruction, for a
 * practice that is itself invented. `site.legal.disclaimer` says so in the
 * footer, which is the notice this depends on: do not remove it.
 *
 * TODO: the heading and lead still say "one hospital" and "one campus". They
 * need rewriting for an outpatient practice, and the client has not been asked
 * yet — raised, not guessed at.
 */
export const statsSection = {
  eyebrow: "Why Dighton",
  heading: "One practice, not a chain of handoffs.",
  lead: "Care here is organised around one team and one record, so the work of coordinating it does not land on you.",
  reasons: [
    {
      id: "campus",
      icon: "campus",
      title: "Every service under one roof",
      body: "Your primary care clinician, the geriatric team, psychology and physical therapy are in the same building. A referral is a walk down a corridor rather than a new appointment across town.",
    },
    {
      id: "record",
      icon: "record",
      title: "One record, shared by your care team",
      body: "Everyone treating you reads the same history, so you are not the one carrying results between departments or repeating your story at each desk.",
    },
    {
      id: "hours",
      icon: "hours",
      title: "Someone to call when you are unsure",
      body: "The nurse line answers around the clock, including when the practice is closed, and will tell you plainly whether something can wait for an appointment or needs an emergency department tonight.",
    },
  ],
  figuresLabel: "Dighton in numbers",
  figures: [
    {
      id: "patients",
      value: null,
      label: "Patients cared for each year",
      detail: "Across primary care, geriatrics, psychology and physical therapy.",
    },
    {
      id: "clinicians",
      value: null,
      label: "Clinicians on staff",
      detail: "Across all four services.",
    },
    {
      id: "years",
      value: "74",
      label: "Years serving the region",
      detail: "Caring for Dighton and southeastern Massachusetts since 1952.",
    },
    {
      id: "languages",
      value: "3",
      label: "Languages spoken",
      detail: "Between the clinicians currently listed on this site.",
    },
  ],
  pendingValue: "—",
  pendingSrLabel: "Not yet available",
  pendingNotice:
    "These figures have not been supplied for Dighton Medical Center. They are left blank rather than estimated — see the notice in the footer.",
} as const satisfies StatsSectionContent;
