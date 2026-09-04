import { describe, expect, it } from "vitest";

import { UNSURE_SERVICE } from "@/lib/booking";
import { appointmentRequestSchema } from "@/server/schemas/appointment";

const valid = {
  service: "primary-care",
  fullName: "Rita Alves",
  phone: "(508) 555-0142",
  callback: "morning",
} as const;

describe("appointmentRequestSchema", () => {
  it("accepts the minimum a request needs", () => {
    expect(appointmentRequestSchema.safeParse(valid).success).toBe(true);
  });

  it("accepts a full request", () => {
    const result = appointmentRequestSchema.safeParse({
      ...valid,
      doctor: "leila-haddad",
      email: "rita@example.com",
      schedulingNotes: "Tuesdays are easiest, and I will bring my daughter.",
    });

    expect(result.success).toBe(true);
  });

  it("accepts the visitor who does not know which service they need", () => {
    const result = appointmentRequestSchema.safeParse({
      ...valid,
      service: UNSURE_SERVICE,
    });

    expect(result.success).toBe(true);
  });

  it.each([
    ["+15085550142"],
    ["508-555-0142"],
    ["(508) 555-0142"],
    ["508 555 0142"],
  ])("accepts a phone number written as %s", (phone) => {
    expect(appointmentRequestSchema.safeParse({ ...valid, phone }).success).toBe(
      true,
    );
  });

  it("treats a blank email as no email", () => {
    const result = appointmentRequestSchema.safeParse({ ...valid, email: "" });

    expect(result.success).toBe(true);
  });

  it.each([
    ["a missing service", { ...valid, service: "" }],
    ["a service that is not slug-shaped", { ...valid, service: "Primary Care" }],
    ["a one-character name", { ...valid, fullName: "R" }],
    ["a phone number that is not one", { ...valid, phone: "call me" }],
    ["a phone number that is too short", { ...valid, phone: "555" }],
    ["an email that is not one", { ...valid, email: "rita@" }],
    ["a callback window we do not offer", { ...valid, callback: "midnight" }],
    ["a missing callback window", { service: "psychology" }],
    [
      "a note longer than the cap",
      { ...valid, schedulingNotes: "a".repeat(301) },
    ],
  ])("rejects %s", (_label, body) => {
    expect(appointmentRequestSchema.safeParse(body).success).toBe(false);
  });

  it("reports the content module's message, not Zod's", () => {
    const result = appointmentRequestSchema.safeParse({
      ...valid,
      fullName: "",
    });

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error.issues[0]?.message).toBe(
      "Tell us your name so we know who we are calling.",
    );
  });

  /**
   * The guard PLAN.md §5 item 5 is worth having as a test rather than a
   * comment. `site.legal.hipaaNotice` promises this site collects no protected
   * health information; the way that promise stays true is that the field does
   * not exist. Adding one should break the build, not pass review.
   */
  it("collects nothing clinical", () => {
    const fields = Object.keys(appointmentRequestSchema.shape);

    expect(fields).toStrictEqual([
      "service",
      "doctor",
      "fullName",
      "phone",
      "email",
      "callback",
      "schedulingNotes",
    ]);

    const forbidden =
      /symptom|condition|diagnos|medicat|prescri|birth|dob|insur|member|policy|ssn|reason|complaint|history|allerg|pregnan/i;

    for (const field of fields) {
      expect(field).not.toMatch(forbidden);
    }
  });
});
