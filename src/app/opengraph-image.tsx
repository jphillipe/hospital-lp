import { ImageResponse } from "next/og";

import { site } from "@/content/site";

/**
 * The site had no social image at all: every link shared to a message, a feed
 * or a search preview rendered as bare text.
 *
 * Drawn rather than photographed, for the same reason the doctor cards render a
 * monogram — there is no photograph of this practice, and a stock interior would
 * be a picture of somewhere else presented as here. The palette is direction G's
 * (`docs/DESIGN.md`), written as literals because `ImageResponse` renders
 * outside the document and never sees the CSS custom properties.
 *
 * `next/font` cannot be used here either, so this deliberately uses the runtime
 * default face rather than shipping a font file for one image.
 */
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F8F7F4",
          padding: "72px",
          // The brand green as a left rule, the way the sections carry it.
          borderLeft: "24px solid #0B5A4C",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#0B5A4C",
              fontWeight: 600,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.08,
              color: "#16211E",
              maxWidth: "900px",
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            fontSize: 28,
            color: "#3B4744",
          }}
        >
          <div style={{ display: "flex" }}>
            Primary Care · Geriatric Care · Psychology · Physical Therapy
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#6A7673" }}>
            {`${site.address.street}, ${site.address.city}, ${site.address.region}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
