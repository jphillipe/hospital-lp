import { PhoneIcon } from "lucide-react";

import { BookCta } from "@/components/booking/book-cta";
import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteLogo } from "@/components/layout/site-logo";
import { Container } from "@/components/shared/container";
import { PhoneLink } from "@/components/shared/phone-link";
import { labels } from "@/content/labels";
import { site } from "@/content/site";
import { formatPhone } from "@/lib/format";

/**
 * Sticky via CSS only — no scroll listener, so the header stays out of the
 * client bundle. The two Client leaves are `MainNav` and `MobileNav`.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <Container className="flex h-18 items-center justify-between gap-4">
        <SiteLogo />

        <MainNav className="hidden lg:flex" />

        <div className="flex items-center gap-2 sm:gap-3">
          <PhoneLink
            phone={site.phones.appointments}
            className="hidden items-center gap-2 text-sm font-medium md:flex"
          >
            <PhoneIcon aria-hidden className="size-4 text-primary" />
            <span className="flex flex-col leading-tight">
              <span className="text-xs text-muted-foreground">
                {labels.header.appointmentsLabel}
              </span>
              <span>{formatPhone(site.phones.appointments)}</span>
            </span>
          </PhoneLink>

          <BookCta className="hidden sm:inline-flex" />

          <MobileNav className="lg:hidden" />
        </div>
      </Container>
    </header>
  );
}
