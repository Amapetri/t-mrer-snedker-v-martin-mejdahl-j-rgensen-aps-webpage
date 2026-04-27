import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBlock } from "@/components/CtaBlock";
import { JsonLd } from "@/components/JsonLd";
import { HoverLink } from "@/components/HoverLink";

// ─────────────────────────────────────────────
// Fugtskade Sanering — /ydelser/fugtskade-sanering/
// Primary keyword: fugtskade sanering tømrer
// Secondary: skimmelsvamp renovering, fugtskade udbedring
// T4: Zilla Slab H1.
// L2: Section layouts all different — hero full-text-left/image-right,
//     what-we-do 3-col varied, process alternating, before/after 5/7.
// P3: koebenhavn-lejlighed images ONLY in before/after pairing.
// S4: 0px radius everywhere.
// D2: 120px section gaps.
// M1: 150ms transitions.
// ─────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Fugtskade Sanering | Skimmelsvamp | Martin Mejdahl Jørgensen",
  description:
    "Fugtskade og skimmelsvamp sanering — korrekt identifikation, fjernelse og forebyggelse. Dokumenteret erfaring fra hele landet inkl. København. Byg Garanti certificeret tømrer.",
  alternates: {
    canonical: "/ydelser/fugtskade-sanering",
  },
};

// ─────────────────────────────────────────────
// JSON-LD — Service schema
// ─────────────────────────────────────────────

const fugtskadeSaneringSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Fugtskade og skimmelsvamp sanering",
  description:
    "Professionel fugtskade og skimmelsvamp sanering. Identifikation af fugtkilder, korrekt fjernelse, forebyggelse og rekonstruktion. Landsækkende service — dokumenteret erfaring fra København. Byg Garanti certificeret.",
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
  areaServed: {
    "@type": "Country",
    name: "Denmark",
  },
  url: "https://www.mejdahltoemrer.dk/ydelser/fugtskade-sanering",
};

// ─────────────────────────────────────────────
// Process steps — 5 real steps, no lorem ipsum
// ─────────────────────────────────────────────

const processSteps = [
  {
    num: "01",
    title: "Besigtigelse og fugtkortlægning",
    body: "Vi møder op og gennemgår det berørte område grundigt. Fugtmåling, visuel inspektion og kortlægning af spredning. Du får et klart billede af omfanget — og hvad der skal til.",
  },
  {
    num: "02",
    title: "Isolering af området",
    body: "Det berørte rum afspærres fra resten af bygningen. Undertryk sikrer at skimmelsporer ikke spredes til andre rum under saneringen.",
  },
  {
    num: "03",
    title: "Fjernelse af inficeret materiale",
    body: "Alt materiale med skimmelsvamp fjernes korrekt og bortskaffes efter gældende regler. Ingen overmaling, ingen 'behandling' af inficeret gipspladevæg — det går ud.",
  },
  {
    num: "04",
    title: "Behandling og tørring",
    body: "Bagvedliggende konstruktioner behandles og tørres grundigt. Fugtkilden identificeres og adressen — om det er utæt rør, kondensation eller manglende dampspærre.",
  },
  {
    num: "05",
    title: "Rekonstruktion med fugtbestandige materialer",
    body: "Ny opbygning med materialer der modstår fugt. Dampspærre, isolering og beklædning monteres korrekt — så problemet ikke vender tilbage.",
  },
];

// ─────────────────────────────────────────────
// Page — Server Component
// ─────────────────────────────────────────────

export default async function FugtskadeSaneringPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={fugtskadeSaneringSchema} />

      {/* ══════════════════════════════════════════════════
          SECTION 1 — HERO
          L2: 6/12 text left (dark surface — urgency register),
              6/12 image right. Different from other heroes (dark bg).
          P3: fugtskade context — image introduced in before/after only,
              hero is text-primary with urgency framing.
          T4: H1 at service-page scale.
          S4: 0px radius.
          D2: min-height 480px.
          C5: amber trust signal on Byg Garanti only.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Fugtskade og skimmelsvamp sanering"
        style={{
          background: "var(--color-surface-dark)",
          borderBottom: "1px solid rgba(245,240,232,0.08)",
          overflow: "hidden",
        }}
      >
        <style>{`
          /* L2: 6/12 text (dark) / 6/12 image — equal split here is intentional:
             dark text on dark bg needs full space; different from other heroes (7/5 or 5/7).
             The dark bg itself is the L2 variation — no other hero uses dark surface. */
          .fugt-hero-grid {
            display: grid;
            grid-template-columns: 1fr;
            min-height: 460px;
          }
          @media (min-width: 1024px) {
            .fugt-hero-grid {
              grid-template-columns: 6fr 6fr;
              min-height: 520px;
            }
          }
          .fugt-hero-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 3.5rem 1.5rem;
          }
          @media (min-width: 1024px) {
            .fugt-hero-text {
              padding: 5rem 3rem 5rem max(3rem, calc((100vw - 80rem) / 2 + 3rem));
            }
          }
          .fugt-hero-img {
            position: relative;
            min-height: 280px;
            overflow: hidden;
          }
          @media (min-width: 1024px) {
            .fugt-hero-img { min-height: 0; }
          }
        `}</style>

        <div className="fugt-hero-grid">
          {/* LEFT: Text on dark — urgency register */}
          <div className="fugt-hero-text">
            {/* Breadcrumbs */}
            <Breadcrumbs
              items={[
                { label: "Ydelser", href: "/ydelser" },
                { label: "Fugtskade Sanering" },
              ]}
            />

            {/* Hairline — S4 on dark surface */}
            <div
              aria-hidden="true"
              style={{
                width: "3rem",
                height: "1px",
                background: "rgba(245,240,232,0.2)",
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
              Ydelse / Hele landet
            </span>

            {/* H1 — bone on dark */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
                lineHeight: "var(--line-height-tight)",
                letterSpacing: "var(--letter-spacing-tight)",
                color: "var(--color-bone)",
                maxWidth: "14ch",
                marginBottom: "1.5rem",
              }}
            >
              Fugtskade og skimmelsvamp sanering
            </h1>

            {/* Lead — urgency framing, real Danish copy */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                lineHeight: "var(--line-height-snug)",
                color: "var(--color-clay)",
                maxWidth: "44ch",
                marginBottom: "2rem",
              }}
            >
              Skimmelsvamp er ikke et kosmetisk problem. Det er et indeklima- og sundhedsproblem der kræver korrekt identifikation, fjernelse og forebyggelse. Vi har dokumenteret erfaring fra projekter hele landet — inkl. en større sanering i København.
            </p>

            {/* Nationwide + Byg Garanti combined trust signals */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {/* Byg Garanti — amber */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1.125rem",
                  border: "1px solid rgba(217,119,6,0.4)",
                  borderRadius: 0,
                  background: "rgba(217,119,6,0.08)",
                  width: "fit-content",
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
              </div>

              {/* Nationwide — no amber */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1.125rem",
                  border: "1px solid rgba(245,240,232,0.12)",
                  borderRadius: 0,
                  background: "rgba(245,240,232,0.04)",
                  width: "fit-content",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{ width: "1.5rem", height: "1px", background: "rgba(245,240,232,0.2)", flexShrink: 0 }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.8125rem",
                    color: "var(--color-clay)",
                    letterSpacing: "var(--letter-spacing-wide)",
                    textTransform: "uppercase",
                  }}
                >
                  Vi rykker ud i hele landet
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Before image — with narrative framing (P3: REUSE-IF in before/after context) */}
          {/* SLOT-fugtskade-ydelse-hero-001: catalog-reuse koebenhavn-lejlighed-foer.jpg */}
          <div className="fugt-hero-img">
            <Image
              src="/images/cases/koebenhavn-lejlighed-foer.jpg"
              alt="Fugtskade i lejlighed — synlige tegn på fugtindtrænging, før sanering"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: "cover", objectPosition: "center", borderRadius: 0 }}
            />
            {/* Caption — contextualizes the image immediately (P3: never mold shot without narrative) */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "rgba(26,22,18,0.85)",
                padding: "1rem 1.5rem",
                borderTop: "1px solid rgba(245,240,232,0.1)",
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
                Projekt · København · Inden sanering
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 2 — WHAT WE DO
          L2: 3 capability cards, NOT equal — 5fr / 4fr / 3fr.
          T4: Zilla Slab card headings.
          S4: hairlines, 0px radius.
          D2: 120px section gap.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Hvad vi udfører — fugtskade og skimmel"
        style={{
          background: "var(--color-bone)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          /* L2: 5fr / 4fr / 3fr — descending widths */
          .what-we-do-grid {
            display: grid;
            grid-template-columns: 1fr;
            border: 1px solid var(--color-border);
          }
          @media (min-width: 768px) {
            .what-we-do-grid { grid-template-columns: 5fr 4fr 3fr; }
          }
          .what-we-do-card {
            padding: 2.5rem 2rem;
            border-bottom: 1px solid var(--color-border);
            background: var(--color-paper);
          }
          @media (min-width: 768px) {
            .what-we-do-card {
              border-bottom: none;
              border-right: 1px solid var(--color-border);
            }
            .what-we-do-card:last-child { border-right: none; }
          }
        `}</style>

        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 var(--container-pad-desktop)",
          }}
        >
          <div style={{ maxWidth: "48ch", marginBottom: "3rem" }}>
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
              Hvad vi udfører
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: "var(--line-height-normal)",
                color: "var(--color-stone)",
              }}
            >
              Korrekt sanering er mere end at fjerne det synlige — det handler om at finde kilden og bygge rigtigt op igen.
            </p>
          </div>

          <div className="what-we-do-grid" role="list">
            {/* Diagnose */}
            <div className="what-we-do-card" role="listitem">
              <div
                aria-hidden="true"
                style={{ width: "2rem", height: "1px", background: "var(--color-border)", marginBottom: "1.125rem" }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  lineHeight: "var(--line-height-snug)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-ink)",
                  marginBottom: "0.75rem",
                }}
              >
                Diagnose og fugtkortlægning
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                }}
              >
                Fugtmåling og visuel kortlægning af hele det berørte område. Vi finder kilden — ikke bare symptomet. Utæt rør, kondensation, manglende dampspærre, indtrænging udefra — årsagen bestemmer løsningen.
              </p>
            </div>

            {/* Fjernelse */}
            <div className="what-we-do-card" role="listitem" style={{ background: "var(--color-bone)" }}>
              <div
                aria-hidden="true"
                style={{ width: "2rem", height: "1px", background: "var(--color-border)", marginBottom: "1.125rem" }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  lineHeight: "var(--line-height-snug)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-ink)",
                  marginBottom: "0.75rem",
                }}
              >
                Sanering og fjernelse
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                }}
              >
                Alt inficeret materiale fjernes — ingen overmaling, ingen halvløsninger. Området isoleres under arbejdet for at undgå spredning. Korrekt bortskaffelse.
              </p>
            </div>

            {/* Rekonstruktion */}
            <div className="what-we-do-card" role="listitem">
              <div
                aria-hidden="true"
                style={{ width: "2rem", height: "1px", background: "var(--color-border)", marginBottom: "1.125rem" }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  lineHeight: "var(--line-height-snug)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-ink)",
                  marginBottom: "0.75rem",
                }}
              >
                Rekonstruktion og forebyggelse
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                }}
              >
                Ny opbygning med fugtbestandige materialer og korrekt dampspærre. Fugtkilden adresseres — ikke bare dækket til.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 3 — PROCESS STEPS
          L2: Five steps in a single full-width vertical list,
          but with editorial variation: each step card alternates
          between bone and paper background, and step number
          column varies in width (odd: 2fr/10fr, even: 10fr/2fr).
          Different from both tagrenovering and tilbygninger.
          T4: step titles in Zilla Slab.
          S4: hairlines, 0px radius.
          D2: 120px section gap.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Vores fremgangsmåde — fugtskade sanering"
        style={{
          background: "var(--color-paper)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          .fugt-process-step {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 0;
            border: 1px solid var(--color-border);
            border-top: none;
            align-items: stretch;
          }
          .fugt-process-step:first-child {
            border-top: 1px solid var(--color-border);
          }
          .fugt-step-num-col {
            padding: 2rem 1.75rem;
            border-right: 1px solid var(--color-border);
            display: flex;
            align-items: flex-start;
            min-width: 4rem;
          }
          .fugt-step-content-col {
            padding: 2rem 2.5rem;
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
              Processen trin for trin
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: "var(--line-height-normal)",
                color: "var(--color-stone)",
              }}
            >
              Grundig, korrekt sanering kræver alle fem trin — ingen genveje.
            </p>
          </div>

          <div role="list">
            {processSteps.map((step, i) => (
              <div
                key={step.num}
                className="fugt-process-step"
                role="listitem"
                style={{
                  background: i % 2 === 0 ? "var(--color-bone)" : "var(--color-paper)",
                }}
              >
                <div
                  className="fugt-step-num-col"
                  style={{ background: i % 2 === 0 ? "var(--color-paper)" : "var(--color-bone)" }}
                >
                  <div>
                    <div
                      aria-hidden="true"
                      style={{ width: "1.25rem", height: "1px", background: "var(--color-border)", marginBottom: "0.625rem" }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.875rem",
                        color: "var(--color-stone)",
                        letterSpacing: "0.04em",
                        display: "block",
                      }}
                    >
                      {step.num}
                    </span>
                  </div>
                </div>
                <div className="fugt-step-content-col">
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
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9375rem",
                      lineHeight: "var(--line-height-normal)",
                      color: "var(--color-stone)",
                      maxWidth: "60ch",
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 4 — BEFORE/AFTER: COPENHAGEN CASE
          P3: koebenhavn-lejlighed-skimmel.jpg + koebenhavn-lejlighed-efter.jpg
              MUST appear together in before/after pairing.
              NEVER the mold shot in isolation.
          L2: 5fr before / 7fr after — the "after" is wider, resolution dominant.
          S4: 0px radius, image borders hairline.
          D2: 120px section gap.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Fugtskade sanering i København — projekteksempel"
        style={{
          background: "var(--color-bone)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          /* Before/after image pairing — L2: 5fr before / 7fr after (resolution dominant) */
          .before-after-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1px;
            background: var(--color-border);
            border: 1px solid var(--color-border);
          }
          @media (min-width: 768px) {
            .before-after-grid { grid-template-columns: 5fr 7fr; }
          }
          .ba-panel {
            position: relative;
            background: var(--color-bone);
          }
          .ba-img-wrap {
            position: relative;
            width: 100%;
            height: 320px;
            overflow: hidden;
            border-radius: 0;
          }
          @media (min-width: 768px) {
            .ba-img-wrap { height: 380px; }
          }
          .ba-label {
            padding: 1.25rem 1.5rem;
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
          {/* Section header */}
          <div style={{ maxWidth: "52ch", marginBottom: "3rem" }}>
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
                marginBottom: "1rem",
              }}
            >
              Projekteksempel: sanering i København
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: "var(--line-height-normal)",
                color: "var(--color-stone)",
              }}
            >
              Vi sanerede en fugtskade-ramt lejlighed i København — fugtkilden identificeret, inficeret materiale fjernet og lejligheden rekonstrueret. Dokumenteret med før- og efterbilleder.
            </p>
          </div>

          {/* Before/After pairing — SLOT-fugtskade-mold-001 + SLOT-fugtskade-after-001 */}
          {/* P3: mold image only shown paired with after — structural requirement */}
          <div className="before-after-grid">
            {/* BEFORE: skimmel image — with "Inden sanering" label */}
            <div className="ba-panel">
              <div className="ba-img-wrap">
                <Image
                  src="/images/cases/koebenhavn-lejlighed-skimmel.jpg"
                  alt="Skimmelsvamp i væggen — fugtskade før sanering, Københavns lejlighed"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  style={{ objectFit: "cover", objectPosition: "center", borderRadius: 0 }}
                />
              </div>
              <div className="ba-label">
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.6875rem",
                    letterSpacing: "var(--letter-spacing-wide)",
                    textTransform: "uppercase",
                    color: "var(--color-stone)",
                    display: "block",
                    marginBottom: "0.375rem",
                  }}
                >
                  Inden sanering
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    lineHeight: "var(--line-height-normal)",
                    color: "var(--color-stone)",
                    maxWidth: "32ch",
                  }}
                >
                  Skimmelsvamp synlig i væggens konstruktion. Fugtkilden var en kombination af utæt rør og manglende dampspærre.
                </p>
              </div>
            </div>

            {/* AFTER: efter image — with "Efter sanering" label, wider (7fr) */}
            <div className="ba-panel">
              <div className="ba-img-wrap">
                <Image
                  src="/images/cases/koebenhavn-lejlighed-efter.jpg"
                  alt="Renoveret lejlighed i København — efter fugtskade sanering, færdig resultat"
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  style={{ objectFit: "cover", objectPosition: "center", borderRadius: 0 }}
                />
              </div>
              <div className="ba-label" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "2rem" }}>
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "0.6875rem",
                      letterSpacing: "var(--letter-spacing-wide)",
                      textTransform: "uppercase",
                      color: "var(--color-stone)",
                      display: "block",
                      marginBottom: "0.375rem",
                    }}
                  >
                    Efter sanering
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      lineHeight: "var(--line-height-normal)",
                      color: "var(--color-stone)",
                      maxWidth: "40ch",
                    }}
                  >
                    Ny opbygning med fugtbestandige materialer, korrekt dampspærre og isolering. Fugtkilden udbedret.
                  </p>
                </div>
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
                    color: "var(--color-stone)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  Se projektet <span aria-hidden="true">→</span>
                </HoverLink>
              </div>
            </div>
          </div>

          {/* Nationwide note — below the before/after */}
          <div
            style={{
              marginTop: "2.5rem",
              padding: "1.5rem 2rem",
              border: "1px solid var(--color-border)",
              borderRadius: 0,
              background: "var(--color-paper)",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <div
              aria-hidden="true"
              style={{ width: "2rem", height: "1px", background: "var(--color-border)", flexShrink: 0 }}
            />
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                lineHeight: "var(--line-height-normal)",
                color: "var(--color-stone)",
              }}
            >
              <strong style={{ fontWeight: 600, color: "var(--color-ink)" }}>Vi rykker ud i hele landet.</strong>{" "}
              Fugtskader opstår overalt i Danmark — ikke kun i Holstebro. Kontakt os uanset adresse.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 5 — RELATED SERVICES
          L2: 3 cards — 6fr / 4fr / 2fr — most varied ratio yet.
          T4: Zilla Slab headings.
          S4: hairlines, 0px radius.
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
          /* L2: 6fr / 4fr / 2fr — most extreme ratio in any related grid */
          .fugt-related-grid {
            display: grid;
            grid-template-columns: 1fr;
            border: 1px solid var(--color-border);
          }
          @media (min-width: 768px) {
            .fugt-related-grid { grid-template-columns: 6fr 4fr 2fr; }
          }
          .fugt-related-card {
            padding: 2.25rem 2rem;
            border-bottom: 1px solid var(--color-border);
            background: var(--color-bone);
          }
          @media (min-width: 768px) {
            .fugt-related-card {
              border-bottom: none;
              border-right: 1px solid var(--color-border);
            }
            .fugt-related-card:last-child { border-right: none; }
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

          <div className="fugt-related-grid">
            {/* Total renovering */}
            <div className="fugt-related-card">
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
                Når fugtskaden er omfangsrig og kræver en større renovering — vi koordinerer det hele.
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

            {/* Isolering & Lofter */}
            <div className="fugt-related-card" style={{ background: "var(--color-paper)" }}>
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
                Korrekt dampspærre og isolering forebygger ny fugtskade.
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

            {/* Alle ydelser */}
            <div className="fugt-related-card">
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
                Fuld oversigt over tømrer- og snedkerydelser.
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
          CTA BLOCK — urgency-specific copy
          C5: amber primary CTA.
          D2: section-gap from CtaBlock.
          ══════════════════════════════════════════════════ */}

      <CtaBlock
        heading="Opdaget fugt? Kontakt os i dag."
        subtext="Fugtskader forværres over tid — jo hurtigere du handler, jo mindre omfang. Ring til Martin direkte for en vurdering. Vi rykker ud i hele landet."
        primaryCta={{ label: "Kontakt os nu", href: "/kontakt" }}
        secondaryCta={{ label: "Ring: 40 36 88 62", href: "tel:+4540368862" }}
        variant="dark"
      />
    </>
  );
}
