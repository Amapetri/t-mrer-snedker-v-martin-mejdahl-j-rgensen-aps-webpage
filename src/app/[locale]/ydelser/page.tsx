import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBlock } from "@/components/CtaBlock";
import { JsonLd } from "@/components/JsonLd";
import { HoverLink } from "@/components/HoverLink";

// ─────────────────────────────────────────────
// Ydelser Hub — /ydelser/
// Primary keyword: tømrer ydelser Holstebro
// L2 Editorial Asymmetry: varied column grids per row,
//    no equal-card layout anywhere.
// T4: Zilla Slab H1 + service headings.
// S4: 0px radius, 1px hairlines, no shadows.
// C5: amber on CTA and Byg Garanti signal only.
// D2: 120px section gaps.
// M1: 150ms hover transitions, color only.
// ─────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    "Ydelser — Tømrer & Snedker | Holstebro | Martin Mejdahl Jørgensen",
  description:
    "Se alle ydelser: tagrenovering, tilbygninger, vinduer & døre, isolering, garager, skure og fugtskade sanering. Byg Garanti certificeret.",
  alternates: {
    canonical: "/ydelser",
  },
};

// ─────────────────────────────────────────────
// JSON-LD — Service collection schema
// ─────────────────────────────────────────────

const servicesHubSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Vores ydelser — tømrer og snedker i ét",
  description:
    "Det fulde spektrum af tømrer- og snedkerydelser til private. Tagrenovering, total renovering, vinduer og døre, isolering og lofter, tilbygninger, garager og carporte, skure, fugtskade sanering.",
  provider: {
    "@type": "LocalBusiness",
    "@id": "https://www.mejdahltoemrer.dk/#localbusiness",
    name: "Tømrer & Snedker v/ Martin Mejdahl Jørgensen ApS",
  },
  areaServed: {
    "@type": "Country",
    name: "Denmark",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tømrer og snedker ydelser",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tagrenovering" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Total renovering" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vinduer & Døre" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Isolering & Lofter" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tilbygninger" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Garager & Carporte" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Skure" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fugtskade Sanering" } },
    ],
  },
};

// ─────────────────────────────────────────────
// Service data — real Danish copy, no lorem ipsum
// Images: catalog-reuse where available, NEEDS markers where not
// ─────────────────────────────────────────────

const SERVICES = [
  {
    name: "Tagrenovering",
    slug: "tagrenovering",
    desc: "Et tag i dårlig stand er en risiko for hele boligens konstruktion. Vi udfører komplet renovering — fjernelse af gammelt tagdækning, ny membran, isolering og underlag. Byg Garanti certificeret.",
    image: "/images/hero/hero-main.jpg",
    imageAlt: "Tømrerarbejde på tag under renovering — Holstebro",
    imageSizes: "(max-width: 768px) 100vw, 50vw",
    featured: true,
  },
  {
    name: "Total renovering",
    slug: "total-renovering",
    desc: "Fra råhus til færdig bolig. Strukturelle ændringer, ny fordeling og alle snedkerdetaljer i ét koordineret forløb — ingen gråzoner mellem håndværkere.",
    image: null,
    imageAlt: null,
    imageSizes: null,
    featured: false,
  },
  {
    name: "Vinduer & Døre",
    slug: "vinduer-doere",
    desc: "Udskiftning og montering af vinduer og yderdøre. Tætte, korrekt isolerede løsninger med fals og indbygning udført efter gældende krav.",
    image: null,
    imageAlt: null,
    imageSizes: null,
    featured: false,
  },
  {
    name: "Isolering & Lofter",
    slug: "isolering-lofter",
    desc: "Loftsisolering og dampspærre udført korrekt — reducerer varmetab markant og forhindrer kondensproblemer. Byg Garanti på alle arbejder.",
    image: null,
    imageAlt: null,
    imageSizes: null,
    featured: false,
  },
  {
    name: "Tilbygninger",
    slug: "tilbygninger",
    desc: "Tilbygning til eksisterende bolig: fundament, rejsning, tagkonstruktion og alle snedkerdetaljer. Én hånd på hele projektet — tømrer og snedker under ét tag.",
    image: "/images/cases/tilbygning-halgaard-1.jpg",
    imageAlt: "Tilbygning under opførelse i Halgård nær Holstebro",
    imageSizes: "(max-width: 768px) 100vw, 60vw",
    featured: true,
  },
  {
    name: "Garager & Carporte",
    slug: "garager-carporte",
    desc: "Opførelse af garage eller carport med tømrer- og snedkerkvalitet. Valgfri integrering med eksisterende bygning og tilpasning til din grund.",
    image: null,
    imageAlt: null,
    imageSizes: null,
    featured: false,
  },
  {
    name: "Skure",
    slug: "skure",
    desc: "Solide skure i håndværksmæssig kvalitet — ikke pavillonkvalitet. Fundament, konstruktion og beklædning udført med samme omhu som resten af vores arbejde.",
    image: null,
    imageAlt: null,
    imageSizes: null,
    featured: false,
  },
  {
    name: "Fugtskade Sanering",
    slug: "fugtskade-sanering",
    desc: "Skimmelsvamp er et indeklima- og sundhedsproblem. Vi identificerer kilden, sanerer korrekt og forebygger recidiv. Dokumenteret erfaring fra projekter i hele landet.",
    image: "/images/cases/koebenhavn-lejlighed-skimmel.jpg",
    imageAlt: "Fugtskade og skimmelsvamp sanering — Holstebro og hele landet",
    imageSizes: "(max-width: 768px) 100vw, 50vw",
    featured: false,
  },
];

// ─────────────────────────────────────────────
// Page — Server Component
// ─────────────────────────────────────────────

export default async function YdelserHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={servicesHubSchema} />

      {/* ══════════════════════════════════════════════════
          PAGE HEADER — bone surface
          H1 left-aligned, T4 Zilla Slab at D2 service-page scale.
          L2: H1 at max 8/12 columns, not full width.
          S4: hairline divider below header, 0px radius.
          ══════════════════════════════════════════════════ */}

      <section
        style={{
          background: "var(--color-bone)",
          borderBottom: "1px solid var(--color-border)",
          paddingTop: "3rem",
          paddingBottom: "3.5rem",
        }}
      >
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 var(--container-pad-desktop)",
          }}
        >
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[{ label: "Ydelser" }]}
          />

          {/* Structural divider — S4 hairline at col margin, not full width */}
          <div
            aria-hidden="true"
            style={{
              width: "3rem",
              height: "1px",
              background: "var(--color-border)",
              margin: "1.5rem 0",
            }}
          />

          {/* H1 — T4 Zilla Slab, D2 service-page scale */}
          <div style={{ maxWidth: "58ch" }}>
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
              Vores ydelser — tømrer og snedker i ét
            </h1>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.5vw, 1.1875rem)",
                lineHeight: "var(--line-height-snug)",
                color: "var(--color-stone)",
                maxWidth: "52ch",
              }}
            >
              Vi tilbyder det fulde spektrum af tømrer- og snedkerydelser til private. Ét firma — ét ansvar — Byg Garanti på alt.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          DUAL CAPABILITY SIGNAL — dark strip
          Tømrer + Snedker duality explained.
          D2: contained, not full-section — it's a brief editorial signal.
          S4: hairline borders each side, 0px radius.
          ══════════════════════════════════════════════════ */}

      <section
        style={{
          background: "var(--color-surface-dark)",
          borderBottom: "1px solid rgba(245,240,232,0.08)",
        }}
      >
        <style>{`
          .capability-grid {
            display: grid;
            grid-template-columns: 1fr;
          }
          @media (min-width: 768px) {
            /* L2: 5fr / 7fr — not equal */
            .capability-grid {
              grid-template-columns: 5fr 7fr;
            }
          }
          .capability-cell {
            padding: 3rem 2.5rem;
            border-bottom: 1px solid rgba(245,240,232,0.08);
          }
          @media (min-width: 768px) {
            .capability-cell {
              border-bottom: none;
              border-right: 1px solid rgba(245,240,232,0.08);
              padding: 4rem 3rem;
            }
            .capability-cell:last-child {
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
          <div className="capability-grid">
            {/* Tømrer — structural */}
            <div className="capability-cell">
              <div
                style={{
                  borderTop: "1px solid rgba(245,240,232,0.15)",
                  paddingTop: "0.5rem",
                  marginBottom: "0.875rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.375rem",
                    lineHeight: "var(--line-height-tight)",
                    letterSpacing: "var(--letter-spacing-tight)",
                    color: "var(--color-bone)",
                    display: "block",
                  }}
                >
                  Tømrer
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.6875rem",
                    letterSpacing: "var(--letter-spacing-wide)",
                    textTransform: "uppercase",
                    color: "var(--color-stone)",
                    display: "block",
                    marginTop: "0.25rem",
                  }}
                >
                  Strukturelt arbejde
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-clay)",
                  maxWidth: "36ch",
                }}
              >
                Konstruktion, bærende strukturer, tagkonstruktioner, fundamenter og alt der holder bygningen oppe.
              </p>
            </div>

            {/* Snedker — finish + combined value */}
            <div className="capability-cell">
              <div
                style={{
                  borderTop: "1px solid rgba(245,240,232,0.15)",
                  paddingTop: "0.5rem",
                  marginBottom: "0.875rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.375rem",
                    lineHeight: "var(--line-height-tight)",
                    letterSpacing: "var(--letter-spacing-tight)",
                    color: "var(--color-bone)",
                    display: "block",
                  }}
                >
                  Snedker
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.6875rem",
                    letterSpacing: "var(--letter-spacing-wide)",
                    textTransform: "uppercase",
                    color: "var(--color-stone)",
                    display: "block",
                    marginTop: "0.25rem",
                  }}
                >
                  Snedker og finish
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-clay)",
                  maxWidth: "48ch",
                }}
              >
                Vinduer, døre, lister, beklædning og alle detaljer der giver den færdige bolig dens karakter. Samme firma — ingen koordineringsproblemer mellem tømrer og snedker, ingen gråzoner, ét samlet ansvar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SERVICE GRID — L2 Asymmetric editorial layout
          Three rows, each with different column splits.
          Row A: Featured tagrenovering (with image) + 2 smaller cards (7fr / 5fr split overall)
          Row B: 3-column asymmetric: 4fr / 5fr / 3fr
          Row C: Featured tilbygning (with image) + 2 stacked cards
          Row D: 2-column: 5fr / 7fr (skure + fugtskade)
          T4: service names in Zilla Slab.
          S4: 1px hairline card borders, 0px radius, no shadow.
          C5: no amber — stone/ink only on cards.
          D2: section-gap between major section and rows.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Alle ydelser"
        style={{
          background: "var(--color-bone)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
        }}
      >
        <style>{`
          /* ─── Service grid rows — L2 asymmetry ─── */

          /* Row A: tagrenovering image-card (wide) + 2 text cards stacked */
          .svc-row-a {
            display: grid;
            grid-template-columns: 1fr;
            border: 1px solid var(--color-border);
            margin-bottom: -1px;
          }
          @media (min-width: 900px) {
            /* 7fr left (featured with image), 5fr right (two stacked) */
            .svc-row-a {
              grid-template-columns: 7fr 5fr;
              grid-template-rows: auto auto;
            }
          }

          /* Row B: three varied-width text cards */
          .svc-row-b {
            display: grid;
            grid-template-columns: 1fr;
            border: 1px solid var(--color-border);
            border-top: none;
            margin-bottom: -1px;
          }
          @media (min-width: 768px) {
            /* 4fr / 5fr / 3fr — none equal */
            .svc-row-b { grid-template-columns: 4fr 5fr 3fr; }
          }

          /* Row C: tilbygning featured (image+text) + 2 stacked smaller cards */
          .svc-row-c {
            display: grid;
            grid-template-columns: 1fr;
            border: 1px solid var(--color-border);
            border-top: none;
            margin-bottom: -1px;
          }
          @media (min-width: 900px) {
            /* 5fr left text + image, 7fr right (featured image dominates) → reversed proportion */
            .svc-row-c {
              grid-template-columns: 5fr 7fr;
              grid-template-rows: auto auto;
            }
          }

          /* Row D: two columns, different widths */
          .svc-row-d {
            display: grid;
            grid-template-columns: 1fr;
            border: 1px solid var(--color-border);
            border-top: none;
          }
          @media (min-width: 768px) {
            /* 5fr skure / 7fr fugtskade (highlight the high-urgency service) */
            .svc-row-d { grid-template-columns: 5fr 7fr; }
          }

          /* Card base — S4: hairline borders, 0px radius, no shadow */
          .svc-card {
            background: var(--color-paper);
            padding: 2.5rem 2.25rem;
            border-right: 1px solid var(--color-border);
            border-bottom: 1px solid var(--color-border);
          }
          .svc-card:last-child {
            border-right: none;
          }

          /* Featured card with image */
          .svc-card-featured {
            background: var(--color-paper);
            border-right: 1px solid var(--color-border);
          }
          @media (min-width: 900px) {
            .svc-card-featured-a {
              grid-row: 1 / span 2;
              grid-column: 1;
              display: flex;
              flex-direction: column;
            }
            .svc-card-featured-c {
              grid-row: 1 / span 2;
              grid-column: 2;
              display: flex;
              flex-direction: column;
            }
          }

          /* Image container — S4: 0px radius, overflow hidden */
          .svc-img-container {
            position: relative;
            width: 100%;
            flex: 1;
            min-height: 260px;
            overflow: hidden;
            border-radius: 0;
          }
          @media (min-width: 900px) {
            .svc-img-container { min-height: 320px; }
          }

          /* Placeholder for [NEEDS:] services with no image */
          .svc-img-placeholder {
            width: 100%;
            min-height: 140px;
            background: var(--color-bone);
            border-bottom: 1px solid var(--color-border);
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 1.5rem 2.25rem;
          }

          /* Hover state on cards — M1: 150ms, no scale/shadow */
          .svc-card-link-overlay {
            position: absolute;
            inset: 0;
            z-index: 1;
          }
          .svc-card-inner {
            position: relative;
          }
        `}</style>

        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 var(--container-pad-desktop)",
          }}
        >
          {/* Section eyebrow */}
          <div style={{ marginBottom: "3rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.75rem",
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
                  letterSpacing: "var(--letter-spacing-wide)",
                  textTransform: "uppercase",
                  color: "var(--color-stone)",
                }}
              >
                Ydelser
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                color: "var(--color-stone)",
                lineHeight: "var(--line-height-normal)",
                maxWidth: "52ch",
              }}
            >
              Byg Garanti dækker alle vores ydelser — 3 år på synlige fejl, 10 år på skjulte fejl ved privat boligbyggeri.
            </p>
          </div>

          {/* ── ROW A: Tagrenovering (featured, with image) + Total renovering + Vinduer & Døre ── */}
          <div className="svc-row-a" role="list">
            {/* Tagrenovering — featured, spans both rows, has hero-main.jpg */}
            <article
              className="svc-card-featured svc-card-featured-a"
              role="listitem"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              {/* Image — catalog-reuse: hero-main.jpg (REUSE-IF, construction process) */}
              <div className="svc-img-container">
                <Image
                  src="/images/hero/hero-main.jpg"
                  alt="Tømrerarbejde under opførelse — tagrenovering, Holstebro"
                  fill
                  sizes="(max-width: 900px) 100vw, 58vw"
                  style={{ objectFit: "cover", objectPosition: "center", borderRadius: 0 }}
                />
              </div>
              {/* Card text */}
              <div style={{ padding: "2.25rem 2.25rem 2.5rem" }}>
                <div
                  aria-hidden="true"
                  style={{
                    width: "2rem",
                    height: "1px",
                    background: "var(--color-border)",
                    marginBottom: "1.125rem",
                  }}
                />
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.625rem",
                    lineHeight: "var(--line-height-tight)",
                    letterSpacing: "var(--letter-spacing-tight)",
                    color: "var(--color-ink)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Tagrenovering
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9375rem",
                    lineHeight: "var(--line-height-normal)",
                    color: "var(--color-stone)",
                    marginBottom: "1.375rem",
                  }}
                >
                  Et tag i dårlig stand er en risiko for hele boligens konstruktion. Vi udfører komplet renovering — fjernelse af gammelt tagdækning, ny membran, isolering og underlag. Byg Garanti certificeret.
                </p>
                <HoverLink
                  href="/ydelser/tagrenovering"
                  baseColor="var(--color-stone)"
                  hoverColor="var(--color-ink)"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.8125rem",
                    letterSpacing: "var(--letter-spacing-wide)",
                    textTransform: "uppercase",
                    color: "var(--color-stone)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                  }}
                >
                  Læs mere <span aria-hidden="true">→</span>
                </HoverLink>
              </div>
            </article>

            {/* Total renovering — smaller card, right top */}
            <article
              className="svc-card"
              role="listitem"
              style={{ background: "var(--color-paper)", borderBottom: "1px solid var(--color-border)", borderRight: "none" }}
            >
              <div
                aria-hidden="true"
                style={{ width: "2rem", height: "1px", background: "var(--color-border)", marginBottom: "1.125rem" }}
              />
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-ink)",
                  marginBottom: "0.625rem",
                }}
              >
                Total renovering
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "1.25rem",
                }}
              >
                Fra råhus til færdig bolig. Strukturelle ændringer, ny fordeling og alle snedkerdetaljer i ét koordineret forløb — ingen gråzoner.
              </p>
              {/* [NEEDS: Photo of renovation in progress — walls open, structural work visible] */}
              <HoverLink
                href="/ydelser/total-renovering"
                baseColor="var(--color-stone)"
                hoverColor="var(--color-ink)"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.8125rem",
                  letterSpacing: "var(--letter-spacing-wide)",
                  textTransform: "uppercase",
                  color: "var(--color-stone)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                }}
              >
                Læs mere <span aria-hidden="true">→</span>
              </HoverLink>
            </article>

            {/* Vinduer & Døre — smaller card, right bottom */}
            <article
              className="svc-card"
              role="listitem"
              style={{ background: "var(--color-bone)", borderBottom: "none", borderRight: "none" }}
            >
              <div
                aria-hidden="true"
                style={{ width: "2rem", height: "1px", background: "var(--color-border)", marginBottom: "1.125rem" }}
              />
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-ink)",
                  marginBottom: "0.625rem",
                }}
              >
                Vinduer & Døre
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "1.25rem",
                }}
              >
                Udskiftning og montering af vinduer og yderdøre. Tætte, korrekt isolerede løsninger med fals og indbygning udført efter gældende krav.
              </p>
              <HoverLink
                href="/ydelser/vinduer-doere"
                baseColor="var(--color-stone)"
                hoverColor="var(--color-ink)"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.8125rem",
                  letterSpacing: "var(--letter-spacing-wide)",
                  textTransform: "uppercase",
                  color: "var(--color-stone)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                }}
              >
                Læs mere <span aria-hidden="true">→</span>
              </HoverLink>
            </article>
          </div>

          {/* ── ROW B: Isolering / Garager / Skure — 4fr / 5fr / 3fr ── */}
          <div className="svc-row-b" role="list">
            {/* Isolering & Lofter */}
            <article className="svc-card" role="listitem">
              <div
                aria-hidden="true"
                style={{ width: "2rem", height: "1px", background: "var(--color-border)", marginBottom: "1.125rem" }}
              />
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-ink)",
                  marginBottom: "0.625rem",
                }}
              >
                Isolering & Lofter
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "1.25rem",
                }}
              >
                Loftsisolering og dampspærre udført korrekt — reducerer varmetab markant og forhindrer kondensproblemer.
              </p>
              <HoverLink
                href="/ydelser/isolering-lofter"
                baseColor="var(--color-stone)"
                hoverColor="var(--color-ink)"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.8125rem",
                  letterSpacing: "var(--letter-spacing-wide)",
                  textTransform: "uppercase",
                  color: "var(--color-stone)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                }}
              >
                Læs mere <span aria-hidden="true">→</span>
              </HoverLink>
            </article>

            {/* Garager & Carporte — wider middle card */}
            <article
              className="svc-card"
              role="listitem"
              style={{ background: "var(--color-bone)" }}
            >
              <div
                aria-hidden="true"
                style={{ width: "2rem", height: "1px", background: "var(--color-border)", marginBottom: "1.125rem" }}
              />
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-ink)",
                  marginBottom: "0.625rem",
                }}
              >
                Garager & Carporte
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "1.25rem",
                }}
              >
                Opførelse af garage eller carport med tømrer- og snedkerkvalitet. Valgfri integrering med eksisterende bygning og tilpasning til din grund.
              </p>
              <HoverLink
                href="/ydelser/garager-carporte"
                baseColor="var(--color-stone)"
                hoverColor="var(--color-ink)"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.8125rem",
                  letterSpacing: "var(--letter-spacing-wide)",
                  textTransform: "uppercase",
                  color: "var(--color-stone)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                }}
              >
                Læs mere <span aria-hidden="true">→</span>
              </HoverLink>
            </article>

            {/* Skure — narrow rightmost */}
            <article
              className="svc-card"
              role="listitem"
              style={{ borderRight: "none" }}
            >
              <div
                aria-hidden="true"
                style={{ width: "2rem", height: "1px", background: "var(--color-border)", marginBottom: "1.125rem" }}
              />
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-ink)",
                  marginBottom: "0.625rem",
                }}
              >
                Skure
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "1.25rem",
                }}
              >
                Solide skure i håndværksmæssig kvalitet. Fundament, konstruktion og beklædning — ikke pavillonkvalitet.
              </p>
              <HoverLink
                href="/ydelser/skure"
                baseColor="var(--color-stone)"
                hoverColor="var(--color-ink)"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.8125rem",
                  letterSpacing: "var(--letter-spacing-wide)",
                  textTransform: "uppercase",
                  color: "var(--color-stone)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                }}
              >
                Læs mere <span aria-hidden="true">→</span>
              </HoverLink>
            </article>
          </div>

          {/* ── ROW C: Tilbygninger (featured, image right) + Fugtskade Sanering ── */}
          {/* L2: 5fr text-left / 7fr featured-image-right: reversed proportion from Row A */}
          <div className="svc-row-c" role="list">
            {/* Fugtskade Sanering — left text card, narrower */}
            <article
              className="svc-card"
              role="listitem"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              {/* Image — catalog-reuse: koebenhavn-lejlighed-skimmel.jpg */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "200px",
                  overflow: "hidden",
                  borderRadius: 0,
                  marginBottom: "2rem",
                  border: "none",
                }}
              >
                <Image
                  src="/images/cases/koebenhavn-lejlighed-skimmel.jpg"
                  alt="Fugtskade og skimmelsvamp — sanering i hele landet"
                  fill
                  sizes="(max-width: 900px) 100vw, 42vw"
                  style={{ objectFit: "cover", objectPosition: "center", borderRadius: 0 }}
                />
              </div>
              <div
                aria-hidden="true"
                style={{ width: "2rem", height: "1px", background: "var(--color-border)", marginBottom: "1.125rem" }}
              />
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.375rem",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-ink)",
                  marginBottom: "0.75rem",
                }}
              >
                Fugtskade Sanering
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "1.375rem",
                }}
              >
                Skimmelsvamp er et indeklima- og sundhedsproblem — ikke et kosmetisk. Vi identificerer kilden, sanerer korrekt og forebygger recidiv. Dokumenteret erfaring fra projekter i hele landet, inkl. København.
              </p>
              <HoverLink
                href="/ydelser/fugtskade-sanering"
                baseColor="var(--color-stone)"
                hoverColor="var(--color-ink)"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.8125rem",
                  letterSpacing: "var(--letter-spacing-wide)",
                  textTransform: "uppercase",
                  color: "var(--color-stone)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                }}
              >
                Læs mere <span aria-hidden="true">→</span>
              </HoverLink>
            </article>

            {/* Tilbygninger — featured, wider, with tilbygning image */}
            <article
              className="svc-card-featured svc-card-featured-c"
              role="listitem"
              style={{
                borderRight: "none",
                borderBottom: "none",
                borderLeft: "1px solid var(--color-border)",
              }}
            >
              {/* Image — catalog-reuse: tilbygning-halgaard-1.jpg */}
              <div className="svc-img-container" style={{ minHeight: "300px" }}>
                <Image
                  src="/images/cases/tilbygning-halgaard-1.jpg"
                  alt="Tilbygning under opførelse i Halgård — tømrer og snedker i ét firma"
                  fill
                  sizes="(max-width: 900px) 100vw, 58vw"
                  style={{ objectFit: "cover", objectPosition: "center", borderRadius: 0 }}
                />
              </div>
              <div style={{ padding: "2.25rem 2.25rem 2.5rem" }}>
                <div
                  aria-hidden="true"
                  style={{ width: "2rem", height: "1px", background: "var(--color-border)", marginBottom: "1.125rem" }}
                />
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.625rem",
                    lineHeight: "var(--line-height-tight)",
                    letterSpacing: "var(--letter-spacing-tight)",
                    color: "var(--color-ink)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Tilbygninger
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9375rem",
                    lineHeight: "var(--line-height-normal)",
                    color: "var(--color-stone)",
                    marginBottom: "1.375rem",
                    maxWidth: "48ch",
                  }}
                >
                  Tilbygning til eksisterende bolig: fundament, rejsning, tagkonstruktion og alle snedkerdetaljer. Én hånd på hele projektet — tømrer og snedker under ét tag. Se vores tilbygning i Halgård som eksempel.
                </p>
                <HoverLink
                  href="/ydelser/tilbygninger"
                  baseColor="var(--color-stone)"
                  hoverColor="var(--color-ink)"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.8125rem",
                    letterSpacing: "var(--letter-spacing-wide)",
                    textTransform: "uppercase",
                    color: "var(--color-stone)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                  }}
                >
                  Læs mere <span aria-hidden="true">→</span>
                </HoverLink>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BYGG GARANTI SIGNAL — before CTA
          Not a full section — a contained typographic statement.
          C5: amber ONLY on Byg Garanti rule and label.
          S4: hairline structure.
          ══════════════════════════════════════════════════ */}

      <section
        style={{
          background: "var(--color-surface-dark)",
          borderTop: "1px solid rgba(245,240,232,0.08)",
          borderBottom: "1px solid rgba(245,240,232,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "3.5rem var(--container-pad-desktop)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "3rem",
              alignItems: "flex-start",
            }}
          >
            {/* Byg Garanti statement — amber signal */}
            <div style={{ flex: "1 1 280px" }}>
              <div
                style={{
                  borderTop: "1px solid var(--color-trust)",
                  paddingTop: "0.5rem",
                  marginBottom: "0.875rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    lineHeight: "var(--line-height-tight)",
                    letterSpacing: "var(--letter-spacing-tight)",
                    color: "var(--color-trust)",
                    display: "block",
                  }}
                >
                  Byg Garanti på alle ydelser
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-clay)",
                  maxWidth: "40ch",
                }}
              >
                3 år på synlige fejl — 10 år på skjulte fejl. Formelt garantiprogram backed af Dansk Byggeri. Det er ikke et løfte — det er en garanti du kan verificere på byggaranti.dk.
              </p>
            </div>

            {/* Nationwide — no amber */}
            <div style={{ flex: "1 1 240px" }}>
              <div
                style={{
                  borderTop: "1px solid rgba(245,240,232,0.15)",
                  paddingTop: "0.5rem",
                  marginBottom: "0.875rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    lineHeight: "var(--line-height-tight)",
                    letterSpacing: "var(--letter-spacing-tight)",
                    color: "var(--color-bone)",
                    display: "block",
                  }}
                >
                  Vi arbejder hele landet
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-clay)",
                  maxWidth: "36ch",
                }}
              >
                Fra Holstebro til København. Alle ydelser tilbydes i hele Danmark.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA BLOCK — shared component
          C5: amber primary CTA.
          D2: section-gap from CtaBlock.
          ══════════════════════════════════════════════════ */}

      <CtaBlock
        heading="Har du et projekt i tankerne?"
        subtext="Kontakt Martin direkte for en uforpligtende snak om dit projekt. Vi rådgiver gerne, inden du beslutter dig — gratis tilbud, ingen forpligtelse."
        primaryCta={{ label: "Få et gratis tilbud", href: "/kontakt" }}
        secondaryCta={{ label: "Ring: 40 36 88 62", href: "tel:+4540368862" }}
        variant="light"
      />
    </>
  );
}
