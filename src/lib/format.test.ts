import { describe, expect, it } from "vitest";

import { formatDoctorName, formatPhone, telHref } from "@/lib/format";

describe("telHref", () => {
  it("builds a tel: href from an E.164 number", () => {
    expect(telHref("+15085550142")).toBe("tel:+15085550142");
  });

  it("strips human formatting", () => {
    expect(telHref("(508) 555-0142")).toBe("tel:5085550142");
  });
});

describe("formatPhone", () => {
  it("formats a US E.164 number", () => {
    expect(formatPhone("+15085550142")).toBe("(508) 555-0142");
  });

  it("returns anything it cannot parse untouched", () => {
    expect(formatPhone("+442071838750")).toBe("+442071838750");
    expect(formatPhone("911")).toBe("911");
  });
});

describe("formatDoctorName", () => {
  it("appends credentials", () => {
    expect(
      formatDoctorName({
        firstName: "Amara",
        lastName: "Okafor",
        credentials: ["MD", "FACC"],
      }),
    ).toBe("Amara Okafor, MD, FACC");
  });

  it("omits the comma when there are no credentials", () => {
    expect(
      formatDoctorName({
        firstName: "Amara",
        lastName: "Okafor",
        credentials: [],
      }),
    ).toBe("Amara Okafor");
  });
});
