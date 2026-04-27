// ─────────────────────────────────────────────
// About Page — /om-os/
// Primary keyword: tømrer Martin Mejdahl Holstebro Byg Garanti
//
// T4: Zilla Slab H1 at page-header scale. IBM Plex Mono for CVR and facts.
// L2: 7fr/5fr asymmetric — text left, portrait right. Portrait is FIRST-CLASS.
//     Values section: L2 asymmetric 2+2 layout (not equal 4-up).
// S4: 0px radius everywhere — portrait placeholder included.
// C5: amber restricted to Byg Garanti trust signal and primary CTA only.
// D2: 120px section gaps.
// M1: 150ms hover transitions via scoped CSS. No parallax, no scroll animation.
// P3: No AI-generated portrait. Placeholder is typographic — stone-toned, first-class.
// ─────────────────────────────────────────────

import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBlock } from "@/components/CtaBlock";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site-config";

// ── Metadata ──────────────────────────────────

export const metadata: Metadata = {
  title:
    "Om Martin Mejdahl Jørgensen — Tømrer & Snedker Holstebro | Byg Garanti",
  description:
    "Tømrer & Snedker v/ Martin Mejdahl Jørgensen ApS. Byg Garanti certificeret. Base i Holstebro, arbejder hele landet. CVR 3646 6588. Ring: +45 40 36 88 62.",
  alternates: {
    canonical: `${SITE_URL}/om-os`,
  },
  openGraph: {
    title:
      "Om Martin Mejdahl Jørgensen — Tømrer & Snedker Holstebro | Byg Garanti",
    description:
      "Tømrer & Snedker v/ Martin Mejdahl Jørgensen ApS. Byg Garanti certificeret. Base i Holstebro, arbejder hele landet. CVR 3646 6588. Ring: +45 40 36 88 62.",
    url: `${SITE_URL}/om-os`,
  },
};

// ── Structured data — Organization + Person ───

const aboutSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Tømrer & Snedker v/ Martin Mejdahl Jørgensen ApS",
    url: SITE_URL,
    telephone: "+4540368862",
    email: "martin@mejdahltoemrer.dk",
    taxID: "36466588",
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
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "Byg Garanti",
      recognizedBy: {
        "@type": "Organization",
        name: "Dansk Byggeri",
      },
    },
    memberOf: {
      "@type": "Organization",
      name: "Dansk Byggeri",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#martin`,
    name: "Martin Mejdahl Jørgensen",
    jobTitle: "Tømrermester og indehaver",
    worksFor: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Holstebro",
      postalCode: "7500",
      addressCountry: "DK",
    },
    telephone: "+4540368862",
    email: "martin@mejdahltoemrer.dk",
  },
];

// ── Page ──────────────────────────────────────

export default async function OmOsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <>
      {/* JSON-LD — two separate schemas: Organization and Person */}
      <JsonLd data={aboutSchema[0]} />
      <JsonLd data={aboutSchema[1]} />

      {/* ── Scoped styles — hover states for Server Component (M1: 150ms ease-out) ── */}
      <style>{`
        /* Portrait placeholder — S4: 0px radius, C5: stone/clay palette, distinct visual treatment */
        .om-os-portrait-placeholder {
          width: 100%;
          aspect-ratio: 4 / 5;
          min-height: 420px;
          background: #ede8df;
          border: 2px solid var(--color-clay);
          border-radius: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
        }
        /* Textural cross-hatch overlay — not a gradient, a CSS pattern */
        .om-os-portrait-placeholder::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 24px,
              rgba(122, 112, 101, 0.07) 24px,
              rgba(122, 112, 101, 0.07) 25px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 24px,
              rgba(122, 112, 101, 0.07) 24px,
              rgba(122, 112, 101, 0.07) 25px
            );
          pointer-events: none;
          border-radius: 0;
        }
        /* Amber corner mark — C5: accent restricted to trust signal / decision moments */
        .om-os-portrait-placeholder::after {
          content: "NEEDS CONTENT";
          position: absolute;
          top: 0;
          right: 0;
          background: var(--color-accent);
          color: #fff;
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: var(--letter-spacing-wide);
          padding: 0.25rem 0.625rem;
          border-radius: 0;
        }

        /* Company facts panel */
        .om-os-facts-row {
          display: grid;
          grid-template-columns: 8rem 1fr;
          gap: 0;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--color-border);
        }
        .om-os-facts-row:first-child {
          border-top: 1px solid var(--color-border);
        }

        /* Values grid — L2 asymmetric 2+2: first row 7fr/5fr, second row 5fr/7fr */
        .om-os-values-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        @media (min-width: 1024px) {
          .om-os-values-grid {
            grid-template-columns: 7fr 5fr;
          }
          /* Second value card in first row — narrow */
          /* Third value card spans 5fr column, fourth spans 7fr — reversed */
          .om-os-value-card:nth-child(3) {
            order: 3;
          }
          .om-os-value-card:nth-child(4) {
            order: 4;
          }
        }
        @media (min-width: 1024px) {
          .om-os-values-grid-row2 {
            grid-template-columns: 5fr 7fr !important;
          }
        }

        /* Main content split — 7fr/5fr on desktop */
        .om-os-main-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-8);
          align-items: start;
        }
        @media (min-width: 1024px) {
          .om-os-main-grid {
            grid-template-columns: 7fr 5fr;
            gap: 5rem;
            align-items: start;
          }
        }

        /* Portrait sticky on desktop — spans several sections */
        @media (min-width: 1024px) {
          .om-os-portrait-col {
            position: sticky;
            top: 6rem;
          }
        }

        /* Certifications grid */
        .om-os-cert-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-5);
        }
        @media (min-width: 768px) {
          .om-os-cert-grid {
            grid-template-columns: 5fr 4fr 3fr;
            gap: var(--space-6);
          }
        }

        /* Inline link style for body text */
        .om-os-inline-link {
          color: var(--color-ink);
          text-decoration: underline;
          text-decoration-color: var(--color-border);
          text-underline-offset: 0.2em;
          transition: color var(--duration-fast) var(--easing-standard),
                      text-decoration-color var(--duration-fast) var(--easing-standard);
        }
        .om-os-inline-link:hover {
          color: var(--color-accent);
          text-decoration-color: var(--color-accent);
        }
      `}</style>

      {/* ── Section 1: Page header (full width) ── */}
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
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[{ label: t("breadcrumb_about") }]}
          />

          {/* Eyebrow label — T4 all-caps sans, S4 restricted use */}
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

          {/* Hairline rule — S4 structural signal, not decorative */}
          <div
            aria-hidden="true"
            style={{
              width: "3rem",
              height: "1px",
              background: "var(--color-border)",
              marginBottom: "1.5rem",
            }}
          />

          {/* H1 — T4 Zilla Slab, D2: service page scale */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2.25rem, 5.5vw, 4rem)",
              lineHeight: "var(--line-height-tight)",
              letterSpacing: "var(--letter-spacing-tight)",
              color: "var(--color-ink)",
              maxWidth: "18ch",
              marginBottom: "1.25rem",
            }}
          >
            {t("h1")}
          </h1>

          {/* Tagline — IBM Plex Sans, subdued, direct */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "var(--font-size-md)",
              lineHeight: "var(--line-height-snug)",
              color: "var(--color-stone)",
              maxWidth: "52ch",
            }}
          >
            {t("tagline")}
          </p>
        </div>
      </header>

      {/* ── Section 2: Main content — 7fr text / 5fr portrait ── */}
      <section
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
          <div className="om-os-main-grid">

            {/* ── LEFT COLUMN: 7fr — company intro + facts ── */}
            <div>
              {/* Company intro paragraphs */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-md)",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-4)",
                  maxWidth: "60ch",
                }}
              >
                {t("intro_para1")}
              </p>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-md)",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-6)",
                  maxWidth: "60ch",
                }}
              >
                {t("intro_para2")}
              </p>

              {/* Company facts panel — IBM Plex Mono for numbers */}
              <div
                style={{
                  borderRadius: 0,
                  marginTop: "var(--space-2)",
                }}
                aria-label="Virksomhedsoplysninger"
              >
                {/* Eyebrow for facts panel */}
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "var(--font-size-xs)",
                    letterSpacing: "var(--letter-spacing-wide)",
                    textTransform: "uppercase",
                    color: "var(--color-stone)",
                    marginBottom: "var(--space-2)",
                  }}
                >
                  {t("facts_heading")}
                </p>

                {/* CVR */}
                <div className="om-os-facts-row">
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "var(--font-size-xs)",
                      letterSpacing: "var(--letter-spacing-wide)",
                      textTransform: "uppercase",
                      color: "var(--color-stone)",
                      paddingRight: "var(--space-3)",
                    }}
                  >
                    {t("fact_cvr_label")}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--font-size-sm)",
                      color: "var(--color-ink)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    3646 6588
                  </span>
                </div>

                {/* Adresse */}
                <div className="om-os-facts-row">
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "var(--font-size-xs)",
                      letterSpacing: "var(--letter-spacing-wide)",
                      textTransform: "uppercase",
                      color: "var(--color-stone)",
                      paddingRight: "var(--space-3)",
                    }}
                  >
                    {t("fact_address_label")}
                  </span>
                  <address
                    style={{
                      fontFamily: "var(--font-body)",
                      fontStyle: "normal",
                      fontSize: "var(--font-size-sm)",
                      lineHeight: "var(--line-height-normal)",
                      color: "var(--color-ink)",
                    }}
                  >
                    Tingagerparken 3<br />
                    Mejdal/Halgård, 7500 Holstebro
                  </address>
                </div>

                {/* Telefon */}
                <div className="om-os-facts-row">
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "var(--font-size-xs)",
                      letterSpacing: "var(--letter-spacing-wide)",
                      textTransform: "uppercase",
                      color: "var(--color-stone)",
                      paddingRight: "var(--space-3)",
                    }}
                  >
                    {t("fact_phone_label")}
                  </span>
                  <a
                    href="tel:+4540368862"
                    className="om-os-inline-link"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--font-size-sm)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    +45 40 36 88 62
                  </a>
                </div>

                {/* E-mail */}
                <div className="om-os-facts-row">
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "var(--font-size-xs)",
                      letterSpacing: "var(--letter-spacing-wide)",
                      textTransform: "uppercase",
                      color: "var(--color-stone)",
                      paddingRight: "var(--space-3)",
                    }}
                  >
                    {t("fact_email_label")}
                  </span>
                  <a
                    href="mailto:martin@mejdahltoemrer.dk"
                    className="om-os-inline-link"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--font-size-sm)",
                    }}
                  >
                    martin@mejdahltoemrer.dk
                  </a>
                </div>

                {/* Stiftet */}
                <div className="om-os-facts-row">
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "var(--font-size-xs)",
                      letterSpacing: "var(--letter-spacing-wide)",
                      textTransform: "uppercase",
                      color: "var(--color-stone)",
                      paddingRight: "var(--space-3)",
                    }}
                  >
                    {t("fact_founded_label")}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--font-size-sm)",
                      color: "var(--color-stone)",
                      fontStyle: "italic",
                    }}
                  >
                    [NEEDS: Stiftelsesår fra kunden]
                  </span>
                </div>

                {/* Medarbejdere */}
                <div className="om-os-facts-row">
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "var(--font-size-xs)",
                      letterSpacing: "var(--letter-spacing-wide)",
                      textTransform: "uppercase",
                      color: "var(--color-stone)",
                      paddingRight: "var(--space-3)",
                    }}
                  >
                    {t("fact_employees_label")}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--font-size-sm)",
                      color: "var(--color-stone)",
                      fontStyle: "italic",
                    }}
                  >
                    [NEEDS: Antal medarbejdere]
                  </span>
                </div>

                {/* Byg Garanti */}
                <div className="om-os-facts-row">
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "var(--font-size-xs)",
                      letterSpacing: "var(--letter-spacing-wide)",
                      textTransform: "uppercase",
                      color: "var(--color-stone)",
                      paddingRight: "var(--space-3)",
                    }}
                  >
                    {t("fact_byg_garanti_label")}
                  </span>
                  {/* a11y-003: amber text on light bg fails contrast. Use ink instead. */}
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "var(--font-size-sm)",
                      color: "var(--color-ink)",
                    }}
                  >
                    Certificeret
                  </span>
                </div>

                {/* Dansk Byggeri */}
                <div className="om-os-facts-row">
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "var(--font-size-xs)",
                      letterSpacing: "var(--letter-spacing-wide)",
                      textTransform: "uppercase",
                      color: "var(--color-stone)",
                      paddingRight: "var(--space-3)",
                    }}
                  >
                    {t("fact_dansk_byggeri_label")}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--font-size-sm)",
                      color: "var(--color-ink)",
                    }}
                  >
                    Medlem
                  </span>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: 5fr — portrait (FIRST-CLASS, prominent) ── */}
            <div className="om-os-portrait-col">
              {/* Portrait slot — S4: 0px radius, C5: stone/clay, T4: IBM Plex Mono label */}
              <div className="om-os-portrait-placeholder" role="img" aria-label="Portræt af Martin Mejdahl Jørgensen — billede endnu ikke modtaget">
                {/* Central label — IBM Plex Mono (T4: mono for spec/structural text) */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    textAlign: "center",
                  }}
                >
                  {/* Person silhouette indicator — typographic, not illustrative */}
                  <div
                    aria-hidden="true"
                    style={{
                      width: "4rem",
                      height: "4rem",
                      border: "2px solid var(--color-clay)",
                      borderRadius: 0,
                      margin: "0 auto 1.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      aria-hidden="true"
                      style={{ color: "var(--color-clay)" }}
                    >
                      <circle cx="16" cy="11" r="5" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M5 28c0-6.075 4.925-11 11-11s11 4.925 11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                    </svg>
                  </div>

                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      letterSpacing: "var(--letter-spacing-wide)",
                      textTransform: "uppercase",
                      color: "var(--color-stone)",
                      lineHeight: 1.5,
                      maxWidth: "22ch",
                      margin: "0 auto 1rem",
                    }}
                  >
                    [NEEDS: Portræt af Martin Mejdahl Jørgensen — et professionelt billede af håndværksmesteren selv. Dette billede er afgørende for virksomhedens identitet.]
                  </p>

                  {/* Priority indicator */}
                  <div
                    style={{
                      display: "inline-block",
                      border: "1px solid var(--color-clay)",
                      borderRadius: 0,
                      padding: "0.375rem 0.75rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.625rem",
                        fontWeight: 700,
                        letterSpacing: "var(--letter-spacing-wide)",
                        textTransform: "uppercase",
                        color: "var(--color-stone)",
                      }}
                    >
                      Prioritet 1 — klient handling påkrævet
                    </span>
                  </div>
                </div>
              </div>

              {/* Portrait caption — name below image, IBM Plex Sans */}
              <div
                style={{
                  paddingTop: "var(--space-3)",
                  borderTop: "1px solid var(--color-border)",
                  marginTop: "var(--space-2)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "var(--font-size-lg)",
                    lineHeight: "var(--line-height-snug)",
                    color: "var(--color-ink)",
                    marginBottom: "0.25rem",
                  }}
                >
                  Martin Mejdahl Jørgensen
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "var(--font-size-xs)",
                    letterSpacing: "var(--letter-spacing-wide)",
                    textTransform: "uppercase",
                    color: "var(--color-stone)",
                  }}
                >
                  Tømrermester og indehaver
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Values (full width, dark surface) ── */}
      <section
        aria-labelledby="values-heading"
        style={{
          background: "var(--color-surface-dark)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid rgba(245,240,232,0.08)",
          borderBottom: "1px solid rgba(245,240,232,0.08)",
        }}
      >
        <div
          className="mx-auto"
          style={{
            maxWidth: "var(--container-max)",
            padding: "0 var(--container-pad-desktop)",
          }}
        >
          {/* Section eyebrow */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "var(--font-size-xs)",
              letterSpacing: "var(--letter-spacing-wide)",
              textTransform: "uppercase",
              color: "var(--color-clay)",
              marginBottom: "0.75rem",
            }}
          >
            {t("values_eyebrow")}
          </p>

          <h2
            id="values-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              lineHeight: "var(--line-height-tight)",
              letterSpacing: "var(--letter-spacing-tight)",
              color: "var(--color-bone)",
              marginBottom: "var(--space-7)",
              maxWidth: "20ch",
            }}
          >
            {t("values_heading")}
          </h2>

          {/* L2 asymmetric values layout — Row 1: 7fr/5fr, Row 2: 5fr/7fr */}
          {/* Row 1 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "1px",
              background: "rgba(245,240,232,0.08)",
              marginBottom: "1px",
            }}
          >
            <style>{`
              @media (min-width: 768px) {
                .om-os-values-row1 { grid-template-columns: 7fr 5fr !important; }
                .om-os-values-row2 { grid-template-columns: 5fr 7fr !important; }
              }
            `}</style>
            <div
              className="om-os-values-row1"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "1px",
                background: "rgba(245,240,232,0.08)",
              }}
            >
              {/* Value 1 — Personligt ansvar */}
              <div
                style={{
                  background: "var(--color-surface-dark)",
                  padding: "var(--space-6)",
                  borderRadius: 0,
                }}
              >
                {/* Hairline rule above — S4 structural. All value cards use same hairline treatment.
                    C5: amber is reserved for CTAs and Byg Garanti only — not for decorative card differentiation. */}
                <div
                  aria-hidden="true"
                  style={{
                    width: "2.5rem",
                    height: "1px",
                    background: "rgba(245,240,232,0.2)",
                    marginBottom: "var(--space-3)",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "var(--font-size-xl)",
                    lineHeight: "var(--line-height-tight)",
                    letterSpacing: "var(--letter-spacing-tight)",
                    color: "var(--color-bone)",
                    marginBottom: "var(--space-2)",
                  }}
                >
                  {t("value1_heading")}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-sm)",
                    lineHeight: "var(--line-height-normal)",
                    color: "var(--color-clay)",
                    maxWidth: "42ch",
                  }}
                >
                  {t("value1_body")}
                </p>
              </div>

              {/* Value 2 — Byg Garanti på alt */}
              <div
                style={{
                  background: "var(--color-surface-dark)",
                  padding: "var(--space-6)",
                  borderRadius: 0,
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: "2.5rem",
                    height: "1px",
                    background: "rgba(245,240,232,0.2)",
                    marginBottom: "var(--space-3)",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "var(--font-size-xl)",
                    lineHeight: "var(--line-height-tight)",
                    letterSpacing: "var(--letter-spacing-tight)",
                    color: "var(--color-bone)",
                    marginBottom: "var(--space-2)",
                  }}
                >
                  {t("value2_heading")}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-sm)",
                    lineHeight: "var(--line-height-normal)",
                    color: "var(--color-clay)",
                    maxWidth: "42ch",
                  }}
                >
                  {t("value2_body")}
                </p>
              </div>
            </div>

            {/* Row 2 — reversed 5fr/7fr */}
            <div
              className="om-os-values-row2"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "1px",
                background: "rgba(245,240,232,0.08)",
              }}
            >
              {/* Value 3 — Tømrer og snedker */}
              <div
                style={{
                  background: "var(--color-surface-dark)",
                  padding: "var(--space-6)",
                  borderRadius: 0,
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: "2.5rem",
                    height: "1px",
                    background: "rgba(245,240,232,0.2)",
                    marginBottom: "var(--space-3)",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "var(--font-size-xl)",
                    lineHeight: "var(--line-height-tight)",
                    letterSpacing: "var(--letter-spacing-tight)",
                    color: "var(--color-bone)",
                    marginBottom: "var(--space-2)",
                  }}
                >
                  {t("value3_heading")}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-sm)",
                    lineHeight: "var(--line-height-normal)",
                    color: "var(--color-clay)",
                    maxWidth: "42ch",
                  }}
                >
                  {t("value3_body")}
                </p>
              </div>

              {/* Value 4 — Hele landet */}
              <div
                style={{
                  background: "var(--color-surface-dark)",
                  padding: "var(--space-6)",
                  borderRadius: 0,
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: "2.5rem",
                    height: "1px",
                    background: "rgba(245,240,232,0.2)",
                    marginBottom: "var(--space-3)",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "var(--font-size-xl)",
                    lineHeight: "var(--line-height-tight)",
                    letterSpacing: "var(--letter-spacing-tight)",
                    color: "var(--color-bone)",
                    marginBottom: "var(--space-2)",
                  }}
                >
                  {t("value4_heading")}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-sm)",
                    lineHeight: "var(--line-height-normal)",
                    color: "var(--color-clay)",
                    maxWidth: "42ch",
                  }}
                >
                  {t("value4_body")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Certifications ── */}
      <section
        aria-labelledby="cert-heading"
        style={{
          background: "var(--color-surface-card)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div
          className="mx-auto"
          style={{
            maxWidth: "var(--container-max)",
            padding: "0 var(--container-pad-desktop)",
          }}
        >
          {/* Section eyebrow */}
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
            {t("cert_eyebrow")}
          </p>

          <h2
            id="cert-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              lineHeight: "var(--line-height-tight)",
              letterSpacing: "var(--letter-spacing-tight)",
              color: "var(--color-ink)",
              marginBottom: "var(--space-7)",
              maxWidth: "24ch",
            }}
          >
            {t("cert_heading")}
          </h2>

          {/* Cert grid — L2: 5fr/4fr/3fr asymmetric */}
          <div className="om-os-cert-grid">

            {/* Byg Garanti — C5 amber trust treatment */}
            <div
              style={{
                borderTop: "2px solid var(--color-accent)",
                paddingTop: "var(--space-4)",
                borderRadius: 0,
              }}
            >
              {/* Logo badge — next/image, 0px wrapper */}
              <div
                style={{
                  width: "120px",
                  height: "60px",
                  position: "relative",
                  overflow: "hidden",
                  border: "1px solid var(--color-border)",
                  borderRadius: 0,
                  marginBottom: "var(--space-3)",
                }}
              >
                <Image
                  src="/images/brand/byg-garanti-logo.jpg"
                  alt="Byg Garanti certificeringsmærke"
                  fill
                  style={{ objectFit: "contain", borderRadius: 0 }}
                  sizes="120px"
                />
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "var(--font-size-lg)",
                  lineHeight: "var(--line-height-snug)",
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-2)",
                }}
              >
                {t("cert_byg_garanti_heading")}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-sm)",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "var(--space-3)",
                  maxWidth: "38ch",
                }}
              >
                {t("cert_byg_garanti_body")}
              </p>
              {/* Warranty facts in mono — a11y-003: amber text on light bg fails contrast.
                  Use ink instead; amber accent is on the borderTop rule above. */}
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--font-size-xs)",
                  color: "var(--color-ink)",
                  letterSpacing: "0.03em",
                }}
              >
                3 år · synlige fejl<br />
                10 år · skjulte fejl
              </p>
            </div>

            {/* Dansk Byggeri — text only, no logo */}
            <div
              style={{
                borderTop: "1px solid var(--color-border)",
                paddingTop: "var(--space-4)",
                borderRadius: 0,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "var(--font-size-lg)",
                  lineHeight: "var(--line-height-snug)",
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-2)",
                }}
              >
                {t("cert_dansk_byggeri_heading")}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-sm)",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  maxWidth: "38ch",
                }}
              >
                {t("cert_dansk_byggeri_body")}
              </p>
            </div>

            {/* CVR — verifiable business identity signal */}
            <div
              style={{
                borderTop: "1px solid var(--color-border)",
                paddingTop: "var(--space-4)",
                borderRadius: 0,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "var(--font-size-lg)",
                  lineHeight: "var(--line-height-snug)",
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-2)",
                }}
              >
                {t("cert_cvr_heading")}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.375rem",
                  fontWeight: 700,
                  color: "var(--color-ink)",
                  letterSpacing: "0.04em",
                  marginBottom: "var(--space-2)",
                }}
              >
                3646 6588
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-xs)",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  maxWidth: "28ch",
                }}
              >
                {t("cert_cvr_body")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: CTA Block ── */}
      <CtaBlock
        heading={t("cta_heading")}
        subtext={t("cta_subtext")}
        primaryCta={{ label: t("cta_primary"), href: "tel:+4540368862" }}
        secondaryCta={{ label: t("cta_secondary"), href: "/kontakt" }}
        variant="dark"
      />
    </>
  );
}
