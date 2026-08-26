"use client";

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

          return (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                asChild
                active={isActive}
                className="px-3 py-2 font-medium"
              >
                <Link href={item.href}>{item.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
