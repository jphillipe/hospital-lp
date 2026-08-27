import { ArrowRightIcon, ShieldAlertIcon } from "lucide-react";
import Link from "next/link";

import { BookCta } from "@/components/booking/book-cta";
import { Container } from "@/components/shared/container";
import { PhoneLink } from "@/components/shared/phone-link";
import { notFoundPage } from "@/content/not-found";
import { site } from "@/content/site";

/**
 * Server, and rendered inside the root layout — so the emergency bar, the
 * header and the footer are all still there. This page only has to answer
 * "where did I land, and where do I go now".
 *
 * The `<h1>` is this page's own: the layout has none, so there is still
 * exactly one per page.
 */
export default function NotFound() {
  return (
    <section aria-labelledby="not-found-heading" className="py-9x">
      <Container className="flex flex-col gap-8x">
        <div className="flex max-w-2xl flex-col gap-4">
          <p className="text-eyebrow font-semibold tracking-eyebrow text-primary uppercase">
            {notFoundPage.eyebrow}
          </p>
          <h1
            id="not-found-heading"
            className="text-hero leading-hero tracking-hero"
          >
            {notFoundPage.heading}
          </h1>
          <p className="text-base text-body-foreground">{notFoundPage.lead}</p>
          <div className="mt-3">
            <BookCta />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="font-sans text-eyebrow font-semibold tracking-eyebrow text-muted-foreground uppercase">
            {notFoundPage.destinationsLabel}
          </h2>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notFoundPage.destinations.map((destination) => (
              <li
                key={destination.href}
                className="row-span-3 grid grid-rows-subgrid gap-y-2"
              >
                <Link
                  href={destination.href}
                  className="group row-span-3 grid grid-rows-subgrid gap-y-2 rounded-card border border-border bg-card p-5 transition-colors hover:border-primary"
                >
                  <span className="text-lg font-semibold text-foreground">
                    {destination.label}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {destination.description}
                  </span>
                  <span className="flex items-center gap-2 text-button font-semibold text-primary">
                    <ArrowRightIcon
                      aria-hidden
                      className="size-4 shrink-0 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-card border border-alert/25 bg-alert-bg px-5 py-4 text-sm">
          <span className="flex items-center gap-2 font-semibold text-alert">
            <ShieldAlertIcon aria-hidden className="size-4 shrink-0" />
            {notFoundPage.emergencyNote}
          </span>
          <PhoneLink
            phone={site.phones.emergencyDepartment}
            className="font-semibold text-alert underline underline-offset-4"
          />
        </p>
      </Container>
    </section>
  );
}
