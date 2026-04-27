// ─────────────────────────────────────────────
// Privacy Policy — /privatlivspolitik/
// GDPR-compliant Danish privacy policy.
// Server Component — no client interactivity.
//
// T4: Zilla Slab section headings, IBM Plex Sans body, IBM Plex Mono for data values
// C5: bone background, ink text — no amber (not a conversion or trust-signal context)
// S4: 0px radius, 1px hairlines as section dividers
// D2: editorial density — legal text benefits from clear typographic hierarchy
// L2: max 72ch prose column (legal readability), not editorial asymmetry
// ─────────────────────────────────────────────

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Link } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PrivatlivspolitikPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  return (
    <>
      {/* Scoped styles */}
      <style>{`
        .privacy-section {
          padding-top: var(--space-7);
          padding-bottom: var(--space-5);
          border-top: 1px solid var(--color-border);
        }
        .privacy-section:first-of-type {
          border-top: none;
          padding-top: var(--space-5);
        }
        .privacy-facts-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.25rem;
          padding: 0.875rem 0;
          border-bottom: 1px solid var(--color-border);
        }
        @media (min-width: 640px) {
          .privacy-facts-row {
            grid-template-columns: 10rem 1fr;
            gap: var(--space-3);
          }
        }
        .privacy-facts-row:first-child {
          border-top: 1px solid var(--color-border);
        }
        .privacy-rights-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .privacy-rights-list li {
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--color-border);
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          line-height: var(--line-height-normal);
          color: var(--color-ink);
        }
        .privacy-rights-list li:first-child {
          border-top: 1px solid var(--color-border);
        }
        .privacy-inline-link {
          color: var(--color-ink);
          text-decoration: underline;
          text-decoration-color: var(--color-border);
          text-underline-offset: 0.2em;
          transition: color var(--duration-fast) var(--easing-standard),
                      text-decoration-color var(--duration-fast) var(--easing-standard);
        }
        .privacy-inline-link:hover {
          color: var(--color-accent);
          text-decoration-color: var(--color-accent);
        }
      `}</style>

      {/* ── Page header — a11y-011: section+aria-labelledby avoids duplicate banner landmark ── */}
      <section
        aria-labelledby="privacy-h1"
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
            id="privacy-h1"
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
      </section>

      {/* ── Main content — legal prose ── */}
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
          {/* Max-width prose column for legal readability */}
          <div style={{ maxWidth: "72ch" }}>

            {/* ── Section 1: Dataansvarlig ── */}
            <section className="privacy-section" aria-labelledby="section1">
              <h2
                id="section1"
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
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-3)",
                }}
              >
                {t("section1_body")}
              </p>

              {/* Company identity block — IBM Plex Mono for codes */}
              <div
                style={{
                  borderLeft: "2px solid var(--color-border)",
                  paddingLeft: "var(--space-4)",
                  marginTop: "var(--space-3)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "var(--font-size-sm)",
                    color: "var(--color-ink)",
                    marginBottom: "0.375rem",
                  }}
                >
                  {t("section1_name")}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--font-size-xs)",
                    color: "var(--color-stone)",
                    marginBottom: "0.25rem",
                    letterSpacing: "0.03em",
                  }}
                >
                  {t("section1_cvr")}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-xs)",
                    color: "var(--color-stone)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {t("section1_address")}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-xs)",
                    color: "var(--color-stone)",
                  }}
                >
                  {t("section1_email_label")}{" "}
                  <a
                    href="mailto:martin@mejdahltoemrer.dk"
                    className="privacy-inline-link"
                  >
                    {t("section1_email")}
                  </a>
                </p>
              </div>
            </section>

            {/* ── Section 2: Hvilke personoplysninger ── */}
            <section className="privacy-section" aria-labelledby="section2">
              <h2
                id="section2"
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
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-4)",
                }}
              >
                {t("section2_body")}
              </p>

              {/* Kontaktformular */}
              <div style={{ marginBottom: "var(--space-4)" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "var(--font-size-sm)",
                    color: "var(--color-ink)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("section2_contact_heading")}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-sm)",
                    lineHeight: "var(--line-height-normal)",
                    color: "var(--color-stone)",
                  }}
                >
                  {t("section2_contact_body")}
                </p>
              </div>

              {/* Analytics */}
              <div style={{ marginBottom: "var(--space-4)" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "var(--font-size-sm)",
                    color: "var(--color-ink)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("section2_analytics_heading")}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-sm)",
                    lineHeight: "var(--line-height-normal)",
                    color: "var(--color-stone)",
                  }}
                >
                  {t("section2_analytics_body")}
                </p>
              </div>

              {/* Cookies */}
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "var(--font-size-sm)",
                    color: "var(--color-ink)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("section2_cookies_heading")}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-sm)",
                    lineHeight: "var(--line-height-normal)",
                    color: "var(--color-stone)",
                  }}
                >
                  {t("section2_cookies_body")}
                </p>
              </div>
            </section>

            {/* ── Section 3: Formål ── */}
            <section className="privacy-section" aria-labelledby="section3">
              <h2
                id="section3"
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
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-4)",
                }}
              >
                {t("section3_body")}
              </p>

              {/* Besvarelse af henvendelser */}
              <div style={{ marginBottom: "var(--space-4)" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "var(--font-size-sm)",
                    color: "var(--color-ink)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("section3_contact_heading")}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-sm)",
                    lineHeight: "var(--line-height-normal)",
                    color: "var(--color-stone)",
                  }}
                >
                  {t("section3_contact_body")}
                </p>
              </div>

              {/* Statistisk analyse */}
              <div style={{ marginBottom: "var(--space-4)" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "var(--font-size-sm)",
                    color: "var(--color-ink)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("section3_analytics_heading")}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-sm)",
                    lineHeight: "var(--line-height-normal)",
                    color: "var(--color-stone)",
                  }}
                >
                  {t("section3_analytics_body")}
                </p>
              </div>

              {/* Andre formål — placeholder */}
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "var(--font-size-sm)",
                    color: "var(--color-ink)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("section3_other_label")}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-sm)",
                    lineHeight: "var(--line-height-normal)",
                    color: "var(--color-stone)",
                  }}
                >
                  {t("section3_other_body")}
                </p>
              </div>
            </section>

            {/* ── Section 4: Retsgrundlag ── */}
            <section className="privacy-section" aria-labelledby="section4">
              <h2
                id="section4"
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
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-3)",
                }}
              >
                {t("section4_body")}
              </p>

              {/* Legal basis items */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-2)",
                }}
              >
                <li
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-sm)",
                    lineHeight: "var(--line-height-normal)",
                    color: "var(--color-stone)",
                    paddingLeft: "var(--space-3)",
                    borderLeft: "1px solid var(--color-border)",
                  }}
                >
                  {t("section4_contact_basis")}
                </li>
                <li
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-sm)",
                    lineHeight: "var(--line-height-normal)",
                    color: "var(--color-stone)",
                    paddingLeft: "var(--space-3)",
                    borderLeft: "1px solid var(--color-border)",
                  }}
                >
                  {t("section4_analytics_basis")}
                </li>
              </ul>
            </section>

            {/* ── Section 5: Opbevaringsperiode ── */}
            <section className="privacy-section" aria-labelledby="section5">
              <h2
                id="section5"
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
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-4)",
                }}
              >
                {t("section5_body")}
              </p>

              {/* Retention table — a11y-010: native <table> with column headers */}
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontFamily: "var(--font-body)",
                }}
              >
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="privacy-table-header"
                      style={{
                        textAlign: "left",
                        fontWeight: 600,
                        fontSize: "var(--font-size-xs)",
                        color: "var(--color-stone)",
                        letterSpacing: "var(--letter-spacing-wide)",
                        textTransform: "uppercase",
                        padding: "0.875rem 0",
                        borderBottom: "1px solid var(--color-border)",
                        width: "10rem",
                      }}
                    >
                      Datakategori
                    </th>
                    <th
                      scope="col"
                      style={{
                        textAlign: "left",
                        fontWeight: 600,
                        fontSize: "var(--font-size-xs)",
                        color: "var(--color-stone)",
                        letterSpacing: "var(--letter-spacing-wide)",
                        textTransform: "uppercase",
                        padding: "0.875rem 0 0.875rem var(--space-3)",
                        borderBottom: "1px solid var(--color-border)",
                      }}
                    >
                      Opbevaringsperiode
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      style={{
                        fontWeight: 600,
                        fontSize: "var(--font-size-xs)",
                        color: "var(--color-stone)",
                        letterSpacing: "var(--letter-spacing-wide)",
                        textTransform: "uppercase",
                        padding: "0.875rem 0",
                        borderBottom: "1px solid var(--color-border)",
                        textAlign: "left",
                        verticalAlign: "top",
                      }}
                    >
                      {t("section5_contact_label")}
                    </th>
                    <td
                      style={{
                        fontSize: "var(--font-size-sm)",
                        color: "var(--color-ink)",
                        lineHeight: "var(--line-height-normal)",
                        padding: "0.875rem 0 0.875rem var(--space-3)",
                        borderBottom: "1px solid var(--color-border)",
                        verticalAlign: "top",
                      }}
                    >
                      {t("section5_contact_value")}
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      style={{
                        fontWeight: 600,
                        fontSize: "var(--font-size-xs)",
                        color: "var(--color-stone)",
                        letterSpacing: "var(--letter-spacing-wide)",
                        textTransform: "uppercase",
                        padding: "0.875rem 0",
                        borderBottom: "1px solid var(--color-border)",
                        textAlign: "left",
                        verticalAlign: "top",
                      }}
                    >
                      {t("section5_analytics_label")}
                    </th>
                    <td
                      style={{
                        fontSize: "var(--font-size-sm)",
                        color: "var(--color-ink)",
                        lineHeight: "var(--line-height-normal)",
                        padding: "0.875rem 0 0.875rem var(--space-3)",
                        borderBottom: "1px solid var(--color-border)",
                        verticalAlign: "top",
                      }}
                    >
                      {t("section5_analytics_value")}
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      style={{
                        fontWeight: 600,
                        fontSize: "var(--font-size-xs)",
                        color: "var(--color-stone)",
                        letterSpacing: "var(--letter-spacing-wide)",
                        textTransform: "uppercase",
                        padding: "0.875rem 0",
                        borderBottom: "1px solid var(--color-border)",
                        textAlign: "left",
                        verticalAlign: "top",
                      }}
                    >
                      {t("section5_deletion_label")}
                    </th>
                    <td
                      style={{
                        fontSize: "var(--font-size-sm)",
                        color: "var(--color-ink)",
                        lineHeight: "var(--line-height-normal)",
                        padding: "0.875rem 0 0.875rem var(--space-3)",
                        borderBottom: "1px solid var(--color-border)",
                        verticalAlign: "top",
                      }}
                    >
                      {t("section5_deletion_value")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* ── Section 6: Dine rettigheder ── */}
            <section className="privacy-section" aria-labelledby="section6">
              <h2
                id="section6"
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
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-4)",
                }}
              >
                {t("section6_body")}
              </p>

              {/* Rights list */}
              <ul className="privacy-rights-list" style={{ marginBottom: "var(--space-4)" }}>
                {[
                  t("section6_access"),
                  t("section6_rectification"),
                  t("section6_erasure"),
                  t("section6_restriction"),
                  t("section6_objection"),
                  t("section6_portability"),
                ].map((right, i) => (
                  <li key={i}>
                    <strong
                      style={{
                        fontWeight: 600,
                        display: "block",
                        marginBottom: "0.125rem",
                        color: "var(--color-ink)",
                      }}
                    >
                      {right.split(":")[0]}:
                    </strong>
                    {right.split(":").slice(1).join(":").trim()}
                  </li>
                ))}
              </ul>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-sm)",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-2)",
                }}
              >
                {t("section6_contact_intro")}
              </p>

              <address
                style={{
                  fontStyle: "normal",
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-sm)",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "var(--space-4)",
                }}
              >
                <a
                  href="mailto:martin@mejdahltoemrer.dk"
                  className="privacy-inline-link"
                >
                  martin@mejdahltoemrer.dk
                </a>
              </address>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-sm)",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                }}
              >
                {t("section6_complaint")}
              </p>
            </section>

            {/* ── Section 7: Cookies ── */}
            <section className="privacy-section" aria-labelledby="section7">
              <h2
                id="section7"
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
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-3)",
                }}
              >
                {t("section7_body")}
              </p>

              <Link
                href="/cookies"
                className="privacy-inline-link"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "var(--font-size-sm)",
                }}
              >
                {t("section7_link_text")} →
              </Link>
            </section>

            {/* ── Section 8: Dataoverførsler ── */}
            <section className="privacy-section" aria-labelledby="section8">
              <h2
                id="section8"
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
                {t("section8_heading")}
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-sm)",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                }}
              >
                {t("section8_body")}
              </p>
            </section>

            {/* ── Section 9: Kontakt ── */}
            <section className="privacy-section" aria-labelledby="section9">
              <h2
                id="section9"
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
                {t("section9_heading")}
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-sm)",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-4)",
                }}
              >
                {t("section9_body")}
              </p>

              {/* Contact details — a11y-010: native <table> with column headers */}
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontFamily: "var(--font-body)",
                }}
              >
                <thead>
                  <tr>
                    <th
                      scope="col"
                      style={{
                        textAlign: "left",
                        fontWeight: 600,
                        fontSize: "var(--font-size-xs)",
                        color: "var(--color-stone)",
                        letterSpacing: "var(--letter-spacing-wide)",
                        textTransform: "uppercase",
                        padding: "0.875rem 0",
                        borderBottom: "1px solid var(--color-border)",
                        width: "10rem",
                      }}
                    >
                      Oplysning
                    </th>
                    <th
                      scope="col"
                      style={{
                        textAlign: "left",
                        fontWeight: 600,
                        fontSize: "var(--font-size-xs)",
                        color: "var(--color-stone)",
                        letterSpacing: "var(--letter-spacing-wide)",
                        textTransform: "uppercase",
                        padding: "0.875rem 0 0.875rem var(--space-3)",
                        borderBottom: "1px solid var(--color-border)",
                      }}
                    >
                      Detaljer
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      style={{
                        fontWeight: 600,
                        fontSize: "var(--font-size-xs)",
                        color: "var(--color-stone)",
                        letterSpacing: "var(--letter-spacing-wide)",
                        textTransform: "uppercase",
                        padding: "0.875rem 0",
                        borderBottom: "1px solid var(--color-border)",
                        textAlign: "left",
                        verticalAlign: "top",
                      }}
                    >
                      {t("section9_email_label")}
                    </th>
                    <td
                      style={{
                        padding: "0.875rem 0 0.875rem var(--space-3)",
                        borderBottom: "1px solid var(--color-border)",
                        verticalAlign: "top",
                      }}
                    >
                      <a
                        href="mailto:martin@mejdahltoemrer.dk"
                        className="privacy-inline-link"
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "var(--font-size-sm)",
                        }}
                      >
                        martin@mejdahltoemrer.dk
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      style={{
                        fontWeight: 600,
                        fontSize: "var(--font-size-xs)",
                        color: "var(--color-stone)",
                        letterSpacing: "var(--letter-spacing-wide)",
                        textTransform: "uppercase",
                        padding: "0.875rem 0",
                        borderBottom: "1px solid var(--color-border)",
                        textAlign: "left",
                        verticalAlign: "top",
                      }}
                    >
                      {t("section9_phone_label")}
                    </th>
                    <td
                      style={{
                        padding: "0.875rem 0 0.875rem var(--space-3)",
                        borderBottom: "1px solid var(--color-border)",
                        verticalAlign: "top",
                      }}
                    >
                      <a
                        href="tel:+4540368862"
                        className="privacy-inline-link"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "var(--font-size-sm)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        +45 40 36 88 62
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      style={{
                        fontWeight: 600,
                        fontSize: "var(--font-size-xs)",
                        color: "var(--color-stone)",
                        letterSpacing: "var(--letter-spacing-wide)",
                        textTransform: "uppercase",
                        padding: "0.875rem 0",
                        borderBottom: "1px solid var(--color-border)",
                        textAlign: "left",
                        verticalAlign: "top",
                      }}
                    >
                      {t("section9_address_label")}
                    </th>
                    <td
                      style={{
                        padding: "0.875rem 0 0.875rem var(--space-3)",
                        borderBottom: "1px solid var(--color-border)",
                        verticalAlign: "top",
                      }}
                    >
                      <address
                        style={{
                          fontStyle: "normal",
                          fontFamily: "var(--font-body)",
                          fontSize: "var(--font-size-sm)",
                          color: "var(--color-ink)",
                          lineHeight: "var(--line-height-normal)",
                        }}
                      >
                        Tingagerparken 3<br />
                        Mejdal/Halgård<br />
                        7500 Holstebro
                      </address>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

          </div>
        </div>
      </main>
    </>
  );
}
