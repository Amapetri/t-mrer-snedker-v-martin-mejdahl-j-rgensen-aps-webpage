---
name: contact-form
description: This skill should be used when the web-designer agent is building the Contact page in Step 6 Phase 1, when the user asks to "build the contact form", "wire up the contact page", "implement the contact form", "set up Resend", or when troubleshooting contact form behavior. Defines the kit's standard contact form contract — pre-shipped Server Action infrastructure (`src/lib/contact/*`), Vercel BotID + honeypot bot defense, agency-owned Resend sending domain, environment variable schema, error-code shape for i18n, required translation keys, and the form template the web-designer adapts to design tokens.
---

# Contact Form

The kit ships working Server Action infrastructure for contact email under `src/lib/contact/*`. The web-designer's job in Step 6 Phase 1 is to build the **page and the form component** that call this action — applying the design direction's tokens, typography, and layout strategies.

This skill is the contract between pre-shipped infrastructure and the per-project UI build.

## Pre-shipped (do not modify)

The kit's locked contract for contact email:

- `src/lib/contact/contact-schema.ts` — Zod schema (`name`, `email`, `phone`, `subject`, `message`)
- `src/lib/contact/send-contact-email.ts` — Resend wrapper
- `src/lib/contact/submit-contact-form.ts` — `'use server'` action with honeypot + BotID + send
- `src/instrumentation-client.ts` — registers `/*/contact` for BotID protection (covers all locale variants via wildcard)
- `next.config.ts` — wrapped with `withBotId(withNextIntl(...))`
- `package.json` — `resend`, `zod`, `botid` dependencies

To extend (add a field, change validation, branch logic): update schema + send + action together, document in `.redesign-state/decisions.md`. Never silently fork the pre-shipped files.

## Environment variables

The action reads these at call time. `setup-website.sh` populates them automatically.

| Variable | Scope | Source |
|---|---|---|
| `RESEND_API_KEY` | Agency-shared | One-time `~/.config/website-redesign-kit/agency.env` |
| `CONTACT_FROM_EMAIL` | Agency-shared | One-time agency.env |
| `CONTACT_RECIPIENT_EMAIL` | Per site | `setup-website.sh` prompt |
| `CONTACT_SITE_NAME` | Per site | `setup-website.sh` prompt (default: company name) |
| `CONTACT_FROM_NAME` | Per site | `setup-website.sh` prompt (default: `Ny Kundehenvendelse`) — display name in recipient's inbox; falls back to `CONTACT_SITE_NAME` if unset |
| `CONTACT_SUBJECT_PREFIX` | Per site, optional | Manual; defaults to `[<CONTACT_SITE_NAME>]` |

If any of the four required vars (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_RECIPIENT_EMAIL`, `CONTACT_SITE_NAME`) is missing at runtime, the action returns `{ status: 'error', code: 'config_missing' }`. The form must surface this so the gap is visible in `/redesign` Step 10 and `NEEDS_FROM_CLIENT.md`. `CONTACT_FROM_NAME` is optional — when unset, the From line falls back to `CONTACT_SITE_NAME`.

See `references/agency-setup.md` for the one-time agency-side setup that produces `RESEND_API_KEY` and `CONTACT_FROM_EMAIL`.

## What the web-designer builds

Two files per project:

1. `src/app/[locale]/contact/page.tsx` — the contact page (form + supporting content per `page-design/references/supporting-pages-content.md`)
2. `src/components/ContactForm.tsx` — the form component

Treat the form as a first-class design surface. Apply the committed direction's selected strategies (T/C/L/P/S/D/M) to the form layout, field styling, button treatment, error states, and success state. A generic shadcn-style form is a Step 7 architect-review distinctiveness fail.

The full template lives in `references/contact-form-template.md` — copy, adapt the styling, do not change the imports or the field names.

## Form requirements (binding)

- Use `useActionState` from `react` with `submitContactForm` from `@/lib/contact/submit-contact-form`
- Submit button uses `useFormStatus().pending` for the submitting state
- Required fields: `name`, `email`, `message`. Optional: `phone`, `subject`. Field `name` attributes must match the schema exactly.
- Honeypot field `name="website"` rendered visually-hidden via off-screen positioning (NOT `display: none` — many bots skip those):
  ```tsx
  <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
    <label>Website (leave blank)<input name="website" tabIndex={-1} autoComplete="off" /></label>
  </div>
  ```
  The label text is intentionally English — bots are language-agnostic, and screen readers treat the `aria-hidden` parent as removed from the accessibility tree.
- On `state.status === 'success'`: render a translated success block. Keep it persistent — don't rely on a toast that disappears.
- On `state.status === 'error'`: localize via `state.code`. Codes are `validation_failed`, `bot_detected`, `send_failed`, `config_missing`. For `validation_failed`, also read `state.fieldErrors?.<name>` and render inline per field.

For `contact.errors.config_missing` translations: write a message that's visible-but-graceful — e.g. "Form is being configured. Please email us directly at the address below." This catches the case where the site ships before recipient email is set.

## Required translation keys

The web-designer must add these to **every configured locale's** `messages/<locale>.json`:

```
contact.title, contact.intro
contact.fields.{name,email,phone,subject,message}.{label,placeholder}
contact.submit, contact.submitting
contact.success.{title,body}
contact.errors.{validation_failed,bot_detected,send_failed,config_missing}
contact.fieldErrors.name.required
contact.fieldErrors.email.invalid
contact.fieldErrors.message.{required,too_short}
contact.privacy_text   (per legal-compliance/SKILL.md form-data section)
```

Hardcoded English fails Step 10's locale check.

## Pipeline integration

- **Step 6 Phase 1** (Contact page build): web-designer reads this skill + `references/contact-form-template.md`, builds `page.tsx` + `ContactForm.tsx`
- **Step 6 brief-compliance self-check**: add the line "Form `name` attributes match `contact-schema.ts` exactly (PASS / FAIL)"
- **Step 10 production readiness**: gates env vars present, action wired, honeypot visually-hidden (not `display:none`), `checkBotId` in the action chain, all translation keys present in all locales
- **Step 12 wrap-up**: missing `CONTACT_RECIPIENT_EMAIL` triggers a `[NEEDS:client to provide contact form recipient email]` marker that surfaces in `NEEDS_FROM_CLIENT.md`

## Cross-references

- **`legal-compliance/SKILL.md`** — privacy text near the form (legitimate interest, no consent checkbox), Resend disclosure in the privacy policy as a US sub-processor under SCCs
- **`page-design/references/supporting-pages-content.md`** — content alongside the form (address, phone, map, hours)
- **`design-system/SKILL.md`** — tokens for inputs, buttons, focus rings, error/success states

## Local development behavior (important)

- BotID **always returns `isBot: false` on localhost**. The form works in `npm run dev` without any BotID classification — useful for testing, but means localhost cannot exercise the bot-block path.
- Resend has no sandbox in this flow — emails go to whatever `CONTACT_RECIPIENT_EMAIL` is set to. During dev, set this to a developer-controlled inbox.
- To exercise BotID's actual classifier, deploy a Vercel preview and submit from there.

## Additional Resources

- **`references/contact-form-template.md`** — full `ContactForm.tsx` and `page.tsx` template the web-designer copies and adapts
- **`references/agency-setup.md`** — one-time agency-side setup (Resend account, domain verification, DPA, agency.env file). Read once by the kit owner.
