import "server-only";

import { doctorsSection } from "@/content/doctors";
import { locationsSection } from "@/content/locations";
import {
  getDoctors,
  getFaqs,
  getLocations,
  getSpecialties,
} from "@/content/queries";
import { site } from "@/content/site";
import { formatDayRange, formatHourSpan, formatPhone } from "@/lib/format";
import type { Doctor, Faq, Location, Specialty } from "@/types/content";

/**
 * The grounding corpus, PLAN.md §5 item 6: "all copy in `content/` later
 * becomes the chat's RAG index for free".
 *
 * There is no RAG here, and that is the point. The whole content layer is
 * roughly twelve thousand tokens — small enough to hand the model in full on
 * every turn, which removes an embedding step, a vector store, a chunking
 * strategy and every retrieval bug that comes with them. Revisit only if the
 * corpus outgrows the context window, which four specialties will not do.
 *
 * Everything is read through `queries.ts`, so a CMS behind that seam reaches
 * the assistant with no change here. The empty `conditions` and `services`
 * arrays are emitted the moment they are filled — that edit needs no code.
 */

/** The display map the doctor cards already use, so both say "Arabic" alike. */
const languageNames: Readonly<Record<string, string>> =
  doctorsSection.languageNames;

function renderSpecialty(specialty: Specialty): string {
  const lines = [
    `### ${specialty.name}`,
    `- slug: ${specialty.slug}`,
    `- summary: ${specialty.tagline}`,
    `- description: ${specialty.description}`,
    `- accepting new patients: ${specialty.acceptingNewPatients ? "yes" : "no"}`,
    `- referral required by the practice: ${
      specialty.booking.requiresReferral ? "yes" : "no"
    }`,
    `- appointment types: ${specialty.booking.appointmentTypes.join(", ")}`,
  ];

  /*
   * `phone` is nullable by type, and a specialty without its own line is not a
   * specialty you cannot book — it is one that books through the practice's
   * appointment line, which is already in the header block above.
   */
  if (specialty.phone !== null) {
    lines.push(`- booking phone: ${formatPhone(specialty.phone)}`);
  }
  /*
   * An unconfirmed list is labelled as one. Without this the model reads a
   * drafted line as a PRACTICE FACT and tells a patient the service is offered
   * — which is the exact failure `listsConfirmed` exists to prevent.
   */
  const qualifier = specialty.listsConfirmed
    ? ""
    : " (NOT CONFIRMED — describe these as the sort of thing this service" +
      " usually covers, never as a service this practice offers, and send the" +
      " visitor to the appointment line to check)";

  if (specialty.conditions.length > 0) {
    lines.push(
      `- commonly helps with${qualifier}: ${specialty.conditions.join(", ")}`,
    );
  }
  if (specialty.services.length > 0) {
    lines.push(
      `- typically involves${qualifier}: ${specialty.services.join(", ")}`,
    );
  }

  return lines.join("\n");
}

function renderDoctor(doctor: Doctor): string {
  const languages = doctor.languages
    .map((code) => languageNames[code] ?? code)
    .join(", ");

  return [
    `### Dr. ${doctor.firstName} ${doctor.lastName}, ${doctor.credentials.join(", ")}`,
    `- slug: ${doctor.slug}`,
    `- title: ${doctor.title}`,
    `- specialties: ${doctor.specialtySlugs.join(", ")}`,
    `- languages: ${languages}`,
    `- accepting new patients: ${doctor.acceptingNewPatients ? "yes" : "no"}`,
    `- about: ${doctor.bio}`,
  ].join("\n");
}

function renderLocation(location: Location): string {
  const hours = location.hours
    .map((entry) => {
      const days = formatDayRange(entry.days, locationsSection);
      const span = formatHourSpan(
        entry.opens,
        entry.closes,
        locationsSection.allDayLabel,
      );
      return `  - ${entry.label}: ${days}, ${span}`;
    })
    .join("\n");

  return [
    `### ${location.name}`,
    `- address: ${location.address.street}, ${location.address.city}, ${location.address.region} ${location.address.postalCode}`,
    `- phone: ${formatPhone(location.phone)}`,
    "- hours:",
    hours,
    `- parking: ${location.parking}`,
    `- getting here: ${location.gettingHere}`,
  ].join("\n");
}

function renderFaq(faq: Faq): string {
  return `### ${faq.question}\n${faq.answer}`;
}

/** The full corpus, as markdown, for the system prompt. */
export async function buildKnowledgeContext(): Promise<string> {
  const [specialties, doctors, locations, faqs] = await Promise.all([
    getSpecialties(),
    getDoctors(),
    getLocations(),
    getFaqs(),
  ]);

  return [
    "## The practice",
    `- name: ${site.name}`,
    `- what it is: ${site.description}`,
    `- main line: ${formatPhone(site.phones.main)}`,
    `- appointment line: ${formatPhone(site.phones.appointments)}`,
    `- 24/7 nurse line: ${formatPhone(site.phones.nurseLine)}`,
    `- emergency number: ${site.emergencyNumber}`,
    `- patient portal: ${site.patientPortalUrl}`,
    `- emergency notice: ${site.emergencyNotice}`,
    `- privacy notice: ${site.legal.hipaaNotice}`,
    "",
    "## Services offered",
    "These four are the complete list. The practice offers nothing else.",
    "",
    specialties.map(renderSpecialty).join("\n\n"),
    "",
    "## Clinicians listed",
    "This roster is incomplete on purpose. Only primary care clinicians are",
    "published so far; the geriatric, psychology and physical therapy teams",
    "have not been supplied yet. Those services exist and can be booked.",
    "",
    doctors.map(renderDoctor).join("\n\n"),
    "",
    "## Location and hours",
    "",
    locations.map(renderLocation).join("\n\n"),
    "",
    "## Answers already published on the site",
    "",
    faqs.map(renderFaq).join("\n\n"),
  ].join("\n");
}
