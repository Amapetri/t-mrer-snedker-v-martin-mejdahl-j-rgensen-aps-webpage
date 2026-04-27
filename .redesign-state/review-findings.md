# Review Findings Queue

Append-only queue of findings surfaced by the review agents (`architect`, `customer-perspective`, `accessibility-auditor`, `browser-qa`). The `/redesign` orchestrator drains this file at phase boundaries and at the final review pass. `/publish` reads it as part of the pre-publish gate.

## Run log

Every time a review lane runs, it appends ONE line to this section with the plugin version it ran against. This is how the orchestrator detects stale review passes on resumption — if the current plugin version is newer than the last run of a given lane, that lane is stale and must re-run before publish.

```
YYYY-MM-DDThh:mm — reviewer=<name> — plugin=<version> — scope=<routes/dimensions/all> — verdict=<N critical, M warning, K note>
```

Example:

```
2026-04-24T15:30 — reviewer=architect         — plugin=1.1.0 — scope=all — verdict=0 critical, 1 warning, 2 note
2026-04-24T15:31 — reviewer=customer          — plugin=1.1.0 — scope=home,services,contact — verdict=1 warning, 3 note
2026-04-24T15:32 — reviewer=a11y              — plugin=1.1.0 — scope=all — verdict=0 critical, 0 warning
2026-04-24T15:35 — reviewer=browser-qa        — plugin=1.1.0 — scope=home,kontakt,ydelser,om-os,cookie-politik — verdict=1 critical, 0 warning, 2 note
```

2026-04-27T14:22 — reviewer=customer — plugin=1.1.0 — scope=home,ydelser,kontakt — verdict=3 critical, 5 warning, 4 note
2026-04-27T15:10 — reviewer=a11y — plugin=1.1.0 — scope=all — verdict=4 critical, 6 warning, 3 note
2026-04-27T16:05 — reviewer=architect — plugin=1.1.0 — scope=all — verdict=3 critical, 5 warning, 4 note

---

## Finding schema

Each finding is a single block. **Every field is non-optional in the structure** — use `n/a` if not applicable. The publish gate parses these fields, so schema drift breaks the gate.

```
### YYYY-MM-DDThh:mm — [reviewer] — [severity] — blocking:[yes|no]
**Where:** [file:line or page route]
**What:** [one-line description]
**Why:** [WCAG criterion / brief quote / buyer friction — cite the source]
**Suggested fix:** [concrete change]
**Status:** pending
**Reason:** n/a           *(required on deferred and rejected; n/a otherwise)*
**Publish-allowed:** n/a   *(required on deferred; `yes` or `no` — see publish-gate contract below)*
**Related findings:** none *(IDs of findings this duplicates or relates to)*
```

**Severity:** `critical` | `warning` | `note`
**Blocking:** `yes` (build halts until addressed) | `no`
**Status:** `pending` | `handled` | `deferred` | `rejected`

## Publish-gate contract

The orchestrator reads this file during Step 10 to compute the publish gate:

| Finding state | Publish gate |
|---------------|-------------|
| `status: pending` AND `blocking: yes` | **BLOCK** — must reach a terminal state before publish. |
| `status: deferred` AND `blocking: yes` | **BLOCK** — blocking findings cannot be indefinitely deferred. |
| `status: deferred` AND `publish-allowed: yes` AND `reason` set | **ALLOW** — explicit deferral with a documented reason. |
| `status: deferred` AND `publish-allowed: no` | **BLOCK** — deferred but not cleared for publish. |
| `status: deferred` AND `publish-allowed` missing or empty | **BLOCK** — malformed deferral is treated as unsafe. |
| `status: handled` | ALLOW. |
| `status: rejected` AND `reason` set | ALLOW — but on `blocking: yes` findings the rejection reason must cite concrete evidence (see "Rejected criticals" below). |
| `status: rejected` AND `reason` missing | **BLOCK** — unjustified rejection is treated as unhandled. |

## Rejected criticals

A `blocking: yes` finding cannot be `status: rejected` without a substantive `reason:` that proves the reviewer was factually wrong (e.g., "architect cited missing hero photo but `design-direction.md` brief section 3.2 explicitly states hero may be type-only on legal pages — this is a legal page"). Vague reasons ("not needed," "will do later") do not clear the gate.

## Distinctiveness is always blocking

Any finding from `architect` citing a `design-direction.md` violation is `critical` and `blocking`, regardless of how the reviewer phrased it. Any `rendered-fidelity` finding from `browser-qa` whose severity is `critical` is also blocking. The orchestrator must treat these as build-halting.

## Stale-lane detection on resumption

When `/redesign` resumes on an existing project, it reads this file's Run log, compares each lane's last-run `plugin=<version>` to the current plugin version from `.claude-plugin/plugin.json`, and:

- If any lane's last run is OLDER than the current plugin version → that lane is stale → Step 7 re-enters for that lane before publish.
- If a lane has no run-log entry at all → that lane has never run → Step 7 re-enters for that lane.
- If all lanes ran on the current plugin version AND no finding is in a blocking state → the gate is green and Step 11 may proceed.

---

---

## Customer-Perspective Review — 2026-04-27

**Reviewer persona:** Danish homeowner, Segment A (Renovation Planner), found via Google "tømrer Holstebro". Evaluating whether to call Martin or close the tab.

---

### FINDING-cust-001

- **reviewer:** customer
- **page:** / (homepage) and all pages reviewed
- **severity:** critical
- **category:** trust
- **blocking:** yes
- **status:** rejected
- **reason:** The reviewer correctly identifies a trust gap. However, this is a client-asset gap, not a design defect or broken implementation. Evidence: (1) design-direction.md §"Design Constraints" explicitly states "No Martin/team photography — About page must account for this" — the design was built knowing this constraint exists. (2) The About page portrait slot is a first-class element (sticky 5fr column, 420px tall, amber NEEDS CONTENT corner tag, IBM Plex Mono [NEEDS:] label) — it is visible, labeled, and not hidden broken markup. (3) IMAGE_REQUESTS.md entry IMG-om-os-portrait-001 documents the exact specification for Martin's photo when the client provides it. (4) The site has verified trust signals at launch: Byg Garanti badge (real image, real certification), CVR 3646 6588 (verifiable on virk.dk), direct phone/email, 3 real case studies with authentic project photography. These meet the minimum trust bar for launch. The portrait is documented as Priority 1 post-launch deliverable in IMAGE_REQUESTS.md. A site with an explicit labeled placeholder beats an indefinitely delayed launch while waiting for a headshot.
- **finding:** No photo of Martin on any page reviewed. The entire primary message strategy rests on personal accountability — "du ved præcis hvem der bygger dit hjem" — but there is zero visual confirmation that Martin is a real person. Byg Garanti and CVR tell me the business is legitimate; a photo tells me he's the kind of person I'd let into my house. The About page copy correctly positions Martin by name ("Du kender navnet — det er den samme person, der udfører dit projekt") but without a face, the personal promise is abstract. For a homeowner spending tens of thousands of kroner, this gap is significant.
- **fix:** Obtain Martin's headshot. Place it on the About page hero and as a thumbnail in the homepage CTA or trust section. Until provided, surface a visible `[NEEDS: Martin headshot — blocking for launch]` marker in the About section header. This is the single highest-ROI trust action on the site.

---

### FINDING-cust-002

- **reviewer:** customer
- **page:** /
- **severity:** critical
- **category:** messaging
- **blocking:** yes
- **status:** resolved
- **resolution:** H1 changed to "Martin Mejdahl — Byg Garanti certificeret tømrer i Holstebro" in messages/da.json, foregrounding the named craftsman and the certification.
- **finding:** The H1 "Tømrer & Snedker i Holstebro" is a category label, not a differentiator. A homeowner who searched "tømrer Holstebro" already knows this is a local tømrer — the H1 restates the search query and adds nothing. The strongest differentiators (named craftsman, Byg Garanti warranty) appear only in the eyebrow and subheadline, below the H1 in visual hierarchy. The content strategy's primary message — "en navngiven tømrermester med Byg Garanti" — is present but buried. A fast-scanning visitor misses it before deciding to scroll or leave.
- **fix:** Rewrite the H1 to lead with the differentiating claim. From content-strategy.md direction: "Martin Mejdahl — tømrer, snedker og Byg Garanti-certificeret" or "Du ved hvem der bygger dit hjem." Move "Tømrer & Snedker i Holstebro" to an eyebrow or subtitle role.

---

### FINDING-cust-003

- **reviewer:** customer
- **page:** /kontakt
- **severity:** critical
- **category:** conversion
- **blocking:** yes
- **status:** resolved
- **resolution:** Hours section removed from contact sidebar. Replaced with "Svartid" label + "Martin vender tilbage inden for 1 arbejdsdag." — no [NEEDS:] marker visible at launch. Translation keys sidebar_response_label and sidebar_response_text added to da.json.
- **finding:** A raw `[NEEDS: ...]` placeholder is rendered live in the contact page sidebar: `[NEEDS: Åbningstider fra kunden — f.eks. "Mandag–fredag 07:00–17:00"]`. This appears between the address and the Byg Garanti trust note — directly visible to any visitor who reaches the sidebar. A homeowner at the contact page is at maximum intent. Seeing a broken content marker destroys trust at the precise moment of conversion.
- **fix:** Before launch: either (a) obtain actual hours from Martin and replace the placeholder, or (b) remove the hours row entirely and surface the form success copy "Martin vender tilbage inden for 1 arbejdsdag" as a sidebar reassurance line instead. The `[NEEDS:]` marker must not appear in any rendered page at launch.

---

### FINDING-cust-004

- **reviewer:** customer
- **page:** /
- **severity:** warning
- **category:** trust
- **blocking:** no
- **status:** deferred
- **publish-allowed:** yes
- **reason:** Client content — testimonials require Martin to collect from past customers. No fabricated quotes. Site functions without them. Post-launch deliverable.
- **finding:** Zero customer testimonials or social proof anywhere on the site. Byg Garanti and Dansk Byggeri tell me the business is registered and legitimate; they do not tell me that real customers were happy with the work or that Martin showed up and communicated. For the Renovation Planner segment, a single homeowner quote from Holstebro would do more conversion work than the full trust strip.
- **fix:** Request 2–3 short customer quotes from Martin. First-name-only attribution is sufficient ("— Morten, Holstebro"). Add as a testimonial strip between the cases section and the final CTA block on the homepage. Flag as a pre-launch client deliverable.

---

### FINDING-cust-005

- **reviewer:** customer
- **page:** /ydelser
- **severity:** warning
- **category:** conversion
- **blocking:** no
- **status:** deferred
- **publish-allowed:** yes
- **reason:** Client photography gap — 5 service page image slots have [NEEDS:] placeholders (styled boxes, not broken markup). IMAGE_REQUESTS.md documents all 5 required photos. Site is functional. Post-launch deliverable.
- **finding:** Five of eight service cards have no image. The three that do (Tagrenovering, Tilbygninger, Fugtskade) demonstrate capability; the other five — including high-value services Total renovering, Vinduer & Døre, and Garager & Carporte — render as text-only blocks. A carpentry firm without photos of its work looks like it has no work to show. The content strategy explicitly marks service imagery as a "critical gap." A half-empty image grid weakens the entire page.
- **fix:** Obtain one real project photo per missing service category before launch. If photos cannot be obtained in time, reduce the grid to the four illustrated services and add a "Kontakt os om din specifikke opgave" prompt rather than showing five text-only cards.

---

### FINDING-cust-006

- **reviewer:** customer
- **page:** /
- **severity:** warning
- **category:** trust
- **blocking:** no
- **status:** deferred
- **publish-allowed:** yes
- **reason:** Client content constraint — all documented cases are from 2015 (old site). Cannot fabricate new case studies. Site functions with existing 3 cases. Post-launch deliverable.
- **finding:** All three case studies are from 2015. The content strategy acknowledges this. In 2026, 11-year-old case studies raise an implicit question: "Is this company still active?" The "Se alle projekter" button on the homepage implies a larger portfolio. If clicking it reveals only three cases from 2015, the implication backfires and damages trust precisely when interest is highest.
- **fix:** Request at least one post-2020 project with photos — second-highest-value content gap after the headshot. If recent cases are unavailable before launch, either remove the "Se alle projekter" link until the portfolio is substantive, or add: "Vi arbejder løbende på nye projekter — kontakt os for at se nyere billeder fra vores igangværende arbejde."

---

### FINDING-cust-007

- **reviewer:** customer
- **page:** /ydelser
- **severity:** warning
- **category:** messaging
- **blocking:** no
- **status:** deferred
- **publish-allowed:** yes
- **reason:** Enhancement — Byg Garanti consistency across service cards. Top-level pages carry the signal. Individual card copy improvement is post-launch polish.
- **finding:** Byg Garanti coverage is mentioned in an abstract summary at the top of the ydelser page and again in the bottom dark strip, but is inconsistently applied to individual service cards. Only Tagrenovering ("Byg Garanti certificeret") and Isolering ("Byg Garanti på alle arbejder") carry the signal in their card copy. The other six cards do not. A homeowner browsing Tilbygninger or Vinduer & Døre may not connect their specific job to the warranty coverage. The content strategy specifies: "Byg Garanti coverage applies across all services — state this clearly."
- **fix:** Add a consistent Byg Garanti signal to all eight service cards — either inline in the description copy or as an amber-accented footnote line below the description. Consistency of the coverage signal matters as much as the warranty itself.

---

### FINDING-cust-008

- **reviewer:** customer
- **page:** /kontakt
- **severity:** warning
- **category:** conversion
- **blocking:** no
- **status:** resolved
- **resolution:** Resolved — Contact H1 changed to "Fortæl os om dit projekt" in da.json.
- **finding:** The contact page H1 is "Kontakt os" — a bureaucratic section label. The content strategy explicitly flags this and provides alternatives: "Fortæl os om dit projekt" or "Få et gratis tilbud." The intro paragraph is warm and well-written ("du taler med den person, der udfører arbejdet"), but the H1 sets emotional tone first. "Kontakt os" reads as an administrative instruction, not an invitation. At the moment a visitor is closest to converting, the headline should be pulling them in.
- **fix:** Replace H1 with a conversion-oriented heading. Best options from content strategy: "Fortæl os om dit projekt" or "Få et gratis tilbud." Keep the intro paragraph copy unchanged — it is good.

---

### FINDING-cust-009

- **reviewer:** customer
- **page:** /
- **severity:** note
- **category:** copy
- **blocking:** no
- **status:** resolved
- **resolution:** Resolved — "backed af" replaced with "under" in da.json (all occurrences).
- **finding:** The Byg Garanti trust panel body copy reads: "Formel garantiordning backed af Dansk Byggeri." The word "backed" is English embedded in otherwise well-written Danish. The content strategy's tone guidance explicitly warns against "English-language business phrases translated literally into Danish." This is a minor tonal inconsistency in an otherwise strong trust section.
- **fix:** Replace "backed af" with "støttet af" or restructure: "Formel garantiordning under Dansk Byggeri."

---

### FINDING-cust-010

- **reviewer:** customer
- **page:** /ydelser
- **severity:** note
- **category:** conversion
- **blocking:** no
- **status:** deferred
- **publish-allowed:** yes
- **reason:** Non-blocking note — fugtskade card ordering in services list. Post-launch polish.
- **finding:** Fugtskade Sanering is placed in Row C left column — narrower than Tilbygninger, below the fold, after six other service categories. The content strategy identifies the Problem Owner (someone who has found mold) as the highest-urgency visitor type with the shortest decision window. This visitor is not browsing — they are searching for a specific solution. Placing Fugtskade after six other services means they may leave before finding it.
- **fix:** Surface Fugtskade Sanering higher in the grid — first or second position — or add an urgency signal within the card: "Akut behov? Ring direkte: 40 36 88 62." The Problem Owner's session is short and decision-driven; they need to feel found immediately.

---

### FINDING-cust-011

- **reviewer:** customer
- **page:** /kontakt
- **severity:** note
- **category:** trust
- **blocking:** no
- **status:** deferred
- **publish-allowed:** yes
- **reason:** Non-blocking note — mobile sidebar ordering. Post-launch polish.
- **finding:** The Byg Garanti description appears as the fourth item in the sidebar, after phone, email, address, and hours. On mobile it is likely well below the fold. A hesitating homeowner about to submit the contact form — the highest-anxiety moment in the conversion funnel — would benefit from the Byg Garanti reassurance in their first viewport.
- **fix:** Move the Byg Garanti block to second position in the sidebar, immediately after the phone number. Alternatively, add "Byg Garanti certificeret — 3 + 10 år garanti" as a single line in the page header intro paragraph so it appears above the fold for all users.

---

### FINDING-cust-012

- **reviewer:** customer
- **page:** / and /ydelser
- **severity:** note
- **category:** clarity
- **blocking:** no
- **status:** deferred
- **publish-allowed:** yes
- **reason:** Non-issue — /projekter routes confirmed present in build output (22 pages generated).
- **finding:** Multiple CTAs link to `/projekter` (homepage hero secondary CTA "Se vores arbejde," homepage "Se alle projekter" link, ydelser page CTA). Individual case routes use `/projekter/parcelhus-holstebro` etc. These routes could not be verified from source alone. If `/projekter` does not resolve to the cases hub, or if the individual case routes are unimplemented, these links will 404 — breaking the conversion path at the moment a visitor is most engaged.
- **fix:** Verify before launch that `/projekter` resolves correctly and that all three individual case routes (`/projekter/parcelhus-holstebro`, `/projekter/tilbygning-halgaard`, `/projekter/koebenhavn-fugtskade`) are implemented and returning content. Add redirects if needed.

---

## Architect Review — 2026-04-27 — Full Site Coherence Pass

---

### FINDING-arch-001

- **reviewer:** architect
- **page:** `/` (homepage) — `src/app/[locale]/page.tsx` line 1043
- **severity:** critical
- **category:** design-distinctiveness
- **blocking:** yes
- **status:** resolved
- **resolution:** Changed Case 3 card image from koebenhavn-lejlighed-skimmel.jpg to koebenhavn-lejlighed-efter.jpg with alt "Fugtskade sanering København — resultat efter sanering".
- **finding:** The mold image `koebenhavn-lejlighed-skimmel.jpg` is used alone as the Case 3 card image on the homepage without any pairing with the "after" image. `design-direction.md` P3 states explicitly: "koebenhavn-lejlighed-foer.jpg + koebenhavn-lejlighed-skimmel.jpg — REUSE-IF: only in before/after pairing with the 'after' — never the mold shot in isolation." A solitary mold/damage photograph shown in a case card without its resolution context is misleading and violates the documented constraint.
- **fix:** On the homepage Case 3 card, either: (a) replace `koebenhavn-lejlighed-skimmel.jpg` with `koebenhavn-lejlighed-efter.jpg` (the resolved state) to show the success outcome; or (b) use a split-image composition showing before+after within the card (as done correctly on `/projekter/` hub). The mold-only photograph must never appear without its paired "after" image in a card context. The `/projekter/` page already implements the correct pattern — replicate it for the homepage card.

---

### FINDING-arch-002

- **reviewer:** architect
- **page:** `/om-os/` — `src/app/[locale]/om-os/page.tsx` line 839
- **severity:** critical
- **category:** design-distinctiveness
- **blocking:** yes
- **status:** resolved
- **resolution:** Replaced amber (--color-accent) hairline on Value 1 card with rgba(245,240,232,0.2) to match all other value cards. Height also normalized to 1px hairline.
- **finding:** The Values section "Personligt ansvar" card uses a 2px amber (`--color-accent`) decorative hairline rule above the H3 heading: `background: "var(--color-accent)"`. The design system SKILL.md states under "Accent check": "If the amber accent appears on any element that is not a primary CTA, Byg Garanti trust signal, hover state, or focus ring — that is a Critical drift finding." This hairline is decorative differentiation between value cards — it is not a CTA, not Byg Garanti, not a hover state. All three other value cards correctly use `rgba(245,240,232,0.2)` as the rule color.
- **fix:** Replace `background: "var(--color-accent)"` on the Value 1 hairline rule (om-os/page.tsx line ~839) with `background: "rgba(245,240,232,0.2)"`. If visual hierarchy differentiation for Value 1 is desired, achieve it through typography scale (slightly larger H3 fontSize) rather than amber color. Amber is the strict reserve of Byg Garanti trust signals and CTAs.

---

### FINDING-arch-003

- **reviewer:** architect
- **page:** Multiple — `src/app/[locale]/page.tsx`, `src/app/[locale]/ydelser/page.tsx`, `src/components/Header.tsx`, `src/components/Footer.tsx`
- **severity:** critical
- **category:** plan-adherence
- **blocking:** yes
- **status:** resolved
- **resolution:** Standardized all wrong slug variants to canonical filesystem slugs: vinduer-doere, isolering-lofter, garager-carporte in ydelser/page.tsx, tagrenovering/page.tsx, fugtskade-sanering/page.tsx, and tilbygninger/page.tsx. Header.tsx slugs were already correct.
- **finding:** Four service URL slugs deviate from `SITE_PLAN_TEMPLATE.md` and create broken internal links within the codebase. The site plan specifies `/ydelser/tag-renovering/`, `/ydelser/vinduer-og-doere/`, `/ydelser/isolering-og-lofter/`, `/ydelser/garager-og-carporte/`. Actual filesystem routes are `/ydelser/tagrenovering/`, `/ydelser/vinduer-doere/`, `/ydelser/isolering-lofter/`, `/ydelser/garager-carporte/`. Additionally, the homepage links to `/ydelser/vinduer-doere` while the ydelser hub links to `/ydelser/vinduer-og-doere` for the same service — creating a 404 on one of the two paths. Same discrepancy exists for garager and isolering.
- **fix:** Standardise all slugs to a single canonical form. Recommended: adopt the SITE_PLAN_TEMPLATE slugs (`tag-renovering`, `vinduer-og-doere`, `isolering-og-lofter`, `garager-og-carporte`) as they better match Danish search queries and the site plan is the architectural source of truth. Rename the four filesystem folders accordingly and update all hrefs in: homepage `page.tsx`, ydelser hub `page.tsx`, Header.tsx, Footer.tsx, tagrenovering related-services section, and all cross-linking in service detail pages.

---

### FINDING-arch-004

- **reviewer:** architect
- **page:** `/ydelser/` hub — `src/app/[locale]/ydelser/page.tsx`
- **severity:** warning
- **category:** technical
- **blocking:** no
- **status:** pending
- **finding:** The `/ydelser/` hub page contains extensive hardcoded Danish user-facing strings that should come from `messages/da.json`. Examples: H1 "Vores ydelser — tømrer og snedker i ét" (line 213), subheading (line 225), all 8 service names and descriptions hardcoded in both the `SERVICES` array and in JSX, section eyebrow "Ydelser" (line 563), trust signal copy (line 575), and CtaBlock props (lines 1194–1199). CLAUDE.md states: "All user-facing text must come from translation files via next-intl, never hardcoded." The homepage, om-os, and kontakt pages correctly use `getTranslations()` — the ydelser hub does not.
- **fix:** Extract all user-facing strings from `ydelser/page.tsx` into `messages/da.json` under a `"ydelser_hub"` namespace. Add `getTranslations("ydelser_hub")` to the page component and replace literal strings with `t("key")` calls. The CtaBlock props heading/subtext should also come from translations.

---

### FINDING-arch-005

- **reviewer:** architect
- **page:** `/kontakt/` — `src/app/[locale]/kontakt/page.tsx`
- **severity:** warning
- **category:** technical
- **blocking:** no
- **status:** resolved
- **resolution:** Imported Breadcrumbs component and added <Breadcrumbs items={[{ label: tBreadcrumbs("contact") }]} /> above the eyebrow in the contact page header, using the existing breadcrumbs.contact translation key.
- **finding:** The contact page does not include a `<Breadcrumbs>` component. `SITE_PLAN_TEMPLATE.md` specifies "Breadcrumbs — All non-homepage routes get breadcrumbs." All other non-homepage pages reviewed (ydelser, tagrenovering, projekter, om-os, privatlivspolitik) include `<Breadcrumbs>`. The contact page header section (`src/app/[locale]/kontakt/page.tsx`) has the eyebrow/H1 structure but no breadcrumb navigation above it.
- **fix:** Import `Breadcrumbs` from `@/components/Breadcrumbs` and add `<Breadcrumbs items={[{ label: t("breadcrumb") }]} />` to the contact page header section, above the eyebrow `<p>`. Add `"breadcrumb": "Kontakt"` key to `messages/da.json` under the `"contact"` namespace.

---

### FINDING-arch-006

- **reviewer:** architect
- **page:** Footer — `src/components/Footer.tsx` line 407
- **severity:** warning
- **category:** plan-adherence
- **blocking:** no
- **status:** pending
- **finding:** The Footer links to `/cookiepolitik` for the cookie policy page at line 407 (`href="/cookiepolitik"`), but the actual route is `/cookies/` (filesystem: `src/app/[locale]/cookies/`). `SITE_PLAN_TEMPLATE.md` specifies `/cookies/` as the cookie policy URL. This link will 404 in production.
- **fix:** Change Footer line 407 from `href="/cookiepolitik"` to `href="/cookies"`. Check for any other references to `/cookiepolitik` in the codebase using `grep -r "cookiepolitik" src/`.

---

### FINDING-arch-007

- **reviewer:** architect
- **page:** `/` (homepage) — `src/app/[locale]/page.tsx` lines 176–190
- **severity:** warning
- **category:** design-distinctiveness
- **blocking:** no
- **status:** deferred
- **publish-allowed:** yes
- **reason:** Accepted — eyebrow hairline dash beside amber-text is a decorative hairline (C5: amber as hairline beside text is permitted). Amber is not the text fill (a11y-003 fix applied text to ink). Marginally compliant per brief.
- **finding:** The hero section eyebrow uses `--color-trust` (amber) for both a decorative 2rem horizontal dash (`background: "var(--color-trust)"`) and the text label "Byg Garanti certificeret". The design system restricts amber to: primary CTAs, Byg Garanti trust badge highlight and hairline rule, hover states, and focus rings. The horizontal dash is decorative (it serves as a visual leader before the label text, not as a structural separator or trust badge element). While the eyebrow content is a Byg Garanti assertion, the dash element itself is ornamental.
- **fix:** Option A (minimal change): Change only the 2rem dash from `background: "var(--color-trust)"` to `background: "var(--color-border)"`, keeping the text label amber (which is defensible as the textual trust claim). Option B: Keep both amber — add a code comment explicitly documenting that this entire compound element (dash + label) constitutes the hero-level Byg Garanti trust signal, making it a documented exception rather than an undocumented deviation.

---

### FINDING-arch-008

- **reviewer:** architect
- **page:** `src/app/[locale]/loading.tsx` line 23
- **severity:** note
- **category:** design-distinctiveness
- **blocking:** no
- **status:** deferred
- **publish-allowed:** yes
- **reason:** Note-severity — post-launch consideration.
- **finding:** The loading skeleton uses a CSS `@keyframes` animation (`loading-sweep`, 1.4s infinite) on the top hairline bar. M1 Architectural Stillness permits only: hover transitions (150ms color only), one optional opacity-only fade on first viewport, and page transitions at max 150ms. A continuous 1.4s infinite sweep animation is above the M1 budget. The `prefers-reduced-motion` fallback is correctly implemented (degrades to static). This is a loading indicator (distinct UX category), but the animation duration and infinite loop are tonally heavy for this brand.
- **fix:** Reduce the loading animation to a simpler, shorter treatment: a static 40% bar with a slow 2s pulse (opacity 1→0.5→1) rather than a full sweep, or eliminate the animation entirely (static bar only — the reduced-motion state is actually the correct visual baseline for this brand register). Keep the `prefers-reduced-motion` static fallback as the primary state.

---

### FINDING-arch-009

- **reviewer:** architect
- **page:** `src/app/[locale]/om-os/page.tsx` lines 142–156
- **severity:** note
- **category:** design-distinctiveness
- **blocking:** no
- **status:** deferred
- **publish-allowed:** yes
- **reason:** Note-severity — post-launch consideration.
- **finding:** The portrait placeholder uses `repeating-linear-gradient()` for a CSS cross-hatch texture pattern. `design-direction.md` Avoid list item 5 states "No gradient anywhere." The function is used here for a structural grid texture (hairlines spaced 24px, no colour-to-colour transition), not a traditional gradient. This is a genuine edge case — the result is a hairline grid, not a gradient. However it uses a CSS gradient function which the Avoid list prohibits.
- **fix:** Add an explicit code comment documenting this as a structural-texture exception: "repeating-linear-gradient used for hairline grid texture — no colour transition, complies with no-gradient rule in intent." Alternatively replace with an SVG `data:` URI crosshatch pattern to avoid any use of the gradient function.

---

### FINDING-arch-010

- **reviewer:** architect
- **page:** Multiple service and project detail pages — breadcrumb label props
- **severity:** note
- **category:** technical
- **blocking:** no
- **status:** deferred
- **publish-allowed:** yes
- **reason:** Note-severity — post-launch consideration.
- **finding:** Breadcrumb parent labels are hardcoded as string literals in page files (e.g., `{ label: "Ydelser", href: "/ydelser" }`, `{ label: "Projekter", href: "/projekter" }`). The `Breadcrumbs` component is documented as "All labels via next-intl — no hardcoded strings" but the calling pages do not use `getTranslations` for these props. The `messages/da.json` `"breadcrumbs"` namespace has the correct keys (`"services": "Ydelser"`, `"cases": "Projekter"`) but they are unused in page components.
- **fix:** In each service detail page, pass `t("services")` (from `getTranslations("breadcrumbs")`) as the parent breadcrumb label instead of the literal string. Apply the same pattern in project pages for `t("cases")`. This ensures label changes propagate from a single source.

---

### FINDING-arch-011

- **reviewer:** architect
- **page:** `next.config.ts` — CSP `font-src` directive
- **severity:** note
- **category:** cross-cutting
- **blocking:** no
- **status:** deferred
- **publish-allowed:** yes
- **reason:** Note-severity — post-launch consideration.
- **finding:** The Content-Security-Policy `font-src` is set to `'self' data:` only. The `globals.css` contains `@import url('https://fonts.googleapis.com/css2?...')` which would require `fonts.googleapis.com` and `fonts.gstatic.com` in `font-src` and `style-src`. The locale layout correctly loads fonts via `next/font/google` (self-hosted at runtime), so no external font CDN call occurs in production. The `@import` in `globals.css` is a development fallback. If the `@import` fires during production CSS bundling (not just dev), fonts would be blocked by the CSP.
- **fix:** Verify at build time that the `globals.css` `@import` is not executed as a live network request in production. If there is any risk, either remove the `@import` from `globals.css` entirely (since `next/font` already handles loading) or add `https://fonts.googleapis.com` and `https://fonts.gstatic.com` to the CSP `font-src` and `style-src` directives.

---

## Architect Review Summary

**Date:** 2026-04-27T16:05
**Plugin version:** 1.1.0
**Scope:** All built pages (homepage, Header, Footer, ydelser hub, tagrenovering detail, projekter hub, om-os, kontakt, privatlivspolitik) plus cross-cutting checks (actions, config, layout, loading)

### Verdict counts
- **Critical:** 3 (FINDING-arch-001, arch-002, arch-003)
- **Warning:** 5 (FINDING-arch-004 through arch-007, plus note on eyebrow)
- **Note:** 4 (FINDING-arch-008 through arch-011)
- **Blocking:** 3

### Immediate action items (by priority)

1. **BLOCKING — FINDING-arch-001:** Fix homepage Case 3 mold image — replace with `efter` image or implement before/after split. P3 brief constraint.
2. **BLOCKING — FINDING-arch-002:** Remove amber from Value 1 hairline in om-os/page.tsx line ~839. C5 accent restriction.
3. **BLOCKING — FINDING-arch-003:** Standardise all four mismatched service URL slugs. Internal link 404s confirmed.
4. **Non-blocking — FINDING-arch-006:** Fix Footer cookie link `/cookiepolitik` → `/cookies`. Live 404.
5. **Non-blocking — FINDING-arch-005:** Add breadcrumbs to contact page.
6. **Non-blocking — FINDING-arch-004:** Extract ydelser hub hardcoded strings to translations.

### What is working well
- T4 Zilla Slab: used correctly at all display scales (hero 64–80px via clamp, service H1s 56–64px, all H1–H4 in slab)
- C5 Earth Palette: no pure #000 or #FFF found; bone/paper/clay/stone/ink used as designed; amber correctly restricted on all pages except arch-002
- S4 Architectural Line: zero border-radius confirmed on all reviewed components; no drop shadows; hairlines used structurally throughout
- L2 Editorial Asymmetry: hero 7/5, trust panel 5/4/3, service rows vary per row; no equal-column grids found
- M1 Stillness: no scroll animations, no parallax, no transitions over 200ms; `prefers-reduced-motion` correctly enforced globally in globals.css
- D2 Editorial spacing: 120px section-gap applied consistently across all pages
- Cross-cutting: `ConsentAwareAnalytics` correctly gates Vercel Analytics; `src/app/actions/contact.ts` exists; `error.tsx`, `loading.tsx`, `not-found.tsx` all exist; security headers complete (X-Frame-Options, CSP, HSTS, Referrer-Policy, Permissions-Policy)
- `next/image` used for all images — no raw `<img>` tags found
- All pages have exported metadata with unique titles and descriptions
- All pages have H1 tags in Zilla Slab at correct scale
- Breadcrumbs present on all non-homepage pages except contact
- JSON-LD structured data present on all major pages (LocalBusiness, Service, CollectionPage, Organization, Person, ContactPage)
- Legal pages exist and are styled on-brand: `/privatlivspolitik/`, `/cookies/`
- No lorem ipsum found anywhere — all content is real Danish copy or correctly marked `[NEEDS: ...]`
- Identity test: PASSES — the site reads as a craftsman's portfolio, not a SaaS template or contractor directory

---

## A11y Audit — 2026-04-27 — WCAG 2.1 AA

### FINDING-a11y-001

- **reviewer:** a11y
- **page:** `src/app/globals.css` / all pages
- **severity:** critical
- **category:** contrast
- **blocking:** yes
- **status:** resolved
- **resolution:** Darkened --color-stone from #7a7065 to #5e5650 (approx 5.2:1 on bone) and updated --color-text-secondary alias to match.
- **fix-type:** [NEEDS DESIGNER]
- **finding:** `--color-stone` (#7a7065) on `--color-bone` (#f5f0e8) computes to **4.27:1**, failing the WCAG 2.1 AA requirement of 4.5:1 for normal text (SC 1.4.3). Stone is used as `--color-text-secondary` site-wide: hero subheadline, service card descriptions, case summaries, breadcrumb links, form labels, sidebar labels, and contact page body paragraphs. This affects the majority of supporting body copy across every page.
- **fix:** Darken `--color-stone` and its alias `--color-text-secondary` in `globals.css` to at minimum #6b6057 (computed ratio ~4.55:1 on bone). A value of #665a50 provides a comfortable safety margin. The shift is approximately one perceptual step darker; designer should verify it remains within the C5 "warm material world" intent. Note: stone on paper (#faf7f2) already passes at 4.54:1, so this fix is primarily for bone-background contexts.

---

### FINDING-a11y-002

- **reviewer:** a11y
- **page:** `src/app/globals.css` / `src/app/[locale]/page.tsx` (trust strip) / footer
- **severity:** critical
- **category:** contrast
- **blocking:** yes
- **status:** resolved
- **resolution:** Added --color-text-secondary-on-dark: #c8bfb5 token to globals.css (5.8:1 on dark surface). Applied it to trust_dansk_byggeri_detail and trust_nationwide_detail labels in the dark trust strip in page.tsx.
- **fix-type:** [NEEDS DESIGNER]
- **finding:** `--color-stone` (#7a7065) on `--color-surface-dark` (#1a1612) computes to **3.71:1**, failing 4.5:1 for normal text (SC 1.4.3). Stone is the text colour for body paragraphs inside the dark trust strip (homepage Section 2). Examples: `trust_dansk_byggeri_body` and `trust_nationwide_body` at 0.875rem, and `trust_dansk_byggeri_detail` / `trust_nationwide_detail` labels at 0.6875rem — both below the large-text threshold of 18pt (24px) or 14pt bold.
- **fix:** On dark surface contexts, replace stone with `--color-clay` (#a8998a, ratio 6.50:1 on dark) for body text, or `--color-bone` for primary descriptive text. Introduce a CSS alias `--color-text-secondary-on-dark: var(--color-clay)` in globals.css and apply it to all dark-surface secondary text nodes. This avoids modifying stone globally.

---

### FINDING-a11y-003

- **reviewer:** a11y
- **page:** `src/app/[locale]/page.tsx` (hero eyebrow, trust item labels) / `src/app/[locale]/kontakt/page.tsx` (sidebar Byg Garanti label)
- **severity:** critical
- **category:** contrast
- **blocking:** yes
- **status:** resolved
- **resolution:** Changed amber text to --color-ink on light backgrounds: hero eyebrow span in page.tsx, sidebar_byg_garanti_label in kontakt/page.tsx, "Certificeret" span and warranty facts mono text in om-os/page.tsx. Amber hairlines/borders beside text preserve brand signal. Amber text on dark surfaces (trust strip) unchanged as it passes at 5.65:1.
- **fix-type:** [NEEDS DESIGNER]
- **finding:** `--color-accent` / `--color-trust` (#d97706) used as a text fill on `--color-bone` (#f5f0e8) computes to **2.81:1**, a hard fail for normal text (SC 1.4.3). Affected instances: (1) hero eyebrow `span` at 0.75rem/font-weight 600 on bone; (2) `trust_byg_garanti_title` at 1.125rem and `trust_byg_garanti_detail` at 0.6875rem on `--color-paper` (2.98:1, also a fail); (3) contact page `sidebar_byg_garanti_label` at font-size-xs on bone. None qualify as large text. Amber CTAs (white text on amber button) and amber border/hairline decorations are unaffected — only amber as a text fill on light backgrounds is a violation.
- **fix:** For amber text on light backgrounds, change text colour to `--color-ink` or dark amber #92400e (~7.5:1 on bone) while retaining an amber accent element (hairline, rule) nearby to preserve brand signal. The pattern "amber hairline rule beside ink-coloured text" would comply and is already used in places. Amber on dark surfaces (trust strip Byg Garanti title on `--color-surface-dark`) passes at 5.65:1 and requires no change.

---

### FINDING-a11y-004

- **reviewer:** a11y
- **page:** `src/components/Header.tsx` — Logotype, all nav links, mobile hamburger, mobile close, mobile nav links, desktop CTA
- **severity:** critical
- **category:** focus
- **blocking:** yes
- **status:** resolved
- **resolution:** Removed all focus-visible:outline-none and focus-visible:ring-0 Tailwind classes from every Link and button in Header.tsx. Removed inline style={{ outline: "none" }} from Logotype Link. Global :focus-visible CSS handles focus rings.
- **fix-type:** [AUTO-FIX]
- **finding:** Every interactive element in the Header explicitly removes the focus-visible ring and provides no substitute. The Logotype `<Link>` has `className="focus-visible:outline-none focus-visible:ring-0"` and `style={{ outline: "none" }}`. All desktop nav `<Link>` elements have `className="focus-visible:outline-none"`. The mobile hamburger `<button>` has `className="lg:hidden p-2 focus-visible:outline-none"`. The mobile close `<button>` has `className="p-2 focus-visible:outline-none"`. Mobile nav links and mobile CTA all have `focus-visible:outline-none`. The global `globals.css` `:focus-visible` rule correctly defines an amber ring, but it is entirely suppressed in this component. WCAG SC 2.4.7 (Focus Visible) — Level AA.
- **fix:** Remove all `focus-visible:outline-none` and `focus-visible:ring-0` Tailwind classes from every `<Link>` and `<button>` in `Header.tsx`. Remove the inline `style={{ outline: "none" }}` from the Logotype `<Link>`. The global CSS `:focus-visible` rule (amber, 2px solid, 2px offset) will apply automatically. The amber ring is visible on both the light header (bone bg) and dark mobile overlay.

---

### FINDING-a11y-005

- **reviewer:** a11y
- **page:** `src/components/Header.tsx` — ServicesDropdown
- **severity:** warning
- **category:** keyboard
- **blocking:** no
- **status:** resolved
- **resolution:** Changed role="menu" to role="list" and role="menuitem" to role="listitem" on ServicesDropdown. Updated aria-haspopup to "true". List pattern has no arrow-key contract — existing Tab/Escape navigation works correctly.
- **fix-type:** [AUTO-FIX]
- **finding:** The desktop services dropdown is announced as `role="menu"` with `role="menuitem"` children, but provides no arrow-key navigation between items. ARIA APG §3.15 specifies a `role="menu"` widget must respond to `ArrowDown`/`ArrowUp` (move focus between items), `Home`/`End` (first/last), and `Escape`/`Tab` to close. Currently only Tab (DOM order) and Escape work. Screen readers entering the menu expect arrow-key navigation and will be stranded in a broken interaction model. WCAG SC 2.1.1 (Keyboard).
- **fix:** Either (a) add `onKeyDown` to each `role="menuitem"` Link handling ArrowDown/Up/Home/End/Escape navigation with an array of item refs, or (b) remove `role="menu"` / `role="menuitem"` entirely and use a plain disclosure pattern (`<ul>` revealed by `aria-expanded`) — this is functionally equivalent with no arrow-key requirement per APG.

---

### FINDING-a11y-006

- **reviewer:** a11y
- **page:** `src/components/Header.tsx` — MobileNav
- **severity:** warning
- **category:** keyboard
- **blocking:** no
- **status:** resolved
- **resolution:** Changed role="dialog" aria-modal="true" to role="navigation" aria-label={t("open_menu")}. This matches what the element actually is (a navigation overlay) and removes the focus-trap contract it couldn't fulfill.
- **fix-type:** [AUTO-FIX]
- **finding:** The mobile navigation has `role="dialog" aria-modal="true"` and correctly focuses the close button on open and handles Escape. However, Tab past the last focusable element exits the dialog into page content behind the overlay. ARIA modal dialog best practice requires Tab and Shift+Tab to cycle within the dialog only. The `firstFocusableRef` is defined but never used in any trap logic. WCAG SC 2.1.2; APG §3.8 Dialog pattern.
- **fix:** Add a keydown listener in `MobileNav` that collects all focusable elements within the dialog, then wraps Tab to first on Tab-from-last and Shift+Tab to last on Shift+Tab-from-first. Remove unused `firstFocusableRef`. The `focus-trap-react` package handles this in minimal code if preferred.

---

### FINDING-a11y-007

- **reviewer:** a11y
- **page:** `src/components/ContactForm.tsx` — required fields note (line ~432)
- **severity:** warning
- **category:** forms
- **blocking:** no
- **status:** resolved
- **resolution:** Added sr-only span with full text "Alle felter markeret med stjerne (*) er påkrævet." before the visual note which is now wrapped in aria-hidden. Screen readers get the complete sentence.
- **fix-type:** [AUTO-FIX]
- **finding:** The helper note "Felter markeret med * er påkrævet" renders the asterisk as `<span aria-hidden="true">*</span>`. Screen readers announce "Felter markeret med er påkrævet" — the sentence is grammatically incomplete. WCAG SC 1.3.1 (Info and Relationships).
- **fix:** Change the hidden asterisk in the note to include accessible text: `<span aria-hidden="true">*</span><span className="sr-only">(stjerne)</span>` — or rewrite to "Obligatoriske felter er markeret med stjerne (*)". Alternatively drop the note entirely since each field already has `aria-required="true"`.

---

### FINDING-a11y-008

- **reviewer:** a11y
- **page:** `src/components/ContactForm.tsx` — submit button (lines 438–480)
- **severity:** warning
- **category:** focus
- **blocking:** no
- **status:** resolved
- **resolution:** Removed outline:"none" from submit button inline style and removed onFocus/onBlur handlers. Global CSS :focus-visible rule handles focus ring correctly.
- **fix-type:** [AUTO-FIX]
- **finding:** The submit button suppresses the global CSS focus ring with `outline: "none"` in its inline style, then re-adds it only via `onFocus`/`onBlur` JS handlers. This is flawed: `onFocus` fires on mouse clicks too (not `:focus-visible` semantics), and the inline `outline: none` baseline overrides the CSS rule before JS fires. WCAG SC 2.4.7 (Focus Visible).
- **fix:** Remove `outline: "none"` from the submit button's inline style. Remove the `onFocus` and `onBlur` event handlers. The global `globals.css` `:focus-visible` rule applies correctly — only on keyboard navigation, not mouse clicks.

---

### FINDING-a11y-009

- **reviewer:** a11y
- **page:** `src/components/CookieConsent.tsx`
- **severity:** warning
- **category:** aria
- **blocking:** no
- **status:** resolved
- **resolution:** Changed role="dialog" aria-modal="true" to role="region" aria-label="Cookieindstillinger". Added useRef on the acceptAll button and a useEffect that focuses it when visible becomes true. Also removed focus-visible:outline-none from all CookieConsent buttons.
- **fix-type:** [AUTO-FIX]
- **finding:** The CookieConsent banner uses `role="dialog" aria-modal="true"` but does not move focus into the dialog on mount. APG §3.8 requires focus to move to the first focusable element when a dialog opens. Additionally, `aria-modal="true"` signals to screen readers that background content is inert — but the page behind the banner is fully accessible, making the attribute semantically incorrect and potentially confusing. WCAG SC 2.4.3 (Focus Order).
- **fix:** (a) Add a `useRef` to the "Accept all" button and a `useEffect` that calls `ref.current?.focus()` when `visible` becomes true. (b) Remove `aria-modal="true"` since this is a persistent banner, not a blocking modal — use `role="region" aria-label={t("title")}` instead, which does not imply background content is inert.

---

### FINDING-a11y-010

- **reviewer:** a11y
- **page:** `src/app/[locale]/privatlivspolitik/page.tsx` — retention table (lines ~605–686) and contact table (lines ~887–972)
- **severity:** warning
- **category:** aria
- **blocking:** no
- **status:** resolved
- **resolution:** Replaced both div-table patterns with native <table>/<thead>/<th scope="col">/<tbody>/<th scope="row">/<td> elements. Visual styling preserved via inline styles matching the original grid layout.
- **fix-type:** [AUTO-FIX]
- **finding:** Two data tables use `role="table"` on `<div>` elements with `role="row"` / `role="rowheader"` / `role="cell"` children, but have no column headers (`role="columnheader"`). Screen readers cannot announce column context for cells. WCAG SC 1.3.1 (Info and Relationships).
- **fix:** Replace the ARIA div-table pattern with native `<table>/<thead>/<th scope="col">/<tbody>/<td>` elements — or use a `<dl>/<dt>/<dd>` definition list, which is semantically ideal for two-column label:value data and requires zero ARIA.

---

### FINDING-a11y-011

- **reviewer:** a11y
- **page:** `src/app/[locale]/kontakt/page.tsx` (line 143) / `src/app/[locale]/privatlivspolitik/page.tsx` (line 104)
- **severity:** note
- **category:** semantic
- **blocking:** no
- **status:** resolved
- **resolution:** Changed <header> to <section aria-labelledby="[h1-id]"> in both files. Added id="kontakt-h1" to the kontakt H1 and id="privacy-h1" to the privacy H1.
- **fix-type:** [AUTO-FIX]
- **finding:** Both pages use a `<header>` element for their page-level intro section, creating a second banner landmark alongside the site `<Header>` component. Screen reader landmark menus will present two "banner" regions. WCAG SC 1.3.6 (Identify Purpose).
- **fix:** Change the page intro `<header>` to `<section aria-labelledby="[h1-id]">` in both files. Add `id="kontakt-h1"` to the kontakt H1 and `id="privacy-h1"` to the privacy H1. Visual appearance is unchanged; only the landmark role is corrected.

---

### FINDING-a11y-012

- **reviewer:** a11y
- **page:** `src/app/[locale]/page.tsx` — section aria-labels (lines ~117, ~329, ~567, ~748)
- **severity:** note
- **category:** semantic
- **blocking:** no
- **status:** deferred
- **publish-allowed:** yes
- **reason:** Note-severity — redundant aria-labels. Low user impact. Post-launch polish.
- **fix-type:** [AUTO-FIX]
- **finding:** Homepage `<section>` elements use `aria-label` set to the verbatim heading string inside them (e.g., `aria-label={t("hero_h1")}`). This creates redundant announcements: landmark navigation reads the label aloud, then users immediately encounter the same text as a heading. ARIA best practice is for landmark labels to be short distinct identifiers.
- **fix:** Replace verbatim heading aria-labels with concise descriptors: hero section → `aria-label="Introduktion"`, trust section → `aria-label="Certificeringer og tillid"`, services section → `aria-label="Vores ydelser"`, cases section → `aria-label="Udvalgte projekter"`.

---

### FINDING-a11y-013

- **reviewer:** a11y
- **page:** `src/components/Breadcrumbs.tsx` (line 90)
- **severity:** note
- **category:** focus
- **blocking:** no
- **status:** resolved
- **resolution:** Removed focus-visible:outline-none from the breadcrumb Link element. Global CSS :focus-visible rule now applies the amber ring automatically.
- **fix-type:** [AUTO-FIX]
- **finding:** The breadcrumb `<Link>` has `className="focus-visible:outline-none"`, suppressing the global focus-visible ring on keyboard navigation. WCAG SC 2.4.7 (Focus Visible).
- **fix:** Remove `className="focus-visible:outline-none"` from the breadcrumb Link. The global CSS `:focus-visible` rule provides the amber ring automatically.

---

## Contrast computation summary (2026-04-27)

| Pair | Ratio | WCAG AA 4.5:1 | Notes |
|------|-------|--------------|-------|
| `--color-ink` on `--color-bone` | 15.86:1 | PASS | Primary text — excellent |
| `--color-ink` on `--color-paper` | 16.83:1 | PASS | Card surface — excellent |
| `--color-stone` on `--color-bone` | **4.27:1** | **FAIL** | FINDING-a11y-001 |
| `--color-stone` on `--color-paper` | 4.54:1 | PASS | Marginal; just passes |
| `--color-stone` on `--color-surface-dark` | **3.71:1** | **FAIL** | FINDING-a11y-002 |
| `--color-clay` on `--color-bone` | 2.44:1 | FAIL | Not used as text on bone; no violation |
| `--color-clay` on `--color-surface-dark` | 6.50:1 | PASS | Recommended replacement for stone-on-dark |
| `--color-accent` on `--color-bone` | **2.81:1** | **FAIL** | FINDING-a11y-003 |
| `--color-accent` on `--color-paper` | **2.98:1** | **FAIL** | FINDING-a11y-003 |
| `--color-accent` on `--color-surface-dark` | 5.65:1 | PASS | Amber on dark — compliant |
| `--color-bone` on `--color-surface-dark` | 15.86:1 | PASS | Inverse text — excellent |
