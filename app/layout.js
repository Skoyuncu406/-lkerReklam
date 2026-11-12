import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";

import ConditionalFreeDiscoveryButton from "@/components/layout/ConditionalFreeDiscoveryButton";

const SITE_URL = "https://www.ulkertabelareklam.com.tr";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Ülker Tabela Reklam | İstanbul",
    template: "%s | Ülker Tabela Reklam",
  },

  description:
    "Ülker Tabela Reklam, İstanbul Küçükçekmece'de profesyonel tabela, reklam, tasarım, üretim ve uygulama çözümleri sunar.",

  keywords: [
    "Ülker Tabela Reklam",
    "İstanbul tabela",
    "Küçükçekmece tabela",
    "reklam tabelası",
    "ışıklı tabela",
    "reklam uygulamaları",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: "Ülker Tabela Reklam",
    title: "Ülker Tabela Reklam | İstanbul",
    description:
      "İstanbul Küçükçekmece'de profesyonel tabela, reklam, tasarım, üretim ve uygulama çözümleri.",
  },

  twitter: {
    card: "summary",
    title: "Ülker Tabela Reklam | İstanbul",
    description:
      "Profesyonel tabela, reklam, tasarım, üretim ve uygulama çözümleri.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        {children}
        <ConditionalFreeDiscoveryButton />
      </body>
    </html>
  );
}
