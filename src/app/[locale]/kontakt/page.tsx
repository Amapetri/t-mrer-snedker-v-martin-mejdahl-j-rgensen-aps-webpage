// ─────────────────────────────────────────────
// Contact Page — Server Component
// L2: asymmetric two-column layout (7fr / 5fr)
// S4: 0px radius everywhere; hairline borders only
// C5: amber accent restricted to CTAs and trust signals
// T4: Zilla Slab headings, IBM Plex Sans body, IBM Plex Mono for CVR
// D2: generous vertical spacing
// SEO: ContactPage + LocalBusiness JSON-LD schema
//
// Hover states are handled via a scoped <style> block (no JS event
// handlers permitted in Server Components).
// ─────────────────────────────────────────────

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { CtaBlock } from "@/components/CtaBlock";
import { SITE_URL } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";

// ── Metadata ──────────────────────────────────

export const metadata: Metadata = {
  title: "Kontakt | Martin Mejdahl Jørgensen — Tømrer & Snedker Holstebro",
  description:
    "Ring eller skriv til Martin direkte. Tømrer & Snedker med Byg Garanti i Holstebro. +45 40 36 88 62 · martin@mejdahltoemrer.dk",
  alternates: {
    canonical: `${SITE_URL}/kontakt`,
  },
  openGraph: {
    title: "Kontakt | Martin Mejdahl Jørgensen — Tømrer & Snedker Holstebro",
    description:
      "Ring eller skriv til Martin direkte. Tømrer & Snedker med Byg Garanti i Holstebro. +45 40 36 88 62 · martin@mejdahltoemrer.dk",
    url: `${SITE_URL}/kontakt`,
  },
};

// ── Structured data ───────────────────────────

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/kontakt#contactpage`,
  name: "Kontakt Martin Mejdahl Jørgensen",
  url: `${SITE_URL}/kontakt`,
  description:
    "Kontakt Tømrer & Snedker v/ Martin Mejdahl Jørgensen ApS — ring, skriv, eller brug formularen.",
  mainEntity: {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: "Tømrer & Snedker v/ Martin Mejdahl Jørgensen ApS",
    telephone: "+4540368862",
    email: "martin@mejdahltoemrer.dk",
    vatID: "36466588",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tingagerparken 3",
      addressLocality: "Holstebro",
      addressRegion: "Mejdal/Halgård",
      postalCode: "7500",
      addressCountry: "DK",
    },
    areaServed: {
      "@type": "Country",
      name: "Denmark",
    },
    memberOf: {
      "@type": "Organization",
      name: "Dansk Byggeri",
    },
  },
};

// ── Page ──────────────────────────────────────

export default async function KontaktPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tCta = await getTranslations("cta");
  const tBreadcrumbs = await getTranslations("breadcrumbs");

  return (
    <>
      <JsonLd data={contactPageSchema} />

      {/* ── Scoped styles — hover states for Server Component links (M1: 150ms ease-out) ── */}
      <style>{`
        .kontakt-phone-link {
          font-family: var(--font-display);
          font-weight: var(--font-weight-display);
          font-size: clamp(1.5rem, 4vw, 2rem);
          line-height: var(--line-height-snug);
          color: var(--color-ink);
          text-decoration: none;
          display: block;
          transition: color var(--duration-fast) var(--easing-standard);
        }
        .kontakt-phone-link:hover {
          color: var(--color-accent);
        }
        .kontakt-email-link {
          font-family: var(--font-body);
          font-weight: var(--font-weight-semibold);
          font-size: var(--font-size-sm);
          color: var(--color-ink);
          text-decoration: underline;
          text-decoration-color: var(--color-border);
          text-underline-offset: 0.2em;
          transition: color var(--duration-fast) var(--easing-standard),
                      text-decoration-color var(--duration-fast) var(--easing-standard);
        }
        .kontakt-email-link:hover {
          color: var(--color-accent);
          text-decoration-color: var(--color-accent);
        }
        .kontakt-sidebar-hairline {
          width: 100%;
          height: 1px;
          background: var(--color-border);
          margin-bottom: var(--space-4);
        }
        @media (min-width: 1024px) {
          .kontakt-grid {
            grid-template-columns: 7fr 5fr !important;
            gap: 5rem !important;
            align-items: start !important;
          }
          .kontakt-sidebar {
            border-left: 1px solid var(--color-border);
            padding-left: var(--space-5);
            border-top: none !important;
            padding-top: 0 !important;
          }
        }
      `}</style>

      {/* ── Page header — a11y-011: use section+aria-labelledby instead of <header> to avoid duplicate banner landmark ── */}
      <section
        aria-labelledby="kontakt-h1"
        style={{
          background: "var(--color-surface-base)",
          borderBottom: "1px solid var(--color-border)",
          padding: "var(--section-gap) 0 var(--space-8) 0",
        }}
      >
        <div
          className="mx-auto"
          style={{
            maxWidth: "var(--container-max)",
            padding: "0 var(--container-pad-desktop)",
          }}
        >
          <Breadcrumbs items={[{ label: tBreadcrumbs("contact") }]} />

          {/* Section eyebrow — T4 all-caps sans label */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "var(--font-size-xs)",
              letterSpacing: "var(--letter-spacing-wide)",
              textTransform: "uppercase",
              color: "var(--color-stone)",
              marginBottom: "1rem",
            }}
          >
            {t("eyebrow")}
          </p>

          {/* Hairline rule — S4 structural signal */}
          <div
            aria-hidden="true"
            style={{
              width: "3rem",
              height: "1px",
              background: "var(--color-border)",
              marginBottom: "1.5rem",
            }}
          />

          {/* H1 — T4 Zilla Slab display */}
          <h1
            id="kontakt-h1"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2.25rem, 6vw, 3.5rem)",
              lineHeight: "var(--line-height-tight)",
              letterSpacing: "var(--letter-spacing-tight)",
              color: "var(--color-ink)",
              maxWidth: "20ch",
              marginBottom: "1.25rem",
            }}
          >
            {t("h1")}
          </h1>

          {/* Intro paragraph */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--font-size-md)",
              lineHeight: "var(--line-height-normal)",
              color: "var(--color-stone)",
              maxWidth: "58ch",
            }}
          >
            {t("intro")}
          </p>
        </div>
      </section>

      {/* ── Main content — L2 asymmetric two-column (7fr / 5fr) ── */}
      <section
        style={{
          padding: "var(--section-gap) 0",
          background: "var(--color-surface-base)",
        }}
      >
        <div
          className="mx-auto"
          style={{
            maxWidth: "var(--container-max)",
            padding: "0 var(--container-pad-desktop)",
          }}
        >
          {/* L2 editorial asymmetry — 7fr form / 5fr sidebar */}
          <div
            className="kontakt-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--space-8)",
            }}
          >
            {/* ── LEFT COLUMN: Contact Form (7fr) ── */}
            <div>
              {/* Form section label */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "var(--font-size-xs)",
                  letterSpacing: "var(--letter-spacing-wide)",
                  textTransform: "uppercase",
                  color: "var(--color-stone)",
                  marginBottom: "0.75rem",
                }}
              >
                {t("form_section_label")}
              </p>

              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-5)",
                }}
              >
                {t("form_heading")}
              </h2>

              <ContactForm />
            </div>

            {/* ── RIGHT COLUMN: Contact Details Sidebar (5fr) ── */}
            <aside
              className="kontakt-sidebar"
              aria-label="Kontaktoplysninger"
              style={{
                borderTop: "1px solid var(--color-border)",
                paddingTop: "var(--space-5)",
              }}
            >
              {/* ── Ring direkte ── */}
              <div style={{ marginBottom: "var(--space-5)" }}>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "var(--font-size-xs)",
                    letterSpacing: "var(--letter-spacing-wide)",
                    textTransform: "uppercase",
                    color: "var(--color-stone)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("sidebar_phone_label")}
                </p>
                <a
                  href="tel:+4540368862"
                  className="kontakt-phone-link"
                  aria-label="Ring til Martin Mejdahl Jørgensen på +45 40 36 88 62"
                >
                  +45 40 36 88 62
                </a>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-xs)",
                    color: "var(--color-stone)",
                    marginTop: "0.25rem",
                  }}
                >
                  {t("sidebar_phone_note")}
                </p>
              </div>

              <div className="kontakt-sidebar-hairline" aria-hidden="true" />

              {/* ── E-mail ── */}
              <div style={{ marginBottom: "var(--space-5)" }}>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "var(--font-size-xs)",
                    letterSpacing: "var(--letter-spacing-wide)",
                    textTransform: "uppercase",
                    color: "var(--color-stone)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("sidebar_email_label")}
                </p>
                <a
                  href="mailto:martin@mejdahltoemrer.dk"
                  className="kontakt-email-link"
                >
                  martin@mejdahltoemrer.dk
                </a>
              </div>

              <div className="kontakt-sidebar-hairline" aria-hidden="true" />

              {/* ── Adresse ── */}
              <div style={{ marginBottom: "var(--space-5)" }}>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "var(--font-size-xs)",
                    letterSpacing: "var(--letter-spacing-wide)",
                    textTransform: "uppercase",
                    color: "var(--color-stone)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("sidebar_address_label")}
                </p>
                <address
                  style={{
                    fontStyle: "normal",
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-sm)",
                    lineHeight: "var(--line-height-normal)",
                    color: "var(--color-ink)",
                  }}
                >
                  Tingagerparken 3<br />
                  Mejdal/Halgård<br />
                  7500 Holstebro
                </address>
              </div>

              <div className="kontakt-sidebar-hairline" aria-hidden="true" />

              {/* ── Svartid ── replaces hours placeholder (no client data yet) */}
              <div style={{ marginBottom: "var(--space-5)" }}>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "var(--font-size-xs)",
                    letterSpacing: "var(--letter-spacing-wide)",
                    textTransform: "uppercase",
                    color: "var(--color-stone)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("sidebar_response_label")}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-xs)",
                    lineHeight: "var(--line-height-normal)",
                    color: "var(--color-stone)",
                  }}
                >
                  {t("sidebar_response_text")}
                </p>
              </div>

              <div className="kontakt-sidebar-hairline" aria-hidden="true" />

              {/* ── Byg Garanti trust note — C5 accent mark, restricted to trust signals ── */}
              <div style={{ marginBottom: "var(--space-5)" }}>
                {/* Amber hairline rule — Byg Garanti is THE trust signal, receives accent treatment */}
                <div
                  aria-hidden="true"
                  style={{
                    width: "2rem",
                    height: "2px",
                    background: "var(--color-accent)",
                    marginBottom: "0.75rem",
                  }}
                />
                {/* a11y-003: amber as text on light bg fails contrast (2.81:1).
                    Amber hairline above already provides the accent signal; text is ink. */}
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "var(--font-size-xs)",
                    letterSpacing: "var(--letter-spacing-wide)",
                    textTransform: "uppercase",
                    color: "var(--color-ink)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("sidebar_byg_garanti_label")}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-xs)",
                    lineHeight: "var(--line-height-normal)",
                    color: "var(--color-stone)",
                  }}
                >
                  {t("sidebar_byg_garanti_desc")}
                </p>
              </div>

              <div className="kontakt-sidebar-hairline" aria-hidden="true" />

              {/* ── CVR — IBM Plex Mono (T4: mono for verifiable trust signals) ── */}
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "var(--font-size-xs)",
                    letterSpacing: "var(--letter-spacing-wide)",
                    textTransform: "uppercase",
                    color: "var(--color-stone)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {t("sidebar_cvr_label")}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)", // T4: mono for CVR — verifiable business identity signal
                    fontSize: "var(--font-size-sm)",
                    color: "var(--color-ink)",
                    letterSpacing: "0.03em",
                  }}
                >
                  3646 6588
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-xs)",
                    color: "var(--color-stone)",
                    marginTop: "0.25rem",
                  }}
                >
                  {t("sidebar_cvr_note")}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── CTA Block — bottom of page ── */}
      <CtaBlock
        heading={tCta("default_heading")}
        subtext={tCta("default_subtext")}
        primaryCta={{
          label: tCta("primary_label"),
          href: "/kontakt",
        }}
        secondaryCta={{
          label: tCta("secondary_label"),
          href: tCta("phone_href"),
        }}
        variant="dark"
      />
    </>
  );
}
