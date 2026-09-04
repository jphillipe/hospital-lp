# Dighton Medical Center — marketing site

## Stack
Next.js 16 (App Router), React, TypeScript strict, Tailwind v4,
shadcn/ui, pnpm. All code, identifiers and UI copy in English.

## Commands
- `pnpm dev` — local server
- `pnpm typecheck` — tsc --noEmit
- `pnpm lint` / `pnpm lint:fix`
- `pnpm test` — Vitest
- `pnpm build` — production build

## Conventions
- Server Components by default. `"use client"` only on a leaf component
  that needs state, effects or event handlers. Never in a layout.
- No `any`. External data (forms, env, APIs) goes through a Zod schema
  and the type comes from `z.infer`.
- Landing sections live in `src/components/sections/<name>.tsx` and take
  typed props — a section never fetches its own data.
- Content (specialties, doctors, locations) lives in `src/content/*.ts`,
  typed. No content strings hardcoded in JSX.
- Color, spacing and typography only through theme tokens. No hex in JSX.
- Variants with `cva`, not string ternaries inside className.
- Images via `next/image` with descriptive alt. Fonts via `next/font`.

## Accessibility — required, not a nice-to-have
AA contrast minimum, visible focus, full keyboard operation,
one <h1> per page, semantic landmarks, a label on every input.

## Do not
- Do not add a new dependency without asking me first.
- Do not edit `src/components/ui/*` (shadcn-generated) — compose on top.
- Do not create a README or comments explaining the obvious.
- Do not commit or push unless I ask.
- Do not invent medical data. If content is missing, use a clear
  placeholder and tell me.

## Plan
The approved architecture plan lives in `docs/PLAN.md`. Follow it.

## Before you say you are done
Run `pnpm typecheck && pnpm lint && pnpm build` and show me the real output.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
