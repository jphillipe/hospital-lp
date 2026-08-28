import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Icon } from "@/components/shared/icon";
import type { Specialty } from "@/types/content";

/**
 * Server, and it ships zero JS.
 *
 * The card is deliberately down to a glyph, a name and one line. It used to
 * carry a "Conditions we treat" list, which asked the reader to recognise
 * clinical terms before deciding whether a service was for them — the exact
 * thing the client asked this site to stop doing. The longer `description`
 * now has somewhere to live: `/specialties/<slug>`.
 *
 * The whole card is the target — 44px is the floor, not the ceiling — and the
 * link is named by the specialty alone, so tabbing through the grid announces
 * four short destinations rather than four sentences.
 */
export function SpecialtyCard({
  specialty,
}: {
  readonly specialty: Specialty;
}) {
  const titleId = `specialty-${specialty.slug}`;

  return (
    <article className="h-full">
      <Link
        href={`/specialties/${specialty.slug}`}
        aria-labelledby={titleId}
        className="group flex h-full flex-col gap-4 rounded-card border border-border bg-card p-6x transition-colors hover:border-primary"
      >
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon name={specialty.icon} aria-hidden className="size-6" />
        </span>

        <div className="flex flex-col gap-2">
          <h3 id={titleId} className="text-lg">
            {specialty.name}
          </h3>
          <p className="text-base text-body-foreground">{specialty.tagline}</p>
        </div>

        <ArrowRightIcon
          aria-hidden
          className="mt-auto size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
        />
      </Link>
    </article>
  );
}
