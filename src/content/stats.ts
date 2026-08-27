import type { StatsSectionContent } from "@/types/content";

/**
 * PLAN.md §1 item 06, plus the trust proof its direction G amendment parks
 * here once figures exist — years and the average ER wait, which the hero no
 * longer carries.
 *
 * **Every figure below is invented**, on the owner's instruction, for a
 * hospital that is itself invented. `site.legal.disclaimer` already says so in
 * the footer, which is the notice this depends on: do not remove it.
 *
 * `accreditations` is deliberately a count and not a list. Naming a real
 * accrediting body would attach a real organisation's imprimatur to a
 * hospital that does not exist, which is a different thing from inventing a
 * bed count.
 *
 * A `value` set back to `null` renders a marked placeholder instead of an
 * estimate, and brings `pendingNotice` back with it.
 */
export const statsSection = {
  eyebrow: "Why Dighton",
  heading: "One hospital, not a chain of handoffs.",
  lead: "Care here is organised around one campus and one record, so the work of coordinating it does not land on you.",
  reasons: [
    {
      id: "campus",
      icon: "campus",
      title: "Every service on one campus",
      body: "Your specialist, your imaging and your lab sit in the same building as the clinic that sent you. A referral is a walk down a corridor rather than a new appointment across town.",
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
      title: "Open every hour of every day",
      body: "The emergency department is staffed around the clock, every day of the year, and the nurse line answers when you are unsure whether to come in.",
    },
  ],
  figuresLabel: "Dighton in numbers",
  figures: [
    {
      id: "beds",
      value: "248",
      label: "Licensed beds",
      detail: "Inpatient capacity on the main campus.",
    },
    {
      id: "physicians",
      value: "310",
      label: "Physicians on staff",
      detail: "Attending physicians across every service.",
    },
    {
      id: "patients",
      value: "186,000",
      label: "Patients cared for each year",
      detail: "Inpatient, outpatient and emergency visits combined.",
    },
    {
      id: "years",
      value: "74",
      label: "Years serving the region",
      detail: "Caring for Dighton and southeastern Massachusetts since 1952.",
    },
    {
      id: "emergency-wait",
      value: "12 min",
      label: "Average emergency wait",
      detail: "Median time from arrival to being seen by a clinician.",
    },
    {
      id: "accreditations",
      value: "6",
      label: "Accreditations held",
      detail: "Independent quality and safety reviews currently in force.",
    },
  ],
  pendingValue: "—",
  pendingSrLabel: "Not yet available",
  pendingNotice:
    "These figures have not been supplied for Dighton Medical Center. They are left blank rather than estimated — see the notice in the footer.",
} as const satisfies StatsSectionContent;
