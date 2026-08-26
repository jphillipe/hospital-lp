import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  /**
   * Canonical origin. Everything absolute — `metadataBase`, Open Graph,
   * sitemap, JSON-LD `@id` — is resolved against it.
   */
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),
});

/**
 * `NEXT_PUBLIC_*` is inlined at build time, so each variable must be read as a
 * literal `process.env.X` — a dynamic lookup would come back undefined in the
 * browser bundle.
 */
const parsed = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

if (!parsed.success) {
  throw new Error(
    `Invalid environment variables:\n${z.prettifyError(parsed.error)}`,
  );
}

export const env = parsed.data;

export type Env = z.infer<typeof envSchema>;
