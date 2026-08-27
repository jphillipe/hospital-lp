import { FaqAccordion } from "@/components/faq/faq-accordion";
import { Container } from "@/components/shared/container";
import { PhoneLink } from "@/components/shared/phone-link";
import { SectionHeading } from "@/components/shared/section-heading";
import type { Faq, FaqSectionContent } from "@/types/content";

interface FaqSectionProps {
  readonly content: FaqSectionContent;
  readonly faqs: readonly Faq[];
  /** E.164 — the number the fallback points at. */
  readonly phone: string;
}

/**
 * Server. The accordion is the only thing here that needs JS, so it is the
 * only thing that ships any.
 *
 * The column is capped rather than full-bleed: a question set is read, not
 * scanned, and 11 rows of full-width text is a worse reading measure than the
 * grids either side of it.
 */
export function FaqSection({ content, faqs, phone }: FaqSectionProps) {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-8x lg:py-9x">
      <Container className="flex max-w-3xl flex-col gap-7x">
        <SectionHeading
          id="faq-heading"
          eyebrow={content.eyebrow}
          title={content.heading}
          lead={content.lead}
        />

        <FaqAccordion faqs={faqs} />

        <p className="text-sm text-body-foreground">
          <span className="font-semibold text-foreground">
            {content.fallbackLabel}
          </span>{" "}
          {content.fallbackBody}{" "}
          <PhoneLink
            phone={phone}
            className="font-semibold text-primary underline-offset-4"
          />
        </p>
      </Container>
    </section>
  );
}
