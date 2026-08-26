"use client";

import { MenuIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";

import { BookCta } from "@/components/booking/book-cta";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { labels } from "@/content/labels";
import { primaryNav } from "@/content/navigation";
import { site } from "@/content/site";
import { formatPhone, telHref } from "@/lib/format";
import { cn } from "@/lib/utils";

export function MobileNav({ className }: { readonly className?: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon-lg"
          aria-label={labels.common.openMenu}
          className={cn(className)}
        >
          <MenuIcon aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>{labels.header.mobileNavLabel}</SheetTitle>
          <SheetDescription className="sr-only">{site.name}</SheetDescription>
        </SheetHeader>

        <nav aria-label={labels.header.primaryNavLabel} className="px-4">
          <ul className="flex flex-col gap-1">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <SheetClose asChild>
                  <Link
                    href={item.href}
                    className="flex flex-col rounded-lg px-3 py-2.5 hover:bg-muted"
                  >
                    <span className="font-medium">{item.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>

        <Separator />

        <div className="flex flex-col gap-3 px-4 pb-6">
          <BookCta className="w-full" />
          <a
            href={telHref(site.phones.appointments)}
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <PhoneIcon aria-hidden className="size-4" />
            {`${labels.header.appointmentsLabel}: ${formatPhone(site.phones.appointments)}`}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
