import {
  ArrowRightIcon,
  CheckIcon,
  ChevronRightIcon,
  InfoIcon,
  MapPinIcon,
  ShieldAlertIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BookCta } from "@/components/booking/book-cta";
import { Container } from "@/components/shared/container";
import { PhoneLink } from "@/components/shared/phone-link";
import { formatDoctorName } from "@/lib/format";
import type {
  Doctor,
  DoctorPageContent,
  DoctorsSectionContent,
  LanguageCode,
} from "@/types/content";

interface DoctorDetailProps {
  readonly content: DoctorPageContent;
  /** Reused so a language name here and on a card cannot drift apart. */
  readonly doctorsContent: DoctorsSectionContent;
  readonly doctor: Doctor;
  readonly specialtyNames: Readonly<Record<string, string>>;
  readonly others: readonly Doctor[];
  /** E.164 — the appointment line. */
  readonly phone: string;
  readonly emergencyNote: string;
}

/**
 * Presentational, Server, zero JS — the same contract `SpecialtyDetail` holds,
 * and deliberately the same page shape, so the two detail routes on this site
 * read as one design rather than two.
 *
 * Everything here comes off the `Doctor` record, including the four fields
 * nothing had ever rendered: `education`, `boardCertifications`,
 * `yearsOfExperience` and the full `specialtySlugs` list. Adding a clinician
 * stays a `doctors.ts` edit.
 *
 * `photo.src` is `null` for both clinicians today and the monogram stands in.
 * That is not a missing asset to be patched with a stock face: these are
 * invented people, and a real person's likeness must not be attached to one.
 */
export function DoctorDetail({
  content,
  doctorsContent,
  doctor,
  specialtyNames,
  others,
  phone,
  emergencyNote,
}: DoctorDetailProps) {
  const fullName = formatDoctorName(doctor);
  const initials = `${[...doctor.firstName][0] ?? ""}${[...doctor.lastName][0] ?? ""}`;
  const languageName = (code: LanguageCode) => doctorsContent.languageNames[code];

  return (
    <>
      <div className="bg-muted py-7x lg:py-8x">
        <Container className="flex flex-col gap-6x">
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
                  href="/doctors"
                  className="flex min-h-11 items-center rounded-sm px-1 hover:text-primary"
                >
                  {content.eyebrow}
                </Link>
              </li>
              <li aria-hidden className="text-muted-foreground">
                <ChevronRightIcon className="size-4" />
              </li>
              <li aria-current="page" className="font-semibold text-foreground">
                {fullName}
              </li>
            </ol>
          </nav>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6x">
            {/* Fixed 96px either way — a portrait drops in without moving anything. */}
            <span className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10">
              {doctor.photo.src === null ? (
                <span
                  aria-hidden
                  className="font-heading text-2xl text-primary select-none"
                >
                  {initials}
                </span>
              ) : (
                <Image
                  src={doctor.photo.src}
                  alt={doctor.photo.alt}
                  width={doctor.photo.width}
                  height={doctor.photo.height}
                  sizes="96px"
                  priority
                  className="size-full object-cover"
                />
              )}
            </span>

            <div className="flex max-w-2xl flex-col gap-3">
              <h1 className="text-2xl">{fullName}</h1>
              <p className="font-heading text-xl text-primary">
                {doctor.title}
              </p>

              <ul className="flex flex-wrap gap-2 pt-1">
                <li
                  className={
                    doctor.acceptingNewPatients
                      ? "flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
                      : "rounded-full border border-input px-4 py-2 text-sm text-body-foreground"
                  }
                >
                  {doctor.acceptingNewPatients ? (
                    <>
                      <CheckIcon aria-hidden className="size-4 shrink-0" />
                      {content.acceptingLabel}
                    </>
                  ) : (
                    content.notAcceptingLabel
                  )}
                </li>
                <li className="rounded-full border border-input px-4 py-2 text-sm text-body-foreground">
                  {content.experienceLabel.replace(
                    "%n",
                    String(doctor.yearsOfExperience),
                  )}
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      <Container className="flex flex-col gap-8x py-8x">
        <section
          aria-labelledby="doctor-about-heading"
          className="flex max-w-2xl flex-col gap-4"
        >
          <h2 id="doctor-about-heading" className="text-xl">
            {content.aboutLabel}
          </h2>
          <p className="text-base text-body-foreground">{doctor.bio}</p>
        </section>

        <div className="grid gap-6x lg:grid-cols-2">
          <section
            aria-labelledby="doctor-education-heading"
            className="flex flex-col gap-4 rounded-card border border-border bg-card p-6x"
          >
            <h2 id="doctor-education-heading" className="text-lg">
              {content.educationLabel}
            </h2>
            <ul className="flex flex-col gap-4">
              {doctor.education.map((entry) => (
                <li
                  key={`${entry.institution}-${entry.year}`}
                  className="flex flex-col gap-1"
                >
                  <span className="text-base font-semibold text-foreground">
                    {entry.degree}
                  </span>
                  <span className="text-sm text-body-foreground">
                    {entry.institution}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {entry.year}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="doctor-certifications-heading"
            className="flex flex-col gap-4 rounded-card border border-border bg-card p-6x"
          >
            <h2 id="doctor-certifications-heading" className="text-lg">
              {content.certificationsLabel}
            </h2>
            <ul className="flex flex-col gap-3">
              {doctor.boardCertifications.map((certification) => (
                <li
                  key={certification}
                  className="flex items-start gap-3 text-base text-body-foreground"
                >
                  <CheckIcon
                    aria-hidden
                    className="mt-1.5 size-4 shrink-0 text-primary"
                  />
                  {certification}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-2 border-t border-border pt-5">
              <h3 className="font-sans text-eyebrow font-semibold tracking-eyebrow text-muted-foreground uppercase">
                {content.languagesLabel}
              </h3>
              <p className="text-base text-body-foreground">
                {doctor.languages.map(languageName).join(", ")}
              </p>
            </div>

            <div className="flex flex-col gap-2 border-t border-border pt-5">
              <h3 className="font-sans text-eyebrow font-semibold tracking-eyebrow text-muted-foreground uppercase">
                {content.specialtiesLabel}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {doctor.specialtySlugs.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={`/specialties/${slug}`}
                      className="flex min-h-11 items-center rounded-full border border-input px-4 text-sm text-body-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {specialtyNames[slug] ?? slug}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <section
          aria-labelledby="doctor-booking-heading"
          className="flex flex-col gap-5 rounded-card bg-primary p-6x lg:p-8x"
        >
          <div className="flex max-w-xl flex-col gap-2">
            <h2 id="doctor-booking-heading" className="text-xl text-primary-foreground">
              {content.bookingLabel}
            </h2>
            <p className="text-base text-primary-foreground/85">
              {doctor.acceptingNewPatients
                ? content.bookingLead
                : content.notAcceptingBody}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/*
              The clinician travels with the request, so the form names them and
              the practice does not have to ask again. Both slugs are ours —
              nothing a visitor typed reaches the URL (PLAN.md §5 item 5).
            */}
            <BookCta
              specialty={doctor.primarySpecialtySlug}
              doctor={doctor.slug}
              variant="secondary"
              className="h-12 rounded-full px-6 text-base font-semibold"
            />
            <p className="flex flex-col gap-1 text-sm">
              <span className="text-primary-foreground/85">
                {content.phoneLabel}
              </span>
              <PhoneLink
                phone={phone}
                className="flex min-h-11 w-fit items-center text-lg font-semibold text-primary-foreground underline underline-offset-4"
              />
            </p>
          </div>
        </section>

        <section
          aria-labelledby="doctor-location-heading"
          className="flex flex-col gap-3 border-t border-border pt-6x"
        >
          <h2 id="doctor-location-heading" className="text-lg">
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

        {others.length === 0 ? (
          <p className="flex items-start gap-3 rounded-card border border-border bg-card p-6x text-base text-body-foreground">
            <InfoIcon aria-hidden className="mt-1 size-5 shrink-0" />
            {doctorsContent.pendingNotice}
          </p>
        ) : (
          <section
            aria-labelledby="doctor-others-heading"
            className="flex flex-col gap-4 border-t border-border pt-6x"
          >
            <h2 id="doctor-others-heading" className="text-lg">
              {content.otherCliniciansLabel}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-3">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/doctors/${other.slug}`}
                    className="group flex h-full min-h-14 items-center justify-between gap-3 rounded-card border border-border bg-card px-5 py-3 text-base font-semibold text-body-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {formatDoctorName(other)}
                    <ArrowRightIcon
                      aria-hidden
                      className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="flex items-start gap-2 rounded-card border border-alert/25 bg-alert-bg px-5 py-4 text-sm font-semibold text-alert">
          <ShieldAlertIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
          {emergencyNote}
        </p>
      </Container>
    </>
  );
}
