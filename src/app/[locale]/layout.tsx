import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site-config";

// TODO: Import fonts chosen by the web-designer agent
// import { Font_Name } from "next/font/google";
// const fontVariable = Font_Name({ variable: "--font-display-family", ... });

// TODO: Replace with real company metadata
export const metadata: Metadata = {
  title: {
    default: "Tømrer & Snedker v/ Martin Mejdahl Jørgensen ApS — {{TAGLINE}}",
    template: "%s | Tømrer & Snedker v/ Martin Mejdahl Jørgensen ApS",
  },
  description: "Tømrer & Snedker v/ Martin Mejdahl Jørgensen ApS er en tømrervirksomhed med beliggenhed i Holstebro. Vi har mange års erfaring i byggebranchen, som er din sikkerhed for kvalitet og et godt håndværk. Vi arbejder hele landet.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: "Tømrer & Snedker v/ Martin Mejdahl Jørgensen ApS",
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

// TODO: Replace with real company structured data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: "Tømrer & Snedker v/ Martin Mejdahl Jørgensen ApS",
  description: "Tømrer & Snedker v/ Martin Mejdahl Jørgensen ApS er en tømrervirksomhed med beliggenhed i Holstebro. Vi har mange års erfaring i byggebranchen, som er din sikkerhed for kvalitet og et godt håndværk. Vi arbejder hele landet.",
  url: SITE_URL,
  // foundingDate: "{{YEAR}}",
  // address: { ... },
  // telephone: "...",
  // email: "...",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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
    <html lang={locale} className="scroll-smooth">
      {/* TODO: Add font CSS variable classes to body once fonts are chosen */}
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={organizationSchema} />
          {/* TODO: Add <Header /> and <Footer /> components once designed */}
          <main>{children}</main>
        </NextIntlClientProvider>
        {/* TODO: Wrap in consent-aware component — analytics must be gated behind cookie consent (see legal-compliance skill) */}
        <Analytics />
      </body>
    </html>
  );
}
