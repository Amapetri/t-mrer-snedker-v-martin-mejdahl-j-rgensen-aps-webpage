---
name: media-prompting
description: Patterns for translating a site's committed design direction (from `design-direction.md`) into detailed AI-image-generation prompts the human can paste into Midjourney / DALL-E / Firefly / etc. Use this skill whenever the web-designer or the `/generate-media-prompts` command needs to author or revise a row in `public/images/IMAGE_REQUESTS.md`. Manifest rows are AI-generated imagery only — never requests for professional photography, stock licenses, or real-world photoshoots. Covers P-strategy → prompt language mapping, aspect/focal conventions per role, and negative-prompt patterns that suppress AI stock-photo sheen.
---

# Media Prompting

The generation prompt for every image the site needs lives in `public/images/IMAGE_REQUESTS.md` (the manifest). This skill covers *how* to write those prompts — what goes in, what stays out, and how the committed P-strategy from `design-direction.md` constrains the language used.

The manifest is the source of truth for image requests. Code markers like `[NEEDS:image IMG-home-hero-001]` are pointers that reference a manifest row by ID — they do not duplicate the prompt.

## Core assumption — AI generation only

Every row in `IMAGE_REQUESTS.md` produces an AI-generated image. There is no commissioning path, no photoshoot budget, no stock-license purchase, and no "flag this one as needing real photography" escape hatch in this pipeline. The P-strategies (P1–P8) describe the *visual grammar* of the imagery (composition, light, subject vocabulary) — they do not describe the production method. Every committed strategy is executed via generation.

Three consequences follow:

1. **Never write a row that instructs the human to go shoot real photography.** No "requires real team photo," no "facility photo needed," no "licensed stock acceptable." If a row can't be generated, it shouldn't exist as a manifest row.
2. **If the page genuinely needs a specific real person or a specific real place** (a named founder portrait, the actual headquarters exterior, a named client's real facility), that is *not a manifest row*. It belongs as a `[NEEDS: client-supplied photo of X]` content marker — the client decides whether to supply one. This keeps the AI-generation pipeline and the client-supplied-asset pipeline cleanly separated.
3. **`IMAGE_CATALOG.md` is the only pool of real photography the site uses.** It's a fixed input from Step 1 extraction — a closed set. The web-designer reuses from it when a catalog image fits the committed P-strategy (see web-designer agent). The catalog is never added to by this skill.

## Business-type safety check — personal-service contexts

Before writing a row that generates a human figure, a service-in-progress scene, or an interior space, check the business type against the Business-type safety check in `.claude-plugin/skills/design-system/references/visual-vocabulary.md` (top of section 4). The short version:

- **Personal / single-location service** (hairdresser, barber, salon, dentist, therapist, small clinic, single-practitioner consultancy, independent restaurant, solo studio): the reader reads any photorealistic human or space as *the* practitioner or *the* premises. Do NOT write P2 / P3-with-practitioner / P6-interior manifest rows for these businesses. Route the slot to P5 Abstract Texture, P7 Illustrated Editorial, or P8 Diagrammatic instead — or to a `[NEEDS: client-supplied photo ...]` content marker if the real person/place is what the page needs.
- **Multi-location / larger service firm**: photorealistic P-strategies are available; specific named individuals and specific real premises still route to `[NEEDS: client-supplied ...]`.
- **Product / capability / industrial business**: photorealistic P-strategies are unrestricted — generated imagery reads as representative, not documentary.

If the committed brief lands on a photorealistic strategy for a personal-service business, surface the conflict rather than quietly writing the row. Either escalate to reopen the direction brief (the safer move), or execute with heavy stylization — painted/illustrated treatment, strong color-grade, or macro crops that never show a full scene — so the imagery clearly reads as art, not documentation. Unstyled photorealism is not a valid output for this bucket.

## Humans in generated imagery

Humans are allowed in generated imagery — the pipeline does not avoid them. The brief may legitimately commit to P2 Environmental Portrait, P3 Process Documentary, or similar strategies where human figures are central to the visual language. Generate them (subject to the personal-service check above).

Be considerate when doing so:

- **No identifiable likeness of real people.** The generated person must not resemble a specific real employee, founder, executive, or client. Prompts should describe role, pose, context, and appearance in general terms — never reference a specific real person's features, name, or recognizable attributes.
- **No identity claim in the rendered context.** The alt text, caption, and surrounding page copy must not assert that the generated figure *is* a specific named person ("Jane Doe, CEO"). If the page section demands a specific named person, route it to a `[NEEDS: client-supplied photo of <person>]` content marker — not a manifest row.
- **Not documentary evidence.** Synthetic imagery must never be presented as proof of a specific event, project, or achievement ("our team on-site at the XYZ build"). Generated imagery depicts *representative* situations; it does not claim to *document* real ones.
- **Prefer anonymizing framings when specific identity isn't needed.** Back-of-head, over-the-shoulder, hands-on-work, silhouette, subject out-of-focus in a working scene — these read authentic while sidestepping the identity question. Favor them over front-facing portraits in hero/environmental contexts.
- **Generic composite, not ethnically-tokenized tableaux.** Avoid the AI-default "diverse team in matching blazers, three-quarter-turned, smiling at camera." That's the signature of a generated stock tableau and violates every real P-strategy anyway.
- **Rights note always records synthetic status.** Every row producing a human figure carries a rights note that says so explicitly (see Rights section below).

## When to use

- During Step 6 page build: every time the web-designer resolves an `IMAGE_SLOTS.md` slot to `manifest-row`, it uses these patterns to write the manifest row.
- During `/generate-media-prompts`: reconciling unresolved slots, orphan markers, and orphan rows. The command is a 4-way reconciliation across `IMAGE_SLOTS.md` (authoritative slot inventory), `[NEEDS:image ...]` markers in code, `IMAGE_REQUESTS.md` rows, and installed files.

## The slot inventory is authoritative

`IMAGE_SLOTS.md` at project root enumerates every image slot the committed direction brief requires. It's derived from `design-direction.md` + `SITE_PLAN_TEMPLATE.md` at Step 5.2 end (or as a migration step at Step 0 resumption). Every slot has a `Resolution` field that must end in `catalog-reuse`, `manifest-row`, `image-present`, or `justified-none`.

When resolving a slot to `manifest-row`, the manifest row you write uses the slot's role, P-strategy quote, and context — you're not inventing; you're executing the brief-derived requirement. The ID convention `IMG-<route-slug>-<section>-<nnn>` should align with the slot ID `SLOT-<route-slug>-<section>-<nnn>` where possible (same numeric suffix) so reconciliation is cheap.

## Manifest row schema

Every row in `IMAGE_REQUESTS.md` follows this exact shape. Fields are listed in order — keep them in order so rows are scannable.

```markdown
## IMG-<route-slug>-<section>-<nnn>

- **Route / component:** <route> — <ComponentName or section label>
- **Source:** <src/app/.../page.tsx:LINE — section anchor>
- **Role:** hero | content | card | background | decorative
- **Target slot:** public/images/<category>/<filename> (extension chosen on install: .jpg / .webp / .avif)
- **Dimensions / aspect:** <px>×<px>, <w>:<h>
- **Focal point:** <center / lower-right third / top band / etc.>; <mobile crop note>
- **Alt intent:** <one-line semantic description to seed the final alt text>
- **Locale behavior:** shared asset | locale-specific (one row per locale if text is baked in — avoid by default)
- **P-strategy:** <P2 Environmental Portrait> (quote from design-direction.md: "...")
- **Prompt:**
  ```
  <ready-to-paste generation prompt — see "Prompt body" below>
  ```
- **Negative prompt:** <comma-separated list — see "Negative prompt patterns" below>
- **Rights / privacy notes:** <model release, trademark, facility-access caveats>
- **Status:** pending
- **Installed path:** *(filled when status → installed)*
```

**ID convention:** `IMG-<route-slug>-<section>-<nnn>`. Example: `IMG-home-hero-001`, `IMG-about-team-portrait-003`. The numeric suffix disambiguates multiple images in the same section. IDs are never reused — a rejected image's ID stays retired in the manifest with status `rejected` so archaeology is possible later.

**Why no prompt-version fields:** the manifest is committed markdown. `git log -p public/images/IMAGE_REQUESTS.md` answers "why was this prompt rewritten?" Don't duplicate git history in the schema.

## Prompt body — what to include

A ready-to-paste prompt is one or two paragraphs that specify, in this order:

1. **Subject** — concrete, observable. "A machinist hand-fitting a bronze bearing into a steel housing" beats "a worker in a factory."
2. **Setting** — where it is. Specific: "on a machined aluminum workbench in a dimly lit toolroom" beats "in an industrial environment."
3. **Composition** — shot type + framing + focal-point placement. "Medium close-up, subject in lower-right third, workbench extends into frame left, shallow depth of field."
4. **Light** — source + quality + direction. "Single-source overhead fluorescent with warm fill from a desk lamp, cool highlights on metal, no flash."
5. **Surface / texture language** — tied to the committed P-strategy. P1 Technical Close-Up demands machined-surface vocabulary; P5 Abstract Texture demands material-grain vocabulary; P2 Environmental Portrait demands fabric/skin/tool-worn vocabulary.
6. **Style keywords** — keep to 3–6. Include the P-strategy's implicit aesthetic (e.g., "documentary, unstaged, 35mm film grain" for P3 Process Documentary). Do NOT include "professional, high-quality, award-winning" — those are default-drift flags.
7. **Palette constraint** — cite one or two hex values from `globals.css` tokens so the generation matches the site's color system.

The prompt MUST NOT include: generator-specific syntax (`--ar`, `--style raw`, `/imagine`). The manifest is generator-agnostic — the human picks the tool and adds the flags when pasting.

## P-strategy → prompt language mapping

Each committed photography strategy carries a distinct visual grammar. The prompt body must speak that grammar. Read the committed strategy in `design-direction.md` first, then pick vocabulary from the matching block below.

### P1 — Technical Close-Up
- **Subject grammar:** part, joint, surface, fitting, edge, tolerance.
- **Setting grammar:** toolroom, inspection bay, CNC stage, assembly fixture.
- **Composition grammar:** macro, shallow depth of field, subject fills frame.
- **Light grammar:** directional, raking, single-source, specular highlights on machined surfaces.
- **Style grammar:** "documentary macro," "catalog-reference lighting," "no bokeh beads."
- **Avoid:** hands holding the part in hero shot (reads as staged), glove close-ups (cliché).

### P2 — Environmental Portrait
- **Subject grammar:** named role engaged in the work (welder mid-tack, operator at control panel, designer at drafting board).
- **Setting grammar:** working environment with visible tools of trade in supporting frame.
- **Composition grammar:** medium shot, subject off-center per rule-of-thirds, workspace extends.
- **Light grammar:** natural + one practical; avoid studio lighting.
- **Style grammar:** "unstaged documentary portrait," "35mm," "Leica-style candid."
- **Avoid:** direct camera smile, arms crossed against white wall, safety-vest product-shot pose.

### P3 — Process Documentary
- **Subject grammar:** the work happening — sparks, hand motion, transfer of parts, measurement being taken.
- **Setting grammar:** real production floor, time-of-day evidence (shift lights, dust, wear).
- **Composition grammar:** wider frame, motion implied, multiple focal layers.
- **Light grammar:** mixed-temperature, practical sources visible, cooler shadows.
- **Style grammar:** "reportage," "observational," "long-form magazine photography."
- **Avoid:** posed tableaux, clean-floor studio recreations.

### P4 — Product Studio
- **Subject grammar:** the thing alone, on seamless.
- **Setting grammar:** minimal or seamless, no prop clutter.
- **Composition grammar:** three-quarter hero angle, grounded.
- **Light grammar:** soft-box + rim light; clean gradient falloff.
- **Style grammar:** "studio product photography," "catalog reference," "clean seamless."
- **Avoid:** floating products with shadow pasted below, confetti/lifestyle props.

### P5 — Abstract Texture
- **Subject grammar:** the material itself — brushed metal, anodized aluminum, cast iron, woven composite.
- **Setting grammar:** NO setting — fill the frame with the material surface.
- **Composition grammar:** flat or near-flat perspective, grain parallel to frame axis.
- **Light grammar:** raking side-light, 20–30° angle, reveals texture.
- **Style grammar:** "material catalog," "surface study," "topographic macro."
- **Avoid:** any human element, any object, any context.

### P6 — Architectural Interior
- **Subject grammar:** the space — workshop, reception, corridor, warehouse.
- **Setting grammar:** the space IS the subject.
- **Composition grammar:** symmetrical or one-point perspective, leading lines.
- **Light grammar:** ambient + practical, wide dynamic range, windows not blown out.
- **Style grammar:** "architectural interior photography," "tripod-stabilized," "long exposure permitted."
- **Avoid:** fisheye distortion, wide-angle people-in-foreground, lifestyle staging.

### P7 — Illustrated Editorial
- **Subject grammar:** concept or metaphor — not literal photography.
- **Setting grammar:** illustrated context, flat or limited-depth.
- **Composition grammar:** editorial — single focal point, deliberate negative space.
- **Style grammar:** "editorial illustration," "flat vector with limited gradient," "print-magazine aesthetic."
- **Avoid:** photorealism, 3D rendering, stock illustration cliché (lightbulbs, chess pieces, puzzle pieces).

### P8 — Diagrammatic / Technical Drawing
- **Subject grammar:** the mechanism, system, or process as a drawing.
- **Composition grammar:** orthographic, exploded, or isometric.
- **Style grammar:** "technical illustration," "ISO line-weight conventions," "blueprint aesthetic."
- **Avoid:** photographic rendering, soft shadows, perspective ambiguity.

### P9 — Stock Photography *(anti-pattern — never generate)*
If the committed strategy is P9, stop. P9 is in the vocabulary as an anti-pattern — no site should commit to it. Check the direction brief for a real P-strategy and prompt that error to the web-designer.

## Role → dimensions table

Use these defaults unless the page design demands otherwise. Aspect ratio matters more than exact pixels — the installed asset will be resized per viewport.

| Role | Aspect | Target px (desktop) | Focal-point convention |
|------|--------|---------------------|------------------------|
| hero | 16:9 | 1920×1080 | Subject in lower-right third; mobile crops to center, subject MUST survive. |
| content | 4:3 | 1200×900 | Subject centered, 15% safe margin all sides. |
| card | 1:1 | 800×800 | Tight crop, subject dominates 70%+. |
| background | 16:9 or 21:9 | 2400×1350 / 2400×1029 | No focal — even texture across frame, avoid hot spots. |
| decorative | varies | 600×800 or 800×1200 | Off-center accents; can tolerate creative crop. |

Always include the aspect + target px + focal-point convention in the manifest row. The aspect is binding; the px is a target.

## Negative prompt patterns

Negative prompts exist to suppress the AI defaults that make generated imagery look like every other generated site. Start from this base list and add direction-specific items.

### Always exclude
- stock-photo sheen
- plastic skin, flawless skin, beauty retouching
- overly saturated, oversharpened, HDR crush
- fake smiles, staged handshakes, perfect posture
- generic open-plan office with ceiling lights
- glass skyscraper lobby, glass conference room
- product in hand in a boardroom
- text, logo, watermark, caption, signature
- three-quarter-turned diverse team in matching blazers

### Add when humans are in frame
- model release pose, catalog pose
- pointing at a laptop
- looking over shoulder at the camera
- arms crossed, hip-out stance
- recognizable real-person likeness, specific real-world celebrity, public figure
- legible name badges, identifying tattoos, readable ID cards
- diverse team tableau in matching blazers smiling at camera

### Add when industrial / product work is in frame
- spotless floor, zero wear, showroom polish
- unrealistic LED accent lighting on machinery
- color-graded teal-and-orange

### Add per committed strategy
- **P1/P5:** human elements, props, context distractions
- **P2:** studio lighting, white seamless, over-posed
- **P3:** staged recreations, perfect floor, no wear
- **P4:** lifestyle props, people in frame
- **P6:** fisheye, wide-angle distortion
- **P7:** photorealism, 3D, stock-illustration cliché (lightbulb/gears/puzzle)

## Rights, privacy, and integrity

Every row here produces an AI-generated image. The rights/privacy concerns are therefore not about model releases or facility permissions — they're about *what the synthetic output depicts and how the page presents it*.

- **Human figures (P2 and P3 contexts):** the generated person must not resemble any real employee, founder, executive, or client. The row's rights note records: `Synthetic composite figure — no identifiable real-person likeness. Not to be presented as a specific named individual.` Use anonymizing framings (back-of-head, over-the-shoulder, out-of-focus subject) whenever specific identity isn't required by the composition.
- **Leadership / founder / named-team portraits:** these are *not* manifest rows. If the page section requires a specific named person's portrait, the web-designer uses a `[NEEDS: client-supplied photo of <role/name>]` content marker in the component. That surfaces the need to the client without corrupting the AI-generation manifest.
- **Facility / workshop / office shots (P3, P6):** generate a *representative* space that fits the P-strategy — not a reproduction of the client's real facility. No identifiable signage, no real building facade, no attempt to replicate specific interior layouts. The rights note records: `Synthetic representative facility — not a depiction of the client's actual premises.` If the page genuinely needs the real headquarters or real workshop, that's a `[NEEDS: client-supplied photo]` content marker, not a manifest row.
- **Client logos and trademarked products:** never generate. Real marks are referenced through the client's brand assets (uploaded to the repo separately). If a trademark would naturally appear in the composition (e.g., a branded machine), the prompt must keep it out of frame or abstract it (generic shapes, no legible marks).
- **Documentary-evidence claim:** synthetic imagery must never be captioned, alt-texted, or surrounded by copy that claims it documents a specific event, project, customer deployment, or achievement. The rights note records: `Representative AI-generated imagery — not documentary evidence of any specific event.`
- **Faces of children, patients, vulnerable subjects:** avoid entirely. The risk of synthetic imagery being misread as real is highest in these categories, and the brief rarely needs them.

When in doubt, leave a note in the row's **Rights / privacy notes** field and surface it in the manifest summary at Step 8. Never add a note that implies the human should go photograph something — if the row can't be satisfied by generation, it doesn't belong in the manifest.

## Examples

### Example 1 — Homepage hero, P2 Environmental Portrait

```
## IMG-home-hero-001

- **Route / component:** / (homepage) — HeroSection
- **Source:** src/app/[locale]/page.tsx:42 — hero
- **Role:** hero
- **Target slot:** public/images/hero/homepage-hero
- **Dimensions / aspect:** 1920×1080, 16:9
- **Focal point:** subject in lower-right third, workbench extends into frame left; mobile crop keeps subject visible
- **Alt intent:** Machinist inspecting a precision bearing at a workbench
- **Locale behavior:** shared asset
- **P-strategy:** P2 Environmental Portrait (quote: "Environmental portraits in working context — subject shown doing the work, not posed for the camera.")
- **Prompt:**
  ```
  A machinist in a worn denim apron examining a precision bronze bearing under
  a magnifier at a machined aluminum workbench. Medium close-up, subject in
  lower-right third, workbench and tool drawers extend into frame left.
  Single-source cool overhead fluorescent with warm fill from a desk lamp;
  specular highlights on the bearing; shallow depth of field. Documentary
  portrait, 35mm film grain, unstaged. Palette biased toward graphite and
  warm brass, accent drawn from #0B3D2E (site accent).
  ```
- **Negative prompt:** stock-photo sheen, fake smile, posed handshake, safety-vest catalog pose, plastic skin, perfect floor, oversharpened, HDR, text, watermark, arms crossed, hip-out stance, recognizable real-person likeness, identifying tattoos or name badges
- **Rights / privacy notes:** Synthetic composite figure — no identifiable real-person likeness. Not to be presented as a specific named employee. Representative, not documentary. Alt text must not name an individual.
- **Status:** pending
- **Installed path:**
```

### Example 2 — Service card, P5 Abstract Texture

```
## IMG-services-cnc-card-001

- **Route / component:** /services/cnc — ServiceCard
- **Source:** src/app/[locale]/services/cnc/page.tsx:18 — card
- **Role:** card
- **Target slot:** public/images/services/cnc-card
- **Dimensions / aspect:** 800×800, 1:1
- **Focal point:** flat material fills frame; no singular focal point
- **Alt intent:** Brushed aluminum surface with visible tool-mark grain
- **Locale behavior:** shared asset
- **P-strategy:** P5 Abstract Texture (quote: "Surface-first material photography — the material is the subject.")
- **Prompt:**
  ```
  Extreme macro of brushed aluminum surface with visible tool-mark grain,
  grain parallel to frame axis. Raking side-light at 25° reveals ridge
  topology. Flat perspective, no depth. Palette: graphite to light steel,
  cool white highlights. Material catalog aesthetic, surface study, no
  subject beyond the material itself.
  ```
- **Negative prompt:** human elements, tools in frame, any object, warm tones, vignette, text, watermark, HDR, oversharpened
- **Rights / privacy notes:** none
- **Status:** pending
- **Installed path:**
```

## Writing checklist

Before adding a row to `IMAGE_REQUESTS.md`, verify:

- [ ] ID follows `IMG-<route-slug>-<section>-<nnn>` pattern
- [ ] Source cites a specific file and line
- [ ] P-strategy matches a real selection in `design-direction.md` and the quote is verbatim
- [ ] Prompt body uses the P-strategy's subject/setting/composition/light grammar
- [ ] No generator-specific syntax (`--ar`, `/imagine`) in the prompt
- [ ] Negative prompt includes the "always exclude" base + per-strategy additions
- [ ] Role + aspect + dimensions + focal-point are all filled
- [ ] Rights/privacy note is present (even if the note says "none")
- [ ] Status is `pending`
- [ ] Row is satisfiable by AI generation — no escape-hatch language asking for real photography, stock license, or client-supplied assets. If the slot actually needs a specific real person or place, it belongs in a `[NEEDS: client-supplied ...]` content marker instead, not in this manifest.
- [ ] If humans are in frame: rights note records synthetic-composite status and forbids identity claim; negative prompt includes `recognizable real-person likeness` and `legible name badges`.
- [ ] Business-type safety check passed: for personal / single-location services, no photorealistic P2 / P3-with-practitioner / P6-interior rows. Photorealism here reads as "this is THEM" and misrepresents — use P5 / P7 / P8, or heavily stylized execution, or a `[NEEDS: client-supplied photo ...]` content marker.

## Outputs — where this skill's output lands

- `public/images/IMAGE_REQUESTS.md` — the single authoritative manifest. One row per needed image, grouped by route where convenient.
- `[NEEDS:image <ID>]` markers in code — pointers to manifest rows. Do NOT duplicate prompt text in markers.
