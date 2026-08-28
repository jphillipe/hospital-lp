import { describe, expect, it } from "vitest";

import { chatRequestSchema } from "@/lib/assistant/schema";

const message = (content: string) => ({ role: "user" as const, content });

describe("chatRequestSchema", () => {
  it("accepts a well-formed transcript", () => {
    const result = chatRequestSchema.safeParse({
      messages: [
        message("What are your hours?"),
        { role: "assistant", content: "Clinic appointments run 8 to 5." },
        message("And on Saturday?"),
      ],
    });

    expect(result.success).toBe(true);
  });

  it.each([
    ["a non-object body", "nope"],
    ["a missing messages array", {}],
    ["an empty transcript", { messages: [] }],
    ["an unknown role", { messages: [{ role: "system", content: "hi" }] }],
    ["a blank message", { messages: [message("   ")] }],
  ])("rejects %s", (_label, body) => {
    expect(chatRequestSchema.safeParse(body).success).toBe(false);
  });

  it("rejects a message over the character cap", () => {
    const result = chatRequestSchema.safeParse({
      messages: [message("a".repeat(1001))],
    });

    expect(result.success).toBe(false);
  });

  it("rejects a transcript longer than the turn cap", () => {
    const result = chatRequestSchema.safeParse({
      messages: Array.from({ length: 13 }, () => message("hello")),
    });

    expect(result.success).toBe(false);
  });
});
