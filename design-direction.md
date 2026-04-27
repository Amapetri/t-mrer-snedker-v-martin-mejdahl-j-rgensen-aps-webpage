# Design Direction — Tømrer & Snedker v/ Martin Mejdahl Jørgensen ApS

**Prepared:** 2026-04-27
**Brand assessment:** MODERATE
**Selected strategies:** T4 / C5 / L2 / P3 / S4 / D2 / M1

---

## The direction in one sentence

Archival trade confidence expressed through warm material surfaces, editorial asymmetry, and slab-set type — the visual language of a craftsman whose name is on the company, not a contractor whose logo is on a van.

---

## Brand-story rationale

Martin Mejdahl Jørgensen's company carries his full name — that is a structural fact about accountability that must be visible in every design decision. A craftsman who puts his personal name on a business operates in a different register from a faceless SME. The direction must feel like something a skilled individual built: material-honest, not software-smooth. It must communicate trustworthiness through restraint and craft-signal typography, not through reassuring blue gradients.

The Byg Garanti certification and Dansk Byggeri membership are the two hardest trust differentiators — they are not marketing claims, they are verifiable third-party endorsements. The visual direction honours that by refusing to oversell: warm, grounded, confident — not loud or self-congratulatory. The old site was thin precisely because it used a WordPress theme that communicated nothing specific about Martin. This direction commits to specificity: archival slab type (industrial trade heritage), earth palette with a sharp accent (material honesty), and editorial asymmetry (the pace of someone who takes quality seriously, not someone optimising for clicks).

The dual tømrer + snedker capability — structural carpentry AND finish joinery — suggests complementary disciplines that together form a whole. The two-register visual approach (heavy slab display, quiet body) executes this duality: two voices, one coherent thing.

---

## Selections

### T4 — Archival Slab

- **Display font candidates:** Zilla Slab Bold, Bitter Bold, Roboto Slab Bold
- **Body font candidates:** IBM Plex Sans, Source Sans 3, DM Sans
- **Weight usage:** Display at Bold for headlines; body at Regular for long form, Medium for subheadings and labels; avoid decorative variation
- **Rationale:** Slab serifs carry industrial heritage — the mechanical era of Danish trade guilds and craftsman signage — which grounds the site in a register of earned expertise rather than polished marketing, directly executing the "named craftsman" brand attribute.
- **How it executes:** Section headlines in slab at 64–80px. Service page H1s in slab at 56–64px. CVR, Byg Garanti certification labels, and trust signals in slab Medium as structural type. Body copy entirely in the sans pair. No mixing of slab and italic flourishes — the slab is structural, not decorative.

### C5 — Earth Palette + Sharp Accent

- **Neutral character:** Stone, clay, and bone as the primary neutral field — off-white backgrounds, warm gray mid-tones, a near-black that reads as aged ink rather than pure digital black. Nothing pure white or pure #000000.
- **Accent direction:** One sharp accent — electric cobalt blue or saturated amber/orange — used exclusively for CTAs, active link states, and the Byg Garanti trust signal highlight. Not decorative. The accent earns its use by appearing only where a decision or proof point is being made.
- **Palette families:** Stone (warm off-white → warm light gray), clay (warm mid-gray → dark warm gray), near-black ink, accent in the amber-to-cobalt range (Step 5.2 decides which based on how it reads against the stone/clay field)
- **Rationale:** Danish residential construction is a world of timber, concrete, and raw material — the earth palette grounds the site in the same material world that Martin works in, while the sharp accent gives a single decisive signal to critical trust elements and conversion moments.
- **How it executes:** Stone/bone backgrounds on body sections. Clay mid-tone as card and section separator. Near-black ink for type. Accent appears only on: primary CTA buttons, Byg Garanti trust badge highlight, and hover states on navigation links.

### L2 — Editorial Asymmetry

- **Grid:** 12-column, 1440px max container, but columns used asymmetrically — hero text at 7 columns with imagery bleeding to edge; case study details at 5-col text / 7-col image; About at 6/6 but vertically offset; no section follows the same column split as the last.
- **Rhythm:** Pull quotes and certification labels as typographic sidebar elements. Case study narrative captions running at a smaller scale alongside large images. Generous vertical spacing between sections (120–200px) but not luxurious — the pacing is editorial, not architectural.
- **Navigation:** Clean horizontal nav; no mega-menus; links in slab Medium at small scale. Mobile: clean vertical collapse, no hamburger icon animation.
- **Rationale:** A craftsman who produces considered work communicates through considered pacing — editorial asymmetry rejects the uniform three-column-card template that the old site's WordPress theme implied, replacing it with a layout that has the rhythm of a published trade portfolio, not a service directory.
- **How it executes:** Homepage hero: slab headline at 7 cols left, hero image bleeding right edge. Services: alternating text-left / image-right and text-right / image-left composition. Cases: full-width photography with typographic caption inset. About: portrait format placeholder (client to supply) at 5 cols, copy at 7 cols — offset vertically by 40px to break symmetry. Contact: three-column on desktop, trust signals as typographic sidebar.

### P3 — Process Documentary

- **Primary treatment:** Work in progress — structural carpentry underway, timber frames being raised, mold remediation before/after, extension walls under construction. Authentic site photography, never stock. Cropped tightly on activity, not on posed results. Hands on tools, materials in context, partial structures that show process.
- **Secondary (on About page):** Placeholder composition for client-supplied Martin portrait. The About section must be designed to receive a portrait with confidence — the layout assumes one exists and allocates the 5-col slot deliberately. Until the photo arrives, the slot uses a warm stone-toned placeholder with a `[NEEDS: Photo of Martin — this is the highest-trust asset for a named craftsman site]` marker. No AI-generated practitioner figure.
- **Which IMAGE_CATALOG.md images fit this direction:**
  - `cases/parcelhus-holstebro-1.jpg` through `parcelhus-holstebro-6.jpg` — all REUSE: exterior and construction progress shots are process-documentary by nature
  - `cases/tilbygning-halgaard-1.jpg` through `tilbygning-halgaard-6.jpg` — all REUSE: construction phase shots directly execute P3
  - `cases/koebenhavn-lejlighed-efter.jpg` — REUSE: the "after" shot is the resolution of a process narrative
  - `cases/koebenhavn-lejlighed-foer.jpg` + `koebenhavn-lejlighed-skimmel.jpg` — REUSE-IF: only in before/after pairing with the "after" — never the mold shot in isolation
  - `hero/hero-main.jpg` — REUSE-IF: usable as interim hero, assess composition in context; replace with stronger process shot if client supplies one
  - `brand/byg-garanti-logo.jpg` — REUSE: trust badge, not photography
- **Which don't fit:**
  - No images to exclude from catalog on photography grounds — all existing images are authentic project shots, none are stock
  - The `brand/favicon.ico` is a logo asset, not imagery — replace-track independently of photography direction
- **Rationale:** Homeowners evaluating a contractor for a significant investment are converted by evidence of actual work, not by polished results photography — P3 Process Documentary builds the "I can see they know what they're doing" confidence that the Byg Garanti brand attribute claims in copy.
- **How it executes:** Case study pages open with a hero image of work in progress, not the finished result (finished result appears at the close of the case narrative). Hero on homepage: construction activity in frame. Service section imagery (when client supplies): process photography of the trade, not staged "carpenter holding measuring tape" shots.

### S4 — Architectural Line

- **Border radius:** 0px across all components — buttons, cards, input fields, image frames, trust badges.
- **Border weight:** 1px hairlines as the primary structural language. Section dividers are hairlines. Cards are defined by hairlines, not shadows or fill. The Byg Garanti badge has a hairline rule above it as a typographic separator, not a decorative box.
- **Structural logic:** Borders draw structure, they don't close shapes. A horizontal 1px rule above a section heading defines the section; the rule doesn't form a box around it. Input fields: underline only, no surrounding box.
- **Rationale:** Architectural line form-language signals the precision discipline of someone who works to documented tolerances — a tømrer must measure, mark, and cut to line, and the UI executes that discipline directly. Zero-radius elements also reject the consumer-SaaS softness that would be tonally wrong for a structural trade service.
- **How it executes:** Button style: 0px radius, solid accent-color fill for primary CTAs, or hairline-bordered with ink color for secondary. Navigation: 1px hairline bottom rule on the nav bar on scroll. Section breaks: 1px hairline at the column margin, not full-width — a structural marker, not a divider wall. Form inputs: bottom-border only.

### D2 — Editorial

- **Hero type:** 64–80px slab display on desktop, 44–56px on mobile
- **Section spacing:** 120–160px vertical between major sections. Sub-sections within a section: 48–72px.
- **Content density:** Medium. Each section carries one primary idea but is allowed to develop that idea through text and evidence before the next section begins. Not luxuriously empty, not information-dense. The pacing of a professional portfolio, not a landing page.
- **Rationale:** The Danish homeowner audience researches carefully before calling — they are not converting on a quick scroll. Editorial density gives the right amount of space for trust signals (Byg Garanti, Dansk Byggeri, CVR, real photography) to land with weight, while keeping the homepage concise enough to not require a scroll marathon.
- **How it executes:** Homepage hero: one slab headline + one subheadline + one CTA, with no supporting body copy in the hero section. Trust panel: three signals (Byg Garanti, Dansk Byggeri, CVR) with brief explanation copy — not just logos. Services: 3–4 services visible on first load with scroll for the rest. No auto-playing content, no scroll-triggered counter animations.

### M1 — Architectural Stillness

- **Transitions:** 150–200ms ease-out on all state changes. Hover feedback on links and buttons. Focus rings always visible, always using the accent color.
- **Scroll:** No parallax. No scroll-linked animation. If a single section-entry fade is applied, it is opacity-only and only on the first viewport — not applied uniformly to every section (which reads amateurish).
- **Page transitions:** Instant or minimal fade (150ms). Not animated navigation transitions.
- **Rationale:** A craftsman who takes structural integrity seriously does not create decorative movement — the site's behaviour should match the brand's character: considered, unhurried, without performance. Stillness communicates confidence; gratuitous animation communicates insecurity.
- **How it executes:** Buttons: solid color transition on hover, 150ms ease-out, no scale, no shadow. Navigation: color change on hover, no slide-in or scale. Images: no hover zoom. Mobile menu: instant show/hide or minimal 150ms fade — no slide animation. `prefers-reduced-motion` always respected — all transitions degrade to instant.

---

## Attribute → Visual Translation Table

| Brand Attribute | Visual Decision | Where It Appears |
|-----------------|-----------------|------------------|
| Byg Garanti reliability | Dedicated trust panel with slab-set heading "Byg Garanti" + hairline rule above, 1px-bordered logo badge, plain copy stating 3yr/10yr in Direct Danish — no soft reassurance language; the sharp accent highlights the certification signal specifically | Homepage trust panel, service pages (footer of each), About page certification section |
| Named craftsman (Martin) | Company name in slab logotype with CVR stated beneath in body sans as a secondary logotype element. About page allocates a 5-col portrait slot for client-supplied headshot, designed as a first-class content element, not an afterthought. Until headshot arrives: stone-toned placeholder with `[NEEDS: Martin headshot]` marker at full slot scale | Header logotype, About page hero, About page trust section |
| Dual tømrer + snedker | Two-register typography executes the duality: slab for structural (tømrer-type) precision, sans for the finish/detail (snedker-type) — one medium, one voice. Service page navigation distinguishes structural services from finish services visually, using a hairline divider between the two groups | Services hub, Services page category labels, Homepage service tiles |
| Works nationwide | Copenhagen case study positioned prominently alongside the Holstebro cases — geographic breadth shown through real evidence, not a claim. "Fra Holstebro til København" appears in body copy near the cases section, grounded in the documented CPH mold project | Cases page case grouping, Homepage case preview, Footer location copy |
| Danish homeowner audience | Editorial density leaves room for trust signals to develop. Copy is direct Danish (no marketing-English translated phrases). The earth palette reads familiar, not foreign — warm stone and clay are the materials of Danish residential construction. No conversion-pressure patterns (no countdown timers, no pop-ups, no urgency language) | All pages — density, palette, and copy tone are systemic |
| Trustworthiness (verification signals) | CVR number appears in footer and contact page as a typographic element — not buried in small print, but set in slab Medium as a "verifiable business identity" signal. Byg Garanti and Dansk Byggeri given hairline-framed panels with plain-language explanation, not just logo treatment | Footer (every page), Contact page, About page |
| Genuine craftsmanship | P3 Process Documentary photography shows work in progress, not polished marketing shots. Slab typography with industrial heritage. Earth palette grounds the site in material reality. S4 Architectural Line (zero radius, hairlines) requires precision — the UI itself is built to a visible discipline | All pages that carry imagery, UI components systemic |
| Accessibility (reachable person) | Primary CTA is always phone or email — a direct contact action, not a "learn more" carousel. Contact page opens with direct contact details before the form. Martin named in the company logotype — not "Our team" | Header nav CTA, Contact page, Footer |
| Versatility (full lifecycle) | Services architecture shows breadth without visual noise: structural services and finish services each have their own editorial grouping. Process documentary images show breadth of project type — new build, extension, remediation — visually anchoring the capability claim | Services hub page, Cases page |
| Reliability (nationwide delivery) | No decorative flourishes or brand-marketing tone — the site's restrained confidence communicates a firm that delivers rather than promises. Case studies structured as: situation → challenge → result, with authentic photography at each stage | Cases page narrative structure |

---

## What we're moving away from

The old site was a WordPress "TopShop by Kaira" template with no visual identity beyond the generic theme. Based on the HTML structure analysis documented in `public/images/IMAGE_CATALOG.md`:

1. **Full-width slider hero with a single hero image at 1920×555px, text overlay on image, centered CTA button** — New site replaces this with an asymmetric editorial composition: slab headline on left columns, photography controlled and cropped, no centered-button-in-hero layout. The hero is composed, not decorated.

2. **Services listed as text bullets on the homepage with no images, no hierarchy, no proof** — New site gives each service category a proper editorial section with at minimum a short narrative and a link to the service page. Services are not a bullet list — they are evidence of capability.

3. **Three-page total navigation (Forside / Referencer / Kontakt)** — new site expands to a structured navigation that gives Services, Cases, About, and Contact their own sections, reflecting the actual scope of what the business does. The old navigation was the navigation of a site that didn't want to tell its story.

4. **No About page, no story, no person visible** — one of the highest-trust failures for a named-person business. New site commits the About page as a first-class section where Martin's name, background, and the certification story are front and center. The absence of a headshot is flagged and handled as a design constraint, not ignored.

5. **Cases page as a photo gallery with no narrative** — just rows of project photos and a short label. New site frames each case as a narrative: situation, challenge, result. Process photos sit within a story, not a grid. Each case ends with a CTA that connects to the relevant service.

6. **Contact page with plain text only — no map, no form, no visual structure** — New site gives contact a proper editorial layout: direct contact details at prominence, a structured enquiry form, map embed, and the CVR/Byg Garanti trust anchors as typographic sidebar elements.

7. **Generic WordPress theme grid — three-column equal-width feature layout used everywhere** — explicit rejection. New site uses editorial asymmetry throughout — no section uses the same column split as the previous section. The layout communicates that someone made composition decisions, not that a theme did.

---

## Avoid List

The visual vocabulary's binding list applies in full. These additions are specific to this direction:

1. **No soft pill buttons or rounded input fields** — S4 Architectural Line is binding. 0px radius everywhere. If a UI element has a border, it is a hairline (1px). No rounding, ever.
2. **No photography of people we do not have real photos of** — No AI-generated figures in a practitioner or team-member context. Martin's portrait slot is reserved for client-supplied photography; the placeholder is typographic, not a generated human face. This is not a stylistic choice — it is an honesty constraint.
3. **No generic hero** — No centered headline + centered subheadline + centered button in the hero section. The hero is always an asymmetric editorial composition with an image occupying at minimum one side. Centered symmetric heroes read as template output, which is exactly what the old site was.
4. **No three-equal-column feature cards** — The L2 editorial asymmetry selection explicitly rejects uniform grids. Services, cases, and trust signals are all composed with varied column splits. A three-equal-card layout anywhere on the site violates the direction.
5. **No gradient anywhere** — Not on backgrounds, not on buttons, not on overlays. Gradients signal a web template aesthetic that is precisely what this direction rejects. If a background needs to transition, it transitions via color (stone → clay) through section spacing, not through CSS gradients.
6. **No large emoji in headings or section labels** — The binding list applies. Additionally: this brand's register is trade-professional. Emoji are categorically off-brand.
7. **No "scroll to count up" animation on statistics** — If founding year, project count, or any numerical claim is used, it is set typographically as a static fact. Animated stat counters signal a low-trust SaaS template, not a master craftsman.
8. **No drop shadows on cards or sections** — S4 defines surface separation through hairlines, not elevation. Drop shadows read as a consumer-web pattern. Removed entirely.
9. **No lorem ipsum at any stage** — Per CLAUDE.md convention. Every placeholder must use the `[NEEDS: ...]` format with a specific description. "Lorem ipsum" is a content gap signal, and content gaps must be named so the client can address them.
10. **No pure #000000 or #FFFFFF anywhere** — C5 Earth Palette commits to warm neutrals. Pure black and pure white are design defaults, not chosen colors. The near-black must read as aged ink, the off-white as bone or stone.
11. **No homepage with hero → features → testimonials → CTA — the default SaaS landing page structure** — The audience is a Danish homeowner evaluating a contractor, not a B2B SaaS buyer. The page structure must reflect the trust-building journey: hero identity claim → proof section (cases/photography) → service breadth → certification trust panel → direct contact. Not SaaS funnel shape.
12. **No stock photography — ever** — The old site had no imagery on most pages. The new site uses only: authentic case photography (existing 15 images), client-supplied photography when received, and AI-generated process imagery that is clearly stylized as craft-in-action (never stock-style). P9 Stock Photography is an anti-pattern and never selected.

---

## Design Constraints (client gaps to acknowledge)

These are real constraints that affect design decisions and must be tracked as blockers, not simply noted:

- **No logo file exists** — The favicon is 80×80px, unusable at any meaningful scale. The site will launch with a slab-typeset wordmark using the selected T4 display font as the identity logotype. This is a deliberate design decision, not a shortcoming: a named craftsman's name set in trade-appropriate slab type is a legitimate logotype. The wordmark must be designed to be replaced by a vector logo if the client provides one. Flag to client: "Favicon is the only logo file found — please provide SVG or high-resolution PNG of any logo artwork."

- **No Martin/team photography** — The About page is the highest-trust page for a named-person business. A headshot of Martin is the single highest-value missing asset. The design allocates the 5-column portrait slot on About as a first-class element with a stone-toned `[NEEDS: Professional or clear photo of Martin Mejdahl Jørgensen — the About page cannot fully function without this]` placeholder. The layout does not collapse gracefully to "no portrait" — it is designed to receive one. Flag as Priority 1 client action.

- **Case photography is authentic but 2015-era at 1024px wide** — Adequate for card, gallery, and editorial inset use at current web resolutions with `next/image` optimization. Not suitable for full-bleed hero use at 1440px+ screens. Editorial composition (L2) naturally avoids full-bleed single images in favor of cropped/framed placements — this constraint aligns with the layout direction. No artificial upscaling. If a photo is used at full column width (7/12 columns at 1440px = ~840px), 1024px source is adequate.

- **No service photography** — Services is a text-only section on the old site. The new site's service pages cannot depend on photography until the client supplies it. Service section design must be able to function with typography, the earth palette, and hairline structure alone — and look intentional doing so, not like a placeholder state. `[NEEDS: One representative process photo per service category]` is marked on each service page but the layout works without it.

---

## One-line identity test

"Does this site look like it was produced by a craftsman who measures twice and cuts once — or does it look like a marketing agency that made a template for contractors?"

If yes to the first half: on-brief. If it looks like a template, a SaaS landing page, or any construction company rather than this specific named individual: rework.

---

## Changelog

### 2026-04-27 — Phase 0 Revision Pass
All 7 strategies (T4/C5/L2/P3/S4/D2/M1) survived contact with real UI. No swaps required. Brief is frozen after this pass. Observations: T4 Archival Slab reads clearly at nav scale with the two-line logotype format. M1 stillness is appropriate for dropdown behaviour. S4 0px radius on CTA button and dropdown is confirmed and consistent.
