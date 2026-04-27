import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBlock } from "@/components/CtaBlock";
import { JsonLd } from "@/components/JsonLd";
import { HoverLink } from "@/components/HoverLink";

// ─────────────────────────────────────────────
// Tagrenovering — /ydelser/tagrenovering/
// Primary keyword: tagrenovering Holstebro
// Secondary: tagrenovering tømrer, tag renovering pris
// T4: Zilla Slab H1 at service-page scale (56–64px).
// L2: Section layouts alternate — hero 7/5, process full-width,
//     Byg Garanti 5/7 (flipped), related services 3-column varied.
// S4: 0px radius everywhere including Image wrappers.
// D2: 120px section gaps.
// P3: hero-main.jpg as process documentary hero.
// M1: 150ms hover transitions only.
// ─────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Tagrenovering Holstebro | Byg Garanti | Martin Mejdahl Jørgensen",
  description:
    "Komplet tagrenovering i Holstebro og omegn. Fjernelse af gammelt tagdækning, ny membran, isolering og underlag. Byg Garanti certificeret — 10 år på skjulte fejl.",
  alternates: {
    canonical: "/ydelser/tagrenovering",
  },
};

// ─────────────────────────────────────────────
// JSON-LD — Service schema
// ─────────────────────────────────────────────

const tagRenoveringSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Tagrenovering",
  description:
    "Komplet tagrenovering i Holstebro og omegn. Vi udfører fjernelse af gammelt tagdækning, montering af ny membran, isolering og underlag. Byg Garanti certificeret — 10 år på skjulte fejl.",
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
  url: "https://www.mejdahltoemrer.dk/ydelser/tagrenovering",
};

// ─────────────────────────────────────────────
// Process steps — 5 real steps, no lorem ipsum
// ─────────────────────────────────────────────

const processSteps = [
  {
    num: "01",
    title: "Besigtigelse og tilbud",
    body: "Vi møder op og gennemgår taget grundigt — identificerer skader, vurderer isoleringsstand og fastlægger det rette løsningsniveau. Gratis tilbud med specifikation.",
  },
  {
    num: "02",
    title: "Stillads og afdækning",
    body: "Stillads monteres og bygningen afdækkes forsvarligt inden arbejdet begynder. Vi sikrer mod vejr og skader på hele ejendommen under processen.",
  },
  {
    num: "03",
    title: "Fjernelse af gammelt tag",
    body: "Eksisterende tagdækning fjernes ned til spærene. Rådne eller beskadigede konstruktionsdele identificeres og udskiftes, inden nyt underlag lægges.",
  },
  {
    num: "04",
    title: "Isolering og underlag",
    body: "Ny isolering monteres til korrekt U-værdi. Dampspærre og undertagsmembran lægges efter gældende bygningsreglements krav — korrekt rækkefølge er afgørende for at undgå kondensproblemer.",
  },
  {
    num: "05",
    title: "Ny tagdækning og afslutning",
    body: "Tagdækning monteres — enten tegl, betontagsten, tagpap eller andet aftalt materiale. Afslutning ved kviste, inddækninger og rygning sikres vandtæt. Slutkontrol og rydning.",
  },
];

// ─────────────────────────────────────────────
// Page — Server Component
// ─────────────────────────────────────────────

export default async function TagRenoveringPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={tagRenoveringSchema} />

      {/* ══════════════════════════════════════════════════
          SECTION 1 — HERO
          L2: 7/12 text left (bone), 5/12 image right (bleeds edge).
          P3: hero-main.jpg — construction process documentary.
          T4: H1 at service-page scale: clamp(2.25rem, 4.5vw, 4rem).
          S4: 0px radius on image, hairline below section.
          D2: 6rem vertical padding.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Tagrenovering i Holstebro og omegn"
        style={{
          background: "var(--color-bone)",
          borderBottom: "1px solid var(--color-border)",
          overflow: "hidden",
        }}
      >
        <style>{`
          .tag-hero-grid {
            display: grid;
            grid-template-columns: 1fr;
            min-height: 480px;
          }
          @media (min-width: 1024px) {
            .tag-hero-grid {
              grid-template-columns: 7fr 5fr;
              min-height: 560px;
            }
          }
          .tag-hero-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 3.5rem 1.5rem;
          }
          @media (min-width: 1024px) {
            .tag-hero-text {
              padding: 5rem 3rem 5rem max(3rem, calc((100vw - 80rem) / 2 + 3rem));
            }
          }
          .tag-hero-img {
            position: relative;
            min-height: 300px;
            overflow: hidden;
          }
          @media (min-width: 1024px) {
            .tag-hero-img { min-height: 0; }
          }
        `}</style>

        <div className="tag-hero-grid">
          {/* LEFT: Text column */}
          <div className="tag-hero-text">
            {/* Breadcrumbs */}
            <Breadcrumbs
              items={[
                { label: "Ydelser", href: "/ydelser" },
                { label: "Tagrenovering" },
              ]}
            />

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

            {/* Eyebrow — primary keyword context */}
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
                Holstebro og omegn
              </span>
            </div>

            {/* H1 — T4 Zilla Slab, D2 service scale */}
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
              Tagrenovering i Holstebro og omegn
            </h1>

            {/* Lead paragraph */}
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
              Et tag i dårlig stand er mere end et æstetisk problem — det er en risiko for din boligs konstruktion og indeklima. Vi udfører komplet tagrenovering: fra fjernelse af gammelt tagdækning til montering af ny membran, isolering og underlag. Byg Garanti certificeret.
            </p>

            {/* Byg Garanti signal — C5: amber on trust signal only */}
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
                Byg Garanti certificeret
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

          {/* RIGHT: Process documentary image — P3, S4: 0px radius */}
          {/* SLOT-tag-renovering-hero-001: catalog-reuse — hero-main.jpg */}
          <div className="tag-hero-img">
            <Image
              src="/images/hero/hero-main.jpg"
              alt="Tagrenovering under udførelse — tømrerarbejde, Holstebro og omegn"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              style={{ objectFit: "cover", objectPosition: "center", borderRadius: 0 }}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 2 — PROCESS STEPS
          L2: Full-width editorial section with step numbers.
          Steps laid out as a horizontal line of 5 on desktop,
          stacked on mobile. Each step: number in mono, title
          in slab, body in sans. No equal-column layout.
          T4: step titles in Zilla Slab.
          S4: hairline rules above each step number.
          D2: 120px section gap top and bottom.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Vores fremgangsmåde ved tagrenovering"
        style={{
          background: "var(--color-paper)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          /* L2: process steps — NOT equal columns
             Steps 01–02: wider (each ~25%), steps 03–04: medium, step 05: narrower
             Implementation: 5 columns, different flex weights via max-width per step */
          .process-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0;
            border: 1px solid var(--color-border);
          }
          @media (min-width: 900px) {
            /* L2 asymmetry: no step has identical width */
            .process-grid {
              /* 24fr / 22fr / 20fr / 18fr / 16fr = diminishing step widths */
              grid-template-columns: 24fr 22fr 20fr 18fr 16fr;
              grid-template-rows: 1fr;
            }
          }
          .process-step {
            padding: 2.5rem 2rem;
            border-bottom: 1px solid var(--color-border);
          }
          @media (min-width: 900px) {
            .process-step {
              border-bottom: none;
              border-right: 1px solid var(--color-border);
            }
            .process-step:last-child {
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
          {/* Section heading — L2: left-aligned, max 7/12 */}
          <div style={{ maxWidth: "44ch", marginBottom: "3rem" }}>
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
                marginBottom: "0.875rem",
              }}
            >
              Fremgangsmåden — trin for trin
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: "var(--line-height-normal)",
                color: "var(--color-stone)",
              }}
            >
              Fra første besigtigelse til afsluttende rydning — her er hvad du kan forvente.
            </p>
          </div>

          {/* Process steps grid — L2 asymmetric widths */}
          <div className="process-grid" role="list">
            {processSteps.map((step) => (
              <div key={step.num} className="process-step" role="listitem">
                {/* Hairline rule above step number — S4 structural */}
                <div
                  aria-hidden="true"
                  style={{
                    width: "2rem",
                    height: "1px",
                    background: "var(--color-border)",
                    marginBottom: "1rem",
                  }}
                />
                {/* Step number — mono, S4 structural */}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 400,
                    fontSize: "0.75rem",
                    color: "var(--color-stone)",
                    letterSpacing: "0.04em",
                    display: "block",
                    marginBottom: "0.75rem",
                  }}
                >
                  {step.num}
                </span>
                {/* Step title — T4 Zilla Slab */}
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
                {/* Body — IBM Plex Sans */}
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
          SECTION 3 — BYG GARANTI FOR ROOFS
          L2: 5/12 text left, 7/12 dark surface right (flipped from hero).
          Alternate composition — not same layout as Section 1.
          C5: amber ONLY on Byg Garanti headline and rule.
          S4: hairlines, 0px radius.
          D2: 120px section gap.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Byg Garanti og tagrenovering"
        style={{
          background: "var(--color-bone)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          /* L2: 5/7 reversed from hero (was 7/5) */
          .garanti-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          @media (min-width: 1024px) {
            .garanti-grid {
              grid-template-columns: 5fr 7fr;
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
          <div className="garanti-grid">
            {/* LEFT: Byg Garanti explanation — narrow column */}
            <div>
              {/* Amber structural rule — C5: trust signal only */}
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
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-ink)",
                  marginBottom: "1.25rem",
                }}
              >
                Byg Garanti — derfor er det vigtigt for dit tag
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
                Skjulte tagfejl kan tage år at opdage. En revnet membran, en utæt inddækning eller en forkert monteret dampspærre — skaden opstår indvendigt, i konstruktionen, og viser sig måske først 3–5 år efter arbejdet er udført.
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
                Med Byg Garanti er du dækket i 10 år på skjulte fejl. Det er ikke et løfte fra os — det er en formel garantiordning backed af Dansk Byggeri, som du selv kan verificere på byggaranti.dk.
              </p>

              {/* Warranty fact — mono set, structural */}
              <div
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: 0,
                  padding: "1.25rem 1.5rem",
                  background: "var(--color-paper)",
                }}
              >
                <div style={{ marginBottom: "0.625rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "var(--color-trust)",
                      letterSpacing: "0.04em",
                      display: "block",
                    }}
                  >
                    3 år
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      color: "var(--color-stone)",
                    }}
                  >
                    Synlige fejl og mangler
                  </span>
                </div>
                <div
                  aria-hidden="true"
                  style={{
                    width: "100%",
                    height: "1px",
                    background: "var(--color-border)",
                    margin: "0.75rem 0",
                  }}
                />
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "var(--color-trust)",
                      letterSpacing: "0.04em",
                      display: "block",
                    }}
                  >
                    10 år
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      color: "var(--color-stone)",
                    }}
                  >
                    Skjulte fejl — privat boligbyggeri
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: Additional context — wider column, darker surface */}
            <div
              style={{
                background: "var(--color-surface-dark)",
                padding: "3rem",
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
                  fontSize: "1.375rem",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-bone)",
                  marginBottom: "1.25rem",
                }}
              >
                Hvad dækker garantien konkret?
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[
                  {
                    title: "Utætheder og vandindtrænging",
                    body: "Opstår der lækage som følge af fejl i udførelsen — membran, inddækning eller tagsten — er det dækket af Byg Garanti.",
                  },
                  {
                    title: "Konstruktionsfejl i tagbjælkelag",
                    body: "Skjulte fejl i spær, lægter eller bærende konstruktion opdaget inden for 10 år er dækkede, forudsat de stammer fra vores udførelse.",
                  },
                  {
                    title: "Kondensproblemer fra fejlmonteret dampspærre",
                    body: "Forkert dampspærre medfører kondensskader over tid. Byg Garanti dækker, hvis skaden kan henføres til vores arbejde.",
                  },
                ].map((item, i) => (
                  <div key={i}>
                    <div
                      aria-hidden="true"
                      style={{
                        width: "1.5rem",
                        height: "1px",
                        background: "rgba(245,240,232,0.15)",
                        marginBottom: "0.75rem",
                      }}
                    />
                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "1rem",
                        lineHeight: "var(--line-height-snug)",
                        letterSpacing: "var(--letter-spacing-tight)",
                        color: "var(--color-bone)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9375rem",
                        lineHeight: "var(--line-height-normal)",
                        color: "var(--color-clay)",
                      }}
                    >
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 4 — RELATED SERVICES
          L2: 3 cards, but NOT equal — 4fr / 5fr / 3fr.
          T4: card headings in Zilla Slab.
          S4: hairline card borders, 0px radius.
          C5: no amber on cards.
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
          /* L2: related services — 4fr / 5fr / 3fr */
          .related-grid {
            display: grid;
            grid-template-columns: 1fr;
            border: 1px solid var(--color-border);
          }
          @media (min-width: 768px) {
            .related-grid { grid-template-columns: 4fr 5fr 3fr; }
          }
          .related-card {
            padding: 2.25rem 2rem;
            border-bottom: 1px solid var(--color-border);
            background: var(--color-bone);
          }
          @media (min-width: 768px) {
            .related-card {
              border-bottom: none;
              border-right: 1px solid var(--color-border);
            }
            .related-card:last-child { border-right: none; }
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
              Relaterede ydelser
            </h2>
          </div>

          <div className="related-grid">
            {/* Isolering & Lofter */}
            <div className="related-card">
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
                Loftsisolering og dampspærre — naturlig forlængelse af et tagrenoveringsprojekt.
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
            <div className="related-card" style={{ background: "var(--color-paper)" }}>
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
                Når taget er bare begyndelsen — vi koordinerer alle dele af renoveringen i ét forløb.
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

            {/* Alle ydelser */}
            <div className="related-card">
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
                Se alle ydelser
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
                Overblik over hele vores tømrer- og snedkersortiment.
              </p>
              <HoverLink
                href="/ydelser"
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
                Alle ydelser <span aria-hidden="true">→</span>
              </HoverLink>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA BLOCK — service-specific copy
          C5: amber primary CTA.
          D2: section-gap handled by CtaBlock.
          ══════════════════════════════════════════════════ */}

      <CtaBlock
        heading="Trænger dit tag til renovering?"
        subtext="Ring til Martin for en gratis besigtigelse og tilbud. Vi kigger på taget sammen og anbefaler den rigtige løsning — ingen forpligtelse, ingen salgsgas."
        primaryCta={{ label: "Få gratis tagvurdering", href: "/kontakt" }}
        secondaryCta={{ label: "Ring: 40 36 88 62", href: "tel:+4540368862" }}
        variant="light"
      />
    </>
  );
}
