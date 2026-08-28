import { InfoIcon } from "lucide-react";

import { BookCta } from "@/components/booking/book-cta";
import { SpecialtyCard } from "@/components/cards/specialty-card";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import type { SpecialtiesSectionContent, Specialty } from "@/types/content";

interface SpecialtiesSectionProps {
  readonly content: SpecialtiesSectionContent;
  readonly featured: readonly Specialty[];
  /** Named in a line under the grid. Empty today — the block drops out. */
  readonly additional: readonly Specialty[];
}

/**
 * Breadth of care. `--muted` gives the page its first change of ground since
 * the hero, which is what separates this band from the strip above it without
 * spending a rule on it.
 *
 * Four cards, two columns on a phone: the grid is `sm:grid-cols-2` rather than
 * `lg:grid-cols-4` because four names at readable size beat four names in a
 * row that has to shrink them.
 */
export function SpecialtiesSection({
  content,
  featured,
  additional,
}: SpecialtiesSectionProps) {
  return (
    <section
      id="specialties"
      aria-labelledby="specialties-heading"
      className="bg-muted py-8x lg:py-9x"
    >
      <Container className="flex flex-col gap-7x">
        <SectionHeading
          id="specialties-heading"
          eyebrow={content.eyebrow}
          title={content.heading}
          lead={content.lead}
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((specialty) => (
            <li key={specialty.slug}>
              <SpecialtyCard specialty={specialty} />
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-5 border-t border-border pt-6x sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            {/* `--body-foreground`, not muted: over `--muted` that is 4.11:1. */}
            {additional.length === 0 ? null : (
              <p className="text-sm text-body-foreground">
                <span className="font-semibold text-foreground">
                  {content.moreLabel}
                </span>{" "}
                {additional.map((specialty) => specialty.name).join(" · ")}
              </p>
            )}
            <p className="flex items-start gap-2 text-sm text-body-foreground">
              <InfoIcon aria-hidden className="mt-1 size-4 shrink-0" />
              {content.pendingNotice}
            </p>
          </div>
          <BookCta className="shrink-0" />
        </div>
      </Container>
    </section>
  );
}
