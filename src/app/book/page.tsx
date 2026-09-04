import type { Metadata } from "next";
import { ChevronRightIcon, ShieldAlertIcon } from "lucide-react";
import Link from "next/link";

import { AppointmentForm } from "@/components/booking/appointment-form";
import { Container } from "@/components/shared/container";
import { booking } from "@/content/booking";
import { getDoctorBySlug, getSpecialties } from "@/content/queries";
import { site } from "@/content/site";
import { UNSURE_SERVICE } from "@/lib/booking";
import { formatDoctorName } from "@/lib/format";

/**
 * The route `navigation.ts` reserved on day one and that 404'd until now.
 *
 * PLAN.md §5 item 1 called scheduling-without-a-URL the most expensive mistake
 * available: a dialog driven by `useState` is not shareable, not indexable, does
 * not survive a refresh, cannot be resumed from a link, and closes the page
 * instead of itself on Android's back button. This is the page that mistake was
 * avoided for, and `BookCta` is why nothing else had to change to reach it.
 *
 * **Only `specialty` and `doctor` are read from the query string**, and both are
 * slugs. §5 item 5 rules out PHI in a URL, so nothing anyone types about
 * themselves ever gets there — the form posts, it never navigates.
 */
export const metadata: Metadata = {
  title: "Request an Appointment",
  description:
    "Request an appointment at Dighton Medical Center for primary care, geriatric care, psychology or physical therapy — or tell us you are not sure and we will help you find the right place to start.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: `Request an Appointment — ${site.name}`,
    description:
      "Tell us how to reach you and someone from the practice calls you back to fix a time.",
    url: "/book",
  },
};

const readParam = (
  value: string | readonly string[] | undefined,
): string | null => (typeof value === "string" && value !== "" ? value : null);

export default async function BookPage({ searchParams }: PageProps<"/book">) {
  const [params, services] = await Promise.all([
    searchParams,
    getSpecialties(),
  ]);

  const requestedService = readParam(params.specialty);
  const requestedDoctor = readParam(params.doctor);

  /*
   * A slug that is not ours is dropped, not 404'd. Someone arriving from a
   * stale link still wants to book; they should land on the form with nothing
   * preselected rather than on an error page.
   */
  const initialService =
    requestedService === UNSURE_SERVICE ||
    services.some((specialty) => specialty.slug === requestedService)
      ? requestedService
      : null;

  const doctor =
    requestedDoctor === null ? undefined : await getDoctorBySlug(requestedDoctor);

  return (
    <div className="py-7x lg:py-8x">
      <Container className="flex flex-col gap-6x">
        <nav aria-label={booking.breadcrumbLabel}>
          <ol className="-mx-1 flex flex-wrap items-center gap-1 text-sm text-body-foreground">
            <li>
              <Link
                href="/"
                className="flex min-h-11 items-center rounded-sm px-1 hover:text-primary"
              >
                {booking.homeLabel}
              </Link>
            </li>
            <li aria-hidden className="text-muted-foreground">
              <ChevronRightIcon className="size-4" />
            </li>
            <li aria-current="page" className="font-semibold text-foreground">
              {booking.breadcrumbLabel}
            </li>
          </ol>
        </nav>

        <AppointmentForm
          content={booking}
          services={services}
          initialService={initialService}
          clinician={
            doctor === undefined
              ? null
              : { slug: doctor.slug, name: `Dr. ${formatDoctorName(doctor)}` }
          }
          phone={site.phones.appointments}
        />

        {/*
          The emergency route sits below the form on `--alert-bg`, outside it.
          Somebody filling in a callback window is the one visitor on the site
          who most needs to be told that this is not the route for an emergency.
        */}
        <p className="flex max-w-2xl gap-3 rounded-card bg-alert-bg p-5 text-sm text-alert">
          <ShieldAlertIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
          {booking.emergencyNote}
        </p>
      </Container>
    </div>
  );
}
