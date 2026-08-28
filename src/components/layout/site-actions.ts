import { CalendarDaysIcon, PhoneIcon, VideoIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { labels } from "@/content/labels";
import { site } from "@/content/site";
import { telHref } from "@/lib/format";

export interface SiteAction {
  readonly id: "call" | "book" | "virtual-care";
  readonly label: string;
  readonly href: string;
  readonly icon: LucideIcon;
}

/**
 * The three actions the client asked to keep visible at all times — call,
 * book, virtual care. They are declared once and rendered twice: in the header
 * from `lg` up, and in the fixed bar at the bottom of every smaller screen. A
 * 78-year-old should not have to open a menu to find a phone number, and the
 * adult child doing this on a phone should not have to either.
 *
 * `book` goes through `site.booking.ctaHref` rather than a hand-written `tel:`
 * so the v2 switch to `/book` still happens in one place. The bar renders the
 * link itself instead of `BookCta`, because the bar's three cells have to be
 * identical in size and `BookCta` is a button.
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
  {
    id: "virtual-care",
    label: labels.actions.virtualCare,
    href: "/#virtual-care",
    icon: VideoIcon,
  },
];
