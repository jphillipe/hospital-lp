import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { BookCta } from "@/components/booking/book-cta";
import { HeroMedia } from "@/components/sections/hero-media";
import { Container } from "@/components/shared/container";
import type { HeroContent } from "@/types/content";

/**
 * Server, and it ships zero JS. The three-slide carousel that used to stand
 * here was the single worst thing on the page for the audience this site is
 * for: it moved the offer away from anyone reading slowly, it hid two of its
 * three messages behind controls, and it was 210 lines of client bundle to do
 * it. One frame, one argument, no state.
 *
 * `handoff` is the last line in the hero and the first thing the specialties
 * section answers. The two are one sentence split across a fold.
 */
export function Hero({ content }: { readonly content: HeroContent }) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-frame relative isolate flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <HeroMedia media={content.media} priority />
      </div>
      <div aria-hidden className="hero-scrim absolute inset-0 -z-10" />

      <Container className="py-9x">
        <div className="flex max-w-2xl flex-col gap-5">
          <p className="text-eyebrow font-semibold tracking-eyebrow text-on-media-eyebrow uppercase">
            {content.eyebrow}
          </p>

          <h1
            id="hero-heading"
            className="text-hero leading-hero tracking-hero text-on-media"
          >
            {content.title}
          </h1>

          <p className="max-w-lg text-base text-on-media-soft">
            {content.body}
          </p>

          {/*
            `--on-media` over the scrim, and the pair is theme-independent by
            design: the veil is the same in light and dark, so the ink on it is
            too.
          */}
          <p className="font-heading text-xl text-on-media">
            {content.handoff}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookCta className="h-12 rounded-full px-6 text-base font-semibold" />

            <Link
              href={content.secondaryAction.href}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-on-media-soft/50 px-6 text-base font-semibold text-on-media transition-colors hover:border-on-media"
            >
              {content.secondaryAction.label}
              <ArrowRightIcon aria-hidden className="size-4 shrink-0" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
