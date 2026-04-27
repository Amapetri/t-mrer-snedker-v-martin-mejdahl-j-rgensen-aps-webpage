"use client";

// ─────────────────────────────────────────────
// CtaBlock — Reusable conversion section
// S4: 0px radius everywhere
// C5: amber for primary CTA only
// D2: generous section spacing
// T4: Zilla Slab heading, IBM Plex Sans body
// Works on both light (bone) and dark (ink) surfaces
// ─────────────────────────────────────────────

import { Link } from "@/i18n/routing";

type CtaItem = {
  label: string;
  href: string;
};

type CtaBlockProps = {
  heading: string;
  subtext: string;
  primaryCta: CtaItem;
  secondaryCta?: CtaItem;
  variant?: "light" | "dark";
};

export function CtaBlock({
  heading,
  subtext,
  primaryCta,
  secondaryCta,
  variant = "light",
}: CtaBlockProps) {
  const isDark = variant === "dark";

  return (
    <section
      aria-label={heading}
      style={{
        background: isDark ? "var(--color-surface-dark)" : "var(--color-surface-card)",
        borderTop: `1px solid ${isDark ? "rgba(245,240,232,0.1)" : "var(--color-border)"}`,
        borderBottom: `1px solid ${isDark ? "rgba(245,240,232,0.1)" : "var(--color-border)"}`,
        padding: `var(--section-gap) 0`,
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: "var(--container-max)",
          padding: `0 var(--container-pad-desktop)`,
        }}
      >
        {/* L2: asymmetric — heading at 7/12 columns, buttons left-aligned */}
        <div className="grid"
          style={{ gridTemplateColumns: "1fr" }}>
          <style>{`
            @media (min-width: 1024px) {
              .cta-block-inner {
                grid-template-columns: 7fr 5fr !important;
                align-items: end !important;
                gap: 4rem !important;
              }
            }
          `}</style>
          <div className="cta-block-inner grid gap-8" style={{ gridTemplateColumns: "1fr" }}>

            {/* Text column */}
            <div>
              {/* Hairline rule above heading — S4 structural signal */}
              <div
                style={{
                  width: "3rem",
                  height: "1px",
                  background: isDark ? "rgba(245,240,232,0.2)" : "var(--color-border)",
                  marginBottom: "1.5rem",
                }}
                aria-hidden="true"
              />

              <h2
                className="mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--font-weight-display)",
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: isDark ? "var(--color-bone)" : "var(--color-ink)",
                }}
              >
                {heading}
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.0625rem",
                  lineHeight: "var(--line-height-normal)",
                  color: isDark ? "var(--color-clay)" : "var(--color-stone)",
                  maxWidth: "52ch",
                }}
              >
                {subtext}
              </p>
            </div>

            {/* CTA column — bottom-aligned on desktop */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:items-end">
              {/* Primary CTA — amber, C5 accent */}
              <Link
                href={primaryCta.href as "/"}
                className="inline-block focus-visible:outline-none"
                style={{
                  background: "var(--color-accent)",
                  color: "#fff",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.8125rem",
                  letterSpacing: "var(--letter-spacing-wide)",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  padding: "1rem 2rem",
                  borderRadius: 0,
                  display: "inline-block",
                  transition: `background var(--duration-fast) var(--easing-standard)`,
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "var(--color-accent-hover)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "var(--color-accent)";
                }}
              >
                {primaryCta.label}
              </Link>

              {/* Secondary CTA — ink/bone outline, no amber */}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href as "/"}
                  className="inline-block focus-visible:outline-none"
                  style={{
                    background: "transparent",
                    color: isDark ? "var(--color-bone)" : "var(--color-ink)",
                    border: `2px solid ${isDark ? "rgba(245,240,232,0.3)" : "var(--color-ink)"}`,
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.8125rem",
                    letterSpacing: "var(--letter-spacing-wide)",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    padding: "1rem 2rem",
                    borderRadius: 0,
                    display: "inline-block",
                    transition: `border-color var(--duration-fast) var(--easing-standard), color var(--duration-fast) var(--easing-standard)`,
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--color-accent)";
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = isDark
                      ? "rgba(245,240,232,0.3)"
                      : "var(--color-ink)";
                    (e.currentTarget as HTMLElement).style.color = isDark
                      ? "var(--color-bone)"
                      : "var(--color-ink)";
                  }}
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
