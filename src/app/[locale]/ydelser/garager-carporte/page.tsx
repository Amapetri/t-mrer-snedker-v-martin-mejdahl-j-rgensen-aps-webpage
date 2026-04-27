import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBlock } from "@/components/CtaBlock";
import { JsonLd } from "@/components/JsonLd";
import { HoverLink } from "@/components/HoverLink";

// ─────────────────────────────────────────────
// Garager & Carporte — /ydelser/garager-carporte/
// Primary keyword: garage Holstebro tømrer
// T4: Zilla Slab H1 + all headings.
// L2: Hero: 7/5 text left, placeholder right (standard proportion,
//         but on dark surface for this section — first time a service
//         page hero uses dark surface with image-right placeholder).
//     Options: 3-column asymmetric 3fr/4fr/5fr.
//     Process: 5-step two-row structure 2+3 split.
//     Related: 4fr/4fr/4fr — JUSTIFIED equal because the dark hero
//         is the differentiating device; the related grid is allowed equal here.
//         Wait — avoid list says no equal-column grids. Use 5fr/4fr/3fr instead.
// S4: 0px radius, hairlines.
// D2: 120px section gaps.
// P3: No catalog image — [NEEDS:] placeholder.
// M1: 150ms hover only.
// ─────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Garage og Carport Holstebro | Tømmerkonstruktion | Martin Mejdahl Jørgensen",
  description:
    "Opførelse af garager og carporte i Holstebro. Massivt tømmer, fundament i orden og snedkerdetaljer — håndværkskvalitet vs. kataloggarage.",
  alternates: {
    canonical: "/ydelser/garager-carporte",
  },
};

const garagerSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Garager og Carporte",
  description:
    "Opførelse af garager og carporte med fundament, massivt tømmer og snedkerdetaljer. Holstebro og omegn.",
  provider: {
    "@type": "LocalBusiness",
    "@id": "https://www.mejdahltoemrer.dk/#localbusiness",
    name: "Tømrer & Snedker v/ Martin Mejdahl Jørgensen ApS",
    telephone: "+4540368862",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tingagerparken 3",
      addressLocality: "Holstebro",
      postalCode: "7500",
      addressCountry: "DK",
    },
  },
  areaServed: [
    { "@type": "City", name: "Holstebro" },
    { "@type": "AdministrativeArea", name: "Midtjylland" },
    { "@type": "Country", name: "Denmark" },
  ],
  url: "https://www.mejdahltoemrer.dk/ydelser/garager-carporte",
};

const processSteps = [
  {
    num: "01",
    title: "Projektering og byggetilladelse",
    body: "Vi projekterer garagens mål, placering og konstruktion. Byggetilladelse søges hos kommunen — vi hjælper med ansøgningen og kravspecifikationen.",
  },
  {
    num: "02",
    title: "Fundament og undergulv",
    body: "Fundament støbes korrekt dimensioneret til konstruktionens vægt og lokale frostdybde. Undergulvet lægges plant og stabilt — det er her fejl giver problemer i 30 år.",
  },
  {
    num: "03",
    title: "Rejsning og tagkonstruktion",
    body: "Tømmerkonstruktionen rejses med massivt konstruktionstømmer. Tagspærene monteres og tagkonstruktionen færdiggøres — robust og dimensioneret til sne- og vindlast.",
  },
  {
    num: "04",
    title: "Beklædning og port",
    body: "Ydervægge beklædes — træ, cement eller aftalt materiale. Garageport eller carport-afslutning monteres. Vindue og dør efter aftale.",
  },
  {
    num: "05",
    title: "Snedkerdetaljer og afslutning",
    body: "Lister, afslutninger og synlige snedkerdetaljer udføres akkurat. Projektet afleveres ryddet og med dokumentation for udførelsen.",
  },
];

const options = [
  {
    type: "Carport",
    desc: "Åben konstruktion med tag — beskytter bilen mod vejr uden lukket bygning. Kræver normalt ikke byggetilladelse under 35 m². Massivt tømmer, ikke limtræ-katalog.",
  },
  {
    type: "Lukket garage",
    desc: "Fuldt lukket bygning med port, evt. med isolering og varme. Kræver byggetilladelse. Vi søger og projekterer.",
  },
  {
    type: "Integreret garage",
    desc: "Garage i direkte sammenhæng med boligen — indgang fra huset, fælles tagkonstruktion. Kræver opmærksomhed på brandsikring og dampspærre.",
  },
];

export default async function GaragerCarportePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={garagerSchema} />

      {/* ══════════════════════════════════════════════════
          SECTION 1 — HERO
          L2: 7/5 — text left (on dark surface), placeholder right.
              First service page to use dark hero surface — differentiates
              this page from all lighter-hero siblings.
          T4: H1 in Zilla Slab (bone on dark).
          S4: 0px radius, placeholder on clay.
          D2: generous vertical padding.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Garager og carporte — Holstebro"
        style={{
          background: "var(--color-surface-dark)",
          borderBottom: "1px solid rgba(214,207,196,0.15)",
          overflow: "hidden",
        }}
      >
        <style>{`
          .gc-hero-grid {
            display: grid;
            grid-template-columns: 1fr;
            min-height: 480px;
          }
          @media (min-width: 1024px) {
            .gc-hero-grid {
              grid-template-columns: 7fr 5fr;
              min-height: 560px;
            }
          }
          .gc-hero-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 3.5rem 1.5rem;
          }
          @media (min-width: 1024px) {
            .gc-hero-text {
              padding: 5rem 3rem 5rem max(3rem, calc((100vw - 80rem) / 2 + 3rem));
            }
          }
          .gc-hero-placeholder {
            min-height: 280px;
            background: var(--color-clay);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 2.5rem;
            opacity: 0.85;
          }
          @media (min-width: 1024px) {
            .gc-hero-placeholder { min-height: 0; opacity: 1; }
          }
        `}</style>

        <div className="gc-hero-grid">
          {/* LEFT: Text — on dark surface */}
          <div className="gc-hero-text">
            <Breadcrumbs
              items={[
                { label: "Ydelser", href: "/ydelser" },
                { label: "Garager & Carporte" },
              ]}
            />

            <div
              aria-hidden="true"
              style={{ width: "3rem", height: "1px", background: "rgba(214,207,196,0.3)", margin: "1.5rem 0" }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                marginBottom: "1rem",
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
                Ydelse
              </span>
              <span style={{ color: "rgba(214,207,196,0.3)" }} aria-hidden="true">/</span>
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
                Holstebro og omegn
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
                lineHeight: "var(--line-height-tight)",
                letterSpacing: "var(--letter-spacing-tight)",
                color: "var(--color-bone)",
                maxWidth: "16ch",
                marginBottom: "1.5rem",
              }}
            >
              Garager og Carporte
            </h1>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                lineHeight: "var(--line-height-snug)",
                color: "var(--color-clay)",
                maxWidth: "48ch",
                marginBottom: "2rem",
              }}
            >
              En garage bygget af en tømrer er ikke det samme som en monteringsgarage fra en katalogproducent. Vi opfører garager og carporte med fundamentet i orden, rejsning af massivt tømmer og afsluttende snedkerdetaljer.
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.875rem 1.25rem",
                border: "1px solid rgba(214,207,196,0.25)",
                borderRadius: 0,
                background: "rgba(245,240,232,0.06)",
              }}
            >
              <div
                aria-hidden="true"
                style={{ width: "1.5rem", height: "1px", background: "var(--color-trust)", flexShrink: 0 }}
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
                Byg Garanti certificeret
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--color-stone)" }}>
                — håndværkskvalitet
              </span>
            </div>
          </div>

          {/* RIGHT: [NEEDS:] placeholder */}
          {/* SLOT-garager-hero-001: pending — [NEEDS: garage or carport construction photos] */}
          <div className="gc-hero-placeholder" aria-hidden="true">
            <div
              style={{
                borderTop: "1px solid rgba(245,240,232,0.2)",
                paddingTop: "1rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontStyle: "italic",
                  fontSize: "0.7rem",
                  color: "rgba(245,240,232,0.4)",
                  letterSpacing: "0.03em",
                  lineHeight: "1.5",
                  display: "block",
                }}
              >
                [NEEDS: garage or carport construction in progress — frame being built, timber structure, work ongoing]
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 2 — DIFFERENTIATOR: Håndværkskvalitet vs katalogkvalitet
          L2: Full-width bone section. Two columns 5/7 — explanation left
              (narrow), quality comparison right (wider, detailed).
          T4: H2 in Zilla Slab.
          S4: Comparison table with hairline rows.
          D2: 120px section gap.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Håndværkskvalitet kontra katalogkvalitet"
        style={{
          background: "var(--color-bone)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          .gc-diff-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          @media (min-width: 1024px) {
            .gc-diff-grid {
              grid-template-columns: 5fr 7fr;
              gap: 6rem;
              align-items: start;
            }
          }
          .gc-compare-table {
            border: 1px solid var(--color-border);
            border-radius: 0;
          }
          .gc-compare-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            border-bottom: 1px solid var(--color-border);
          }
          .gc-compare-row:last-child {
            border-bottom: none;
          }
          .gc-compare-cell {
            padding: 1.125rem 1.25rem;
            border-right: 1px solid var(--color-border);
          }
          .gc-compare-cell:last-child {
            border-right: none;
          }
          .gc-compare-header-cell {
            padding: 0.875rem 1.25rem;
            border-right: 1px solid var(--color-border);
            background: var(--color-paper);
          }
          .gc-compare-header-cell:last-child {
            border-right: none;
          }
        `}</style>

        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 var(--container-pad-desktop)",
          }}
        >
          <div className="gc-diff-grid">
            {/* LEFT: Explanation */}
            <div>
              <div
                aria-hidden="true"
                style={{ width: "3rem", height: "1px", background: "var(--color-border)", marginBottom: "1.5rem" }}
              />
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
                Håndværkskvalitet vs. katalogkvalitet
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.0625rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "1.25rem",
                }}
              >
                En monteringsgarage fra en katalogproducent monteres på et betonfundament, der ikke er dimensioneret til konstruktionens specifikke belastning. Tømmertykkelserne er minimerede til at opfylde CE-kravene — ikke til at holde i 40 år under danske vejrforhold.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.0625rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                }}
              >
                En tømmermester-bygget garage projekteres til den specifikke placering, undergrund og anvendelse. Prisen afspejler kvalitet — ikke katalogoptimering.
              </p>
            </div>

            {/* RIGHT: Comparison table */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "var(--letter-spacing-wide)",
                  textTransform: "uppercase",
                  color: "var(--color-stone)",
                  marginBottom: "1rem",
                }}
              >
                Sammenligning
              </p>
              <div className="gc-compare-table" role="table">
                {/* Header */}
                <div className="gc-compare-row" role="row">
                  <div className="gc-compare-header-cell" role="columnheader">
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
                      Tømmermester
                    </span>
                  </div>
                  <div className="gc-compare-header-cell" role="columnheader">
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
                      Katalog
                    </span>
                  </div>
                </div>
                {[
                  ["Fundament dimensioneret til jeres jord", "Standardfundament uanset undergrund"],
                  ["Massivt konstruktionstømmer (C18–C24)", "Minimeret CE-godkendt tømmerdimension"],
                  ["Byg Garanti certificeret", "Fabriksgaranti — ikke på udførelsen"],
                  ["Byggetilladelse inkl. i projektering", "Byggetilladelse: eget ansvar"],
                  ["Tilpasset til boligens arkitektur", "Katalogmål og standarddesign"],
                ].map((row, i) => (
                  <div key={i} className="gc-compare-row" role="row">
                    {row.map((cell, j) => (
                      <div key={j} className="gc-compare-cell" role="cell">
                        <span
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.875rem",
                            color: j === 0 ? "var(--color-ink)" : "var(--color-stone)",
                            lineHeight: "var(--line-height-snug)",
                          }}
                        >
                          {cell}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 3 — OPTIONS
          L2: 3-column 3fr/4fr/5fr — ascending width.
          T4: Option headings in Zilla Slab.
          S4: Hairline card grid, 0px radius.
          D2: 120px section gap.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Typer af garager og carporte"
        style={{
          background: "var(--color-paper)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          /* L2: 3fr/4fr/5fr ascending */
          .gc-options-grid {
            display: grid;
            grid-template-columns: 1fr;
            border: 1px solid var(--color-border);
          }
          @media (min-width: 900px) {
            .gc-options-grid { grid-template-columns: 3fr 4fr 5fr; }
          }
          .gc-option-card {
            padding: 2.5rem 2rem;
            border-bottom: 1px solid var(--color-border);
          }
          @media (min-width: 900px) {
            .gc-option-card {
              border-bottom: none;
              border-right: 1px solid var(--color-border);
            }
            .gc-option-card:last-child { border-right: none; }
          }
        `}</style>

        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 var(--container-pad-desktop)",
          }}
        >
          <div style={{ marginBottom: "3rem" }}>
            <div
              aria-hidden="true"
              style={{ width: "3rem", height: "1px", background: "var(--color-border)", marginBottom: "1.25rem" }}
            />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(1.5rem, 2.75vw, 2.25rem)",
                lineHeight: "var(--line-height-tight)",
                letterSpacing: "var(--letter-spacing-tight)",
                color: "var(--color-ink)",
                marginBottom: "0.75rem",
              }}
            >
              Typer
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: "var(--line-height-normal)",
                color: "var(--color-stone)",
              }}
            >
              Alle tre typer opføres med samme fundamentale tømmerkvalitet.
            </p>
          </div>

          <div className="gc-options-grid" role="list">
            {options.map((opt, i) => (
              <div
                key={i}
                className="gc-option-card"
                style={i === 1 ? { background: "var(--color-bone)" } : undefined}
                role="listitem"
              >
                <div
                  aria-hidden="true"
                  style={{ width: "2rem", height: "1px", background: "var(--color-border)", marginBottom: "1rem" }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    lineHeight: "var(--line-height-snug)",
                    letterSpacing: "var(--letter-spacing-tight)",
                    color: "var(--color-ink)",
                    marginBottom: "0.875rem",
                  }}
                >
                  {opt.type}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9375rem",
                    lineHeight: "var(--line-height-normal)",
                    color: "var(--color-stone)",
                  }}
                >
                  {opt.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 4 — PROCESS STEPS
          L2: 5 steps in 2 rows — first row 2 steps (5fr/7fr),
              second row 3 steps (4fr/4fr/4fr — but using fr with
              slight variations: 5fr/4fr/3fr).
          T4: Step titles in Zilla Slab.
          S4: Hairlines, 0px radius.
          D2: 120px section gap.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Byggeforløbet — trin for trin"
        style={{
          background: "var(--color-bone)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          /* L2: Row 1: 5fr/7fr (2 steps), Row 2: 5fr/4fr/3fr (3 steps) */
          .gc-process-row1 {
            display: grid;
            grid-template-columns: 1fr;
            border: 1px solid var(--color-border);
            border-bottom: none;
          }
          @media (min-width: 900px) {
            .gc-process-row1 { grid-template-columns: 5fr 7fr; }
          }
          .gc-process-row2 {
            display: grid;
            grid-template-columns: 1fr;
            border: 1px solid var(--color-border);
          }
          @media (min-width: 900px) {
            .gc-process-row2 { grid-template-columns: 5fr 4fr 3fr; }
          }
          .gc-step {
            padding: 2.5rem 2rem;
            border-bottom: 1px solid var(--color-border);
          }
          @media (min-width: 900px) {
            .gc-step {
              border-bottom: none;
              border-right: 1px solid var(--color-border);
            }
            .gc-step:last-child { border-right: none; }
          }
        `}</style>

        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 var(--container-pad-desktop)",
          }}
        >
          <div style={{ maxWidth: "40ch", marginBottom: "3rem" }}>
            <div
              aria-hidden="true"
              style={{ width: "3rem", height: "1px", background: "var(--color-border)", marginBottom: "1.25rem" }}
            />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(1.5rem, 2.75vw, 2.25rem)",
                lineHeight: "var(--line-height-tight)",
                letterSpacing: "var(--letter-spacing-tight)",
                color: "var(--color-ink)",
                marginBottom: "0.625rem",
              }}
            >
              Byggeforløbet
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                color: "var(--color-stone)",
                lineHeight: "var(--line-height-normal)",
              }}
            >
              Fra projektering til aflevering — fem trin.
            </p>
          </div>

          {/* Row 1: steps 01–02 */}
          <div className="gc-process-row1" role="list">
            {processSteps.slice(0, 2).map((step) => (
              <div key={step.num} className="gc-step" role="listitem">
                <div
                  aria-hidden="true"
                  style={{ width: "2rem", height: "1px", background: "var(--color-border)", marginBottom: "1rem" }}
                />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-stone)", letterSpacing: "0.04em", display: "block", marginBottom: "0.75rem" }}>
                  {step.num}
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.0625rem", lineHeight: "var(--line-height-snug)", letterSpacing: "var(--letter-spacing-tight)", color: "var(--color-ink)", marginBottom: "0.625rem" }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", lineHeight: "var(--line-height-normal)", color: "var(--color-stone)" }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          {/* Row 2: steps 03–05 */}
          <div className="gc-process-row2" role="list">
            {processSteps.slice(2).map((step) => (
              <div key={step.num} className="gc-step" role="listitem">
                <div
                  aria-hidden="true"
                  style={{ width: "2rem", height: "1px", background: "var(--color-border)", marginBottom: "1rem" }}
                />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-stone)", letterSpacing: "0.04em", display: "block", marginBottom: "0.75rem" }}>
                  {step.num}
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.0625rem", lineHeight: "var(--line-height-snug)", letterSpacing: "var(--letter-spacing-tight)", color: "var(--color-ink)", marginBottom: "0.625rem" }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", lineHeight: "var(--line-height-normal)", color: "var(--color-stone)" }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 5 — RELATED SERVICES
          L2: 5fr/4fr/3fr descending.
          T4: Card headings in Zilla Slab.
          S4: Hairlines, 0px radius.
          D2: 120px section gap.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Relaterede ydelser"
        style={{
          background: "var(--color-paper)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          /* L2: 5fr/4fr/3fr */
          .gc-related-grid {
            display: grid;
            grid-template-columns: 1fr;
            border: 1px solid var(--color-border);
          }
          @media (min-width: 768px) {
            .gc-related-grid { grid-template-columns: 5fr 4fr 3fr; }
          }
          .gc-related-card {
            padding: 2.25rem 2rem;
            border-bottom: 1px solid var(--color-border);
          }
          @media (min-width: 768px) {
            .gc-related-card {
              border-bottom: none;
              border-right: 1px solid var(--color-border);
            }
            .gc-related-card:last-child { border-right: none; }
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
              style={{ width: "3rem", height: "1px", background: "var(--color-border)", marginBottom: "1.25rem" }}
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
              Relaterede ydelser
            </h2>
          </div>

          <div className="gc-related-grid">
            {[
              {
                title: "Tilbygninger",
                desc: "En integreret garage er reelt en tilbygning — vi projekterer begge under ét.",
                href: "/ydelser/tilbygninger",
              },
              {
                title: "Skure",
                desc: "Samme tømmerkvalitet i mindre format — uden at gå på kompromis.",
                href: "/ydelser/skure",
                bg: "var(--color-bone)",
              },
              {
                title: "Se alle ydelser",
                desc: "Hele sortimentet — fra tagrenovering til snedkerdetaljer.",
                href: "/ydelser",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="gc-related-card"
                style={card.bg ? { background: card.bg } : undefined}
              >
                <div
                  aria-hidden="true"
                  style={{ width: "1.5rem", height: "1px", background: "var(--color-border)", marginBottom: "0.875rem" }}
                />
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.125rem", lineHeight: "var(--line-height-snug)", letterSpacing: "var(--letter-spacing-tight)", color: "var(--color-ink)", marginBottom: "0.5rem" }}>
                  {card.title}
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", lineHeight: "var(--line-height-normal)", color: "var(--color-stone)", marginBottom: "1rem" }}>
                  {card.desc}
                </p>
                <HoverLink
                  href={card.href}
                  baseColor="var(--color-stone)"
                  hoverColor="var(--color-ink)"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    letterSpacing: "var(--letter-spacing-wide)",
                    textTransform: "uppercase",
                    color: "var(--color-stone)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                  }}
                >
                  Se ydelse <span aria-hidden="true">→</span>
                </HoverLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock
        heading="Planlægger du en garage eller carport?"
        subtext="Ring til Martin for projektering og tilbud. Vi gennemgår placering, konstruktion og byggetilladelseskrav — ét møde, ét ansvar."
        primaryCta={{ label: "Kontakt os om dit projekt", href: "/kontakt" }}
        secondaryCta={{ label: "Ring: 40 36 88 62", href: "tel:+4540368862" }}
        variant="light"
      />
    </>
  );
}
