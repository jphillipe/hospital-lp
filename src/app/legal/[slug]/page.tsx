import type { Metadata } from "next";
import { ChevronRightIcon, InfoIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/shared/container";
import { PhoneLink } from "@/components/shared/phone-link";
import { legalPageContent, legalPages } from "@/content/legal";
import { site } from "@/content/site";

/**
 * The three footer links that 404'd on every page of the site.
 *
 * `robots: { index: false }` on purpose: a placeholder notice is not the page
 * anyone searching for this practice's privacy policy should be given, and it
 * must not compete with the real one once it exists. The links resolve for a
 * visitor, which is what they were for; they stay out of the index until there
 * is a document behind them.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return legalPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = legalPages.find((entry) => entry.slug === slug);

  if (page === undefined) return {};

  return {
    title: page.title,
    description: page.seoDescription,
    alternates: { canonical: `/legal/${page.slug}` },
    robots: { index: false, follow: true },
  };
}

export default async function LegalDocumentPage({
  params,
}: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const page = legalPages.find((entry) => entry.slug === slug);

  if (page === undefined) notFound();

  return (
    <>
      <div className="bg-muted py-7x lg:py-8x">
        <Container className="flex flex-col gap-6x">
          <nav aria-label={legalPageContent.breadcrumbLabel}>
            <ol className="-mx-1 flex flex-wrap items-center gap-1 text-sm text-body-foreground">
              <li>
                <Link
                  href="/"
                  className="flex min-h-11 items-center rounded-sm px-1 hover:text-primary"
                >
                  {legalPageContent.homeLabel}
                </Link>
              </li>
              <li aria-hidden className="text-muted-foreground">
                <ChevronRightIcon className="size-4" />
              </li>
              <li aria-current="page" className="font-semibold text-foreground">
                {page.title}
              </li>
            </ol>
          </nav>

          <div className="flex max-w-2xl flex-col gap-4">
            <p className="text-eyebrow font-semibold tracking-eyebrow text-primary uppercase">
              {legalPageContent.eyebrow}
            </p>
            <h1 className="text-2xl">{page.title}</h1>
            <p className="text-base text-body-foreground">{page.summary}</p>
          </div>
        </Container>
      </div>

      <Container className="flex max-w-3xl flex-col gap-7x py-8x">
        <p className="flex items-start gap-3 rounded-card bg-alert-bg p-6x text-base text-alert">
          <InfoIcon aria-hidden className="mt-1 size-5 shrink-0" />
          {legalPageContent.pendingNotice}
        </p>

        <section
          aria-labelledby="legal-covers"
          className="flex flex-col gap-4 rounded-card border border-border bg-card p-6x"
        >
          <h2 id="legal-covers" className="text-lg">
            {legalPageContent.coversLabel}
          </h2>
          <ul className="flex list-disc flex-col gap-3 pl-5">
            {page.covers.map((item) => (
              <li key={item} className="text-base text-body-foreground">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="legal-contact"
          className="flex flex-col gap-3 border-t border-border pt-6x"
        >
          <h2 id="legal-contact" className="text-lg">
            {legalPageContent.contactLabel}
          </h2>
          <p className="max-w-2xl text-base text-body-foreground">
            {legalPageContent.contactBody}
          </p>
          <p className="flex flex-col gap-1 text-sm">
            <span className="text-muted-foreground">
              {legalPageContent.phoneLabel}
            </span>
            <PhoneLink
              phone={site.phones.main}
              className="flex min-h-11 w-fit items-center text-lg font-semibold text-primary underline underline-offset-4"
            />
          </p>
        </section>
      </Container>
    </>
  );
}
