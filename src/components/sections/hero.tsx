import { HeroCarousel } from "@/components/sections/hero-carousel";
import type { HeroContent } from "@/types/content";

/**
 * Server Component. It owns nothing but the contract: content arrives as a
 * typed prop and goes straight to the one Client leaf that needs state.
 */
export function Hero({ content }: { readonly content: HeroContent }) {
  return <HeroCarousel content={content} />;
}
