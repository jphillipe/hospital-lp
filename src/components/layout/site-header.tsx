import { SearchIcon } from "lucide-react";

import { BookCta } from "@/components/booking/book-cta";
import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteLogo } from "@/components/layout/site-logo";
import { StickyHeader } from "@/components/layout/sticky-header";
import { Container } from "@/components/shared/container";
import { labels } from "@/content/labels";
import { site } from "@/content/site";

/**
 * Server Component. `StickyHeader` (scroll shadow), `MainNav` and `MobileNav`
 * are the three Client leaves.
 *
 * Per PLAN.md §1 the utility row above is the red `EmergencyBar`, not a muted
 * utility strip, and the site is English-only — so there is no language
 * selector here, and the account entry point is Patient Portal.
 */
export function SiteHeader() {
  return (
    <StickyHeader>
      <Container className="flex h-18 items-center justify-between gap-4">
        <SiteLogo className="shrink-0" />

        <MainNav className="hidden lg:flex" />

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={site.patientPortalUrl}
            className="hidden rounded-sm px-2 text-nav font-medium whitespace-nowrap text-body-foreground hover:text-primary xl:inline-flex"
          >
            {labels.header.patientPortal}
          </a>

          <BookCta
            className="hidden h-10 rounded-full px-5 text-button font-semibold sm:inline-flex"
            size="lg"
          />

          <button
            type="button"
            aria-label={labels.header.search}
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border text-body-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <SearchIcon aria-hidden className="size-4" />
          </button>

          <MobileNav className="lg:hidden" />
        </div>
      </Container>
    </StickyHeader>
  );
}
