import {
  ArrowRightIcon,
  CheckIcon,
  ChevronRightIcon,
  InfoIcon,
  MapPinIcon,
  ShieldAlertIcon,
} from "lucide-react";
import Link from "next/link";

import { BookCta } from "@/components/booking/book-cta";
import { DoctorCard } from "@/components/cards/doctor-card";
import { Container } from "@/components/shared/container";
import { Icon } from "@/components/shared/icon";
import { PhoneLink } from "@/components/shared/phone-link";
import type {
  Doctor,
  DoctorsSectionContent,
  Specialty,
  SpecialtyPageContent,
} from "@/types/content";

interface SpecialtyDetailProps {
  readonly content: SpecialtyPageContent;
  readonly specialty: Specialty;
  /** Whoever practises this service. Empty for three of the four today. */
  readonly clinicians: readonly Doctor[];
  /** Reused so a card here and a card on the home page cannot drift apart. */
  readonly doctorsContent: DoctorsSectionContent;
  readonly specialtyNames: Readonly<Record<string, string>>;
  readonly others: readonly Specialty[];
  readonly emergencyNote: string;
}

/**
 * Presentational, Server, zero JS. The route reads `queries.ts` and hands
 * everything down, as `CLAUDE.md` requires.
 *
 * The page is the same shape for all four services and reads every
 * specialty-specific word off the record, so a fifth service is a
 * `specialties.ts` edit and nothing else.
 *
 * Three states are said out loud rather than left to be inferred: a specialty
 * with no lists at all gets `listsPendingNotice`; one whose lists are drafted
 * but not yet signed off by the practice gets `listsProvisionalNotice` above
 * them; a service with no clinician gets `cliniciansPendingNotice`. An absent
 * section reads as "there is nothing", and an unqualified ticked list reads as
 * a promise — both are claims this practice has not made.
 */
export function SpecialtyDetail({
  content,
  specialty,
  clinicians,
  doctorsContent,
  specialtyNames,
  others,
  emergencyNote,
}: SpecialtyDetailProps) {
  const hasLists =
    specialty.conditions.length > 0 || specialty.services.length > 0;

  return (
    <>
      <div className="bg-muted py-7x lg:py-8x">
        <Container className="flex flex-col gap-6x">
          {/*
            The two links carry `min-h-11` and horizontal padding rather than
            sitting as bare 16px text. A breadcrumb is standalone navigation,
            not a link inside a sentence, so WCAG's inline exception does not
            cover it — and this audience is the reason the floor matters.
          */}
          <nav aria-label={content.breadcrumbLabel}>
            <ol className="-mx-1 flex flex-wrap items-center gap-1 text-sm text-body-foreground">
              <li>
                <Link
                  href="/"
                  className="flex min-h-11 items-center rounded-sm px-1 hover:text-primary"
                >
                  {content.homeLabel}
                </Link>
              </li>
              <li aria-hidden className="text-muted-foreground">
                <ChevronRightIcon className="size-4" />
              </li>
              <li>
                <Link
                  href="/#specialties"
                  className="flex min-h-11 items-center rounded-sm px-1 hover:text-primary"
                >
                  {content.eyebrow}
                </Link>
              </li>
              <li aria-hidden className="text-muted-foreground">
                <ChevronRightIcon className="size-4" />
              </li>
              <li aria-current="page" className="font-semibold text-foreground">
                {specialty.name}
              </li>
            </ol>
          </nav>

          <div className="flex max-w-2xl flex-col gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon name={specialty.icon} aria-hidden className="size-7" />
            </span>

            <h1 className="text-2xl">{specialty.name}</h1>
            <p className="font-heading text-xl text-primary">
              {specialty.tagline}
            </p>
            <p className="text-base text-body-foreground">
              {specialty.description}
            </p>

            <ul className="flex flex-wrap gap-2 pt-1">
              <li
                className={
                  specialty.acceptingNewPatients
                    ? "flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
                    : "rounded-full border border-input px-4 py-2 text-sm text-body-foreground"
                }
              >
                {specialty.acceptingNewPatients ? (
                  <>
                    <CheckIcon aria-hidden className="size-4 shrink-0" />
                    {content.acceptingLabel}
                  </>
                ) : (
                  content.notAcceptingLabel
                )}
              </li>
              <li className="rounded-full border border-input px-4 py-2 text-sm text-body-foreground">
                {specialty.booking.requiresReferral
                  ? content.referralRequiredLabel
                  : content.referralNotRequiredLabel}
              </li>
            </ul>
          </div>
        </Container>
      </div>

      <Container className="flex flex-col gap-8x py-8x lg:py-9x">
        {/*
          The h2 is visible and stays put whether the lists are here or not.
          It was `sr-only` for one revision, which left the pending notice as a
          naked paragraph on screen while a screen reader heard a heading — two
          different pages for two different readers.
        */}
        <section
          aria-labelledby="specialty-lists-heading"
          className="flex flex-col gap-6x"
        >
          <h2 id="specialty-lists-heading" className="text-xl">
            {content.coversLabel}
          </h2>

          {hasLists ? (
            <div className="flex flex-col gap-4">
              {/*
                The lists render with a tick beside every line, which reads as
                the practice asserting each one. Until `listsConfirmed` is true
                nobody has asserted anything, so the note is not decoration —
                it is the difference between a draft and a claim.
              */}
              {specialty.listsConfirmed ? null : (
                <p className="flex items-start gap-3 rounded-card border border-border bg-card p-6x text-base text-body-foreground">
                  <InfoIcon aria-hidden className="mt-1 size-5 shrink-0" />
                  {content.listsProvisionalNotice}
                </p>
              )}

              <div className="grid gap-4 lg:grid-cols-2">
                {specialty.conditions.length === 0 ? null : (
                  <div className="flex flex-col gap-3 rounded-card border border-border bg-card p-6x">
                    <h3 className="text-lg">{content.conditionsLabel}</h3>
                    <ul className="flex flex-col gap-2">
                      {specialty.conditions.map((condition) => (
                        <li
                          key={condition}
                          className="flex items-start gap-3 text-base text-body-foreground"
                        >
                          <CheckIcon
                            aria-hidden
                            className="mt-1.5 size-4 shrink-0 text-primary"
                          />
                          {condition}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {specialty.services.length === 0 ? null : (
                  <div className="flex flex-col gap-3 rounded-card border border-border bg-card p-6x">
                    <h3 className="text-lg">{content.servicesLabel}</h3>
                    <ul className="flex flex-col gap-2">
                      {specialty.services.map((service) => (
                        <li
                          key={service}
                          className="flex items-start gap-3 text-base text-body-foreground"
                        >
                          <CheckIcon
                            aria-hidden
                            className="mt-1.5 size-4 shrink-0 text-primary"
                          />
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="flex items-start gap-3 rounded-card border border-border bg-card p-6x text-base text-body-foreground">
              <InfoIcon aria-hidden className="mt-1 size-5 shrink-0" />
              {content.listsPendingNotice}
            </p>
          )}
        </section>

        <section
          aria-labelledby="specialty-booking-heading"
          className="flex flex-col gap-5 rounded-card bg-primary p-6x lg:p-8x"
        >
          <div className="flex max-w-xl flex-col gap-2">
            <h2
              id="specialty-booking-heading"
              className="text-xl text-primary-foreground"
            >
              {content.bookingLabel}
            </h2>
            <p className="text-base text-primary-foreground/85">
              {content.bookingLead}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <BookCta
              variant="secondary"
              className="h-12 rounded-full px-6 text-base font-semibold"
            />
            {specialty.phone === null ? null : (
              <p className="flex flex-col gap-1 text-sm">
                <span className="text-primary-foreground/85">
                  {content.phoneLabel}
                </span>
                <PhoneLink
                  phone={specialty.phone}
                  className="flex min-h-11 w-fit items-center text-lg font-semibold text-primary-foreground underline underline-offset-4"
                />
              </p>
            )}
          </div>
        </section>

        <section
          aria-labelledby="specialty-clinicians-heading"
          className="flex flex-col gap-6x"
        >
          <h2 id="specialty-clinicians-heading" className="text-xl">
            {content.cliniciansLabel}
          </h2>

          {clinicians.length === 0 ? (
            <p className="flex items-start gap-3 rounded-card border border-border bg-card p-6x text-base text-body-foreground">
              <InfoIcon aria-hidden className="mt-1 size-5 shrink-0" />
              {content.cliniciansPendingNotice}
            </p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {clinicians.map((doctor) => (
                <li
                  key={doctor.slug}
                  className="row-span-7 grid grid-rows-subgrid gap-y-3"
                >
                  <DoctorCard
                    doctor={doctor}
                    specialtyName={specialtyNames[doctor.primarySpecialtySlug]}
                    content={doctorsContent}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section
          aria-labelledby="specialty-location-heading"
          className="flex flex-col gap-3 border-t border-border pt-6x"
        >
          <h2 id="specialty-location-heading" className="text-lg">
            {content.locationLabel}
          </h2>
          <Link
            href="/#locations"
            className="flex min-h-11 w-fit items-center gap-2 rounded-sm text-base font-semibold text-primary hover:underline"
          >
            <MapPinIcon aria-hidden className="size-4 shrink-0" />
            {content.locationLinkLabel}
          </Link>
        </section>

        <section
          aria-labelledby="specialty-others-heading"
          className="flex flex-col gap-4 border-t border-border pt-6x"
        >
          <h2 id="specialty-others-heading" className="text-lg">
            {content.otherServicesLabel}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/specialties/${other.slug}`}
                  className="group flex h-full min-h-14 items-center justify-between gap-3 rounded-card border border-border bg-card px-5 py-3 text-base font-semibold text-body-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {other.name}
                  <ArrowRightIcon
                    aria-hidden
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="flex items-start gap-2 rounded-card border border-alert/25 bg-alert-bg px-5 py-4 text-sm font-semibold text-alert">
          <ShieldAlertIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
          {emergencyNote}
        </p>
      </Container>
    </>
  );
}
