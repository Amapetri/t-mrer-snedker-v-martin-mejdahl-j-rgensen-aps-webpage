"use client";

// ─────────────────────────────────────────────
// ContactForm — Primary lead generation form
// S4: 0px radius on all inputs, select, textarea, button
// C5: amber accent for submit CTA; focus ring in accent
// T4: IBM Plex Sans body; labels in semibold, wide tracking
// M1: 150ms transitions on button hover and input focus
// S4 structural logic: bottom-border inputs only, no surrounding box
// Honeypot: bot_field positioned off-screen via CSS, NOT display:none
// ─────────────────────────────────────────────

import { useState, useTransition, useId, useRef } from "react";
import { submitContactForm } from "@/lib/contact/submit-contact-form";

type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

type FormState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success" }
  | { status: "error"; message: string };

// Maps the kit action's structured error codes to the localized fallback
// shown above the submit button. Per-field validation errors are still
// surfaced inline below their input.
const ERROR_MESSAGES: Record<string, string> = {
  validation_failed: "Tjek venligst de markerede felter og prøv igen.",
  bot_detected: "Vi kunne ikke verificere din indsendelse. Genindlæs siden og prøv igen.",
  send_failed: "Beskeden kunne ikke sendes. Ring til os på 40 36 88 62 eller skriv til martin@mejdahltoemrer.dk.",
  config_missing: "Formularen er under opsætning. Skriv direkte til martin@mejdahltoemrer.dk.",
};

const SUBJECT_OPTIONS = [
  "Tagrenovering",
  "Tilbygning",
  "Vinduer & Døre",
  "Isolering",
  "Garage/Carport",
  "Fugtskade",
  "Andet",
] as const;

// ── Shared input style (S4: bottom-border only, 0px radius) ──

const inputBase: React.CSSProperties = {
  width: "100%",
  fontFamily: "var(--font-body)",
  fontSize: "var(--font-size-sm)",
  color: "var(--color-ink)",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid var(--color-border)",
  borderRadius: 0, // S4: 0px radius — non-negotiable
  padding: "0.625rem 0",
  outline: "none",
  transition: `border-color var(--duration-fast) var(--easing-standard)`,
  lineHeight: "var(--line-height-normal)",
  appearance: "none",
  WebkitAppearance: "none",
};

const labelBase: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-body)",
  fontWeight: "var(--font-weight-semibold)" as React.CSSProperties["fontWeight"],
  fontSize: "var(--font-size-xs)",
  letterSpacing: "var(--letter-spacing-wide)",
  textTransform: "uppercase" as React.CSSProperties["textTransform"],
  color: "var(--color-text-secondary)",
  marginBottom: "0.375rem",
};

// ── Field wrapper ─────────────────────────────

function Field({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", marginBottom: "1.75rem" }}>
      {children}
    </div>
  );
}

// ── Error message ─────────────────────────────

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <span
      id={id}
      role="alert"
      aria-live="polite"
      style={{
        display: "block",
        marginTop: "0.375rem",
        fontFamily: "var(--font-body)",
        fontSize: "var(--font-size-xs)",
        color: "#b91c1c", // accessible red, not in design system but required for error semantics
        lineHeight: "var(--line-height-snug)",
      }}
    >
      {message}
    </span>
  );
}

// ── Main component ────────────────────────────

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState<FormState>({ status: "idle" });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<string, string>>>({});

  // Unique IDs for aria-describedby linkage
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const subjectId = useId();
  const messageId = useId();
  const nameErrId = `${nameId}-err`;
  const emailErrId = `${emailId}-err`;
  const subjectErrId = `${subjectId}-err`;
  const messageErrId = `${messageId}-err`;

  const formRef = useRef<HTMLFormElement>(null);

  // ── Focus state management for S4 bottom-border highlight ──
  // We style focus via JS because Tailwind v4 in CSS-first mode doesn't
  // easily reach CSS variables in arbitrary-value pseudo-states inline.
  function handleFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.currentTarget.style.borderBottomWidth = "2px";
    e.currentTarget.style.borderBottomColor = "var(--color-accent)";
  }
  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.currentTarget.style.borderBottomWidth = "1px";
    e.currentTarget.style.borderBottomColor = "var(--color-border)";
  }

  // ── Client-side validation ────────────────────
  function validateFields(data: ContactFormData): Partial<Record<string, string>> {
    const errors: Partial<Record<string, string>> = {};
    if (!data.name.trim() || data.name.trim().length < 2) {
      errors.name = "Navn er påkrævet (mindst 2 tegn).";
    }
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errors.email = "Angiv en gyldig e-mailadresse.";
    }
    if (!data.subject) {
      errors.subject = "Vælg venligst et emne.";
    }
    if (!data.message.trim() || data.message.trim().length < 20) {
      errors.message = "Beskriv dit projekt (mindst 20 tegn).";
    }
    return errors;
  }

  // ── Submit handler ────────────────────────────
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const raw = new FormData(form);

    const data: ContactFormData = {
      name: (raw.get("name") as string) ?? "",
      email: (raw.get("email") as string) ?? "",
      phone: (raw.get("phone") as string) ?? "",
      subject: (raw.get("subject") as string) ?? "",
      message: (raw.get("message") as string) ?? "",
    };

    // Client-side validation first — stricter than the kit's Zod schema
    // (subject required from dropdown, message ≥20 chars). Server still
    // re-validates via Zod regardless.
    const clientErrors = validateFields(data);
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      return;
    }
    setFieldErrors({});

    setFormState({ status: "loading" });

    startTransition(async () => {
      const result = await submitContactForm({ status: "idle" }, raw);
      if (result.status === "success") {
        setFormState({ status: "success" });
        formRef.current?.reset();
      } else if (result.status === "error") {
        // Map kit error codes to a top-line message + (for validation_failed)
        // server-side per-field errors that didn't trip client-side validation.
        const message = ERROR_MESSAGES[result.code] ?? ERROR_MESSAGES.send_failed;
        setFormState({ status: "error", message });
        if (result.code === "validation_failed" && result.fieldErrors) {
          const errs: Partial<Record<string, string>> = {};
          if (result.fieldErrors.name) errs.name = "Angiv dit navn.";
          if (result.fieldErrors.email) errs.email = "Angiv en gyldig e-mailadresse.";
          if (result.fieldErrors.message) errs.message = "Beskriv dit projekt.";
          setFieldErrors(errs);
        }
      }
    });
  }

  // ── Success state ─────────────────────────────
  if (formState.status === "success") {
    return (
      <div
        role="alert"
        aria-live="polite"
        style={{
          padding: "2.5rem",
          border: "1px solid var(--color-border)",
          borderTop: "3px solid var(--color-accent)",
          background: "var(--color-surface-card)",
          borderRadius: 0, // S4: 0px
        }}
      >
        {/* Hairline accent mark — S4 structural signal */}
        <div
          aria-hidden="true"
          style={{
            width: "2.5rem",
            height: "2px",
            background: "var(--color-accent)",
            marginBottom: "1.25rem",
          }}
        />
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-display)" as React.CSSProperties["fontWeight"],
            fontSize: "var(--font-size-xl)",
            lineHeight: "var(--line-height-tight)",
            color: "var(--color-ink)",
            marginBottom: "0.75rem",
          }}
        >
          Tak for din henvendelse!
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--font-size-sm)",
            lineHeight: "var(--line-height-normal)",
            color: "var(--color-stone)",
          }}
        >
          Martin vender tilbage inden for 1 arbejdsdag.
        </p>
      </div>
    );
  }

  const isLoading = formState.status === "loading" || isPending;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Kontaktformular"
    >
      {/* ── Honeypot — visually hidden, NOT display:none or hidden attribute ── */}
      {/* Bots fill all visible fields; humans ignore invisible ones */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        {/* Field name "website" matches the kit action's honeypot check.
            Label kept English on purpose — bots are language-agnostic and
            screen readers ignore aria-hidden parents anyway. */}
        <label htmlFor="bot_field_input">Website (leave blank)</label>
        <input
          id="bot_field_input"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {/* ── Name ── */}
      <Field>
        <label htmlFor={nameId} style={labelBase}>
          Dit navn <span aria-hidden="true" style={{ color: "var(--color-accent)" }}>*</span>
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          autoComplete="name"
          aria-required="true"
          aria-describedby={fieldErrors.name ? nameErrId : undefined}
          aria-invalid={!!fieldErrors.name}
          style={inputBase}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Martin Hansen"
        />
        <FieldError id={nameErrId} message={fieldErrors.name} />
      </Field>

      {/* ── Email ── */}
      <Field>
        <label htmlFor={emailId} style={labelBase}>
          E-mail <span aria-hidden="true" style={{ color: "var(--color-accent)" }}>*</span>
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          aria-required="true"
          aria-describedby={fieldErrors.email ? emailErrId : undefined}
          aria-invalid={!!fieldErrors.email}
          style={inputBase}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="din@email.dk"
        />
        <FieldError id={emailErrId} message={fieldErrors.email} />
      </Field>

      {/* ── Phone ── */}
      <Field>
        <label htmlFor={phoneId} style={labelBase}>
          Telefon
        </label>
        <input
          id={phoneId}
          name="phone"
          type="tel"
          autoComplete="tel"
          style={inputBase}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="+45 12 34 56 78"
        />
      </Field>

      {/* ── Subject ── */}
      <Field>
        <label htmlFor={subjectId} style={labelBase}>
          Emne <span aria-hidden="true" style={{ color: "var(--color-accent)" }}>*</span>
        </label>
        <div style={{ position: "relative" }}>
          <select
            id={subjectId}
            name="subject"
            aria-required="true"
            aria-describedby={fieldErrors.subject ? subjectErrId : undefined}
            aria-invalid={!!fieldErrors.subject}
            defaultValue=""
            style={{
              ...inputBase,
              cursor: "pointer",
              paddingRight: "2rem", // room for custom chevron
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            <option value="" disabled>
              Vælg emne…
            </option>
            {SUBJECT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {/* Custom dropdown chevron — purely decorative */}
          <svg
            aria-hidden="true"
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              right: "0.25rem",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: "var(--color-stone)",
            }}
          >
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </div>
        <FieldError id={subjectErrId} message={fieldErrors.subject} />
      </Field>

      {/* ── Message ── */}
      <Field>
        <label htmlFor={messageId} style={labelBase}>
          Beskriv dit projekt <span aria-hidden="true" style={{ color: "var(--color-accent)" }}>*</span>
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={5}
          aria-required="true"
          aria-describedby={fieldErrors.message ? messageErrId : undefined}
          aria-invalid={!!fieldErrors.message}
          style={{
            ...inputBase,
            resize: "vertical",
            minHeight: "7.5rem",
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Beskriv gerne hvad du ønsker lavet, og giv os en idé om størrelse og tidsperspektiv…"
        />
        <FieldError id={messageErrId} message={fieldErrors.message} />
      </Field>

      {/* ── Server-side error message ── */}
      {formState.status === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            marginBottom: "1.5rem",
            padding: "1rem 1.25rem",
            borderLeft: "3px solid #b91c1c",
            background: "#fef2f2",
            borderRadius: 0, // S4: 0px
            fontFamily: "var(--font-body)",
            fontSize: "var(--font-size-xs)",
            lineHeight: "var(--line-height-normal)",
            color: "#7f1d1d",
          }}
        >
          {formState.message ||
            "Noget gik galt. Ring til os på 40 36 88 62 eller skriv til martin@mejdahltoemrer.dk"}
        </div>
      )}

      {/* ── Required fields note — a11y-007: sr-only text makes asterisk meaningful to screen readers ── */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--font-size-xs)",
          color: "var(--color-stone)",
          marginBottom: "1.5rem",
          lineHeight: "var(--line-height-snug)",
        }}
      >
        <span className="sr-only">Alle felter markeret med stjerne (*) er påkrævet.</span>
        <span aria-hidden="true">
          Felter markeret med{" "}
          <span style={{ color: "var(--color-accent)" }}>*</span>{" "}
          er påkrævet.
        </span>
      </p>

      {/* ── Submit button — S4: 0px radius, C5: amber primary ── */}
      <button
        type="submit"
        disabled={isLoading}
        aria-disabled={isLoading}
        style={{
          display: "inline-block",
          background: isLoading ? "var(--color-clay)" : "var(--color-accent)",
          color: "#fff",
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          fontSize: "0.8125rem",
          letterSpacing: "var(--letter-spacing-wide)",
          textTransform: "uppercase",
          padding: "1rem 2.5rem",
          border: "none",
          borderRadius: 0, // S4: 0px radius — non-negotiable
          cursor: isLoading ? "not-allowed" : "pointer",
          transition: `background var(--duration-fast) var(--easing-standard)`,
          userSelect: "none",
          /* a11y-008: No outline:none — global CSS :focus-visible handles focus ring */
        }}
        onMouseEnter={(e) => {
          if (!isLoading) {
            (e.currentTarget as HTMLElement).style.background =
              "var(--color-accent-hover)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading) {
            (e.currentTarget as HTMLElement).style.background =
              "var(--color-accent)";
          }
        }}
      >
        {isLoading ? "Sender…" : "Send forespørgsel"}
      </button>
    </form>
  );
}
