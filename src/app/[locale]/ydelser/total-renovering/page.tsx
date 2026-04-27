import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBlock } from "@/components/CtaBlock";
import { JsonLd } from "@/components/JsonLd";
import { HoverLink } from "@/components/HoverLink";

// ─────────────────────────────────────────────
// Total Renovering — /ydelser/total-renovering/
// Primary keyword: total renovering Holstebro
// T4: Zilla Slab H1 + all section headings.
// L2: Hero 5/7 (image left wide, text right narrow) — opposite of tagrenovering.
//     Process section: 3-column descending 5/4/3fr.
//     Differentiator: full-width editorial with inset text block.
//     Related: 3fr/5fr/4fr ascending-then-drop.
// S4: 0px radius everywhere; hairlines; placeholder box styled.
// D2: 120px section gaps.
// P3: No suitable catalog image — styled [NEEDS:] placeholder box.
// M1: 150ms hover transitions only.
// ─────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Total renovering Holstebro | Tømrer & Snedker | Martin Mejdahl Jørgensen",
  description:
    "Total renovering af bolig i Holstebro. Ét firma håndterer tømmerkonstruktionen, snedkerdetaljerne og koordinationen — fra råhus til indflytterklar bolig.",
  alternates: {
    canonical: "/ydelser/total-renovering",
  },
};

const totalRenoveringSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Total renovering",
  description:
    "Komplet boligrenovering i Holstebro. Tømmerkonstruktion, snedkerdetaljer og koordination under ét tag — fra råhus til indflytterklar bolig.",
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
  url: "https://www.mejdahltoemrer.dk/ydelser/total-renovering",
};

const processSteps = [
  {
    num: "01",
    title: "Projektopmåling og planlægning",
    body: "Vi gennemgår boligen grundigt: eksisterende konstruktion, byggetilladelseskrav og dit ønske til slutresultatet. Samlet tilbud med klart scope — ingen grå zoner.",
  },
  {
    num: "02",
    title: "Konstruktive indgreb",
    body: "Bærende elementer, ombygning af vægge og lofter — det strukturelle arbejde udføres korrekt og dokumenteret. Vi koordinerer eventuelle underentreprenører.",
  },
  {
    num: "03",
    title: "Nye partitioner og åbninger",
    body: "Nye rumdeling, åbne planløsninger og ombygning af eksisterende partitioner. Præcis udførelse fra første slag — ikke tilretning bagefter.",
  },
  {
    num: "04",
    title: "Vinduer, døre og lister",
    body: "Snedkerafdelingen monterer vinduer og yderdøre med korrekt indbygning, fals og dampspærre. Lister, fodpaneler og afslutninger i ét forløb.",
  },
  {
    num: "05",
    title: "Afsluttende overflader og detaljer",
    body: "Gipsvægge, lofter, gulvafslutninger og alle synlige detaljer — det er her snedkeren og tømreren arbejder sammen, og det er her kvaliteten viser sig.",
  },
];

export default async function TotalRenoveringPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={totalRenoveringSchema} />

      {/* ══════════════════════════════════════════════════
          SECTION 1 — HERO
          L2: REVERSED from tagrenovering — 5/7 (placeholder left narrow,
              text right wider). Image column has [NEEDS:] placeholder box.
          T4: H1 in Zilla Slab at service-page scale.
          S4: 0px radius on placeholder box, hairline borders.
          D2: 5rem vertical padding on text column.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Total renovering af bolig"
        style={{
          background: "var(--color-paper)",
          borderBottom: "1px solid var(--color-border)",
          overflow: "hidden",
        }}
      >
        <style>{`
          .treno-hero-grid {
            display: grid;
            grid-template-columns: 1fr;
            min-height: 500px;
          }
          @media (min-width: 1024px) {
            .treno-hero-grid {
              grid-template-columns: 5fr 7fr;
              min-height: 580px;
            }
          }
          .treno-hero-placeholder {
            position: relative;
            min-height: 280px;
            background: var(--color-clay);
            display: flex;
            align-items: flex-end;
            padding: 2rem;
            order: -1;
          }
          @media (min-width: 1024px) {
            .treno-hero-placeholder {
              min-height: 0;
              order: unset;
            }
          }
          .treno-hero-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 3.5rem 1.5rem;
          }
          @media (min-width: 1024px) {
            .treno-hero-text {
              padding: 5rem 3rem 5rem 4rem;
              padding-right: max(3rem, calc((100vw - 80rem) / 2 + 3rem));
            }
          }
        `}</style>

        <div className="treno-hero-grid">
          {/* LEFT: [NEEDS:] placeholder — S4: 0px radius, stone/bone aesthetic */}
          {/* SLOT-total-renovering-hero-001: pending — [NEEDS: client photos of before/after renovation] */}
          <div className="treno-hero-placeholder" aria-hidden="true">
            <div
              style={{
                borderTop: "1px solid rgba(245,240,232,0.3)",
                paddingTop: "1rem",
                width: "100%",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontStyle: "italic",
                  fontSize: "0.75rem",
                  color: "rgba(245,240,232,0.55)",
                  letterSpacing: "0.03em",
                  display: "block",
                  lineHeight: "1.5",
                }}
              >
                [NEEDS: client photos of before/after renovation — process documentary of total renovation project in progress]
              </span>
            </div>
          </div>

          {/* RIGHT: Text column */}
          <div className="treno-hero-text">
            <Breadcrumbs
              items={[
                { label: "Ydelser", href: "/ydelser" },
                { label: "Total renovering" },
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
              <span style={{ color: "var(--color-border)" }} aria-hidden="true">
                /
              </span>
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
                Holstebro
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
                lineHeight: "var(--line-height-tight)",
                letterSpacing: "var(--letter-spacing-tight)",
                color: "var(--color-ink)",
                maxWidth: "16ch",
                marginBottom: "1.5rem",
              }}
            >
              Total renovering af bolig
            </h1>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                lineHeight: "var(--line-height-snug)",
                color: "var(--color-stone)",
                maxWidth: "48ch",
                marginBottom: "2rem",
              }}
            >
              Et komplet renoveringsprojekt kræver ét firma med overblik over hele forløbet — fra råhus til indflytterklar bolig. Vi håndterer tømmerkonstruktionen, snedkerdetaljerne og koordinationen, så du ikke behøver jonglere med syv forskellige håndværkere.
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.875rem 1.25rem",
                border: "1px solid var(--color-border)",
                borderRadius: 0,
                background: "var(--color-bone)",
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
                Byg Garanti certificeret
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8125rem",
                  color: "var(--color-stone)",
                }}
              >
                — alt under ét ansvar
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 2 — DIFFERENTIATOR: Tømrer + Snedker under samme tag
          L2: Full-width dark surface with inset text block (7/5).
              This section uses a DIFFERENT treatment from tagrenovering's
              process grid — editorial text-heavy dark panel.
          T4: H2 in Zilla Slab on dark background.
          C5: Dark surface — bone text on ink background.
          S4: Hairlines; 0px radius.
          D2: 120px section gap.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Tømrer og snedker under samme tag"
        style={{
          background: "var(--color-surface-dark)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid rgba(214,207,196,0.15)",
        }}
      >
        <style>{`
          .treno-diff-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          @media (min-width: 1024px) {
            .treno-diff-grid {
              grid-template-columns: 7fr 5fr;
              gap: 7rem;
              align-items: start;
            }
          }
          .treno-diff-facts {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0;
            border: 1px solid rgba(214,207,196,0.2);
          }
          .treno-diff-fact {
            padding: 1.5rem;
            border-bottom: 1px solid rgba(214,207,196,0.15);
          }
          .treno-diff-fact:last-child {
            border-bottom: none;
          }
        `}</style>

        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 var(--container-pad-desktop)",
          }}
        >
          <div className="treno-diff-grid">
            {/* LEFT: Main explanation — 7 columns */}
            <div>
              <div
                aria-hidden="true"
                style={{
                  width: "3rem",
                  height: "1px",
                  background: "var(--color-trust)",
                  marginBottom: "1.5rem",
                }}
              />

              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-bone)",
                  maxWidth: "20ch",
                  marginBottom: "1.5rem",
                }}
              >
                Tømrer og snedker under samme tag
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.0625rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-clay)",
                  maxWidth: "52ch",
                  marginBottom: "1.5rem",
                }}
              >
                Når tømmeren og snedkeren er to forskellige firmaer, opstår der grå zoner. Hvem er ansvarlig for fugen ved vinduet? Hvem koordinerer, når gulvmanden skal ind, men væggen ikke er færdig? Hvem ejer problemet, når indbygningsdøren ikke passer i karmen?
              </p>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.0625rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-clay)",
                  maxWidth: "52ch",
                  marginBottom: "2.5rem",
                }}
              >
                Vi fjerner de grå zoner. Begge discipliner — konstruktivt tømmerarbejde og snedkerdetaljer — er vores ansvar. Det er ikke et salgsargument. Det er den praktiske grund til, at totalrenoverede boliger med ét firma koster mindre, tager kortere tid og ender bedre.
              </p>

              <div
                aria-hidden="true"
                style={{
                  width: "3rem",
                  height: "1px",
                  background: "rgba(214,207,196,0.25)",
                }}
              />
            </div>

            {/* RIGHT: Fact list — 5 columns */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "var(--letter-spacing-wide)",
                  textTransform: "uppercase",
                  color: "var(--color-stone)",
                  marginBottom: "1.25rem",
                }}
              >
                Hvad vi dækker
              </p>
              <div className="treno-diff-facts">
                {[
                  { label: "Konstruktivt tømmerarbejde", detail: "Bærende vægge, lofter, bjælker" },
                  { label: "Snedkerdetaljer", detail: "Vinduer, døre, lister, skabe" },
                  { label: "Koordination", detail: "Ét kontaktpunkt, ét ansvar" },
                  { label: "Byg Garanti", detail: "Dækker begge discipliner" },
                  { label: "Byggetilladelse", detail: "Vi hjælper med ansøgningen" },
                ].map((item, i) => (
                  <div key={i} className="treno-diff-fact">
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "0.9375rem",
                        lineHeight: "var(--line-height-snug)",
                        color: "var(--color-bone)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8125rem",
                        color: "var(--color-stone)",
                      }}
                    >
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 3 — PROCESS STEPS
          L2: 5-step layout in 3-column grid 5fr/4fr/3fr descending,
              then wrap. Completely different from tagrenovering's
              5-equal-step horizontal diminishing grid.
          T4: Step titles in Zilla Slab.
          S4: Hairline step card borders.
          D2: 120px section gap.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Renovationsforløbet trin for trin"
        style={{
          background: "var(--color-bone)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          /* L2: 5 steps in TWO rows — 3+2 with descending weights */
          .treno-process-row1 {
            display: grid;
            grid-template-columns: 1fr;
            border: 1px solid var(--color-border);
            border-bottom: none;
          }
          @media (min-width: 900px) {
            .treno-process-row1 {
              grid-template-columns: 5fr 4fr 3fr;
            }
          }
          .treno-process-row2 {
            display: grid;
            grid-template-columns: 1fr;
            border: 1px solid var(--color-border);
          }
          @media (min-width: 900px) {
            .treno-process-row2 {
              grid-template-columns: 4fr 5fr;
            }
          }
          .treno-step {
            padding: 2.5rem 2rem;
            border-bottom: 1px solid var(--color-border);
          }
          @media (min-width: 900px) {
            .treno-step {
              border-bottom: none;
              border-right: 1px solid var(--color-border);
            }
            .treno-step:last-child {
              border-right: none;
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
          <div style={{ maxWidth: "40ch", marginBottom: "3rem" }}>
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
                fontSize: "clamp(1.5rem, 2.75vw, 2.25rem)",
                lineHeight: "var(--line-height-tight)",
                letterSpacing: "var(--letter-spacing-tight)",
                color: "var(--color-ink)",
                marginBottom: "0.75rem",
              }}
            >
              Forløbet — fra start til aflevering
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: "var(--line-height-normal)",
                color: "var(--color-stone)",
              }}
            >
              Fem trin. Ét firma. Ingen grå zoner undervejs.
            </p>
          </div>

          {/* Row 1: steps 01–03 at 5/4/3 */}
          <div className="treno-process-row1" role="list">
            {processSteps.slice(0, 3).map((step) => (
              <div key={step.num} className="treno-step" role="listitem">
                <div
                  aria-hidden="true"
                  style={{ width: "2rem", height: "1px", background: "var(--color-border)", marginBottom: "1rem" }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--color-stone)",
                    letterSpacing: "0.04em",
                    display: "block",
                    marginBottom: "0.75rem",
                  }}
                >
                  {step.num}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.0625rem",
                    lineHeight: "var(--line-height-snug)",
                    letterSpacing: "var(--letter-spacing-tight)",
                    color: "var(--color-ink)",
                    marginBottom: "0.625rem",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    lineHeight: "var(--line-height-normal)",
                    color: "var(--color-stone)",
                  }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          {/* Row 2: steps 04–05 at 4/5 (reversed proportion) */}
          <div className="treno-process-row2" role="list">
            {processSteps.slice(3).map((step) => (
              <div key={step.num} className="treno-step" role="listitem">
                <div
                  aria-hidden="true"
                  style={{ width: "2rem", height: "1px", background: "var(--color-border)", marginBottom: "1rem" }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--color-stone)",
                    letterSpacing: "0.04em",
                    display: "block",
                    marginBottom: "0.75rem",
                  }}
                >
                  {step.num}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.0625rem",
                    lineHeight: "var(--line-height-snug)",
                    letterSpacing: "var(--letter-spacing-tight)",
                    color: "var(--color-ink)",
                    marginBottom: "0.625rem",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    lineHeight: "var(--line-height-normal)",
                    color: "var(--color-stone)",
                  }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 4 — RELATED SERVICES
          L2: 3fr/5fr/4fr — different from tagrenovering's 4/5/3.
          T4: Headings in Zilla Slab.
          S4: Hairline card grid, 0px radius.
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
          /* L2: 3fr/5fr/4fr — distinct from other related grids */
          .treno-related-grid {
            display: grid;
            grid-template-columns: 1fr;
            border: 1px solid var(--color-border);
          }
          @media (min-width: 768px) {
            .treno-related-grid { grid-template-columns: 3fr 5fr 4fr; }
          }
          .treno-related-card {
            padding: 2.25rem 2rem;
            border-bottom: 1px solid var(--color-border);
          }
          @media (min-width: 768px) {
            .treno-related-card {
              border-bottom: none;
              border-right: 1px solid var(--color-border);
            }
            .treno-related-card:last-child { border-right: none; }
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

          <div className="treno-related-grid">
            {[
              {
                title: "Vinduer & Døre",
                desc: "Korrekt montering og indbygning er en del af totalrenoveringen — vi klarer det internt.",
                href: "/ydelser/vinduer-doere",
              },
              {
                title: "Tilbygninger",
                desc: "Total renovering og tilbygning hænger naturligt sammen — ét forløb, ét ansvar.",
                href: "/ydelser/tilbygninger",
                bg: "var(--color-bone)",
              },
              {
                title: "Se alle ydelser",
                desc: "Overblik over vores samlede tømrer- og snedkertilbud.",
                href: "/ydelser",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="treno-related-card"
                style={card.bg ? { background: card.bg } : undefined}
              >
                <div
                  aria-hidden="true"
                  style={{ width: "1.5rem", height: "1px", background: "var(--color-border)", marginBottom: "0.875rem" }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.125rem",
                    lineHeight: "var(--line-height-snug)",
                    letterSpacing: "var(--letter-spacing-tight)",
                    color: "var(--color-ink)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    lineHeight: "var(--line-height-normal)",
                    color: "var(--color-stone)",
                    marginBottom: "1rem",
                  }}
                >
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
        heading="Planlægger du en total renovering?"
        subtext="Ring til Martin for en uforpligtende snak om dit projekt. Vi gennemgår boligen og giver dig et samlet overblik — ét tilbud, ét firma."
        primaryCta={{ label: "Få et samlet tilbud", href: "/kontakt" }}
        secondaryCta={{ label: "Ring: 40 36 88 62", href: "tel:+4540368862" }}
        variant="light"
      />
    </>
  );
}
