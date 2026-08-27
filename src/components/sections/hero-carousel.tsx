"use client";

import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

import { HeroMedia } from "@/components/sections/hero-media";
import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";
import type { HeroContent } from "@/types/content";

const SLIDE_MS = 7000;

function fill(template: string, position: number, total: number): string {
  return template
    .replace("%n", String(position))
    .replace("%total", String(total));
}

const controlClass =
  "flex size-9 items-center justify-center rounded-full border border-on-media-soft/40 text-on-media transition-colors hover:bg-on-media/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-media";

const titleClass = "max-w-2xl text-hero leading-hero tracking-hero text-on-media";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * Read as an external store rather than synced into state in an effect, so the
 * server snapshot is "reduce". The carousel therefore renders paused and only
 * starts once the browser has confirmed motion is welcome — it can never
 * autoplay for a frame before the check lands.
 */
function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => true,
  );
}

export function HeroCarousel({ content }: { readonly content: HeroContent }) {
  const { labels, slides } = content;
  const total = slides.length;
  const [index, setIndex] = useState(0);

  const prefersReducedMotion = useReducedMotion();
  /** `null` until the visitor touches the control; their choice then wins. */
  const [override, setOverride] = useState<boolean | null>(null);
  const isPlaying = override ?? !prefersReducedMotion;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % total);
    }, SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [index, isPlaying, total]);

  const goTo = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total],
  );

  return (
    <section
      aria-roledescription="carousel"
      aria-label={content.carouselLabel}
      className="relative isolate overflow-hidden bg-secondary"
    >
      <div className="relative" aria-live={isPlaying ? "off" : "polite"}>
        {slides.map((slide, position) => {
          const isCurrent = position === index;

          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={fill(labels.slidePosition, position + 1, total)}
              aria-hidden={!isCurrent}
              inert={!isCurrent}
              className={cn(
                "hero-frame inset-0 transition-opacity duration-500 motion-reduce:transition-none",
                isCurrent
                  ? "relative opacity-100"
                  : "pointer-events-none absolute opacity-0",
              )}
            >
              <HeroMedia media={slide.media} priority={position === 0} />
              <div aria-hidden className="hero-scrim absolute inset-0" />

              <Container className="hero-frame relative flex flex-col justify-center gap-5 py-9x">
                <p className="text-eyebrow font-semibold tracking-eyebrow text-on-media-eyebrow uppercase">
                  {slide.eyebrow}
                </p>

                {position === 0 ? (
                  <h1 className={titleClass}>{slide.title}</h1>
                ) : (
                  <h2 className={titleClass}>{slide.title}</h2>
                )}

                <p className="max-w-md text-base text-on-media-soft">
                  {slide.body}
                </p>

                <Link
                  href={slide.cta.href}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-on-media px-5 py-3 text-button font-semibold text-on-media-ink transition-colors hover:bg-on-media-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-media"
                >
                  {slide.cta.label}
                  <ArrowRightIcon aria-hidden className="size-4" />
                </Link>
              </Container>
            </div>
          );
        })}
      </div>

      {/* pb clears the 38px the assistant band lifts into the hero. */}
      <Container className="pointer-events-none absolute inset-x-0 bottom-0 pb-9x">
        <div className="pointer-events-auto flex items-end justify-between gap-5">
          <ul className="flex flex-1 gap-2">
            {slides.map((slide, position) => (
              <li key={slide.id} className="max-w-20 flex-1">
                <button
                  type="button"
                  onClick={() => goTo(position)}
                  aria-label={fill(labels.progressLabel, position + 1, total)}
                  aria-current={position === index}
                  className="block w-full cursor-pointer py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-media"
                >
                  <span className="block h-0.5 w-full overflow-hidden bg-on-media/30">
                    <span
                      key={`${slide.id}-${String(index)}`}
                      className={cn(
                        "block h-full w-full bg-on-media",
                        position === index && "hero-progress-fill",
                      )}
                      style={
                        position === index
                          ? {
                              animationPlayState: isPlaying
                                ? "running"
                                : "paused",
                            }
                          : {
                              transform:
                                position < index ? "scaleX(1)" : "scaleX(0)",
                            }
                      }
                    />
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label={labels.previous}
              className={controlClass}
            >
              <ChevronLeftIcon aria-hidden className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setOverride(!isPlaying)}
              aria-pressed={!isPlaying}
              aria-label={isPlaying ? labels.pause : labels.play}
              className={controlClass}
            >
              {isPlaying ? (
                <PauseIcon aria-hidden className="size-4" />
              ) : (
                <PlayIcon aria-hidden className="size-4" />
              )}
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label={labels.next}
              className={controlClass}
            >
              <ChevronRightIcon aria-hidden className="size-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
