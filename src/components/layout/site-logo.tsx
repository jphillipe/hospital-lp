import { HeartPulseIcon } from "lucide-react";
import Link from "next/link";

import { labels } from "@/content/labels";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteLogo({ className }: { readonly className?: string }) {
  return (
    <Link
      href="/"
      aria-label={labels.common.homeLink}
      className={cn(
        "flex items-center gap-2.5 rounded-md font-heading",
        className,
      )}
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <HeartPulseIcon aria-hidden className="size-5" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-base font-semibold tracking-tight">
          {site.name}
        </span>
        <span className="text-xs text-muted-foreground">{site.tagline}</span>
      </span>
    </Link>
  );
}
