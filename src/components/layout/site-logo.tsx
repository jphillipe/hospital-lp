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
      className={cn("flex items-center gap-3 rounded-sm", className)}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-primary text-primary-foreground">
        <HeartPulseIcon aria-hidden className="size-5" />
      </span>
      <span className="flex flex-col">
        <span className="font-heading text-lg leading-none whitespace-nowrap text-foreground">
          {site.name}
        </span>
        <span className="mt-1 text-eyebrow font-semibold tracking-eyebrow whitespace-nowrap text-muted-foreground uppercase">
          {labels.header.locationEyebrow}
        </span>
      </span>
    </Link>
  );
}
