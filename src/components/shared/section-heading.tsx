import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** The `<section>` points its `aria-labelledby` at this. */
  readonly id: string;
  readonly eyebrow?: string;
  readonly title: string;
  readonly lead?: string;
  readonly className?: string;
}

/**
 * Eyebrow / h2 / lead. The eyebrow is Figtree 600 rather than the base layer's
 * Newsreader, so it is a `<p>` and not a heading — it labels the section for
 * the eye, not for the document outline.
 *
 * Neither line uses `--muted-foreground`: at 4.11:1 over `--muted` it misses
 * AA, and DESIGN.md reserves `--body-foreground` for running prose anyway.
 * The eyebrow takes the brand green, which clears 7:1 on every light ground.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex max-w-2xl flex-col gap-3", className)}>
      {eyebrow ? (
        <p className="text-eyebrow font-semibold tracking-eyebrow text-primary uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className="text-2xl">
        {title}
      </h2>
      {lead ? <p className="text-base text-body-foreground">{lead}</p> : null}
    </div>
  );
}
