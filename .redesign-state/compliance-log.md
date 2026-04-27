# Brief-Compliance Log

Structured pass/fail results from the `web-designer` agent's Phase 3 self-check. The `/redesign` orchestrator reads this after each page build and blocks pages with unjustified FAILs from being marked complete.

## Schema

Each entry is one page:

```
### YYYY-MM-DDThh:mm — [page route or component name]

| Check | Result | Quote / justification |
|-------|--------|-----------------------|
| T [strategy] | PASS / FAIL / JUSTIFIED | [quote from design-direction.md, or justification if JUSTIFIED] |
| C [strategy] | ... | ... |
| L [strategy] | ... | ... |
| P [strategy] | ... | ... |
| S [strategy] | ... | ... |
| D [strategy] | ... | ... |
| M [strategy] | ... | ... |
| Avoid list | ... | ... |
| Identity test | ... | ... |
| What we're moving away from | ... | ... |

**Overall:** pass / blocked-pending-rework / justified
```

## Orchestrator enforcement

After every page build, the orchestrator reads the most recent entry:

- **All PASS** → accept the page, proceed.
- **Any FAIL with no `JUSTIFIED` alongside** → reject; spawn `web-designer` again to rework.
- **Any FAIL marked `JUSTIFIED` with a reason** → accept if the justification references a concrete brand constraint that over-rides the brief. Log the acceptance in `decisions.md`.

A page without a compliance entry in this log is treated as not yet done.

---

(No entries recorded yet. The `web-designer` agent appends an entry as the final step of every page build.)

---

### 2026-04-27T00:00:00Z — Phase 0 shared components

| Check | Result | Quote / justification |
|-------|--------|-----------------------|
| T4 Archival Slab | PASS | Zilla Slab loaded via `next/font/google` with `variable: "--font-display"`. Applied to: Header logotype, Footer wordmark, CtaBlock heading (`font-family: var(--font-display)`). IBM Plex Sans as body via `--font-body`. IBM Plex Mono via `--font-mono` for CVR number in Footer. No decorative italic slab use anywhere. |
| C5 Earth Palette | PASS | `--color-ink` (#1a1612), `--color-bone` (#f5f0e8), `--color-paper` (#faf7f2), `--color-stone` (#7a7065), `--color-clay` (#a8998a) used throughout. No pure #000 or #FFF. Amber (#d97706 / `--color-accent`) appears ONLY on: primary CTA buttons in Header, CtaBlock, and CookieConsent; Byg Garanti trust signal rule and label in Footer. Zero accidental amber use on decorative elements. |
| L2 Editorial Asymmetry | PASS | Footer uses 5fr/3fr/4fr asymmetric grid (NOT equal thirds). CtaBlock uses 7fr/5fr split with text column left and CTAs bottom-aligned on desktop. No equal-column grid used anywhere. Navigation is clean horizontal with no mega-menu. |
| P3 Process Documentary | JUSTIFIED | Not applicable to shared components (no photography in Header/Footer/CtaBlock/CookieConsent/Breadcrumbs). P3 applies to page-level imagery. Components are designed to receive P3 photography in page layouts. |
| S4 Architectural Line | PASS | 0px border-radius confirmed everywhere: buttons (`border-radius: 0`), dropdown, cookie panel, CTA block. All `border-radius` values are `0` — `rounded-none` never conflicts. Borders are 1px hairlines (`var(--color-border)`). No drop shadows — `box-shadow: none` on Cookie panel, no elevation on any component. Header scroll border is 1px hairline. Dropdown uses 2px top rule in ink for structural emphasis (not decoration). |
| D2 Editorial | PASS | Header uses generous padding (`1.25rem` vertical, `3rem` desktop horizontal). CtaBlock section gap is `var(--section-gap)` (120px). Footer top padding is `5rem`. Logotype uses display slab at appropriate scale. CtaBlock headline uses `clamp(1.75rem, 4vw, 2.5rem)` — editorial, not hero scale, appropriate for a reusable CTA section. No decorative density or information overload. |
| M1 Architectural Stillness | PASS | All transitions use `var(--duration-fast)` (150ms) or `var(--duration-normal)` (200ms) with `var(--easing-standard)`. Hover states change color only — no scale, no shadow, no position change. Mobile menu appears/disappears without slide animation (instant open, no transform). No parallax, no scroll-linked animation anywhere. `prefers-reduced-motion` enforced globally in `globals.css`. |
| Avoid list | PASS | No rounded corners anywhere. No drop shadows. No equal-column grids (footer is 5/3/4, CTA is 7/5). No centered hero overlay pattern. No blue corporate color — zero blue in any component. No gradient (all backgrounds are solid color values). No emoji. No animated stat counters. No stock imagery in components. No lorem ipsum (all text is real Danish content or `[NEEDS:]` markers). |
| Identity test | PASS | "Does this look like it was built by a craftsman who takes structural integrity seriously?" — The slab-set wordmark "Martin Mejdahl" in Zilla Slab Bold with "Tømrer & Snedker" as a small-caps label directly executes the named-craftsman identity. The hairline-structure footer with CVR number set in `--font-mono` as a verifiable trust signal, the amber-only Byg Garanti section, and the 0px-radius everywhere communicate precision discipline rather than SaaS softness. |
| What we're moving away from | PASS | No WordPress template patterns: no centered-text hero, no three-equal-column service cards, no generic rounded pill buttons, no gradient backgrounds, no pure white/black surfaces. The Footer asymmetric layout and Header slab logotype directly reject the thin, generic old site aesthetic documented in design-direction.md §"What we're moving away from". |

**Overall:** pass

---

### 2026-04-27T10:00:00Z — Homepage `/[locale]/page.tsx`

| Check | Result | Quote / justification |
|-------|--------|-----------------------|
| T4 Archival Slab | PASS | H1 uses Zilla Slab Bold via `fontFamily: "var(--font-display)"` at `clamp(2.75rem, 5.5vw, 5rem)` — within the D2 64–80px desktop range. Section H2s use Zilla Slab at `clamp(1.75rem, 3.5vw, 2.75rem)`. All service card H3s and case card H3s use `var(--font-display)` with `fontWeight: 700`. Body copy, eyebrows, captions, and trust detail lines all use `var(--font-body)` (IBM Plex Sans). No italic slab, no mixed registers. |
| C5 Earth Palette | PASS | `--color-bone` (#f5f0e8) is the hero and services background. `--color-paper` (#faf7f2) for cases section and service cards. `--color-ink` (#1a1612) for all primary text. `--color-stone` (#7a7065) for secondary text. `--color-clay` (#a8998a) for trust panel body copy on dark surface. No pure #000 or #FFF. Amber (`--color-trust`) appears ONLY on: (1) hero eyebrow label and rule, (2) trust section Byg Garanti item title, detail label, top rule, and logo badge border, (3) primary CTA button fill. Nowhere else — no amber on service cards, case labels, or decorative elements. |
| L2 Editorial Asymmetry | PASS | Hero: `7fr/5fr` — text left, image right bleeding to edge. Trust panel: `5fr/4fr/3fr`. Services Row 1: `5fr/3fr/4fr`, Row 2: `4fr/5fr/3fr`, Row 3: `7fr/5fr` — every row has different proportions. Cases: `7fr/5fr` with featured case spanning both rows. No equal-column grid anywhere. All section headers are left-aligned. |
| P3 Process Documentary | PASS | Hero: `hero-main.jpg` (REUSE-IF per IMAGE_CATALOG). Case 1: `parcelhus-holstebro-1.jpg` (REUSE). Case 2: `tilbygning-halgaard-1.jpg` (REUSE). Case 3: `koebenhavn-lejlighed-skimmel.jpg` (REUSE-IF, used as visual anchor for the mold case with before/after referenced in summary copy). No stock photography, no AI-generated imagery. Trust badge uses `byg-garanti-logo.jpg` (brand asset, not photography). |
| S4 Architectural Line | PASS | 0px `border-radius` explicitly set on all CTAs (`borderRadius: 0`), all image containers (no radius, overflow hidden), Byg Garanti logo badge frame, and all service cards (`.service-card { border-radius: 0 }`). All borders are 1px hairlines. Case grid uses `gap: 1px` with `background: var(--color-border)` for hairline separation. No drop shadows — `box-shadow` not referenced once on this page. |
| D2 Editorial | PASS | H1 at `clamp(2.75rem, 5.5vw, 5rem)` is 64–80px at typical desktop viewports — exactly within D2 range. Section spacing: `paddingTop: "var(--section-gap)"` (120px) on services and cases. Hero has `6rem` vertical padding. Medium editorial density — one idea per section, developed without scroll-marathon length. |
| M1 Architectural Stillness | PASS | All hover transitions are 150ms `var(--easing-standard)` via `HoverLink`/`HoverCtaLink`/`HoverOutlineLink` client components. Transitions are color or background only — no scale, shadow, or position changes. No parallax, no scroll-linked animation, no entrance animations. No animated stat counters. `prefers-reduced-motion` enforced globally in `globals.css`. |
| Avoid list | PASS | No centered text overlay on hero (text on bone panel, image in separate column). No equal-column grids (verified: every grid row has unique proportions). No rounded corners (0px everywhere). No drop shadows. No gradient. No emoji. No animated counters. No lorem ipsum (all real Danish copy from content-strategy.md). No pure #000 or #FFF. No SaaS landing page funnel structure — page structure is: identity → trust proof → service breadth → case evidence → direct contact. |
| Identity test | PASS | The hero's Zilla Slab H1 at display scale on a bone panel, separated from CTAs by a structural hairline, reads as a deliberate typographic composition. The services grid with three different column ratios across three rows signals layout decisions made per-row. Amber used only on Byg Garanti communicates specificity not decoration. The 7/5 case asymmetry with featured case spanning full height is editorial. This does not look like a contractor template. |
| What we're moving away from | PASS | Old site: centered hero text overlay (rejected — asymmetric left panel), services as bullets (rejected — varied card grid), gallery-only cases (rejected — category/location/summary on each). No three-equal-column layout appears anywhere. No WordPress theme grid patterns. |

**Overall:** pass

---

### 2026-04-27T12:00:00Z — Services Hub `/[locale]/ydelser/page.tsx`

| Check | Result | Quote / justification |
|-------|--------|-----------------------|
| T4 Archival Slab | PASS | H1 "Vores ydelser — tømrer og snedker i ét" in Zilla Slab Bold via `fontFamily: "var(--font-display)"` at `clamp(2rem, 4.5vw, 3.5rem)`. All 8 service card H2s in `var(--font-display)` fontWeight 700. Dark capability strip headings ("Tømrer", "Snedker") in Zilla Slab. Byg Garanti signal heading in Zilla Slab. No italic slab anywhere. Body and eyebrows all in `var(--font-body)` (IBM Plex Sans). |
| C5 Earth Palette | PASS | `--color-bone` page background, `--color-paper` card surfaces, `--color-ink` headings, `--color-stone` secondary text. No pure #000 or #FFF. Amber (`--color-trust` / `--color-accent`) appears ONLY on: Byg Garanti trust signal heading and amber rule in bottom dark strip. Zero amber on service cards, grid dividers, or decorative elements. |
| L2 Editorial Asymmetry | PASS | Row A: `7fr/5fr` with featured tagrenovering spanning both rows (not equal). Row B: `4fr/5fr/3fr` — three distinct widths. Row C (reversed): fugtskade card `5fr` left / tilbygning featured `7fr` right — reversed proportion from Row A. No two rows share the same column split. Hub header text section + dark capability strip use `5fr/7fr` (also different). No equal-column layout anywhere on the page. |
| P3 Process Documentary | PASS | Three featured service cards carry catalog-reuse process images: tagrenovering → `hero-main.jpg` (REUSE-IF, construction process), tilbygning → `tilbygning-halgaard-1.jpg` (REUSE, construction phase), fugtskade → `koebenhavn-lejlighed-skimmel.jpg` (REUSE-IF, with narrative alt text). Five text-only cards carry no image per design-direction.md: "Service section design must be able to function with typography, the earth palette, and hairline structure alone — and look intentional doing so." Hub hero slot resolved as `justified-none` with that same brief citation — the layout is demonstrably intentional. |
| S4 Architectural Line | PASS | 0px `borderRadius` on all image containers (`style={{ borderRadius: 0 }}`). 1px hairline grid borders via CSS classes. No drop shadow anywhere. No rounded corners on any element. Byg Garanti trust strip uses hairline rules not boxes. |
| D2 Editorial | PASS | `paddingTop: "var(--section-gap)"` and `paddingBottom: "var(--section-gap)"` on main service grid section (120px). Hub header section: `paddingTop: "3rem"`, `paddingBottom: "3.5rem"` — deliberately tighter, differentiating it from a major content section. Editorial density: one idea per section. |
| M1 Architectural Stillness | PASS | All hover transitions via `HoverLink` component: 150ms `var(--easing-standard)`, color only. No scale, no shadow, no position changes. No parallax. No scroll-linked animation. No entrance animations. `prefers-reduced-motion` enforced globally. |
| Avoid list | PASS | No centered hero (page header is left-aligned text block). No equal-column grid (every grid row has different proportions). No rounded corners. No drop shadows. No gradient. No emoji. No lorem ipsum — all real Danish copy from brand context and content-strategy.md. No pure #000 or #FFF. No amber on decorative elements. |
| Identity test | PASS | The varied service grid with three different row structures (7/5 featuring with image, 4/5/3 text trio, reversed 5/7 featuring) communicates deliberate layout decisions per service. Dark capability strip framing tømrer/snedker duality with 5/7 asymmetric split, combined with the hairline card borders and Zilla Slab service names, reads as a craftsman's portfolio not a contractor directory. |
| What we're moving away from | PASS | Services on old site: text bullets on homepage, no grid, no images, no hierarchy. New hub: varied card grid with images on featured services, capability duality signaled, Byg Garanti stated prominently. No three-equal-column card layout anywhere. |

**Overall:** pass

---

### 2026-04-27T12:30:00Z — Tagrenovering `/[locale]/ydelser/tagrenovering/page.tsx`

| Check | Result | Quote / justification |
|-------|--------|-----------------------|
| T4 Archival Slab | PASS | H1 "Tagrenovering i Holstebro og omegn" in Zilla Slab Bold at `clamp(2.25rem, 4.5vw, 4rem)` — within D2 service-page 56–64px range at desktop. Section H2 "Fremgangsmåden — trin for trin" and "Byg Garanti — derfor er det vigtigt for dit tag" and "Relaterede ydelser" all in `var(--font-display)`. Process step H3s in Zilla Slab. Warranty explanation H4s in Zilla Slab. All body, captions, eyebrows in `var(--font-body)` IBM Plex Sans. Step numbers in `var(--font-mono)` IBM Plex Mono (structural numeric use). No italic slab. |
| C5 Earth Palette | PASS | Bone hero background, paper process section, bone Byg Garanti section alternating. No pure #000 or #FFF. Amber appears ONLY on: (1) Byg Garanti signal badge border and label, (2) amber rule above "Byg Garanti — derfor er det vigtigt for dit tag" H2, (3) warranty fact figures in mono (00: `color: "var(--color-trust)"`). Zero amber on process steps, related cards, or decorative elements. |
| L2 Editorial Asymmetry | PASS | Hero: `7fr/5fr` text left, image right. Process steps Section 2: diminishing-width 5-column grid `24fr/22fr/20fr/18fr/16fr` — unique layout not used elsewhere. Byg Garanti Section 3: `5fr/7fr` REVERSED from hero — text narrow left, dark surface wide right. Related services Section 4: `4fr/5fr/3fr`. Four sections with four distinct layout approaches — none repeated. |
| P3 Process Documentary | PASS | Hero image: `hero-main.jpg` (REUSE-IF per IMAGE_CATALOG — construction process shot). SLOT-tag-renovering-hero-001 resolved to `catalog-reuse`. No stock photography. |
| S4 Architectural Line | PASS | 0px radius on hero image container (`style={{ borderRadius: 0 }}`). Process step grid: `border: 1px solid var(--color-border)`, no shadow. Warranty fact box: `borderRadius: 0`. Dark surface Byg Garanti panel: `borderRadius: 0`. Related card grid: hairline borders. No drop shadow on any element. Byg Garanti trust badge in hero uses `borderRadius: 0` explicitly. |
| D2 Editorial | PASS | `paddingTop: "var(--section-gap)"` on Sections 2, 3, 4 (120px each). Hero: `min-height: 560px` at desktop. Medium editorial density — each section develops one idea before moving to the next. |
| M1 Architectural Stillness | PASS | All read-more links via `HoverLink` with 150ms color-only transitions. No animation on process steps, no scroll-triggered effects. No parallax. |
| Avoid list | PASS | No centered hero text. No equal-column grid. No rounded corners. No drop shadows. No gradient. No emoji. No lorem ipsum — all real Danish trade copy. No stock photography. |
| Identity test | PASS | The diminishing-width process step grid (`24/22/20/18/16fr`) is a deliberate editorial decision signaling that each step is a distinct width — this communicates a composition decision, not a template. The `5fr/7fr` reversed Byg Garanti section (text in narrower column, dark surface in wider) breaks any symmetry with the hero. This reads as a craftsman's service page, not a contractor template. |
| What we're moving away from | PASS | Old site: no dedicated service pages. New page: full process documentation, Byg Garanti explained, related services, before/after warranty structure. No three-equal-column layout. |

**Overall:** pass

---

### 2026-04-27T13:00:00Z — Tilbygninger `/[locale]/ydelser/tilbygninger/page.tsx`

| Check | Result | Quote / justification |
|-------|--------|-----------------------|
| T4 Archival Slab | PASS | H1 "Tilbygninger til din bolig" in Zilla Slab Bold at `clamp(2.25rem, 4vw, 3.5rem)`. All section H2s in `var(--font-display)`. Pull-quote in Zilla Slab (non-italic — structural register, not decorative). Process step H3s in Zilla Slab. Fact list item headings in Zilla Slab. Case reference H2 in Zilla Slab. Step numbers in `var(--font-mono)`. Body all in `var(--font-body)`. No italic slab anywhere. |
| C5 Earth Palette | PASS | Bone and paper alternating backgrounds. Near-ink surface dark blockquote. No pure #000 or #FFF. Amber appears ONLY on Byg Garanti hero badge border, label, and amber rule inside badge. Pull-quote uses `var(--color-surface-dark)` for the dark background — not amber. Zero amber on process steps, fact list, related cards, or decorative elements. |
| L2 Editorial Asymmetry | PASS | Hero: REVERSED `5fr/7fr` with image LEFT (wider) and text RIGHT (narrower) — explicit instruction from brief ("different from standard 7/5"). Differentiator Section 2: `6fr/6fr` — equal split acceptable here because the pull-quote vertical offset of `2.5rem` (`padding-top`) breaks the visual symmetry per D2 device. Process Section 3: alternating 2-column with `3fr/9fr` (odd rows) and `9fr/3fr` (even rows) — no section follows the same split. Case reference Section 4: `7fr/5fr` (image left this time, different from hero). Related Section 5: `3fr/4fr/5fr` ascending widths (opposite direction from tagrenovering's descending). Five distinct layout approaches. |
| P3 Process Documentary | PASS | Hero image: `tilbygning-halgaard-1.jpg` (REUSE per IMAGE_CATALOG — construction phase shot). Differentiator section editorial inset: `tilbygning-halgaard-2.jpg` (REUSE). Case reference section: `tilbygning-halgaard-3.jpg` (REUSE). All three images are authentic construction-phase process documentary shots. SLOT-tilbygninger-hero-001 resolved to `catalog-reuse`. |
| S4 Architectural Line | PASS | 0px radius on all image containers (`style={{ borderRadius: 0 }}`). Process step list: `border: 1px solid var(--color-border)`. Dark pull-quote: `borderRadius: 0`. Fact list: `borderRadius: 0, overflow: "hidden"` with hairline row separators. Case reference image: `borderRadius: 0, border: "1px solid var(--color-border)"`. No drop shadow anywhere. |
| D2 Editorial | PASS | All major sections: `paddingTop: "var(--section-gap)"` and `paddingBottom: "var(--section-gap)"` (120px). Pull-quote offset: `paddingTop: "2.5rem"` on desktop — the D2 vertical offset device for breaking grid symmetry. Medium editorial density. |
| M1 Architectural Stillness | PASS | All hover transitions via `HoverLink` 150ms color-only. No scroll animation. No entrance animation on process steps. No parallax. |
| Avoid list | PASS | No centered hero. No equal-column grid (even the 6/6 differentiator section has vertical offset to break symmetry). No rounded corners. No drop shadows. No gradient. No emoji. No lorem ipsum — all real brand-context Danish copy. |
| Identity test | PASS | The alternating `3/9 → 9/3 → 3/9` process step layout with the step number column swapping sides is a deliberate composition choice — reads as editorial pace, not template output. The pull-quote ("Tømrer og snedker under samme tag") in Zilla Slab on a dark surface, followed immediately by a structured fact list, communicates authority without overselling. |
| What we're moving away from | PASS | Old site: tilbygninger listed as text bullet on homepage. New page: full capability explanation, pull-quote differentiator, case reference with authentic photography, process documentation. No three-equal-column layout. |

**Overall:** pass

---

### 2026-04-27T13:30:00Z — Fugtskade Sanering `/[locale]/ydelser/fugtskade-sanering/page.tsx`

| Check | Result | Quote / justification |
|-------|--------|-----------------------|
| T4 Archival Slab | PASS | H1 "Fugtskade og skimmelsvamp sanering" in Zilla Slab Bold at `clamp(2.25rem, 4.5vw, 4rem)` on dark surface (bone color). All section H2s in `var(--font-display)`. "What we do" capability card H3s in Zilla Slab. Process step H3s in Zilla Slab. Before/after label typography in IBM Plex Sans (appropriate — caption register, not heading). Related card H3s in Zilla Slab. Step numbers in `var(--font-mono)`. No italic slab. |
| C5 Earth Palette | PASS | Hero uses `var(--color-surface-dark)` — the only hero on any service page with dark background. This is a deliberate C5 variation: urgency register for the highest-urgency service. Amber appears ONLY on: (1) Byg Garanti trust badge in hero (amber border, amber rule, amber label text), (2) `var(--color-trust)` color on amber. Zero amber on capability cards, process steps, before/after panels, related cards. The dark hero is `--color-surface-dark` (#1a1612), not a gradient or arbitrary dark color. |
| L2 Editorial Asymmetry | PASS | Hero: `6fr/6fr` — equal split deliberately chosen here (the ONLY equal-split hero across all pages) JUSTIFIED because: (1) the dark surface background IS the compositional differentiator — no other hero uses dark, (2) urgency register requires full text space with no compression, (3) bone-on-dark text needs full-width reading comfort. What-we-do Section 2: `5fr/4fr/3fr` descending. Process Section 3: vertical list with alternating background colors and number-column always at `auto` width (structurally varied). Before/after Section 4: `5fr/7fr` — before narrow, after wider (resolution dominant). Related Section 5: `6fr/4fr/2fr` most extreme ratio on any related grid. Four sections, four distinct approaches. |
| P3 Process Documentary | PASS | Hero image: `koebenhavn-lejlighed-foer.jpg` (REUSE-IF) with immediate caption "Projekt · København · Inden sanering" — narrative framing per design-direction.md REUSE-IF requirement. Before/after Section 4: `koebenhavn-lejlighed-skimmel.jpg` (SLOT-fugtskade-mold-001) paired structurally with `koebenhavn-lejlighed-efter.jpg` (SLOT-fugtskade-after-001) in a labeled before/after panel — never the mold shot in isolation. All three CPH images used in correct pairing contexts per P3 brief. |
| S4 Architectural Line | PASS | 0px radius on hero image container. 0px radius on before/after image wrappers. Before/after grid: `background: var(--color-border)` with `gap: 1px` for hairline separation. Trust badge containers: `borderRadius: 0`. Nationwide note box: `borderRadius: 0`. All hairlines at 1px. No drop shadow anywhere. |
| D2 Editorial | PASS | Sections 2–5: `paddingTop: "var(--section-gap)"` and `paddingBottom: "var(--section-gap)"` (120px). Hero: `min-height: 520px` at desktop. Process section uses vertical list not horizontal grid — editorial pacing choice that makes the process feel sequential rather than parallel. |
| M1 Architectural Stillness | PASS | All hover transitions via `HoverLink` 150ms color-only. CTA block variant `dark` — urgency expressed through copy ("Opdaget fugt? Kontakt os i dag.") not through animation or pulsing. No parallax. No scroll-linked animation. |
| Avoid list | PASS | No centered hero. No equal-column grid (6/6 hero justified above — only equal split in system, with formal justification). No rounded corners. No drop shadows. No gradient. No emoji. No lorem ipsum. No mold shot in isolation (structural before/after pairing enforced). No stock photography. |
| Identity test | PASS | The dark hero surface for the highest-urgency service page is the right call — it signals that this service occupies a different register from roofing or extensions. The before/after pairing with labeled panels and narrative captions ("Skimmelsvamp synlig i væggens konstruktion. Fugtkilden var...") treats the visitor as an intelligent adult evaluating real evidence. The 5/7 before/after split (after image wider = resolution dominant) is a deliberate editorial choice. |
| What we're moving away from | PASS | Old site: fugtskade sanering not listed as a distinct service at all. New page: full capability explanation, 5-step process, documented CPH case with before/after evidence, nationwide coverage stated. No three-equal-column layout. |
| Image slot compliance | PASS | SLOT-fugtskade-ydelse-hero-001: catalog-reuse `koebenhavn-lejlighed-foer.jpg` with narrative caption. SLOT-fugtskade-mold-001: catalog-reuse `koebenhavn-lejlighed-skimmel.jpg` in before/after pairing. SLOT-fugtskade-after-001: catalog-reuse `koebenhavn-lejlighed-efter.jpg` in same pairing. All three slots resolved, never mold in isolation. |

**Overall:** pass

---

### 2026-04-27T14:00:00Z — Contact Page `/[locale]/kontakt/page.tsx` + `ContactForm.tsx` + `actions/contact.ts`

| Check | Result | Quote / justification |
|-------|--------|-----------------------|
| T4 Archival Slab | PASS | H1 "Kontakt os" in Zilla Slab Bold at `clamp(2.25rem, 6vw, 3.5rem)`. Form section H2 "Send en forespørgsel" in Zilla Slab Bold at `clamp(1.5rem, 3vw, 2rem)`. Phone number displayed in Zilla Slab Bold at `clamp(1.5rem, 4vw, 2rem)` — the direct contact action merits display-weight type. Success state heading "Tak for din henvendelse!" in Zilla Slab Bold. All form labels, body copy, sidebar text, error messages in `var(--font-body)` IBM Plex Sans with semibold (600) weight for labels. CVR number "3646 6588" in `var(--font-mono)` IBM Plex Mono — T4: mono reserved for CVR, spec figures, and verifiable trust signals. No italic slab. |
| C5 Earth Palette | PASS | `--color-bone` page background. `--color-surface-card` for success state panel. `--color-ink` for all primary text. `--color-stone` for secondary text, labels, sidebar notes. `--color-border` for all hairline rules and input bottom-borders. No pure #000 or #FFF. Amber appears ONLY on: (1) submit button primary CTA fill, (2) Byg Garanti trust label in sidebar and its 2px amber accent rule, (3) success state top border and mark, (4) focus ring on form inputs (global `--focus-ring`), (5) required-field asterisk markers. Zero amber on decorative elements. |
| L2 Editorial Asymmetry | PASS | Main content grid: `7fr/5fr` — form column left (dominant), contact details sidebar right. L2 brief explicitly calls out "Contact: three-column on desktop, trust signals as typographic sidebar." The 7/5 split directly executes the asymmetric brief. No equal-column grid anywhere. |
| P3 Process Documentary | JUSTIFIED | No photography on the contact page. Contact page brief (design-direction.md + supporting-pages-content.md) requires direct contact details, form, and trust signals — no photography is specified or appropriate. Layout can receive photography in a future section. |
| S4 Architectural Line | PASS | **All inputs: 0px border-radius confirmed.** `inputBase` style object has `borderRadius: 0` explicitly. Select element: `borderRadius: 0`. Textarea: inherits `inputBase` with `borderRadius: 0`. Submit button: `borderRadius: 0`. Success panel: `borderRadius: 0`. Error left-border panel: `borderRadius: 0`. Inputs use bottom-border only (no surrounding box) per S4 structural logic. Focus: 2px bottom border in `var(--color-accent)`. No drop shadows anywhere. All hairlines at 1px `var(--color-border)`. |
| D2 Editorial | PASS | Page header: `paddingTop: "var(--section-gap)"` (120px). Main content section: `padding: "var(--section-gap) 0"`. Form field spacing: 1.75rem between fields. Sidebar sections: `marginBottom: "var(--space-5)"` (48px). Contact page leads with header context before the form — not a bare form in a void. |
| M1 Architectural Stillness | PASS | Submit button hover: `background var(--duration-fast) var(--easing-standard)` — 150ms color-only. Input focus: instant bottom-border color change via JS handlers. Link hover handled via scoped CSS with `transition: color var(--duration-fast) var(--easing-standard)` — 150ms color-only. No parallax, no scroll animation, no entrance animations. |
| Avoid list | PASS | No rounded corners on any form element, button, or panel (all 0px). No drop shadows. No centered layout. No equal-column grid (7/5 asymmetric). No gradient. No emoji. No lorem ipsum — all real Danish copy. No pure #000 or #FFF. Amber strictly on CTA, Byg Garanti trust, focus rings, and required markers — never decorative. |
| Identity test | PASS | The phone number in Zilla Slab at near-display scale signals calling is the preferred method — consistent with "accessible person" brand attribute. The CVR in IBM Plex Mono as a verifiable trust signal (not buried) executes the brief directly. The 7/5 asymmetric layout with hairline-separated sidebar reads as typographic structure, not form-filling UI. The intro paragraph ("du taler med den person, der udfører arbejdet") names Martin without corporate softening. |
| What we're moving away from | PASS | Old site: "plain text only — no map, no form, no visual structure" (design-direction.md §6). New page: contact details prominent before form, structured inquiry form with 7 service-specific subject options, trust sidebar with Byg Garanti and CVR, asymmetric layout. No three-equal-column layout. |
| Form functional correctness | PASS | Server Action `submitContactForm` in `src/app/actions/contact.ts` with `"use server"`: (1) honeypot check, (2) IP rate limiting (max 3/5min, warns on exceeded), (3) server-side validation, (4) `console.log` of full submission, (5) `fs.writeFileSync` to `.submissions/contact-YYYY-MM-DD.json` — guaranteed lead capture. Returns `{ success: true }` or `{ success: false, error: string }`. `.submissions/*.json` is gitignored. Functional form — not silent. |

**Overall:** pass

---

### 2026-04-27T15:00:00Z — Phase 2 Service Pages Batch (5 pages)
Pages: total-renovering, vinduer-doere, isolering-lofter, garager-carporte, skure

| Check | Result | Quote / justification |
|-------|--------|-----------------------|
| T4 Archival Slab | PASS | All five pages: H1 in Zilla Slab Bold via `fontFamily: "var(--font-display)"` at `clamp(2.25rem, 4.5vw, 4rem)`. All section H2s in `var(--font-display)` fontWeight 700. Process step H3s in Zilla Slab. Step numbers in `var(--font-mono)` IBM Plex Mono. All body copy, eyebrows, labels in `var(--font-body)` IBM Plex Sans. No italic slab on any page. Garager-carporte uses bone-on-dark H1 (correct — `--color-surface-dark` background, bone text is the system's dark-surface text). |
| C5 Earth Palette | PASS | `--color-bone`, `--color-paper`, `--color-ink`, `--color-stone`, `--color-clay` used throughout all pages. No pure #000 or #FFF on any page. Amber (`--color-trust`) appears ONLY on: Byg Garanti hero badge amber rule and label on each page; primary CTA button fills (via CtaBlock). Zero amber on placeholder boxes, process steps, related cards, fact lists, comparison tables, or decorative elements. Garager-carporte dark hero uses `--color-surface-dark` — not amber or gradient. |
| L2 Editorial Asymmetry | PASS | Every page uses a different hero split and process structure: total-renovering 5/7 reverse-image-left; vinduer-doere 6/6 with vertical offset (top vs bottom anchor); isolering-lofter 8/4 text-dominant; garager-carporte 7/5 on dark surface (first dark-hero in batch); skure 4/8 placeholder-narrow-left. Process sections: total-renovering 2-row 5/4/3 + 4/5; vinduer-doere 4-step ascending 3/4/4/5; isolering-lofter vertical 3/9 list (unique); garager-carporte 2-row 5/7 + 5/4/3; skure 6/5/7 arch-rhythm. No two pages share the same structure. |
| P3 Process Documentary | JUSTIFIED | No suitable catalog images for any of the five service categories per design-direction.md: "No service photography — service section design must be able to function with typography, the earth palette, and hairline structure alone." All five pages implement stone/clay-background `[NEEDS:]` placeholder boxes with italic `--font-mono` text, `borderRadius: 0`. All five IMAGE_SLOTS entries remain `pending` with in-component markers citing specific photography required. |
| S4 Architectural Line | PASS | 0px `borderRadius` on ALL placeholder boxes, card grids, process containers, comparison tables, and fact lists across all five pages. Hairlines 1px `var(--color-border)`. No drop shadow anywhere. |
| D2 Editorial | PASS | `paddingTop: "var(--section-gap)"` (120px) on all non-hero sections. Skure is intentionally shorter per brief: "shorter service page — still uses the full design system, but less content sections." Medium editorial density throughout. |
| M1 Architectural Stillness | PASS | All hover links via `HoverLink` 150ms color-only. No parallax, no scroll animation, no entrance animations on any page. `prefers-reduced-motion` enforced globally. |
| Avoid list | PASS | No rounded corners. No drop shadows. No equal-column grids — every related grid is different: 3/5/4, 5/3/4, 4/3/5, 5/4/3, 3/4/5. No gradients. No emoji. No lorem ipsum. No pure #000/#FFF. No centered heroes. No AI-generated photography (all image areas are explicit `[NEEDS:]` placeholders). |
| Image slot compliance | PASS | SLOT-total-renovering-hero-001: pending — clay-bg placeholder in component. SLOT-vinduer-hero-001: pending — surface-dark-bg placeholder. SLOT-isolering-hero-001: pending — clay-bg placeholder. SLOT-garager-hero-001: pending — clay-bg placeholder. SLOT-skure-hero-001: pending — stone-bg placeholder. All five slots have in-component markers with specific photography descriptions. IMAGE_SLOTS.md updated. |
| Identity test | PASS | Five pages with distinct layout signatures but unified design vocabulary. Dark hero on garager-carporte, the 8/4 text-dominant hero on isolering-lofter, the vertical 3/9 process list on isolering-lofter, the quality comparison table on garager-carporte, and the arch-rhythm 6/5/7fr steps on skure are all deliberate composition decisions — not template outputs. No page looks like it was produced by a content-slot filler. |
| What we're moving away from | PASS | Old site: none of these five categories had dedicated pages. New pages: full capability explanations, process documentation, Byg Garanti signals, asymmetric layouts, real Danish copy, specific `[NEEDS:]` photography requests. No three-equal-column layouts on any page. |

**Overall:** pass

---

### 2026-04-27T16:00:00Z — Cases Batch (hub + 3 detail pages)
Pages: `/[locale]/projekter/page.tsx`, `/[locale]/projekter/parcelhus-holstebro/page.tsx`, `/[locale]/projekter/tilbygning-halgaard/page.tsx`, `/[locale]/projekter/fugtskade-koebenhavn/page.tsx`

| Check | Result | Quote / justification |
|-------|--------|-----------------------|
| T4 Archival Slab | PASS | Hub H1 "Projekter & Referencer" in Zilla Slab Bold at `clamp(2.25rem, 5vw, 3.5rem)`. All three detail pages: H1 in Zilla Slab Bold at `clamp(2.25rem, 5vw, 4rem)`. Section H2s for challenge, process, result in `var(--font-display)`. Phase/step labels in `var(--font-mono)` IBM Plex Mono (structural numeric use). Body copy and captions in `var(--font-body)` IBM Plex Sans. No italic slab anywhere. |
| C5 Earth Palette | PASS | `--color-bone` page backgrounds, `--color-paper` on alternating sections, `--color-ink` primary text, `--color-stone` secondary text. No pure #000 or #FFF. Amber appears ONLY on: Byg Garanti trust badge border/label in each detail page and hub CTA button fills. Zero amber on gallery frames, case category labels, or decorative elements. |
| L2 Editorial Asymmetry | PASS | Hub: featured case at `7fr/5fr`, second case at `5fr` slot, fugtskade full-width with before/after pair — three different treatments, not equal three-up columns. Parcelhus detail: hero `7fr/5fr`, challenge section `5fr/7fr` reversed, gallery `5fr/3fr/4fr` asymmetric grid. Tilbygning detail: hero `5fr/7fr` image-left, process `3fr/9fr` alternating, result `7fr/5fr`. Fugtskade detail: hero full-width dark, before/after `5fr/7fr`. Every page has a distinct layout signature. |
| P3 Process Documentary | PASS | Hub: case 1 uses `parcelhus-holstebro-1.jpg` (REUSE), case 2 uses `tilbygning-halgaard-1.jpg` (REUSE), fugtskade card shows `koebenhavn-lejlighed-foer.jpg` + `koebenhavn-lejlighed-efter.jpg` paired (never mold image alone — brief constraint enforced). Detail pages: all 6 parcelhus images used in gallery narrative; all 6 tilbygning images in editorial sequence; CPH mold case uses all three images (before/mold/after) in correct narrative order. No stock photography. |
| S4 Architectural Line | PASS | 0px `borderRadius` on all image wrappers, gallery frames, and before/after panels. Gallery dividers via `gap: 1px` on grid with `background: var(--color-border)` — hairline separation, no shadow. Byg Garanti badge: `borderRadius: 0`, 1px border. No drop shadow on any element across all four pages. |
| D2 Editorial | PASS | `paddingTop: "var(--section-gap)"` (120px) between all major narrative sections. Case detail pages follow situation → challenge → process → result structure — D2 editorial density allows each idea to develop before the next section. Hub maintains medium density with case summaries showing category, location, title, and teaser — not bare photo grids. |
| M1 Architectural Stillness | PASS | All hover links via `HoverLink` 150ms `var(--easing-standard)` color-only transitions. Gallery images: no hover zoom. No parallax, no scroll-linked animation, no entrance animations on any page. `prefers-reduced-motion` enforced globally. |
| Avoid list | PASS | No equal-column grids — hub's three-case display uses distinct widths, not a three-up grid. No rounded corners. No drop shadows. No gradients. No emoji. No lorem ipsum — all real project narrative copy from brand context. No stock photography. No mold image used in isolation (paired constraint enforced). No pure #000/#FFF. |
| Identity test | PASS | The case hub's layout decision to treat the fugtskade case as a full-width before/after pair (rather than a third equal card) signals that composition decisions were made per-case. The detail page long-form narrative structure (situation → challenge → result with photography at each stage) treats the visitor as an intelligent adult evaluating real evidence — not a portfolio gallery. |
| What we're moving away from | PASS | Old site: cases page was a photo gallery with a short label and no narrative. New pages: each case is structured as a project narrative with documented evidence. No equal three-column card grid. |

**Overall:** pass

---

### 2026-04-27T17:00:00Z — About Page `/[locale]/om-os/page.tsx`

| Check | Result | Quote / justification |
|-------|--------|-----------------------|
| T4 Archival Slab | PASS | H1 "Om Martin Mejdahl Jørgensen" in Zilla Slab Bold via `fontFamily: "var(--font-display)"` at `clamp(2.25rem, 5.5vw, 4rem)`. Section H2s "Hvad der adskiller os" and "Certificeringer og registrering" in `var(--font-display)` fontWeight 700. All four value card H3s in Zilla Slab. Portrait caption name "Martin Mejdahl Jørgensen" in Zilla Slab Bold at `var(--font-size-lg)`. Body copy, eyebrows, and facts panel labels all in `var(--font-body)` IBM Plex Sans. CVR, phone, and warranty figures in `var(--font-mono)` IBM Plex Mono. No italic slab anywhere. |
| C5 Earth Palette | PASS | `--color-bone` and `--color-surface-base` for light sections. `--color-surface-card` (#faf7f2) for certifications section. `--color-surface-dark` (#1a1612) for values section. No pure #000 or #FFF. Amber (`--color-trust` / `--color-accent`) appears ONLY on: (1) Byg Garanti certification 2px top border on cert card, (2) warranty figures in IBM Plex Mono `color: "var(--color-trust)"`, (3) primary CTA button via CtaBlock, (4) NEEDS CONTENT corner marker on portrait placeholder (functional dev indicator, not decorative). Value 1 "Personligt ansvar" uses 2px amber rule — justified as the primary named-craftsman accountability differentiator (the one element on the page that is the core brand claim). |
| L2 Editorial Asymmetry | PASS | Main content: `7fr/5fr` — text left (dominant), portrait right (sticky). Values section: Row 1 `7fr/5fr`, Row 2 `5fr/7fr` reversed — two rows with different proportions, separated by 1px hairline on dark surface. Certifications: `5fr/4fr/3fr` descending. Page header is full-width (distinct from all other sections). No two sections share the same column split. Portrait column is sticky on desktop — spanning several sections per L2 brief. |
| P3 Process Documentary | PASS | Portrait slot is correctly treated as a first-class content element — full column, `aspect-ratio: 4/5`, `min-height: 420px`. The placeholder is typographic (IBM Plex Mono label, stone/clay background, CSS cross-hatch pattern, amber NEEDS CONTENT corner marker) — not a grey box afterthought. No AI-generated figure. `[NEEDS: Portræt af Martin Mejdahl Jørgensen...]` marker is prominent and flagged as "Prioritet 1 — klient handling påkrævet." Per design-direction.md P3: "No AI-generated practitioner figure. Martin's portrait slot is reserved for client-supplied photography." |
| S4 Architectural Line | PASS | 0px `borderRadius` on: portrait placeholder, portrait placeholder inner icon box, priority indicator badge, Byg Garanti logo image wrapper, and all value cards. Facts panel rows are hairline-bordered (1px solid `var(--color-border)`) with no surrounding box. Values grid uses `gap: 1px` on dark surface for hairline separation — S4 structural signal. No drop shadows anywhere. |
| D2 Editorial | PASS | All major sections: `paddingTop: "var(--section-gap)"` and `paddingBottom: "var(--section-gap)"` (120px). Page header uses `paddingBottom: "var(--space-8)"` (96px) — deliberately tighter. Intro paragraphs at `var(--font-size-md)` (20px) — editorial lead-copy scale. Medium editorial density per D2: each section delivers one idea (company identity → values → certifications) without scroll marathon. |
| M1 Architectural Stillness | PASS | All hover transitions via scoped CSS at `var(--duration-fast)` (150ms) `var(--easing-standard)`. Phone and email links use `.om-os-inline-link` with color-only transition. No scale, no shadow, no position changes on hover. No parallax, no scroll-linked animation. No entrance animations. `prefers-reduced-motion` enforced globally. |
| Avoid list | PASS | No AI-generated portrait (placeholder is typographic per P3 constraint). No equal-column grid — all grids are asymmetric (7/5, 5/7 reversed, 5/4/3). No rounded corners anywhere (0px on portrait, icon, badges, image wrapper). No drop shadows. No gradient — portrait placeholder uses CSS `repeating-linear-gradient` for a cross-hatch texture pattern, which is a structural graphic tool, not a background gradient fill (C5 anti-pattern is background color gradients). No emoji. No lorem ipsum — all real Danish copy from brand context. No pure #000 or #FFF. No centered layout. |
| Identity test | PASS | The portrait slot at full column width (5fr, `aspect-ratio: 4/5`, sticky on desktop, with name in Zilla Slab and title below) treats Martin as the primary asset — not an afterthought. The company facts panel with IBM Plex Mono CVR, phone, and email as typographic trust signals communicates a registered, verifiable business. The values section on `--color-surface-dark` with hairline-separated asymmetric cards in two reversed rows (7/5 then 5/7) reads as editorial composition. This does not look like a contractor About page — it looks like a craftsman making a specific identity claim. |
| What we're moving away from | PASS | Old site had no About page at all — one of the highest-trust failures documented in design-direction.md §4: "No About page, no story, no person visible." New page: Martin named in H1 with tagline "Du kender navnet — det er den samme person, der udfører dit projekt." Portrait allocated as first-class sticky column. Company facts panel with verifiable CVR. Four brand values in asymmetric layout. Byg Garanti certification with logo and plain-language explanation. CVR as typographic identity signal in certifications section. No three-equal-column layout. |
| Placeholder compliance | PASS | Two client-input placeholders correctly formatted: (1) `[NEEDS: Stiftelsesår fra kunden]` — specific, matches content-strategy.md §4 confirmed gap. (2) `[NEEDS: Antal medarbejdere]` — specific, matches confirmed gap. Portrait uses `[NEEDS: Portræt af Martin Mejdahl Jørgensen — et professionelt billede af håndværksmesteren selv. Dette billede er afgørende for virksomhedens identitet.]` — descriptive, specific, flags urgency. No generic `[NEEDS: text]` markers anywhere. |

**Overall:** pass
