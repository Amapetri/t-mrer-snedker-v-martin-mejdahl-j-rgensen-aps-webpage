"use client";

// ─────────────────────────────────────────────
// HoverLink — client component wrapper for hover transitions
// Encapsulates onMouseEnter/onMouseLeave so server pages
// can render interactive links without "use client".
// M1: 150ms ease-out, color only — no scale/shadow.
// ─────────────────────────────────────────────

import { Link } from "@/i18n/routing";

type HoverLinkProps = {
  href: string;
  hoverColor?: string;
  baseColor?: string;
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
};

export function HoverLink({
  href,
  hoverColor = "var(--color-ink)",
  baseColor = "var(--color-stone)",
  style,
  className,
  children,
  "aria-label": ariaLabel,
}: HoverLinkProps) {
  return (
    <Link
      href={href as "/"}
      aria-label={ariaLabel}
      className={className}
      style={{
        ...style,
        transition: `color var(--duration-fast) var(--easing-standard)`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = hoverColor;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = baseColor;
      }}
    >
      {children}
    </Link>
  );
}

// ─────────────────────────────────────────────
// HoverCtaLink — primary CTA amber button link
// C5: amber -> accent-hover on hover, background only
// S4: 0px radius enforced by caller style
// ─────────────────────────────────────────────

type HoverCtaLinkProps = {
  href: string;
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
};

export function HoverCtaLink({
  href,
  style,
  className,
  children,
}: HoverCtaLinkProps) {
  return (
    <Link
      href={href as "/"}
      className={className}
      style={{
        ...style,
        transition: `background var(--duration-fast) var(--easing-standard)`,
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
      {children}
    </Link>
  );
}

// ─────────────────────────────────────────────
// HoverOutlineLink — secondary CTA: ink border -> amber on hover
// S4: 2px structural border, 0px radius
// ─────────────────────────────────────────────

type HoverOutlineLinkProps = {
  href: string;
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
};

export function HoverOutlineLink({
  href,
  style,
  className,
  children,
}: HoverOutlineLinkProps) {
  return (
    <Link
      href={href as "/"}
      className={className}
      style={{
        ...style,
        transition: `border-color var(--duration-fast) var(--easing-standard), color var(--duration-fast) var(--easing-standard)`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "var(--color-accent)";
        (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "var(--color-ink)";
        (e.currentTarget as HTMLElement).style.color = "var(--color-ink)";
      }}
    >
      {children}
    </Link>
  );
}
