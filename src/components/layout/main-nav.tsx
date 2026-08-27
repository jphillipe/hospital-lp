"use client";

import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { labels } from "@/content/labels";
import { primaryNav } from "@/content/navigation";
import { cn } from "@/lib/utils";

export function MainNav({ className }: { readonly className?: string }) {
  const pathname = usePathname();

  return (
    <NavigationMenu
      aria-label={labels.header.primaryNavLabel}
      viewport={false}
      className={cn("max-w-none", className)}
    >
      <NavigationMenuList className="gap-0.5">
        {primaryNav.map((item) => {
          const [path] = item.href.split("#");
          const isActive =
            path !== undefined && path !== "/" && pathname.startsWith(path);
          // `as const satisfies` narrows each entry to its own literal shape, so
          // the optional flag has to be probed rather than read straight off.
          const hasSubmenu = "hasSubmenu" in item && item.hasSubmenu === true;

          return (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                asChild
                active={isActive}
                className="flex flex-row items-center gap-1.5 px-2.5 py-2 text-nav font-medium whitespace-nowrap"
              >
                <Link href={item.href}>
                  {item.label}
                  {hasSubmenu ? (
                    <>
                      <ChevronDownIcon
                        aria-hidden
                        className="size-3.5 text-muted-foreground"
                      />
                      <span className="sr-only">
                        {labels.header.submenuHint}
                      </span>
                    </>
                  ) : null}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
