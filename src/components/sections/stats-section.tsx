import type { LucideIcon } from "lucide-react";
import { ClockIcon, FileTextIcon, MapPinIcon } from "lucide-react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import type { StatReasonIcon, StatsSectionContent } from "@/types/content";

const reasonIcons: Record<StatReasonIcon, LucideIcon> = {
  campus: MapPinIcon,
  record: FileTextIcon,
  hours: ClockIcon,
};

/**
 * Owns `#about`, which `navigation.ts` and the footer already point at.
 *
 * The figures are a `<dl>` in reading order — label, value, detail — and only
 * the paint is reordered, so a screen reader hears "Licensed beds, not yet
 * available" rather than an em dash on its own.
 */
export function StatsSection({
  content,
}: {
  readonly content: StatsSectionContent;
}) {
  const hasPendingFigure = content.figures.some(
    (figure) => figure.value === null,
  );

  return (
    <section
      id="about"
      aria-labelledby="stats-heading"
      className="py-8x lg:py-9x"
    >
      <Container className="flex flex-col gap-7x">
        <SectionHeading
          id="stats-heading"
          eyebrow={content.eyebrow}
          title={content.heading}
          lead={content.lead}
        />

        <ul className="grid gap-6x md:grid-cols-3">
          {content.reasons.map((reason) => {
            const Glyph = reasonIcons[reason.icon];

            return (
              <li key={reason.id} className="flex flex-col gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Glyph aria-hidden className="size-5" />
                </span>
                <h3 className="text-lg">{reason.title}</h3>
                <p className="text-sm text-body-foreground">{reason.body}</p>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col gap-6x rounded-card border border-border bg-card p-6x">
          <h3 className="font-sans text-eyebrow font-semibold tracking-eyebrow text-muted-foreground uppercase">
            {content.figuresLabel}
          </h3>

          <dl className="grid gap-6x sm:grid-cols-2 lg:grid-cols-3">
            {content.figures.map((figure) => (
              <div key={figure.id} className="flex flex-col gap-1">
                <dt className="order-2 text-button font-semibold text-foreground">
                  {figure.label}
                </dt>
                <dd className="order-1 font-heading text-2xl text-foreground">
                  {figure.value ?? (
                    <>
                      <span aria-hidden>{content.pendingValue}</span>
                      <span className="sr-only">{content.pendingSrLabel}</span>
                    </>
                  )}
                </dd>
                <dd className="order-3 text-xs text-muted-foreground">
                  {figure.detail}
                </dd>
              </div>
            ))}
          </dl>

          {hasPendingFigure ? (
            <p className="border-t border-border pt-4 text-xs text-muted-foreground">
              {content.pendingNotice}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
