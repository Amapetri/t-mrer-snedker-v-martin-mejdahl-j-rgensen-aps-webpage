"use client";

// ─────────────────────────────────────────────
// OpenCookieSettingsButton
// Used on the cookie policy page to let users
// re-open the consent panel and update preferences.
//
// Strategy: remove the stored consent key from
// localStorage, then dispatch "cookie-consent-updated"
// to trigger ConsentAwareAnalytics re-read, then
// reload the page so CookieConsent re-mounts
// (its visible state is derived from localStorage on mount).
//
// S4: 0px radius, 2px ink border (secondary CTA style)
// C5: no amber — this is a preference management action,
//     not a primary conversion or Byg Garanti signal
// M1: 150ms hover transition, color only
// ─────────────────────────────────────────────

import { COOKIE_KEY } from "@/components/CookieConsent";

export function OpenCookieSettingsButton({ label }: { label: string }) {
  function handleClick() {
    try {
      localStorage.removeItem(COOKIE_KEY);
      // Notify ConsentAwareAnalytics to disable analytics immediately
      window.dispatchEvent(new Event("cookie-consent-updated"));
    } catch {
      // localStorage may be unavailable in private browsing — proceed anyway
    }
    // Reload so CookieConsent component re-mounts with no stored prefs
    window.location.reload();
  }

  return (
    <button
      onClick={handleClick}
      className="focus-visible:outline-none"
      style={{
        background: "transparent",
        color: "var(--color-ink)",
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        fontSize: "0.8125rem",
        letterSpacing: "var(--letter-spacing-wide)",
        textTransform: "uppercase",
        padding: "0.875rem 1.75rem",
        border: "2px solid var(--color-ink)",
        borderRadius: 0,
        cursor: "pointer",
        display: "inline-block",
        transition: `border-color var(--duration-fast) var(--easing-standard),
                     color var(--duration-fast) var(--easing-standard)`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.borderColor = "var(--color-stone)";
        el.style.color = "var(--color-stone)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.borderColor = "var(--color-ink)";
        el.style.color = "var(--color-ink)";
      }}
    >
      {label}
    </button>
  );
}
