import Image from "next/image";

import type { HeroMediaSource } from "@/types/content";

interface HeroMediaProps {
  readonly media: HeroMediaSource;
  /** Only the first slide should preload — the rest are below the fold in effect. */
  readonly priority?: boolean;
}

/**
 * While `media.src` is `null` this renders a marked block instead of an image,
 * so an unshot frame is visibly unshot rather than quietly empty. The marker
 * sits top-left, where the scrim is densest and white type stays legible.
 */
export function HeroMedia({ media, priority = false }: HeroMediaProps) {
  if (media.src === null) {
    return (
      <div aria-hidden className="media-placeholder absolute inset-0">
        <p className="absolute top-5 left-5 z-10 max-w-sm rounded-sm border border-dashed border-on-media-soft/50 px-3 py-2 text-xs text-on-media-soft">
          <span className="font-semibold tracking-eyebrow uppercase">
            Photo pending
          </span>
          <span className="mt-1 block">{media.alt}</span>
        </p>
      </div>
    );
  }

  return (
    <>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
      />
      {media.credit === undefined ? null : (
        <p className="absolute right-4 bottom-4 text-xs text-on-media-soft">
          {media.credit}
        </p>
      )}
    </>
  );
}
