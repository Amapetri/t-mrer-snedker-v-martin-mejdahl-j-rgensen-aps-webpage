---
description: Run the full website redesign pipeline — from brand analysis through to publish
---

You are orchestrating a full website redesign. Execute the steps below **autonomously from start to finish**. Do NOT pause to ask for approval, confirmation, or feedback. Do NOT just describe what you would do — actually do it. Use agents, read files, write files, and make progress continuously.

Brief the user on what you're doing at each major step transition, but do not wait for a response — keep moving. Write every non-obvious decision to `.redesign-state/decisions.md` with an ISO timestamp so resumption and audit are possible.

**Reference:** The full pipeline is documented in `PIPELINE.md`. This command implements that flow. If this file and `PIPELINE.md` disagree, `PIPELINE.md` wins — fix this file.

**Prerequisite:** The `/frontend-design` skill from Anthropic's agent-skills marketplace must be installed. Step 5.2 verifies this and halts if absent. Do not paper over a missing dependency — the pipeline's distinctiveness stack has no UI executor without it.

Start by running the resumption check to figure out where you are, then execute from the first incomplete step. **Completeness is content-based, not existence-based** — a file existing is not enough; every "step done" decision checks that the file has real content AND (where applicable) that its recorded input hashes still match current inputs.

---

## Resumption Check (run this FIRST)

Read these files and determine the current state. Apply the **completeness rules** next to each item — a file existing is not enough.

1. **Brand.** Read `.claude-plugin/skills/company-brand/SKILL.md`. Done = has real company data (not "Not Yet Populated" stub).
2. **Catalog.** `public/images/IMAGE_CATALOG.md` exists and has a non-empty body.
3. **URL inventory.** `.redesign-state/url-inventory.md` has URLs, not just the header.
4. **Content strategy.** `content-strategy.md` exists with real messaging content.
5. **Site plan.** `SITE_PLAN_TEMPLATE.md` has concrete pages (placeholder template body = not done).
6. **Redirects.** `redirects.md` exists.
7. **Design direction.** `design-direction.md` exists at project root AND has filled the seven strategy categories (not the template stub).
8. **Design system tokenized.** `.claude-plugin/skills/design-system/SKILL.md` populated with real tokens.
9. **Image slots derived.** `IMAGE_SLOTS.md` has a complete derivation metadata block (HTML comment at top with `derived-at`, `plugin-version`, and non-empty `design-direction-hash` + `site-plan-hash`). Re-compute current `sha256sum design-direction.md | cut -c1-12` and `sha256sum SITE_PLAN_TEMPLATE.md | cut -c1-12` — if either differs from the recorded input hash, the inventory is stale. Missing metadata OR stale hashes = **derive now** (the one-time migration OR a brief-edit re-derivation). Write the new hashes + current plugin version from `.claude-plugin/plugin.json` into the metadata block after derivation. Log the derivation to `.redesign-state/decisions.md`.
10. **Built pages.** List `src/app/[locale]/` (escape the brackets — `src/app/\[locale\]/` in zsh). Which page directories exist? For each built page, read the latest compliance-log entry. Any unjustified FAIL = that page is not done.
11. **Review findings.** Read `.redesign-state/review-findings.md`:
    - **Run-log staleness.** For each reviewer lane (`architect`, `customer`, `a11y`, `browser-qa`), find the most recent `Run log` line. If any lane's last-run `plugin=<version>` is older than the current plugin version (`.claude-plugin/plugin.json` `"version"`), OR the lane has no run-log entry at all, that lane is **stale** — Step 7 must re-enter for that lane before Step 11.
    - **Pending/deferred blockers.** Any finding with `status: pending` AND `blocking: yes`, or `status: deferred` AND `blocking: yes`, or `status: deferred` AND `publish-allowed: no` or missing, or `status: rejected` AND `blocking: yes` without a substantive `reason` — Step 7 drain must handle before Step 11.
12. **Compliance log.** `.redesign-state/compliance-log.md` — is the most recently built page blocked on an unjustified FAIL?
13. **Placeholders.** `grep -rn "NEEDS:" src/ messages/` — count remaining.
14. **Client-input deliverable.** `NEEDS_FROM_CLIENT.md` exists at project root AND its `[NEEDS:]` count matches the current grep count. Mismatch (or missing file) = re-write in Step 8 / Step 12.2.
15. **Sales brief.** `SALES_BRIEF.md` exists at project root. Missing = generate in Step 12.1. (The brief is gitignored; it will not be present on a fresh clone — that's expected.)

Report: "Steps 1-N are done. Stale lanes: <list>. Blocking findings: <count>. Starting from step <X>."

**Hard rule on "Starting from step X":**

- If any of items 1–9 is not done, jump to that step and execute.
- If 1–9 are done but built pages exist with unresolved issues, re-enter Step 6 rework cycle.
- If the site is built-through-Step-6 and has stale review lanes OR pending blocking findings, **re-enter Step 7** — do NOT jump to Step 10 or Step 11.
- Step 10 is **mandatory** before Step 11. Never skip it on resumption, regardless of whether a prior Step 10 pass exists. This is what closes the class of failures where new audits were added to the kit but an old project's Step 10 pass was considered valid. The Step 10 block writes `.redesign-state/publish-gate.md` which `/publish` reads as its gate.
- Step 12 is **mandatory** before declaring the run complete — it writes `SALES_BRIEF.md` and refreshes `NEEDS_FROM_CLIENT.md`. If you arrived via resumption and Step 11 has already published but Step 12 hasn't run (no `SALES_BRIEF.md` or stale `NEEDS_FROM_CLIENT.md`), jump straight to Step 12 — do not re-publish.

Append a one-line entry to `.redesign-state/decisions.md` recording what you resumed from and why, then proceed immediately.

---

## Step 1 — Brand Intelligence & Image Extraction

Read `.claude-plugin/skills/company-brand/SKILL.md`.

**If it still contains the "Not Yet Populated" stub:** Check `CLAUDE.md` for the **Old site domain** field.

- If CLAUDE.md has a real old site domain (not a placeholder) → Launch the **brand-intelligence agent** (Agent tool): "Crawl the old site at [domain]. Read `.claude-plugin/skills/analyze-existing-site/SKILL.md` as your runbook. Produce: populated `company-brand/SKILL.md`, `IMAGE_CATALOG.md`, old-site screenshots, and `.redesign-state/url-inventory.md`. Report back the Brand Strength Assessment, key extracted facts, image counts, and content gaps."
- If CLAUDE.md still has a placeholder for the old site domain → ask the user ONE question only: "I need an existing website URL to analyze. What's the current website address?" Then write it into CLAUDE.md and proceed with the agent spawn.
- If the user says there is no existing site → walk through the brand skill manually using `references/extraction-template.md`, filling in what you can from the company name and description in CLAUDE.md, and marking the rest as "Unknown — ask client." Do **not** spawn the brand-intelligence agent for this path — there's nothing to crawl.

**If it has real data but `public/images/IMAGE_CATALOG.md` doesn't exist:** Still spawn the brand-intelligence agent — it produces both, and partial state is how resumption bugs start.

**If both exist:** Move to Step 2.

After the agent returns, briefly relay the Brand Strength Assessment rating to the user and move on.

---

## Step 2 — Content Strategy

Check if `content-strategy.md` exists.

**If it doesn't exist:** Read the Brand Strength Assessment from the brand skill.

- If brand is **Moderate or Thin** → Launch the **content-strategist agent** (Agent tool): "Analyze the brand skill and develop a messaging strategy. The brand assessment is [rating] — focus on building messaging from the available facts and industry context."
- If brand is **Strong** → Still run the content strategist, but with a lighter prompt: "Refine and prioritize the existing messaging from the brand skill. The brand is strong — focus on hierarchy and gap identification."

**If it exists:** Move to Step 3.

---

## Step 3 — Site Planning

Read `SITE_PLAN_TEMPLATE.md`.

**If it's still generic:** Launch the **site-planner agent** (Agent tool): "Evaluate the company scope from the brand skill and content strategy (if available), and fill in SITE_PLAN_TEMPLATE.md with concrete pages, keywords, priorities, and build phases."

Briefly tell the user what pages are planned, then proceed immediately.

**If it has concrete pages:** Move to Step 4.

---

## Step 4 — Redirect Mapping

Check if `redirects.md` exists.

**If it doesn't exist and there's an old site domain in CLAUDE.md:** Read `.claude-plugin/skills/redirect-mapping/SKILL.md` (procedure runbook) and `.redesign-state/url-inventory.md` (URL list produced by brand-intelligence in Step 1). Follow the runbook to map old URLs to the new site plan's URL structure. For any unmapped URLs, make the best judgment call — redirect to the most relevant new page, or to the homepage as a fallback. Log the judgment calls to `.redesign-state/decisions.md`.

**If it doesn't exist and there's no old domain:** Skip this step.

**If it exists:** Move to Step 5.

---

## Step 5 — Design Direction + Design System (TWO sub-steps, do NOT skip 5.1)

This is the load-bearing anti-blandness phase. It has two sub-steps for a specific reason: going straight from brand attributes to tokens is what every AI-built corporate site does, and it's why they all look the same. Step 5.1 commits to a visual language *before* any token is chosen; Step 5.2 executes that language into tokens.

**If `design-direction.md` does NOT exist at the project root:** do Step 5.1.
**If it exists but `.claude-plugin/skills/design-system/SKILL.md` is still a stub:** do Step 5.2.
**If both are populated:** Move to Step 6.

### Step 5.1 — Design Direction Brief

Launch the **web-designer agent** (Agent tool): "Produce `design-direction.md` at the project root per the process in `.claude-plugin/skills/design-system/SKILL.md` Step 5.1. Read the brand skill (note the Brand Strength Assessment), `content-strategy.md`, `IMAGE_CATALOG.md`, `public/images/old-site-screenshots/`, and `.claude-plugin/skills/design-system/references/visual-vocabulary.md` (this is the library you select from — required reading, not optional). Select exactly ONE strategy per category (T/C/L/P/S/D/M). Apply the tie-breaker (non-default wins on ties) and hard-stop (re-pick if every selection is a flagged default) rules. Write the attribute→visual translation table, the site-specific Avoid list, the one-line identity test, and the 'What we're moving away from' list (derived from the old-site screenshots — structural patterns, not just token choices)."

After the agent returns, read `design-direction.md` and verify it contains: one-sentence direction, selections for all seven categories, attribute→visual translation table, Avoid list, identity test, and "What we're moving away from" list. If any are missing, spawn the agent again to fill the gap. Do NOT proceed to 5.2 with a partial brief.

Briefly relay the direction in one sentence (from the brief) and the selected strategies (e.g., "T1 + C1 + L1 + P1 + S1 + D3 + M2") to the user.

Append an entry to `.redesign-state/decisions.md` recording the direction summary.

### Step 5.2 — Tokenization

**First: verify the `frontend-design` skill is installed.** Check Claude's available-skills list for this session for an entry whose name ends in `frontend-design` (it may appear as `frontend-design` or namespaced like `frontend-design:frontend-design` depending on install source). If no such entry exists, halt the pipeline and tell the user: "The `frontend-design` skill from Anthropic's agent-skills marketplace is required for Step 6 but isn't installed. Install it, then re-run `/redesign`." Do not attempt Step 5.2 or Step 6 without it — you'd produce generic output and waste the commitment the brief just made. Log the halt in `.redesign-state/decisions.md`.

If `/frontend-design` is present, launch the **web-designer agent** (Agent tool): "Execute the Tokenization sub-step in `.claude-plugin/skills/design-system/SKILL.md`. Read `design-direction.md` (binding) and `references/visual-vocabulary.md`. Derive color, typography, spacing, component, and interaction tokens that execute each selected strategy. Write all tokens to `src/app/globals.css` under `@theme inline`. Populate the body of `design-system/SKILL.md` with the token documentation, the direction-in-one-sentence copy, and the selected strategy string. Every token decision must trace to a direction brief selection — if it doesn't, add it to the brief first."

After the agent returns, read `globals.css` and the populated `design-system/SKILL.md` — check that the direction brief's one-line identity test and Avoid list are referenced in the skill body.

**Then derive the initial `IMAGE_SLOTS.md`.** Now that the direction brief and site plan are both committed, enumerate every required image slot per route and write them to `IMAGE_SLOTS.md` at the project root. Process:

1. Read `design-direction.md` carefully — look for the committed P-strategy, the attribute→visual translation table, AND any explicit imagery clauses (e.g., "staff photos are first-class page elements," "hero is text against portrait," "service cards use material-texture imagery").
2. Read `SITE_PLAN_TEMPLATE.md` — the enumerated routes with their purpose.
3. For each route + section where the brief mandates imagery, create a `SLOT-<route>-<section>-<nnn>` row with `Resolution: pending` and the triggering brief quote verbatim in the P-strategy field. See the schema in `IMAGE_SLOTS.md`'s header.
4. Group by route, in build-phase order (Phase 0 components, then Phase 1 core pages, etc.).
5. If the brief's P-strategy is subtle (P5 Abstract Texture, P8 Diagrammatic, P7 Illustrated Editorial) — still enumerate slots for hero or section anchors where the brief implies imagery.
6. Don't guess. If a slot isn't clearly brief-mandated, don't invent it — the web-designer can add one during build if composition demands it.

This is the binding imagery contract the rest of the pipeline audits against. A missing slot here means the architect absence audit won't catch the failure.

---

## Step 6 — Build Pages

Read `SITE_PLAN_TEMPLATE.md` to get the build phases. Check which pages already exist in `src/app/\[locale\]/` (escape the brackets when invoking shell commands).

Tell the user:
> "Building pages now. You can optionally run review loops in separate terminals — they write findings to `.redesign-state/review-findings.md` which I drain between phases:
> `/loop 15m /review-architect`, `/loop 15m /review-customer`, `/loop 15m /review-a11y`
>
> I'll manage a local dev server and run browser-qa myself at each phase boundary and in the final review — it's phase-gated (not `/loop`-based) because it attaches to completed work, not wall-clock ticks. The dev server stays up after the run; you can stop it manually when you're done."

Build pages phase by phase. For EACH page or component, launch the **web-designer agent** (Agent tool) with a prompt that passes the **full direction brief context** — not just brand attributes. The prompt must include:

- Page to build and its site-plan primary keyword
- Pointer to `design-direction.md` (binding — the whole brief, including the selected strategy string, attribute→visual table, Avoid list, identity test, and "What we're moving away from" list)
- Pointer to `design-system/SKILL.md` for tokens
- Pointer to the relevant `page-design` reference file (homepage-content.md for homepage, service-pages-content.md for service pages, etc. — selective loading, do not load all references)
- For the **Contact page specifically**, also pass `contact-form/SKILL.md` (binding contract on the pre-shipped Server Action interface, env vars, error codes, translation keys, and required form structure)
- Instruction: "Use `/frontend-design` for UI implementation, feeding it the direction brief (strategies + translation table + Avoid list + identity test), design tokens, and content requirements. After the page is built, append a compliance-log entry to `.redesign-state/compliance-log.md` per the schema in that file. Every strategy must get a PASS / FAIL / JUSTIFIED verdict with a quote."

**Build order (per `SITE_PLAN_TEMPLATE.md` phases):**

1. **Phase 0** — Shared components: Header, Footer, Language Switcher, Breadcrumbs, CTA section.
2. **Phase 0 Revision Pass** (run once, after Phase 0, before Phase 1): Re-read `design-direction.md` and the built Phase 0 components side by side. If a committed strategy didn't survive contact with real UI (e.g., T6 Brutalist Display is unreadable at nav scale, M4 feels wrong on a language switcher), swap to a near-neighbor strategy in the *same* category or adjust token values within the selected strategies. Re-picking unrelated categories is **not** permitted. Append a one-line changelog entry to `design-direction.md` and to `.redesign-state/decisions.md`. After this pass, the brief is frozen.
3. **Phase 1** — Core pages: Homepage, Services (hub + details), Contact (must have a working Server Action or API route).
4. **Phase 2** — Trust & evidence: Case Studies, About.
5. **Phase 3** — Legal: Privacy, Cookies, Cookie Consent (must enforce preferences, not just display).

**After each page the web-designer returns:** Read the latest entry in `.redesign-state/compliance-log.md`.

- All `PASS` → accept the page, continue.
- Any `FAIL` with a `JUSTIFIED` row that references a concrete brand constraint over-riding the brief → accept, and log the acceptance in `.redesign-state/decisions.md`.
- Any unjustified `FAIL` → spawn the web-designer again with the specific quote: "Rework [page]: your compliance check failed on [strategy] with reason [quote]. Re-read `design-direction.md` section [X] and rebuild." Do not proceed to the next page until compliance passes.

**After each phase:**

1. Run `npm run build` to verify compilation. If it fails, fix it before continuing.

2. **Phase-gated browser QA.** Ensure a local dev server is up before invoking browser-qa — the orchestrator manages the server lifecycle in this flow (do NOT delegate this to the user). Procedure:

   a. Probe: `curl -sI http://localhost:3000 --max-time 5 | head -1`. If it returns `HTTP/... 200`, the server is already running — proceed to step (c).
   b. Otherwise, start it in the background using the Bash tool with `run_in_background: true`: `npm run dev`. Then poll the same curl every 2 seconds for up to 60 seconds. As soon as it returns 200, proceed. If it never returns 200 (port collision, build error, missing dependency), append one line to `.redesign-state/decisions.md`: "browser-qa skipped at <phase> boundary — dev server failed to start: <reason from BashOutput>" and continue with the next step (do NOT halt the pipeline; the gate will YELLOW-flag this later).
   c. With the server confirmed up, launch the **browser-qa agent** (Agent tool) with instructions: "Do a phase-boundary browser QA pass. Apply the readiness protocol per `.claude-plugin/agents/browser-qa.md`. Scope: full sampled route set at mobile 375 + desktop 1440, all configured locales for `/` and `/contact`. Verify rendered behavior, rendered fidelity to `design-direction.md`, and identify visual gaps (including hero sections with no image). Append findings to `.redesign-state/review-findings.md` with reviewer `browser-qa`; save screenshots to `.redesign-state/screenshots/` per the naming schema. Honor existing `gap-image` dispositions (don't re-raise `rejected` or `converted`)."

   The dev server is left running for subsequent phase boundaries and the Step 7 final review; it is NOT shut down between phases.

3. **Drain** `.redesign-state/review-findings.md`:
   - For each unhandled finding (architect, customer-perspective, a11y, browser-qa), decide: apply now (critical+blocking), defer (note in the finding's status line), or reject (log reasoning in `.redesign-state/decisions.md`).
   - All `blocking: yes` findings must be handled before the next phase starts.
   - Any architect finding citing a `design-direction.md` violation is blocking, regardless of how the reviewer phrased it.
   - Any browser-qa finding with severity `critical` and category `rendered-behavior` or `rendered-fidelity` is blocking; `gap-image` and `console-error`/`network-error` are not blocking by default but require explicit disposition (route `gap-image` findings to web-designer — the designer either adds an `IMG-...` row to `IMAGE_REQUESTS.md` and marks disposition `converted`, or marks `rejected` with reason).
   - For mechanical fixes, apply inline. For judgment calls or multi-file changes, spawn the web-designer with the specific finding(s) and wait for compliance-log entry.

Briefly tell the user what was built and proceed to the next phase without waiting.

---

## Step 7 — Final Review

Drain any remaining findings in `.redesign-state/review-findings.md` first, then run the full final review pass.

1. Launch the **architect agent** (Agent tool): "Do a full-site coherence review. Design Distinctiveness is the first and blocking dimension — for every built page, verify it executes `design-direction.md` (selected strategies, attribute→visual translation, Avoid list, identity test, and 'What we're moving away from' list). Report any drift back to AI defaults as Critical. Also check design consistency, plan adherence, technical quality, multilingual coherence, and architectural cross-cutting concerns (forms submit, translations complete, error boundaries present, security headers, legal pages localized). Do NOT check WCAG details — that's the accessibility-auditor's lane."

2. Launch the **customer-perspective agent** (Agent tool): "Review the Homepage, Services hub, and Contact page from a buyer's perspective. Be brutally honest about what would make someone reach out or leave."

3. Launch the **accessibility-auditor agent** (Agent tool): "Run a comprehensive WCAG 2.1 AA accessibility audit across all built pages. Check semantic HTML, contrast, keyboard navigation, ARIA, forms, focus management, motion preferences. Tag each finding as [AUTO-FIX] (mechanical, single-file) or [NEEDS DESIGNER]."

4. **Browser-qa final pass.** Ensure the dev server is up (the orchestrator should already have started it during Step 6; if not, start it now using the same procedure as the Step 6 phase-boundary block — background `npm run dev` + 60s poll). Once it's up, launch the **browser-qa agent** (Agent tool): "Final browser QA pass across the full sampled route set. Mobile + desktop, all configured locales for `/` and `/contact`. Apply the readiness protocol per `.claude-plugin/agents/browser-qa.md`. Verify rendered behavior, rendered fidelity to `design-direction.md` (fonts actually loaded at display weights, accent color behaves as accent not field, committed P-strategy visible in the rendered output), and identify any remaining visual gaps. Append findings to `.redesign-state/review-findings.md`." If the dev server fails to start, append one line to `.redesign-state/decisions.md`: "browser-qa skipped in final review — dev server failed to start: <reason>" and surface it as a YELLOW gap in the status summary. Do not halt the pipeline; fall back to the other reviewers' findings.

Apply critical fixes the agents surface. Distinctiveness violations from the architect are Critical and blocking — spawn web-designer to rework. Apply `[AUTO-FIX]` findings from the a11y-auditor inline. Route `[NEEDS DESIGNER]` findings to web-designer. Route browser-qa findings per the severity rules in the phase-drain section above — critical rendered-behavior/rendered-fidelity are blocking; `gap-image` findings go to web-designer for disposition.

---

## Step 8 — Content Audit

Search for all `[NEEDS:]` markers:
```bash
grep -rn "NEEDS:" src/ messages/ SITE_PLAN_TEMPLATE.md
```

For markers that can be drafted from brand context, launch the **web-designer agent** to draft replacement text. For markers that genuinely need client input, keep them.

**Write the client-input deliverable.** After drafting, re-run the grep across `src/`, `messages/`, `public/images/IMAGE_REQUESTS.md`, and `SITE_PLAN_TEMPLATE.md`, then write a structured summary to `NEEDS_FROM_CLIENT.md` at the project root. Format:

```markdown
# Content Still Needed From Client

> One-paragraph header (rewrite for this project): explain that every item below is a `[NEEDS:]` marker the build couldn't fill from extracted brand context. The site is live with placeholders rendered with a dashed amber border (`.placeholder-content` class) so they're visible. The client should reply per item; the agency will swap the marker for real content and republish via `/publish`.

## Summary
- **Total markers:** <N>
- **By type:** <copy: N> · <factual data: N> · <imagery: N> · <other: N>
- **By page:** <homepage: N>, <about: N>, <services hub: N>, <each service: N>, <case studies: N>, <contact: N>, <legal: N>

## Items by page

### Homepage
- `messages/en.json:42` — `[NEEDS: Founding-year quote for hero stats band]` — single sentence the client can supply.
- `src/app/[locale]/page.tsx:118` — `[NEEDS: ...]` — ...

### About
- ...

### Services — <service name>
- ...

(Continue for every page that has markers. Group `messages/<locale>.json` markers under the page they appear on, not under "translations".)

## Imagery
- `IMG-IMG-hero-01` (`public/images/IMAGE_REQUESTS.md`) — short description of what the client can supply if they have it, vs. what we'll generate if not. Include the slot ID so the client and agency can match it back.
- ...

## Notes for the client
- The dashed amber outlines on the live site mark exactly where these gaps are — clicking through pages is the fastest tour.
- Anything left blank past <date the agency commits to> will be filled with generated/AI-sourced content per the agency's house policy.
```

Each item is one bullet: file path + line number, the marker text verbatim, and a one-line note explaining what the client should provide. Group by page (route) so the client can review one page at a time. The file is committed to the repo so it travels with the project.

Briefly report to the user: total remaining count, the file that was written, and the top 3 categories of input still needed.

---

## Step 9 — SEO Validation

Read `.claude-plugin/skills/seo-patterns/SKILL.md` for the validation checklist, then audit and fix:
1. Every page has a unique title tag and meta description
2. Every page has JSON-LD schema markup per the seo-patterns skill templates
3. Pages cross-link to related content
4. Heading hierarchy is clean (one h1 per page, logical h2/h3)
5. All images use `next/image` with descriptive alt text
6. `src/app/sitemap.ts` includes all built pages with hreflang alternates
7. `src/app/robots.ts` allows indexing
8. Redirects in `next.config.ts` are valid (if redirect mapping was done)
9. Canonical URLs set correctly across locale versions
10. No duplicate title tags

Fix issues as you find them — don't just report them.

---

## Step 10 — Production Readiness Check

Verify every item systematically. Read these skill files for reference:
- `.claude-plugin/skills/performance-budget/SKILL.md`
- `.claude-plugin/skills/analytics-tracking/SKILL.md`
- `.claude-plugin/skills/legal-compliance/SKILL.md`

### Functionality
1. **Contact form** — `ContactForm.tsx` imports `submitContactForm` from `@/lib/contact/submit-contact-form` (do not allow forks of the pre-shipped action); honeypot field `name="website"` rendered visually-hidden via off-screen positioning (NOT `display:none`); `RESEND_API_KEY` + `CONTACT_FROM_EMAIL` + `CONTACT_SITE_NAME` set in Vercel env; `CONTACT_FROM_NAME` set in Vercel env (optional — falls back to site name if unset); `CONTACT_RECIPIENT_EMAIL` either set OR a `[NEEDS:client to provide contact form recipient email]` marker exists; all four error codes (`validation_failed`, `bot_detected`, `send_failed`, `config_missing`) translated in every configured locale. See `contact-form/SKILL.md` for the full contract.
2. **Cookie consent enforces** — analytics blocked until consent given
3. **Event tracking** — form submissions and CTA clicks fire tracking events

### Security
4. **Security headers** in `next.config.ts` (CSP, X-Frame-Options, etc.)
5. **Error boundaries** styled and present (`error.tsx`, `not-found.tsx`, `loading.tsx`)

### Accessibility
6. **Keyboard navigation** — all interactive elements keyboard-operable
7. **Focus indicators** — custom `focus-visible` styles in globals.css
8. **Color contrast** — meets WCAG AA

### Localization
9. **Legal pages translated** in all configured locales
10. **All UI strings** from `next-intl` (zero hardcoded English)

### Performance
11. **`npm run build` succeeds** with no errors
12. **Images** use `next/image` with proper `sizes`
13. **Fonts** via `next/font` with `display: swap`

### Redirects (if applicable)
14. **All old URLs** have 301 redirects configured
15. **No redirect loops**

Fix issues as you find them.

**After the checklist is worked through, write the publish gate.** The publish gate is a single file `.redesign-state/publish-gate.md` that encodes whether the project is safe to ship. `/publish` refuses to run if the gate is missing, stale, or FAIL. Write this EVERY time Step 10 runs — even if you resumed mid-flight, this file must be fresh at the end of Step 10. Evaluate these checks and write PASS or FAIL for each:

1. **Build green** — `npm run build` succeeds.
2. **Review lanes fresh** — every lane (`architect`, `customer`, `a11y`, `browser-qa`) has a run-log entry in `.redesign-state/review-findings.md` with `plugin=<current version>` (read current from `.claude-plugin/plugin.json`). No lane is stale. If `browser-qa` was skipped because the orchestrator's dev-server-start attempt failed (port collision, build error, missing dependency), flag the lane as `skipped-with-reason: dev-server-failed-to-start` — that counts as a yellow-flag in the gate but does not block by itself. (`/redesign` now manages the dev server itself, so this YELLOW state is rare — it usually indicates an environment issue worth investigating.)
3. **No pending blockers** — no finding in `review-findings.md` has `status: pending` AND `blocking: yes`.
4. **No deferred blockers** — no finding has `status: deferred` AND `blocking: yes`. A blocking finding cannot be deferred-to-publish.
5. **Deferrals are publish-allowed** — every `status: deferred` finding has `publish-allowed: yes` AND a `reason:` field filled with substantive content. Any missing or empty `publish-allowed` on a deferred finding = FAIL.
6. **Rejected criticals are evidence-backed** — every `status: rejected` + `blocking: yes` finding has a substantive `reason:` citing concrete evidence (brief quote, spec reference, live verification). Vague reasons = FAIL.
7. **Image slots resolved** — every slot in `IMAGE_SLOTS.md` has a terminal Resolution (`catalog-reuse`, `manifest-row`, `image-present`, or `justified-none`). Any `pending` = FAIL.
8. **IMAGE_SLOTS.md fresh** — recorded `design-direction-hash` and `site-plan-hash` match the current hashes. Stale = FAIL.
9. **Production readiness checklist items 1–15 above** — all PASS.

Write the gate file in this exact shape so `/publish` can parse it:

```markdown
# Publish Gate

**Computed at:** <ISO timestamp>
**Commit:** <git rev-parse --short HEAD>
**Plugin version:** <value from plugin.json>
**Overall:** PASS | FAIL

## Checks
| # | Check | Result | Notes |
|---|-------|--------|-------|
| 1 | Build green | PASS \| FAIL | <reason if FAIL> |
| 2 | Review lanes fresh | PASS \| YELLOW \| FAIL | <list of stale lanes> |
| 3 | No pending blockers | PASS \| FAIL | <count, finding IDs> |
| 4 | No deferred blockers | PASS \| FAIL | <finding IDs> |
| 5 | Deferrals publish-allowed | PASS \| FAIL | <bad deferrals> |
| 6 | Rejected criticals evidence-backed | PASS \| FAIL | <bad rejections> |
| 7 | Image slots resolved | PASS \| FAIL | <unresolved slot IDs> |
| 8 | IMAGE_SLOTS.md fresh | PASS \| FAIL | <stale input> |
| 9 | Production readiness | PASS \| FAIL | <which items failed> |

## Blockers to resolve before publish

*(List of specific next actions the user or web-designer must take — one per line. Empty if Overall is PASS.)*
```

`Overall: PASS` requires every check PASS (YELLOW on check 2 does NOT block). Any FAIL on checks 1, 3–9 = `Overall: FAIL`.

---

## Step 11 — Publish

**Never skip Step 10.** If you arrived here via resumption and Step 10's gate file is missing or older than HEAD / `IMAGE_SLOTS.md` / `review-findings.md`, go back and re-run Step 10 first.

1. Verify `.redesign-state/publish-gate.md` exists and is fresh (newer than the most recent commit on the current branch). If missing or stale, re-run Step 10.
2. If `Overall: FAIL`, stop. Report the blockers section to the user. Do NOT invoke `/publish`.
3. If `Overall: PASS`, invoke `/publish`. The publish command will re-read the gate as a second layer of protection.

After publish completes, proceed immediately to Step 12. Do not pause for confirmation.

---

## Step 12 — Sales Brief + Wrap-Up

This step closes the run. It produces the salesperson-facing brief and the final consolidated handoff report so the user has a complete picture without re-reading the run log.

### 12.1 — Generate the sales brief

Follow the procedure in `.claude/commands/sales-brief.md` inline (do NOT spawn an agent — the sales-brief command is explicit that it's a synthesis task done in the current context). The pipeline has just produced every input it requires (`company-brand/SKILL.md`, `content-strategy.md`, `design-direction.md`, old-site screenshots), so all prerequisites are already met. Write the output to `SALES_BRIEF.md` at the project root (gitignored).

If the publish step failed (gate FAIL), still generate the sales brief — it doesn't require publish to have succeeded, and the brief is more useful when the build artifacts exist than when they don't. Note in `.redesign-state/decisions.md` that the brief was generated despite a failed publish so the audit trail is clean.

### 12.2 — Refresh the client-input deliverable

Step 8 wrote `NEEDS_FROM_CLIENT.md` mid-pipeline. Between Step 8 and now, fixes from Steps 7/9/10 may have added or removed `[NEEDS:]` markers. Re-grep:

```bash
grep -rn "NEEDS:" src/ messages/ public/images/IMAGE_REQUESTS.md SITE_PLAN_TEMPLATE.md 2>/dev/null
```

If the count changed since `NEEDS_FROM_CLIENT.md` was written, re-write the file using the same structure as Step 8. If the count is identical and no marker text changed, leave it alone.

### 12.3 — Final wrap-up report to the user

Print a single consolidated summary in this exact shape:

```
✅ Redesign run complete.

**Built**
- <page-count> pages across <locale-count> locales
- <component-count> shared components
- Phases: 0 (shell) · 1 (core) · 2 (trust) · 3 (legal)

**Publish**
- Gate verdict: PASS | FAIL
- Commit: <short-sha> (or "no publish — gate FAIL")
- Live in 1–2 minutes at <DOMAIN from CLAUDE.md> (on PASS)

**Client input still needed** — see `NEEDS_FROM_CLIENT.md`
- <total-count> markers remaining
- Top categories: <e.g. copy: 12 · imagery: 4 · factual data: 2>
- Top pages by gap count: <homepage (5), about (3), services hub (2)>

**Sales brief** — see `SALES_BRIEF.md` (gitignored, private)
- One-sentence pitch: "<copy from the brief's first section>"

**Run state**
- Decisions log: `.redesign-state/decisions.md`
- Findings: `.redesign-state/review-findings.md`
- Publish gate: `.redesign-state/publish-gate.md`
- Browser-qa screenshots: `.redesign-state/screenshots/` (if dev server was up)

**Dev server**
- Still running on http://localhost:3000 (started by this run). Stop it with the matching BashOutput process if you don't need it.

**What's next**
- Read `NEEDS_FROM_CLIENT.md` and send the relevant items to the client.
- Tailor `SALES_BRIEF.md` before any outreach (it is verbatim extraction; a salesperson should personalize it).
- When client input arrives, swap the markers and re-run `/publish`.
```

Tailor each bullet to actual values from the run — do not leave placeholders in the printed summary.
