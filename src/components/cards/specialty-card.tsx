import { Icon } from "@/components/shared/icon";
import type { Specialty } from "@/types/content";

interface SpecialtyCardProps {
  readonly specialty: Specialty;
  readonly conditionsLabel: string;
}

/**
 * Server, and it ships zero JS — there is no detail page to link to in v1, so
 * the card is an `<article>` rather than a link that would 404.
 *
 * TODO(v2): wrap the body in `<Link href={`/specialties/${slug}`}>`. The card
 * stays Server; only `BookCta` turns Client when the CTA opens the dialog
 * (PLAN.md §5 item 3).
 */
export function SpecialtyCard({
  specialty,
  conditionsLabel,
}: SpecialtyCardProps) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-card border border-border bg-card p-6x">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon name={specialty.icon} aria-hidden className="size-5" />
      </span>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg">{specialty.name}</h3>
        <p className="text-sm text-muted-foreground">{specialty.tagline}</p>
      </div>

      <div className="mt-auto flex flex-col gap-2 border-t border-border pt-4">
        <p className="text-eyebrow font-semibold tracking-eyebrow text-muted-foreground uppercase">
          {conditionsLabel}
        </p>
        <ul className="flex flex-col gap-1 text-sm text-body-foreground">
          {specialty.conditions.map((condition) => (
            <li key={condition} className="flex items-start gap-2">
              <span
                aria-hidden
                className="mt-2 size-1 shrink-0 rounded-full bg-primary"
              />
              {condition}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
