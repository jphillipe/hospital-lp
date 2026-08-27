# Dighton Medical Center — visual direction

> Status: **Direction G is approved and implemented.** This document is the source of
> truth for colour, typography and scale. `docs/PLAN.md` remains the source of truth
> for architecture and page structure; where the two touch, PLAN.md wins unless an
> amendment there says otherwise.

## Round history

| Round | Date | What was proposed | Outcome |
|---|---|---|---|
| 1 | 2026-08-26 | Three directions pitched side by side: **01 Harbor** (spruce + brass, Newsreader / Public Sans, full-bleed dusk photograph with a status band), **02 Slide** (gentian violet + eosin rose from histology stains, Familjen Grotesk / Source Serif 4, split type-and-grid hero), **03 Night Shift** (dark-first, amber + oxygen mint, Bricolage Grotesque / Instrument Sans). | **Refused.** *Reason not recorded — placeholder. The client has not stated why; do not invent one.* |
| 2 | 2026-08-26 | Direction 02 "Slide" built: full oklch token set light + dark, `--eosin` as a separate token, closed tracking tokens, and a static hero (copy left, figures grid and 3:4 portrait right). | **Refused.** *Reason not recorded — placeholder. The client has not stated why; do not invent one.* |
| 3 | 2026-08-26 | **Direction G**, below. | **Approved.** Header and hero rebuilt against it. |

> Rounds 1 and 2 are recorded here because they were refused, not because they were
> wrong on any ground anyone wrote down. Fill the two placeholders in before this
> file is used to brief anyone else.

---

## Direction G

Warm paper rather than white, a petrol green that carries the institution, violet
held back exclusively for the assistant, and a warm sand reserved for eyebrows that
sit on top of photography. Display type is a serif at book weight; the interface
runs on a geometric sans. Nothing shouts, and the only saturated colour on a resting
page is the brand green.

### Colour — light (bare `:root`)

| Token | Value | Role |
|---|---|---|
| `--background` | `#F8F7F4` | warm paper |
| `--foreground` | `#16211E` | headings and strong text |
| `--body-foreground` | `#3B4744` | running prose (project token) |
| `--muted-foreground` | `#6A7673` | secondary text |
| `--card` | `#FFFFFF` | raised surfaces |
| `--card-foreground` | `#16211E` | |
| `--popover` / `--popover-foreground` | `#FFFFFF` / `#16211E` | |
| `--muted` | `#F1EFEA` | subtle surface |
| `--border` | `#E3E1DB` | hairlines |
| `--input` | `#C8C6BE` | field and chip outline |
| `--ring` | `#0B5A4C` | focus |
| `--primary` | `#0B5A4C` | brand petrol green |
| `--primary-foreground` | `#FFFFFF` | |
| `--secondary` / `--secondary-foreground` | `#F1EFEA` / `#16211E` | |

Project tokens — shadcn does not cover these:

| Token | Value | Role |
|---|---|---|
| `--brand-hover` | `#0E7362` | |
| `--ai` | `#5B5BD6` | violet = assistant, never the brand |
| `--ai-soft` | `#EFEFFC` | |
| `--alert` | `#B3261E` | |
| `--alert-bg` | `#FBEDEB` | |
| `--radius-card` | `14px` | |
| `--radius-sm` | `6px` | |
| `--shadow-float` | `0 18px 40px -28px rgb(0 0 0 / .55)` | |

### Colour — dark

| Token | Value |
|---|---|
| `--background` | `#0B100F` |
| `--foreground` | `#EAF0ED` |
| `--body-foreground` | `#C0CBC7` |
| `--muted-foreground` | `#85918D` |
| `--card` / `--card-foreground` | `#131A18` / `#EAF0ED` |
| `--popover` / `--popover-foreground` | `#131A18` / `#EAF0ED` |
| `--muted` | `#101614` |
| `--border` | `#202B28` |
| `--input` | `#2E3B37` |
| `--ring` | `#3FB79B` |
| `--primary` / `--primary-foreground` | `#3FB79B` / `#04201A` |
| `--secondary` / `--secondary-foreground` | `#101614` / `#EAF0ED` |
| `--brand-hover` | `#5BCFB2` |
| `--ai` / `--ai-soft` | `#A5A6F6` / `#1B1B33` |
| `--alert` / `--alert-bg` | `#FF7062` / `#26100E` |
| `--shadow-float` | `0 18px 40px -28px rgb(0 0 0 / .8)` |

Dark mode follows the operating system through `@media (prefers-color-scheme: dark)`.
There is no toggle and no `next-themes` — see the 2026-08-26 amendment in PLAN.md §1.

### Over the media — these do not follow the theme

They sit on top of the photograph, above the scrim, so they read identically in
light and dark.

```css
--hero-scrim: linear-gradient(90deg,
                rgb(6 14 13 / .86)  0%,
                rgb(6 14 13 / .60) 42%,
                rgb(6 14 13 / .12) 78%,
                rgb(6 14 13 / .28) 100%);
--on-media:         #FFFFFF;
--on-media-soft:    rgb(255 255 255 / .86);
--on-media-eyebrow: #EBD9A8;   /* warm sand, AA over the veil */
--on-media-ink:     #0B100F;   /* ADDED — see "Additions" below */
```

## Typography

| Role | Face | Detail |
|---|---|---|
| Display | **Newsreader** 400 / 500 | Hero, section titles, wordmark |
| | | hero h1: `clamp(1.75rem, 4.2vw, 3rem)` / `1.06` / `-0.018em` / weight 400 |
| UI & body | **Figtree** 400 / 500 / 600 / 700 | Navigation, buttons, prose, chips |
| | | base 16px / 1.65 · nav 14.5px/500 · button 14px/600 |
| Eyebrow | Figtree 600 | 11px · letter-spacing `.20em` · uppercase |

Both load through `next/font/google` in `src/app/layout.tsx`.

## Closed scales

Nothing outside these lists ships without asking first.

- **Text** — 11 · 12 · 13.5 · 14 · 14.5 · 16 · 19 · 24 · 32 · `clamp(28, 4.2vw, 48)`
- **Space** — 4 · 8 · 12 · 16 · 20 · 26 · 34 · 52 · 72
- **Radius** — 6 (sm) · 14 (card) · 999 (pill) · 50% (icon)

The type scale is enforced, not merely documented: `globals.css` resets
`--text-*: initial` before defining the list, so any size outside it fails to
compile rather than shipping quietly.

Space maps as follows. 4–20 are Tailwind's own `1`–`5`; the four values above that
sit off the default ramp and so carry explicit names rather than colliding with it:

| Value | Utility |
|---|---|
| 4 · 8 · 12 · 16 · 20 | `1` · `2` · `3` · `4` · `5` |
| 26 | `6x` |
| 34 | `7x` |
| 52 | `8x` |
| 72 | `9x` |

`--spacing-overlap: 38px` exists on its own: it is the single measured offset by
which the assistant band lifts into the hero, not a scale step.

## Additions and deviations

Everything here is a decision taken while implementing, not part of the pasted
direction. Each one is small, and each one is reversible.

1. **`--on-media-ink: #0B100F` was added.** The hero CTA is a white pill on the
   scrim. The over-media group defines white, soft white and the sand eyebrow, but
   no ink to write on a white button. `--primary` cannot do it: it is `#3FB79B` in
   dark, which fails AA on white. The new token is theme-independent like the rest
   of that group.
2. **`--accent`, `--destructive`, `--chart-*` and `--sidebar-*` are derived, not
   designed.** Direction G does not name them and nothing on the page uses them
   yet, but the shadcn primitives reference them. They are mapped onto existing
   direction G values so no primitive renders unstyled. Revisit before the first
   chart ships.
3. **The emergency bar uses `--alert-bg` as ground and `--alert` as ink, in both
   themes** — not a solid red bar. Direction G treats alert as a wash-plus-ink
   pair, and PLAN.md's requirement is that the emergency route not require a
   scroll, which is about position, not saturation.
4. **`<h1>` lives on slide 1 only; slides 2 and 3 use `<h2>`.** One `h1` per page is
   non-negotiable and a rotating element must not redefine the page heading. The
   trade-off is real: while slides 2 or 3 are showing, the visible display line is
   an `h2`. Inactive slides are `aria-hidden` and `inert`, so only one slide is ever
   in the accessibility tree.
5. **Prose colour is `--body-foreground`, set on `body`; `--foreground` is reserved
   for headings and strong text.** The base layer also pins `h1`–`h3` to Newsreader
   at weight 400, so no section has to remember to do it.
