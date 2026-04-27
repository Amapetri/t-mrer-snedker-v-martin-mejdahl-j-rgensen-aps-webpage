import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBlock } from "@/components/CtaBlock";
import { HoverLink } from "@/components/HoverLink";
import { JsonLd } from "@/components/JsonLd";

// ─────────────────────────────────────────────
// Case 2: Tilbygning Halgård — /projekter/tilbygning-halgaard/
// Primary keyword: tilbygning tømrer Holstebro
// T4: Zilla Slab H1 at service-page scale.
// L2: editorial long-form — hero IMAGE LEFT (5/7), reversed from parcelhus.
//     Challenge/solution alternate column splits. Gallery: 4-6 images.
// S4: 0px radius on all image wrappers.
// D2: 120px section gaps.
// P3: construction process shots — timber frame, foundation, wall construction.
// M1: 150ms hover transitions only.
// C5: amber on CTAs + Byg Garanti trust signal only.
// JSON-LD: Article schema.
// ─────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Tilbygning i Halgård | Tømrer Holstebro — Martin Mejdahl Jørgensen",
  description:
    "Strukturel tilbygning i Halgård nær Holstebro — fundament, tømmerskelet, tagkonstruktion integreret med eksisterende hus. Byg Garanti certificeret.",
  alternates: {
    canonical: "/projekter/tilbygning-halgaard",
  },
};

// ─────────────────────────────────────────────
// JSON-LD — Article schema
// ─────────────────────────────────────────────

const tilbygningSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Tilbygning i Halgård",
  description:
    "Strukturel tilbygning i Halgård nær Holstebro — fundament, tømmerskelet, tagkonstruktion integreret med eksisterende hus. Byg Garanti certificeret.",
  datePublished: "2015-01-01",
  image: "https://www.mejdahltoemrer.dk/images/cases/tilbygning-halgaard-1.jpg",
  author: {
    "@type": "Person",
    name: "Martin Mejdahl Jørgensen",
  },
  publisher: {
    "@type": "Organization",
    "@id": "https://www.mejdahltoemrer.dk/#localbusiness",
    name: "Tømrer & Snedker v/ Martin Mejdahl Jørgensen ApS",
  },
};

// ─────────────────────────────────────────────
// Page — Server Component
// ─────────────────────────────────────────────

export default async function TilbygningHalgaardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={tilbygningSchema} />

      {/* ══════════════════════════════════════════════════
          SECTION 1 — HERO
          L2: 5/7 — IMAGE LEFT (wider), text right (narrower).
          Reversed from the parcelhus hero (which was 7/5 text left).
          Intentional L2 variation: the tilbygning visual evidence
          is the dominant message — image gets wider column.
          SLOT-tilbygning-hero-001: catalog-reuse — tilbygning-halgaard-1.jpg
          P3: construction frame visible, process documentary.
          S4: 0px radius, hairline border bottom.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Tilbygning i Halgård nær Holstebro"
        style={{
          background: "var(--color-bone)",
          borderBottom: "1px solid var(--color-border)",
          overflow: "hidden",
        }}
      >
        <style>{`
          /* L2: 5/7 — image LEFT wider, text right narrower */
          /* Reversed from parcelhus hero (7/5 text left) */
          .tilbygning-hero-grid {
            display: grid;
            grid-template-columns: 1fr;
            min-height: 480px;
          }
          @media (min-width: 1024px) {
            .tilbygning-hero-grid {
              grid-template-columns: 5fr 7fr;
              min-height: 560px;
            }
          }
          .tilbygning-hero-img {
            position: relative;
            min-height: 300px;
            overflow: hidden;
            order: 1;
          }
          @media (min-width: 1024px) {
            .tilbygning-hero-img {
              order: 0;
              min-height: 0;
            }
          }
          .tilbygning-hero-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 3.5rem 1.5rem;
            order: 0;
          }
          @media (min-width: 1024px) {
            .tilbygning-hero-text {
              order: 1;
              padding: 5rem max(3rem, calc((100vw - 80rem) / 2 + 3rem)) 5rem 3rem;
            }
          }
        `}</style>

        <div className="tilbygning-hero-grid">
          {/* LEFT: Process image — P3 construction, S4: 0px */}
          {/* SLOT-tilbygning-hero-001: catalog-reuse — tilbygning-halgaard-1.jpg */}
          <div className="tilbygning-hero-img">
            <Image
              src="/images/cases/tilbygning-halgaard-1.jpg"
              alt="Tilbygning under opførelse i Halgård — tømmerskelet og tagkonstruktion"
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

          {/* RIGHT: Text — narrower column, right-aligned editorially */}
          <div className="tilbygning-hero-text">
            <Breadcrumbs
              items={[
                { label: "Projekter", href: "/projekter" },
                { label: "Tilbygning, Halgård" },
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
                Tilbygning
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
                Halgård
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
                maxWidth: "14ch",
                marginBottom: "1.5rem",
              }}
            >
              Tilbygning i Halgård
            </h1>

            {/* Lead */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                lineHeight: "var(--line-height-snug)",
                color: "var(--color-stone)",
                maxWidth: "44ch",
                marginBottom: "2rem",
              }}
            >
              Ekstra areal til stue og køkken — tilbygning integreret med det
              eksisterende hus under ét tag. Fundament, rejsning og
              snedkerdetaljer fra ét firma.
            </p>

            {/* Trust signal */}
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
                — Halgård, Holstebro
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 2 — CHALLENGE
          L2: 7/5 text left, project context right.
          Different from hero (was 5/7 reversed).
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
          .tilbygning-challenge-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          @media (min-width: 1024px) {
            .tilbygning-challenge-grid {
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
          <div className="tilbygning-challenge-grid">
            {/* LEFT: Challenge copy — wider */}
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
                Tilbygning integreret med eksisterende hus — under ét tag
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
                Husejere ønskede at udvide boligen med en tilbygning — ekstra
                areal til stue og køkken — integreret med det eksisterende hus
                under ét tag.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                }}
              >
                Integrationen er den svære del: tagkonstruktionen skal samles
                med det eksisterende, ydervæg skal brydes op og lukkes
                forsvarligt igen, og alle overgange skal tætnes korrekt.
                Koordineringen af disse arbejder kræver, at ét firma
                kontrollerer hele processen.
              </p>
            </div>

            {/* RIGHT: Project specs — narrow */}
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
                { label: "Projekttype", value: "Tilbygning" },
                { label: "Lokation", value: "Halgård, Holstebro" },
                { label: "Ydelser", value: "Fundament, Konstruktion, Snedker" },
                { label: "Integration", value: "Eksisterende hus under ét tag" },
                { label: "Garanti", value: "Byg Garanti 3+10 år" },
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
          SECTION 3 — SOLUTION + GALLERY
          L2: solution copy at 6fr, gallery image pair at 6fr.
          Editorial inset of tilbygning images within solution section.
          SLOT-tilbygning-gallery-001/002: catalog-reuse
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Løsning og konstruktionsbilleder"
        style={{
          background: "var(--color-bone)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          .solution-inset-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          @media (min-width: 1024px) {
            .solution-inset-grid {
              grid-template-columns: 6fr 6fr;
              gap: 5rem;
              align-items: start;
            }
          }
          /* Gallery pair within solution: stacked images */
          .solution-gallery-pair {
            display: grid;
            grid-template-rows: 1fr 1fr;
            gap: 0;
            border: 1px solid var(--color-border);
            border-radius: 0;
          }
          .solution-gallery-img {
            position: relative;
            height: 220px;
            overflow: hidden;
            border-radius: 0;
          }
          @media (min-width: 1024px) {
            .solution-gallery-img { height: 240px; }
          }
          .solution-gallery-img + .solution-gallery-img {
            border-top: 1px solid var(--color-border);
          }
        `}</style>

        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 var(--container-pad-desktop)",
          }}
        >
          <div className="solution-inset-grid">
            {/* LEFT: Solution copy */}
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
                Fra fundament til snedkerdetaljer — ét firma, ét ansvar
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
                Vi projekterede og oprejste tilbygningen fra fundament:
                betonunderlag, massivt tømmerskelet, tagkonstruktion og
                integration med eksisterende ydervæg. Snedkerdetaljer —
                vinduer, døre og indvendige lister — udføres af samme hånd som
                konstruktionen.
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
                Integrationen af den nye tagkonstruktion med det eksisterende tag
                er det punkt, der kræver mest præcision. Da vi styrer begge sider
                af arbejdet — konstruktion og finish — kan vi sikre, at alle
                overgange er korrekte fra start, ikke eftertanker.
              </p>

              {/* Service link */}
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
                Se tilbygninger som ydelse <span aria-hidden="true">→</span>
              </HoverLink>
            </div>

            {/* RIGHT: Two stacked process images */}
            {/* SLOT-tilbygning-gallery-001/002: catalog-reuse */}
            <div className="solution-gallery-pair">
              <div className="solution-gallery-img">
                <Image
                  src="/images/cases/tilbygning-halgaard-2.jpg"
                  alt="Tilbygning Halgård — tømmerskelet under opførelse"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ objectFit: "cover", borderRadius: 0 }}
                />
              </div>
              <div className="solution-gallery-img">
                <Image
                  src="/images/cases/tilbygning-halgaard-3.jpg"
                  alt="Tilbygning Halgård — tagkonstruktion integreret med eksisterende hus"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ objectFit: "cover", borderRadius: 0 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 4 — EXTENDED GALLERY
          Remaining tilbygning images 4-6 in editorial layout.
          L2: asymmetric — 4fr + 8fr (NOT equal).
          SLOT-tilbygning-gallery-003/004/005: catalog-reuse
          S4: 0px radius on all image frames.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Yderligere projektbilleder"
        style={{
          background: "var(--color-paper)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          /* L2 gallery row: 4fr + 8fr (NOT equal) */
          .tilbygning-gallery-row {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0;
            border: 1px solid var(--color-border);
          }
          @media (min-width: 768px) {
            .tilbygning-gallery-row {
              grid-template-columns: 4fr 8fr;
            }
          }
          .tilbygning-gallery-img {
            position: relative;
            height: 300px;
            overflow: hidden;
            border-radius: 0;
          }
          @media (min-width: 768px) {
            .tilbygning-gallery-img { height: 400px; }
          }
          .tilbygning-gallery-img + .tilbygning-gallery-img {
            border-top: 1px solid var(--color-border);
          }
          @media (min-width: 768px) {
            .tilbygning-gallery-img + .tilbygning-gallery-img {
              border-top: none;
              border-left: 1px solid var(--color-border);
            }
          }

          /* Full width final image */
          .tilbygning-gallery-full {
            border: 1px solid var(--color-border);
            border-top: none;
          }
          .tilbygning-gallery-full-img {
            position: relative;
            height: 280px;
            overflow: hidden;
            border-radius: 0;
          }
          @media (min-width: 768px) {
            .tilbygning-gallery-full-img { height: 360px; }
          }
        `}</style>

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
                fontSize: "clamp(1.25rem, 2.25vw, 1.75rem)",
                lineHeight: "var(--line-height-tight)",
                letterSpacing: "var(--letter-spacing-tight)",
                color: "var(--color-ink)",
              }}
            >
              Projektbilleder
            </h2>
          </div>

          {/* Row: narrow (4fr) + wide (8fr) — NOT equal */}
          {/* SLOT-tilbygning-gallery-003/004: catalog-reuse */}
          <div className="tilbygning-gallery-row">
            <div className="tilbygning-gallery-img">
              <Image
                src="/images/cases/tilbygning-halgaard-4.jpg"
                alt="Tilbygning Halgård — fundament og betonunderlag"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover", borderRadius: 0 }}
              />
            </div>
            <div className="tilbygning-gallery-img">
              <Image
                src="/images/cases/tilbygning-halgaard-5.jpg"
                alt="Tilbygning Halgård — konstruktion og integration med eksisterende hus"
                fill
                sizes="(max-width: 768px) 100vw, 67vw"
                style={{ objectFit: "cover", borderRadius: 0 }}
              />
            </div>
          </div>

          {/* Full-width final image — result state at close of narrative */}
          {/* SLOT-tilbygning-gallery-005: catalog-reuse — tilbygning-halgaard-6.jpg */}
          <div className="tilbygning-gallery-full">
            <div className="tilbygning-gallery-full-img">
              <Image
                src="/images/cases/tilbygning-halgaard-6.jpg"
                alt="Færdig tilbygning i Halgård — integreret med eksisterende hus"
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: 0,
                }}
              />
            </div>
          </div>

          <div
            style={{
              marginTop: "1.25rem",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8125rem",
                color: "var(--color-stone)",
              }}
            >
              Egne billeder fra projektet — 5 af 6 katalogbilleder vist.
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--color-stone)",
                whiteSpace: "nowrap",
              }}
            >
              Halgård · Tilbygning
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 5 — RESULT
          L2: full editorial — result narrative + Byg Garanti signal.
          Dark surface panel with Halgård specific note.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Projektresultat"
        style={{
          background: "var(--color-bone)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          .tilbygning-result-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0;
          }
          @media (min-width: 1024px) {
            .tilbygning-result-grid {
              grid-template-columns: 7fr 5fr;
              align-items: stretch;
            }
          }
          .result-main {
            padding: 0 0 3rem;
          }
          @media (min-width: 1024px) {
            .result-main {
              padding: 0 4rem 0 0;
            }
          }
          .result-sidebar {
            background: var(--color-surface-dark);
            padding: 2.5rem;
            border-radius: 0;
            margin-top: 2rem;
          }
          @media (min-width: 1024px) {
            .result-sidebar {
              margin-top: 0;
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
          <div className="tilbygning-result-grid">
            {/* LEFT: Result copy */}
            <div className="result-main">
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
                Tilbygning leveret med Byg Garanti
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
                Tilbygning levereret med Byg Garanti. Projektet er synligt i
                Halgård-området ved Holstebro — en konkret reference du kan se.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                }}
              >
                Integrationen med det eksisterende hus er fuldt gennemført: nyt
                og gammelt mødes under ét tag, med korrekte overgange og
                dampspærre. Snedkerdetaljerne er udført af samme firma som
                konstruktionen — ingen gråzone i ansvaret.
              </p>
            </div>

            {/* RIGHT: Dark sidebar — Byg Garanti context */}
            <div className="result-sidebar">
              <div
                aria-hidden="true"
                style={{
                  width: "3rem",
                  height: "1px",
                  background: "var(--color-trust)",
                  marginBottom: "1.5rem",
                }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.125rem",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-bone)",
                  marginBottom: "1rem",
                }}
              >
                Byg Garanti
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-clay)",
                  marginBottom: "1.5rem",
                }}
              >
                Alle tilbygninger leveres med Byg Garanti — fordi skjulte
                konstruktionsfejl tager år at opdage.
              </p>
              {[
                { num: "3", label: "år", desc: "Synlige fejl" },
                { num: "10", label: "år", desc: "Skjulte konstruktionsfejl" },
              ].map((g) => (
                <div
                  key={g.num}
                  style={{
                    marginBottom: "1rem",
                    paddingBottom: "1rem",
                    borderBottom: "1px solid rgba(245,240,232,0.1)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "1.5rem",
                      color: "var(--color-trust)",
                      display: "block",
                      marginBottom: "0.125rem",
                    }}
                  >
                    {g.num} {g.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      color: "var(--color-clay)",
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

      {/* CTA BLOCK */}
      <CtaBlock
        heading="Planlægger du en tilbygning?"
        subtext="Ring til Martin for en uforpligtende snak om dit projekt. Vi kigger på opgaven sammen og anbefaler den rigtige løsning — gratis tilbud med specifikation."
        primaryCta={{ label: "Få et gratis tilbud", href: "/kontakt" }}
        secondaryCta={{ label: "Ring: 40 36 88 62", href: "tel:+4540368862" }}
        variant="light"
      />
    </>
  );
}
