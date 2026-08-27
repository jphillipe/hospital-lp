import type { Location, LocationsSectionContent } from "@/types/content";
import { site } from "@/content/site";

export const locationsSection = {
  eyebrow: "Locations & Hours",
  heading: "One campus, and the hours that matter on it.",
  lead: "Everything on this site happens at one address. What changes is when each door is open.",
  hoursLabel: "Hours",
  parkingLabel: "Parking",
  gettingHereLabel: "Getting here",
  addressLabel: "Address",
  phoneLabel: "Main switchboard",
  allDayLabel: "Open 24 hours",
  dayRangeSeparator: "to",
  everyDayLabel: "Every day",
} as const satisfies LocationsSectionContent;

/**
 * One campus, because the rest of the site says so three times over —
 * `specialties.ts` puts every service on `main-campus`, and both the hero and
 * the stats band argue that one campus is the point. A second invented address
 * would contradict the copy before it added anything.
 *
 * `geo` and `directionsUrl` are `null` for the same reason `floor` is null in
 * `specialties.ts`: Dighton is a real town and this address is not a real
 * place in it. Coordinates would drop a pin on somebody's actual property, and
 * a maps link would be a link to nothing. The fields exist so real ones slot
 * straight in — `buildHospitalSchema` already emits `geo` the moment it is not
 * null.
 */
export const locations = [
  {
    slug: "main-campus",
    name: site.name,
    description: site.description,
    address: site.address,
    phone: site.phones.main,
    geo: null,
    hours: [
      {
        id: "emergency",
        label: "Emergency Department",
        days: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: null,
        closes: null,
      },
      {
        id: "urgent-care",
        label: "Urgent Care",
        days: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "20:00",
      },
      {
        id: "clinics",
        label: "Outpatient clinics",
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00",
      },
      {
        id: "laboratory",
        label: "Laboratory and imaging",
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
      {
        id: "visiting",
        label: "General visiting hours",
        days: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "11:00",
        closes: "20:00",
      },
    ],
    parking:
      "Free on-site parking, with accessible bays and a drop-off lane at the main entrance. The emergency entrance has its own approach and its own parking, separate from the outpatient lot.",
    gettingHere:
      "The campus sits on one site with three marked entrances: emergency, outpatient, and maternity. If you are unsure which one you need, the main switchboard will tell you before you set off.",
    directionsUrl: null,
    order: 1,
  },
] as const satisfies readonly Location[];
