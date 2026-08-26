import type { ComponentProps } from "react";

import { formatPhone, telHref } from "@/lib/format";
import { cn } from "@/lib/utils";

interface PhoneLinkProps extends Omit<
  ComponentProps<"a">,
  "href" | "children"
> {
  /** E.164, e.g. `+15085550142`. */
  readonly phone: string;
  /** Overrides the rendered text; the href is always derived from `phone`. */
  readonly children?: ComponentProps<"a">["children"];
}

export function PhoneLink({
  phone,
  children,
  className,
  ...props
}: PhoneLinkProps) {
  return (
    <a
      href={telHref(phone)}
      className={cn("rounded-sm hover:underline", className)}
      {...props}
    >
      {children ?? formatPhone(phone)}
    </a>
  );
}
