import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The closed type scale adds font sizes tailwind-merge cannot know about
 * (`text-eyebrow`, `text-button`, `text-nav`, `text-hero`). Left unregistered it
 * reads them as text *colours* and silently drops the real colour class next to
 * them — which is how a white label ends up invisible on a green button.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["eyebrow", "button", "nav", "hero"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
