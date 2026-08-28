import { InfoIcon } from "lucide-react";

import { DoctorCard } from "@/components/cards/doctor-card";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { formatDoctorName } from "@/lib/format";
import type { Doctor, DoctorsSectionContent } from "@/types/content";

interface DoctorsSectionProps {
  readonly content: DoctorsSectionContent;
  readonly featured: readonly Doctor[];
  /** Named under the grid, so every physician stays in the HTML. */
  readonly additional: readonly Doctor[];
  readonly specialtyNames: Readonly<Record<string, string>>;
}

/**
 * Back on `--muted`, alternating with the stats band above it.
 *
 * Each card carries its own `BookCta`. That is the whole point of the section
 * per PLAN.md — it is the entry point for "book with Dr. X", and routing every
 * one of those through `BookCta` is what makes v2 a one-file change.
 */
export function DoctorsSection({
  content,
  featured,
  additional,
  specialtyNames,
}: DoctorsSectionProps) {
  return (
    <section
      id="doctors"
      aria-labelledby="doctors-heading"
      className="bg-muted py-8x lg:py-9x"
    >
      <Container className="flex flex-col gap-7x">
        <SectionHeading
          id="doctors-heading"
          eyebrow={content.eyebrow}
          title={content.heading}
          lead={content.lead}
        />

        {/*
          The cards line up line for line rather than block for block: each one
          spans the same seven rows of this grid, so a two-line name in one card
          sets the name row for all four. `DoctorCard` carries the other half of
          this — its children have to stay direct children of the article.
        */}
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((doctor) => (
            <li
              key={doctor.slug}
              className="row-span-7 grid grid-rows-subgrid gap-y-3"
            >
              <DoctorCard
                doctor={doctor}
                specialtyName={specialtyNames[doctor.primarySpecialtySlug]}
                content={content}
              />
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2 border-t border-border pt-6x">
          {additional.length === 0 ? null : (
            <p className="text-sm text-body-foreground">
              <span className="font-semibold text-foreground">
                {content.moreLabel}
              </span>{" "}
              {additional.map((doctor) => formatDoctorName(doctor)).join(" · ")}
            </p>
          )}
          <p className="flex items-start gap-2 text-sm text-body-foreground">
            <InfoIcon aria-hidden className="mt-1 size-4 shrink-0" />
            {content.pendingNotice}
          </p>
        </div>
      </Container>
    </section>
  );
}
