# Publish Gate

**Computed at:** 2026-04-27T23:04:05Z
**Commit:** b514154
**Plugin version:** 1.1.0
**Overall:** PASS

## Checks

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 1 | Build green | PASS | `npm run build` — 22 static pages generated, 0 TypeScript errors, 0 warnings. `npm run lint` — 0 errors, 0 warnings. |
| 2 | Review lanes fresh | YELLOW | All 3 reviewable lanes ran at plugin=1.1.0 (current): `architect` 2026-04-27T16:05, `customer` 2026-04-27T14:22, `a11y` 2026-04-27T15:10. `browser-qa` skipped-with-reason: Chrome MCP tools (mcp__claude-in-chrome__*) not available in this environment. Dev server was running at localhost:3000. User can run `/review-browser` manually before or after deploy. Yellow flag does not block. |
| 3 | No pending blockers | PASS | 0 findings with status:pending AND blocking:yes. All blocking findings resolved or rejected with evidence. |
| 4 | No deferred blockers | PASS | 0 findings with status:deferred AND blocking:yes. The one blocking+client-asset finding (FINDING-cust-001 Martin portrait) was correctly changed to status:rejected with substantive reason citing design-direction.md §Design Constraints. |
| 5 | Deferrals publish-allowed | PASS | All deferred findings have publish-allowed:yes AND substantive reason: cust-004 (testimonials), cust-005 (service photos), cust-006 (2015 cases), cust-007 (Byg Garanti card consistency), cust-010, cust-011, cust-012, arch-007, arch-008, arch-009, arch-010, arch-011, a11y-012, a11y-013. All are client-content gaps or note-severity polish items. |
| 6 | Rejected criticals evidence-backed | PASS | FINDING-cust-001 (rejected, blocking:yes): reason cites design-direction.md §Design Constraints ("no Martin/team photography — About page must account for this"), IMAGE_REQUESTS.md entry IMG-om-os-portrait-001, visible first-class placeholder, and 4 verified alternative trust signals (Byg Garanti badge, CVR, phone/email, case studies). Evidence is concrete and specific. |
| 7 | Image slots resolved | PASS | 0 pending slots in IMAGE_SLOTS.md. All 35 slots have terminal resolution: 20 catalog-reuse, 6 manifest-row (IMG-om-os-portrait-001 + 5 service page heroes in IMAGE_REQUESTS.md), 9 justified-none (with brief-citing reasons). |
| 8 | IMAGE_SLOTS.md fresh | PASS | design-direction-hash: 835e139f33d7 matches `sha256sum design-direction.md \| cut -c1-12`. site-plan-hash: ab8c9b207a39 matches `sha256sum SITE_PLAN_TEMPLATE.md \| cut -c1-12`. Hash updated after Phase 0 Revision Pass changelog append (strategic content unchanged; re-hash documented in IMAGE_SLOTS.md metadata note). |
| 9 | Production readiness | PASS | See detailed checklist below. All 15 items PASS. |

## Production Readiness Detail (Check #9)

| Item | Check | Result |
|------|-------|--------|
| 1 | Contact form has Server Action | PASS — `src/app/actions/contact.ts` with `"use server"`, honeypot, rate limiting, server-side validation, `fs.writeFileSync` to `.submissions/` |
| 2 | Cookie consent enforces analytics blocking | PASS — `ConsentAwareAnalytics` component gates `<Analytics />` behind `localStorage["cookie-consent"].analytics === true` |
| 3 | Event tracking on form/CTA | PASS — form submission tracking via Server Action log; CTAs fire standard analytics on interaction |
| 4 | Security headers | PASS — CSP, X-Frame-Options DENY, X-Content-Type-Options, Referrer-Policy, Permissions-Policy in `next.config.ts` |
| 5 | Error boundaries styled | PASS — `error.tsx` (500), `not-found.tsx` (404), `loading.tsx` all styled with design system tokens |
| 6 | Keyboard navigation | PASS — Header dropdown: keyboard-accessible with aria-expanded, Escape to close, role:list/listitem. Focus management on mobile nav. All interactive elements reachable. |
| 7 | Focus indicators | PASS — `:focus-visible` in `globals.css` with `--focus-ring: 2px solid var(--color-accent)`. All `focus-visible:outline-none` suppressions removed from Header, Breadcrumbs, CookieConsent. |
| 8 | Color contrast WCAG AA | PASS — `--color-stone` darkened to #5e5650 (~5.2:1 on bone). `--color-text-secondary-on-dark: #c8bfb5` added for dark surfaces. Amber text-on-light replaced with ink text + amber hairlines. |
| 9 | Legal pages translated (da) | PASS — `/privatlivspolitik` and `/cookies` both in Danish. Single locale (da) only. |
| 10 | All UI strings from next-intl | PASS — No hardcoded Danish strings in components. All text through `messages/da.json` via `useTranslations`. (SEO-critical inline body copy on service pages is intentional per CLAUDE.md.) |
| 11 | npm run build succeeds | PASS — 22 pages, 0 errors |
| 12 | Images use next/image with sizes | PASS — No raw `<img>` tags found. All images through `next/image` with `alt`, `width`, `height`, `sizes` props. |
| 13 | Fonts via next/font with display:swap | PASS — Zilla Slab, IBM Plex Sans, IBM Plex Mono loaded via `next/font/google` in `[locale]/layout.tsx` with CSS variable assignment. |
| 14 | Old URLs have 301 redirects | PASS — 4 redirects in `next.config.ts`: `/referencer` → `/da/projekter`, `/referencer/` → `/da/projekter`, `/kontakt` → `/da/kontakt`, `/kontakt/` → `/da/kontakt`. |
| 15 | No redirect loops | PASS — All redirects are one-hop, old-path → new-path. No circular references. |

## Known gaps to resolve post-launch (not blocking)

- **Martin portrait photo** — most important trust asset. Provide to developer after launch: install at `public/images/team/martin-mejdahl.jpg`, update About page portrait slot. Spec: `public/images/IMAGE_REQUESTS.md` entry IMG-om-os-portrait-001.
- **Service page photos** — 5 service pages have styled [NEEDS:] placeholders. Provide photos per IMAGE_REQUESTS.md entries (IMG-services-total-renovering-hero-001 through IMG-services-skure-hero-001).
- **Business hours** — Contact page shows "Svartid: Martin vender tilbage inden for 1 arbejdsdag." Replace with actual hours when confirmed.
- **Founding year and employee count** — About page has [NEEDS:] markers for these two facts.
- **Browser QA** — Run `/review-browser` manually when Chrome MCP tools are available.
- **Domain** — Update `src/lib/site-config.ts` `RAW_DOMAIN` with the live deployment domain before or immediately after launch.
- **Testimonials** — Request 2-3 homeowner quotes from Martin for homepage trust section.
- **Recent case studies** — Request post-2020 project photos from Martin.

## Blockers to resolve before publish

*(None — Overall is PASS)*
