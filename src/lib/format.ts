import type { Weekday } from "@/types/content";

const US_E164 = /^\+1(\d{3})(\d{3})(\d{4})$/;

/** `tel:` href from an E.164 number; strips anything a human formatter added. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** `+15085550142` -> `(508) 555-0142`. Non-US numbers are returned as given. */
export function formatPhone(phone: string): string {
  const match = US_E164.exec(phone);
  if (!match) return phone;

  const [, area, prefix, line] = match;
  if (area === undefined || prefix === undefined || line === undefined) {
    return phone;
  }

  return `(${area}) ${prefix}-${line}`;
}

interface DoctorNameParts {
  readonly firstName: string;
  readonly lastName: string;
  readonly credentials: readonly string[];
}

/** `Amara Okafor, MD, FACC`. */
export function formatDoctorName(doctor: DoctorNameParts): string {
  const name = `${doctor.firstName} ${doctor.lastName}`;
  return doctor.credentials.length > 0
    ? `${name}, ${doctor.credentials.join(", ")}`
    : name;
}

const WEEKDAY_ORDER: readonly Weekday[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/** `"08:00"` -> `"8:00 AM"`. Returns anything it cannot parse untouched. */
export function formatTime(value: string): string {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value);
  if (!match) return value;

  const [, rawHour, minute] = match;
  if (rawHour === undefined || minute === undefined) return value;

  const hour = Number(rawHour);
  if (!Number.isInteger(hour) || hour < 0 || hour > 23) return value;

  const suffix = hour < 12 ? "AM" : "PM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;

  return `${hour12}:${minute} ${suffix}`;
}

interface DayRangeLabels {
  readonly dayRangeSeparator: string;
  readonly everyDayLabel: string;
}

/**
 * `["Monday","Tuesday","Wednesday","Thursday","Friday"]` -> `"Monday to Friday"`.
 * A non-contiguous set falls back to a comma list, and all seven days collapse
 * to the caller's "every day" wording.
 */
export function formatDayRange(
  days: readonly Weekday[],
  labels: DayRangeLabels,
): string {
  if (days.length === 0) return "";
  if (days.length === WEEKDAY_ORDER.length) return labels.everyDayLabel;

  const indexes = days
    .map((day) => WEEKDAY_ORDER.indexOf(day))
    .sort((a, b) => a - b);
  const first = indexes[0];
  const last = indexes[indexes.length - 1];
  if (first === undefined || last === undefined) return "";

  const contiguous = last - first === indexes.length - 1;
  if (!contiguous) {
    return indexes.map((index) => WEEKDAY_ORDER[index]).join(", ");
  }

  const from = WEEKDAY_ORDER[first];
  const to = WEEKDAY_ORDER[last];
  if (from === undefined || to === undefined) return "";

  return indexes.length === 1
    ? from
    : `${from} ${labels.dayRangeSeparator} ${to}`;
}

/** `"8:00 AM – 8:00 PM"`, or the caller's all-day wording when it never closes. */
export function formatHourSpan(
  opens: string | null,
  closes: string | null,
  allDayLabel: string,
): string {
  if (opens === null || closes === null) return allDayLabel;

  return `${formatTime(opens)} – ${formatTime(closes)}`;
}
