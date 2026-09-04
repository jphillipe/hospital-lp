import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import type { CareModelContent } from "@/types/content";

interface CareModelSectionProps {
  readonly content: CareModelContent;
  /** Slug to display name, resolved by the page. */
  readonly specialtyNames: Readonly<Record<string, string>>;
}

/**
 * The section that says the four services are one practice.
 *
 * It is a numbered list on a rule rather than a flow chart with arrows: a chart
 * implies a route everyone travels, and only the first step is true of
 * everyone. The connector is a hairline the numbers sit on, so the sequence
 * reads on a phone without a horizontal scroll and degrades to a plain ordered
 * list when styles do not load.
 *
 * Server, props-only, zero JS.
 */
export function CareModelSection({
  content,
  specialtyNames,
}: CareModelSectionProps) {
  return (
    <section
      id="care-model"
      aria-labelledby="care-model-heading"
      className="py-8x lg:py-9x"
    >
      <Container className="flex flex-col gap-7x">
        <SectionHeading
          id="care-model-heading"
          eyebrow={content.eyebrow}
          title={content.heading}
          lead={content.lead}
        />

        <ol className="flex flex-col gap-6x border-l border-border pl-6x sm:gap-7x">
          {content.steps.map((step, index) => (
            <li key={step.id} className="relative flex flex-col gap-2">
              {/*
                Pulled back onto the rule by half its own width. `aria-hidden`
                because an ordered list already numbers itself for a screen
                reader, and hearing "one 1 Start anywhere" is worse than not
                hearing the digit at all.
              */}
              <span
                aria-hidden
                className="absolute top-0 -left-[calc(var(--spacing-6x)+1rem)] flex size-8 items-center justify-center rounded-full bg-primary font-heading text-sm text-primary-foreground"
              >
                {index + 1}
              </span>

              <h3 className="text-lg">{step.title}</h3>
              <p className="max-w-2xl text-base text-body-foreground">
                {step.body}
              </p>

              {step.specialtySlug === null ? null : (
                <Link
                  href={`/specialties/${step.specialtySlug}`}
                  className="flex min-h-11 w-fit items-center gap-2 rounded-sm text-button font-semibold text-primary hover:underline"
                >
                  {specialtyNames[step.specialtySlug] ?? step.title}
                  <ArrowRightIcon aria-hidden className="size-4 shrink-0" />
                </Link>
              )}
            </li>
          ))}
        </ol>

        <div className="flex flex-col gap-3 rounded-card bg-muted p-6x lg:p-7x">
          <h3 className="text-lg">{content.closingLabel}</h3>
          <p className="max-w-2xl text-base text-body-foreground">
            {content.closingBody}
          </p>
          <Link
            href={content.action.href}
            className="mt-2 inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground transition-colors hover:bg-brand-hover"
          >
            {content.action.label}
            <ArrowRightIcon aria-hidden className="size-4 shrink-0" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
