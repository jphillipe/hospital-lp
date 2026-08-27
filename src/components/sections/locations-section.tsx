import {
  CarFrontIcon,
  MapPinIcon,
  PhoneIcon,
  SignpostIcon,
} from "lucide-react";

import { BookCta } from "@/components/booking/book-cta";
import { Container } from "@/components/shared/container";
import { PhoneLink } from "@/components/shared/phone-link";
import { SectionHeading } from "@/components/shared/section-heading";
import { formatDayRange, formatHourSpan } from "@/lib/format";
import type { Location, LocationsSectionContent } from "@/types/content";

interface LocationsSectionProps {
  readonly content: LocationsSectionContent;
  readonly locations: readonly Location[];
}

/**
 * Hours are a `<dl>`: each service is the term and its opening span the
 * definition, which is exactly the relationship. The same records feed
 * `buildHospitalSchema`, so the visible table and the structured data can
 * never disagree — there is one source for both.
 */
export function LocationsSection({
  content,
  locations,
}: LocationsSectionProps) {
  return (
    <section
      id="locations"
      aria-labelledby="locations-heading"
      className="bg-muted py-8x lg:py-9x"
    >
      <Container className="flex flex-col gap-7x">
        <SectionHeading
          id="locations-heading"
          eyebrow={content.eyebrow}
          title={content.heading}
          lead={content.lead}
        />

        {locations.map((location) => (
          <div
            key={location.slug}
            className="grid gap-6x rounded-card border border-border bg-card p-6x lg:grid-cols-2"
          >
            <div className="flex flex-col gap-5">
              <h3 className="text-lg">{location.name}</h3>

              <p className="flex items-start gap-3 text-sm">
                <MapPinIcon
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-primary"
                />
                <span className="flex flex-col gap-1">
                  <span className="text-eyebrow font-semibold tracking-eyebrow text-muted-foreground uppercase">
                    {content.addressLabel}
                  </span>
                  <span className="text-body-foreground">
                    {location.address.street}
                    <br />
                    {`${location.address.city}, ${location.address.region} ${location.address.postalCode}`}
                  </span>
                </span>
              </p>

              <p className="flex items-start gap-3 text-sm">
                <PhoneIcon
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-primary"
                />
                <span className="flex flex-col gap-1">
                  <span className="text-eyebrow font-semibold tracking-eyebrow text-muted-foreground uppercase">
                    {content.phoneLabel}
                  </span>
                  <PhoneLink
                    phone={location.phone}
                    className="font-semibold text-primary underline-offset-4"
                  />
                </span>
              </p>

              <p className="flex items-start gap-3 text-sm">
                <SignpostIcon
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-primary"
                />
                <span className="flex flex-col gap-1">
                  <span className="text-eyebrow font-semibold tracking-eyebrow text-muted-foreground uppercase">
                    {content.gettingHereLabel}
                  </span>
                  <span className="text-body-foreground">
                    {location.gettingHere}
                  </span>
                </span>
              </p>

              <p className="flex items-start gap-3 text-sm">
                <CarFrontIcon
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-primary"
                />
                <span className="flex flex-col gap-1">
                  <span className="text-eyebrow font-semibold tracking-eyebrow text-muted-foreground uppercase">
                    {content.parkingLabel}
                  </span>
                  <span className="text-body-foreground">
                    {location.parking}
                  </span>
                </span>
              </p>

              <BookCta className="self-start" />
            </div>

            <div className="flex flex-col gap-4 border-t border-border pt-6x lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6x">
              <h4 className="font-sans text-eyebrow font-semibold tracking-eyebrow text-muted-foreground uppercase">
                {content.hoursLabel}
              </h4>

              <dl className="flex flex-col">
                {location.hours.map((hours) => (
                  <div
                    key={hours.id}
                    className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 border-b border-border py-3 last:border-b-0"
                  >
                    <dt className="text-button font-semibold text-foreground">
                      {hours.label}
                    </dt>
                    <dd className="text-sm text-body-foreground">
                      <span className="text-muted-foreground">
                        {`${formatDayRange(hours.days, content)} · `}
                      </span>
                      {formatHourSpan(
                        hours.opens,
                        hours.closes,
                        content.allDayLabel,
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
