"use server";

import { booking } from "@/content/booking";
import { getDoctorBySlug, getSpecialtyBySlug } from "@/content/queries";
import type {
  AppointmentErrors,
  AppointmentFormState,
  AppointmentValues,
} from "@/lib/booking";
import { UNSURE_SERVICE } from "@/lib/booking";
import type { AppointmentRequest } from "@/server/schemas/appointment";
import { appointmentRequestSchema } from "@/server/schemas/appointment";

/**
 * The seam the buyer wires to their scheduler.
 *
 * It returns `false` because nothing is connected: no EHR, no queue, no mailer,
 * no database. That is not a stub waiting to be forgotten — `AppointmentFormState
 * .delivered` carries the answer to the confirmation screen, which prints
 * `booking.confirmation.pendingNotice` while it is `false` and stops printing it
 * the day this function starts returning `true`.
 *
 * Two rules for whoever wires it up:
 *
 * 1. **Nothing here may be logged.** A name and a phone number are not PHI, but
 *    they are still somebody's, and PLAN.md §5 item 5 asks for an audit-log seam
 *    rather than a `console.log`. If this starts writing anywhere, that write is
 *    the audit point and it needs a retention answer with it.
 * 2. **The request carries no clinical detail and must not start to.** See the
 *    header of `server/schemas/appointment.ts`.
 */
async function deliverAppointmentRequest(
  request: AppointmentRequest,
): Promise<boolean> {
  // Deliberately dropped, and deliberately not logged — see rule 1 above.
  void request;
  return false;
}

const readOptional = (formData: FormData, field: string): string | undefined => {
  const value = formData.get(field);
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
};

const readString = (formData: FormData, field: string): string => {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
};

/**
 * Validates an appointment request and hands it to the seam above.
 *
 * On rejection it returns both the messages and what was typed: React resets an
 * uncontrolled form once an action resolves, so without `values` a wrong phone
 * number would cost someone their name and their notes as well.
 */
export async function requestAppointment(
  _previous: AppointmentFormState,
  formData: FormData,
): Promise<AppointmentFormState> {
  const values: AppointmentValues = {
    service: readString(formData, "service"),
    doctor: readOptional(formData, "doctor"),
    fullName: readString(formData, "fullName"),
    phone: readString(formData, "phone"),
    email: readString(formData, "email"),
    callback: readString(formData, "callback"),
    schedulingNotes: readString(formData, "schedulingNotes"),
  };

  const parsed = appointmentRequestSchema.safeParse({
    service: values.service,
    doctor: values.doctor,
    fullName: values.fullName,
    phone: values.phone,
    email: values.email,
    callback: values.callback,
    schedulingNotes: values.schedulingNotes,
  });

  if (!parsed.success) {
    const errors: AppointmentErrors = {};

    for (const issue of parsed.error.issues) {
      const [field] = issue.path;
      if (typeof field !== "string") continue;
      if (field in errors) continue;
      Object.assign(errors, { [field]: issue.message });
    }

    return { status: "invalid", errors, values };
  }

  /*
   * Referential integrity, which the schema deliberately cannot do: it would
   * have to import the specialty list, and the schema is the module a client
   * component is most likely to reach for. A slug that is not ours — a stale
   * link, a hand-edited query string — is rejected here rather than handed to a
   * scheduler that has never heard of it.
   */
  const { service, doctor } = parsed.data;

  if (service !== UNSURE_SERVICE) {
    const specialty = await getSpecialtyBySlug(service);
    if (specialty === undefined) {
      return {
        status: "invalid",
        errors: { service: booking.errors.service },
        values,
      };
    }
  }

  if (doctor !== undefined) {
    const clinician = await getDoctorBySlug(doctor);
    if (clinician === undefined) {
      /*
       * Dropped rather than rejected. The clinician is a convenience carried in
       * from a card; nobody typed it, so a stale one is our problem to fix and
       * not a reason to bounce a request that is otherwise complete.
       */
      return {
        status: "sent",
        delivered: await deliverAppointmentRequest({
          ...parsed.data,
          doctor: undefined,
        }),
      };
    }
  }

  return { status: "sent", delivered: await deliverAppointmentRequest(parsed.data) };
}
