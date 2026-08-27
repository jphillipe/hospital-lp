import { ShieldAlertIcon } from "lucide-react";

import { BookCta } from "@/components/booking/book-cta";
import { Container } from "@/components/shared/container";
import { PhoneLink } from "@/components/shared/phone-link";
import type { CtaBandContent } from "@/types/content";

interface CtaBandProps {
  readonly content: CtaBandContent;
  /** E.164 — the readable number beside the button. */
  readonly phone: string;
}

/**
 * The one saturated ground on the page. Direction G keeps the brand green for
 * a single moment and this is it: the last thing between reading and calling.
 *
 * `BookCta` takes the `secondary` variant here because its default is
 * `bg-primary`, which on a primary ground would be an invisible button. Every
 * pairing was checked in both themes — the button surface reads 7.08:1 against
 * the band in light and 7.37:1 in dark, and its own label clears 14:1 in both.
 *
 * The heading overrides the base layer's `text-foreground`, which is ink for
 * paper and not for this band.
 */
export function CtaBand({ content, phone }: CtaBandProps) {
  return (
    <section
      aria-labelledby="cta-band-heading"
      className="bg-primary py-8x lg:py-9x"
    >
      <Container className="flex flex-col gap-6x lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-xl flex-col gap-3">
          <h2
            id="cta-band-heading"
            className="text-2xl text-primary-foreground"
          >
            {content.heading}
          </h2>
          <p className="text-base text-primary-foreground/85">{content.body}</p>
        </div>

        <div className="flex shrink-0 flex-col gap-4">
          <BookCta variant="secondary" />

          <p className="flex flex-col gap-1 text-sm">
            <span className="text-primary-foreground/85">
              {content.phoneLabel}
            </span>
            <PhoneLink
              phone={phone}
              className="text-lg font-semibold text-primary-foreground underline underline-offset-4"
            />
          </p>
        </div>
      </Container>

      <Container className="mt-7x">
        <p className="flex items-start gap-2 border-t border-primary-foreground/20 pt-5 text-xs text-primary-foreground/85">
          <ShieldAlertIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
          {content.emergencyNote}
        </p>
      </Container>
    </section>
  );
}
