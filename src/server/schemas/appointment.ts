import { z } from "zod";

import { booking } from "@/content/booking";
import type { AppointmentField } from "@/lib/booking";
import type { CallbackWindowId } from "@/types/content";

/**
 * The one schema — PLAN.md §5 item 9. It is the shape the Server Action trusts,
 * and it is deliberately the whole story about what this site is willing to
 * collect.
 *
 * **There is no clinical field here and there must never be one.** No symptom,
 * no condition, no date of birth, no insurance member number, no reason for the
 * visit. `site.legal.hipaaNotice` promises the site collects no protected
 * health information, and PLAN.md §5 item 5 makes that a structural decision
 * rather than a habit: the field that does not exist cannot leak, cannot be
 * logged and cannot end up in a query string. `appointment.test.ts` fails if one
 * appears.
 *
 * `service` is checked for shape here and for existence in the action, which is
 * where `queries.ts` can be reached — a slug list in this module would follow
 * the schema into any client bundle that ever imports it.
 */

const callbackWindowIds = [
  "morning",
  "afternoon",
  "any",
] as const satisfies readonly CallbackWindowId[];

/** A slug, or `unsure`. Anything else is rejected before the action looks it up. */
const serviceSchema = z
  .string()
  .trim()
  .regex(/^[a-z][a-z0-9-]{0,60}$/, booking.errors.service);

export const appointmentRequestSchema = z.object({
  service: serviceSchema,
  /** `Specialty.slug`-shaped, carried in from a profile. Never typed by hand. */
  doctor: z
    .string()
    .trim()
    .regex(/^[a-z][a-z0-9-]{0,60}$/)
    .optional(),
  fullName: z
    .string()
    .trim()
    .min(2, booking.errors.fullName)
    .max(80, booking.errors.fullName),
  /*
   * Digits, spaces and the punctuation a US number is written with. Not E.164:
   * the visitor writes the number the way they say it, and normalising it is
   * the scheduler's job, not a reason to reject "(508) 555-0142".
   */
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+().\s-]{10,20}$/, booking.errors.phone),
  email: z
    .union([z.literal(""), z.email(booking.errors.email).max(120)])
    .optional(),
  callback: z.enum(callbackWindowIds, { error: booking.errors.callback }),
  /**
   * Scheduling logistics only — days that suit, interpreter, a companion.
   * `booking.notesHelp` says so beside the box, and the cap keeps it a note
   * rather than a history.
   */
  schedulingNotes: z.string().trim().max(300, booking.errors.notes).optional(),
});

export type AppointmentRequest = z.infer<typeof appointmentRequestSchema>;

/**
 * The two field lists must stay identical. `lib/booking.ts` writes its own out
 * by hand so the Client bundle never imports Zod; this is what stops the copy
 * drifting. Add a field to the schema without adding it there and the assignment
 * below fails to compile.
 */
type SchemaFields = keyof AppointmentRequest;
type SharedFields = AppointmentField;

const _fieldsMatch: SchemaFields extends SharedFields
  ? SharedFields extends SchemaFields
    ? true
    : never
  : never = true;
void _fieldsMatch;
