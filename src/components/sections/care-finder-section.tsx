import { ShieldAlertIcon } from "lucide-react";

import { CareFinderQuiz } from "@/components/care-finder/care-finder-quiz";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import type { CareFinderContent } from "@/types/content";

interface CareFinderSectionProps {
  readonly content: CareFinderContent;
  /** Slug to display name, resolved by the page and handed down. */
  readonly specialtyNames: Readonly<Record<string, string>>;
  /** E.164 — the appointment line. */
  readonly phone: string;
}

/**
 * Server. The heading, the lead and the emergency line are rendered here and
 * never enter the bundle; only `CareFinderQuiz` is Client, because only the
 * question state needs to be.
 *
 * The emergency line sits **outside** the quiz on purpose. Inside it, it would
 * be one more thing that changes as you answer; outside, it is fixed above
 * every step, which is the only way a route to emergency care is any use.
 */
export function CareFinderSection({
  content,
  specialtyNames,
  phone,
}: CareFinderSectionProps) {
  return (
    <section
      id="care-finder"
      aria-labelledby="care-finder-heading"
      className="bg-muted py-8x lg:py-9x"
    >
      <Container className="flex flex-col gap-6x">
        <SectionHeading
          id="care-finder-heading"
          eyebrow={content.eyebrow}
          title={content.heading}
          lead={content.lead}
        />

        <p className="flex items-start gap-2 text-sm font-semibold text-alert">
          <ShieldAlertIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
          {content.labels.emergencyNote}
        </p>

        <div className="max-w-2xl">
          <CareFinderQuiz
            content={content}
            specialtyNames={specialtyNames}
            phone={phone}
          />
        </div>
      </Container>
    </section>
  );
}
