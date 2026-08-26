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
