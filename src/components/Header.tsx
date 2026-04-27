"use client";

import { useState, useEffect, useRef, useCallback, startTransition } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";

// ─────────────────────────────────────────────
// Types
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

type ServiceItem = {
  key: ServiceKey;
  href: string;
};

const SERVICES: ServiceItem[] = [
  { key: "tag_renovering", href: "/ydelser/tagrenovering" },
  { key: "total_renovering", href: "/ydelser/total-renovering" },
  { key: "vinduer_doere", href: "/ydelser/vinduer-doere" },
  { key: "isolering_lofter", href: "/ydelser/isolering-lofter" },
  { key: "tilbygninger", href: "/ydelser/tilbygninger" },
  { key: "garager_carporte", href: "/ydelser/garager-carporte" },
  { key: "skure", href: "/ydelser/skure" },
  { key: "fugtskade_sanering", href: "/ydelser/fugtskade-sanering" },
];

// ─────────────────────────────────────────────
// Logotype — Zilla Slab wordmark, no image
// ─────────────────────────────────────────────

function Logotype() {
  const t = useTranslations("header");
  return (
    <Link
      href="/"
      aria-label={t("logotype_aria")}
      className="group flex flex-col leading-none"
    >
      <span
        className="font-bold text-[1.1rem] tracking-tight"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--color-ink)",
          letterSpacing: "var(--letter-spacing-tight)",
          lineHeight: "var(--line-height-tight)",
          transition: `color var(--duration-fast) var(--easing-standard)`,
        }}
      >
        Martin Mejdahl
      </span>
      <span
        className="text-[0.65rem] font-semibold uppercase tracking-widest"
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--color-stone)",
          letterSpacing: "var(--letter-spacing-wide)",
          lineHeight: 1.2,
        }}
      >
        Tømrer &amp; Snedker
      </span>
    </Link>
  );
}

// ─────────────────────────────────────────────
// Desktop Services Dropdown
// ─────────────────────────────────────────────

function ServicesDropdown({
  isOpen,
  dropdownRef,
  onClose,
}: {
  isOpen: boolean;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
}) {
  const t = useTranslations("services");

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      role="list"
      aria-label="Ydelser oversigt"
      className="absolute top-full left-0 z-50 min-w-[220px]"
      style={{
        background: "var(--color-paper)",
        border: "1px solid var(--color-border)",
        borderTop: "2px solid var(--color-ink)",
        marginTop: 0,
      }}
    >
      {SERVICES.map((service, i) => (
        <Link
          key={service.key}
          href={service.href as "/"}
          role="listitem"
          onClick={onClose}
          className="block px-5 py-3 text-sm font-semibold uppercase tracking-widest transition-colors"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-ink)",
            letterSpacing: "var(--letter-spacing-wide)",
            borderBottom:
              i < SERVICES.length - 1
                ? "1px solid var(--color-border)"
                : "none",
            transition: `background var(--duration-fast) var(--easing-standard), color var(--duration-fast) var(--easing-standard)`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              "var(--color-bone)";
            (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "var(--color-ink)";
          }}
          onFocus={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              "var(--color-bone)";
            (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
            /* Outline handled by global CSS :focus-visible rule — no inline override */
          }}
          onBlur={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "var(--color-ink)";
            /* Do NOT set outline:none — global CSS :focus-visible handles focus ring */
          }}
        >
          {t(service.key)}
        </Link>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Mobile Navigation Overlay
// ─────────────────────────────────────────────

function MobileNav({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("header");
  const ts = useTranslations("services");
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const firstFocusableRef = useRef<HTMLAnchorElement>(null);

  // Focus trap and close on Escape
  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="navigation"
      aria-label={t("open_menu")}
      className="fixed inset-0 z-[100] flex flex-col"
      style={{
        background: "var(--color-ink)",
        opacity: isOpen ? 1 : 0,
        transition: `opacity var(--duration-normal) var(--easing-standard)`,
      }}
    >
      {/* Header bar inside overlay */}
      <div
        className="flex items-center justify-between px-6 py-5"
        style={{ borderBottom: "1px solid rgba(245,240,232,0.12)" }}
      >
        <Logotype />
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label={t("close_menu")}
          className="p-2"
          style={{
            color: "var(--color-bone)",
            transition: `color var(--duration-fast) var(--easing-standard)`,
          }}
        >
          {/* X icon — hairline style */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="Mobil navigation">
        <ul className="space-y-0">
          {/* Services — expandable */}
          <li style={{ borderBottom: "1px solid rgba(245,240,232,0.12)" }}>
            <button
              onClick={() => setServicesExpanded((v) => !v)}
              aria-expanded={servicesExpanded}
              aria-controls="mobile-services-list"
              className="flex w-full items-center justify-between py-5 text-left"
              style={{ color: "var(--color-bone)" }}
            >
              <span
                className="text-2xl font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "var(--letter-spacing-tight)",
                }}
              >
                {t("services")}
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                style={{
                  transform: servicesExpanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: `transform var(--duration-fast) var(--easing-standard)`,
                }}
              >
                <path d="M5 8l5 5 5-5" />
              </svg>
            </button>
            {servicesExpanded && (
              <ul
                id="mobile-services-list"
                className="pb-4 pl-4 space-y-3"
              >
                {SERVICES.map((service) => (
                  <li key={service.key}>
                    <Link
                      href={service.href as "/"}
                      onClick={onClose}
                      className="block py-1 text-sm font-semibold uppercase tracking-widest"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--color-clay)",
                        letterSpacing: "var(--letter-spacing-wide)",
                        transition: `color var(--duration-fast) var(--easing-standard)`,
                      }}
                    >
                      {ts(service.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Cases */}
          <li style={{ borderBottom: "1px solid rgba(245,240,232,0.12)" }}>
            <Link
              href="/projekter"
              onClick={onClose}
              ref={firstFocusableRef}
              className="block py-5 text-2xl font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-bone)",
                letterSpacing: "var(--letter-spacing-tight)",
                transition: `color var(--duration-fast) var(--easing-standard)`,
              }}
            >
              {t("cases")}
            </Link>
          </li>

          {/* Om os */}
          <li style={{ borderBottom: "1px solid rgba(245,240,232,0.12)" }}>
            <Link
              href="/om-os"
              onClick={onClose}
              className="block py-5 text-2xl font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-bone)",
                letterSpacing: "var(--letter-spacing-tight)",
              }}
            >
              {t("about")}
            </Link>
          </li>

          {/* Kontakt */}
          <li style={{ borderBottom: "1px solid rgba(245,240,232,0.12)" }}>
            <Link
              href="/kontakt"
              onClick={onClose}
              className="block py-5 text-2xl font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-bone)",
                letterSpacing: "var(--letter-spacing-tight)",
              }}
            >
              {t("contact")}
            </Link>
          </li>
        </ul>

        {/* CTA */}
        <div className="mt-10">
          <Link
            href="/kontakt"
            onClick={onClose}
            className="inline-block w-full px-8 py-4 text-center text-sm font-semibold uppercase tracking-widest"
            style={{
              background: "var(--color-accent)",
              color: "#fff",
              fontFamily: "var(--font-body)",
              letterSpacing: "var(--letter-spacing-wide)",
              borderRadius: 0,
              transition: `background var(--duration-fast) var(--easing-standard)`,
            }}
          >
            {t("cta")}
          </Link>
        </div>
      </nav>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Header
// ─────────────────────────────────────────────

export function Header() {
  const t = useTranslations("header");
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const servicesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll detection for hairline border
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    startTransition(() => {
      setServicesOpen(false);
      setMobileOpen(false);
    });
  }, [pathname]);

  // Close dropdown on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && servicesOpen) {
        setServicesOpen(false);
        servicesButtonRef.current?.focus();
      }
    },
    [servicesOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!servicesOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        servicesContainerRef.current &&
        !servicesContainerRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [servicesOpen]);

  function isActive(path: string) {
    return pathname === path || pathname.startsWith(path + "/");
  }

  const navLinkStyle = (active: boolean) => ({
    fontFamily: "var(--font-body)",
    fontWeight: "600",
    fontSize: "0.8125rem",
    color: active ? "var(--color-accent)" : "var(--color-ink)",
    letterSpacing: "var(--letter-spacing-wide)",
    textTransform: "uppercase" as const,
    textDecoration: "none",
    transition: `color var(--duration-fast) var(--easing-standard)`,
    borderBottom: active
      ? "1px solid var(--color-accent)"
      : "1px solid transparent",
    paddingBottom: "2px",
  });

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "var(--color-bone)",
          borderBottom: scrolled
            ? "1px solid var(--color-border)"
            : "1px solid transparent",
          transition: `border-color var(--duration-fast) var(--easing-standard)`,
        }}
      >
        <div
          className="mx-auto flex items-center justify-between"
          style={{
            maxWidth: "var(--container-max)",
            padding: "1.25rem var(--container-pad-desktop)",
          }}
        >
          {/* Logotype */}
          <Logotype />

          {/* Desktop nav */}
          <nav
            aria-label="Primær navigation"
            className="hidden lg:flex items-center gap-8"
          >
            {/* Ydelser with dropdown */}
            <div ref={servicesContainerRef} className="relative">
              <button
                ref={servicesButtonRef}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                aria-controls="services-dropdown"
                onClick={() => setServicesOpen((v) => !v)}
                className="flex items-center gap-1.5"
                style={navLinkStyle(isActive("/ydelser"))}
              >
                {t("services")}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                  style={{
                    transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: `transform var(--duration-fast) var(--easing-standard)`,
                  }}
                >
                  <path d="M2 4l4 4 4-4" />
                </svg>
              </button>
              <div id="services-dropdown">
                <ServicesDropdown
                  isOpen={servicesOpen}
                  dropdownRef={dropdownRef}
                  onClose={() => setServicesOpen(false)}
                />
              </div>
            </div>

            {/* Projekter */}
            <Link
              href="/projekter"
              style={navLinkStyle(isActive("/projekter"))}
              className=""
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = isActive(
                  "/projekter"
                )
                  ? "var(--color-accent)"
                  : "var(--color-ink)";
              }}
            >
              {t("cases")}
            </Link>

            {/* Om os */}
            <Link
              href="/om-os"
              style={navLinkStyle(isActive("/om-os"))}
              className=""
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = isActive("/om-os")
                  ? "var(--color-accent)"
                  : "var(--color-ink)";
              }}
            >
              {t("about")}
            </Link>

            {/* Kontakt */}
            <Link
              href="/kontakt"
              style={navLinkStyle(isActive("/kontakt"))}
              className=""
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = isActive(
                  "/kontakt"
                )
                  ? "var(--color-accent)"
                  : "var(--color-ink)";
              }}
            >
              {t("contact")}
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link
              href="/kontakt"
              className="inline-block px-6 py-3 text-[0.8125rem] font-semibold uppercase tracking-widest"
              style={{
                background: "var(--color-accent)",
                color: "#fff",
                fontFamily: "var(--font-body)",
                letterSpacing: "var(--letter-spacing-wide)",
                borderRadius: 0,
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
              {t("cta")}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={t("open_menu")}
            onClick={() => setMobileOpen(true)}
            style={{ color: "var(--color-ink)" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <div id="mobile-nav">
        <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      </div>

      {/* Spacer so content isn't hidden behind fixed header */}
      <div style={{ height: "72px" }} aria-hidden="true" />
    </>
  );
}
