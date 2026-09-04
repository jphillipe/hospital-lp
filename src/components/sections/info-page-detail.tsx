import { CheckIcon, ChevronRightIcon, InfoIcon } from "lucide-react";
import Link from "next/link";

import { BookCta } from "@/components/booking/book-cta";
import { Container } from "@/components/shared/container";
import { PhoneLink } from "@/components/shared/phone-link";
import type { Faq, InfoPage } from "@/types/content";

interface InfoPageDetailProps {
  readonly page: InfoPage;
  /** All published FAQs, resolved by the route. Sections name their slugs. */
  readonly faqs: readonly Faq[];
  /** E.164. */
  readonly phone: string;
}

/**
 * One component for `/new-patients`, `/insurance` and `/accessibility`.
 *
 * A section's prose is its own `body` followed by the answers to the FAQ slugs
 * it names — so these pages are a re-composition of `faqs.ts` rather than a
 * second copy of it. A slug that does not resolve is dropped silently rather
 * than rendering an empty heading, which is the failure mode when an FAQ is
 * renamed.
 *
 * Server, props-only, zero JS.
 */
export function InfoPageDetail({ page, faqs, phone }: InfoPageDetailProps) {
  const answerFor = (slug: string) => faqs.find((faq) => faq.slug === slug);

  return (
    <>
      <div className="bg-muted py-7x lg:py-8x">
        <Container className="flex flex-col gap-6x">
          <nav aria-label={page.breadcrumbLabel}>
            <ol className="-mx-1 flex flex-wrap items-center gap-1 text-sm text-body-foreground">
              <li>
                <Link
                  href="/"
                  className="flex min-h-11 items-center rounded-sm px-1 hover:text-primary"
                >
                  {page.homeLabel}
                </Link>
              </li>
              <li aria-hidden className="text-muted-foreground">
                <ChevronRightIcon className="size-4" />
              </li>
              <li aria-current="page" className="font-semibold text-foreground">
                {page.eyebrow}
              </li>
            </ol>
          </nav>

          <div className="flex max-w-2xl flex-col gap-4">
            <p className="text-eyebrow font-semibold tracking-eyebrow text-primary uppercase">
              {page.eyebrow}
            </p>
            <h1 className="text-2xl">{page.title}</h1>
            <p className="text-base text-body-foreground">{page.lead}</p>
          </div>
        </Container>
      </div>

      <Container className="flex max-w-3xl flex-col gap-8x py-8x">
        {page.pendingNotice === null ? null : (
          <p className="flex items-start gap-3 rounded-card bg-alert-bg p-6x text-base text-alert">
            <InfoIcon aria-hidden className="mt-1 size-5 shrink-0" />
            {page.pendingNotice}
          </p>
        )}

        {page.sections.map((section) => (
          <section
            key={section.id}
            aria-labelledby={`info-${section.id}`}
            className="flex flex-col gap-4"
          >
            <h2 id={`info-${section.id}`} className="text-xl">
              {section.heading}
            </h2>

            {section.body === undefined ? null : (
              <p className="text-base text-body-foreground">{section.body}</p>
            )}

            {section.faqSlugs.map((slug) => {
              const faq = answerFor(slug);
              if (faq === undefined) return null;

              return (
                <p key={slug} className="text-base text-body-foreground">
                  {faq.answer}
                </p>
              );
            })}

            {section.points === undefined ? null : (
              <ul className="flex flex-col gap-2 rounded-card border border-border bg-card p-6x">
                {section.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-base text-body-foreground"
                  >
                    <CheckIcon
                      aria-hidden
                      className="mt-1.5 size-4 shrink-0 text-primary"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section
          aria-labelledby="info-closing"
          className="flex flex-col gap-4 rounded-card bg-primary p-6x lg:p-8x"
        >
          <h2 id="info-closing" className="text-xl text-primary-foreground">
            {page.closingLabel}
          </h2>
          <p className="max-w-xl text-base text-primary-foreground/85">
            {page.closingBody}
          </p>

          <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
            <BookCta
              variant="secondary"
              className="h-12 rounded-full px-6 text-base font-semibold"
            />
            <p className="flex flex-col gap-1 text-sm">
              <span className="text-primary-foreground/85">
                {page.phoneLabel}
              </span>
              <PhoneLink
                phone={phone}
                className="flex min-h-11 w-fit items-center text-lg font-semibold text-primary-foreground underline underline-offset-4"
              />
            </p>
          </div>
        </section>
      </Container>
    </>
  );
}
