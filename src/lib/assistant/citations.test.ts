import { describe, expect, it } from "vitest";

import { parseAnswer } from "@/lib/assistant/citations";

const specialtyNames = {
  "primary-care": "Primary Care",
  "geriatric-care": "Geriatric Care",
  psychology: "Psychology",
  "physical-therapy": "Physical Therapy",
};

describe("parseAnswer", () => {
  it("lifts a known slug out of the prose", () => {
    const { text, slugs } = parseAnswer(
      "That sounds like a job for physical therapy [physical-therapy].",
      specialtyNames,
    );

    expect(text).toBe("That sounds like a job for physical therapy.");
    expect(slugs).toEqual(["physical-therapy"]);
  });

  it("leaves an invented slug in the text and never links it", () => {
    const { text, slugs } = parseAnswer(
      "You want cardiology [cardiology] for that.",
      specialtyNames,
    );

    expect(text).toBe("You want cardiology [cardiology] for that.");
    expect(slugs).toEqual([]);
  });

  it("collects each slug once, in the order written", () => {
    const { slugs } = parseAnswer(
      "Start at [primary-care]. Then [psychology], or [primary-care] again.",
      specialtyNames,
    );

    expect(slugs).toEqual(["primary-care", "psychology"]);
  });

  it("closes the gap a removed marker leaves mid-sentence", () => {
    const { text } = parseAnswer(
      "Call about geriatric care [geriatric-care] and we will help.",
      specialtyNames,
    );

    expect(text).toBe("Call about geriatric care and we will help.");
  });

  it("passes plain prose through untouched", () => {
    const answer =
      "Clinic appointments run 8:00 AM to 5:00 PM, Monday to Friday.";

    expect(parseAnswer(answer, specialtyNames)).toEqual({
      text: answer,
      slugs: [],
    });
  });

  it("is not fooled by a key inherited from Object.prototype", () => {
    const { text, slugs } = parseAnswer(
      "Try [constructor] instead.",
      specialtyNames,
    );

    expect(text).toBe("Try [constructor] instead.");
    expect(slugs).toEqual([]);
  });
});
