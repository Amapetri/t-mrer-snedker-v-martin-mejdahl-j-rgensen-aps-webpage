import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { CtaBlock } from "@/components/CtaBlock";
import { JsonLd } from "@/components/JsonLd";
import {
  HoverLink,
  HoverCtaLink,
  HoverOutlineLink,
} from "@/components/HoverLink";

// ─────────────────────────────────────────────
// Metadata — SEO + social
// ─────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    "Tømrer & Snedker i Holstebro | Byg Garanti certificeret | Martin Mejdahl Jørgensen",
  description:
    "Byg Garanti certificeret tømrer og snedker i Holstebro. Martin Mejdahl Jørgensen tilbyder tagrenovering, tilbygninger, vinduer og fugtskade sanering. 3 + 10 år garanti. Arbejder hele landet.",
  alternates: {
    canonical: "/",
  },
};

// ─────────────────────────────────────────────
// JSON-LD — LocalBusiness + HomeAndConstructionBusiness
// ─────────────────────────────────────────────

const homepageSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  "@id": "https://www.mejdahltoemrer.dk/#localbusiness",
  name: "Tømrer & Snedker v/ Martin Mejdahl Jørgensen ApS",
  description:
    "Byg Garanti certificeret tømrer og snedker i Holstebro. Tagrenovering, tilbygninger, vinduer, fugtskade sanering og total renovering. Vi arbejder hele landet.",
  url: "https://www.mejdahltoemrer.dk/",
  telephone: "+4540368862",
  email: "martin@mejdahltoemrer.dk",
  taxID: "36466588",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Tingagerparken 3",
    addressLocality: "Holstebro",
    addressRegion: "Midtjylland",
    postalCode: "7500",
    addressCountry: "DK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 56.3593,
    longitude: 8.6394,
  },
  areaServed: {
    "@type": "Country",
    name: "Denmark",
  },
  memberOf: {
    "@type": "Organization",
    name: "Dansk Byggeri",
    url: "https://www.danskbyggeri.dk/",
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "Byg Garanti",
    credentialCategory: "Warranty Certification",
    recognizedBy: {
      "@type": "Organization",
      name: "Byg Garanti",
      url: "https://www.byggaranti.dk/",
    },
  },
  priceRange: "$$",
  knowsAbout: [
    "Tagrenovering",
    "Tilbygninger",
    "Total renovering",
    "Vinduer og døre",
    "Isolering og lofter",
    "Garager og carporte",
    "Skure",
    "Fugtskade sanering",
    "Skimmelsvamp renovering",
  ],
};

// ─────────────────────────────────────────────
// Page — Server Component
// ─────────────────────────────────────────────

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <>
      {/* JSON-LD structured data */}
      <JsonLd data={homepageSchema} />

      {/* ══════════════════════════════════════════════════
          SECTION 1 — HERO
          L2 Editorial Asymmetry: left 7/12 text (bone surface),
          right 5/12 image bleeding to edge.
          P3 Process Documentary: authentic construction photo.
          S4: 0px radius, hairline structure.
          D2: H1 at clamp(2.75rem, 5.5vw, 5rem) = 64–80px range.
          NOT centered text overlay — binding Avoid list rule.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label={t("hero_h1")}
        style={{
          background: "var(--color-bone)",
          borderBottom: "1px solid var(--color-border)",
          overflow: "hidden",
        }}
      >
        <style>{`
          .hero-grid {
            display: grid;
            grid-template-columns: 1fr;
            min-height: 560px;
          }
          @media (min-width: 1024px) {
            .hero-grid {
              grid-template-columns: 7fr 5fr;
              min-height: 680px;
            }
          }
          .hero-text-col {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 4rem 1.5rem;
          }
          @media (min-width: 1024px) {
            .hero-text-col {
              padding: 6rem 3rem 6rem max(3rem, calc((100vw - 80rem) / 2 + 3rem));
            }
          }
          .hero-image-col {
            position: relative;
            min-height: 320px;
            overflow: hidden;
          }
          @media (min-width: 1024px) {
            .hero-image-col {
              min-height: 0;
            }
          }
        `}</style>

        <div className="hero-grid">
          {/* LEFT: Text column — bone background, text only, no image behind */}
          <div className="hero-text-col">
            {/* Eyebrow — amber trust signal, C5: amber ONLY for Byg Garanti */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: "2rem",
                  height: "1px",
                  background: "var(--color-trust)",
                  flexShrink: 0,
                }}
              />
              {/* a11y-003: amber (#d97706) as text on bone fails contrast 2.81:1.
                  Fix: text is ink (15.86:1 passes); amber accent lives on the hairline beside it. */}
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "var(--letter-spacing-wide)",
                  textTransform: "uppercase",
                  color: "var(--color-ink)",
                }}
              >
                {t("hero_eyebrow")}
              </span>
            </div>

            {/* H1 — Zilla Slab Bold, D2 editorial scale, contains primary keyword */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(2.75rem, 5.5vw, 5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--color-ink)",
                maxWidth: "22ch",
                marginBottom: "1.5rem",
              }}
            >
              {t("hero_h1")}
            </h1>

            {/* Structural hairline — S4 */}
            <div
              aria-hidden="true"
              style={{
                width: "3rem",
                height: "1px",
                background: "var(--color-border)",
                marginBottom: "1.5rem",
              }}
            />

            {/* Subheadline — primary message, content strategy §1 */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1.0625rem, 1.75vw, 1.3125rem)",
                lineHeight: 1.4,
                color: "var(--color-stone)",
                maxWidth: "44ch",
                marginBottom: "2.5rem",
              }}
            >
              {t("hero_subheadline")}
            </p>

            {/* CTAs — primary amber (C5), secondary ink outline (S4) */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              {/* Primary — amber fill, S4: 0px radius, M1: background color only */}
              <HoverCtaLink
                href="/kontakt"
                style={{
                  display: "inline-block",
                  background: "var(--color-accent)",
                  color: "#fff",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.8125rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  padding: "1rem 2rem",
                  borderRadius: 0,
                  whiteSpace: "nowrap",
                }}
              >
                {t("hero_cta_primary")}
              </HoverCtaLink>

              {/* Secondary — ink outline, S4: 2px structural, 0px radius */}
              <HoverOutlineLink
                href="/projekter"
                style={{
                  display: "inline-block",
                  background: "transparent",
                  color: "var(--color-ink)",
                  border: "2px solid var(--color-ink)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.8125rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  padding: "1rem 2rem",
                  borderRadius: 0,
                  whiteSpace: "nowrap",
                }}
              >
                {t("hero_cta_secondary")}
              </HoverOutlineLink>
            </div>

            {/* Trust line — certifications + CVR */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                color: "var(--color-stone)",
                lineHeight: 1.6,
              }}
            >
              {t("hero_trust_line")}
            </p>
          </div>

          {/* RIGHT: Image column — bleeds full height to edge, no text over image */}
          <div className="hero-image-col">
            <Image
              src="/images/hero/hero-main.jpg"
              alt={t("hero_image_alt")}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 2 — TRUST SIGNALS
          Dark strip (ink surface).
          Three items: Byg Garanti (amber), Dansk Byggeri, Nationwide.
          L2 asymmetric proportions — NOT equal thirds.
          S4: hairlines, 0px radius everywhere.
          C5: amber ONLY on Byg Garanti item.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label={t("trust_eyebrow")}
        style={{
          background: "var(--color-surface-dark)",
          borderBottom: "1px solid rgba(245,240,232,0.08)",
        }}
      >
        <style>{`
          .trust-grid {
            display: grid;
            grid-template-columns: 1fr;
          }
          @media (min-width: 768px) {
            /* L2 asymmetry: 5fr / 4fr / 3fr — not equal thirds */
            .trust-grid {
              grid-template-columns: 5fr 4fr 3fr;
            }
          }
          .trust-item {
            padding: 3rem 2.5rem;
            border-bottom: 1px solid rgba(245,240,232,0.08);
          }
          @media (min-width: 768px) {
            .trust-item {
              border-bottom: none;
              border-right: 1px solid rgba(245,240,232,0.08);
              padding: 3.5rem 3rem;
            }
            .trust-item:last-child {
              border-right: none;
            }
          }
        `}</style>

        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
          }}
        >
          <div className="trust-grid">
            {/* Byg Garanti — amber highlight, C5 trust color, first and only amber use in this section */}
            <div className="trust-item">
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1.25rem",
                }}
              >
                {/* Logo — S4: 1px amber border, 0px radius */}
                <div
                  style={{
                    flexShrink: 0,
                    width: "56px",
                    height: "56px",
                    position: "relative",
                    border: "1px solid var(--color-trust)",
                    borderRadius: 0,
                    overflow: "hidden",
                    background: "#fff",
                  }}
                >
                  <Image
                    src="/images/brand/byg-garanti-logo.jpg"
                    alt={t("trust_byg_garanti_img_alt")}
                    fill
                    sizes="56px"
                    style={{ objectFit: "contain", padding: "4px" }}
                  />
                </div>

                <div>
                  {/* Amber top rule — S4 hairline, C5 trust color, Byg Garanti ONLY */}
                  <div
                    style={{
                      borderTop: "1px solid var(--color-trust)",
                      paddingTop: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "1.125rem",
                        color: "var(--color-trust)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.02em",
                        display: "block",
                      }}
                    >
                      {t("trust_byg_garanti_title")}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 600,
                        fontSize: "0.6875rem",
                        color: "var(--color-trust)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        display: "block",
                        marginTop: "0.125rem",
                      }}
                    >
                      {t("trust_byg_garanti_detail")}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      color: "var(--color-clay)",
                      lineHeight: 1.6,
                      maxWidth: "36ch",
                      marginTop: "0.75rem",
                    }}
                  >
                    {t("trust_byg_garanti_body")}
                  </p>
                </div>
              </div>
            </div>

            {/* Dansk Byggeri — no amber */}
            <div className="trust-item">
              <div
                style={{
                  borderTop: "1px solid rgba(245,240,232,0.15)",
                  paddingTop: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.125rem",
                    color: "var(--color-bone)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    display: "block",
                  }}
                >
                  {t("trust_dansk_byggeri_title")}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.6875rem",
                    color: "var(--color-text-secondary-on-dark)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    display: "block",
                    marginTop: "0.125rem",
                  }}
                >
                  {t("trust_dansk_byggeri_detail")}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "var(--color-clay)",
                  lineHeight: 1.6,
                  maxWidth: "36ch",
                  marginTop: "0.75rem",
                }}
              >
                {t("trust_dansk_byggeri_body")}
              </p>
            </div>

            {/* Nationwide — no amber */}
            <div className="trust-item">
              <div
                style={{
                  borderTop: "1px solid rgba(245,240,232,0.15)",
                  paddingTop: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.125rem",
                    color: "var(--color-bone)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    display: "block",
                  }}
                >
                  {t("trust_nationwide_title")}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.6875rem",
                    color: "var(--color-text-secondary-on-dark)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    display: "block",
                    marginTop: "0.125rem",
                  }}
                >
                  {t("trust_nationwide_detail")}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "var(--color-clay)",
                  lineHeight: 1.6,
                  maxWidth: "32ch",
                  marginTop: "0.75rem",
                }}
              >
                {t("trust_nationwide_body")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 3 — SERVICES OVERVIEW
          L2: three rows with different column splits.
          Row 1: 5fr/3fr/4fr (tag wide, total, vinduer)
          Row 2: 4fr/5fr/3fr (isolering, tilbygning wide, garager)
          Row 3: 7fr/5fr (skure wide, fugtskade)
          T4: Zilla Slab at card heading scale.
          S4: 1px hairline borders, 0px radius, no shadows.
          C5: NO amber — stone text, ink headings.
          D2: 120px section gaps.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label={t("services_heading")}
        style={{
          background: "var(--color-bone)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
        }}
      >
        <style>{`
          /* Service card grid rows — L2 asymmetry, different splits per row */
          .services-row-1 {
            display: grid;
            grid-template-columns: 1fr;
          }
          @media (min-width: 768px) {
            .services-row-1 { grid-template-columns: 5fr 3fr 4fr; }
          }
          .services-row-2 {
            display: grid;
            grid-template-columns: 1fr;
          }
          @media (min-width: 768px) {
            .services-row-2 { grid-template-columns: 4fr 5fr 3fr; }
          }
          .services-row-3 {
            display: grid;
            grid-template-columns: 1fr;
          }
          @media (min-width: 768px) {
            .services-row-3 { grid-template-columns: 7fr 5fr; }
          }
          /* S4: 1px hairline borders, 0px radius, no shadow, no fill elevation */
          .service-card {
            padding: 2.5rem 2rem;
            border: 1px solid var(--color-border);
            border-radius: 0;
            background: var(--color-paper);
            /* Collapse double borders in the grid */
            margin-right: -1px;
            margin-bottom: -1px;
          }
        `}</style>

        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 var(--container-pad-desktop)",
          }}
        >
          {/* Section header — L2: left-aligned, not centered */}
          <div style={{ maxWidth: "48ch", marginBottom: "3rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: "2rem",
                  height: "1px",
                  background: "var(--color-border)",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--color-stone)",
                }}
              >
                {t("services_eyebrow")}
              </span>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--color-ink)",
                marginBottom: "1rem",
              }}
            >
              {t("services_heading")}
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.0625rem",
                color: "var(--color-stone)",
                lineHeight: 1.6,
              }}
            >
              {t("services_subheading")}
            </p>
          </div>

          {/* Row 1: 5fr / 3fr / 4fr */}
          <div className="services-row-1">
            <ServiceCard
              name={t("service_tag_renovering_name")}
              desc={t("service_tag_renovering_desc")}
              href="/ydelser/tagrenovering"
              readMore={t("service_read_more")}
              featured
            />
            <ServiceCard
              name={t("service_total_renovering_name")}
              desc={t("service_total_renovering_desc")}
              href="/ydelser/total-renovering"
              readMore={t("service_read_more")}
            />
            <ServiceCard
              name={t("service_vinduer_doere_name")}
              desc={t("service_vinduer_doere_desc")}
              href="/ydelser/vinduer-doere"
              readMore={t("service_read_more")}
            />
          </div>

          {/* Row 2: 4fr / 5fr / 3fr */}
          <div className="services-row-2">
            <ServiceCard
              name={t("service_isolering_lofter_name")}
              desc={t("service_isolering_lofter_desc")}
              href="/ydelser/isolering-lofter"
              readMore={t("service_read_more")}
            />
            <ServiceCard
              name={t("service_tilbygninger_name")}
              desc={t("service_tilbygninger_desc")}
              href="/ydelser/tilbygninger"
              readMore={t("service_read_more")}
              featured
            />
            <ServiceCard
              name={t("service_garager_carporte_name")}
              desc={t("service_garager_carporte_desc")}
              href="/ydelser/garager-carporte"
              readMore={t("service_read_more")}
            />
          </div>

          {/* Row 3: 7fr / 5fr */}
          <div className="services-row-3">
            <ServiceCard
              name={t("service_skure_name")}
              desc={t("service_skure_desc")}
              href="/ydelser/skure"
              readMore={t("service_read_more")}
            />
            <ServiceCard
              name={t("service_fugtskade_name")}
              desc={t("service_fugtskade_desc")}
              href="/ydelser/fugtskade-sanering"
              readMore={t("service_read_more")}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 4 — FEATURED CASES
          L2: 7fr left (featured) + 5fr right (two small stacked).
          P3: authentic case photography only.
          S4: 0px radius on image containers, hairlines only.
          C5: stone labels — no amber, not a CTA or trust signal.
          D2: 120px section gap.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label={t("cases_heading")}
        style={{
          background: "var(--color-paper)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          /* L2: featured case left (7fr) + two smaller cases stacked right (5fr) */
          .cases-grid {
            display: grid;
            grid-template-columns: 1fr;
            background: var(--color-border);
            gap: 1px;
          }
          @media (min-width: 1024px) {
            .cases-grid {
              grid-template-columns: 7fr 5fr;
              grid-template-rows: 1fr 1fr;
            }
          }
          /* Featured spans both rows on desktop */
          .case-featured {
            background: var(--color-bone);
          }
          @media (min-width: 1024px) {
            .case-featured {
              grid-row: 1 / span 2;
              grid-column: 1;
            }
          }
          .case-small {
            background: var(--color-bone);
          }
          /* Image containers — S4: 0px radius, overflow hidden */
          .case-img-featured {
            position: relative;
            width: 100%;
            height: 360px;
            overflow: hidden;
            border-radius: 0;
          }
          .case-img-small {
            position: relative;
            width: 100%;
            height: 220px;
            overflow: hidden;
            border-radius: 0;
          }
          @media (min-width: 1024px) {
            .case-img-featured {
              /* Fill remaining height after text block */
              height: 440px;
            }
            .case-img-small {
              height: 200px;
            }
          }
        `}</style>

        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 var(--container-pad-desktop)",
          }}
        >
          {/* Section header */}
          <div style={{ maxWidth: "52ch", marginBottom: "2.5rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: "2rem",
                  height: "1px",
                  background: "var(--color-border)",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--color-stone)",
                }}
              >
                {t("cases_eyebrow")}
              </span>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--color-ink)",
                marginBottom: "1rem",
              }}
            >
              {t("cases_heading")}
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.0625rem",
                color: "var(--color-stone)",
                lineHeight: 1.6,
              }}
            >
              {t("cases_subheading")}
            </p>
          </div>

          {/* Asymmetric case grid */}
          <div className="cases-grid">
            {/* Case 1: Featured — Parcelhus Holstebro */}
            <article className="case-featured">
              <div className="case-img-featured">
                <Image
                  src="/images/cases/parcelhus-holstebro-1.jpg"
                  alt={t("case1_img_alt")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
              <div
                style={{
                  padding: "2rem",
                  borderTop: "1px solid var(--color-border)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "0.6875rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--color-stone)",
                    }}
                  >
                    {t("case1_category")} · {t("case1_location")}
                  </span>
                  <HoverLink
                    href="/projekter/parcelhus-holstebro"
                    baseColor="var(--color-stone)"
                    hoverColor="var(--color-ink)"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      color: "var(--color-stone)",
                      textDecoration: "none",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {t("cases_see_project")} →
                  </HoverLink>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: "var(--color-ink)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {t("case1_title")}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9375rem",
                    color: "var(--color-stone)",
                    lineHeight: 1.6,
                    maxWidth: "52ch",
                  }}
                >
                  {t("case1_summary")}
                </p>
              </div>
            </article>

            {/* Case 2: Tilbygning Halgård — small top right */}
            <article className="case-small">
              <div className="case-img-small">
                <Image
                  src="/images/cases/tilbygning-halgaard-1.jpg"
                  alt={t("case2_img_alt")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
              <div
                style={{
                  padding: "1.5rem 2rem",
                  borderTop: "1px solid var(--color-border)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "0.6875rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--color-stone)",
                    }}
                  >
                    {t("case2_category")} · {t("case2_location")}
                  </span>
                  <HoverLink
                    href="/projekter/tilbygning-halgaard"
                    baseColor="var(--color-stone)"
                    hoverColor="var(--color-ink)"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      color: "var(--color-stone)",
                      textDecoration: "none",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {t("cases_see_project")} →
                  </HoverLink>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: "var(--color-ink)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("case2_title")}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    color: "var(--color-stone)",
                    lineHeight: 1.6,
                  }}
                >
                  {t("case2_summary")}
                </p>
              </div>
            </article>

            {/* Case 3: Fugtskade København — small bottom right */}
            <article className="case-small">
              {/* P3: mold shot never shown in isolation — use "efter" (resolution) image per design-direction.md */}
              <div className="case-img-small">
                <Image
                  src="/images/cases/koebenhavn-lejlighed-efter.jpg"
                  alt="Fugtskade sanering København — resultat efter sanering"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
              <div
                style={{
                  padding: "1.5rem 2rem",
                  borderTop: "1px solid var(--color-border)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "0.6875rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--color-stone)",
                    }}
                  >
                    {t("case3_category")} · {t("case3_location")}
                  </span>
                  <HoverLink
                    href="/projekter/koebenhavn-fugtskade"
                    baseColor="var(--color-stone)"
                    hoverColor="var(--color-ink)"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      color: "var(--color-stone)",
                      textDecoration: "none",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {t("cases_see_project")} →
                  </HoverLink>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: "var(--color-ink)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("case3_title")}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    color: "var(--color-stone)",
                    lineHeight: 1.6,
                  }}
                >
                  {t("case3_summary")}
                </p>
              </div>
            </article>
          </div>

          {/* See all projects — right-aligned, structural link */}
          <div style={{ textAlign: "right", marginTop: "2rem" }}>
            <HoverLink
              href="/projekter"
              baseColor="var(--color-stone)"
              hoverColor="var(--color-ink)"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.8125rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--color-stone)",
                textDecoration: "none",
              }}
            >
              {t("cases_see_all")} →
            </HoverLink>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 5 — FINAL CTA
          CtaBlock shared component (already built, verified compliant).
          C5: amber primary CTA.
          S4: 0px radius inherited from CtaBlock.
          D2: section-gap handled by CtaBlock.
          ══════════════════════════════════════════════════ */}

      <CtaBlock
        heading={t("cta_heading")}
        subtext={t("cta_subtext")}
        primaryCta={{ label: t("cta_primary"), href: "/kontakt" }}
        secondaryCta={{ label: t("cta_secondary"), href: "tel:+4540368862" }}
        variant="light"
      />
    </>
  );
}

// ─────────────────────────────────────────────
// ServiceCard — Server Component helper
// T4: Zilla Slab heading
// S4: 0px radius, 1px hairline (CSS class), no shadow
// C5: no amber — stone text, ink headings only
// HoverLink for read-more (client component wrapper)
// ─────────────────────────────────────────────

function ServiceCard({
  name,
  desc,
  href,
  readMore,
  featured = false,
}: {
  name: string;
  desc: string;
  href: string;
  readMore: string;
  featured?: boolean;
}) {
  return (
    <div className="service-card">
      {/* Top hairline rule — S4: structural marker, not decorative */}
      <div
        aria-hidden="true"
        style={{
          width: "2.5rem",
          height: "1px",
          background: "var(--color-border)",
          marginBottom: "1.25rem",
        }}
      />

      {/* Service name — T4 Zilla Slab */}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: featured ? "1.5rem" : "1.25rem",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "var(--color-ink)",
          marginBottom: "0.75rem",
        }}
      >
        {name}
      </h3>

      {/* Description — IBM Plex Sans, stone */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.9375rem",
          color: "var(--color-stone)",
          lineHeight: 1.6,
          marginBottom: "1.5rem",
        }}
      >
        {desc}
      </p>

      {/* Read more — stone -> ink, no amber */}
      <HoverLink
        href={href as "/"}
        baseColor="var(--color-stone)"
        hoverColor="var(--color-ink)"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          fontSize: "0.8125rem",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--color-stone)",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.375rem",
        }}
      >
        {readMore} <span aria-hidden="true">→</span>
      </HoverLink>
    </div>
  );
}
