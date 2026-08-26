import {
  PhoneIcon,
  ShieldAlertIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";

import { Container } from "@/components/shared/container";
import { PhoneLink } from "@/components/shared/phone-link";
import { labels } from "@/content/labels";
import { site } from "@/content/site";
import { formatPhone } from "@/lib/format";

export function EmergencyBar() {
  return (
    <div className="bg-emergency text-emergency-foreground">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-1.5 text-xs sm:text-sm">
        <p className="flex items-center gap-2 font-medium">
          <ShieldAlertIcon aria-hidden className="size-4 shrink-0" />
          <a
            href={`tel:${site.emergencyNumber}`}
            className="rounded-sm underline underline-offset-4"
          >
            {labels.emergencyBar.headline}
          </a>
        </p>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <li className="flex items-center gap-1.5">
            <PhoneIcon aria-hidden className="size-3.5 shrink-0" />
            <PhoneLink
              phone={site.phones.emergencyDepartment}
              className="underline-offset-4"
            >
              {`${labels.emergencyBar.emergencyDepartment}: ${formatPhone(site.phones.emergencyDepartment)}`}
            </PhoneLink>
          </li>
          <li className="hidden items-center gap-1.5 sm:flex">
            <PhoneIcon aria-hidden className="size-3.5 shrink-0" />
            <PhoneLink
              phone={site.phones.nurseLine}
              className="underline-offset-4"
            >
              {`${labels.emergencyBar.nurseLine}: ${formatPhone(site.phones.nurseLine)}`}
            </PhoneLink>
          </li>
          <li>
            <a
              href={site.patientPortalUrl}
              className="flex items-center gap-1.5 rounded-sm hover:underline"
            >
              {labels.emergencyBar.patientPortal}
              <SquareArrowOutUpRightIcon aria-hidden className="size-3.5" />
            </a>
          </li>
        </ul>
      </Container>
    </div>
  );
}
