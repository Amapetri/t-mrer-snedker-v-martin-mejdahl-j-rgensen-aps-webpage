// ─────────────────────────────────────────────
// Cookie Policy — /cookies/
// Full cookie disclosure with table and preference management.
// Server Component — interactive button imported as client component.
//
// T4: Zilla Slab section headings, IBM Plex Sans body
//     IBM Plex Mono for cookie names / technical values
// C5: bone background, ink text
// S4: 0px radius, 1px hairlines — cookie table uses hairline rows
// D2: clear typographic hierarchy for legal/technical content
// ─────────────────────────────────────────────

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { OpenCookieSettingsButton } from "@/components/OpenCookieSettingsButton";
import { Link } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cookies_policy" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ── Cookie inventory data ─────────────────────
// These are factual records — not from translations since they
// must be technically precise and are not localised copy.

const cookieInventory = [
  {
    type: "Nødvendig",
    name: "cookie-consent",
    purpose: "Gemmer dine cookiepræferencer",
    duration: "1 år",
    provider: "1. part (mejdahltoemrer.dk)",
  },
  {
    type: "Analyse",
    name: "_vercel_speed_insights",
    purpose: "Anonym mål af sidens ydeevne (Core Web Vitals)",
    duration: "Session",
    provider: "Vercel, Inc.",
  },
  {
    type: "Analyse",
    name: "va_*",
    purpose: "Anonym besøgsstatistik — sidevisninger og navigation",
    duration: "1 år",
    provider: "Vercel, Inc.",
  },
];

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cookies_policy");

  return (
    <>
      {/* Scoped styles */}
      <style>{`
        .cookies-section {
          padding-top: var(--space-7);
          padding-bottom: var(--space-5);
          border-top: 1px solid var(--color-border);
        }
        .cookies-section:first-of-type {
          border-top: none;
          padding-top: var(--space-5);
        }

        /* Cookie table — responsive: stacked on mobile, table on desktop */
        .cookie-table-wrapper {
          overflow-x: auto;
          margin-top: var(--space-4);
          border: 1px solid var(--color-border);
          border-radius: 0;
        }
        .cookie-table {
          width: 100%;
          border-collapse: collapse;
          font-family: var(--font-body);
          font-size: var(--font-size-xs);
        }
        .cookie-table thead tr {
          border-bottom: 2px solid var(--color-border);
          background: var(--color-surface-card);
        }
        .cookie-table thead th {
          padding: 0.75rem 1rem;
          text-align: left;
          font-family: var(--font-body);
          font-weight: 600;
          font-size: var(--font-size-xs);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: var(--color-stone);
          white-space: nowrap;
        }
        .cookie-table tbody tr {
          border-bottom: 1px solid var(--color-border);
        }
        .cookie-table tbody tr:last-child {
          border-bottom: none;
        }
        .cookie-table tbody td {
          padding: 0.75rem 1rem;
          color: var(--color-ink);
          vertical-align: top;
          line-height: var(--line-height-normal);
        }
        .cookie-table tbody td:first-child {
          font-weight: 600;
          white-space: nowrap;
        }
        .cookie-name-cell {
          font-family: var(--font-mono) !important;
          font-size: 0.75rem !important;
          letter-spacing: 0.03em;
          color: var(--color-ink);
        }
        .cookie-type-necessary {
          color: var(--color-stone) !important;
          font-weight: 600 !important;
        }
        .cookie-type-analytics {
          color: var(--color-stone) !important;
          font-weight: 600 !important;
        }

        /* Inline link */
        .cookies-inline-link {
          color: var(--color-ink);
          text-decoration: underline;
          text-decoration-color: var(--color-border);
          text-underline-offset: 0.2em;
          transition: color var(--duration-fast) var(--easing-standard),
                      text-decoration-color var(--duration-fast) var(--easing-standard);
        }
        .cookies-inline-link:hover {
          color: var(--color-accent);
          text-decoration-color: var(--color-accent);
        }

        /* Category badge */
        .cookie-badge {
          display: inline-block;
          padding: 0.2rem 0.5rem;
          border: 1px solid var(--color-border);
          border-radius: 0;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--color-stone);
          white-space: nowrap;
        }
      `}</style>

      {/* ── Page header ── */}
      <header
        style={{
          background: "var(--color-surface-base)",
          borderBottom: "1px solid var(--color-border)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--space-8)",
        }}
      >
        <div
          className="mx-auto"
          style={{
            maxWidth: "var(--container-max)",
            padding: "0 var(--container-pad-desktop)",
          }}
        >
          <Breadcrumbs items={[{ label: t("breadcrumb") }]} />

          {/* Eyebrow */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "var(--font-size-xs)",
              letterSpacing: "var(--letter-spacing-wide)",
              textTransform: "uppercase",
              color: "var(--color-stone)",
              marginBottom: "1rem",
              marginTop: "var(--space-3)",
            }}
          >
            {t("eyebrow")}
          </p>

          {/* Hairline rule — S4 structural */}
          <div
            aria-hidden="true"
            style={{
              width: "3rem",
              height: "1px",
              background: "var(--color-border)",
              marginBottom: "1.5rem",
            }}
          />

          {/* H1 — T4 Zilla Slab */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              lineHeight: "var(--line-height-tight)",
              letterSpacing: "var(--letter-spacing-tight)",
              color: "var(--color-ink)",
              marginBottom: "1.25rem",
            }}
          >
            {t("h1")}
          </h1>

          {/* Intro */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--font-size-md)",
              lineHeight: "var(--line-height-normal)",
              color: "var(--color-stone)",
              maxWidth: "64ch",
              marginBottom: "var(--space-3)",
            }}
          >
            {t("intro")}
          </p>

          {/* Last updated */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "var(--font-size-xs)",
              letterSpacing: "var(--letter-spacing-wide)",
              color: "var(--color-stone)",
              textTransform: "uppercase",
            }}
          >
            {t("updated_label")}: {t("updated_date")}
          </p>
        </div>
      </header>

      {/* ── Main content ── */}
      <main
        style={{
          background: "var(--color-surface-base)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
        }}
      >
        <div
          className="mx-auto"
          style={{
            maxWidth: "var(--container-max)",
            padding: "0 var(--container-pad-desktop)",
          }}
        >
          <div style={{ maxWidth: "72ch" }}>

            {/* ── Section 1: Hvad er cookies? ── */}
            <section className="cookies-section" aria-labelledby="cookies-s1">
              <h2
                id="cookies-s1"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-3)",
                }}
              >
                {t("section1_heading")}
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-sm)",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "var(--space-3)",
                }}
              >
                {t("section1_body1")}
              </p>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-sm)",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                }}
              >
                {t("section1_body2")}
              </p>
            </section>

            {/* ── Section 2: Cookie inventory table ── */}
            <section className="cookies-section" aria-labelledby="cookies-s2">
              <h2
                id="cookies-s2"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-3)",
                }}
              >
                {t("section2_heading")}
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-sm)",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "var(--space-2)",
                }}
              >
                {t("section2_intro")}
              </p>

              {/* Cookie table */}
              <div className="cookie-table-wrapper">
                <table className="cookie-table" aria-label="Oversigt over cookies">
                  <thead>
                    <tr>
                      <th scope="col">{t("section2_col_type")}</th>
                      <th scope="col">{t("section2_col_name")}</th>
                      <th scope="col">{t("section2_col_purpose")}</th>
                      <th scope="col">{t("section2_col_duration")}</th>
                      <th scope="col">{t("section2_col_provider")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookieInventory.map((cookie, i) => (
                      <tr key={i}>
                        <td>
                          <span className="cookie-badge">{cookie.type}</span>
                        </td>
                        <td className="cookie-name-cell">
                          <code
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.75rem",
                              background: "var(--color-surface-card)",
                              padding: "0.1rem 0.35rem",
                              border: "1px solid var(--color-border)",
                              borderRadius: 0,
                            }}
                          >
                            {cookie.name}
                          </code>
                        </td>
                        <td style={{ color: "var(--color-stone)" }}>
                          {cookie.purpose}
                        </td>
                        <td
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.75rem",
                            color: "var(--color-stone)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {cookie.duration}
                        </td>
                        <td style={{ color: "var(--color-stone)" }}>
                          {cookie.provider}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── Section 3: Nødvendige cookies ── */}
            <section className="cookies-section" aria-labelledby="cookies-s3">
              <h2
                id="cookies-s3"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-3)",
                }}
              >
                {t("section3_heading")}
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-sm)",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                }}
              >
                {t("section3_body")}
              </p>
            </section>

            {/* ── Section 4: Analyse-cookies ── */}
            <section className="cookies-section" aria-labelledby="cookies-s4">
              <h2
                id="cookies-s4"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-3)",
                }}
              >
                {t("section4_heading")}
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-sm)",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                }}
              >
                {t("section4_body")}
              </p>
            </section>

            {/* ── Section 5: Marketing-cookies ── */}
            <section className="cookies-section" aria-labelledby="cookies-s5">
              <h2
                id="cookies-s5"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-3)",
                }}
              >
                {t("section5_heading")}
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-sm)",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                }}
              >
                {t("section5_body")}
              </p>
            </section>

            {/* ── Section 6: Administrer præferencer — interactive ── */}
            <section
              className="cookies-section"
              aria-labelledby="cookies-s6"
              style={{
                background: "var(--color-surface-card)",
                border: "1px solid var(--color-border)",
                padding: "var(--space-6)",
                marginTop: "var(--space-5)",
              }}
            >
              <h2
                id="cookies-s6"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-3)",
                }}
              >
                {t("section6_heading")}
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-sm)",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "var(--space-4)",
                }}
              >
                {t("section6_body")}
              </p>

              {/* Client component — the only interactive element on this page */}
              <OpenCookieSettingsButton label={t("section6_button")} />

              {/* Browser cookie instructions */}
              <div style={{ marginTop: "var(--space-6)" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "var(--font-size-sm)",
                    color: "var(--color-ink)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("section6_browser_heading")}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-sm)",
                    lineHeight: "var(--line-height-normal)",
                    color: "var(--color-stone)",
                  }}
                >
                  {t("section6_browser_body")}
                </p>
              </div>
            </section>

            {/* ── Section 7: Opdatering ── */}
            <section className="cookies-section" aria-labelledby="cookies-s7">
              <h2
                id="cookies-s7"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-3)",
                }}
              >
                {t("section7_heading")}
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-sm)",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "var(--space-3)",
                }}
              >
                {t("section7_body")}
              </p>

              <Link
                href="/privatlivspolitik"
                className="cookies-inline-link"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "var(--font-size-sm)",
                }}
              >
                {t("section7_privacy_link")} →
              </Link>
            </section>

          </div>
        </div>
      </main>
    </>
  );
}
