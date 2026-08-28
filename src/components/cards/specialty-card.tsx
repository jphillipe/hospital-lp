import { Icon } from "@/components/shared/icon";
import type { Specialty } from "@/types/content";

/**
 * Server, and it ships zero JS — there is no detail page to link to in v1, so
 * the card is an `<article>` rather than a link that would 404.
 *
 * The card is deliberately down to a glyph, a name and one line. It used to
 * carry a "Conditions we treat" list, which asked the reader to recognise
 * clinical terms before deciding whether a service was for them — the exact
 * thing the client asked this site to stop doing. The longer `description`
 * still lives in the record for the v2 detail page and the chat corpus.
 *
 * TODO(v2): wrap the body in `<Link href={`/specialties/${slug}`}>`. The card
 * stays Server; only `BookCta` turns Client when the CTA opens the dialog
 * (PLAN.md §5 item 3).
 */
export function SpecialtyCard({
  specialty,
}: {
  readonly specialty: Specialty;
}) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-card border border-border bg-card p-6x">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon name={specialty.icon} aria-hidden className="size-6" />
      </span>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg">{specialty.name}</h3>
        <p className="text-base text-body-foreground">{specialty.tagline}</p>
      </div>
    </article>
  );
}
