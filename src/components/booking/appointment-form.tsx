"use client";

import { ArrowRightIcon, CheckIcon, InfoIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useId, useRef, useState } from "react";

import { PhoneLink } from "@/components/shared/phone-link";
import { UNSURE_SERVICE, initialAppointmentState } from "@/lib/booking";
import { requestAppointment } from "@/server/actions/appointments";
import type { BookingContent, Specialty } from "@/types/content";

interface AppointmentFormProps {
  readonly content: BookingContent;
  /** Resolved by the page. The form never reaches into `specialties.ts`. */
  readonly services: readonly Specialty[];
  /** From `?specialty=` — already checked against the list by the page. */
  readonly initialService: string | null;
  /** From `?doctor=`. Name is resolved by the page so this stays serializable. */
  readonly clinician: { readonly slug: string; readonly name: string } | null;
  /** E.164 — the appointment line. */
  readonly phone: string;
}

/**
 * The only Client component on `/book`, and the only form on the site that is
 * not a chat box.
 *
 * **Every field is controlled.** React resets an uncontrolled form once a form
 * action resolves, which would wipe a correct name because a phone number was
 * mistyped. Controlled state survives the round trip, and the action still
 * returns `values` for the case where this component is ever remounted.
 *
 * The service choice is radio buttons in a `fieldset`, not a select: the
 * audience is older adults on phones, the same reason the Care Finder uses
 * 56px full-width rows. Native radios also bring arrow-key navigation and the
 * group semantics a custom widget has to re-implement.
 *
 * "I'm not sure" is a real option that submits. It reveals the finder rather
 * than blocking — someone who does not know which service they need is exactly
 * who this practice is for, and making them decide before they may book is the
 * behaviour the site exists to avoid.
 */
export function AppointmentForm({
  content,
  services,
  initialService,
  clinician,
  phone,
}: AppointmentFormProps) {
  const [state, formAction, isPending] = useActionState(
    requestAppointment,
    initialAppointmentState,
  );

  const [service, setService] = useState(initialService ?? "");
  const [doctor, setDoctor] = useState(clinician);
  const [fullName, setFullName] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [email, setEmail] = useState("");
  const [callback, setCallback] = useState("");
  const [notes, setNotes] = useState("");

  const summaryRef = useRef<HTMLParagraphElement>(null);
  const confirmationRef = useRef<HTMLHeadingElement>(null);
  const ids = useId();

  const fieldId = (field: string) => `${ids}-${field}`;
  const errorId = (field: string) => `${ids}-${field}-error`;
  const helpId = (field: string) => `${ids}-${field}-help`;

  const errors = state.status === "invalid" ? state.errors : {};
  const sent = state.status === "sent";

  // Focus follows the outcome: the error list when there is one, the
  // confirmation heading when the request went through. Without this a
  // keyboard user submits and is left at the bottom of a form that silently
  // changed above them.
  useEffect(() => {
    if (state.status === "invalid") summaryRef.current?.focus();
    if (state.status === "sent") confirmationRef.current?.focus();
  }, [state]);

  const describedBy = (field: string, hasHelp: boolean) =>
    [hasHelp ? helpId(field) : null, field in errors ? errorId(field) : null]
      .filter((value) => value !== null)
      .join(" ") || undefined;

  if (sent) {
    return (
      <div className="flex flex-col gap-5 rounded-card border border-border bg-card p-6x">
        <p className="text-eyebrow font-semibold tracking-eyebrow text-primary uppercase">
          {content.confirmation.eyebrow}
        </p>

        <h1
          ref={confirmationRef}
          tabIndex={-1}
          className="text-2xl outline-none"
        >
          {content.confirmation.heading}
        </h1>

        <p className="text-base text-body-foreground">
          {content.confirmation.body}
        </p>

        {/*
          `delivered` is false while no scheduler is connected, so the notice
          stands. It disappears on its own the day the seam in
          `server/actions/appointments.ts` starts returning true — nobody has to
          remember to delete it.
        */}
        {state.delivered ? null : (
          <p className="flex gap-3 rounded-card bg-alert-bg p-5 text-sm text-alert">
            <InfoIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
            {content.confirmation.pendingNotice}
          </p>
        )}

        <p className="flex flex-col gap-1 text-sm">
          <span className="text-muted-foreground">
            {content.confirmation.phoneLabel}
          </span>
          <PhoneLink
            phone={phone}
            className="text-lg font-semibold text-primary underline underline-offset-4"
          />
        </p>

        <div className="border-t border-border pt-5">
          <Link
            href="/book"
            className="inline-flex min-h-11 items-center gap-2 rounded-sm text-button font-semibold text-body-foreground hover:text-primary"
          >
            {content.confirmation.restartLabel}
            <ArrowRightIcon aria-hidden className="size-4 shrink-0" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex max-w-2xl flex-col gap-4">
        <p className="text-eyebrow font-semibold tracking-eyebrow text-primary uppercase">
          {content.eyebrow}
        </p>
        <h1 className="text-2xl">{content.title}</h1>
        <p className="text-base text-body-foreground">{content.lead}</p>
      </div>

      <form action={formAction} className="flex max-w-2xl flex-col gap-7x">
        {state.status === "invalid" ? (
          <div className="flex flex-col gap-2 rounded-card bg-alert-bg p-5 text-alert">
            <p
              ref={summaryRef}
              tabIndex={-1}
              role="alert"
              className="text-base font-semibold outline-none"
            >
              {content.errors.summaryHeading}
            </p>
            <ul className="flex list-disc flex-col gap-1 pl-5 text-sm">
              {Object.entries(errors).map(([field, message]) =>
                message === undefined ? null : (
                  <li key={field}>
                    <a href={`#${fieldId(field)}`} className="underline">
                      {message}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        ) : null}

        {/* ---------------------------------------------------------------- */}

        <fieldset className="flex flex-col gap-4">
          <legend className="font-heading text-xl text-foreground">
            {content.serviceLegend}
          </legend>
          <p id={helpId("service")} className="text-sm text-muted-foreground">
            {content.serviceHelp}
          </p>

          {"service" in errors ? (
            <p id={errorId("service")} className="text-sm font-semibold text-alert">
              {errors.service}
            </p>
          ) : null}

          <ul className="flex flex-col gap-3">
            {services.map((option) => (
              <li key={option.slug}>
                <ServiceOption
                  id={
                    option.slug === initialService
                      ? fieldId("service")
                      : `${ids}-service-${option.slug}`
                  }
                  name="service"
                  value={option.slug}
                  checked={service === option.slug}
                  onSelect={setService}
                  label={option.name}
                  description={option.tagline}
                  describedBy={describedBy("service", true)}

                />
              </li>
            ))}
            <li>
              <ServiceOption
                id={
                  initialService === null || initialService === UNSURE_SERVICE
                    ? fieldId("service")
                    : `${ids}-service-${UNSURE_SERVICE}`
                }
                name="service"
                value={UNSURE_SERVICE}
                checked={service === UNSURE_SERVICE}
                onSelect={setService}
                label={content.unsureLabel}
                description={content.unsureDescription}
                describedBy={describedBy("service", true)}

              />
            </li>
          </ul>

          {service === UNSURE_SERVICE ? (
            <div className="flex flex-col gap-2 rounded-card bg-muted p-5">
              <p className="font-heading text-lg text-foreground">
                {content.unsureHelpHeading}
              </p>
              <p className="text-sm text-body-foreground">
                {content.unsureHelpBody}
              </p>
              <Link
                href="/#care-finder"
                className="inline-flex min-h-11 items-center gap-2 text-button font-semibold text-primary underline underline-offset-4"
              >
                {content.unsureFinderLabel}
                <ArrowRightIcon aria-hidden className="size-4 shrink-0" />
              </Link>
            </div>
          ) : null}

          {doctor === null ? null : (
            <div className="flex items-center justify-between gap-4 rounded-card border border-input px-5 py-3">
              <p className="text-sm text-body-foreground">
                <span className="text-muted-foreground">
                  {content.clinicianLabel}{" "}
                </span>
                <span className="font-semibold text-foreground">
                  {doctor.name}
                </span>
              </p>
              <input type="hidden" name="doctor" value={doctor.slug} />
              <button
                type="button"
                onClick={() => setDoctor(null)}
                className="flex min-h-11 cursor-pointer items-center gap-1 rounded-sm px-1 text-button font-semibold text-body-foreground hover:text-primary"
              >
                <XIcon aria-hidden className="size-4 shrink-0" />
                {content.clearClinicianLabel}
              </button>
            </div>
          )}
        </fieldset>

        {/* ---------------------------------------------------------------- */}

        <fieldset className="flex flex-col gap-5">
          <legend className="font-heading text-xl text-foreground">
            {content.detailsLegend}
          </legend>

          <TextField
            id={fieldId("fullName")}
            name="fullName"
            label={content.fullNameLabel}
            value={fullName}
            onChange={setFullName}
            autoComplete="name"
            error={errors.fullName}
            errorId={errorId("fullName")}
            required
          />

          <TextField
            id={fieldId("phone")}
            name="phone"
            type="tel"
            label={content.phoneLabel}
            help={content.phoneHelp}
            helpId={helpId("phone")}
            value={phoneValue}
            onChange={setPhoneValue}
            autoComplete="tel"
            error={errors.phone}
            errorId={errorId("phone")}
            required
          />

          <TextField
            id={fieldId("email")}
            name="email"
            type="email"
            label={`${content.emailLabel} (${content.optionalSuffix})`}
            help={content.emailHelp}
            helpId={helpId("email")}
            value={email}
            onChange={setEmail}
            autoComplete="email"
            error={errors.email}
            errorId={errorId("email")}
          />
        </fieldset>

        {/* ---------------------------------------------------------------- */}

        <fieldset className="flex flex-col gap-4">
          <legend className="font-heading text-xl text-foreground">
            {content.callbackLegend}
          </legend>
          <p id={helpId("callback")} className="text-sm text-muted-foreground">
            {content.callbackHelp}
          </p>

          {"callback" in errors ? (
            <p
              id={errorId("callback")}
              className="text-sm font-semibold text-alert"
            >
              {errors.callback}
            </p>
          ) : null}

          <ul className="flex flex-col gap-3 sm:flex-row">
            {content.callbackWindows.map((slot, index) => (
              <li key={slot.id} className="sm:flex-1">
                <ServiceOption
                  id={
                    index === 0
                      ? fieldId("callback")
                      : `${ids}-callback-${slot.id}`
                  }
                  name="callback"
                  value={slot.id}
                  checked={callback === slot.id}
                  onSelect={setCallback}
                  label={slot.label}
                  description={slot.detail}
                  describedBy={describedBy("callback", true)}

                />
              </li>
            ))}
          </ul>
        </fieldset>

        {/* ---------------------------------------------------------------- */}

        <div className="flex flex-col gap-2">
          <label
            htmlFor={fieldId("schedulingNotes")}
            className="text-base font-semibold text-foreground"
          >
            {content.notesLabel}{" "}
            <span className="font-normal text-muted-foreground">
              ({content.optionalSuffix})
            </span>
          </label>
          <p
            id={helpId("schedulingNotes")}
            className="text-sm text-muted-foreground"
          >
            {content.notesHelp}
          </p>
          {"schedulingNotes" in errors ? (
            <p
              id={errorId("schedulingNotes")}
              className="text-sm font-semibold text-alert"
            >
              {errors.schedulingNotes}
            </p>
          ) : null}
          <textarea
            id={fieldId("schedulingNotes")}
            name="schedulingNotes"
            rows={3}
            maxLength={300}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder={content.notesPlaceholder}
            aria-describedby={describedBy("schedulingNotes", true)}
            aria-invalid={"schedulingNotes" in errors || undefined}
            className="w-full rounded-card border border-input bg-card px-5 py-3 text-base text-foreground placeholder:text-muted-foreground aria-invalid:border-alert"
          />
        </div>

        {/* ---------------------------------------------------------------- */}

        <div className="flex flex-col gap-5 border-t border-border pt-6x">
          <p className="flex gap-3 text-sm text-body-foreground">
            <InfoIcon
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-muted-foreground"
            />
            {content.privacyNotice}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex h-14 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground transition-colors hover:bg-brand-hover disabled:cursor-wait disabled:opacity-70"
            >
              {isPending ? content.submittingLabel : content.submitLabel}
              {isPending ? null : (
                <CheckIcon aria-hidden className="size-4 shrink-0" />
              )}
            </button>

            <p className="flex flex-col gap-1 text-sm">
              <span className="text-muted-foreground">
                {content.confirmation.phoneLabel}
              </span>
              <PhoneLink
                phone={phone}
                className="text-lg font-semibold text-primary underline underline-offset-4"
              />
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

/**
 * One radio dressed as a full-width row. 56px tall and the whole row is the
 * target — the same floor the Care Finder's options hold, for the same hands.
 */
function ServiceOption({
  id,
  name,
  value,
  checked,
  onSelect,
  label,
  description,
  describedBy,
}: {
  readonly id: string;
  readonly name: string;
  readonly value: string;
  readonly checked: boolean;
  readonly onSelect: (value: string) => void;
  readonly label: string;
  readonly description: string;
  readonly describedBy: string | undefined;
}) {
  return (
    <label
      htmlFor={id}
      className={`flex min-h-14 w-full cursor-pointer items-start gap-4 rounded-card border px-5 py-4 transition-colors has-focus-visible:border-ring ${
        checked
          ? "border-primary bg-primary/5"
          : "border-input hover:border-primary hover:bg-primary/5"
      }`}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onSelect(value)}
        /*
          `aria-describedby` carries the group's help and error text; there is
          deliberately no `aria-invalid` here, because the radio role does not
          support it. The error summary at the top of the form is `role="alert"`
          and takes focus, which is what actually announces a rejected group.
        */
        aria-describedby={describedBy}
        className="mt-1 size-5 shrink-0 accent-primary"
      />
      <span className="flex flex-col gap-1">
        <span className="text-base font-semibold text-foreground">{label}</span>
        <span className="text-sm text-body-foreground">{description}</span>
      </span>
    </label>
  );
}

function TextField({
  id,
  name,
  type = "text",
  label,
  help,
  helpId,
  value,
  onChange,
  autoComplete,
  error,
  errorId,
  required,
}: {
  readonly id: string;
  readonly name: string;
  readonly type?: "text" | "tel" | "email";
  readonly label: string;
  readonly help?: string;
  readonly helpId?: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly autoComplete: string;
  readonly error: string | undefined;
  readonly errorId: string;
  readonly required?: boolean;
}) {
  const describedBy =
    [help === undefined ? null : helpId, error === undefined ? null : errorId]
      .filter((entry) => entry !== null && entry !== undefined)
      .join(" ") || undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-base font-semibold text-foreground">
        {label}
      </label>
      {help === undefined ? null : (
        <p id={helpId} className="text-sm text-muted-foreground">
          {help}
        </p>
      )}
      {error === undefined ? null : (
        <p id={errorId} className="text-sm font-semibold text-alert">
          {error}
        </p>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        required={required}
        aria-describedby={describedBy}
        aria-invalid={error === undefined ? undefined : true}
        className="h-14 w-full rounded-card border border-input bg-card px-5 text-base text-foreground placeholder:text-muted-foreground aria-invalid:border-alert"
      />
    </div>
  );
}
