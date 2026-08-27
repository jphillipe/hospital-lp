import { QuoteIcon } from "lucide-react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import type { TestimonialsSectionContent } from "@/types/content";

/**
 * A `<figure>` per story, so the quote and the person it belongs to are tied
 * together in the markup rather than only by proximity.
 *
 * Three subgrid rows — mark, quote, attribution — so the names sit on one line
 * across the row however long each quote runs.
 *
 * The disclaimer is not decoration. PLAN.md §1 item 09 requires it, the type
 * requires it, and it renders inside the section rather than only in the
 * footer, because that is where someone reading a patient story is looking.
 */
export function TestimonialsSection({
  content,
}: {
  readonly content: TestimonialsSectionContent;
}) {
  return (
    <section
      id="patient-stories"
      aria-labelledby="patient-stories-heading"
      className="bg-muted py-8x lg:py-9x"
    >
      <Container className="flex flex-col gap-7x">
        <SectionHeading
          id="patient-stories-heading"
          eyebrow={content.eyebrow}
          title={content.heading}
          lead={content.lead}
        />

        <ul className="grid gap-4 md:grid-cols-3">
          {content.testimonials.map((testimonial) => (
            <li
              key={testimonial.id}
              className="row-span-3 grid grid-rows-subgrid gap-y-4"
            >
              <figure className="row-span-3 grid grid-rows-subgrid gap-y-4 rounded-card border border-border bg-card p-6x">
                <QuoteIcon aria-hidden className="size-5 text-primary" />

                <blockquote className="font-heading text-lg text-foreground">
                  {testimonial.quote}
                </blockquote>

                <figcaption className="flex flex-col gap-1 border-t border-border pt-4 text-xs">
                  <span className="font-semibold text-foreground">
                    {testimonial.attribution}
                  </span>
                  <span className="text-muted-foreground">
                    {testimonial.context}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <p className="border-t border-border pt-5 text-xs text-body-foreground">
          {content.disclaimer}
        </p>
      </Container>
    </section>
  );
}
