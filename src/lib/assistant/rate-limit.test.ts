import { beforeEach, describe, expect, it } from "vitest";

import { clientKey, consume, reset } from "@/lib/assistant/rate-limit";

describe("consume", () => {
  beforeEach(() => {
    reset();
  });

  it("allows ten requests in a window and blocks the eleventh", () => {
    const now = 1_000_000;

    for (let index = 0; index < 10; index += 1) {
      expect(consume("1.2.3.4", now).allowed).toBe(true);
    }

    const blocked = consume("1.2.3.4", now);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfter).toBe(60);
  });

  it("opens a fresh window once the old one expires", () => {
    const now = 1_000_000;
    for (let index = 0; index < 11; index += 1) consume("1.2.3.4", now);

    expect(consume("1.2.3.4", now + 60_001).allowed).toBe(true);
  });

  it("counts each client separately", () => {
    const now = 1_000_000;
    for (let index = 0; index < 11; index += 1) consume("1.2.3.4", now);

    expect(consume("5.6.7.8", now).allowed).toBe(true);
  });
});

describe("clientKey", () => {
  it("takes the first hop of x-forwarded-for", () => {
    const request = new Request("https://example.test/api/chat", {
      headers: { "x-forwarded-for": "203.0.113.7, 70.41.3.18" },
    });

    expect(clientKey(request)).toBe("203.0.113.7");
  });

  it("falls back to x-real-ip, then to a shared bucket", () => {
    const realIp = new Request("https://example.test/api/chat", {
      headers: { "x-real-ip": "198.51.100.2" },
    });
    expect(clientKey(realIp)).toBe("198.51.100.2");

    expect(clientKey(new Request("https://example.test/api/chat"))).toBe(
      "unknown",
    );
  });
});
