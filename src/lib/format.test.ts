import { describe, expect, it } from "vitest";

import {
  formatDayRange,
  formatDoctorName,
  formatHourSpan,
  formatPhone,
  formatTime,
  telHref,
} from "@/lib/format";

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

describe("formatTime", () => {
  it("converts 24-hour to 12-hour with a suffix", () => {
    expect(formatTime("08:00")).toBe("8:00 AM");
    expect(formatTime("18:30")).toBe("6:30 PM");
  });

  it("handles both ends of the clock", () => {
    expect(formatTime("00:00")).toBe("12:00 AM");
    expect(formatTime("12:00")).toBe("12:00 PM");
    expect(formatTime("23:59")).toBe("11:59 PM");
  });

  it("returns anything it cannot parse untouched", () => {
    expect(formatTime("25:00")).toBe("25:00");
    expect(formatTime("noon")).toBe("noon");
  });
});

const dayLabels = { dayRangeSeparator: "to", everyDayLabel: "Every day" };

describe("formatDayRange", () => {
  it("collapses a contiguous run", () => {
    expect(
      formatDayRange(
        ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        dayLabels,
      ),
    ).toBe("Monday to Friday");
  });

  it("collapses all seven days to the every-day wording", () => {
    expect(
      formatDayRange(
        [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        dayLabels,
      ),
    ).toBe("Every day");
  });

  it("lists a non-contiguous set in weekday order", () => {
    expect(formatDayRange(["Friday", "Monday"], dayLabels)).toBe(
      "Monday, Friday",
    );
  });

  it("returns a single day on its own", () => {
    expect(formatDayRange(["Sunday"], dayLabels)).toBe("Sunday");
  });

  it("returns an empty string for no days", () => {
    expect(formatDayRange([], dayLabels)).toBe("");
  });
});

describe("formatHourSpan", () => {
  it("formats both ends of a bounded span", () => {
    expect(formatHourSpan("07:00", "18:00", "Open 24 hours")).toBe(
      "7:00 AM – 6:00 PM",
    );
  });

  it("uses the all-day wording when either end is null", () => {
    expect(formatHourSpan(null, null, "Open 24 hours")).toBe("Open 24 hours");
    expect(formatHourSpan("07:00", null, "Open 24 hours")).toBe(
      "Open 24 hours",
    );
  });
});
