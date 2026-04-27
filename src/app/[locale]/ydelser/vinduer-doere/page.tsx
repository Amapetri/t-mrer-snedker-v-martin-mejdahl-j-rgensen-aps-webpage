import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBlock } from "@/components/CtaBlock";
import { JsonLd } from "@/components/JsonLd";
import { HoverLink } from "@/components/HoverLink";

// ─────────────────────────────────────────────
// Vinduer & Døre — /ydelser/vinduer-doere/
// Primary keyword: vinduer udskiftning Holstebro
// T4: Zilla Slab H1 + all headings.
// L2: Hero 6/6 with VERTICAL offset device (text top-aligned,
//     placeholder bottom-anchored) — different from all others.
//     Technical section: full-width with 2-col inset 7/5.
//     Process: 4-step horizontal 3fr/4fr/4fr/5fr ascending.
//     Related: 5fr/3fr/4fr.
// S4: 0px radius, hairlines throughout, placeholder box.
// D2: 120px section gaps.
// P3: No catalog image — [NEEDS:] placeholder box.
// M1: 150ms hover only.
// ─────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Vinduer og Døre Holstebro | Montering og udskiftning | Martin Mejdahl Jørgensen",
  description:
    "Korrekt montering af vinduer og yderdøre i Holstebro. Tæthed, isolering og fugtforebyggelse — forkert indbygning er en af de hyppigste årsager til fugtproblemer.",
  alternates: {
    canonical: "/ydelser/vinduer-doere",
  },
};

const vinduerDoereSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Vinduer og Døre — montering og udskiftning",
  description:
    "Montering og udskiftning af vinduer og yderdøre i Holstebro. Korrekt indbygning med dampspærre og fals for at undgå fugtproblemer.",
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
  url: "https://www.mejdahltoemrer.dk/ydelser/vinduer-doere",
};

const processSteps = [
  {
    num: "01",
    title: "Opmåling og materialvalg",
    body: "Vi opmåler åbningen præcist og rådgiver om vindues- og dørtype, isoleringsevne (U-værdi) og materiale. Tilbud inkl. levering.",
  },
  {
    num: "02",
    title: "Fjernelse af gammelt vindue/dør",
    body: "Eksisterende ramme og karm fjernes omhyggeligt. Åbningen renses og vurderes — eventuelle skader i konstruktionen eller fugt opdages og adresseres her.",
  },
  {
    num: "03",
    title: "Korrekt indbygning med dampspærre",
    body: "Nyt vindue/dør monteres med præcis indbygning: dampspærre på den varme side, fals og luftspalt korrekt dimensioneret. Det er her fejl opstår — vi laver det rigtigt første gang.",
  },
  {
    num: "04",
    title: "Afpudsning og listefuning",
    body: "Indvendige og udvendige lister monteres. Fuger afsluttes korrekt og æstetisk. Projektet afleveres rent og klar til overfladebehanding.",
  },
];

export default async function VinduerDoerePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={vinduerDoereSchema} />

      {/* ══════════════════════════════════════════════════
          SECTION 1 — HERO
          L2: 6/6 split — BUT with a visual asymmetry device:
              text column is top-aligned with breadcrumb;
              placeholder is bottom-anchored with the [NEEDS:] label.
              The vertical offset breaks the visual equality.
              Background contrast: text on bone, placeholder on ink.
          T4: H1 in Zilla Slab.
          S4: 0px radius on placeholder, hairline dividers.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Vinduer og døre — montering og udskiftning"
        style={{
          background: "var(--color-bone)",
          borderBottom: "1px solid var(--color-border)",
          overflow: "hidden",
        }}
      >
        <style>{`
          .vd-hero-grid {
            display: grid;
            grid-template-columns: 1fr;
          }
          @media (min-width: 1024px) {
            .vd-hero-grid {
              grid-template-columns: 6fr 6fr;
              min-height: 560px;
            }
          }
          .vd-hero-text {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            padding: 3.5rem 1.5rem;
          }
          @media (min-width: 1024px) {
            .vd-hero-text {
              padding: 5rem max(3rem, calc((100vw - 80rem) / 2 + 3rem)) 5rem max(3rem, calc((100vw - 80rem) / 2 + 3rem));
              padding-right: 3rem;
            }
          }
          .vd-hero-placeholder {
            position: relative;
            min-height: 280px;
            background: var(--color-surface-dark);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 2.5rem;
          }
          @media (min-width: 1024px) {
            .vd-hero-placeholder {
              min-height: 0;
              justify-content: flex-end;
              padding: 3rem;
            }
          }
        `}</style>

        <div className="vd-hero-grid">
          {/* LEFT: Text column — top-anchored */}
          <div className="vd-hero-text">
            <Breadcrumbs
              items={[
                { label: "Ydelser", href: "/ydelser" },
                { label: "Vinduer & Døre" },
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
                color: "var(--color-ink)",
                maxWidth: "18ch",
                marginBottom: "1.5rem",
              }}
            >
              Vinduer & Døre — montering og udskiftning
            </h1>

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
              Korrekt monterede vinduer og yderdøre er ikke bare et æstetisk spørgsmål — det handler om tæthed, isolering og fugtforebyggelse. Vi monterer alle typer vinduer og yderdøre med korrekt indbygning, fals og dampspærre.
            </p>

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
                Byg Garanti
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--color-stone)" }}>
                — korrekt første gang
              </span>
            </div>
          </div>

          {/* RIGHT: [NEEDS:] placeholder — bottom-anchored for visual asymmetry */}
          {/* SLOT-vinduer-hero-001: pending — [NEEDS: client photos of window/door installation] */}
          <div className="vd-hero-placeholder" aria-hidden="true">
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
                  fontSize: "0.75rem",
                  color: "rgba(245,240,232,0.45)",
                  letterSpacing: "0.03em",
                  lineHeight: "1.5",
                  display: "block",
                }}
              >
                [NEEDS: client photos of window or door installation in progress — frame being fitted, old frame removed, tools in use]
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 2 — TECHNICAL: Forkert indbygning = fugtskader
          L2: Full-width paper section with 7/5 inset text blocks.
              Left: the claim. Right: what we do.
          T4: H2 in Zilla Slab.
          S4: Hairlines only; warning panel with 1px border.
          D2: 120px section gap.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Teknisk baggrund — fugtskader ved forkert indbygning"
        style={{
          background: "var(--color-paper)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          .vd-tech-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          @media (min-width: 1024px) {
            .vd-tech-grid {
              grid-template-columns: 7fr 5fr;
              gap: 6rem;
              align-items: start;
            }
          }
          .vd-services-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0;
            border: 1px solid var(--color-border);
          }
          .vd-services-item {
            padding: 1.125rem 1.25rem;
            border-bottom: 1px solid var(--color-border);
            border-right: 1px solid var(--color-border);
          }
          .vd-services-item:nth-child(even) {
            border-right: none;
          }
          .vd-services-item:nth-last-child(-n+2) {
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
          <div className="vd-tech-grid">
            {/* LEFT: Main technical explanation */}
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
                Forkert indbygning er den hyppigste årsag til fugtskader
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
                Forkert indbygning er en af de hyppigste årsager til fugtproblemer i boliger. Når dampspærren ikke slutter tæt mod karm, når falsindgreb er misforstået, eller når ventilationsspalten er lukket — opstår der kondensskader i konstruktionen, der kan tage år at opdage.
              </p>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.0625rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "2rem",
                }}
              >
                Vi laver det rigtigt første gang. Det er ikke et løfte — det er en faglig standard vi holder os til, og som Byg Garanti-certificeringen dækker.
              </p>

              {/* Technical warning panel */}
              <div
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: 0,
                  padding: "1.5rem",
                  background: "var(--color-bone)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "var(--color-ink)",
                    marginBottom: "1rem",
                  }}
                >
                  Fejl vi forhindrer
                </p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {[
                    "Manglende dampspærre mod varm side",
                    "Ukorrekt fals — kuldebroer og kondensrisiko",
                    "Blokeret ventilationsareal i karm",
                    "Uens fugebredde — termisk bevægelse ignoreret",
                    "Dårlig tætning mod eksisterende mur",
                  ].map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          color: "var(--color-stone)",
                          marginTop: "0.125rem",
                          flexShrink: 0,
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.9375rem",
                          color: "var(--color-stone)",
                          lineHeight: "var(--line-height-snug)",
                        }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT: Services list — 5 columns */}
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
                Vi monterer
              </p>
              <div className="vd-services-list">
                {[
                  "Vinduer — alle typer",
                  "Yderdøre",
                  "Terrassedøre",
                  "Skydedøre",
                  "Indbygning og fals",
                  "Dampspærre",
                  "Tætning og fuger",
                  "Lister og afpudsning",
                ].map((item, i) => (
                  <div key={i} className="vd-services-item">
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        color: "var(--color-ink)",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 3 — PROCESS STEPS
          L2: 4 steps in ascending widths: 3fr/4fr/4fr/5fr.
              Each step wider than the previous — editorial rhythm.
          T4: Step titles in Zilla Slab.
          S4: Hairline step borders, 0px radius.
          D2: 120px section gap.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Fremgangsmåden ved vindues- og dørmontering"
        style={{
          background: "var(--color-bone)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          /* L2: 4 steps in 3fr/4fr/4fr/5fr — ascending widths */
          .vd-process-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0;
            border: 1px solid var(--color-border);
          }
          @media (min-width: 900px) {
            .vd-process-grid {
              grid-template-columns: 3fr 4fr 4fr 5fr;
            }
          }
          .vd-process-step {
            padding: 2.5rem 2rem;
            border-bottom: 1px solid var(--color-border);
          }
          @media (min-width: 900px) {
            .vd-process-step {
              border-bottom: none;
              border-right: 1px solid var(--color-border);
            }
            .vd-process-step:last-child { border-right: none; }
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
                marginBottom: "0.75rem",
              }}
            >
              Monteringsforløbet — fire trin
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: "var(--line-height-normal)",
                color: "var(--color-stone)",
              }}
            >
              Fra opmåling til afleveret projekt — korrekt udført i rækkefølge.
            </p>
          </div>

          <div className="vd-process-grid" role="list">
            {processSteps.map((step) => (
              <div key={step.num} className="vd-process-step" role="listitem">
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
          L2: 5fr/3fr/4fr — different sequence from other pages.
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
          /* L2: 5fr/3fr/4fr */
          .vd-related-grid {
            display: grid;
            grid-template-columns: 1fr;
            border: 1px solid var(--color-border);
          }
          @media (min-width: 768px) {
            .vd-related-grid { grid-template-columns: 5fr 3fr 4fr; }
          }
          .vd-related-card {
            padding: 2.25rem 2rem;
            border-bottom: 1px solid var(--color-border);
          }
          @media (min-width: 768px) {
            .vd-related-card {
              border-bottom: none;
              border-right: 1px solid var(--color-border);
            }
            .vd-related-card:last-child { border-right: none; }
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

          <div className="vd-related-grid">
            {[
              {
                title: "Isolering & Lofter",
                desc: "Forkert monterede vinduer er én kilde til fugt — utilstrækkelig loftsisolering er en anden. Vi løser begge.",
                href: "/ydelser/isolering-lofter",
              },
              {
                title: "Fugtskade Sanering",
                desc: "Når det allerede er gået galt — identifikation, sanering og forebyggelse.",
                href: "/ydelser/fugtskade-sanering",
                bg: "var(--color-bone)",
              },
              {
                title: "Total renovering",
                desc: "Vinduer og døre som del af et samlet renoveringsprojekt.",
                href: "/ydelser/total-renovering",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="vd-related-card"
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
        heading="Vinduer eller døre der skal skiftes?"
        subtext="Ring til Martin for opmåling og tilbud. Vi monterer korrekt første gang — tæt, isoleret og uden fugtfælder."
        primaryCta={{ label: "Få et tilbud på montering", href: "/kontakt" }}
        secondaryCta={{ label: "Ring: 40 36 88 62", href: "tel:+4540368862" }}
        variant="light"
      />
    </>
  );
}
