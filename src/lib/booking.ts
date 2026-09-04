/**
 * The booking vocabulary both sides share.
 *
 * It has no imports on purpose. The Zod schema, the Server Action, the Care
 * Finder and the form all need these, and the form is a Client Component:
 * reaching for them through `server/schemas/appointment.ts` would pull Zod and
 * the whole booking content module into the browser bundle for the sake of one
 * string and one object literal.
 *
 * `appointment.ts` asserts at compile time that `AppointmentField` still matches
 * the schema, so the two cannot drift.
 */

/** The service value that is not a `Specialty.slug`. */
export const UNSURE_SERVICE = "unsure";

export type AppointmentField =
  | "service"
  | "doctor"
  | "fullName"
  | "phone"
  | "email"
  | "callback"
  | "schedulingNotes";

/** Field to message. */
export type AppointmentErrors = Partial<Record<AppointmentField, string>>;

/**
 * What the visitor typed, returned on a rejected submit so nothing is retyped.
 * `| undefined` is explicit because `exactOptionalPropertyTypes` is on: an
 * optional field that was left blank is present and undefined, not absent.
 */
export type AppointmentValues = {
  readonly [K in AppointmentField]?: string | undefined;
};

/**
 * The `useActionState` state.
 *
 * `delivered` gates the confirmation's pending notice in the same shape as
 * `Specialty.listsConfirmed`: it is `false` while no scheduler is connected, and
 * the notice disappears on its own the day that changes.
 */
export type AppointmentFormState =
  | { readonly status: "idle" }
  | {
      readonly status: "invalid";
      readonly errors: AppointmentErrors;
      readonly values: AppointmentValues;
    }
  | { readonly status: "sent"; readonly delivered: boolean };

export const initialAppointmentState: AppointmentFormState = { status: "idle" };
