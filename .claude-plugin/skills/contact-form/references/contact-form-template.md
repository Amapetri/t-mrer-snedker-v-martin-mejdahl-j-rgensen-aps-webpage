# Contact Form Template

Reference template for `ContactForm.tsx` and `src/app/[locale]/contact/page.tsx`. The web-designer copies these into the project and adapts the **styling and layout** to the committed design direction. **Do not modify** imports from `@/lib/contact/*` or the `name` attributes on form fields — those are locked by the pre-shipped action.

---

## `src/components/ContactForm.tsx`

```tsx
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';
import {
  submitContactForm,
  type ContactFormState,
} from '@/lib/contact/submit-contact-form';

const initialState: ContactFormState = { status: 'idle' };

function SubmitButton() {
  const t = useTranslations('contact');
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? t('submitting') : t('submit')}
    </button>
  );
}

export function ContactForm() {
  const t = useTranslations('contact');
  const [state, formAction] = useActionState(submitContactForm, initialState);

  if (state.status === 'success') {
    return (
      <div role="status" aria-live="polite">
        <h2>{t('success.title')}</h2>
        <p>{t('success.body')}</p>
      </div>
    );
  }

  const formError =
    state.status === 'error' && state.code !== 'validation_failed'
      ? t(`errors.${state.code}`)
      : null;
  const fieldErrors =
    state.status === 'error' && state.code === 'validation_failed'
      ? state.fieldErrors
      : undefined;

  return (
    <form action={formAction} noValidate>
      {formError && <p role="alert">{formError}</p>}

      <label>
        {t('fields.name.label')}
        <input
          name="name"
          required
          maxLength={120}
          placeholder={t('fields.name.placeholder')}
        />
        {fieldErrors?.name && (
          <span role="alert">{t('fieldErrors.name.required')}</span>
        )}
      </label>

      <label>
        {t('fields.email.label')}
        <input
          name="email"
          type="email"
          required
          maxLength={254}
          placeholder={t('fields.email.placeholder')}
        />
        {fieldErrors?.email && (
          <span role="alert">{t('fieldErrors.email.invalid')}</span>
        )}
      </label>

      <label>
        {t('fields.phone.label')}
        <input
          name="phone"
          maxLength={50}
          placeholder={t('fields.phone.placeholder')}
        />
      </label>

      <label>
        {t('fields.subject.label')}
        <input
          name="subject"
          maxLength={150}
          placeholder={t('fields.subject.placeholder')}
        />
      </label>

      <label>
        {t('fields.message.label')}
        <textarea
          name="message"
          required
          minLength={5}
          maxLength={5000}
          placeholder={t('fields.message.placeholder')}
        />
        {fieldErrors?.message && (
          <span role="alert">{t('fieldErrors.message.required')}</span>
        )}
      </label>

      {/* Honeypot — bots fill hidden fields. Off-screen positioning, NOT display:none. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
      >
        <label>
          Website (leave blank)
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <SubmitButton />

      <p>{t('privacy_text')}</p>
    </form>
  );
}
```

---

## `src/app/[locale]/contact/page.tsx`

```tsx
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('title'),
    description: t('intro'),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <main>
      <h1>{t('title')}</h1>
      <p>{t('intro')}</p>
      <ContactForm />
      {/* Add supporting content here per page-design/references/supporting-pages-content.md:
          office address, phone, hours, map embed, etc. */}
    </main>
  );
}
```

---

## Adaptation rules

- **Replace inline honeypot styles** with a class from `globals.css` (e.g. `.sr-only-input`) once the design system has it. Do not switch to `display: none` — bots skip those.
- **Style error and success states using the design direction's selected strategies.** A flat-text alert in a Brutalist (T6) layout is wrong; a pastel-tone card error in a Swiss (L1) layout is wrong.
- **Translate every visible string** via `useTranslations`. Hardcoded English will fail Step 10's locale check.
- **The honeypot label text** ("Website (leave blank)") stays in English. Bots are language-agnostic, and `aria-hidden` removes the parent from screen readers anyway.
- **Privacy text** — use the pattern in `legal-compliance/SKILL.md`'s "Form Privacy Text Pattern" section. Reference Resend as the email processor.
- **Button copy** — the design direction may want something stronger than "Send". Adjust the translation, not the structure.

## Required translation entries

Add to every configured locale's `messages/<locale>.json` under the `contact` namespace. Example for `da`:

```json
{
  "contact": {
    "title": "Kontakt",
    "intro": "Skriv til os...",
    "fields": {
      "name":    { "label": "Navn",     "placeholder": "Dit navn" },
      "email":   { "label": "E-mail",   "placeholder": "din@email.dk" },
      "phone":   { "label": "Telefon",  "placeholder": "Valgfrit" },
      "subject": { "label": "Emne",     "placeholder": "Hvad drejer det sig om?" },
      "message": { "label": "Besked",   "placeholder": "Skriv din besked her..." }
    },
    "submit": "Send",
    "submitting": "Sender...",
    "success": {
      "title": "Tak for din besked",
      "body":  "Vi vender tilbage hurtigst muligt."
    },
    "errors": {
      "validation_failed": "Tjek venligst de udfyldte felter.",
      "bot_detected":      "Indsendelsen kunne ikke verificeres. Prøv igen.",
      "send_failed":       "Vi kunne ikke sende din besked. Prøv igen om lidt eller skriv direkte til os.",
      "config_missing":    "Formularen er ved at blive sat op. Skriv venligst direkte til os via adressen nedenfor."
    },
    "fieldErrors": {
      "name":    { "required": "Skriv venligst dit navn." },
      "email":   { "invalid":  "Indtast en gyldig e-mailadresse." },
      "message": { "required": "Skriv en besked.", "too_short": "Beskeden er for kort." }
    },
    "privacy_text": "Ved at sende denne formular accepterer du, at vi behandler dine oplysninger som beskrevet i vores privatlivspolitik."
  }
}
```

Translate each string per locale; the keys themselves stay identical across locales.

## Testing locally

`npm run dev` → visit `http://localhost:3000/da/contact` (or your default-locale path) → submit a real message. The email lands in whatever `CONTACT_RECIPIENT_EMAIL` is set to in `.env.local` — set this to a developer inbox during dev.

BotID is **bypassed on localhost**; `verification.isBot` is always false. To exercise the actual classifier, deploy a Vercel preview and submit from the deployed URL.

To force the `bot_detected` code path during dev (for testing the error rendering), temporarily change the action's BotID check to `if (true)` — revert before committing.

To force the `config_missing` code path: unset `CONTACT_RECIPIENT_EMAIL` in `.env.local` and restart the dev server.
