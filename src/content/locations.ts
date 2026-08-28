import type { Location, LocationsSectionContent } from "@/types/content";
import { site } from "@/content/site";

export const locationsSection = {
  eyebrow: "Location & Hours",
  heading: "One address, and the hours you can be seen.",
  lead: "Everything on this site happens at one place. Free parking, one entrance, and a drop-off lane right outside it.",
  hoursLabel: "Hours",
  parkingLabel: "Parking",
  gettingHereLabel: "Getting here",
  addressLabel: "Address",
  phoneLabel: "Main line",
  allDayLabel: "Open 24 hours",
  dayRangeSeparator: "to",
  everyDayLabel: "Every day",
} as const satisfies LocationsSectionContent;

/**
 * One site, because the practice is one practice.
 *
 * The emergency, urgent care, laboratory and inpatient-visiting entries that
 * used to sit in `hours` were removed with the services themselves — this is
 * an outpatient practice with no emergency department, no walk-in door and no
 * beds, so hours for any of them would be a claim about a service that does
 * not exist. `allDayLabel` stays on the section type because a future service
 * may need it, not because anything here uses it.
 *
 * `geo` and `directionsUrl` are `null` for the reason they always were:
 * Dighton is a real town and this address is not a real place in it.
 * Coordinates would drop a pin on somebody's actual property, and a maps link
 * would be a link to nothing. `buildHospitalSchema` emits `geo` the moment it
 * is not null.
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
        id: "clinics",
        label: "Clinic appointments",
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        id: "phones",
        label: "Appointment line",
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    parking:
      "Free parking outside the door, with accessible bays and a drop-off lane at the entrance. No garage, no ticket, and nothing to pay.",
    gettingHere:
      "One building and one entrance, at ground level, with no stairs between the door and reception. If you are bringing someone who cannot walk far, use the drop-off lane and we will meet you there.",
    directionsUrl: null,
    order: 1,
  },
] as const satisfies readonly Location[];
