import type { Metadata } from "next";
import { ArrowRightIcon, ChevronRightIcon, InfoIcon } from "lucide-react";
import Link from "next/link";

import { DoctorCard } from "@/components/cards/doctor-card";
import { Container } from "@/components/shared/container";
import { doctorPage } from "@/content/doctor-page";
import { doctorsSection } from "@/content/doctors";
import {
  getDoctorsBySpecialty,
  getSpecialties,
  getSpecialtyNames,
} from "@/content/queries";
import { site } from "@/content/site";

/**
 * The directory. `Find a Clinician` in the nav pointed at `/#doctors`, a strip
 * of cards on the home page with nowhere to go from them.
 *
 * **Grouped by service, and the services with nobody in them are a group too.**
 * Three of the four have no named clinician, and `doctorsSection.pendingNotice`
 * has said so on the home page for a while. Dropping those three from the page
 * would read as "we do not have that", which is a different and false claim —
 * the same reason `SpecialtyDetail` prints a notice instead of hiding a section.
 *
 * **No filters.** The plan called for chips on specialty, language and
 * accepting-new-patients, and all three fields are in the record — but there
 * are two clinicians. A filter row over two rows of results is furniture, and
 * it would be the only client JS on the page. It goes in when there is a roster
 * to filter; the grouping below is the seam it slots into.
 */
export const metadata: Metadata = {
  title: "Our Clinicians",
  description:
    "The clinicians practising at Dighton Medical Center — what they look after, the languages they speak, and who is accepting new patients.",
  alternates: { canonical: "/doctors" },
  openGraph: {
    title: `Our Clinicians — ${site.name}`,
    description:
      "Who practises at Dighton Medical Center, and how to book with them.",
    url: "/doctors",
  },
};

export default async function DoctorsDirectoryPage() {
  const [specialties, specialtyNames] = await Promise.all([
    getSpecialties(),
    getSpecialtyNames(),
  ]);

  const groups = await Promise.all(
    specialties.map(async (specialty) => ({
      specialty,
      clinicians: await getDoctorsBySpecialty(specialty.slug),
    })),
  );

  const staffed = groups.filter((group) => group.clinicians.length > 0);
  const unstaffed = groups.filter((group) => group.clinicians.length === 0);

  return (
    <>
      <div className="bg-muted py-7x lg:py-8x">
        <Container className="flex flex-col gap-6x">
          <nav aria-label={doctorPage.breadcrumbLabel}>
            <ol className="-mx-1 flex flex-wrap items-center gap-1 text-sm text-body-foreground">
              <li>
                <Link
                  href="/"
                  className="flex min-h-11 items-center rounded-sm px-1 hover:text-primary"
                >
                  {doctorPage.homeLabel}
                </Link>
              </li>
              <li aria-hidden className="text-muted-foreground">
                <ChevronRightIcon className="size-4" />
              </li>
              <li aria-current="page" className="font-semibold text-foreground">
                {doctorPage.eyebrow}
              </li>
            </ol>
          </nav>

          <div className="flex max-w-2xl flex-col gap-4">
            <p className="text-eyebrow font-semibold tracking-eyebrow text-primary uppercase">
              {doctorPage.eyebrow}
            </p>
            <h1 className="text-2xl">{doctorPage.directoryTitle}</h1>
            <p className="text-base text-body-foreground">
              {doctorPage.directoryLead}
            </p>
          </div>
        </Container>
      </div>

      <Container className="flex flex-col gap-8x py-8x">
        {staffed.map(({ specialty, clinicians }) => (
          <section
            key={specialty.slug}
            aria-labelledby={`clinicians-${specialty.slug}`}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 id={`clinicians-${specialty.slug}`} className="text-xl">
                {specialty.name}
              </h2>
              <Link
                href={`/specialties/${specialty.slug}`}
                className="flex min-h-11 items-center gap-2 rounded-sm text-button font-semibold text-primary hover:underline"
              >
                {doctorPage.serviceLinkLabel}
                <span className="sr-only"> — {specialty.name}</span>
                <ArrowRightIcon aria-hidden className="size-4 shrink-0" />
              </Link>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {clinicians.map((doctor) => (
                <li
                  key={doctor.slug}
                  className="row-span-7 grid grid-rows-subgrid gap-y-3"
                >
                  <DoctorCard
                    doctor={doctor}
                    specialtyName={specialtyNames[doctor.primarySpecialtySlug]}
                    content={doctorsSection}
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}

        {unstaffed.length === 0 ? null : (
          <section
            aria-labelledby="clinicians-unstaffed"
            className="flex flex-col gap-5 border-t border-border pt-8x"
          >
            <h2 id="clinicians-unstaffed" className="text-xl">
              {doctorPage.unstaffedLabel}
            </h2>
            <p className="max-w-2xl text-base text-body-foreground">
              {doctorPage.unstaffedBody}
            </p>

            <ul className="grid gap-3 sm:grid-cols-3">
              {unstaffed.map(({ specialty }) => (
                <li key={specialty.slug}>
                  <Link
                    href={`/specialties/${specialty.slug}`}
                    className="group flex h-full min-h-14 items-center justify-between gap-3 rounded-card border border-border bg-card px-5 py-3 text-base font-semibold text-body-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {specialty.name}
                    <ArrowRightIcon
                      aria-hidden
                      className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/*
              The same sentence the home page carries. It is the client's roster
              to supply, and `doctors.ts` forbids filling the gap by inventing a
              geriatrician, a psychologist and a physical therapist.
            */}
            <p className="flex max-w-2xl items-start gap-3 rounded-card border border-border bg-card p-6x text-base text-body-foreground">
              <InfoIcon aria-hidden className="mt-1 size-5 shrink-0" />
              {doctorsSection.pendingNotice}
            </p>
          </section>
        )}
      </Container>
    </>
  );
}
