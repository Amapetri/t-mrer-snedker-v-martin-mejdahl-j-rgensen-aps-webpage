# Image Requests

Authoritative manifest of every image the site needs. One row per image. Written by the `web-designer` during Step 6 page builds and reconciled by `/generate-media-prompts`.

**This file is the source of truth for image generation.** Code markers of the form `[NEEDS:image IMG-<id>]` are pointers — they reference a row here by ID but do NOT duplicate the prompt. A marker without a matching row is a pipeline error; `/generate-media-prompts` resolves this by drafting the missing row.

**How this file is used:**

1. The web-designer adds a row whenever a page section needs an image that isn't already in `public/images/IMAGE_CATALOG.md`.
2. The human picks the generator (Midjourney / DALL-E / Firefly / Reve / ...), pastes the **Prompt** + **Negative prompt**, generates the image, and installs it at the **Target slot** path.
3. On install, update **Status** to `installed` and fill **Installed path**.
4. The web-designer references the installed image through a standard `next/image` — no change to the marker in code (markers with status `installed` in the manifest are benign).
5. The `/generate-media-prompts` command verifies convergence: every `installed` row has a `next/image` reference in source; every `[NEEDS:image …]` marker has a manifest row.

**Row schema:** see [`.claude-plugin/skills/media-prompting/SKILL.md`](../../.claude-plugin/skills/media-prompting/SKILL.md) for the full schema, P-strategy → prompt language mapping, aspect conventions, and negative-prompt patterns. Every row must follow that schema exactly.

**Status lifecycle:** `pending` (row written, no asset yet) → `generated` (image exists locally but not installed into the repo) → `installed` (asset at target path, referenced by code) → `rejected` (retired; ID stays retired for archaeology, don't reuse).

**ID convention:** `IMG-<route-slug>-<section>-<nnn>`. Route slugs: `home`, `about`, `contact`, `services-<service>`, `cases-<case>`, `jobs`, `news`, `legal-privacy`, `legal-cookies`. Section labels are free-form but consistent within a route (`hero`, `team-portrait`, `process-step-1`, `testimonial-background`, …).

**Summary at Step 8:** the content-audit step includes an `IMAGE_REQUESTS.md` summary — counts by status, any rows with `Rights / privacy notes` flagged for client decision, any orphan markers reconciliation surfaced.

---

## Requests

These rows represent client-required photography. All images must be authentic — no stock, no AI-generated human figures. P3 Process Documentary: show work in progress, not posed results.

---

### IMG-om-os-portrait-001

- **ID:** IMG-om-os-portrait-001
- **Status:** pending
- **Page:** /om-os
- **Section:** portrait
- **Priority:** Critical — highest ROI asset on the site
- **Description:** Professional or clear photo of Martin Mejdahl Jørgensen. A portrait on a job site, in a workshop, or any authentic work context. This is the single most important trust asset for a named sole-trader business.
- **Target slot path:** `public/images/team/martin-mejdahl.jpg` (or .webp)
- **Dimensions:** Minimum 800×1000px (portrait orientation, 4:5 aspect). Will render at ~400px wide in 5fr column.
- **Rights / privacy note:** Martin's own photo — client must supply and confirm consent for web use.
- **Notes:** Site cannot fully function without this. About page portrait slot is first-class (sticky 5-col column on desktop). Placeholder is a styled bone/stone box with amber "NEEDS CONTENT" corner tag.

---

### IMG-services-total-renovering-hero-001

- **ID:** IMG-services-total-renovering-hero-001
- **Status:** pending
- **Page:** /ydelser/total-renovering
- **Section:** hero
- **Priority:** High
- **Description:** Photo of a total renovation project in progress — walls opened, structural work visible, or rooms in mid-construction state. Before/after is ideal. Must be an authentic project, not staged.
- **Target slot path:** `public/images/services/total-renovering-hero.jpg`
- **Dimensions:** Minimum 1200×800px (landscape). Will render at ~840px wide in 5fr column at 1440px viewport.
- **Rights / privacy note:** Client owns or must obtain permission for any client-site photography.
- **Notes:** 5/7 hero (placeholder left, text right). Any authentic renovation-in-progress photo from a real project will work.

---

### IMG-services-vinduer-hero-001

- **ID:** IMG-services-vinduer-hero-001
- **Status:** pending
- **Page:** /ydelser/vinduer-doere
- **Section:** hero
- **Priority:** High
- **Description:** Photo of window or door installation in progress — old frame being removed, new frame being fitted, or tools in use. Must show the work happening, not a finished installed window.
- **Target slot path:** `public/images/services/vinduer-doere-hero.jpg`
- **Dimensions:** Minimum 1200×800px (landscape).
- **Rights / privacy note:** Client owns or must obtain permission.
- **Notes:** 6/6 hero with vertical offset — image bottom-anchored in right column.

---

### IMG-services-isolering-hero-001

- **ID:** IMG-services-isolering-hero-001
- **Status:** pending
- **Page:** /ydelser/isolering-lofter
- **Section:** hero
- **Priority:** Medium
- **Description:** Photo of loft/roof insulation being installed — insulation boards being laid, timber structure visible with insulation between joists, work in progress. Must show the actual installation, not just a finished ceiling.
- **Target slot path:** `public/images/services/isolering-lofter-hero.jpg`
- **Dimensions:** Minimum 600×800px (portrait or landscape — will be cropped to 4-col narrow accent column).
- **Rights / privacy note:** Client owns or must obtain permission.
- **Notes:** 8/4 text-dominant hero — image is in the narrow 4-col accent column right.

---

### IMG-services-garager-hero-001

- **ID:** IMG-services-garager-hero-001
- **Status:** pending
- **Page:** /ydelser/garager-carporte
- **Section:** hero
- **Priority:** Medium
- **Description:** Photo of garage or carport construction in progress — timber frame going up, roof structure being built, or cladding being applied. Must show the construction phase, not a finished painted garage.
- **Target slot path:** `public/images/services/garager-carporte-hero.jpg`
- **Dimensions:** Minimum 1200×800px (landscape).
- **Rights / privacy note:** Client owns or must obtain permission.
- **Notes:** 7/5 hero on dark surface (`--color-surface-dark`). Image in 5fr right column.

---

### IMG-services-skure-hero-001

- **ID:** IMG-services-skure-hero-001
- **Status:** pending
- **Page:** /ydelser/skure
- **Section:** hero
- **Priority:** Low
- **Description:** Photo of a shed or outbuilding construction — frame structure, cladding being applied, or any authentic construction phase. Must not be a catalog/stock shed photo.
- **Target slot path:** `public/images/services/skure-hero.jpg`
- **Dimensions:** Minimum 600×800px (portrait — will render in narrow 4-col left column).
- **Rights / privacy note:** Client owns or must obtain permission.
- **Notes:** 4/8 hero — image narrow left column (4fr) with hairline right border, text wide right column (8fr).
