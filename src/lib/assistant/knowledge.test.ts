import { describe, expect, it } from "vitest";

import { doctors } from "@/content/doctors";
import { faqs } from "@/content/faqs";
import { site } from "@/content/site";
import { specialties } from "@/content/specialties";
import { buildKnowledgeContext } from "@/lib/assistant/knowledge";

const corpus = await buildKnowledgeContext();

describe("buildKnowledgeContext", () => {
  it("carries every specialty, by name and by slug", () => {
    for (const specialty of specialties) {
      expect(corpus).toContain(specialty.name);
      expect(corpus).toContain(`slug: ${specialty.slug}`);
      expect(corpus).toContain(specialty.description);
    }
  });

  it("carries every published clinician", () => {
    for (const doctor of doctors) {
      expect(corpus).toContain(`${doctor.firstName} ${doctor.lastName}`);
      expect(corpus).toContain(doctor.bio);
    }
  });

  it("says which clinicians are not accepting new patients", () => {
    expect(corpus).toContain("accepting new patients: no");
  });

  it("carries every published FAQ answer whole", () => {
    for (const faq of faqs) {
      expect(corpus).toContain(faq.answer);
    }
  });

  it("carries the three phone numbers in the form a person would read", () => {
    expect(corpus).toContain("(508) 555-0100");
    expect(corpus).toContain("(508) 555-0142");
    expect(corpus).toContain("(508) 555-0188");
  });

  it("carries the address, the hours and the emergency posture", () => {
    expect(corpus).toContain(site.address.street);
    expect(corpus).toContain("Monday to Friday, 8:00 AM – 5:00 PM");
    expect(corpus).toContain(site.emergencyNotice);
    expect(corpus).toContain(site.legal.hipaaNotice);
  });

  it("carries every drafted condition and service", () => {
    for (const specialty of specialties) {
      for (const entry of [...specialty.conditions, ...specialty.services]) {
        expect(corpus).toContain(entry);
      }
    }
  });

  /*
   * The one that matters. `conditions` and `services` are drafted scope, not
   * anything the practice has signed off, so the corpus has to say so — or the
   * model reads them as PRACTICE FACTS and promises a service to a patient.
   * When a specialty is confirmed, its qualifier disappears and this narrows
   * to the ones still pending.
   */
  it("labels an unconfirmed list as unconfirmed", () => {
    const unconfirmed = specialties.filter(
      (specialty) => !specialty.listsConfirmed,
    );
    expect(unconfirmed.length).toBeGreaterThan(0);

    const marks = corpus.match(/NOT CONFIRMED/g) ?? [];
    // One per list, and every unconfirmed specialty has both lists filled.
    expect(marks).toHaveLength(unconfirmed.length * 2);
  });

  it("never states a drafted list as a plain offering", () => {
    expect(corpus).not.toContain("services offered:");
    expect(corpus).not.toContain("conditions treated:");
  });

  /*
   * `faqs.ts` says video visits do not exist yet. The corpus carries both
   * files, so a service line promising one would hand the model a
   * contradiction about the single thing patients ask to book.
   */
  it("does not offer video visits anywhere in the drafted lists", () => {
    for (const specialty of specialties) {
      for (const entry of [...specialty.conditions, ...specialty.services]) {
        expect(entry.toLowerCase()).not.toMatch(/video|telehealth|virtual/);
      }
    }
  });
});
