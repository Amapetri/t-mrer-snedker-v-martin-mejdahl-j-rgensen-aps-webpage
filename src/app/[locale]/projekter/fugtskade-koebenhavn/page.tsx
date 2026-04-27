import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBlock } from "@/components/CtaBlock";
import { HoverLink } from "@/components/HoverLink";
import { JsonLd } from "@/components/JsonLd";

// ─────────────────────────────────────────────
// Case 3: Fugtskade København — /projekter/fugtskade-koebenhavn/
// Primary keyword: fugtskade sanering tømrer København
// T4: Zilla Slab H1 at service-page scale.
// L2: editorial — hero uses "before" state (foer.jpg). Before/after section
//     is the STRONGEST PROOF POINT — designed around this narrative.
//     Hero: dark surface left (foer image), text right — urgency register.
// S4: 0px radius on ALL image wrappers.
// D2: 120px section gaps.
// P3: before/after pair is the narrative backbone.
//     CRITICAL: foer + skimmel = BEFORE. efter = AFTER.
//     NEVER show mold image without pairing with after.
// M1: 150ms hover transitions only.
// C5: amber on CTAs + Byg Garanti trust signal. "After" label in amber.
// JSON-LD: Article schema.
// ─────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    "Fugtskade sanering — København | Tømrer Martin Mejdahl Jørgensen",
  description:
    "Skimmelsvamp i Københavnerlejlighed saneret og garanteret. Fugtanalyse, fjernelse af inficerede materialer, rekonstruktion med korrekt dampspærre. Byg Garanti 10 år.",
  alternates: {
    canonical: "/projekter/fugtskade-koebenhavn",
  },
};

// ─────────────────────────────────────────────
// JSON-LD — Article schema
// ─────────────────────────────────────────────

const fugtskadeSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Fugtskade sanering — København",
  description:
    "Skimmelsvamp i Københavnerlejlighed saneret og garanteret. Fugtanalyse, fjernelse af inficerede materialer, rekonstruktion med korrekt dampspærre. Byg Garanti 10 år.",
  datePublished: "2015-01-01",
  image:
    "https://www.mejdahltoemrer.dk/images/cases/koebenhavn-lejlighed-efter.jpg",
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

export default async function FugtskadeKoebenhavnPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={fugtskadeSchema} />

      {/* ══════════════════════════════════════════════════
          SECTION 1 — HERO
          L2: dark surface LEFT (foer image with before framing),
          text RIGHT — urgency register for a mold-discovery case.
          The "before" image opens the narrative.
          SLOT-fugtskade-hero-001: catalog-reuse — koebenhavn-lejlighed-foer.jpg
          Image has a "FØR SANERING" caption to frame it immediately.
          Never shown without narrative context.
          S4: 0px radius, hairline border bottom.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Fugtskade sanering — Københavns lejlighed"
        style={{
          background: "var(--color-bone)",
          borderBottom: "1px solid var(--color-border)",
          overflow: "hidden",
        }}
      >
        <style>{`
          /* L2: dark image LEFT (5fr), text right (7fr) */
          .fugtskade-hero-grid {
            display: grid;
            grid-template-columns: 1fr;
            min-height: 480px;
          }
          @media (min-width: 1024px) {
            .fugtskade-hero-grid {
              grid-template-columns: 5fr 7fr;
              min-height: 560px;
            }
          }
          .fugtskade-hero-img-col {
            position: relative;
            min-height: 280px;
            overflow: hidden;
            background: var(--color-surface-dark);
            order: 1;
          }
          @media (min-width: 1024px) {
            .fugtskade-hero-img-col {
              order: 0;
              min-height: 0;
            }
          }
          .fugtskade-hero-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 3.5rem 1.5rem;
            order: 0;
          }
          @media (min-width: 1024px) {
            .fugtskade-hero-text {
              order: 1;
              padding: 5rem max(3rem, calc((100vw - 80rem) / 2 + 3rem)) 5rem 4rem;
            }
          }
        `}</style>

        <div className="fugtskade-hero-grid">
          {/* LEFT: Before state image — framed with narrative context */}
          {/* SLOT-fugtskade-hero-001: catalog-reuse — koebenhavn-lejlighed-foer.jpg */}
          <div className="fugtskade-hero-img-col">
            <Image
              src="/images/cases/koebenhavn-lejlighed-foer.jpg"
              alt="Lejlighed i København — tilstand inden fugtskade sanering"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              style={{
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: 0,
                opacity: 0.85,
              }}
            />
            {/* Narrative label — always present per P3 framing requirement */}
            <div
              style={{
                position: "absolute",
                bottom: "1.25rem",
                left: "1.25rem",
                background: "var(--color-ink)",
                padding: "0.5rem 0.875rem",
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
                  display: "block",
                }}
              >
                Projekt · København
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  color: "var(--color-clay)",
                  display: "block",
                  marginTop: "0.125rem",
                }}
              >
                Inden sanering
              </span>
            </div>
          </div>

          {/* RIGHT: Text — wider column */}
          <div className="fugtskade-hero-text">
            <Breadcrumbs
              items={[
                { label: "Projekter", href: "/projekter" },
                { label: "Fugtskade, København" },
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
                Fugtskade sanering
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
                København
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
                maxWidth: "18ch",
                marginBottom: "1.5rem",
              }}
            >
              Fugtskade sanering — København
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
              Skimmelsvamp i lejlighed — opdaget, saneret og Byg Garanti-dækket.
              Dette projekt demonstrerer vores landsdækkende kapacitet: samme
              garanti i København som i Holstebro.
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
                — 10 år på skjulte fejl
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 2 — CHALLENGE
          L2: 6/6 — challenge copy left, context detail right.
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
          .fugt-challenge-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          @media (min-width: 1024px) {
            .fugt-challenge-grid {
              grid-template-columns: 6fr 6fr;
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
          <div className="fugt-challenge-grid">
            {/* LEFT: Challenge */}
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
                Synlig skimmelsvamp — konstruktiv fugtoptagelse, ikke et
                overfladeproblem
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
                En privatperson i København opdagede synlig skimmelsvamp i
                lejlighed. Skimmelvæksten skyldtes konstruktiv fugtoptagelse —
                ikke en overfladisk rengøringsopgave. Mold i vægge er et
                symptom på et underliggende fugtproblem i konstruktionen.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                }}
              >
                Korrekt sanering kræver: identifikation af kilden, fjernelse af
                alle inficerede materialer (ikke blot overmaling), og
                rekonstruktion med materialer og metoder der forhindrer
                genopstanden af problemet. Forkert sanering er dyrere end ingen
                sanering.
              </p>
            </div>

            {/* RIGHT: Context panel */}
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
                { label: "Projekttype", value: "Fugtskade sanering" },
                { label: "Lokation", value: "København" },
                { label: "Problem", value: "Skimmelsvamp — konstruktiv fugt" },
                { label: "Koordinering", value: "Andelsboligforening" },
                { label: "Garanti", value: "Byg Garanti 10 år" },
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
          L2: 7/5 — solution copy left (wider), services list right.
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
          .fugt-solution-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          @media (min-width: 1024px) {
            .fugt-solution-grid {
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
          <div className="fugt-solution-grid">
            {/* LEFT: Solution copy — wider */}
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
                Fugtanalyse, sanering og rekonstruktion med korrekt dampspærre
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
                Vi udførte fugtanalyse, fjernede inficerede materialer korrekt
                og rekonstruerede ydervæggen med fugtbestandige materialer og
                korrekt dampspærre. Projektet blev udført koordineret med
                andelsboligforeningens krav.
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
                Korrekt dampspærre er afgørende: ydervægge i ældre
                Københavnerlejligheder er bygget uden de fugtbeskyttende lag
                der i dag er standardkrav. Rekonstruktionen løser problemet
                strukturelt, ikke kosmetisk.
              </p>

              {/* Link to fugtskade service */}
              <HoverLink
                href="/ydelser/fugtskade-sanering"
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
                Se fugtskade sanering som ydelse <span aria-hidden="true">→</span>
              </HoverLink>
            </div>

            {/* RIGHT: Process steps — sanering method */}
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
                Saneringsforløbet
              </h3>
              {[
                { step: "01", title: "Fugtanalyse", desc: "Kilden identificeres" },
                {
                  step: "02",
                  title: "Materialefjernelse",
                  desc: "Inficerede lag fjernes korrekt",
                },
                {
                  step: "03",
                  title: "Rekonstruktion",
                  desc: "Ny væg med dampspærre",
                },
                {
                  step: "04",
                  title: "Byg Garanti",
                  desc: "10 år på skjulte fejl",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginBottom: "1.25rem",
                    paddingBottom: "1.25rem",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "var(--color-stone)",
                      flexShrink: 0,
                      paddingTop: "0.125rem",
                    }}
                  >
                    {s.step}
                  </span>
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "0.9375rem",
                        color: "var(--color-ink)",
                        display: "block",
                        marginBottom: "0.125rem",
                        letterSpacing: "var(--letter-spacing-tight)",
                      }}
                    >
                      {s.title}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        color: "var(--color-stone)",
                      }}
                    >
                      {s.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 4 — BEFORE / AFTER (STRONGEST PROOF POINT)
          BRIEF CONSTRAINT: mold image ALWAYS paired with after image.
          Design: foer + skimmel = BEFORE pair (left 5fr split).
                  efter = AFTER (right 7fr).
          NEVER show mold image without pairing.
          SLOT-fugtskade-mold-001: catalog-reuse — koebenhavn-lejlighed-skimmel.jpg
          SLOT-fugtskade-after-001: catalog-reuse — koebenhavn-lejlighed-efter.jpg
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Før og efter sanering — dokumentation"
        style={{
          background: "var(--color-paper)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          /* Before/after heading layout */
          .before-after-heading {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            margin-bottom: 2.5rem;
          }
          @media (min-width: 768px) {
            .before-after-heading {
              grid-template-columns: 5fr 7fr;
              gap: 3rem;
              align-items: end;
            }
          }

          /* Main before/after image grid — 5fr BEFORE + 7fr AFTER */
          .before-after-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0;
            border: 1px solid var(--color-border);
          }
          @media (min-width: 768px) {
            .before-after-grid {
              grid-template-columns: 5fr 7fr;
            }
          }

          /* BEFORE column: stacked foer + skimmel */
          .before-col {
            display: grid;
            grid-template-rows: 1fr 1fr;
            gap: 0;
          }

          .ba-img-wrap {
            position: relative;
            overflow: hidden;
            border-radius: 0;
          }
          .ba-img-before-top { height: 220px; }
          .ba-img-before-bottom {
            height: 220px;
            border-top: 1px solid var(--color-border);
          }
          @media (min-width: 768px) {
            .ba-img-before-top { height: 260px; }
            .ba-img-before-bottom { height: 260px; }
          }

          /* AFTER column */
          .after-col {
            position: relative;
            border-top: 1px solid var(--color-border);
            overflow: hidden;
          }
          @media (min-width: 768px) {
            .after-col {
              border-top: none;
              border-left: 1px solid var(--color-border);
            }
          }
          .ba-img-after {
            position: relative;
            height: 440px;
            overflow: hidden;
          }
          @media (min-width: 768px) {
            .ba-img-after { height: 520px; }
          }

          /* State labels */
          .ba-label {
            position: absolute;
            top: 1rem;
            left: 1rem;
            padding: 0.3rem 0.75rem;
            border-radius: 0;
          }
          .ba-label-before { background: var(--color-ink); }
          .ba-label-after { background: var(--color-accent); }
        `}</style>

        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 var(--container-pad-desktop)",
          }}
        >
          {/* Heading area — asymmetric */}
          <div className="before-after-heading">
            <div>
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
                  fontSize: "clamp(1.375rem, 2.5vw, 2rem)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-ink)",
                }}
              >
                Før og efter sanering
              </h2>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                }}
              >
                Venstre: lejlighed inden sanering — synlig skimmelsvamp i
                ydervæg. Højre: efter sanering — ny væg med korrekt dampspærre
                og fugtbestandige materialer. Dokumenteret med egne billeder fra
                projektet.
              </p>
            </div>
          </div>

          {/* Before/After image pair — CRITICAL pairing constraint */}
          <div className="before-after-grid">
            {/* BEFORE: foer + skimmel stacked */}
            <div className="before-col">
              {/* foer — pre-remediation state */}
              <div className="ba-img-wrap ba-img-before-top">
                <Image
                  src="/images/cases/koebenhavn-lejlighed-foer.jpg"
                  alt="Lejlighed i København inden fugtskade sanering — tilstand ved projektstart"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  style={{ objectFit: "cover", borderRadius: 0 }}
                />
                <div className="ba-label ba-label-before">
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

              {/* skimmel — mold evidence (ALWAYS paired with after) */}
              {/* SLOT-fugtskade-mold-001: catalog-reuse — koebenhavn-lejlighed-skimmel.jpg */}
              <div className="ba-img-wrap ba-img-before-bottom">
                <Image
                  src="/images/cases/koebenhavn-lejlighed-skimmel.jpg"
                  alt="Skimmelsvamp i ydervæg — fugtskade i Københavns lejlighed inden sanering"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  style={{ objectFit: "cover", borderRadius: 0 }}
                />
                <div className="ba-label ba-label-before">
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
                    Skimmelsvamp
                  </span>
                </div>
              </div>
            </div>

            {/* AFTER: efter — full height, narrative resolution */}
            {/* SLOT-fugtskade-after-001: catalog-reuse — koebenhavn-lejlighed-efter.jpg */}
            <div className="after-col">
              <div className="ba-img-after">
                <Image
                  src="/images/cases/koebenhavn-lejlighed-efter.jpg"
                  alt="Renoveret lejlighed i København — efter fugtskade sanering, skimmelsvamp fjernet og væg rekonstrueret"
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: 0,
                  }}
                />
                <div className="ba-label ba-label-after">
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
                    Efter sanering
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Caption */}
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
              Egne billeder fra projektet. Alle 3 billeder fra denne sanering.
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--color-stone)",
                whiteSpace: "nowrap",
              }}
            >
              København · Fugtskade sanering
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 5 — RESULT + NATIONWIDE SIGNAL
          L2: 7/5 — result copy left, CPH breadth signal right.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Projektresultat og landsdækkende kapacitet"
        style={{
          background: "var(--color-bone)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          .fugt-result-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          @media (min-width: 1024px) {
            .fugt-result-grid {
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
          <div className="fugt-result-grid">
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
                Saneret og Byg Garanti-dækket — 10 år på skjulte fejl
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
                Saneret og Byg Garanti-dækket. Lejlighedsejeren er nu
                beskyttet på skjulte defekter i 10 år — en formel garanti, ikke
                et løfte, verificerbar på byggaranti.dk.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                }}
              >
                Lejlighed i en andelsboligforening kræver koordinering med
                bestyrelsens krav og regler for håndværkere i bygningen. Begge
                hensyn blev varetaget — projektet kørte uden konflikter med
                boligforeningen.
              </p>
            </div>

            {/* RIGHT: Nationwide breadth signal — dark panel */}
            <div
              style={{
                background: "var(--color-surface-dark)",
                padding: "2.5rem",
                borderRadius: 0,
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: "3rem",
                  height: "1px",
                  background: "rgba(245,240,232,0.2)",
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
                Vi arbejder i hele Danmark
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
                Dette projekt i København er et eksempel på, at afstand ikke er
                en begrænsning. Byg Garanti gælder med samme betingelser i
                Holstebro som i København.
              </p>

              {/* Geographic breadth */}
              {[
                { mono: "Holstebro", desc: "Base og primært arbejdsområde" },
                { mono: "Midtjylland", desc: "Ringkøbing, Herning, Struer" },
                { mono: "København", desc: "Dokumenteret erfaring" },
                { mono: "Hele landet", desc: "Vi rejser for rette projekter" },
              ].map((g) => (
                <div
                  key={g.mono}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginBottom: "0.875rem",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      width: "0.75rem",
                      height: "1px",
                      background: "rgba(245,240,232,0.2)",
                      flexShrink: 0,
                      marginTop: "0.5rem",
                    }}
                  />
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.8125rem",
                        color: "var(--color-bone)",
                        display: "block",
                      }}
                    >
                      {g.mono}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8125rem",
                        color: "var(--color-clay)",
                      }}
                    >
                      {g.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA BLOCK */}
      <CtaBlock
        heading="Har du opdaget fugtskade eller skimmelsvamp?"
        subtext="Ring til Martin direkte. Vi kan vurdere om der er brug for sanering og hvad det kræver — ingen forpligtelse, ingen salgsgas."
        primaryCta={{ label: "Kontakt Martin", href: "/kontakt" }}
        secondaryCta={{ label: "Ring: 40 36 88 62", href: "tel:+4540368862" }}
        variant="light"
      />
    </>
  );
}
