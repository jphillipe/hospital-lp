import type { EmergencyBlockContent } from "@/types/content";
import { site } from "@/content/site";

/**
 * Dighton Medical Center has no emergency department. This block used to send
 * people to one on this campus; it now sends them to 911 and to the nearest
 * emergency department, which is the only honest route.
 *
 * It stays fixed high on the page and outside every interactive component for
 * the reason it always did: a route to emergency care that has to be found is
 * not a route to emergency care.
 */
export const emergencyBlock = {
  heading: "Medical emergency?",
  body: site.emergencyNotice,
  actions: [
    {
      phone: site.emergencyNumber,
      label: "Call 911",
      detail: "Ambulance and emergency services",
    },
    {
      phone: site.phones.nurseLine,
      label: "24/7 Nurse Line",
      detail: "Advice when you are unsure whether to go in",
    },
  ],
} as const satisfies EmergencyBlockContent;
