import { BookCta } from "@/components/booking/book-cta";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import type { HowItWorksContent } from "@/types/content";

/**
 * Three steps on a rule rather than in cards — four carded grids in a row
 * before this one, and the sequence reads better as columns under a hairline.
 *
 * `<ol>` carries the order, so the numeral is decorative and hidden from the
 * accessibility tree; it is derived from the index rather than stored, so
 * reordering the content cannot desynchronise it.
 *
 * Rows are subgridded for the same reason as `DoctorCard`: a step title wraps
 * to one line or two, and without it the bodies start at different heights.
 */
export function HowItWorks({
  content,
}: {
  readonly content: HowItWorksContent;
}) {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="py-8x lg:py-9x"
    >
      <Container className="flex flex-col gap-7x">
        <SectionHeading
          id="how-it-works-heading"
          eyebrow={content.eyebrow}
          title={content.heading}
          lead={content.lead}
        />

        <ol className="grid gap-6x md:grid-cols-3">
          {content.steps.map((step, index) => (
            <li
              key={step.id}
              className="row-span-3 grid grid-rows-subgrid gap-y-3 border-t border-border pt-5"
            >
              <p
                aria-hidden
                className="font-heading text-xl text-primary tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-lg">{step.title}</h3>
              <p className="text-sm text-body-foreground">{step.body}</p>
            </li>
          ))}
        </ol>

        <div>
          <BookCta />
        </div>
      </Container>
    </section>
  );
}
