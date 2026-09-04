import type { VariantProps } from "class-variance-authority";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface BookCtaProps {
  readonly label?: string;
  /** `Specialty.slug` — preselects the service on `/book`. */
  readonly specialty?: string | null;
  /** `Doctor.slug` — names the clinician on `/book`. */
  readonly doctor?: string | null;
  readonly variant?: ButtonVariants["variant"];
  readonly size?: ButtonVariants["size"];
  readonly className?: string;
}

/**
 * The single entry point to scheduling. Every "Book an Appointment" control on
 * the site goes through here — no scheduling link is written by hand elsewhere.
 *
 * That rule is what made `/book` a one-file migration: this component swapped a
 * `tel:` href for a route and fourteen call sites followed without being
 * touched, exactly as PLAN.md §5 item 1 planned for.
 *
 * Still a Server Component and still zero JS — the page it points at owns the
 * only Client leaf in the flow.
 *
 * **Only slugs go in the query string.** §5 item 5 keeps PHI out of URLs, and
 * a service and a clinician are the only two things here that are not somebody's
 * personal information.
 */
export function BookCta({
  label,
  specialty,
  doctor,
  variant = "default",
  size = "lg",
  className,
}: BookCtaProps) {
  const params = new URLSearchParams();
  if (specialty != null) params.set("specialty", specialty);
  if (doctor != null) params.set("doctor", doctor);

  const query = params.toString();
  const href = query === "" ? site.booking.ctaHref : `${site.booking.ctaHref}?${query}`;

  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {label ?? site.booking.ctaLabel}
    </Link>
  );
}
