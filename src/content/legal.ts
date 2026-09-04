import type { LegalPage, LegalPageContent } from "@/types/content";

/**
 * Three legal instruments, published as stated placeholders.
 *
 * `legalNav` has linked all three from the footer of every page since the site
 * was built, and all three 404'd. That is the worst kind of broken link on a
 * medical site: a crawler finds it on every page, and a patient looking for a
 * privacy notice finds nothing.
 *
 * They are **not** drafted here. A Notice of Privacy Practices is a regulated
 * document with required content under HIPAA, and a §1557 nondiscrimination
 * notice has its own required elements — writing plausible-looking versions
 * would be exactly the kind of invention `CLAUDE.md` forbids, with more at
 * stake than a made-up phone number. Each page says what the document will
 * cover, says plainly that it has not been published, and gives the number to
 * call meanwhile.
 *
 * Replace `covers` with the real text when counsel supplies it, and delete
 * `pendingNotice` from `legalPageContent` on the same day.
 */
export const legalPageContent = {
  eyebrow: "Legal",
  homeLabel: "Home",
  breadcrumbLabel: "Breadcrumb",
  coversLabel: "What this notice will cover",
  pendingNotice:
    "This document has not been published yet. What follows is a summary of what it will contain, not the notice itself, and it has no legal effect. Until it is published, call the main line with any question about privacy, your records or your rights and you will get a direct answer from a person.",
  contactLabel: "Questions in the meantime",
  contactBody:
    "Call the main line and say what you are trying to find out. Nobody will be made to wait for a document to appear on a website.",
  phoneLabel: "Main line",
} as const satisfies LegalPageContent;

export const legalPages = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    summary:
      "How this website handles the information you give it, and what it does not collect.",
    covers: [
      "What this website collects, and what it does not — no protected health information is collected anywhere on it",
      "What happens to an appointment request: who sees it and how long it is kept",
      "What the assistant does with a question, and that nothing typed into it is stored",
      "Cookies and any measurement used on the site",
      "Who to contact about information the practice holds about you",
    ],
    seoDescription:
      "Privacy policy for the Dighton Medical Center website — what it collects, what it does not, and who to contact.",
  },
  {
    slug: "privacy-practices",
    title: "Notice of Privacy Practices",
    summary:
      "How the practice may use and disclose your health information, and the rights you have over it. This is the HIPAA notice, and it is a different document from the website privacy policy.",
    covers: [
      "How your health information is used for treatment, payment and operations",
      "Disclosures the practice may make without your authorisation, and those requiring it",
      "Your right to see, copy, amend and receive an accounting of your records",
      "Your right to request restrictions and confidential communications",
      "How to file a complaint, with the practice and with the Office for Civil Rights",
      "The effective date and how changes to the notice are announced",
    ],
    seoDescription:
      "Notice of Privacy Practices for Dighton Medical Center — how health information is used and disclosed, and your rights over it.",
  },
  {
    slug: "nondiscrimination",
    title: "Nondiscrimination Notice",
    summary:
      "The practice's statement that it does not discriminate, and the language assistance available free of charge.",
    covers: [
      "The statement that care is provided without discrimination on the basis of race, colour, national origin, age, disability or sex",
      "Free language assistance and interpreters, and how to ask for them",
      "Free aids and services for people with disabilities",
      "How to raise a grievance, and how to file a civil rights complaint",
      "The taglines required in the languages most common to this area",
    ],
    seoDescription:
      "Nondiscrimination notice and language assistance at Dighton Medical Center.",
  },
] as const satisfies readonly LegalPage[];
