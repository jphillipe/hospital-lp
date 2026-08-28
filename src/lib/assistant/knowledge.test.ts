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

  /*
   * `conditions` and `services` are empty in `specialties.ts` on purpose —
   * CLAUDE.md forbids inventing them. This is the test that proves filling
   * them in is a content edit and not a code change.
   */
  it("omits the empty condition and service lists rather than printing blanks", () => {
    expect(corpus).not.toContain("conditions treated: \n");
    expect(corpus).not.toContain("services offered: \n");
  });
});
