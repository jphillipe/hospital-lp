import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface BookCtaProps {
  readonly label?: string;
  readonly variant?: ButtonVariants["variant"];
  readonly size?: ButtonVariants["size"];
  readonly className?: string;
}

/**
 * The single entry point to scheduling. Every "Book an Appointment" control on
 * the site goes through here — no scheduling link is written by hand elsewhere.
 *
 * v1: `site.booking.ctaHref` is a `tel:` href, so this stays a Server Component
 * and ships zero JS.
 * TODO(v2): point it at `/book?doctor=<slug>` and let the intercepting route
 * (`@modal/(.)book`) render the dialog — the call sites do not change.
 */
export function BookCta({
  label,
  variant = "default",
  size = "lg",
  className,
}: BookCtaProps) {
  return (
    <a
      href={site.booking.ctaHref}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {label ?? site.booking.ctaLabel}
    </a>
  );
}
