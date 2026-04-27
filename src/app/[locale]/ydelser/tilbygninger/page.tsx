import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBlock } from "@/components/CtaBlock";
import { JsonLd } from "@/components/JsonLd";
import { HoverLink } from "@/components/HoverLink";

// ─────────────────────────────────────────────
// Tilbygninger — /ydelser/tilbygninger/
// Primary keyword: tilbygning Holstebro
// Secondary: tilbygning tømrer, tilbygning pris tømrer
// T4: Zilla Slab H1 at service-page scale.
// L2: Hero 5/7 (text left, image right); differentiator section
//     full-width editorial; process steps alternating; related 3-col varied.
// S4: 0px radius everywhere.
// D2: 120px section gaps.
// P3: tilbygning-halgaard images from cases catalog.
// M1: 150ms hover transitions only.
// ─────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Tilbygninger Holstebro | Tømrer & Snedker | Martin Mejdahl Jørgensen",
  description:
    "Tilbygning til din bolig i Holstebro og omegn. Tømrer og snedker i ét firma — fundament, rejsning, tag og alle detaljer. Byg Garanti certificeret.",
  alternates: {
    canonical: "/ydelser/tilbygninger",
  },
};

// ─────────────────────────────────────────────
// JSON-LD — Service schema
// ─────────────────────────────────────────────

const tilbygningerSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Tilbygninger",
  description:
    "Tilbygning til eksisterende bolig i Holstebro og omegn. Vi håndterer fundament, rejsning, tag og alle snedkerdetaljer som ét firma — ingen gråzoner, ingen koordineringsproblemer. Byg Garanti certificeret.",
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
  url: "https://www.mejdahltoemrer.dk/ydelser/tilbygninger",
};

// ─────────────────────────────────────────────
// Process steps — 5 real steps, Danish trade copy
// ─────────────────────────────────────────────

const processSteps = [
  {
    num: "01",
    title: "Projektering og tilladelse",
    body: "Vi gennemgår projektet med dig og sikrer at tegninger er klar til kommunal behandling. Byggetilladelse indhentes inden gravearbejde påbegyndes.",
  },
  {
    num: "02",
    title: "Fundament og undergulv",
    body: "Udgravning, støbning af fundament og opbygning af undergulv — korrekt fundering er forudsætningen for alt, der bygges ovenpå. Vi koordinerer med betonentreprenøren.",
  },
  {
    num: "03",
    title: "Rejsning og tagkonstruktion",
    body: "Ydervægge rejses, spær monteres og tagkonstruktionen opbygges. Som tømrer er dette vores kernekompetence — strukturel opbygning der holder i generationer.",
  },
  {
    num: "04",
    title: "Isolering, dampspærre og beklædning",
    body: "Vægge og tag isoleres til gældende energikrav. Dampspærre monteres korrekt — forkert dampspærre er den hyppigste årsag til fugtproblemer i tilbygninger.",
  },
  {
    num: "05",
    title: "Snedkerdetaljer, vinduer, døre og lister",
    body: "Her adskiller vi os: fordi vi er snedkere, udfører vi selv alle vinduer, døre, indbygning og listearbejde. Ét firma, én ansvarlig — ingen overlapping og ingen gråzone.",
  },
];

// ─────────────────────────────────────────────
// Page — Server Component
// ─────────────────────────────────────────────

export default async function TilbygningerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={tilbygningerSchema} />

      {/* ══════════════════════════════════════════════════
          SECTION 1 — HERO
          L2: 5/12 text left, 7/12 image right (reversed from standard 7/5).
          This section uses MORE image than text — tilbygning is visual proof.
          P3: tilbygning-halgaard-1.jpg construction phase.
          T4: H1 at service-page scale.
          S4: 0px radius, hairlines.
          D2: min-height 560px.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Tilbygninger til din bolig"
        style={{
          background: "var(--color-bone)",
          borderBottom: "1px solid var(--color-border)",
          overflow: "hidden",
        }}
      >
        <style>{`
          /* L2: 5fr text / 7fr image — reversed proportion from tagrenovering hero */
          .tilb-hero-grid {
            display: grid;
            grid-template-columns: 1fr;
            min-height: 480px;
          }
          @media (min-width: 1024px) {
            .tilb-hero-grid {
              grid-template-columns: 5fr 7fr;
              min-height: 600px;
            }
          }
          .tilb-hero-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 3.5rem 1.5rem;
            order: 1;
          }
          @media (min-width: 1024px) {
            .tilb-hero-text {
              padding: 5rem 3rem 5rem max(3rem, calc((100vw - 80rem) / 2 + 3rem));
              order: 1;
            }
          }
          .tilb-hero-img {
            position: relative;
            min-height: 320px;
            overflow: hidden;
            order: 0;
          }
          @media (min-width: 1024px) {
            .tilb-hero-img {
              min-height: 0;
              order: 0;
            }
          }
        `}</style>

        <div className="tilb-hero-grid">
          {/* LEFT: Image column — wider (7fr) */}
          {/* SLOT-tilbygninger-hero-001: catalog-reuse — tilbygning-halgaard-1.jpg */}
          <div className="tilb-hero-img">
            <Image
              src="/images/cases/tilbygning-halgaard-1.jpg"
              alt="Tilbygning under opførelse i Halgård — tømrer og snedker, Holstebro"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              style={{ objectFit: "cover", objectPosition: "center", borderRadius: 0 }}
            />
          </div>

          {/* RIGHT: Text column — narrower (5fr) */}
          <div className="tilb-hero-text">
            {/* Breadcrumbs */}
            <Breadcrumbs
              items={[
                { label: "Ydelser", href: "/ydelser" },
                { label: "Tilbygninger" },
              ]}
            />

            {/* Hairline — S4 */}
            <div
              aria-hidden="true"
              style={{
                width: "3rem",
                height: "1px",
                background: "var(--color-border)",
                margin: "1.5rem 0",
              }}
            />

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
              Ydelse / Holstebro og omegn
            </span>

            {/* H1 — T4 Zilla Slab */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
                lineHeight: "var(--line-height-tight)",
                letterSpacing: "var(--letter-spacing-tight)",
                color: "var(--color-ink)",
                maxWidth: "14ch",
                marginBottom: "1.5rem",
              }}
            >
              Tilbygninger til din bolig
            </h1>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                lineHeight: "var(--line-height-snug)",
                color: "var(--color-stone)",
                maxWidth: "40ch",
                marginBottom: "2rem",
              }}
            >
              En tilbygning kræver tæt koordinering fra fundament til snedkerdetaljer. Fordi vi er både tømrer og snedker, holder ét firma ansvaret for hele projektet — ingen gråzoner, ingen koordineringsproblemer mellem håndværkere.
            </p>

            {/* Byg Garanti signal */}
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
                — 10 år på skjulte fejl
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 2 — KEY DIFFERENTIATOR
          "Tømrer + snedker i ét firma" explained fully.
          L2: Wide text block left (6/12), editorial pull-quote right (6/12).
          NOT same column split as hero. Vertically offset quote (D2 device).
          S4: hairlines, 0px radius, no shadow.
          D2: 120px section gap.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Tømrer og snedker i ét firma"
        style={{
          background: "var(--color-paper)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          /* L2: 6/12 body text / 6/12 pull-quote, but quote is offset vertically */
          .differentiator-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          @media (min-width: 1024px) {
            .differentiator-grid {
              grid-template-columns: 6fr 6fr;
              gap: 5rem;
              align-items: start;
            }
          }
          /* Pull quote — editorial inset, offset by 40px from top per D2 device */
          .pull-quote-offset {
            padding-top: 0;
          }
          @media (min-width: 1024px) {
            .pull-quote-offset { padding-top: 2.5rem; }
          }
        `}</style>

        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 var(--container-pad-desktop)",
          }}
        >
          <div className="differentiator-grid">
            {/* LEFT: Body copy */}
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
                  marginBottom: "1.5rem",
                }}
              >
                Tømrer + snedker i ét firma
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "1.25rem",
                }}
              >
                En tilbygning består af to fundamentalt forskellige faser: den strukturelle opbygning (tømrerens domæne) og finish-arbejdet (snedkerens domæne). I de fleste projekter udføres de to faser af to separate firmaer, med en koordineringspause imellem.
              </p>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "1.25rem",
                }}
              >
                Koordineringsproblemer opstår typisk i overgangen: tømreren forlader pladsen med råhus-stadiet, og snedkeren ankommer og opdager at noget ikke passer — et vindueshul der ikke er korrekt frest, en dørfals der er 5mm fra, en vægkonstruktion der ikke er klar til den specificerede beklædning.
              </p>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "2rem",
                }}
              >
                Fordi vi udfører begge faser, planlægges tilbygningen med det endelige resultat i mente fra dag ét. Det giver præcision i udførelsen og ét enkelt kontaktpunkt for dig som bygherre.
              </p>

              {/* Second image from tilbygning catalog — editorial inset */}
              {/* SLOT-tilbygninger-hero-001 secondary: catalog-reuse — tilbygning-halgaard-2.jpg */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "260px",
                  overflow: "hidden",
                  borderRadius: 0,
                  border: "1px solid var(--color-border)",
                }}
              >
                <Image
                  src="/images/cases/tilbygning-halgaard-2.jpg"
                  alt="Tilbygning under opførelse i Halgård — konstruktionsfase"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ objectFit: "cover", objectPosition: "center", borderRadius: 0 }}
                />
              </div>
            </div>

            {/* RIGHT: Pull-quote + key facts — offset from top per D2 */}
            <div className="pull-quote-offset">
              {/* Pull-quote — editorial sidebar element per L2/D2 */}
              <blockquote
                style={{
                  margin: 0,
                  padding: "2.5rem",
                  background: "var(--color-surface-dark)",
                  borderRadius: 0,
                  marginBottom: "2.5rem",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: "2rem",
                    height: "1px",
                    background: "rgba(245,240,232,0.2)",
                    marginBottom: "1.25rem",
                  }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                    lineHeight: "var(--line-height-snug)",
                    letterSpacing: "var(--letter-spacing-tight)",
                    color: "var(--color-bone)",
                    fontStyle: "normal",
                    marginBottom: "1.25rem",
                  }}
                >
                  &ldquo;Tømrer og snedker under samme tag: ét firma, ét ansvar.&rdquo;
                </p>
                <footer
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8125rem",
                    color: "var(--color-stone)",
                    letterSpacing: "var(--letter-spacing-wide)",
                    textTransform: "uppercase",
                  }}
                >
                  Tømrer & Snedker v/ Martin Mejdahl Jørgensen
                </footer>
              </blockquote>

              {/* Key differentiators — compact fact list */}
              <div
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: 0,
                  overflow: "hidden",
                }}
              >
                {[
                  { label: "Fundament til finish", detail: "Ét firma holder ansvaret hele vejen" },
                  { label: "Ingen koordineringspause", detail: "Struktur og snedker planlægges i ét" },
                  { label: "Byg Garanti på alt", detail: "3 + 10 år garanti, privat boligbyggeri" },
                  { label: "Holstebro og hele landet", detail: "Dokumenteret erfaring fra Midtjylland" },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "1rem 1.5rem",
                      borderBottom: i < 3 ? "1px solid var(--color-border)" : "none",
                      background: i % 2 === 0 ? "var(--color-bone)" : "var(--color-paper)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "0.9375rem",
                        lineHeight: "var(--line-height-snug)",
                        letterSpacing: "var(--letter-spacing-tight)",
                        color: "var(--color-ink)",
                        display: "block",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        color: "var(--color-stone)",
                      }}
                    >
                      {item.detail}
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
          L2: editorial step list — numbered, full-width container
          but NOT equal columns. 5 steps in diminishing widths.
          T4: step titles in Zilla Slab.
          S4: hairlines.
          D2: 120px section gap.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Fremgangsmåde ved tilbygning"
        style={{
          background: "var(--color-bone)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          /* L2: process steps — NOT equal columns, NOT same as tagrenovering */
          /* Different grid approach: alternating 2-column layout for visual variety */
          .tilb-process-list {
            display: flex;
            flex-direction: column;
            gap: 0;
            border: 1px solid var(--color-border);
          }
          .tilb-process-row {
            display: grid;
            grid-template-columns: 1fr;
            border-bottom: 1px solid var(--color-border);
          }
          @media (min-width: 768px) {
            /* Alternating proportions per L2 — rows 1,3 are 3/9; rows 2,4 are 9/3; row 5 full */
            .tilb-process-row-a { grid-template-columns: 3fr 9fr; }
            .tilb-process-row-b { grid-template-columns: 9fr 3fr; }
          }
          .tilb-process-row:last-child { border-bottom: none; }
          .tilb-step-num {
            padding: 2rem 2rem;
            border-right: 1px solid var(--color-border);
            display: flex;
            align-items: flex-start;
            background: var(--color-paper);
          }
          @media (min-width: 768px) {
            .tilb-step-num { padding: 2.5rem 2.5rem; }
          }
          .tilb-step-body {
            padding: 2rem 2rem;
            background: var(--color-bone);
          }
          @media (min-width: 768px) {
            .tilb-step-body { padding: 2.5rem 3rem; }
          }
          /* For row-b: num is on right */
          .tilb-step-num-right {
            padding: 2rem 2rem;
            border-left: 1px solid var(--color-border);
            display: flex;
            align-items: flex-start;
            background: var(--color-paper);
            order: 2;
          }
          @media (min-width: 768px) {
            .tilb-step-num-right { padding: 2.5rem 2.5rem; order: 2; }
          }
        `}</style>

        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 var(--container-pad-desktop)",
          }}
        >
          <div style={{ maxWidth: "44ch", marginBottom: "3rem" }}>
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
                marginBottom: "0.875rem",
              }}
            >
              Fra tegning til nøgle — vores proces
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: "var(--line-height-normal)",
                color: "var(--color-stone)",
              }}
            >
              Fem faser, ét firma, ét ansvar.
            </p>
          </div>

          {/* Process steps — alternating layout (L2 device) */}
          <div className="tilb-process-list" role="list">
            {processSteps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={step.num}
                  className={`tilb-process-row ${isEven ? "tilb-process-row-a" : "tilb-process-row-b"}`}
                  role="listitem"
                >
                  {isEven ? (
                    <>
                      {/* Number left */}
                      <div className="tilb-step-num">
                        <div>
                          <div
                            aria-hidden="true"
                            style={{ width: "1.5rem", height: "1px", background: "var(--color-border)", marginBottom: "0.75rem" }}
                          />
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "1.25rem",
                              color: "var(--color-stone)",
                              display: "block",
                            }}
                          >
                            {step.num}
                          </span>
                        </div>
                      </div>
                      {/* Content right */}
                      <div className="tilb-step-body">
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            fontSize: "1.125rem",
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
                            fontSize: "0.9375rem",
                            lineHeight: "var(--line-height-normal)",
                            color: "var(--color-stone)",
                            maxWidth: "56ch",
                          }}
                        >
                          {step.body}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Content left */}
                      <div className="tilb-step-body" style={{ order: 1, background: "var(--color-paper)" }}>
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            fontSize: "1.125rem",
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
                            fontSize: "0.9375rem",
                            lineHeight: "var(--line-height-normal)",
                            color: "var(--color-stone)",
                            maxWidth: "56ch",
                          }}
                        >
                          {step.body}
                        </p>
                      </div>
                      {/* Number right */}
                      <div className="tilb-step-num-right">
                        <div>
                          <div
                            aria-hidden="true"
                            style={{ width: "1.5rem", height: "1px", background: "var(--color-border)", marginBottom: "0.75rem" }}
                          />
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "1.25rem",
                              color: "var(--color-stone)",
                              display: "block",
                            }}
                          >
                            {step.num}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 4 — HALGAARD CASE REFERENCE
          L2: 7/12 image / 5/12 text — editorial inset into case evidence.
          P3: tilbygning-halgaard images.
          S4: 0px radius.
          D2: 120px section gap.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Tilbygning i Halgård — projekteksempel"
        style={{
          background: "var(--color-paper)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          /* L2: 7fr image / 5fr text — different from hero proportions */
          .case-ref-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
          @media (min-width: 1024px) {
            .case-ref-grid {
              grid-template-columns: 7fr 5fr;
              gap: 5rem;
              align-items: center;
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
          <div className="case-ref-grid">
            {/* LEFT: Image — catalog-reuse tilbygning-halgaard */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "420px",
                overflow: "hidden",
                borderRadius: 0,
                border: "1px solid var(--color-border)",
              }}
            >
              <Image
                src="/images/cases/tilbygning-halgaard-3.jpg"
                alt="Tilbygning i Halgård — tømrer og snedkerarbejde under opførelse"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                style={{ objectFit: "cover", objectPosition: "center", borderRadius: 0 }}
              />
            </div>

            {/* RIGHT: Case context text */}
            <div>
              <div
                aria-hidden="true"
                style={{ width: "3rem", height: "1px", background: "var(--color-border)", marginBottom: "1.25rem" }}
              />

              {/* Case category label */}
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "var(--letter-spacing-wide)",
                  textTransform: "uppercase",
                  color: "var(--color-stone)",
                  display: "block",
                  marginBottom: "0.875rem",
                }}
              >
                Projekteksempel · Halgård
              </span>

              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(1.375rem, 2.5vw, 2rem)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-ink)",
                  marginBottom: "1.25rem",
                }}
              >
                Tilbygning i Halgård nær Holstebro
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "1.25rem",
                }}
              >
                Strukturel tilbygning til eksisterende parcelhus. Fundament, rejsning og komplet tagkonstruktion udført af ét firma — ingen koordinering mellem håndværkere, ingen gråzoner.
              </p>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "2rem",
                }}
              >
                Projektet illustrerer præcis, hvad det betyder at have tømrer og snedker under ét tag: hvert trin i konstruktionen er tilpasset de efterfølgende snedkerdetaljer, og resultatet er et sammenhængende byggeri uden de pauser og misforståelser, der opstår, når to firmaer koordinerer.
              </p>

              <HoverLink
                href="/projekter/tilbygning-halgaard"
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
                Se hele projektet <span aria-hidden="true">→</span>
              </HoverLink>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 5 — RELATED SERVICES
          L2: 3fr / 4fr / 5fr — ascending widths (opposite to tagrenovering)
          T4: Zilla Slab headings.
          S4: hairline borders.
          D2: 120px section gap.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Relaterede ydelser"
        style={{
          background: "var(--color-bone)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          /* L2: 3fr / 4fr / 5fr — ascending (different from tagrenovering's 4/5/3) */
          .tilb-related-grid {
            display: grid;
            grid-template-columns: 1fr;
            border: 1px solid var(--color-border);
          }
          @media (min-width: 768px) {
            .tilb-related-grid { grid-template-columns: 3fr 4fr 5fr; }
          }
          .tilb-related-card {
            padding: 2.25rem 2rem;
            border-bottom: 1px solid var(--color-border);
            background: var(--color-paper);
          }
          @media (min-width: 768px) {
            .tilb-related-card {
              border-bottom: none;
              border-right: 1px solid var(--color-border);
            }
            .tilb-related-card:last-child { border-right: none; }
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

          <div className="tilb-related-grid">
            {/* Tagrenovering */}
            <div className="tilb-related-card">
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
                Tagrenovering
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
                Tilbygningens tag som en integreret del af helheden.
              </p>
              <HoverLink
                href="/ydelser/tagrenovering"
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

            {/* Isolering & Lofter */}
            <div className="tilb-related-card" style={{ background: "var(--color-bone)" }}>
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
                Isolering & Lofter
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
                Korrekt isolering af vægge og loft i tilbygningen fra dag ét.
              </p>
              <HoverLink
                href="/ydelser/isolering-lofter"
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

            {/* Total renovering */}
            <div className="tilb-related-card">
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
                Total renovering
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
                Når tilbygningen kombineres med en totalrenovering af den eksisterende bolig — ét koordineret forløb.
              </p>
              <HoverLink
                href="/ydelser/total-renovering"
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
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <CtaBlock
        heading="Planlægger du en tilbygning?"
        subtext="Ring til Martin for en gratis snak om dit projekt. Vi gennemgår mulighederne med dig — fra projektering til færdig nøgle. Gratis tilbud, ingen forpligtelse."
        primaryCta={{ label: "Få gratis tilbudsvurdering", href: "/kontakt" }}
        secondaryCta={{ label: "Ring: 40 36 88 62", href: "tel:+4540368862" }}
        variant="light"
      />
    </>
  );
}
