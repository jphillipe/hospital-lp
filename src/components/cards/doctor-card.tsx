import Image from "next/image";
import Link from "next/link";
import { CheckIcon } from "lucide-react";

import { BookCta } from "@/components/booking/book-cta";
import { formatDoctorName } from "@/lib/format";
import type { Doctor, DoctorsSectionContent } from "@/types/content";

interface DoctorCardProps {
  readonly doctor: Doctor;
  /** Resolved by the section from `getSpecialtyNames`; absent if the FK drifts. */
  readonly specialtyName: string | undefined;
  readonly content: DoctorsSectionContent;
}

/** "Ana Lúcia Ferreira" → "AF". */
function initialsOf(doctor: Doctor): string {
  const first = [...doctor.firstName][0] ?? "";
  const last = [...doctor.lastName][0] ?? "";

  return `${first}${last}`;
}

/**
 * Server, and it stays Server in v2 — only `BookCta` turns Client when the CTA
 * starts opening the dialog. Marking the card `"use client"` for one button
 * would drag the portrait and the whole record into the bundle (PLAN.md §5
 * item 3).
 *
 * **Seven subgrid rows, and every child must stay a direct child of the
 * `<article>`.** A name wraps to one line or two and a specialty label does
 * the same, so grouping them in wrapper `<div>`s let every row below drift to
 * a different height in each card. On the subgrid, each row is sized by the
 * tallest card in the row and the four cards line up line for line. Wrap two
 * children in a `<div>` again and that alignment is gone.
 *
 * For the same reason the specialty row renders even when the name is missing:
 * dropping the element would pull every following row up by one.
 */
export function DoctorCard({
  doctor,
  specialtyName,
  content,
}: DoctorCardProps) {
  const fullName = formatDoctorName(doctor);

  return (
    <article className="relative row-span-7 grid grid-rows-subgrid gap-y-3 rounded-card border border-border bg-card p-6x transition-colors hover:border-primary">
      {/* Fixed 64px either way, so swapping the monogram for a portrait moves nothing. */}
      <span className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10">
        {doctor.photo.src === null ? (
          <span
            aria-hidden
            className="font-heading text-xl text-primary select-none"
          >
            {initialsOf(doctor)}
          </span>
        ) : (
          <Image
            src={doctor.photo.src}
            alt={doctor.photo.alt}
            width={doctor.photo.width}
            height={doctor.photo.height}
            sizes="64px"
            className="size-full object-cover"
          />
        )}
      </span>

      {/*
        The name is a link now that `/doctors/<slug>` exists — the same gap the
        specialty card closed. `after:absolute inset-0` makes the whole card the
        hit area without nesting the Book button inside the link, which would be
        two interactive elements one inside the other.
      */}
      <h3 className="text-lg">
        <Link
          href={`/doctors/${doctor.slug}`}
          className="rounded-sm after:absolute after:inset-0 hover:text-primary"
        >
          {fullName}
        </Link>
      </h3>

      <p className="text-sm text-muted-foreground">{doctor.title}</p>

      <p className="text-eyebrow font-semibold tracking-eyebrow text-muted-foreground uppercase">
        {specialtyName ?? ""}
      </p>

      <p className="text-xs">
        <span className="text-muted-foreground">{content.languagesLabel} </span>
        <span className="text-body-foreground">
          {doctor.languages
            .map((code) => content.languageNames[code])
            .join(", ")}
        </span>
      </p>

      <p
        className={
          doctor.acceptingNewPatients
            ? "flex items-center gap-1.5 text-xs font-semibold text-primary"
            : "text-xs text-muted-foreground"
        }
      >
        {doctor.acceptingNewPatients ? (
          <>
            <CheckIcon aria-hidden className="size-3.5 shrink-0" />
            {content.acceptingLabel}
          </>
        ) : (
          content.notAcceptingLabel
        )}
      </p>

      {/*
        `buttonVariants` is `h-9 whitespace-nowrap`, which at the four-column
        breakpoint leaves a long surname about three pixels of room before it
        spills out of the button. `ui/*` is off limits, so the two constraints
        that break are relaxed here: the label wraps and the button grows.
      */}
      <BookCta
        label={`${content.bookWithLabel} ${doctor.lastName}`}
        specialty={doctor.primarySpecialtySlug}
        doctor={doctor.slug}
        className="relative z-10 h-auto min-h-9 w-full py-2 text-center whitespace-normal"
      />
    </article>
  );
}
