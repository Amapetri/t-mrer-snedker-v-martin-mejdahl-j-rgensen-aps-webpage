import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Zilla_Slab, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { ConsentAwareAnalytics } from "@/components/ConsentAwareAnalytics";
import { SITE_URL } from "@/lib/site-config";

// ─────────────────────────────────────────────
// T4 Archival Slab font loading via next/font
// CSS variables wired into globals.css @theme tokens
// ─────────────────────────────────────────────

const zillaSlab = Zilla_Slab({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

// ─────────────────────────────────────────────
// Metadata
// ─────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default:
      "Tømrer & Snedker v/ Martin Mejdahl Jørgensen ApS — Byg Garanti certificeret tømrer i Holstebro",
    template: "%s | Tømrer & Snedker v/ Martin Mejdahl Jørgensen ApS",
  },
  description:
    "Byg Garanti certificeret tømrer & snedker med base i Holstebro. Vi leverer solidt dansk håndværk til private — tagrenovering, tilbygninger, total renovering og fugtskade sanering. Vi arbejder hele landet.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: "Tømrer & Snedker v/ Martin Mejdahl Jørgensen ApS",
    locale: "da_DK",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ─────────────────────────────────────────────
// Structured data — LocalBusiness
// ─────────────────────────────────────────────

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: "Tømrer & Snedker v/ Martin Mejdahl Jørgensen ApS",
  description:
    "Byg Garanti certificeret tømrer & snedker med base i Holstebro. Vi leverer solidt dansk håndværk til private over hele landet.",
  url: SITE_URL,
  telephone: "+4540368862",
  email: "martin@mejdahltoemrer.dk",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Tingagerparken 3",
    addressLocality: "Holstebro",
    addressRegion: "Mejdal/Halgård",
    postalCode: "7500",
    addressCountry: "DK",
  },
  areaServed: {
    "@type": "Country",
    name: "Denmark",
  },
  memberOf: {
    "@type": "Organization",
    name: "Dansk Byggeri",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ─────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`scroll-smooth ${zillaSlab.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={organizationSchema} />
          <Header />
          <main>{children}</main>
          <Footer />
          {/* ConsentAwareAnalytics gates Vercel Analytics behind cookie consent.
              It reads localStorage["cookie-consent"] and only renders <Analytics />
              if analytics === true. Listens for "cookie-consent-updated" events
              to enable analytics dynamically after consent is given. */}
          <ConsentAwareAnalytics />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
