import { PhoneIcon, ShieldAlertIcon } from "lucide-react";

import { Container } from "@/components/shared/container";
import { formatPhone, telHref } from "@/lib/format";
import type { EmergencyBlockContent } from "@/types/content";

/**
 * Fixed, and outside the carousel by design: a route to emergency care that
 * rotates away is not a route to emergency care.
 */
export function EmergencyBlock({
  content,
}: {
  readonly content: EmergencyBlockContent;
}) {
  return (
    <section
      id="emergency"
      aria-labelledby="emergency-heading"
      className="border-y border-alert/25 bg-alert-bg"
    >
      <Container className="flex flex-col gap-6x py-7x lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-md flex-col gap-2">
          <h2
            id="emergency-heading"
            className="flex items-center gap-3 text-xl text-alert"
          >
            <ShieldAlertIcon aria-hidden className="size-5 shrink-0" />
            {content.heading}
          </h2>
          <p className="text-sm text-body-foreground">{content.body}</p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-3 lg:shrink-0">
          {content.actions.map((action) => (
            <li key={action.phone}>
              <a
                href={telHref(action.phone)}
                className="flex h-full flex-col gap-1 rounded-sm border border-alert/40 bg-card px-5 py-4 transition-colors hover:border-alert"
              >
                <span className="flex items-center gap-2 text-button font-semibold text-alert">
                  <PhoneIcon aria-hidden className="size-4 shrink-0" />
                  {action.label}
                </span>
                <span className="text-base text-foreground">
                  {formatPhone(action.phone)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {action.detail}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
