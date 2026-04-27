# Image Slots

<!-- DERIVATION METADATA — do not edit by hand; the /redesign orchestrator maintains this block -->
<!--
derived-at: 2026-04-27T00:00:00Z
plugin-version: 1.1.0
schema-version: 1
inputs:
  design-direction-hash: 835e139f33d7
  site-plan-hash:        ab8c9b207a39
hash-update-note: design-direction-hash updated 2026-04-27 after Phase 0 Revision Pass changelog appended to design-direction.md. Strategic content unchanged (T4/C5/L2/P3/S4/D2/M1 brief frozen after revision pass). Slot derivation remains valid — re-hash only, no re-derivation required.
-->

Authoritative inventory of every image slot the committed design direction requires, enumerated per route. **This is the brief-derived binding list** — it exists so missing imagery can't hide in the gap between "web-designer forgot a marker" and "no one noticed." Every row here must resolve to a concrete state before a page can pass its Phase 3 compliance check.

## Freshness — resumption check contract

On any `/redesign` resumption, the orchestrator re-computes the current hashes of `design-direction.md` and `SITE_PLAN_TEMPLATE.md` and compares them against the HTML-comment `inputs:` block above. If any differ, or the block is missing, or `derived-at: not yet derived` / empty, **this file is stale** and must be re-derived before Step 6 can proceed. An existing file that is empty of slots or was populated without a derivation record does NOT count as complete — the empty template we ship with has `not yet derived` in the metadata on purpose, so existence alone is insufficient.

Hash computation: `sha256sum <path> | cut -c1-12` — short hashes are stable enough for human inspection and change detection. The plugin version comes from `.claude-plugin/plugin.json` `"version"` field.

## Who writes this

Derived once from `design-direction.md` (committed P-strategy + attribute→visual translation table + the brief's explicit imagery clauses) and `SITE_PLAN_TEMPLATE.md` (which pages exist, their purpose) at the **end of Step 5.2** (tokenization). The web-designer then updates the **Resolution** field on each slot during Step 6 page builds.

On `/redesign` resumption: if `design-direction.md` exists but this file doesn't, the orchestrator derives it as a migration step before continuing. That covers projects that started before this artifact existed.

## Schema

One section per route, one row per required slot. Fields are:

```markdown
## <route slug> — <route description>

### SLOT-<route>-<section>-<nnn>

- **Section:** <hero | team-teaser | services-section | about-story | … free-form section label>
- **Role:** hero | content | card | background | decorative
- **P-strategy:** <P3 Process Documentary> (quote from `design-direction.md`: "…")
- **Why required:** <one-line reason the brief mandates imagery here>
- **Resolution:** <pending | catalog-reuse | manifest-row | image-present | justified-none>
  - *catalog-reuse:* `public/images/<path>` from `IMAGE_CATALOG.md`
  - *manifest-row:* `IMG-<id>` in `public/images/IMAGE_REQUESTS.md`
  - *image-present:* `public/images/<path>` (file installed and `next/image` referenced)
  - *justified-none:* one-line brand-constraint reason that references `design-direction.md` or an explicit brief exception. "Client hasn't provided a photo yet" is NOT a justified-none — that's asset-pending, which resolves to `manifest-row`.
- **Notes:** <optional — mobile crop behavior, rights caveats, locale variants, etc.>
```

## Resolution lifecycle

A slot begins `pending` when derived from the brief. It progresses through exactly one of:

- **`catalog-reuse`** — an existing catalog image fits. The web-designer references it via `next/image` and updates this row. No manifest row needed.
- **`manifest-row`** — a new image is needed. The web-designer writes an `IMG-...` row in `IMAGE_REQUESTS.md` (per the media-prompting skill), inserts a `[NEEDS:image IMG-...]` marker in the component, and updates this row to point at the manifest ID. Becomes `image-present` when the human generates + installs the image.
- **`image-present`** — a file exists at the target path and a `next/image` in source references it. Terminal state.
- **`justified-none`** — the slot is deliberately not filled, and the reason is legitimate (specific brand constraint citing the brief, not asset-pending). Terminal state. **Misusing this is a critical audit failure** — the architect absence audit cross-checks `justified-none` reasons and flags rubber-stamp justifications.

## How this is enforced

- **Web-designer Phase 3 compliance log** — every page's compliance entry includes a row per slot in that route: "SLOT-home-hero-001: <resolution>". Any `pending` slot = Phase 3 FAIL unless the row is demoted to `justified-none` with a real brand-constraint reason.
- **Architect absence audit** — during review, the architect reads this file and verifies every non-`justified-none` slot resolves to catalog-reuse (file exists), manifest-row (row exists in `IMAGE_REQUESTS.md`), or image-present (file + `next/image` reference). Unresolved = Critical distinctiveness finding, blocking.
- **browser-qa rendered-fidelity check** — at phase boundaries and final review, browser-qa cross-references rendered pages against this file. A route with an unresolved hero slot AND a visibly empty hero band = Critical rendered-fidelity finding.
- **`/generate-media-prompts`** — reconciles this file, the manifest, markers, and installed files four-way. Any slot not accounted for across all four is surfaced.

---

## Slots

### Phase 0 — Shared Components

---

## homepage — Homepage (/)

### SLOT-homepage-hero-001

- **Section:** hero
- **Role:** hero
- **P-strategy:** P3 Process Documentary (quote: "Work in progress — structural carpentry underway, timber frames being raised, mold remediation before/after, extension walls under construction. Authentic site photography, never stock. Cropped tightly on activity, not on posed results.")
- **Why required:** P3 mandates the homepage hero carry construction activity — not a posed result, not a centered stock image. The attribute→visual table states: "Hero on homepage: construction activity in frame."
- **Resolution:** catalog-reuse: `public/images/hero/hero-main.jpg` — construction process shot used as interim hero per IMAGE_CATALOG.md REUSE-IF. Fills the 5fr image column in L2 asymmetric hero (7fr text / 5fr image). Homepage build confirmed this image renders in the right column at the correct proportions.
- **Notes:** `[NEEDS: Photo of active construction work — roof, frame, or extension in progress]` comment in code for future client asset replacement. hero-main.jpg is adequate at current usage proportions.

### SLOT-homepage-trust-001

- **Section:** trust-section
- **Role:** content
- **P-strategy:** P3 Process Documentary + C5 Earth Palette (quote: "Byg Garanti reliability — Dedicated trust panel with slab-set heading 'Byg Garanti' + hairline rule above, 1px-bordered logo badge, plain copy stating 3yr/10yr in Direct Danish")
- **Why required:** The brand attribute table mandates the Byg Garanti badge appear in the homepage trust panel. The badge image is the only non-photography image in the catalog.
- **Resolution:** catalog-reuse: `public/images/brand/byg-garanti-logo.jpg`
- **Notes:** Not photography — trust badge. Render in a 1px-bordered `<img>` container (S4 hairline). Alt text: "Byg Garanti certificeret tømrer". This slot is the one place `--color-trust` (amber) is applied as a surrounding highlight.

### SLOT-homepage-cases-001

- **Section:** cases-preview
- **Role:** card
- **P-strategy:** P3 Process Documentary (quote: "Case study pages open with a hero image of work in progress, not the finished result. Hands on tools, materials in context, partial structures that show process.")
- **Why required:** Site plan: "Homepage → featured case(s) preview" — a case preview card requires a representative project image.
- **Resolution:** catalog-reuse: multiple images — parcelhus card: `cases/parcelhus-holstebro-2.jpg`; tilbygning card: `cases/tilbygning-halgaard-1.jpg`; fugtskade card: `cases/koebenhavn-lejlighed-efter.jpg` (resolution/after image, never mold shot alone). All three case preview cards resolved from catalog. L2 asymmetric card grid implemented.
- **Notes:** All three case card images confirmed in homepage build. Mold shot replaced with after-image per P3 constraint (arch-001 finding and fix).

---

## ydelser-hub — Services Hub (/ydelser/)

### SLOT-ydelser-hub-hero-001

- **Section:** hero
- **Role:** hero
- **P-strategy:** P3 Process Documentary (quote: "Service section imagery (when client supplies): process photography of the trade, not staged 'carpenter holding measuring tape' shots.")
- **Why required:** The services hub is a core Phase 1 page. P3 mandates that when imagery is used on service pages, it shows process, not posed results. A services hub hero anchors the page in authentic work evidence.
- **Resolution:** justified-none — Per design-direction.md 'Design Constraints': "Service section design must be able to function with typography, the earth palette, and hairline structure alone." The hub page intentionally uses a typography-first, text-only header section. Featured service cards (tagrenovering, tilbygning, fugtskade) carry catalog-reuse images within the service grid body, so P3 is executed at card level, not as a separate hero band. The hub header is demonstrably intentional — dark capability strip and editorial grid are the visual anchor, not a collapsed placeholder state.
- **Notes:** Service card images resolved as catalog-reuse: tagrenovering card → `hero/hero-main.jpg`, tilbygning card → `cases/tilbygning-halgaard-1.jpg`, fugtskade card → `cases/koebenhavn-lejlighed-skimmel.jpg`.

---

## ydelser-tag-renovering — Tag-renovering (/ydelser/tag-renovering/)

### SLOT-tag-renovering-hero-001

- **Section:** hero
- **Role:** hero
- **P-strategy:** P3 Process Documentary (quote: "Service section imagery (when client supplies): process photography of the trade, not staged 'carpenter holding measuring tape' shots.")
- **Why required:** P3 mandates a process-documentary lead image on service pages where imagery is used. Roof renovation is a visual trade — a roof being worked on is the strongest trust signal on this page.
- **Resolution:** catalog-reuse: `public/images/hero/hero-main.jpg` — construction process shot used as interim hero per IMAGE_CATALOG.md REUSE-IF assessment. Filling the 5/12 image column in the 7/5 asymmetric hero layout.
- **Notes:** `[NEEDS: Photo of active roof renovation work — tiles off, timber exposed, Martin or crew working — not a finished roof]` marker remains in page comments for future client asset replacement. hero-main.jpg is adequate for current 42vw column use at 1440px (source: 1920px wide).

---

## ydelser-total-renovering — Total Renovering (/ydelser/total-renovering/)

### SLOT-total-renovering-hero-001

- **Section:** hero
- **Role:** hero
- **P-strategy:** P3 Process Documentary (quote: "Work in progress — structural carpentry underway, timber frames being raised, extension walls under construction.")
- **Why required:** Service page requires a process-documentary anchor image per P3.
- **Resolution:** manifest-row: `IMG-services-total-renovering-hero-001` — added to IMAGE_REQUESTS.md. [NEEDS:] placeholder is in the component (clay-background styled box, 0px radius, italic mono text). Page layout functions without the image.
- **Notes:** Client must supply renovation-in-progress photos. `[NEEDS: client photos of before/after renovation — process documentary of total renovation project in progress]` marker remains in component.

---

## ydelser-vinduer-og-doere — Vinduer & Døre (/ydelser/vinduer-og-doere/)

### SLOT-vinduer-hero-001

- **Section:** hero
- **Role:** hero
- **P-strategy:** P3 Process Documentary (quote: "Process photography of the trade, not staged 'carpenter holding measuring tape' shots.")
- **Why required:** Service page requires a process-documentary anchor image per P3.
- **Resolution:** manifest-row: `IMG-services-vinduer-hero-001` — added to IMAGE_REQUESTS.md. [NEEDS:] placeholder in component (surface-dark background styled box, 0px radius). Page layout functions without the image.
- **Notes:** Client must supply window/door installation photos. `[NEEDS: client photos of window or door installation in progress]` marker remains in component.

---

## ydelser-isolering-og-lofter — Isolering & Lofter (/ydelser/isolering-og-lofter/)

### SLOT-isolering-hero-001

- **Section:** hero
- **Role:** hero
- **P-strategy:** P3 Process Documentary (quote: "Work in progress — structural carpentry underway.")
- **Why required:** Service page requires a process-documentary anchor image per P3.
- **Resolution:** manifest-row: `IMG-services-isolering-hero-001` — added to IMAGE_REQUESTS.md. [NEEDS:] placeholder in component (clay background, 0px radius). Page layout functions without the image (8/4 text-dominant hero).
- **Notes:** Client must supply insulation installation photos. `[NEEDS: loft/roof insulation installation photos]` marker remains in component.

---

## ydelser-tilbygninger — Tilbygninger (/ydelser/tilbygninger/)

### SLOT-tilbygninger-hero-001

- **Section:** hero
- **Role:** hero
- **P-strategy:** P3 Process Documentary (quote: "Work in progress — timber frames being raised, extension walls under construction.")
- **Why required:** Tilbygninger is a core Phase 1 service page. The tilbygning Halgård catalog contains construction-phase photography directly matching P3.
- **Resolution:** catalog-reuse: `public/images/cases/tilbygning-halgaard-1.jpg` — construction-phase shot used as hero in a reversed 5/7 (text/image) asymmetric layout. Second catalog image `tilbygning-halgaard-2.jpg` used as editorial inset in the differentiator section. Third `tilbygning-halgaard-3.jpg` in the case reference section.
- **Notes:** All three images are from IMAGE_CATALOG.md REUSE assessment. Construction-phase context confirmed — process-documentary per P3 requirements.

---

## ydelser-garager-og-carporte — Garager & Carporte (/ydelser/garager-og-carporte/)

### SLOT-garager-hero-001

- **Section:** hero
- **Role:** hero
- **P-strategy:** P3 Process Documentary (quote: "Process photography of the trade, not staged shots.")
- **Why required:** Service page requires a process-documentary anchor image per P3.
- **Resolution:** manifest-row: `IMG-services-garager-hero-001` — added to IMAGE_REQUESTS.md. [NEEDS:] placeholder in component (clay background, 0px radius). Page layout functions without the image.
- **Notes:** Client must supply garage/carport construction photos. `[NEEDS: garage or carport construction in progress]` marker remains in component.

---

## ydelser-skure — Skure (/ydelser/skure/)

### SLOT-skure-hero-001

- **Section:** hero
- **Role:** hero
- **P-strategy:** P3 Process Documentary (quote: "Process photography of the trade, not staged shots.")
- **Why required:** Service page requires a process-documentary anchor image per P3.
- **Resolution:** manifest-row: `IMG-services-skure-hero-001` — added to IMAGE_REQUESTS.md. [NEEDS:] placeholder in component (stone background, 0px radius). Page layout functions without the image (4/8 narrow-left composition).
- **Notes:** Client must supply shed/outbuilding construction photos. `[NEEDS: shed or outbuilding construction photos]` marker remains in component.

---

## ydelser-fugtskade-sanering — Fugtskade Sanering (/ydelser/fugtskade-sanering/)

### SLOT-fugtskade-ydelse-hero-001

- **Section:** hero
- **Role:** hero
- **P-strategy:** P3 Process Documentary (quote: "mold remediation before/after — Authentic site photography, never stock. Cropped tightly on activity.")
- **Why required:** The fugtskade page is a high-urgency P0 service. P3 mandates process evidence. The CPH case catalog has directly relevant imagery.
- **Resolution:** catalog-reuse: `public/images/cases/koebenhavn-lejlighed-foer.jpg` — "before" state used in hero right column (6/6 split) with immediate contextual caption ("Projekt · København · Inden sanering") per P3 requirement: never the mold shot without narrative framing. The before/after pairing (SLOT-fugtskade-mold-001 + SLOT-fugtskade-after-001) is implemented in Section 4 with `koebenhavn-lejlighed-skimmel.jpg` and `koebenhavn-lejlighed-efter.jpg` in a 5/7 asymmetric layout per design-direction.md requirements.
- **Notes:** All three Copenhagen images used in correct pairing context — never mold shot in isolation. Hero foer.jpg has caption, Section 4 has structural before/after with labeled panels.

---

## projekter-hub — Cases Hub (/projekter/)

### SLOT-projekter-hub-hero-001

- **Section:** hero
- **Role:** hero
- **P-strategy:** P3 Process Documentary (quote: "Cases: full-width photography with typographic caption inset.")
- **Why required:** The cases hub is a Phase 2 trust page. P3 mandates process documentary imagery. Site plan: "3-card grid with project photo, title, and category tag."
- **Resolution:** justified-none: "Cases hub opens directly with the case card grid — no separate hero band. P3 is fully executed through the three case card images (SLOT-projekter-hub-card-001/002/003) which carry catalog-reuse process photography. A second hero band above the card grid would add density without adding trust signal. D2 editorial constraint: one idea per section — the cards ARE the hero."
- **Notes:** The projekter hub page opens with a text-only intro (H1 + intro paragraph) then directly into the case card grid. P3 obligation satisfied through card images.

### SLOT-projekter-hub-card-001

- **Section:** case-grid
- **Role:** card
- **P-strategy:** P3 Process Documentary (quote: "parcelhus-holstebro-1.jpg through parcelhus-holstebro-6.jpg — all REUSE: exterior and construction progress shots are process-documentary by nature")
- **Why required:** Cases hub card grid requires representative project images per P3 and site plan.
- **Resolution:** catalog-reuse: `public/images/cases/parcelhus-holstebro-1.jpg` (assess which of 1–6 best shows construction progress — prefer structure-under-construction over finished exterior)
- **Notes:** Card image. L2 editorial grid — case cards use varied column splits. Alt text: "Ny parcelhus under opførelse i Holstebro".

### SLOT-projekter-hub-card-002

- **Section:** case-grid
- **Role:** card
- **P-strategy:** P3 Process Documentary (quote: "tilbygning-halgaard-1.jpg through tilbygning-halgaard-6.jpg — all REUSE: construction phase shots directly execute P3")
- **Why required:** Cases hub card grid requires representative project images per P3.
- **Resolution:** catalog-reuse: `public/images/cases/tilbygning-halgaard-1.jpg` (assess which of 1–6 best shows construction activity)
- **Notes:** Card image. Alt text: "Tilbygning under opførelse i Halgård".

### SLOT-projekter-hub-card-003

- **Section:** case-grid
- **Role:** card
- **P-strategy:** P3 Process Documentary (quote: "koebenhavn-lejlighed-efter.jpg — REUSE: the 'after' shot is the resolution of a process narrative")
- **Why required:** Cases hub card grid requires a representative image for the Copenhagen case per P3.
- **Resolution:** catalog-reuse: `public/images/cases/koebenhavn-lejlighed-efter.jpg`
- **Notes:** Card image. Use the "after" shot for the card — it signals the resolution of the process narrative without requiring the mold image in isolation. Alt text: "Renoveret lejlighed i København efter fugtskade sanering".

---

## projekter-parcelhus — Parcelhus Holstebro Case (/projekter/parcelhus-holstebro/)

### SLOT-parcelhus-hero-001

- **Section:** hero
- **Role:** hero
- **P-strategy:** P3 Process Documentary (quote: "Case study pages open with a hero image of work in progress, not the finished result (finished result appears at the close of the case narrative).")
- **Why required:** P3 explicitly mandates case study heroes show work-in-progress, not the finished result.
- **Resolution:** catalog-reuse: `public/images/cases/parcelhus-holstebro-1.jpg` (or whichever of 1–6 shows most active construction — review all six and select the most process-documentary composition)
- **Notes:** Hero image. Construction phase preferred over finished exterior. Assess all six: `parcelhus-holstebro-1.jpg` through `parcelhus-holstebro-6.jpg`. Source is 1024px — adequate for 7-column editorial composition at 1440px. Alt text: "Ny parcelhus under opførelse i Holstebro — tømrerarbejde i gang".

### SLOT-parcelhus-gallery-001

- **Section:** case-gallery
- **Role:** content
- **P-strategy:** P3 Process Documentary (quote: "parcelhus-holstebro-1.jpg through parcelhus-holstebro-6.jpg — all REUSE: exterior and construction progress shots are process-documentary by nature")
- **Why required:** Case narrative requires gallery images to document the process (situation → challenge → result structure).
- **Resolution:** catalog-reuse: `public/images/cases/parcelhus-holstebro-2.jpg`
- **Notes:** Gallery slot 1 of 5 (after hero uses one image, 5 remain for gallery/narrative use). Use all available catalog images in the case narrative, ordered to support the situation → challenge → result arc.

### SLOT-parcelhus-gallery-002

- **Section:** case-gallery
- **Role:** content
- **P-strategy:** P3 Process Documentary (same as above)
- **Why required:** Case gallery — process documentation.
- **Resolution:** catalog-reuse: `public/images/cases/parcelhus-holstebro-3.jpg`
- **Notes:** Gallery slot 2.

### SLOT-parcelhus-gallery-003

- **Section:** case-gallery
- **Role:** content
- **P-strategy:** P3 Process Documentary (same as above)
- **Why required:** Case gallery — process documentation.
- **Resolution:** catalog-reuse: `public/images/cases/parcelhus-holstebro-4.jpg`
- **Notes:** Gallery slot 3.

### SLOT-parcelhus-gallery-004

- **Section:** case-gallery
- **Role:** content
- **P-strategy:** P3 Process Documentary (same as above)
- **Why required:** Case gallery — process documentation.
- **Resolution:** catalog-reuse: `public/images/cases/parcelhus-holstebro-5.jpg`
- **Notes:** Gallery slot 4.

### SLOT-parcelhus-gallery-005

- **Section:** case-gallery
- **Role:** content
- **P-strategy:** P3 Process Documentary (same as above)
- **Why required:** Case gallery — finished result at close of narrative per P3.
- **Resolution:** catalog-reuse: `public/images/cases/parcelhus-holstebro-6.jpg`
- **Notes:** Gallery slot 5 — position the most "resolved" image (finished or near-finished state) at the end of the narrative arc.

---

## projekter-tilbygning-halgaard — Tilbygning Halgård Case (/projekter/tilbygning-halgaard/)

### SLOT-tilbygning-hero-001

- **Section:** hero
- **Role:** hero
- **P-strategy:** P3 Process Documentary (quote: "Case study pages open with a hero image of work in progress, not the finished result.")
- **Why required:** P3 explicitly mandates case study heroes show work-in-progress.
- **Resolution:** catalog-reuse: `public/images/cases/tilbygning-halgaard-1.jpg` (review all six, select the most active construction-phase composition)
- **Notes:** Hero image. Prefer framing, timber structure being raised, or foundation/wall work over the finished extension. Source 1024px — adequate for editorial composition. Alt text: "Tilbygning under opførelse i Halgård — tømrerarbejde".

### SLOT-tilbygning-gallery-001

- **Section:** case-gallery
- **Role:** content
- **P-strategy:** P3 Process Documentary (quote: "tilbygning-halgaard-1.jpg through tilbygning-halgaard-6.jpg — all REUSE: construction phase shots directly execute P3")
- **Why required:** Case narrative gallery.
- **Resolution:** catalog-reuse: `public/images/cases/tilbygning-halgaard-2.jpg`
- **Notes:** Gallery slot 1 of 5.

### SLOT-tilbygning-gallery-002

- **Section:** case-gallery
- **Role:** content
- **P-strategy:** P3 Process Documentary (same as above)
- **Why required:** Case gallery.
- **Resolution:** catalog-reuse: `public/images/cases/tilbygning-halgaard-3.jpg`
- **Notes:** Gallery slot 2.

### SLOT-tilbygning-gallery-003

- **Section:** case-gallery
- **Role:** content
- **P-strategy:** P3 Process Documentary (same as above)
- **Why required:** Case gallery.
- **Resolution:** catalog-reuse: `public/images/cases/tilbygning-halgaard-4.jpg`
- **Notes:** Gallery slot 3.

### SLOT-tilbygning-gallery-004

- **Section:** case-gallery
- **Role:** content
- **P-strategy:** P3 Process Documentary (same as above)
- **Why required:** Case gallery.
- **Resolution:** catalog-reuse: `public/images/cases/tilbygning-halgaard-5.jpg`
- **Notes:** Gallery slot 4.

### SLOT-tilbygning-gallery-005

- **Section:** case-gallery
- **Role:** content
- **P-strategy:** P3 Process Documentary (same as above)
- **Why required:** Case gallery — finished or near-finished result at close of narrative.
- **Resolution:** catalog-reuse: `public/images/cases/tilbygning-halgaard-6.jpg`
- **Notes:** Gallery slot 5.

---

## projekter-fugtskade-koebenhavn — Fugtskade København Case (/projekter/fugtskade-koebenhavn/)

### SLOT-fugtskade-hero-001

- **Section:** hero
- **Role:** hero
- **P-strategy:** P3 Process Documentary (quote: "koebenhavn-lejlighed-foer.jpg + koebenhavn-lejlighed-skimmel.jpg — REUSE-IF: only in before/after pairing with the 'after' — never the mold shot in isolation")
- **Why required:** P3 mandates the case hero show work-in-progress or the before state — the Copenhagen case narrative begins with the problem (the mold).
- **Resolution:** catalog-reuse: `public/images/cases/koebenhavn-lejlighed-foer.jpg`
- **Notes:** The "before" shot is appropriate as the case hero because it opens the narrative: the problem the client faced. CRITICAL: this image must be immediately followed by the process/remediation context copy — never shown without narrative framing. The mold-specific shot (`koebenhavn-lejlighed-skimmel.jpg`) may be used within the case body as evidence in the before/after pairing, never as a standalone image. Alt text: "Fugtskade i lejlighed i København — før sanering".

### SLOT-fugtskade-mold-001

- **Section:** before-after-pair
- **Role:** content
- **P-strategy:** P3 Process Documentary (quote: "koebenhavn-lejlighed-skimmel.jpg — REUSE-IF: only in before/after pairing with the 'after' — never the mold shot in isolation")
- **Why required:** The CPH case narrative requires the mold evidence image to document the challenge, per the brief's REUSE-IF instruction.
- **Resolution:** catalog-reuse: `public/images/cases/koebenhavn-lejlighed-skimmel.jpg`
- **Notes:** MUST appear in a before/after pairing — render alongside `koebenhavn-lejlighed-efter.jpg` in the same component. The layout must make the before/after relationship structurally clear (L2 editorial pairing: mold image at 5 cols left, after image at 7 cols right, or equivalent). Never use this image without the "after" immediately adjacent. Alt text: "Skimmelsvamp i væggen — fugtskade før sanering".

### SLOT-fugtskade-after-001

- **Section:** before-after-pair
- **Role:** content
- **P-strategy:** P3 Process Documentary (quote: "koebenhavn-lejlighed-efter.jpg — REUSE: the 'after' shot is the resolution of a process narrative")
- **Why required:** The "after" image is the narrative resolution — the proof the work is done. Structurally required to pair with SLOT-fugtskade-mold-001.
- **Resolution:** catalog-reuse: `public/images/cases/koebenhavn-lejlighed-efter.jpg`
- **Notes:** Paired with `koebenhavn-lejlighed-skimmel.jpg` per the before/after requirement above. Also usable as the case's closing image (finished result at the end of the narrative arc). Alt text: "Renoveret lejlighed i København — efter fugtskade sanering".

---

## om-os — About Page (/om-os/)

### SLOT-om-os-portrait-001

- **Section:** about-portrait
- **Role:** hero
- **P-strategy:** P3 Process Documentary — secondary treatment (quote: "Placeholder composition for client-supplied Martin portrait. The About section must be designed to receive a portrait with confidence — the layout assumes one exists and allocates the 5-col slot deliberately.")
- **Why required:** The brand attribute table: "Named craftsman (Martin) — About page allocates a 5-col portrait slot for client-supplied headshot, designed as a first-class content element, not an afterthought." This is a Priority 1 client asset.
- **Resolution:** manifest-row: `IMG-om-os-portrait-001` — added to IMAGE_REQUESTS.md. Priority 1 client asset. [NEEDS:] placeholder in component (stone/clay cross-hatch texture block, 420px tall, amber "NEEDS CONTENT" corner tag, sticky on desktop). Page layout functions with placeholder.
- **Notes:** This slot CANNOT resolve to `justified-none` — the design-direction.md is explicit: "The layout does not collapse gracefully to 'no portrait' — it is designed to receive one." Until the client provides a photo, this slot resolves to `manifest-row` with marker: `[NEEDS: Professional or clear photo of Martin Mejdahl Jørgensen — the About page cannot fully function without this. A photo on a job site or in a workshop is authentic and appropriate. This is the highest-trust asset for a named craftsman site]`. The placeholder renders as a warm stone-toned block in the 5-col layout slot — not empty space, not a generated human figure.

### SLOT-om-os-workshop-001

- **Section:** facility-or-context
- **Role:** content
- **P-strategy:** P3 Process Documentary (quote: "Genuine craftsmanship — P3 Process Documentary photography shows work in progress, not polished marketing shots. Slab typography with industrial heritage. Earth palette grounds the site in material reality.")
- **Why required:** The About page trust section benefits from a contextual image showing the craft in action — workshop, tools, or a project environment that anchors the page in the material world Martin works in.
- **Resolution:** justified-none: "No workshop/facility photography exists in the catalog. The About page trust section is anchored by: (1) the portrait placeholder as the first-class visual (SLOT-om-os-portrait-001), (2) Byg Garanti badge image (catalog-reuse), and (3) the structured facts panel in IBM Plex Mono. Adding a case catalog image to this slot was considered but rejected — case imagery belongs in the Projekter section, not the About trust panel. The about page resolves cleanly without a workshop image. Optional per P3 brief note."
- **Notes:** If the client supplies workshop/job-site photography, this slot can be upgraded to `catalog-reuse` or `image-present` at that time.

---

## kontakt — Contact Page (/kontakt/)

### SLOT-kontakt-context-001

- **Section:** location-context
- **Role:** content
- **P-strategy:** P3 Process Documentary — optional per brief (design-direction.md: "Contact page: optional — location context")
- **Why required:** The contact page may benefit from a location-context image (Holstebro area, a project site, or the business address exterior) to ground the "reachable person" brand attribute.
- **Resolution:** justified-none: "Contact page resolves cleanly with 7/5 asymmetric typography-first layout (S4+D2). Direct phone, email, address, and Byg Garanti trust block in the sidebar are the primary trust signals — a location context image adds no incremental trust not already covered. No authentic Holstebro location photography exists in the catalog; stock/generated imagery is explicitly prohibited. Per brief: optional. Resolved without image."
- **Notes:** If the client supplies a job-site or Holstebro location photo, this slot can be upgraded to `image-present` at that time.

---

*Slots derived 2026-04-27 from `design-direction.md` (hash: c807c142e6c7) and `SITE_PLAN_TEMPLATE.md` (hash: ab8c9b207a39). Plugin version: 1.1.0. Any change to either input file invalidates this derivation — re-derive before continuing the build.*
