import { describe, expect, it } from "vitest";

import { detectEmergency } from "@/lib/assistant/safety";

describe("detectEmergency", () => {
  it.each([
    "I'm having chest pain",
    "my husband has chest pressure and it won't go away",
    "I think my dad is having a heart attack",
    "I can't breathe",
    "she is having trouble breathing",
    "shortness of breath since this morning",
    "his face is drooping and his speech is slurred",
    "I think this is a stroke",
    "sudden weakness down one side",
    "he had a seizure ten minutes ago",
    "the bleeding won't stop",
    "severe bleeding from a cut",
    "my son is unconscious",
    "she passed out",
    "I think he took an overdose",
    "I don't want to be alive, I'm suicidal",
    "I have been thinking about killing myself",
    "my throat is closing after eating peanuts",
  ])("routes %j to the emergency reply", (message) => {
    expect(detectEmergency(message)).toBe(true);
  });

  it.each([
    "I have a mild headache",
    "Do you have an emergency room?",
    "What should I do in an emergency?",
    "my knee hurts after running",
    "I need to book an appointment for my mother",
    "Do you take Medicare?",
    "Where do I park?",
    "What should I bring to my first visit?",
    "Can I see someone who speaks Arabic?",
    "My father gets short tempered in the afternoons",
    "",
    "   ",
  ])("leaves %j to the assistant", (message) => {
    expect(detectEmergency(message)).toBe(false);
  });

  it("is case and punctuation insensitive", () => {
    expect(detectEmergency("CHEST PAIN!!!")).toBe(true);
    expect(detectEmergency("Can't breathe.")).toBe(true);
  });
});
