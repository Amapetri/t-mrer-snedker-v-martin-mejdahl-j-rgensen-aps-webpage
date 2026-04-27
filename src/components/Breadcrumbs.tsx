"use client";

// ─────────────────────────────────────────────
// Breadcrumbs — S4 / T4 / C5 design system
// IBM Plex Sans caps, stone color, hairline /
// separator. Keeps BreadcrumbList schema markup.
// All labels via next-intl — no hardcoded strings.
// ─────────────────────────────────────────────

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { JsonLd } from "./JsonLd";

type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const t = useTranslations("breadcrumbs");

  const allCrumbs: Crumb[] = [{ label: t("home"), href: "/" }, ...items];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allCrumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: crumb.href } : {}),
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <nav
        aria-label="Brødkrumme-navigation"
        style={{
          padding: "0.875rem 0",
        }}
      >
        <ol
          className="flex items-center flex-wrap gap-0"
          style={{ listStyle: "none", margin: 0, padding: 0 }}
        >
          {allCrumbs.map((crumb, i) => {
            const isLast = i === allCrumbs.length - 1;
            return (
              <li
                key={i}
                className="flex items-center"
                style={{ lineHeight: 1 }}
              >
                {/* Separator — hairline /,  aria-hidden */}
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.6875rem",
                      color: "var(--color-border)",
                      padding: "0 0.5rem",
                      userSelect: "none",
                    }}
                  >
                    /
                  </span>
                )}

                {/* Active / current crumb — no link */}
                {isLast ? (
                  <span
                    aria-current="page"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "0.6875rem",
                      color: "var(--color-ink)",
                      letterSpacing: "var(--letter-spacing-wide)",
                      textTransform: "uppercase",
                    }}
                  >
                    {crumb.label}
                  </span>
                ) : crumb.href ? (
                  <Link
                    href={crumb.href as "/"}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "0.6875rem",
                      color: "var(--color-stone)",
                      letterSpacing: "var(--letter-spacing-wide)",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      transition: `color var(--duration-fast) var(--easing-standard)`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "var(--color-ink)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "var(--color-stone)";
                    }}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "0.6875rem",
                      color: "var(--color-stone)",
                      letterSpacing: "var(--letter-spacing-wide)",
                      textTransform: "uppercase",
                    }}
                  >
                    {crumb.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
