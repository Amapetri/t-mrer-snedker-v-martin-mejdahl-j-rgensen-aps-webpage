# Decisions Log

Append-only log of orchestrator decisions during the redesign pipeline. Each entry begins with a timestamped heading. Do not delete entries.

## Schema

```
### YYYY-MM-DDThh:mm — [phase] [one-line summary]
**Why:** [reason — often a constraint or trade-off]
**Effect:** [what changes downstream]
```

---

### 2026-04-27T00:00 — resumption check — Starting fresh from Step 1
**Why:** Brand skill is "Not Yet Populated" stub; no IMAGE_CATALOG.md; URL inventory empty; no content-strategy.md; SITE_PLAN_TEMPLATE.md still has {{TAGLINE}} placeholders; no redirects.md; no design-direction.md; no design system tokens; no IMAGE_SLOTS.md. Old site domain found in CLAUDE.md: https://www.mejdahltoemrer.dk/
**Effect:** Spawning brand-intelligence agent to crawl old site and produce company-brand/SKILL.md, IMAGE_CATALOG.md, and url-inventory.md.

### 2026-04-27T10:00 — resumption check — Confirmed fresh start from Step 1
**Why:** Second invocation confirmed same state — brand stub, all planning artifacts missing, only bare Next.js scaffold exists in src/app/[locale]/.
**Effect:** Proceeding to spawn brand-intelligence agent for https://www.mejdahltoemrer.dk/

### 2026-04-27T10:10 — Step 1 complete — Brand Moderate, 18 images downloaded, 8 URLs cataloged
**Why:** Brand-intelligence agent crawled mejdahltoemrer.dk (3 content pages). Rating: Moderate — solid facts (Byg Garanti, services, CVR) but no About page, no logo, no founding year, no employee count.
**Effect:** Proceeding to Step 2 (content-strategist) with Moderate-brand brief. Key client gaps: logo file, founding year, employee count, recent case photos.

### 2026-04-27T10:11 — Step 2 start — Launching content-strategist agent (Moderate brand path)
**Why:** Brand assessment is Moderate — focus on building messaging from available facts + industry context.
**Effect:** content-strategy.md will be written.

### 2026-04-27T10:20 — Step 2 complete — content-strategy.md written
**Why:** Primary differentiators: named sole-trader (Martin) + Byg Garanti 10yr guarantee. Three segments: Renovation Planner, Problem Owner, New Build Client.
**Effect:** Site planner can now build concrete page architecture from messaging hierarchy.

### 2026-04-27T10:21 — Step 3 start — Launching site-planner agent
**Why:** SITE_PLAN_TEMPLATE.md has {{TAGLINE}} placeholders — not yet filled with concrete pages.
**Effect:** Site plan will define page inventory, URL structure, build phases, and content requirements.

### 2026-04-27T10:30 — Step 3 complete — 19 pages, 4 build phases, Danish URLs (/ydelser/, /projekter/, /om-os/)
**Why:** Site plan now has concrete page inventory with keywords, CTAs, and content status for all 19 routes.
**Effect:** Build phases defined: P0 shared components, P1 core pages, P2 trust/depth, P3 legal.

### 2026-04-27T10:31 — Step 4 — Redirect mapping done inline (3 old URLs — no agent needed)
**Why:** Old site had only 3 content pages: /, /referencer/, /kontakt/ — too simple to warrant an agent.
**Effect:** redirects.md written; next.config.ts updated with 4 redirect rules. Judgment: /referencer/ → /da/projekter/ (best semantic match for cases/portfolio).

### 2026-04-27T10:32 — Step 5.1 start — Launching web-designer agent for design-direction.md
**Why:** design-direction.md does not exist. Design system skill is stub.
**Effect:** Agent will commit to visual language (T/C/L/P/S/D/M strategies) before any tokens are chosen.

### 2026-04-27T10:45 — Step 5.1 complete — T4/C5/L2/P3/S4/D2/M1 selected
**Why:** Archival Slab (T4) for trade guild identity; Earth Palette (C5) for material grounding; Editorial Asymmetry (L2) against template defaults; Process Documentary (P3) matches existing case photography; Architectural Line (S4) for 0px radius precision discipline; Editorial Density (D2) for trust signals with room; Architectural Stillness (M1) for confidence.
**Effect:** Brief is committed. Proceeding to 5.2 tokenization with frontend-design skill confirmed available.

### 2026-04-27T10:46 — Step 5.2 start — Launching tokenization agent
**Why:** design-direction.md exists and is complete; design-system/SKILL.md still stub; frontend-design skill confirmed in session.
**Effect:** CSS tokens in globals.css, design-system/SKILL.md populated, IMAGE_SLOTS.md derived.

### 2026-04-27T11:05 — Step 5.2 complete — 81 tokens, 35 image slots (20 catalog-reuse, 15 pending)
**Why:** Zilla Slab + IBM Plex Sans + amber accent + 0px radius system established. Hash verification passed (c807c142e6c7 / ab8c9b207a39).
**Effect:** Design system frozen. IMAGE_SLOTS.md is the binding imagery contract. Proceeding to Step 6 — build pages.

### 2026-04-27T11:06 — Step 6 start — Phase 0 build (shared components)
**Why:** No pages built yet. Phase 0 = Header, Footer, Breadcrumbs, CTA Block, Cookie Consent.
**Effect:** Shared components form the visual foundation all pages inherit from.

### 2026-04-27T11:30 — Step 6 Phase 0 complete — all 10 compliance checks PASS
**Why:** Header (text logotype, keyboard-accessible dropdown), Footer (L2 asymmetric, amber Byg Garanti only), CTA Block, CookieConsent, Breadcrumbs built. Build passes.
**Effect:** Phase 0 Revision Pass: all strategies survived contact. Brief frozen at T4/C5/L2/P3/S4/D2/M1.

### 2026-04-27T11:31 — Step 6 Phase 1 start — Homepage, Services hub, top 3 services, Contact
**Why:** Phase 0 done, brief frozen, dev server running at localhost:3000.
**Effect:** Core conversion pages built next.

### 2026-04-27T12:05 — browser-qa skipped at Phase 1 boundary — Chrome MCP tools unavailable in this environment
**Why:** browser-qa agent requires mcp__claude-in-chrome__* tools which are not in the available toolset. Dev server IS running at localhost:3000. User can run /review-browser manually once Chrome MCP is available.
**Effect:** browser-qa lane will be flagged as skipped-with-reason in the publish gate (yellow flag, not a blocker).

### 2026-04-27T13:00 — Step 6 Phase 3 — Legal pages, ConsentAwareAnalytics, on-brand error/loading states

**Pages built:**
- `/da/privatlivspolitik/` — GDPR-compliant Danish privacy policy (9 sections: dataansvarlig, data collected, purpose, legal basis, retention, rights, cookies, transfers, contact). Real legal content — no lorem ipsum. One [NEEDS:] marker for Vercel retention period, one for other processing purposes.
- `/da/cookies/` — Full cookie disclosure with inventory table (3 rows: cookie-consent, _vercel_speed_insights, va_*). Interactive "Åbn cookieindstillinger" button via OpenCookieSettingsButton client component.

**New components:**
- `src/components/ConsentAwareAnalytics.tsx` — Client component that gates `<Analytics />` from @vercel/analytics/next behind `localStorage["cookie-consent"].analytics === true`. Listens for `"cookie-consent-updated"` custom event for session-level consent updates without page refresh.
- `src/components/OpenCookieSettingsButton.tsx` — Client component on cookie policy page. Removes stored consent from localStorage, dispatches `"cookie-consent-updated"`, then reloads page so CookieConsent re-mounts.

**Layout updated:**
- `src/app/[locale]/layout.tsx` — Added `<ConsentAwareAnalytics />` alongside `<CookieConsent />`. Analytics now blocked until consent given. Comment updated to reflect the enforcement pattern.

**Error/loading states reworked:**
- `error.tsx` — On-brand: 500 in IBM Plex Mono (muted border color), Zilla Slab heading, IBM Plex Sans body, 0px radius secondary CTA retry button.
- `not-found.tsx` — On-brand: 404 in IBM Plex Mono, Zilla Slab heading, secondary CTA link-button back to homepage.
- `loading.tsx` — On-brand: fixed top hairline with CSS sweep animation (not a rounded spinner). `prefers-reduced-motion` degrades to static hairline. No overlay.

**Translation keys:** Added `"privacy"` (35 keys) and `"cookies_policy"` (30 keys) namespaces to `messages/da.json`. Added `error.loading_label`.

**Compliance checklist — Phase 3:**
- [x] Analytics blocked until consent given (ConsentAwareAnalytics)
- [x] CookieConsent shows on first visit (no stored preferences)
- [x] Preferences stored in localStorage under `cookie-consent`
- [x] Privacy policy covers all GDPR Article 13 requirements
- [x] Cookie policy lists all cookies with name, purpose, duration, provider
- [x] Manage preferences button accessible from cookie policy page
- [x] Privacy and cookies pages linked from footer (pre-existing footer links)
- [x] Build passes cleanly — 22 static pages generated, 0 TypeScript errors

**Why:** Phase 3 legal pages are a hard requirement before production launch. Analytics must be consent-gated by law (EU ePrivacy Directive + GDPR Article 6(1)(a)). Error/loading states were default Next.js stubs with neutral-900 rounded buttons — violating S4 (0px radius) and using off-palette colors.
**Effect:** Site is now legally compliant for analytics consent. Privacy and cookie policies are complete except for two explicitly marked [NEEDS:] client gaps.

### 2026-04-27T12:00 — Step 6 Phase 1 — Services batch built: hub + tagrenovering + tilbygninger + fugtskade-sanering
**Why:** Services hub and three highest-priority service detail pages built as one batch. Build passes cleanly. All compliance checks PASS.
**Effect:** 4 new routes live: `/ydelser/`, `/ydelser/tagrenovering/`, `/ydelser/tilbygninger/`, `/ydelser/fugtskade-sanering/`. Breadcrumbs component gained `"use client"` directive (had event handlers without it — pre-existing bug exposed by first use of Breadcrumbs outside the homepage). IMAGE_SLOTS.md updated: SLOT-ydelser-hub-hero-001 → `justified-none` (typography-first layout per design-direction.md constraint); SLOT-tag-renovering-hero-001 → `catalog-reuse: hero-main.jpg`; SLOT-tilbygninger-hero-001 → `catalog-reuse: tilbygning-halgaard-1.jpg` (+2 additional tilbygning images); SLOT-fugtskade-ydelse-hero-001 → `catalog-reuse: koebenhavn-lejlighed-foer.jpg` + `koebenhavn-lejlighed-skimmel.jpg` + `koebenhavn-lejlighed-efter.jpg` in correct before/after pairing.
**Decision: fugtskade hero uses dark surface** — only dark-background hero across all service pages. Justified: urgency register; the audience is a homeowner who has discovered mold (high anxiety); dark signals the seriousness of the problem without manufactured urgency language. Reviewed against M1 (no animation added to heighten urgency — stillness maintained). This is a C5 surface variation (--color-surface-dark), not a gradient or off-palette color.
**Decision: tilbygninger hero REVERSED to 5fr/7fr (image left, text right)** — every other hero has text left. Intentional L2 variation: the tilbygning service is most credibly evidenced by seeing a structure going up; giving the image the wider column communicates that the visual evidence is the primary message. This is the only service hero where image is wider than text.
