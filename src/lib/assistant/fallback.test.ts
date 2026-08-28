import { describe, expect, it } from "vitest";

import { buildFallbackAnswer } from "@/lib/assistant/fallback";

describe("buildFallbackAnswer", () => {
  it("finds the published answer about parking", async () => {
    const answer = await buildFallbackAnswer("where can I park my car?");

    expect(answer).toContain("Parking at Dighton Medical Center is free");
  });

  it("finds the published answer about insurance", async () => {
    const answer = await buildFallbackAnswer(
      "do you accept Medicare insurance coverage?",
    );

    expect(answer).toContain("accepts Medicare");
  });

  it("finds the published answer about booking for a parent", async () => {
    const answer = await buildFallbackAnswer(
      "can I book an appointment for my parent?",
    );

    expect(answer).toContain("family members acting on an older adult");
  });

  it("gives the main line rather than a bad guess when nothing overlaps", async () => {
    const answer = await buildFallbackAnswer("zxqv");

    expect(answer).toContain("(508) 555-0100");
    expect(answer).toContain("does not cover that");
  });

  it("never returns an empty answer", async () => {
    for (const question of ["", "   ", "?", "the a of"]) {
      await expect(buildFallbackAnswer(question)).resolves.not.toBe("");
    }
  });
});
