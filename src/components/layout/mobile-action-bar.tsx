import { siteActions } from "@/components/layout/site-actions";
import { labels } from "@/content/labels";

/**
 * Fixed to the bottom of every screen below `lg`, and the reason the header
 * can stay a logo and a menu button on a phone.
 *
 * Before this existed, "Book Appointment" was `hidden sm:inline-flex` in the
 * header — on a 390px phone there was no way to book without opening the
 * hamburger first, which is exactly the three-menus problem the client
 * described. The layout reserves the height below `<main>` so the footer is
 * never underneath it, and `env(safe-area-inset-bottom)` keeps the row clear
 * of the home indicator on an iPhone.
 *
 * Server, zero JS: three links.
 */
export function MobileActionBar() {
  return (
    <nav
      aria-label={labels.actions.barLabel}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card pb-[env(safe-area-inset-bottom)] shadow-float lg:hidden"
    >
      <ul className="grid grid-cols-3">
        {siteActions.map((action) => {
          const Icon = action.icon;

          return (
            <li key={action.id} className="border-r border-border last:border-r-0">
              <a
                href={action.href}
                className="flex min-h-16 flex-col items-center justify-center gap-1 px-2 py-2 text-center text-xs font-semibold text-body-foreground transition-colors hover:bg-muted hover:text-primary"
              >
                <Icon aria-hidden className="size-5 shrink-0 text-primary" />
                {action.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
