import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBlock } from "@/components/CtaBlock";
import { HoverLink } from "@/components/HoverLink";
import { JsonLd } from "@/components/JsonLd";

// ─────────────────────────────────────────────
// Case 1: Parcelhus Holstebro — /projekter/parcelhus-holstebro/
// Primary keyword: ny parcelhus tømrer Holstebro
// T4: Zilla Slab H1 at service-page scale (56–64px equivalent).
// L2: editorial long-form — hero 7/5, then alternating challenge/solution/result
//     sections with varied column splits. Gallery in asymmetric grid.
// S4: 0px radius on all image wrappers, cards, gallery frames.
// D2: 120px section gaps.
// P3: hero = process shot (frames/structure going up). Gallery uses all 6 images.
//     Photo editorial note: process shots > finished exterior for heroes.
// M1: 150ms hover transitions only.
// C5: amber on CTAs + Byg Garanti trust signal only.
// JSON-LD: Article schema.
// ─────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    "Nyopførelse: Parcelhus i Holstebro | Tømrer Martin Mejdahl Jørgensen",
  description:
    "Komplet tømmerkonstruktion af nyt parcelhus i Holstebro — fundament, vægrejsning, spærfag og snedkerdetaljer. Byg Garanti certificeret. Dokumenteret med egne billeder.",
  alternates: {
    canonical: "/projekter/parcelhus-holstebro",
  },
};

// ─────────────────────────────────────────────
// JSON-LD — Article schema
// ─────────────────────────────────────────────

const parcelhusSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Nyopførelse: Parcelhus i Holstebro",
  description:
    "Komplet tømmerkonstruktion af nyt parcelhus i Holstebro — fundament, vægrejsning, spærfag og snedkerdetaljer. Byg Garanti certificeret.",
  datePublished: "2015-01-01",
  image: "https://www.mejdahltoemrer.dk/images/cases/parcelhus-holstebro-1.jpg",
  author: {
    "@type": "Person",
    name: "Martin Mejdahl Jørgensen",
  },
  publisher: {
    "@type": "Organization",
    "@id": "https://www.mejdahltoemrer.dk/#localbusiness",
    name: "Tømrer & Snedker v/ Martin Mejdahl Jørgensen ApS",
  },
  about: {
    "@type": "LocalBusiness",
    "@id": "https://www.mejdahltoemrer.dk/#localbusiness",
  },
};

// ─────────────────────────────────────────────
// Gallery images — all 6, ordered for narrative arc:
// process-forward first (structure going up), resolved exterior last
// P3: best images for heroes are those showing construction, not finished exterior
// ─────────────────────────────────────────────

const galleryImages = [
  {
    src: "/images/cases/parcelhus-holstebro-2.jpg",
    alt: "Parcelhus konstruktion i Holstebro — tømmerskelet under rejsning",
    // SLOT-parcelhus-gallery-001: catalog-reuse — parcelhus-holstebro-2.jpg
    size: "large", // 8fr in asymmetric gallery
  },
  {
    src: "/images/cases/parcelhus-holstebro-3.jpg",
    alt: "Ny parcelhus i Holstebro — tagkonstruktion og spærfag",
    // SLOT-parcelhus-gallery-002: catalog-reuse — parcelhus-holstebro-3.jpg
    size: "medium", // 4fr
  },
  {
    src: "/images/cases/parcelhus-holstebro-4.jpg",
    alt: "Parcelhus under opførelse — ydervæg og vindueshuller",
    // SLOT-parcelhus-gallery-003: catalog-reuse — parcelhus-holstebro-4.jpg
    size: "medium", // 5fr
  },
  {
    src: "/images/cases/parcelhus-holstebro-5.jpg",
    alt: "Parcelhus Holstebro — konstruktion, fundament og vægge",
    // SLOT-parcelhus-gallery-004: catalog-reuse — parcelhus-holstebro-5.jpg
    size: "large", // 7fr
  },
  {
    src: "/images/cases/parcelhus-holstebro-6.jpg",
    alt: "Færdigt parcelhus i Holstebro — resultat af tømrer- og snedkerarbejde",
    // SLOT-parcelhus-gallery-005: catalog-reuse — parcelhus-holstebro-6.jpg
    size: "full", // full width — finished result at close of narrative
  },
];

// ─────────────────────────────────────────────
// Page — Server Component
// ─────────────────────────────────────────────

export default async function ParcelhusPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={parcelhusSchema} />

      {/* ══════════════════════════════════════════════════
          SECTION 1 — HERO
          L2: 7/5 asymmetric — text left, process image right.
          P3: hero = construction activity (parcelhus-holstebro-1.jpg
              — structural frame/roof being raised — NOT finished exterior).
          SLOT-parcelhus-hero-001: catalog-reuse — parcelhus-holstebro-1.jpg
          T4: H1 at service-page scale.
          S4: 0px radius, hairline border bottom.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Nyopførelse: Parcelhus i Holstebro"
        style={{
          background: "var(--color-bone)",
          borderBottom: "1px solid var(--color-border)",
          overflow: "hidden",
        }}
      >
        <style>{`
          .parcelhus-hero-grid {
            display: grid;
            grid-template-columns: 1fr;
            min-height: 480px;
          }
          @media (min-width: 1024px) {
            .parcelhus-hero-grid {
              grid-template-columns: 7fr 5fr;
              min-height: 560px;
            }
          }
          .parcelhus-hero-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 3.5rem 1.5rem;
          }
          @media (min-width: 1024px) {
            .parcelhus-hero-text {
              padding: 5rem 3rem 5rem max(3rem, calc((100vw - 80rem) / 2 + 3rem));
            }
          }
          .parcelhus-hero-img {
            position: relative;
            min-height: 300px;
            overflow: hidden;
          }
          @media (min-width: 1024px) {
            .parcelhus-hero-img { min-height: 0; }
          }
        `}</style>

        <div className="parcelhus-hero-grid">
          {/* LEFT: Text */}
          <div className="parcelhus-hero-text">
            <Breadcrumbs
              items={[
                { label: "Projekter", href: "/projekter" },
                { label: "Parcelhus, Holstebro" },
              ]}
            />

            <div
              aria-hidden="true"
              style={{
                width: "3rem",
                height: "1px",
                background: "var(--color-border)",
                margin: "1.5rem 0",
              }}
            />

            {/* Category tags */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                marginBottom: "1rem",
                flexWrap: "wrap",
              }}
            >
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
                Nybyggeri
              </span>
              <span style={{ color: "var(--color-border)" }} aria-hidden="true">
                /
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--color-stone)",
                }}
              >
                Holstebro
              </span>
            </div>

            {/* H1 */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: "var(--line-height-tight)",
                letterSpacing: "var(--letter-spacing-tight)",
                color: "var(--color-ink)",
                maxWidth: "16ch",
                marginBottom: "1.5rem",
              }}
            >
              Nyopførelse: Parcelhus i Holstebro
            </h1>

            {/* Lead */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                lineHeight: "var(--line-height-snug)",
                color: "var(--color-stone)",
                maxWidth: "46ch",
                marginBottom: "2rem",
              }}
            >
              Bygherre ønskede ét firma som ansvarlig for den komplette
              tømmerdel — fra undergulv og rejsning til tag og snedkerdetaljer.
              Byg Garanti sikrer boligkøber i 3+10 år.
            </p>

            {/* Byg Garanti trust signal — C5: amber on trust signal */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.875rem 1.25rem",
                border: "1px solid var(--color-border)",
                borderRadius: 0,
                background: "var(--color-paper)",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: "1.5rem",
                  height: "1px",
                  background: "var(--color-trust)",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.8125rem",
                  color: "var(--color-trust)",
                  letterSpacing: "var(--letter-spacing-wide)",
                  textTransform: "uppercase",
                }}
              >
                Byg Garanti
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8125rem",
                  color: "var(--color-stone)",
                }}
              >
                — 3 + 10 år garanti
              </span>
            </div>
          </div>

          {/* RIGHT: Process image — P3, S4: 0px radius */}
          {/* SLOT-parcelhus-hero-001: catalog-reuse — parcelhus-holstebro-1.jpg */}
          <div className="parcelhus-hero-img">
            <Image
              src="/images/cases/parcelhus-holstebro-1.jpg"
              alt="Ny parcelhus under opførelse i Holstebro — tømmerkonstruktion, vægge og tagspær rejst"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              style={{
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: 0,
              }}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 2 — CHALLENGE
          L2: 6/6 split — text at 6fr left, structural detail inset 6fr right.
          Different column split from hero (was 7/5).
          T4: H2 in Zilla Slab.
          S4: hairlines, 0px.
          D2: 120px section gap.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Projektets udfordring"
        style={{
          background: "var(--color-paper)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          .challenge-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          @media (min-width: 1024px) {
            .challenge-grid {
              grid-template-columns: 6fr 6fr;
              gap: 6rem;
              align-items: start;
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
          <div className="challenge-grid">
            {/* LEFT: Challenge copy */}
            <div>
              <div
                aria-hidden="true"
                style={{
                  width: "3rem",
                  height: "1px",
                  background: "var(--color-border)",
                  marginBottom: "1.5rem",
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
                  display: "block",
                  marginBottom: "1rem",
                }}
              >
                Udfordringen
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(1.5rem, 2.75vw, 2.25rem)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-ink)",
                  marginBottom: "1.25rem",
                }}
              >
                Ét firma som ansvarlig for hele tømmerdelen
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "1rem",
                }}
              >
                Bygherre ønskede et nyt parcelhus opført fra bund — fundament,
                rejsning, tag og alle snedkerdetaljer — med ét firma som
                ansvarlig for hele tømmerdelen.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                }}
              >
                For private bygherrer er koordinering mellem håndværkere en af
                de største risici i nybyggeri. Fejl i overgangene — der hvor
                tømmerkonstruktionen møder snedkerdetaljerne — er ofte
                bygherrerens problem at løse. Her var opgaven klar: ét firma,
                ét ansvar.
              </p>
            </div>

            {/* RIGHT: Project specs panel */}
            <div
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: 0,
                background: "var(--color-bone)",
                padding: "2rem",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: "1.5rem",
                  height: "1px",
                  background: "var(--color-border)",
                  marginBottom: "1.25rem",
                }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "var(--color-ink)",
                  marginBottom: "1.5rem",
                  letterSpacing: "var(--letter-spacing-tight)",
                }}
              >
                Projektdetaljer
              </h3>

              {[
                { label: "Projekttype", value: "Nyopførelse" },
                { label: "Lokation", value: "Holstebro" },
                { label: "Ydelser", value: "Tømmerkonstruktion, Snedker" },
                { label: "Garanti", value: "Byg Garanti 3+10 år" },
                { label: "Dækning", value: "Hele landet" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                    paddingBottom: "1rem",
                    marginBottom: "1rem",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "0.6875rem",
                      letterSpacing: "var(--letter-spacing-wide)",
                      textTransform: "uppercase",
                      color: "var(--color-stone)",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9375rem",
                      color: "var(--color-ink)",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 3 — SOLUTION
          L2: 5/7 (REVERSED from challenge — text right, wider),
          dark surface left panel.
          Different composition from challenge (was 6/6).
          T4: H2 slab. C5: dark surface = --color-surface-dark.
          S4: 0px.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Vores løsning"
        style={{
          background: "var(--color-bone)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          .solution-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0;
          }
          @media (min-width: 1024px) {
            .solution-grid {
              grid-template-columns: 5fr 7fr;
              align-items: stretch;
            }
          }
          .solution-left {
            background: var(--color-surface-dark);
            padding: 3rem;
          }
          @media (min-width: 1024px) {
            .solution-left { padding: 4rem 3rem; }
          }
          .solution-right {
            padding: 3rem 1.5rem;
          }
          @media (min-width: 1024px) {
            .solution-right {
              padding: 4rem 3rem 4rem 4rem;
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
          <div className="solution-grid">
            {/* LEFT: Dark panel — service scope visual */}
            <div className="solution-left">
              <div
                aria-hidden="true"
                style={{
                  width: "3rem",
                  height: "1px",
                  background: "rgba(245,240,232,0.2)",
                  marginBottom: "1.5rem",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "var(--letter-spacing-wide)",
                  textTransform: "uppercase",
                  color: "var(--color-clay)",
                  display: "block",
                  marginBottom: "1.5rem",
                }}
              >
                Ydelser på projektet
              </span>

              {/* Services list */}
              {[
                "Undergulv og fundament",
                "Ydervægsrejsning",
                "Tagkonstruktion og spærfag",
                "Vinduer og yderdøre",
                "Indvendige snedkerdetaljer",
                "Lister og afslutninger",
              ].map((service) => (
                <div
                  key={service}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      width: "1rem",
                      height: "1px",
                      background: "rgba(245,240,232,0.25)",
                      flexShrink: 0,
                      marginTop: "0.625rem",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9375rem",
                      lineHeight: "var(--line-height-snug)",
                      color: "var(--color-bone)",
                    }}
                  >
                    {service}
                  </span>
                </div>
              ))}
            </div>

            {/* RIGHT: Solution copy */}
            <div className="solution-right">
              <div
                aria-hidden="true"
                style={{
                  width: "3rem",
                  height: "1px",
                  background: "var(--color-border)",
                  marginBottom: "1.5rem",
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
                  display: "block",
                  marginBottom: "1rem",
                }}
              >
                Løsningen
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(1.5rem, 2.75vw, 2.25rem)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-ink)",
                  marginBottom: "1.25rem",
                }}
              >
                Komplet tømmerkonstruktion — tømrer og snedker i ét firma
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "1rem",
                }}
              >
                Vi stod for den komplette tømmerkonstruktion: fra undergulv og
                ydervægsrejsning til tagets spærfag og afsluttende
                snedkerdetaljer. Tømrer og snedker i ét firma betød, at
                overgangene mellem konstruktion og finish var vores ansvar —
                ikke bygherens koordineringsproblem.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "1.5rem",
                }}
              >
                Vinduer og yderdøre er monteret af den samme hånd som rejste
                vægstrukturerne — det giver tætte indbygninger og korrekt fals
                fra starten, ikke eftertanker.
              </p>

              {/* Link to tilbygninger service — related */}
              <HoverLink
                href="/ydelser/tilbygninger"
                baseColor="var(--color-stone)"
                hoverColor="var(--color-ink)"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "var(--letter-spacing-wide)",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  color: "var(--color-stone)",
                }}
              >
                Se tilbygninger &amp; konstruktion <span aria-hidden="true">→</span>
              </HoverLink>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 4 — EDITORIAL GALLERY
          All 6 parcelhus images in an asymmetric editorial grid.
          L2: varied sizes — NOT equal thumbnails. Process shots
          prominent, finished exterior at narrative close.
          S4: 0px radius on ALL image frames.
          P3: process-forward ordering.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Projektbilleder — Parcelhus Holstebro"
        style={{
          background: "var(--color-paper)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          /* L2 asymmetric gallery — NOT equal thumbnails */

          /* Row 1: hero image large (8fr) + two stacked (4fr) */
          .gallery-row-1 {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0;
            border: 1px solid var(--color-border);
            border-bottom: none;
          }
          @media (min-width: 768px) {
            .gallery-row-1 {
              grid-template-columns: 8fr 4fr;
            }
          }

          .gallery-img-wrap {
            position: relative;
            overflow: hidden;
            border-radius: 0;
          }

          .gallery-img-large { height: 360px; }
          @media (min-width: 768px) { .gallery-img-large { height: 500px; } }

          .gallery-img-medium { height: 280px; }
          @media (min-width: 768px) {
            .gallery-img-medium { height: 245px; }
          }

          .gallery-stacked-right {
            display: grid;
            grid-template-rows: 1fr 1fr;
            border-left: 1px solid var(--color-border);
          }
          .gallery-stacked-right .gallery-img-wrap + .gallery-img-wrap {
            border-top: 1px solid var(--color-border);
          }

          /* Row 2: two side by side (5fr + 7fr) */
          .gallery-row-2 {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0;
            border: 1px solid var(--color-border);
            border-top: none;
          }
          @media (min-width: 768px) {
            .gallery-row-2 {
              grid-template-columns: 5fr 7fr;
            }
          }
          .gallery-row-2 .gallery-img-wrap { height: 320px; }
          .gallery-row-2 .gallery-img-wrap + .gallery-img-wrap {
            border-top: 1px solid var(--color-border);
          }
          @media (min-width: 768px) {
            .gallery-row-2 .gallery-img-wrap { height: 380px; }
            .gallery-row-2 .gallery-img-wrap + .gallery-img-wrap {
              border-top: none;
              border-left: 1px solid var(--color-border);
            }
          }

          /* Row 3: full width — finished result at narrative close */
          .gallery-row-3 {
            border: 1px solid var(--color-border);
            border-top: none;
          }
          .gallery-row-3 .gallery-img-wrap { height: 320px; }
          @media (min-width: 768px) {
            .gallery-row-3 .gallery-img-wrap { height: 420px; }
          }
        `}</style>

        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 var(--container-pad-desktop)",
          }}
        >
          <div style={{ marginBottom: "2.5rem" }}>
            <div
              aria-hidden="true"
              style={{
                width: "3rem",
                height: "1px",
                background: "var(--color-border)",
                marginBottom: "1.25rem",
              }}
            />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(1.25rem, 2.25vw, 1.75rem)",
                lineHeight: "var(--line-height-tight)",
                letterSpacing: "var(--letter-spacing-tight)",
                color: "var(--color-ink)",
              }}
            >
              Projektbilleder
            </h2>
          </div>

          {/* Row 1: large (img[1]) + stacked right (img[2] + img[3]) */}
          <div className="gallery-row-1">
            <div className="gallery-img-wrap gallery-img-large">
              <Image
                src="/images/cases/parcelhus-holstebro-2.jpg"
                alt="Parcelhus konstruktion i Holstebro — tømmerskelet under rejsning"
                fill
                sizes="(max-width: 768px) 100vw, 67vw"
                style={{ objectFit: "cover", borderRadius: 0 }}
              />
            </div>
            <div className="gallery-stacked-right">
              <div className="gallery-img-wrap gallery-img-medium">
                <Image
                  src="/images/cases/parcelhus-holstebro-3.jpg"
                  alt="Parcelhus Holstebro — tagkonstruktion og spærfag monteret"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover", borderRadius: 0 }}
                />
              </div>
              <div className="gallery-img-wrap gallery-img-medium">
                <Image
                  src="/images/cases/parcelhus-holstebro-4.jpg"
                  alt="Ydervæg og vindueshuller under opførelse — parcelhus Holstebro"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover", borderRadius: 0 }}
                />
              </div>
            </div>
          </div>

          {/* Row 2: medium (img[4]) + wider (img[5]) */}
          <div className="gallery-row-2">
            <div className="gallery-img-wrap">
              <Image
                src="/images/cases/parcelhus-holstebro-5.jpg"
                alt="Parcelhus under opførelse — konstruktionsdetaljer og fundament"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                style={{ objectFit: "cover", borderRadius: 0 }}
              />
            </div>
            <div className="gallery-img-wrap">
              <Image
                src="/images/cases/parcelhus-holstebro-6.jpg"
                alt="Færdigt parcelhus i Holstebro — afsluttet tømrer- og snedkerarbejde"
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                style={{ objectFit: "cover", borderRadius: 0 }}
              />
            </div>
          </div>

          {/* Caption — editorial */}
          <div
            style={{
              marginTop: "1.25rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8125rem",
                color: "var(--color-stone)",
                lineHeight: "var(--line-height-normal)",
                maxWidth: "48ch",
              }}
            >
              Egne billeder fra projektet — konstruktionsfase til aflevering.
              Alle 6 billeder fra denne nyopførelse.
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--color-stone)",
                whiteSpace: "nowrap",
              }}
            >
              Holstebro · Nybyggeri
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 5 — RESULT
          L2: full-width editorial — result at 7/12 with
          Byg Garanti fact panel on the right 5/12.
          T4: Zilla Slab for result heading.
          C5: amber ONLY on Byg Garanti signal.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Projektresultat og garanti"
        style={{
          background: "var(--color-bone)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          .result-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          @media (min-width: 1024px) {
            .result-grid {
              grid-template-columns: 7fr 5fr;
              gap: 5rem;
              align-items: start;
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
          <div className="result-grid">
            {/* LEFT: Result copy */}
            <div>
              <div
                aria-hidden="true"
                style={{
                  width: "3rem",
                  height: "1px",
                  background: "var(--color-border)",
                  marginBottom: "1.5rem",
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
                  display: "block",
                  marginBottom: "1rem",
                }}
              >
                Resultatet
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(1.5rem, 2.75vw, 2.25rem)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-ink)",
                  marginBottom: "1.25rem",
                }}
              >
                Nøglefærdigt — tømmerdelen afleveret til aftalt tid
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "1rem",
                }}
              >
                Nøglefærdigt hus — tømmerdelen afleveret til aftalt tid. Byg
                Garanti sikrer boligkøber i 3+10 år: 3 år på synlige fejl og
                mangler, 10 år på skjulte fejl i konstruktionen.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                }}
              >
                Bygherres primære bekymring — koordineringsgabet mellem
                tømmerkonstruktion og snedkerdetaljer — blev elimineret ved
                brug af ét firma for begge discipliner. Det er hvad tømrer og
                snedker under samme tag konkret betyder i praksis.
              </p>
            </div>

            {/* RIGHT: Byg Garanti fact panel */}
            <div
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: 0,
                background: "var(--color-paper)",
                padding: "2rem",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: "3rem",
                  height: "1px",
                  background: "var(--color-trust)",
                  marginBottom: "1.25rem",
                }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.125rem",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-ink)",
                  marginBottom: "1.25rem",
                }}
              >
                Byg Garanti
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "1.5rem",
                }}
              >
                En formel garantiordning backed af Dansk Byggeri — ikke et
                løfte, men en juridisk bindende garanti du selv kan verificere
                på byggaranti.dk.
              </p>
              {[
                { years: "3 år", desc: "Synlige fejl og mangler" },
                { years: "10 år", desc: "Skjulte konstruktionsfejl" },
              ].map((g) => (
                <div
                  key={g.years}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                    marginBottom: "1rem",
                    paddingBottom: "1rem",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "1.25rem",
                      color: "var(--color-trust)",
                      fontWeight: 400,
                    }}
                  >
                    {g.years}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      color: "var(--color-stone)",
                    }}
                  >
                    {g.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 6 — RELATED SERVICE
          Link to tilbygninger service page.
          S4: hairline border card. T4: slab heading.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Relateret ydelse"
        style={{
          background: "var(--color-paper)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 var(--container-pad-desktop)",
          }}
        >
          <div style={{ marginBottom: "2rem" }}>
            <div
              aria-hidden="true"
              style={{
                width: "3rem",
                height: "1px",
                background: "var(--color-border)",
                marginBottom: "1.25rem",
              }}
            />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(1.25rem, 2vw, 1.625rem)",
                lineHeight: "var(--line-height-tight)",
                letterSpacing: "var(--letter-spacing-tight)",
                color: "var(--color-ink)",
              }}
            >
              Relateret ydelse
            </h2>
          </div>

          {/* L2: service card not full-width — 7/12 columns */}
          <div
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: 0,
              background: "var(--color-bone)",
              padding: "2rem",
              maxWidth: "56rem",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: "1.5rem",
                height: "1px",
                background: "var(--color-border)",
                marginBottom: "0.875rem",
              }}
            />
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.25rem",
                lineHeight: "var(--line-height-snug)",
                letterSpacing: "var(--letter-spacing-tight)",
                color: "var(--color-ink)",
                marginBottom: "0.5rem",
              }}
            >
              Tilbygninger &amp; nybyggeri
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                lineHeight: "var(--line-height-normal)",
                color: "var(--color-stone)",
                marginBottom: "1.25rem",
                maxWidth: "52ch",
              }}
            >
              Strukturel opførelse fra fundament — tømmerskelet, tag, og
              snedkerdetaljer. Byg Garanti på alt arbejde.
            </p>
            <HoverLink
              href="/ydelser/tilbygninger"
              baseColor="var(--color-stone)"
              hoverColor="var(--color-ink)"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "var(--letter-spacing-wide)",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                color: "var(--color-stone)",
              }}
            >
              Se tilbygninger <span aria-hidden="true">→</span>
            </HoverLink>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA BLOCK
          ══════════════════════════════════════════════════ */}

      <CtaBlock
        heading="Har du et lignende projekt?"
        subtext="Planlægger du nybyggeri eller en større konstruktionsopgave? Ring til Martin for en uforpligtende snak — gratis tilbud med specifikation."
        primaryCta={{ label: "Få et gratis tilbud", href: "/kontakt" }}
        secondaryCta={{ label: "Ring: 40 36 88 62", href: "tel:+4540368862" }}
        variant="light"
      />
    </>
  );
}
