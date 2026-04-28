"use client";

import { useState, useEffect, useRef, startTransition } from "react";
import { useTranslations } from "next-intl";

// ─────────────────────────────────────────────
// CookieConsent — bottom-bar on first visit
// S4: 0px radius, 1px hairline top border
// C5: bone/paper bg, ink text, amber for accept
// M1: no animations — instant show/hide
// Consent stored in localStorage under COOKIE_KEY
// Analytics blocked until consent given
// ─────────────────────────────────────────────

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export const COOKIE_KEY = "cookie-consent";

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function getStoredPreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(COOKIE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent(): boolean {
  const prefs = getStoredPreferences();
  return prefs?.analytics === true;
}

function storePreferences(prefs: CookiePreferences) {
  localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs));
}

export function CookieConsent() {
  const t = useTranslations("cookies");
  // Start with banner hidden to match SSR (server has no localStorage).
  // useEffect reveals or hides based on stored preferences after hydration.
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const acceptAllRef = useRef<HTMLButtonElement>(null);

  // Hydrate consent state from localStorage after mount
  useEffect(() => {
    const stored = getStoredPreferences();
    startTransition(() => {
      setVisible(!stored);
      if (stored) setPreferences(stored);
    });
  }, []);

  // a11y-009: auto-focus the primary action when the banner becomes visible
  useEffect(() => {
    if (visible) {
      acceptAllRef.current?.focus();
    }
  }, [visible]);

  function acceptAll() {
    const prefs = { necessary: true, analytics: true, marketing: true };
    setPreferences(prefs);
    storePreferences(prefs);
    setVisible(false);
  }

  function acceptSelected() {
    storePreferences(preferences);
    setVisible(false);
  }

  function rejectOptional() {
    const prefs = { necessary: true, analytics: false, marketing: false };
    setPreferences(prefs);
    storePreferences(prefs);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookieindstillinger"
      className="fixed bottom-0 left-0 right-0 z-[90]"
      style={{
        background: "var(--color-paper)",
        borderTop: "1px solid var(--color-border)",
        // S4: no shadow, no radius
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: "var(--container-max)",
          padding: "1.75rem var(--container-pad-desktop)",
        }}
      >
        {/* Heading row */}
        <div className="flex items-start justify-between gap-6 mb-3">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-semibold)",
              fontSize: "1rem",
              color: "var(--color-ink)",
              lineHeight: "var(--line-height-snug)",
              letterSpacing: "var(--letter-spacing-tight)",
            }}
          >
            {t("title")}
          </h2>
        </div>

        {/* Description */}
        <p
          className="mb-5"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            color: "var(--color-stone)",
            lineHeight: "var(--line-height-normal)",
            maxWidth: "64ch",
          }}
        >
          {t("description")}
        </p>

        {/* Details panel — shown when user clicks "Tilpas præferencer" */}
        {showDetails && (
          <div
            className="mb-6 space-y-4"
            style={{
              borderTop: "1px solid var(--color-border)",
              paddingTop: "1.25rem",
            }}
          >
            {/* Necessary — always on, disabled */}
            <div className="flex items-start gap-4">
              <div className="flex items-center mt-0.5">
                <input
                  type="checkbox"
                  id="cookie-necessary"
                  checked
                  disabled
                  aria-disabled="true"
                  className="w-4 h-4"
                  style={{
                    accentColor: "var(--color-stone)",
                    cursor: "not-allowed",
                    borderRadius: 0,
                  }}
                />
              </div>
              <label
                htmlFor="cookie-necessary"
                className="cursor-default"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "var(--color-stone)",
                  lineHeight: "var(--line-height-normal)",
                }}
              >
                <strong
                  style={{
                    fontWeight: 600,
                    color: "var(--color-ink)",
                    display: "block",
                    marginBottom: "0.125rem",
                  }}
                >
                  {t("necessary")}
                </strong>
                {t("necessaryDesc")}
              </label>
            </div>

            {/* Analytics */}
            <div className="flex items-start gap-4">
              <div className="flex items-center mt-0.5">
                <input
                  type="checkbox"
                  id="cookie-analytics"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences((p) => ({ ...p, analytics: e.target.checked }))
                  }
                  className="w-4 h-4"
                  style={{
                    accentColor: "var(--color-accent)",
                    cursor: "pointer",
                    borderRadius: 0,
                  }}
                />
              </div>
              <label
                htmlFor="cookie-analytics"
                className="cursor-pointer"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "var(--color-stone)",
                  lineHeight: "var(--line-height-normal)",
                }}
              >
                <strong
                  style={{
                    fontWeight: 600,
                    color: "var(--color-ink)",
                    display: "block",
                    marginBottom: "0.125rem",
                  }}
                >
                  {t("analytics")}
                </strong>
                {t("analyticsDesc")}
              </label>
            </div>

            {/* Marketing */}
            <div className="flex items-start gap-4">
              <div className="flex items-center mt-0.5">
                <input
                  type="checkbox"
                  id="cookie-marketing"
                  checked={preferences.marketing}
                  onChange={(e) =>
                    setPreferences((p) => ({ ...p, marketing: e.target.checked }))
                  }
                  className="w-4 h-4"
                  style={{
                    accentColor: "var(--color-accent)",
                    cursor: "pointer",
                    borderRadius: 0,
                  }}
                />
              </div>
              <label
                htmlFor="cookie-marketing"
                className="cursor-pointer"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "var(--color-stone)",
                  lineHeight: "var(--line-height-normal)",
                }}
              >
                <strong
                  style={{
                    fontWeight: 600,
                    color: "var(--color-ink)",
                    display: "block",
                    marginBottom: "0.125rem",
                  }}
                >
                  {t("marketing")}
                </strong>
                {t("marketingDesc")}
              </label>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Primary — amber, C5 accent, accept all */}
          <button
            ref={acceptAllRef}
            onClick={acceptAll}
            style={{
              background: "var(--color-accent)",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.8125rem",
              letterSpacing: "var(--letter-spacing-wide)",
              textTransform: "uppercase",
              padding: "0.75rem 1.5rem",
              border: "none",
              borderRadius: 0,
              cursor: "pointer",
              transition: `background var(--duration-fast) var(--easing-standard)`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "var(--color-accent-hover)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "var(--color-accent)";
            }}
          >
            {t("acceptAll")}
          </button>

          {/* Secondary — ink outline, reject optional */}
          <button
            onClick={rejectOptional}
            style={{
              background: "transparent",
              color: "var(--color-ink)",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.8125rem",
              letterSpacing: "var(--letter-spacing-wide)",
              textTransform: "uppercase",
              padding: "0.75rem 1.5rem",
              border: "2px solid var(--color-ink)",
              borderRadius: 0,
              cursor: "pointer",
              transition: `border-color var(--duration-fast) var(--easing-standard), color var(--duration-fast) var(--easing-standard)`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "var(--color-stone)";
              (e.currentTarget as HTMLButtonElement).style.color =
                "var(--color-stone)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "var(--color-ink)";
              (e.currentTarget as HTMLButtonElement).style.color =
                "var(--color-ink)";
            }}
          >
            {t("rejectOptional")}
          </button>

          {/* Tertiary actions */}
          {showDetails ? (
            <button
              onClick={acceptSelected}
              style={{
                background: "transparent",
                color: "var(--color-stone)",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.8125rem",
                letterSpacing: "var(--letter-spacing-wide)",
                textTransform: "uppercase",
                padding: "0.75rem 1.5rem",
                border: "2px solid var(--color-border)",
                borderRadius: 0,
                cursor: "pointer",
                transition: `border-color var(--duration-fast) var(--easing-standard), color var(--duration-fast) var(--easing-standard)`,
              }}
            >
              {t("savePreferences")}
            </button>
          ) : (
            <button
              onClick={() => setShowDetails(true)}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-stone)",
                fontFamily: "var(--font-body)",
                fontSize: "0.8125rem",
                cursor: "pointer",
                textDecoration: "underline",
                textDecorationColor: "var(--color-border)",
                padding: "0.75rem 0",
                transition: `color var(--duration-fast) var(--easing-standard)`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "var(--color-ink)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "var(--color-stone)";
              }}
            >
              {t("customize")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
