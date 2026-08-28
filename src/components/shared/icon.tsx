import type { LucideIcon, LucideProps } from "lucide-react";
import {
  BrainIcon,
  HeartHandshakeIcon,
  PersonStandingIcon,
  StethoscopeIcon,
} from "lucide-react";

import type { IconName } from "@/types/content";

/**
 * Content names its glyph as a string and this resolves it, so a record stays
 * serializable and JSON-able for the day it comes from a CMS — PLAN.md §3.
 *
 * The client's brief pictured these four as emoji (🩺 👵 🧠 🦵). They are
 * Lucide glyphs instead for two reasons: a screen reader announces an emoji by
 * its Unicode name — "older person" read aloud beside "Geriatric Care" is
 * noise — and emoji render in whatever the device happens to ship, which on an
 * older phone is a different picture from the one anyone approved.
 */
const registry: Record<IconName, LucideIcon> = {
  stethoscope: StethoscopeIcon,
  "heart-handshake": HeartHandshakeIcon,
  brain: BrainIcon,
  "person-standing": PersonStandingIcon,
};

export function Icon({
  name,
  ...props
}: LucideProps & { readonly name: IconName }) {
  const Glyph = registry[name];

  return <Glyph {...props} />;
}
