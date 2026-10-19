import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import ConditionalFreeDiscoveryButton from "@/components/layout/ConditionalFreeDiscoveryButton";

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
  metadataBase: new URL("https://example.com"),

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

  robots: {
    index: true,
    follow: true,
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
