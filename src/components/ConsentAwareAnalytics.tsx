"use client";

// ─────────────────────────────────────────────
// ConsentAwareAnalytics
// Gates Vercel Analytics behind cookie consent.
//
// Behaviour:
// - Reads localStorage["cookie-consent"] on mount
// - Only renders <Analytics /> if analytics === true
// - Listens for "cookie-consent-updated" custom event
//   so consent granted mid-session enables analytics
//   without a page refresh
// - Renders nothing if no consent or analytics not consented
//
// This component replaces direct <Analytics /> usage in layout.
// ─────────────────────────────────────────────

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { COOKIE_KEY } from "@/components/CookieConsent";

type ConsentState = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

function readConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(COOKIE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as ConsentState;
    return parsed?.analytics === true;
  } catch {
    return false;
  }
}

export function ConsentAwareAnalytics() {
  // Lazy initializer reads consent once on mount (avoids calling setState in effect body)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(() => readConsent());

  useEffect(() => {
    // Listen for consent updates (dispatched by the cookie management button
    // or future CookieConsent updates that call dispatchEvent)
    function handleConsentUpdate() {
      setAnalyticsEnabled(readConsent());
    }

    window.addEventListener("cookie-consent-updated", handleConsentUpdate);
    return () => {
      window.removeEventListener("cookie-consent-updated", handleConsentUpdate);
    };
  }, []);

  if (!analyticsEnabled) return null;

  return <Analytics />;
}
