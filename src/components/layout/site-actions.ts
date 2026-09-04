import { CalendarDaysIcon, PhoneIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { labels } from "@/content/labels";
import { site } from "@/content/site";
import { telHref } from "@/lib/format";

export interface SiteAction {
  readonly id: "call" | "book";
  readonly label: string;
  readonly href: string;
  readonly icon: LucideIcon;
}

/**
 * The actions kept visible at all times — call and book. They are declared once
 * and rendered twice: in the header from `lg` up, and in the fixed bar at the
 * bottom of every smaller screen. A 78-year-old should not have to open a menu
 * to find a phone number, and the adult child doing this on a phone should not
 * have to either.
 *
 * There were three. Virtual care was the third, and it pointed at a section
 * that only existed to give this action a destination — a permanent button for
 * a service the practice does not offer. Both are gone; the two that remain are
 * the two things anyone actually comes here to do.
 *
 * `book` goes through `site.booking.ctaHref` rather than a hand-written href so
 * the route stays defined in one place. The bar renders the link itself instead
 * of `BookCta`, because the bar's cells have to be identical in size and
 * `BookCta` is a button.
 */
export const siteActions: readonly SiteAction[] = [
  {
    id: "call",
    label: labels.actions.call,
    href: telHref(site.phones.main),
    icon: PhoneIcon,
  },
  {
    id: "book",
    label: labels.actions.book,
    href: site.booking.ctaHref,
    icon: CalendarDaysIcon,
  },
];
