---
name: design-system
description: This skill defines the visual foundation for the website in two stages — first a Design Direction Brief that commits to a visual language derived from the brand story, then tokenization of that direction into CSS custom properties. It runs as Step 5 of the redesign pipeline, before any pages are built. Use this skill whenever the user mentions "design system", "design direction", "design tokens", "colors", "typography", "fonts", "spacing", "visual direction", or when building any page or component that needs to reference the established visual language. Also trigger when the architect agent checks for design consistency. The web-designer agent reads this skill AND the design-direction.md file before building every page.
---

# Tømrer & Snedker v/ Martin Mejdahl Jørgensen ApS — Design System

Visual foundation for the website. Every page and component must execute the direction brief at `design-direction.md` and use these tokens.

## Direction Brief Reference

See `design-direction.md` for the committed visual language. This skill documents the *execution* of that direction into tokens.

**Direction in one sentence:** Archival trade confidence expressed through warm material surfaces, editorial asymmetry, and slab-set type — the visual language of a craftsman whose name is on the company, not a contractor whose logo is on a van.

**Selected strategies:** T4 / C5 / L2 / P3 / S4 / D2 / M1

**Identity test:** "Does this site look like it was produced by a craftsman who measures twice and cuts once — or does it look like a marketing agency that made a template for contractors?"

**Avoid list (direction-specific additions — binding):**

1. No soft pill buttons or rounded input fields — S4 Architectural Line is binding. 0px radius everywhere. If a UI element has a border, it is a hairline (1px). No rounding, ever.
2. No photography of people we do not have real photos of — No AI-generated figures in a practitioner or team-member context. Martin's portrait slot is reserved for client-supplied photography.
3. No generic hero — no centered headline + centered subheadline + centered button. The hero is always an asymmetric editorial composition with an image occupying at minimum one side.
4. No three-equal-column feature cards — L2 editorial asymmetry explicitly rejects uniform grids.
5. No gradient anywhere — not on backgrounds, buttons, or overlays.
6. No large emoji in headings or section labels.
7. No "scroll to count up" animation on statistics.
8. No drop shadows on cards or sections — S4 defines surface separation through hairlines, not elevation.
9. No lorem ipsum at any stage — use `[NEEDS: ...]` format with specific description.
10. No pure #000000 or #FFFFFF anywhere — C5 Earth Palette commits to warm neutrals.
11. No homepage with hero → features → testimonials → CTA — that is the default SaaS landing page structure.
12. No stock photography — ever. Only authentic case photography, client-supplied photography, or clearly stylized AI-generated process imagery.

---

## Color Palette — C5 Earth Palette + Sharp Accent

**Strategy rationale:** Danish residential construction is a world of timber, concrete, and raw material — the earth palette grounds the site in the same material world Martin works in, while the sharp amber accent gives a single decisive signal to critical trust elements and conversion moments.

### Raw Neutrals

| Token | Value | Usage |
|-------|-------|-------|
| `--color-ink` | `#1a1612` | Near-black body text — reads as aged ink, not digital black. NEVER use pure #000. |
| `--color-stone` | `#7a7065` | Mid-tone warm gray — secondary text, captions, metadata |
| `--color-clay` | `#a8998a` | Warmer mid-gray — card separators, section dividers (visual not hairline) |
| `--color-bone` | `#f5f0e8` | Off-white — primary page background. NEVER use pure #FFF. |
| `--color-paper` | `#faf7f2` | Slightly warmer white — card and section surfaces that sit above the bone base |

### Accent — AMBER ONLY, RESTRICTED USE

| Token | Value | Usage |
|-------|-------|-------|
| `--color-accent` | `#d97706` | Saturated amber — primary CTAs and Byg Garanti trust badge ONLY |
| `--color-accent-hover` | `#b45309` | Darker amber — hover state on accent elements. Solid color shift, no gradient. |
| `--color-trust` | `#d97706` | Alias for accent — used specifically to highlight the Byg Garanti/certification signal |

**CRITICAL: The accent color appears ONLY on:**
- Primary CTA buttons ("Få et gratis tilbud", "Kontakt os", "Ring nu")
- Byg Garanti trust badge highlight and hairline rule
- Hover states on navigation links (color change only — no other property changes)
- Focus rings (accessibility — always visible)

**NEVER use accent on:** decorative elements, section backgrounds, icons, headings, body text, borders (except focus rings), card fills, or any element that is not a direct conversion or trust signal.

### Semantic Color Tokens

| Token | Value | Role |
|-------|-------|------|
| `--color-text-primary` | `#1a1612` | Main text on light backgrounds |
| `--color-text-secondary` | `#7a7065` | Supporting text, captions, labels |
| `--color-text-inverse` | `#f5f0e8` | Text on dark backgrounds (footer, dark hero) |
| `--color-surface-base` | `#f5f0e8` | Page background |
| `--color-surface-card` | `#faf7f2` | Card and section surface |
| `--color-surface-dark` | `#1a1612` | Footer, dark hero sections |
| `--color-border` | `#d6cfc4` | Hairline rules — warm stone-tinted, architectural |

### Surface Hierarchy (light to dark)

```
--color-paper (#faf7f2)      ← cards, elevated surfaces
--color-bone  (#f5f0e8)      ← page base background
--color-clay  (#a8998a)      ← mid-tone separators (used sparingly)
--color-stone (#7a7065)      ← secondary text
--color-ink   (#1a1612)      ← primary text, dark sections
```

---

## Typography — T4 Archival Slab

**Strategy rationale:** Slab serifs carry industrial heritage — the mechanical era of Danish trade guilds and craftsman signage — which grounds the site in a register of earned expertise rather than polished marketing. The two-register approach (slab display + sans body) executes the dual tømrer + snedker duality: two voices, one coherent thing.

### Font Families

| Token | Value | Role |
|-------|-------|------|
| `--font-display` | `"Zilla Slab", serif` | All headings H1–H6, pull quotes, certification labels, trust signal headers |
| `--font-body` | `"IBM Plex Sans", system-ui, sans-serif` | All body copy, navigation, form labels, captions, metadata |
| `--font-mono` | `"IBM Plex Mono", monospace` | CVR number, certification codes, spec figures, numerical trust signals |

**Loading:** Google Fonts import in `globals.css` for development. In production, load via `next/font/google` in the locale layout and pass CSS variable names (`--font-display-family`, `--font-body-family`, `--font-mono-family`) to the `@theme` block. The CSS variable names in this system (`--font-display`, `--font-body`, `--font-mono`) are pre-defined and ready to receive the next/font values.

### Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `--font-weight-display` | `700` | Slab Bold — section headlines, service H1s, homepage hero |
| `--font-weight-semibold` | `600` | Slab Semibold — subheadings, CVR number, trust badge labels, navigation in slab contexts |
| `--font-weight-regular` | `400` | Body Regular — all long-form copy, captions |

### Type Scale (D2 Editorial density)

| Token | rem | px | Usage |
|-------|-----|----|-------|
| `--font-size-xs` | 0.875rem | 14px | Legal text, fine print, metadata |
| `--font-size-sm` | 1rem | 16px | Body base, captions |
| `--font-size-md` | 1.25rem | 20px | Large body, lead copy intro |
| `--font-size-lg` | 1.5rem | 24px | Section subheadings, card headings |
| `--font-size-xl` | 2rem | 32px | Service page H2, section headings |
| `--font-size-2xl` | 3rem | 48px | Service page H1, mobile hero lower bound |
| `--font-size-3xl` | 4rem | 64px | Homepage hero (desktop lower bound) |
| `--font-size-4xl` | 5rem | 80px | Homepage hero (desktop upper bound) |

### Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `--line-height-tight` | `1.1` | Slab display headings — mechanical, not airy |
| `--line-height-snug` | `1.3` | Subheadings, lead copy |
| `--line-height-normal` | `1.6` | Body copy — IBM Plex Sans reads well at 1.6 |

### Letter Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--letter-spacing-tight` | `-0.02em` | Large slab display (H1, hero) — pulls letters together |
| `--letter-spacing-normal` | `0` | Body copy — humanist sans sets itself |
| `--letter-spacing-wide` | `0.06em` | All-caps labels, certification tags, section eyebrows |

### Typography Usage Guide

**Display (slab):** Use `--font-display` with `--font-weight-display` for all headings H1–H4. At hero scale (H1 on homepage: 64–80px), always apply `--letter-spacing-tight`. At smaller heading scales (H3, H4 section labels), letter-spacing can be `--letter-spacing-normal`.

**Body (sans):** Use `--font-body` with `--font-weight-regular` for all body copy. Use `--font-weight-semibold` for subheadings, button labels, navigation items, and UI labels within the sans register.

**Mono:** Use `--font-mono` exclusively for: CVR number display, certification code references, specification figures (dimensions, area measurements), and any numerical trust signal. Never use mono for decorative purposes.

**All-caps labels:** Use `--font-body` (sans), `--font-weight-semibold`, `--letter-spacing-wide` — for section eyebrows ("Ydelser", "Projekter", certification category labels). Slab is structural, not decorative — all-caps slab at small sizes is not part of this system.

**Do not:** mix slab with italic flourishes. Slab is structural, not decorative. No italics on slab headings.

---

## Spacing — D2 Editorial + 8px base grid

**Strategy rationale:** The Danish homeowner audience researches carefully before calling — they are not converting on a quick scroll. Editorial density gives the right amount of space for trust signals to land with weight, while keeping the homepage concise enough to not require a scroll marathon.

### Spacing Scale (8px base)

| Token | rem | px |
|-------|-----|----|
| `--space-1` | 0.5rem | 8px |
| `--space-2` | 1rem | 16px |
| `--space-3` | 1.5rem | 24px |
| `--space-4` | 2rem | 32px |
| `--space-5` | 3rem | 48px |
| `--space-6` | 4rem | 64px |
| `--space-7` | 5rem | 80px |
| `--space-8` | 6rem | 96px |
| `--space-9` | 8rem | 128px |
| `--space-10` | 10rem | 160px |
| `--space-11` | 12rem | 192px |
| `--space-12` | 14rem | 224px |
| `--space-13` | 16rem | 256px |
| `--space-14` | 20rem | 320px |
| `--space-15` | 24rem | 384px |
| `--space-16` | 32rem | 512px |

### Section Rhythm

| Token | Value | Usage |
|-------|-------|-------|
| `--section-gap` | 7.5rem (120px) | D2: between major page sections. Never less. Up to 160px is acceptable on spacious desktop layouts. |
| `--container-max` | 80rem (1280px) | L2: max container width |
| `--container-pad` | 1.5rem (24px) | Mobile horizontal padding |
| `--container-pad-desktop` | 3rem (48px) | Desktop horizontal padding |

**Sub-section spacing (within a section):** Use `--space-5` (48px) to `--space-6` (64px). Not `--section-gap` — that is for between-section air only.

**Component spacing (within components):** Use `--space-2` (16px) to `--space-4` (32px).

---

## Component Conventions — S4 Architectural Line

**Strategy rationale:** Architectural line form-language signals the precision discipline of someone who works to documented tolerances — a tømrer must measure, mark, and cut to line, and the UI executes that discipline directly. Zero-radius elements also reject the consumer-SaaS softness that would be tonally wrong for a structural trade service.

### Shape Tokens

| Token | Value | Rule |
|-------|-------|------|
| `--radius-none` | `0px` | All components — non-negotiable |
| `--radius-sm` | `0px` | Even "small" radius is 0 in this system |
| `--border-width-hairline` | `1px` | Section dividers, card borders, nav bar scroll rule |
| `--border-width-structural` | `2px` | Secondary CTA buttons, input focus borders |
| `--shadow-none` | `none` | No elevation model — S4 is flat |
| `--shadow-card` | `0 1px 0 var(--color-border)` | Hairline bottom only — cards separate from page via hairline, not shadow |

### Button Conventions

**Primary CTA:**
- Background: `--color-accent` (#d97706)
- Text: white (WCAG AA — checked against #d97706)
- Border: none
- Border-radius: `--radius-none` (0px)
- Hover: background transitions to `--color-accent-hover` in `--duration-fast` (150ms) with `--easing-standard`. Color only — no scale, no shadow, no other property changes.
- Font: `--font-body`, `--font-weight-semibold`

**Secondary CTA:**
- Background: transparent
- Text: `--color-ink`
- Border: `--border-width-structural` (2px) solid `--color-ink`
- Border-radius: `--radius-none` (0px)
- Hover: border and text color shift to `--color-accent` in `--duration-fast`

**All buttons:** Focus-visible uses `--focus-ring` with 2px offset. No outline removal.

### Card Conventions

- Background: `--color-surface-card` (--color-paper)
- Border: `--border-width-hairline` (1px) solid `--color-border`
- Border-radius: `--radius-none` (0px)
- Shadow: `--shadow-card` (hairline bottom only) OR just the 1px border — no elevation
- No drop shadows, ever

### Form Input Conventions (S4 structural logic)

- Inputs: underline only (bottom-border: `--border-width-hairline` solid `--color-border`) — no surrounding box
- Focus: `--border-width-structural` (2px) bottom border in `--color-accent`
- Border-radius: `--radius-none` (0px)
- Labels: `--font-body`, `--font-weight-semibold`, `--letter-spacing-wide`, all-caps, `--color-text-secondary`

### Navigation Conventions (L2 + S4)

- Nav bar: transparent on initial load; 1px hairline bottom border (`--color-border`) appears on scroll
- Links: `--font-body`, `--font-weight-semibold` — clean horizontal nav, no mega-menus
- Hover: color shift to `--color-accent` in `--duration-fast` — no underline animation, no slide
- Active/current: `--color-accent` text color, 1px bottom rule in `--color-accent`
- Mobile: vertical collapse, instant or `--duration-fast` fade — no hamburger icon animation, no slide-in

### Section Dividers (S4 structural logic)

- 1px hairline (`--color-border`) at the column margin, not full-width
- The rule defines the section start; it does not form a box
- No decorative rules — every hairline must mark a structural boundary

---

## Motion Rules — M1 Architectural Stillness

**Strategy rationale:** A craftsman who takes structural integrity seriously does not create decorative movement — the site's behaviour should match the brand's character: considered, unhurried, without performance. Stillness communicates confidence; gratuitous animation communicates insecurity.

### Timing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-instant` | `100ms` | Micro-feedback (button press confirmation, checkbox) |
| `--duration-fast` | `150ms` | Hover state transitions — PRIMARY use |
| `--duration-normal` | `200ms` | Page element transitions — upper bound |
| `--easing-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | All transitions — ease-out character |

### Motion Rules (binding)

1. **Hover transitions:** Use ONLY `--duration-fast` (150ms) with `--easing-standard`. Color changes only — no scale, no shadow, no position changes on hover.
2. **No parallax:** Never. Not "subtle" parallax — zero parallax, anywhere.
3. **No scroll-linked animation:** No elements that animate as the user scrolls. If a single section-entry fade is applied, it is opacity-only, applied to the first viewport only, and at `--duration-normal` (200ms).
4. **No section entry animations on every section:** One optional fade on the first viewport hero section is the maximum. Applying entrance animations uniformly across sections is explicitly prohibited (see Avoid list in design-direction.md).
5. **Page transitions:** Instant or `--duration-fast` (150ms) fade maximum. Not animated navigation transitions.
6. **No scroll-triggered counter animations:** Stat figures set typographically as static facts.
7. **`prefers-reduced-motion`:** All transitions degrade to `0.01ms` (effectively instant). The `@media (prefers-reduced-motion: reduce)` block in `globals.css` is the global enforcement — individual components must not override it.

---

## CSS Custom Properties Reference

Complete list of all tokens defined in `src/app/globals.css` under `@theme inline`:

### Color
`--color-ink`, `--color-stone`, `--color-clay`, `--color-bone`, `--color-paper`, `--color-accent`, `--color-accent-hover`, `--color-text-primary`, `--color-text-secondary`, `--color-text-inverse`, `--color-surface-base`, `--color-surface-card`, `--color-surface-dark`, `--color-border`, `--color-trust`

### Typography
`--font-display`, `--font-body`, `--font-mono`, `--font-weight-display`, `--font-weight-semibold`, `--font-weight-regular`, `--font-size-xs`, `--font-size-sm`, `--font-size-md`, `--font-size-lg`, `--font-size-xl`, `--font-size-2xl`, `--font-size-3xl`, `--font-size-4xl`, `--line-height-tight`, `--line-height-snug`, `--line-height-normal`, `--letter-spacing-tight`, `--letter-spacing-normal`, `--letter-spacing-wide`

### Spacing
`--space-1` through `--space-16`, `--section-gap`, `--container-max`, `--container-pad`, `--container-pad-desktop`

### Component
`--radius-none`, `--radius-sm`, `--border-width-hairline`, `--border-width-structural`, `--shadow-none`, `--shadow-card`

### Motion
`--duration-instant`, `--duration-fast`, `--duration-normal`, `--easing-standard`

### Focus
`--focus-ring`

---

## Drift Checks

- **Identity test from direction brief:** "Does this site look like it was produced by a craftsman who measures twice and cuts once — or does it look like a marketing agency that made a template for contractors?"
- **Avoid list reference:** See `design-direction.md` for the direction-specific Avoid list — architect review treats violations as Critical.
- **Token trace rule:** Every token in use must trace to a strategy selection (T4 / C5 / L2 / P3 / S4 / D2 / M1). If a token is added because it is "useful" without a strategy anchor, it violates the brief.
- **Accent check:** If the amber accent appears on any element that is not a primary CTA, Byg Garanti trust signal, hover state, or focus ring — that is a Critical drift finding.
- **Radius check:** If any component, button, card, input, image frame, or badge has a non-zero border-radius — that is a Critical S4 violation.
- **Shadow check:** If any card or section uses a CSS box-shadow with vertical/horizontal offset and blur greater than 0 — that is a Critical S4 violation. The only permitted shadow is `--shadow-card` (hairline bottom).
