"use client";

import { RotateCcwIcon, ShieldAlertIcon } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { PhoneLink } from "@/components/shared/phone-link";
import { errorPage } from "@/content/error";
import { site } from "@/content/site";

/**
 * Next requires an error boundary to be a Client Component. PLAN.md §2 listed
 * this file and it was never built, which meant an exception anywhere in the
 * tree fell through to Next's own screen — no header, no emergency bar, no
 * phone number.
 *
 * `reset()` is offered rather than a reload because it re-renders the segment
 * without discarding the rest of the page. The error itself is not printed:
 * a stack trace tells this audience nothing and can leak internals.
 */
export default function ErrorBoundary({ reset }: { readonly reset: () => void }) {
  return (
    <section aria-labelledby="error-heading" className="py-9x">
      <Container className="flex max-w-2xl flex-col gap-5">
        <p className="text-eyebrow font-semibold tracking-eyebrow text-primary uppercase">
          {errorPage.eyebrow}
        </p>
        <h1 id="error-heading" className="text-2xl">
          {errorPage.heading}
        </h1>
        <p className="text-base text-body-foreground">{errorPage.lead}</p>

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground transition-colors hover:bg-brand-hover"
          >
            <RotateCcwIcon aria-hidden className="size-4 shrink-0" />
            {errorPage.retryLabel}
          </button>
          <Link
            href="/"
            className="flex min-h-11 items-center rounded-sm px-1 text-button font-semibold text-body-foreground underline underline-offset-4 hover:text-primary"
          >
            {errorPage.homeLabel}
          </Link>
        </div>

        <p className="flex flex-col gap-1 text-sm">
          <span className="text-muted-foreground">{errorPage.phoneLabel}</span>
          <PhoneLink
            phone={site.phones.appointments}
            className="text-lg font-semibold text-primary underline underline-offset-4"
          />
        </p>

        <p className="flex gap-3 rounded-card bg-alert-bg p-5 text-sm text-alert">
          <ShieldAlertIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
          {errorPage.emergencyNote}
        </p>
      </Container>
    </section>
  );
}
