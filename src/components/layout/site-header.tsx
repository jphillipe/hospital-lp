import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteLogo } from "@/components/layout/site-logo";
import { siteActions } from "@/components/layout/site-actions";
import { StickyHeader } from "@/components/layout/sticky-header";
import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";

/**
 * Server Component. `StickyHeader` (scroll shadow), `MainNav` and `MobileNav`
 * are the three Client leaves.
 *
 * The three persistent actions live here from `lg` up and in
 * `MobileActionBar` below it, so a phone gets them fixed at the bottom of the
 * screen instead of squeezed into a row that cannot hold them.
 *
 * The search button that used to sit at the end of this row is gone. It had no
 * handler and no search to run; a control that does nothing is worse than an
 * absent one for someone who is not sure whether they tapped it properly.
 */
export function SiteHeader() {
  return (
    <StickyHeader>
      <Container className="flex h-18 items-center justify-between gap-4">
        <SiteLogo className="shrink-0" />

        <MainNav className="hidden lg:flex" />

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          {siteActions.map((action) => {
            const Icon = action.icon;
            const isBook = action.id === "book";

            return (
              <a
                key={action.id}
                href={action.href}
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-full px-4 text-button font-semibold whitespace-nowrap transition-colors",
                  isBook
                    ? "bg-primary text-primary-foreground hover:bg-brand-hover"
                    : "border border-border text-body-foreground hover:border-primary hover:text-primary",
                )}
              >
                <Icon aria-hidden className="size-4 shrink-0" />
                {action.label}
              </a>
            );
          })}
        </div>

        <MobileNav className="lg:hidden" />
      </Container>
    </StickyHeader>
  );
}
