import { MapPinIcon, PhoneIcon, SquareArrowOutUpRightIcon } from "lucide-react";
import Link from "next/link";

import { SiteLogo } from "@/components/layout/site-logo";
import { Container } from "@/components/shared/container";
import { PhoneLink } from "@/components/shared/phone-link";
import { Separator } from "@/components/ui/separator";
import { labels } from "@/content/labels";
import { footerNav, legalNav } from "@/content/navigation";
import { site } from "@/content/site";
import { formatPhone } from "@/lib/format";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/40">
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-5">
            <SiteLogo />
            <p className="max-w-sm text-sm text-muted-foreground">
              {site.description}
            </p>

            <div className="flex flex-col gap-2 text-sm">
              <h2 className="sr-only">{labels.footer.contactHeading}</h2>
              <p className="flex items-start gap-2">
                <MapPinIcon
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-primary"
                />
                <span className="not-italic">
                  <span className="sr-only">
                    {`${labels.footer.addressHeading}: `}
                  </span>
                  {site.address.street}
                  <br />
                  {`${site.address.city}, ${site.address.region} ${site.address.postalCode}`}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneIcon
                  aria-hidden
                  className="size-4 shrink-0 text-primary"
                />
                <PhoneLink phone={site.phones.main}>
                  {formatPhone(site.phones.main)}
                </PhoneLink>
              </p>
            </div>
          </div>

          {footerNav.map((group) => {
            const groupId = `footer-${slugify(group.title)}`;

            return (
              <nav key={group.title} aria-labelledby={groupId}>
                <h2 id={groupId} className="text-sm font-semibold">
                  {group.title}
                </h2>
                <ul className="mt-4 flex flex-col gap-2.5 text-sm text-muted-foreground">
                  {group.items.map((item) => (
                    <li key={`${group.title}-${item.label}`}>
                      {"external" in item && item.external ? (
                        <a
                          href={item.href}
                          className="inline-flex items-center gap-1.5 rounded-sm hover:text-foreground hover:underline"
                        >
                          {item.label}
                          <SquareArrowOutUpRightIcon
                            aria-hidden
                            className="size-3.5"
                          />
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="rounded-sm hover:text-foreground hover:underline"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-6">
          <nav aria-label={labels.footer.legalNavLabel}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-sm hover:text-foreground hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3 text-xs text-muted-foreground">
            <p>{site.legal.hipaaNotice}</p>
            <p>{site.legal.disclaimer}</p>
            <p>{`© ${year} ${site.legal.copyrightHolder}. All rights reserved.`}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
