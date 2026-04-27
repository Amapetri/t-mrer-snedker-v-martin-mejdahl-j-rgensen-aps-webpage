"use client";

// ─────────────────────────────────────────────
// Error boundary — /[locale]/error.tsx
// On-brand Danish error page.
//
// T4: Zilla Slab heading, IBM Plex Sans body
// C5: bone background, ink text — no amber
// S4: 0px radius on button
// M1: 150ms hover transition
// ─────────────────────────────────────────────

import { useTranslations } from "next-intl";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  return (
    <>
      <style>{`
        .error-retry-btn {
          display: inline-block;
          background: transparent;
          color: var(--color-ink);
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 0.8125rem;
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          padding: 0.875rem 1.75rem;
          border: 2px solid var(--color-ink);
          border-radius: 0;
          cursor: pointer;
          transition: border-color var(--duration-fast) var(--easing-standard),
                      color var(--duration-fast) var(--easing-standard);
        }
        .error-retry-btn:hover {
          border-color: var(--color-stone);
          color: var(--color-stone);
        }
        .error-retry-btn:focus-visible {
          outline: 2px solid var(--color-accent);
          outline-offset: 2px;
        }
      `}</style>

      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--section-gap) var(--container-pad-desktop)",
          background: "var(--color-surface-base)",
        }}
      >
        <div style={{ maxWidth: "44ch" }}>
          {/* Error code — IBM Plex Mono, muted */}
          <p
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "5rem",
              fontWeight: 400,
              color: "var(--color-border)",
              lineHeight: 1,
              marginBottom: "var(--space-4)",
              letterSpacing: "-0.02em",
            }}
          >
            500
          </p>

          {/* Hairline rule — S4 structural */}
          <div
            aria-hidden="true"
            style={{
              width: "3rem",
              height: "1px",
              background: "var(--color-border)",
              marginBottom: "var(--space-4)",
            }}
          />

          {/* Heading — T4 Zilla Slab */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              lineHeight: "var(--line-height-tight)",
              letterSpacing: "var(--letter-spacing-tight)",
              color: "var(--color-ink)",
              marginBottom: "var(--space-3)",
            }}
          >
            {t("title")}
          </h1>

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--font-size-sm)",
              lineHeight: "var(--line-height-normal)",
              color: "var(--color-stone)",
              marginBottom: "var(--space-6)",
            }}
          >
            {t("description")}
          </p>

          {/* Retry button */}
          <button
            onClick={reset}
            className="error-retry-btn"
          >
            {t("tryAgain")}
          </button>
        </div>
      </div>
    </>
  );
}
