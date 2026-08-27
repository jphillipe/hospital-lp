import type { EmergencyBlockContent } from "@/types/content";
import { site } from "@/content/site";

/**
 * Deliberately outside the carousel: an emergency route that rotates away is
 * not an emergency route. See PLAN.md §1 item 01.
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
      phone: site.phones.emergencyDepartment,
      label: "Emergency Department",
      detail: "Front desk, open 24/7",
    },
    {
      phone: site.phones.nurseLine,
      label: "24/7 Nurse Line",
      detail: "Advice when you are unsure",
    },
  ],
} as const satisfies EmergencyBlockContent;
