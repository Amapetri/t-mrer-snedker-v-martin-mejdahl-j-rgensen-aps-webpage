import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBlock } from "@/components/CtaBlock";
import { HoverLink } from "@/components/HoverLink";
import { JsonLd } from "@/components/JsonLd";

// ─────────────────────────────────────────────
// Projekter Hub — /projekter/
// Primary keyword: tømrer projekter referencer Holstebro
// T4: Zilla Slab H1 at service-page scale.
// L2: ASYMMETRIC card layout — 7fr large card, 5fr medium card,
//     then full-width (8fr+) fugtskade card with before/after pair.
//     NOT equal three-up columns — direction brief binding.
// S4: 0px radius everywhere including image wrappers.
// D2: 120px section gaps.
// P3: Authentic case photography — process documentary.
// M1: 150ms hover transitions only.
// C5: amber accent on CTAs only.
// NOTE: fugtskade card ALWAYS shows mold image PAIRED with after image.
//       Brief constraint: never show mold image alone.
// ─────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    "Projekter & Referencer — Tømrer & Snedker Holstebro | Martin Mejdahl Jørgensen",
  description:
    "Se eksempler på vores tømrer- og snedkerarbejde — nyopførelse, tilbygning og fugtskade sanering. Alle projekter med Byg Garanti og dokumenteret med egne billeder.",
  alternates: {
    canonical: "/projekter",
  },
};

// ─────────────────────────────────────────────
// JSON-LD — CollectionPage schema
// ─────────────────────────────────────────────

const projektHubSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Projekter & Referencer",
  description:
    "Se eksempler på vores tømrer- og snedkerarbejde — nyopførelse, tilbygning og fugtskade sanering. Alle projekter med Byg Garanti og dokumenteret med egne billeder.",
  url: "https://www.mejdahltoemrer.dk/projekter",
  provider: {
    "@type": "LocalBusiness",
    "@id": "https://www.mejdahltoemrer.dk/#localbusiness",
    name: "Tømrer & Snedker v/ Martin Mejdahl Jørgensen ApS",
  },
};

// ─────────────────────────────────────────────
// Case data — real project facts, no lorem ipsum
// ─────────────────────────────────────────────

const cases = [
  {
    id: "parcelhus",
    href: "/projekter/parcelhus-holstebro",
    category: "Nybyggeri",
    location: "Holstebro",
    title: "Parcelhus, Holstebro",
    summary:
      "Komplet tømmerkonstruktion fra fundament til tag — undergulv, ydervægsrejsning, spærfag og snedkerdetaljer udført af ét firma. Byg Garanti dækker boligkøber i 3+10 år.",
    imageSrc: "/images/cases/parcelhus-holstebro-2.jpg",
    imageAlt:
      "Ny parcelhus under opførelse i Holstebro — tømrerkonstruktion med rejste vægge og spærfag",
    // SLOT-projekter-hub-card-001: catalog-reuse — parcelhus-holstebro-2.jpg (construction activity visible)
    size: "large", // 7fr in L2 asymmetric grid
  },
  {
    id: "halgaard",
    href: "/projekter/tilbygning-halgaard",
    category: "Tilbygning",
    location: "Halgård",
    title: "Tilbygning, Halgård",
    summary:
      "Strukturel tilbygning med ekstra areal til stue og køkken. Fundament, rejsning og tag integreret med eksisterende hus — ingen koordinering mellem håndværkere.",
    imageSrc: "/images/cases/tilbygning-halgaard-1.jpg",
    imageAlt:
      "Tilbygning under opførelse i Halgård — tømrerkonstruktion med tømmerskelet og tagkonstruktion",
    // SLOT-projekter-hub-card-002: catalog-reuse — tilbygning-halgaard-1.jpg
    size: "medium", // 5fr in L2 asymmetric grid
  },
];

// ─────────────────────────────────────────────
// Page — Server Component
// ─────────────────────────────────────────────

export default async function ProjekterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={projektHubSchema} />

      {/* ══════════════════════════════════════════════════
          SECTION 1 — PAGE HEADER
          L2: full editorial header — breadcrumbs + H1 + intro
          on the bone surface. Hairline bottom rule.
          T4: Zilla Slab H1 at service page scale.
          S4: hairline divider, 0px everything.
          D2: generous vertical padding.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Projekter og referencer"
        style={{
          background: "var(--color-bone)",
          borderBottom: "1px solid var(--color-border)",
          paddingBottom: "var(--section-gap)",
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
          <Breadcrumbs items={[{ label: "Projekter" }]} />

          {/* Hairline divider — S4 structural */}
          <div
            aria-hidden="true"
            style={{
              width: "3rem",
              height: "1px",
              background: "var(--color-border)",
              margin: "1.5rem 0",
            }}
          />

          {/* L2: heading at 7/12 columns width, intro at 6/12 */}
          <div>
            {/* Eyebrow */}
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
              Projekter &amp; referencer
            </span>

            {/* H1 — T4 Zilla Slab */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
                lineHeight: "var(--line-height-tight)",
                letterSpacing: "var(--letter-spacing-tight)",
                color: "var(--color-ink)",
                maxWidth: "14ch",
                marginBottom: "1.5rem",
              }}
            >
              Vores projekter
            </h1>

            {/* Intro paragraph — max 6/12 columns */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                lineHeight: "var(--line-height-normal)",
                color: "var(--color-stone)",
                maxWidth: "58ch",
              }}
            >
              Se eksempler på vores arbejde — fra nyopførelse til fugtskade
              sanering. Alle projekter er udført med Byg Garanti og dokumenteret
              med egne billeder.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 2 — CASE CARDS GRID
          L2 ASYMMETRIC layout (binding — NOT equal three-up):
          Row 1: Card 1 at 7fr (large), Card 2 at 5fr (medium).
          Row 2: Fugtskade card at full width with before/after pair.
          P3: Process documentary images — construction activity.
          S4: 0px radius on image wrappers and cards. Hairline borders.
          C5: amber ONLY on "Læs mere" arrow (hover), location badge uses border.
          D2: 120px section gap top.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Projektoversigt"
        style={{
          background: "var(--color-paper)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          /* L2: top row — 7fr large + 5fr medium (NOT equal) */
          .projekter-top-row {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0;
            border: 1px solid var(--color-border);
            margin-bottom: 0; /* bottom row will continue border visually */
          }
          @media (min-width: 900px) {
            .projekter-top-row {
              grid-template-columns: 7fr 5fr;
            }
          }

          /* Card sizes — large fills the 7fr col, medium fills 5fr */
          .case-card-large {
            position: relative;
            border-right: none;
            border-bottom: 1px solid var(--color-border);
            overflow: hidden;
          }
          @media (min-width: 900px) {
            .case-card-large {
              border-right: 1px solid var(--color-border);
              border-bottom: none;
            }
          }
          .case-card-medium {
            position: relative;
            overflow: hidden;
          }

          /* Image wrapper — S4: 0px radius */
          .case-card-img-wrap {
            position: relative;
            overflow: hidden;
            border-radius: 0;
          }
          .case-card-large .case-card-img-wrap { height: 360px; }
          @media (min-width: 900px) {
            .case-card-large .case-card-img-wrap { height: 440px; }
          }
          .case-card-medium .case-card-img-wrap { height: 280px; }
          @media (min-width: 900px) {
            .case-card-medium .case-card-img-wrap { height: 440px; }
          }

          /* Card content area */
          .case-card-content {
            padding: 1.75rem 2rem 2rem;
            background: var(--color-bone);
          }

          /* L2: bottom row — fugtskade full-width */
          .projekter-bottom-row {
            border: 1px solid var(--color-border);
            border-top: none; /* shares top border with above grid */
            overflow: hidden;
          }

          /* Fugtskade before/after image grid — L2 asymmetric */
          .fugt-img-grid {
            display: grid;
            grid-template-columns: 1fr;
            height: 280px;
          }
          @media (min-width: 768px) {
            .fugt-img-grid {
              grid-template-columns: 5fr 7fr;
              height: 360px;
            }
          }

          /* Badge — location tag */
          .case-location-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.375rem;
            border: 1px solid var(--color-border);
            padding: 0.3rem 0.625rem;
            border-radius: 0;
            background: var(--color-paper);
          }

          /* Hover link arrow — M1: color transition 150ms */
          .case-read-link {
            display: inline-flex;
            align-items: center;
            gap: 0.375rem;
            font-family: var(--font-body);
            font-weight: 600;
            font-size: 0.75rem;
            letter-spacing: var(--letter-spacing-wide);
            text-transform: uppercase;
            text-decoration: none;
            color: var(--color-stone);
            transition: color var(--duration-fast) var(--easing-standard);
          }
          .case-read-link:hover { color: var(--color-ink); }
        `}</style>

        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 var(--container-pad-desktop)",
          }}
        >
          {/* Section heading */}
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
              Tre projekttyper — ét firma, ét ansvar
            </h2>
          </div>

          {/* TOP ROW — large (7fr) + medium (5fr) */}
          <div className="projekter-top-row">
            {cases.map((c) => (
              <article
                key={c.id}
                className={
                  c.size === "large" ? "case-card-large" : "case-card-medium"
                }
              >
                {/* Image — S4: borderRadius 0 on wrapper */}
                {/* SLOT resolved: see case data above */}
                <div className="case-card-img-wrap">
                  <Image
                    src={c.imageSrc}
                    alt={c.imageAlt}
                    fill
                    sizes={
                      c.size === "large"
                        ? "(max-width: 900px) 100vw, 58vw"
                        : "(max-width: 900px) 100vw, 42vw"
                    }
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: 0,
                    }}
                  />
                </div>

                {/* Card content */}
                <div className="case-card-content">
                  {/* Meta row: category + location badge */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      flexWrap: "wrap",
                      marginBottom: "0.875rem",
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
                      {c.category}
                    </span>
                    <span
                      aria-hidden="true"
                      style={{ color: "var(--color-border)" }}
                    >
                      /
                    </span>
                    <div className="case-location-badge">
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          color: "var(--color-stone)",
                        }}
                      >
                        {c.location}
                      </span>
                    </div>
                  </div>

                  {/* Card title — T4 slab */}
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                      lineHeight: "var(--line-height-snug)",
                      letterSpacing: "var(--letter-spacing-tight)",
                      color: "var(--color-ink)",
                      marginBottom: "0.625rem",
                    }}
                  >
                    {c.title}
                  </h3>

                  {/* Summary */}
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9375rem",
                      lineHeight: "var(--line-height-normal)",
                      color: "var(--color-stone)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {c.summary}
                  </p>

                  {/* Read more link */}
                  <HoverLink
                    href={c.href}
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
                    Læs mere <span aria-hidden="true">→</span>
                  </HoverLink>
                </div>
              </article>
            ))}
          </div>

          {/* BOTTOM ROW — Fugtskade card, full width
              BRIEF CONSTRAINT: mold image ALWAYS paired with after image.
              Show before (foer) + mold (skimmel) as BEFORE column,
              then efter as AFTER column. Both visible in the card.
              SLOT-projekter-hub-card-003: catalog-reuse — koebenhavn-lejlighed-skimmel.jpg
              paired with koebenhavn-lejlighed-efter.jpg (before/after treatment) */}
          <article className="projekter-bottom-row">
            {/* Image area — L2: before pair (5fr) + after (7fr) */}
            <div className="fugt-img-grid">
              {/* LEFT: before state — mold image with BEFORE label */}
              <div style={{ position: "relative", overflow: "hidden" }}>
                <Image
                  src="/images/cases/koebenhavn-lejlighed-skimmel.jpg"
                  alt="Skimmelsvamp i lejlighedsvæg i København — fugtskade inden sanering"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: 0,
                  }}
                />
                {/* BEFORE label — always present per brief constraint */}
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    background: "var(--color-ink)",
                    padding: "0.3rem 0.75rem",
                    borderRadius: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "0.6875rem",
                      letterSpacing: "var(--letter-spacing-wide)",
                      textTransform: "uppercase",
                      color: "var(--color-bone)",
                    }}
                  >
                    Før
                  </span>
                </div>
              </div>

              {/* RIGHT: after state — restored apartment */}
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderLeft: "1px solid var(--color-border)",
                }}
              >
                <Image
                  src="/images/cases/koebenhavn-lejlighed-efter.jpg"
                  alt="Renoveret lejlighed i København — efter fugtskade sanering, skimmelsvamp fjernet"
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: 0,
                  }}
                />
                {/* AFTER label */}
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    background: "var(--color-accent)",
                    padding: "0.3rem 0.75rem",
                    borderRadius: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "0.6875rem",
                      letterSpacing: "var(--letter-spacing-wide)",
                      textTransform: "uppercase",
                      color: "#fff",
                    }}
                  >
                    Efter
                  </span>
                </div>
              </div>
            </div>

            {/* Card content — fugtskade */}
            <div
              style={{
                padding: "1.75rem 2rem 2rem",
                background: "var(--color-bone)",
                borderTop: "1px solid var(--color-border)",
              }}
            >
              {/* Meta row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  flexWrap: "wrap",
                  marginBottom: "0.875rem",
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
                  Fugtskade sanering
                </span>
                <span
                  aria-hidden="true"
                  style={{ color: "var(--color-border)" }}
                >
                  /
                </span>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    border: "1px solid var(--color-border)",
                    padding: "0.3rem 0.625rem",
                    borderRadius: 0,
                    background: "var(--color-paper)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "var(--color-stone)",
                    }}
                  >
                    København
                  </span>
                </div>
                {/* Nationwide signal */}
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.6875rem",
                    color: "var(--color-stone)",
                    fontStyle: "normal",
                  }}
                >
                  — Vi arbejder hele landet
                </span>
              </div>

              {/* L2: title + summary side by side on desktop */}
              <style>{`
                .fugt-card-inner {
                  display: grid;
                  grid-template-columns: 1fr;
                  gap: 1rem;
                }
                @media (min-width: 900px) {
                  .fugt-card-inner {
                    grid-template-columns: 5fr 7fr;
                    gap: 3rem;
                    align-items: end;
                  }
                }
              `}</style>
              <div className="fugt-card-inner">
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                      lineHeight: "var(--line-height-snug)",
                      letterSpacing: "var(--letter-spacing-tight)",
                      color: "var(--color-ink)",
                      marginBottom: "0",
                    }}
                  >
                    Fugtskade sanering, København
                  </h3>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9375rem",
                      lineHeight: "var(--line-height-normal)",
                      color: "var(--color-stone)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    Skimmelsvamp opdaget i lejlighed — identifikation, fuld
                    sanering og rekonstruktion. Dokumenteret med før- og
                    efterbilleder. Byg Garanti på skjulte fejl i 10 år.
                  </p>
                  <HoverLink
                    href="/projekter/fugtskade-koebenhavn"
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
                    Læs mere <span aria-hidden="true">→</span>
                  </HoverLink>
                </div>
              </div>
            </div>
          </article>

          {/* Geographic signal */}
          <div
            style={{
              marginTop: "2rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--color-border)",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: "var(--color-stone)",
              }}
            >
              Fra Holstebro til København — vi arbejder hele landet.
            </span>
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
              Byg Garanti på alle projekter
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA BLOCK
          C5: amber primary CTA.
          D2: section-gap handled by CtaBlock.
          ══════════════════════════════════════════════════ */}

      <CtaBlock
        heading="Har du et lignende projekt?"
        subtext="Ring til Martin for en uforpligtende snak om dit projekt. Vi rådgiver gerne, inden du beslutter dig — gratis."
        primaryCta={{ label: "Få et gratis tilbud", href: "/kontakt" }}
        secondaryCta={{ label: "Ring: 40 36 88 62", href: "tel:+4540368862" }}
        variant="light"
      />
    </>
  );
}
