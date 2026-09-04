import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
     * The hero photograph is the LCP element on the home page and its source is
     * a 1.9 MB JPEG. `next/image` re-encodes it on demand, so the source size
     * costs repo weight rather than load time — but AVIF ahead of WebP takes
     * roughly a third off what actually reaches a phone on a slow connection,
     * which is what this audience is on.
     *
     * Images stay local. PLAN.md §5 item 10 asks for that decision to be taken
     * deliberately: there is no `remotePatterns` here because nothing is remote,
     * and a CMS arriving later is the moment to add one.
     */
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
