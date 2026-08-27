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

/**
 * Direction G has no solid-red chrome: `--alert` is the ink and `--alert-bg`
 * the ground, in both themes. The bar keeps its position at the very top of
 * the document, which is the part PLAN.md §1 item 01 actually depends on.
 */
export function EmergencyBar() {
  return (
    <div className="border-b border-alert/20 bg-alert-bg">
      <Container className="flex flex-wrap items-center justify-between gap-x-6x gap-y-1 py-2 text-xs">
        <p className="flex items-center gap-2 font-semibold text-alert">
          <ShieldAlertIcon aria-hidden className="size-4 shrink-0" />
          <a
            href={`tel:${site.emergencyNumber}`}
            className="rounded-sm underline underline-offset-4"
          >
            {labels.emergencyBar.headline}
          </a>
        </p>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-body-foreground">
          <li className="flex items-center gap-1.5">
            <PhoneIcon aria-hidden className="size-3.5 shrink-0 text-alert" />
            <PhoneLink
              phone={site.phones.emergencyDepartment}
              className="underline-offset-4"
            >
              {`${labels.emergencyBar.emergencyDepartment}: ${formatPhone(site.phones.emergencyDepartment)}`}
            </PhoneLink>
          </li>
          <li className="hidden items-center gap-1.5 sm:flex">
            <PhoneIcon aria-hidden className="size-3.5 shrink-0 text-alert" />
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
