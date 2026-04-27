import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBlock } from "@/components/CtaBlock";
import { JsonLd } from "@/components/JsonLd";
import { HoverLink } from "@/components/HoverLink";

// ─────────────────────────────────────────────
// Skure — /ydelser/skure/
// Primary keyword: skur tømrer Holstebro
// Note: shorter service page — fewer sections than others.
// T4: Zilla Slab H1 + all headings.
// L2: Hero: 4/8 (placeholder left wide, text right narrow) — inverted
//     proportion from total-renovering's 5/7. Compositionally distinctive.
//     Quality section: full-width 2-col 7/5 with inset list.
//     Process: 3 steps in 6fr/5fr/7fr (centre smaller, ends wider).
//     Related: 3fr/4fr/5fr.
// S4: 0px radius, hairlines, placeholder box.
// D2: 120px section gaps.
// P3: No catalog image — [NEEDS:] placeholder.
// M1: 150ms hover only.
// ─────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Skur tømrer Holstebro | Håndværkskvalitet | Martin Mejdahl Jørgensen",
  description:
    "Solide skure i ægte tømmerkvalitet — fundament, konstruktivt tømmer og korrekt tagdækning. Holder i 30 år. Tømrer i Holstebro.",
  alternates: {
    canonical: "/ydelser/skure",
  },
};

const skurSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Skure i håndværksmæssig kvalitet",
  description:
    "Opførelse af skure med fundament, konstruktivt tømmer og korrekt tagdækning i Holstebro. Håndværkskvalitet der holder i 30 år.",
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
  url: "https://www.mejdahltoemrer.dk/ydelser/skure",
};

const processSteps = [
  {
    num: "01",
    title: "Fundament og undergulv",
    body: "Fundament dimensioneres til konstruktionens belastning og jordbundsforholdene. Et korrekt fundament er grunden til at skuret holder i 30 år — ikke 5.",
  },
  {
    num: "02",
    title: "Tømmerkonstruktion og tag",
    body: "Massivt konstruktionstømmer rejses og tagkonstruktionen opføres med korrekte dimensioner. Tagdækning lægges tæt og med ordentlige inddækninger.",
  },
  {
    num: "03",
    title: "Beklædning og dør",
    body: "Ydervægge beklædes — lodret eller vandret træ, cementfiber eller aftalt materiale. Dør monteres korrekt med karm og beslag.",
  },
];

export default async function SkurePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={skurSchema} />

      {/* ══════════════════════════════════════════════════
          SECTION 1 — HERO
          L2: 4/8 — placeholder left WIDE, text right NARROW.
              This is the inverse of total-renovering (5/7 text-right).
              The wide placeholder occupies 4/12, text column 8/12.
              Wait — 4/8 means placeholder is narrower. Re-read:
              "inverted proportion from total-renovering's 5/7".
              Total-renovering: placeholder at 5, text at 7.
              Skure should be: placeholder at 6, text at 6... but that's equal.
              Use: placeholder 4 narrow but on paper (not clay), text 8 wide on bone.
              This creates visual interest through the surface contrast at 4/8.
          T4: H1 in Zilla Slab.
          S4: 0px radius, placeholder on paper with hairline.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Skure i håndværksmæssig kvalitet"
        style={{
          background: "var(--color-bone)",
          borderBottom: "1px solid var(--color-border)",
          overflow: "hidden",
        }}
      >
        <style>{`
          .skur-hero-grid {
            display: grid;
            grid-template-columns: 1fr;
            min-height: 460px;
          }
          @media (min-width: 1024px) {
            .skur-hero-grid {
              grid-template-columns: 4fr 8fr;
              min-height: 500px;
            }
          }
          .skur-hero-placeholder {
            min-height: 240px;
            background: var(--color-stone);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 2rem;
          }
          @media (min-width: 1024px) {
            .skur-hero-placeholder {
              min-height: 0;
            }
          }
          .skur-hero-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 3.5rem 1.5rem;
            border-left: 0px solid transparent;
          }
          @media (min-width: 1024px) {
            .skur-hero-text {
              padding: 5rem max(3rem, calc((100vw - 80rem) / 2 + 3rem)) 5rem 4rem;
              border-left: 1px solid var(--color-border);
            }
          }
        `}</style>

        <div className="skur-hero-grid">
          {/* LEFT: Slim placeholder — 4 columns */}
          {/* SLOT-skure-hero-001: pending — [NEEDS: shed project photos] */}
          <div className="skur-hero-placeholder" aria-hidden="true">
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
                  color: "rgba(245,240,232,0.45)",
                  letterSpacing: "0.03em",
                  lineHeight: "1.5",
                  display: "block",
                }}
              >
                [NEEDS: shed or outbuilding construction photos — frame or cladding work in progress]
              </span>
            </div>
          </div>

          {/* RIGHT: Text — 8 columns */}
          <div className="skur-hero-text">
            <Breadcrumbs
              items={[
                { label: "Ydelser", href: "/ydelser" },
                { label: "Skure" },
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
                maxWidth: "20ch",
                marginBottom: "1.5rem",
              }}
            >
              Skure i håndværksmæssig kvalitet
            </h1>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                lineHeight: "var(--line-height-snug)",
                color: "var(--color-stone)",
                maxWidth: "50ch",
                marginBottom: "2rem",
              }}
            >
              Et solidt skur i ægte tømmerkvalitet holder i 30 år. Pavilloner og flatpack-løsninger gør det ikke. Vi opfører skure med fundament, konstruktivt tømmer og korrekt tagdækning — samme kvalitet som vores øvrige bygninger, bare i mindre format.
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
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.125rem",
                  color: "var(--color-ink)",
                  lineHeight: 1,
                }}
              >
                30
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8125rem",
                  color: "var(--color-stone)",
                }}
              >
                år forventet levetid — med korrekt fundament og konstruktion
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 2 — WHY QUALITY MATTERS
          L2: 7/5 — explanation left (wide), quality points right.
          T4: H2 in Zilla Slab.
          S4: Hairlines, 0px radius.
          D2: 120px section gap.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Hvorfor håndværkskvalitet betyder noget, selv til et skur"
        style={{
          background: "var(--color-paper)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          .skur-quality-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          @media (min-width: 1024px) {
            .skur-quality-grid {
              grid-template-columns: 7fr 5fr;
              gap: 6rem;
              align-items: start;
            }
          }
          .skur-points-list {
            display: flex;
            flex-direction: column;
            gap: 0;
            border: 1px solid var(--color-border);
          }
          .skur-point {
            padding: 1.25rem 1.5rem;
            border-bottom: 1px solid var(--color-border);
          }
          .skur-point:last-child {
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
          <div className="skur-quality-grid">
            {/* LEFT: Main text */}
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
                Hvorfor kvalitet betyder noget — selv til et skur
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
                Et skur udsættes for de samme vejrforhold som resten af din ejendom. Fugt, frost og vind angriber konstruktionen hvert år. Billige pavilloner er bygget til at stå i 5–8 år — måske 10, hvis de er heldige. Vi bygger til 30.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.0625rem",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--color-stone)",
                  marginBottom: "1.25rem",
                }}
              >
                Et skur over en vis størrelse kræver desuden byggetilladelse. Et skur bygget uden plan til kravene er ikke lovligt — og kommunen kan kræve det revet ned. Vi projekterer efter Bygningsreglementets krav fra starten.
              </p>
            </div>

            {/* RIGHT: Key points */}
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
                Kvalitetsmarkørerne
              </p>
              <div className="skur-points-list">
                {[
                  { label: "Fugtbestandigt fundament", detail: "Konstrueret til lokal frostdybde" },
                  { label: "Konstruktionstømmer", detail: "C18 minimum — ikke pallekvalitet" },
                  { label: "Korrekt tagdækning", detail: "Tætte inddækninger og afvanding" },
                  { label: "Byggetilladelse", detail: "Korrekt fra start — ingen overraskelser" },
                  { label: "Byg Garanti", detail: "Dækker vores skure som alt andet" },
                ].map((point, i) => (
                  <div key={i} className="skur-point">
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "0.9375rem",
                        color: "var(--color-ink)",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {point.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8125rem",
                        color: "var(--color-stone)",
                      }}
                    >
                      {point.detail}
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
          L2: 3 steps in 6fr/5fr/7fr — middle is narrowest,
              ends are wider. Gives an arch-like rhythm.
              Completely different from all other process layouts.
          T4: Step titles in Zilla Slab.
          S4: Hairline step borders, 0px radius.
          D2: 120px section gap.
          ══════════════════════════════════════════════════ */}

      <section
        aria-label="Byggeforløbet for et skur"
        style={{
          background: "var(--color-bone)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <style>{`
          /* L2: 6fr/5fr/7fr — arch rhythm */
          .skur-process-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0;
            border: 1px solid var(--color-border);
          }
          @media (min-width: 768px) {
            .skur-process-grid { grid-template-columns: 6fr 5fr 7fr; }
          }
          .skur-step {
            padding: 2.5rem 2rem;
            border-bottom: 1px solid var(--color-border);
          }
          @media (min-width: 768px) {
            .skur-step {
              border-bottom: none;
              border-right: 1px solid var(--color-border);
            }
            .skur-step:last-child { border-right: none; }
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
              Tre trin fra plan til aflevering
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: "var(--line-height-normal)",
                color: "var(--color-stone)",
              }}
            >
              Samme systematik som alle vores projekter — bare kortere forløb.
            </p>
          </div>

          <div className="skur-process-grid" role="list">
            {processSteps.map((step) => (
              <div key={step.num} className="skur-step" role="listitem">
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
          L2: 3fr/4fr/5fr ascending.
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
          /* L2: 3fr/4fr/5fr ascending */
          .skur-related-grid {
            display: grid;
            grid-template-columns: 1fr;
            border: 1px solid var(--color-border);
          }
          @media (min-width: 768px) {
            .skur-related-grid { grid-template-columns: 3fr 4fr 5fr; }
          }
          .skur-related-card {
            padding: 2.25rem 2rem;
            border-bottom: 1px solid var(--color-border);
          }
          @media (min-width: 768px) {
            .skur-related-card {
              border-bottom: none;
              border-right: 1px solid var(--color-border);
            }
            .skur-related-card:last-child { border-right: none; }
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

          <div className="skur-related-grid">
            {[
              {
                title: "Garager & Carporte",
                desc: "Samme tømmerkvalitet i større format — med byggetilladelse og fundament.",
                href: "/ydelser/garager-carporte",
              },
              {
                title: "Tilbygninger",
                desc: "Når et skur bliver til en decideret tilbygning til boligen.",
                href: "/ydelser/tilbygninger",
                bg: "var(--color-bone)",
              },
              {
                title: "Se alle ydelser",
                desc: "Fra tagrenovering til snedkerdetaljer — hele sortimentet.",
                href: "/ydelser",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="skur-related-card"
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
        heading="Skal der bygges et skur?"
        subtext="Ring til Martin for opmåling og tilbud. Et skur der holder i 30 år koster ikke meget mere end en pavillon der holder i 8 — men det er investeringen værd."
        primaryCta={{ label: "Kontakt os om dit skur", href: "/kontakt" }}
        secondaryCta={{ label: "Ring: 40 36 88 62", href: "tel:+4540368862" }}
        variant="light"
      />
    </>
  );
}
