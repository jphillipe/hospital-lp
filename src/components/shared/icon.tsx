import type { LucideIcon, LucideProps } from "lucide-react";
import {
  ActivityIcon,
  BabyIcon,
  BoneIcon,
  BrainIcon,
  EyeIcon,
  HeartPulseIcon,
  MicroscopeIcon,
  ScanIcon,
  StethoscopeIcon,
  SyringeIcon,
} from "lucide-react";

import type { IconName } from "@/types/content";

/**
 * Content names its glyph as a string and this resolves it, so a record stays
 * serializable and JSON-able for the day it comes from a CMS — PLAN.md §3.
 */
const registry: Record<IconName, LucideIcon> = {
  activity: ActivityIcon,
  baby: BabyIcon,
  bone: BoneIcon,
  brain: BrainIcon,
  eye: EyeIcon,
  "heart-pulse": HeartPulseIcon,
  microscope: MicroscopeIcon,
  scan: ScanIcon,
  stethoscope: StethoscopeIcon,
  syringe: SyringeIcon,
};

export function Icon({
  name,
  ...props
}: LucideProps & { readonly name: IconName }) {
  const Glyph = registry[name];

  return <Glyph {...props} />;
}
