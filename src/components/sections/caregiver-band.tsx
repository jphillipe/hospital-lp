import { ArrowRightIcon, CheckIcon, HeartHandshakeIcon } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { PhoneLink } from "@/components/shared/phone-link";
import type { CaregiverBandContent } from "@/types/content";

interface CaregiverBandProps {
  readonly content: CaregiverBandContent;
  /** E.164 — the appointment line, read out rather than hidden in a button. */
  readonly phone: string;
}

/**
 * Server, zero JS. Addressed to the adult child rather than to the patient,
 * and placed straight after the specialties grid — the moment where someone
 * has just read "Geriatric Care" and is wondering whether it is their door.
 *
 * On `--card` over the page ground rather than in a tinted band: this is the
 * one section that has to feel like being spoken to, and a coloured block
 * reads as an advertisement.
 */
export function CaregiverBand({ content, phone }: CaregiverBandProps) {
  return (
    <section
      id="caregivers"
      aria-labelledby="caregivers-heading"
      className="py-8x lg:py-9x"
    >
      <Container>
        <div className="flex flex-col gap-7x rounded-card border border-border bg-card p-6x lg:flex-row lg:items-center lg:justify-between lg:p-9x">
          <div className="flex max-w-xl flex-col gap-4">
            <p className="flex items-center gap-3 text-eyebrow font-semibold tracking-eyebrow text-primary uppercase">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <HeartHandshakeIcon aria-hidden className="size-4" />
              </span>
              {content.eyebrow}
            </p>

            <div className="flex flex-col gap-2">
              <h2 id="caregivers-heading" className="text-2xl">
                {content.heading}
              </h2>
              <p className="font-heading text-xl text-primary">
                {content.lead}
              </p>
            </div>

            <p className="text-base text-body-foreground">{content.body}</p>

            <ul className="flex flex-col gap-2">
              {content.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm text-body-foreground"
                >
                  <CheckIcon
                    aria-hidden
                    className="mt-1 size-4 shrink-0 text-primary"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex shrink-0 flex-col gap-4">
            <Link
              href={content.action.href}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground transition-colors hover:bg-brand-hover"
            >
              {content.action.label}
              <ArrowRightIcon aria-hidden className="size-4 shrink-0" />
            </Link>

            <p className="flex flex-col gap-1 text-sm">
              <span className="text-muted-foreground">
                {content.phoneLabel}
              </span>
              <PhoneLink
                phone={phone}
                className="text-lg font-semibold text-primary underline underline-offset-4"
              />
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
