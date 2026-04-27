import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBlock } from "@/components/CtaBlock";
import { JsonLd } from "@/components/JsonLd";
import { HoverLink } from "@/components/HoverLink";

// ─────────────────────────────────────────────
// Isolering & Lofter — /ydelser/isolering-lofter/
// Primary keyword: loftsisolering Holstebro
// T4: Zilla Slab H1 + all headings.
// L2: Hero: full-width editorial — text at 8/12, placeholder flush right 4/12.
//     Common mistakes: 3-column 4fr/5fr/3fr.
//     Process: vertical numbered list (different from grids on other pages).
//     Related: 4fr/3fr/5fr ascending then narrowing.
// S4: 0px radius, hairlines, placeholder box.
// D2: 120px section gaps.
// P3: No catalog image — [NEEDS:] placeholder box.
// M1: 150ms hover only.
// ─────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Isolering og Loftsisolering Holstebro | BR18 | Martin Mejdahl Jørgensen",
  description:
    "Loftsisolering og dampspærre i Holstebro. Reducerer varmetab med 20–30%, forebygger kondens og efterlever BR18's krav. Korrekt dimensionering og udførelse.",
  alternates: {
    canonical: "/ydelser/isolering-lofter",
  },
};

const isoleringSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Isolering og loftsarbejde",
  description:
    "Korrekt loftsisolering og dampspærre i Holstebro. Reducerer varmetab, forbedrer indeklima og forebygger kondens. BR18-dimensioneret.",
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
  url: "https://www.mejdahltoemrer.dk/ydelser/isolering-lofter",
};

const processSteps = [
  {
    num: "01",
    title: "Besigtigelse og dimensionering",
    body: "Vi gennemgår loftsrummet, vurderer eksisterende isolering og konstruktion. Dimensionering foretages efter BR18's U-værdikrav og boligens specifikke opbygning — ikke en standardtykkelse fra en prisliste.",
  },
  {
    num: "02",
    title: "Dampspærre og mineraluld",
    body: "Dampspærren monteres korrekt på den varme side inden isolering. Mineraluld lægges i den dimensionerede tykkelse med korrekte ventilationsåbninger. Rækkefølgen er afgørende — fejl her viser sig som kondensskader år senere.",
  },
  {
    num: "03",
    title: "Afsluttende loft",
    body: "Gips, brædder eller loftsbeklædning efter aftale. Vi afslutter projektet færdigt — ikke halvt og med en liste af 'næste gang'-opgaver.",
  },
];

const commonMistakes = [
  {
    mistake: "Manglende dampspærre",
    consequence: "Varm fugtig luft trænger op i konstruktionen og kondenserer — skimmelsvamp følger inden for 2–5 år.",
  },
  {
    mistake: "Utilstrækkelig tykkelse",
    consequence: "Isolering der ikke opfylder BR18's krav giver hverken energibesparelse eller bedre indeklima.",
  },
  {
    mistake: "Blokerede ventilationsåbninger",
    consequence: "Uden ventilation i loftsrummet samles fugt, som giver råd og skimmel i tagkonstruktionen.",
  },
];

export default async function IsoleringLofterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={isoleringSchema} />

      {/* ══════════════════════════════════════════════════
          SECTION 1 — HERO
          L2: 8/4 split — text gets 8 columns (wider than tagrenovering's 7),
              placeholder 4 columns (narrower — just a slim vertical accent).
              This is a deliberately text-heavy composition.
          T4: H1 in Zilla Slab.
          S4: 0px radius, hairlines, placeholder in stone tone.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Isolering og loftsarbejde"
        style={{
          background: "var(--color-bone)",
          borderBottom: "1px solid var(--color-border)",
          overflow: "hidden",
        }}
      >
        <style>{`
          .iso-hero-grid {
            display: grid;
            grid-template-columns: 1fr;
            min-height: 480px;
          }
          @media (min-width: 1024px) {
            .iso-hero-grid {
              grid-template-columns: 8fr 4fr;
              min-height: 520px;
            }
          }
          .iso-hero-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 3.5rem 1.5rem;
          }
          @media (min-width: 1024px) {
            .iso-hero-text {
              padding: 5rem 3rem 5rem max(3rem, calc((100vw - 80rem) / 2 + 3rem));
            }
          }
          .iso-hero-placeholder {
            min-height: 240px;
            background: var(--color-clay);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 2rem;
          }
          @media (min-width: 1024px) {
            .iso-hero-placeholder { min-height: 0; }
          }
        `}</style>

        <div className="iso-hero-grid">
          {/* LEFT: Text — 8 columns */}
          <div className="iso-hero-text">
            <Breadcrumbs
              items={[
                { label: "Ydelser", href: "/ydelser" },
                { label: "Isolering & Lofter" },
              ]}
            />

            <div
              aria-hidden="true"
              style={{ width: "3rem", height: "1px", background: "var(--color-border)", margin: "1.5rem 0" }}
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
              <span style={{ color: "var(--color-border)" }} aria-hidden="true">/</span>
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
                BR18-certificeret
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
                maxWidth: "18ch",
                marginBottom: "1.5rem",
              }}
            >
              Isolering og loftsarbejde
            </h1>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                lineHeight: "var(--line-height-snug)",
                color: "var(--color-stone)",
                maxWidth: "52ch",
                marginBottom: "1.5rem",
              }}
            >
              Korrekt loftsisolering reducerer varmetab, forbedrer indeklimaet og forebygger kondens. Vi monterer isolering og dampspærre korrekt — inkl. ventilationsåbninger og tilstrækkelig mineraluldstykkelse efter bygningsreglementet.
            </p>

            {/* Energy savings fact — mono set, structural */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                padding: "1.125rem 1.5rem",
                border: "1px solid var(--color-border)",
                borderRadius: 0,
                background: "var(--color-paper)",
                marginBottom: "2rem",
                maxWidth: "fit-content",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 400,
                    fontSize: "1.5rem",
                    color: "var(--color-ink)",
                    display: "block",
                    lineHeight: 1,
                    letterSpacing: "-0.01em",
                  }}
                >
                  20–30%
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8125rem",
                    color: "var(--color-stone)",
                    display: "block",
                    marginTop: "0.25rem",
                  }}
                >
                  realistisk energibesparelse ved korrekt loftsisolering
                </span>
              </div>
            </div>

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
                BR18 dimensioneret
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--color-stone)" }}>
                — ikke en standardtykkelse
              </span>
            </div>
          </div>

          {/* RIGHT: Slim placeholder — 4 columns */}
          {/* SLOT-isolering-hero-001: pending — [NEEDS: insulation work photos] */}
          <div className="iso-hero-placeholder" aria-hidden="true">
            <div
              style={{
                borderTop: "1px solid rgba(245,240,232,0.25)",
                paddingTop: "1rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontStyle: "italic",
                  fontSize: "0.7rem",
                  color: "rgba(245,240,232,0.5)",
                  letterSpacing: "0.03em",
                  lineHeight: "1.5",
                  display: "block",
                }}
              >
                [NEEDS: loft/roof insulation installation photos — insulation boards being laid, timber structure visible, work in progress]
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 2 — TECHNICAL: Fejl vi forhindrer
          L2: 3-column 4fr/5fr/3fr — each mistake card is a column.
              Mistakes in a wider middle column get more visual weight.
          T4: Card headings in Zilla Slab.
          S4: Hairline grid borders, 0px radius.
          D2: 120px section gap.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Fejl ved loftsisolering vi forhindrer"
        style={{
          background: "var(--color-paper)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          /* L2: 4fr/5fr/3fr */
          .iso-mistakes-grid {
            display: grid;
            grid-template-columns: 1fr;
            border: 1px solid var(--color-border);
          }
          @media (min-width: 900px) {
            .iso-mistakes-grid { grid-template-columns: 4fr 5fr 3fr; }
          }
          .iso-mistake-card {
            padding: 2.5rem 2rem;
            border-bottom: 1px solid var(--color-border);
          }
          @media (min-width: 900px) {
            .iso-mistake-card {
              border-bottom: none;
              border-right: 1px solid var(--color-border);
            }
            .iso-mistake-card:last-child { border-right: none; }
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
              Typiske fejl — og konsekvenserne
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: "var(--line-height-normal)",
                color: "var(--color-stone)",
                maxWidth: "50ch",
              }}
            >
              Tre fejl vi ser igen og igen, og som vi forhindrer ved at arbejde metodisk fra begyndelsen.
            </p>
          </div>

          <div className="iso-mistakes-grid" role="list">
            {commonMistakes.map((item, i) => (
              <div key={i} className="iso-mistake-card" role="listitem">
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
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.125rem",
                    lineHeight: "var(--line-height-snug)",
                    letterSpacing: "var(--letter-spacing-tight)",
                    color: "var(--color-ink)",
                    marginBottom: "0.875rem",
                  }}
                >
                  {item.mistake}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9375rem",
                    lineHeight: "var(--line-height-normal)",
                    color: "var(--color-stone)",
                  }}
                >
                  {item.consequence}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 3 — PROCESS: Vertical numbered list
          L2: Different from all other service pages — vertical process list
              with 2-column layout inside (number/title left, body right: 3/9).
              This provides the strongest compositional contrast with the
              horizontal step grids used on other pages.
          T4: Process titles in Zilla Slab.
          S4: Hairline separators between steps.
          D2: 120px section gap.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Fremgangsmåden — isolering og loftsarbejde"
        style={{
          background: "var(--color-bone)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          /* L2: Vertical list, each step 3/9 internally */
          .iso-process-step-inner {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          @media (min-width: 768px) {
            .iso-process-step-inner {
              grid-template-columns: 3fr 9fr;
              gap: 3rem;
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "0",
            }}
          >
            {/* Section heading row */}
            <div
              style={{
                borderBottom: "1px solid var(--color-border)",
                paddingBottom: "2rem",
                marginBottom: "0",
              }}
            >
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
                Udførelsen — tre trin
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                }}
              >
                Rækkefølgen er ikke ligegyldig — dampspærre før isolering er ufravigelig.
              </p>
            </div>

            {/* Process steps as vertical list */}
            {processSteps.map((step, i) => (
              <div
                key={step.num}
                style={{
                  borderBottom: i < processSteps.length - 1 ? "1px solid var(--color-border)" : "none",
                  padding: "2.5rem 0",
                }}
              >
                <div className="iso-process-step-inner">
                  {/* Left: number + title */}
                  <div>
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
                        fontSize: "1.125rem",
                        lineHeight: "var(--line-height-snug)",
                        letterSpacing: "var(--letter-spacing-tight)",
                        color: "var(--color-ink)",
                      }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  {/* Right: body */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      paddingTop: "0.25rem",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "1rem",
                        lineHeight: "var(--line-height-normal)",
                        color: "var(--color-stone)",
                      }}
                    >
                      {step.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 4 — RELATED SERVICES
          L2: 4fr/3fr/5fr — start mid, dip, then widest last.
          T4: Card headings in Zilla Slab.
          S4: Hairline card borders, 0px radius.
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
          /* L2: 4fr/3fr/5fr */
          .iso-related-grid {
            display: grid;
            grid-template-columns: 1fr;
            border: 1px solid var(--color-border);
          }
          @media (min-width: 768px) {
            .iso-related-grid { grid-template-columns: 4fr 3fr 5fr; }
          }
          .iso-related-card {
            padding: 2.25rem 2rem;
            border-bottom: 1px solid var(--color-border);
          }
          @media (min-width: 768px) {
            .iso-related-card {
              border-bottom: none;
              border-right: 1px solid var(--color-border);
            }
            .iso-related-card:last-child { border-right: none; }
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

          <div className="iso-related-grid">
            {[
              {
                title: "Tagrenovering",
                desc: "Loftsisolering og tagrenovering er naturlige par — vi planlægger begge i ét forløb.",
                href: "/ydelser/tagrenovering",
              },
              {
                title: "Vinduer & Døre",
                desc: "Kuldebroer fra vinduer og dårlig loftsisolering er to sider af samme varmetabsproblem.",
                href: "/ydelser/vinduer-doere",
                bg: "var(--color-bone)",
              },
              {
                title: "Se alle ydelser",
                desc: "Overblik over vores tømrer- og snedkertilbud — strukturelt og finishpræget.",
                href: "/ydelser",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="iso-related-card"
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
        heading="Loftsisolering der faktisk virker?"
        subtext="Ring til Martin for en besigtigelse. Vi måler op, dimensionerer efter BR18 og giver dig et tilbud — én besigtigelse, ingen forpligtelse."
        primaryCta={{ label: "Få gratis besigtigelse", href: "/kontakt" }}
        secondaryCta={{ label: "Ring: 40 36 88 62", href: "tel:+4540368862" }}
        variant="light"
      />
    </>
  );
}
