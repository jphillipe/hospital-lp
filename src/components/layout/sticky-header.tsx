"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * The only reason this is a Client Component is the shadow, which may not
 * appear while the header is still resting at the top of the document. The
 * header's actual content is rendered on the server and passed in as
 * `children`, so none of it reaches the browser bundle.
 */
export function StickyHeader({ children }: { readonly children: ReactNode }) {
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border bg-card transition-shadow",
        lifted && "shadow-float",
      )}
    >
      {children}
    </header>
  );
}
