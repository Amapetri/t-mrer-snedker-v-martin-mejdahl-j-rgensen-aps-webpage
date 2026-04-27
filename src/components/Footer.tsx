import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

// ─────────────────────────────────────────────
// Footer — L2 asymmetric 3-column layout
// Dark surface (--color-surface-dark), bone text
// S4: 0px radius, 1px hairline borders
// C5: amber trust signals for Byg Garanti only
// ─────────────────────────────────────────────

type ServiceKey =
  | "tag_renovering"
  | "total_renovering"
  | "vinduer_doere"
  | "isolering_lofter"
  | "tilbygninger"
  | "garager_carporte"
  | "skure"
  | "fugtskade_sanering";

type FooterKey =
  | "about"
  | "cases"
  | "contact";

const SERVICE_LINKS: { key: ServiceKey; href: string }[] = [
  { key: "tag_renovering", href: "/ydelser/tagrenovering" },
  { key: "total_renovering", href: "/ydelser/total-renovering" },
  { key: "vinduer_doere", href: "/ydelser/vinduer-doere" },
  { key: "isolering_lofter", href: "/ydelser/isolering-lofter" },
  { key: "tilbygninger", href: "/ydelser/tilbygninger" },
  { key: "garager_carporte", href: "/ydelser/garager-carporte" },
  { key: "skure", href: "/ydelser/skure" },
  { key: "fugtskade_sanering", href: "/ydelser/fugtskade-sanering" },
];

const COMPANY_LINKS: { key: FooterKey; href: string }[] = [
  { key: "about", href: "/om-os" },
  { key: "cases", href: "/projekter" },
  { key: "contact", href: "/kontakt" },
];

const columnLabelStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontWeight: 600,
  fontSize: "0.6875rem",
  letterSpacing: "var(--letter-spacing-wide)",
  textTransform: "uppercase",
  color: "var(--color-stone)",
  marginBottom: "1.25rem",
  display: "block",
};

const footerLinkStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "0.875rem",
  color: "var(--color-clay)",
  textDecoration: "none",
  display: "block",
  lineHeight: "var(--line-height-normal)",
  transition: `color var(--duration-fast) var(--easing-standard)`,
};

export function Footer() {
  const t = useTranslations("footer");
  const ts = useTranslations("services");

  return (
    <footer
      style={{
        background: "var(--color-surface-dark)",
        borderTop: "1px solid rgba(245,240,232,0.1)",
      }}
      aria-label="Sidefod"
    >
      {/* ── Main footer grid ── */}
      <div
        className="mx-auto"
        style={{
          maxWidth: "var(--container-max)",
          padding: `5rem var(--container-pad-desktop) 3.5rem`,
        }}
      >
        {/* L2 asymmetric grid: 5fr / 3fr / 4fr — NOT equal thirds */}
        <style>{`
          @media (min-width: 768px) {
            .footer-grid {
              grid-template-columns: 5fr 3fr 4fr !important;
              gap: 4rem !important;
            }
          }
        `}</style>
        <div className="footer-grid grid gap-12" style={{ gridTemplateColumns: "1fr" }}>

            {/* ── Column 1 (wide): Brand + Trust signals ── */}
            <div>
              {/* Logotype */}
              <div className="mb-6">
                <span
                  className="block font-bold leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.375rem",
                    color: "var(--color-bone)",
                    letterSpacing: "var(--letter-spacing-tight)",
                    lineHeight: "var(--line-height-tight)",
                  }}
                >
                  Martin Mejdahl
                </span>
                <span
                  className="block text-[0.65rem] font-semibold uppercase mt-1"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-stone)",
                    letterSpacing: "var(--letter-spacing-wide)",
                  }}
                >
                  Tømrer &amp; Snedker
                </span>
              </div>

              {/* Description */}
              <p
                className="mb-8"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  color: "var(--color-clay)",
                  lineHeight: "var(--line-height-normal)",
                  maxWidth: "34ch",
                }}
              >
                {t("description")}
              </p>

              {/* Byg Garanti trust signal — amber, C5 trust color */}
              <div
                className="mb-5"
                style={{
                  borderTop: "1px solid var(--color-trust)",
                  paddingTop: "1rem",
                  maxWidth: "26ch",
                }}
              >
                <span
                  className="block font-semibold mb-1"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    color: "var(--color-trust)",
                    letterSpacing: "var(--letter-spacing-wide)",
                    textTransform: "uppercase",
                  }}
                >
                  {t("byg_garanti_label")}
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8125rem",
                    color: "var(--color-stone)",
                    lineHeight: "var(--line-height-normal)",
                  }}
                >
                  {t("byg_garanti_desc")}
                </p>
              </div>

              {/* Dansk Byggeri */}
              <div
                className="mb-4"
                style={{
                  borderTop: "1px solid rgba(245,240,232,0.08)",
                  paddingTop: "0.875rem",
                  maxWidth: "26ch",
                }}
              >
                <span
                  className="block text-xs font-semibold uppercase"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-stone)",
                    letterSpacing: "var(--letter-spacing-wide)",
                  }}
                >
                  {t("dansk_byggeri_label")}
                </span>
              </div>

              {/* Nationwide */}
              <div
                style={{
                  borderTop: "1px solid rgba(245,240,232,0.08)",
                  paddingTop: "0.875rem",
                  maxWidth: "26ch",
                }}
              >
                <span
                  className="block text-xs font-semibold uppercase mb-0.5"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-stone)",
                    letterSpacing: "var(--letter-spacing-wide)",
                  }}
                >
                  {t("nationwide_label")}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8125rem",
                    color: "var(--color-stone)",
                  }}
                >
                  {t("nationwide_desc")}
                </span>
              </div>
            </div>

            {/* ── Column 2 (narrow): Ydelser ── */}
            <div>
              <span style={columnLabelStyle}>{t("services_heading")}</span>
              <ul className="space-y-2.5">
                {SERVICE_LINKS.map((service) => (
                  <li key={service.key}>
                    <Link
                      href={service.href as "/"}
                      style={footerLinkStyle}
                      className="hover:[color:var(--color-bone)] focus-visible:outline-none focus-visible:[color:var(--color-bone)]"
                    >
                      {ts(service.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Column 3 (medium-wide): Company + Contact ── */}
            <div>
              {/* Company nav */}
              <div className="mb-10">
                <span style={columnLabelStyle}>{t("company_heading")}</span>
                <ul className="space-y-2.5">
                  {COMPANY_LINKS.map((link) => (
                    <li key={link.key}>
                      <Link
                        href={link.href as "/"}
                        style={footerLinkStyle}
                        className="hover:[color:var(--color-bone)] focus-visible:outline-none focus-visible:[color:var(--color-bone)]"
                      >
                        {t(link.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact details */}
              <div
                style={{
                  borderTop: "1px solid rgba(245,240,232,0.08)",
                  paddingTop: "1.5rem",
                }}
              >
                <span style={columnLabelStyle}>{t("contact_heading")}</span>
                <address
                  className="not-italic space-y-3"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    color: "var(--color-clay)",
                    lineHeight: "var(--line-height-normal)",
                  }}
                >
                  {/* Address */}
                  <div>
                    <span
                      className="block text-[0.625rem] font-semibold uppercase mb-0.5"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--color-stone)",
                        letterSpacing: "var(--letter-spacing-wide)",
                      }}
                    >
                      {t("address_label")}
                    </span>
                    <span className="block">{t("address_line1")}</span>
                    <span className="block">{t("address_line2")}</span>
                    <span className="block">{t("address_line3")}</span>
                  </div>

                  {/* Phone */}
                  <div>
                    <span
                      className="block text-[0.625rem] font-semibold uppercase mb-0.5"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--color-stone)",
                        letterSpacing: "var(--letter-spacing-wide)",
                      }}
                    >
                      {t("phone_label")}
                    </span>
                    <a
                      href="tel:+4540368862"
                      style={{
                        ...footerLinkStyle,
                        display: "inline",
                      }}
                      className="hover:[color:var(--color-bone)] focus-visible:outline-none"
                    >
                      {t("phone")}
                    </a>
                  </div>

                  {/* Email */}
                  <div>
                    <span
                      className="block text-[0.625rem] font-semibold uppercase mb-0.5"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--color-stone)",
                        letterSpacing: "var(--letter-spacing-wide)",
                      }}
                    >
                      {t("email_label")}
                    </span>
                    <a
                      href="mailto:martin@mejdahltoemrer.dk"
                      style={{
                        ...footerLinkStyle,
                        display: "inline",
                      }}
                      className="hover:[color:var(--color-bone)] focus-visible:outline-none"
                    >
                      {t("email")}
                    </a>
                  </div>

                  {/* CVR — mono for verification signal */}
                  <div>
                    <span
                      className="block text-[0.625rem] font-semibold uppercase mb-0.5"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--color-stone)",
                        letterSpacing: "var(--letter-spacing-wide)",
                      }}
                    >
                      {t("cvr_label")}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.875rem",
                        color: "var(--color-clay)",
                      }}
                    >
                      {t("cvr_number")}
                    </span>
                  </div>
                </address>
              </div>
            </div>
          </div>
      </div>

      {/* ── Sub-footer ── */}
      <div
        style={{
          borderTop: "1px solid rgba(245,240,232,0.08)",
        }}
      >
        <div
          className="mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          style={{
            maxWidth: "var(--container-max)",
            padding: `1.25rem var(--container-pad-desktop)`,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "var(--color-stone)",
            }}
          >
            &copy; {new Date().getFullYear()} Tømrer &amp; Snedker v/ Martin
            Mejdahl Jørgensen ApS. {t("copyright")}
          </p>
          <nav aria-label="Juridiske links" className="flex items-center gap-5">
            <Link
              href="/privatlivspolitik"
              className="focus-visible:outline-none"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                color: "var(--color-stone)",
                textDecoration: "none",
                transition: `color var(--duration-fast) var(--easing-standard)`,
              }}
            >
              {t("privacy")}
            </Link>
            <Link
              href="/cookies"
              className="focus-visible:outline-none"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                color: "var(--color-stone)",
                textDecoration: "none",
                transition: `color var(--duration-fast) var(--easing-standard)`,
              }}
            >
              {t("cookies")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
