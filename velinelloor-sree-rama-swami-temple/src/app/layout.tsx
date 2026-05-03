import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Inter,
  Noto_Sans_Malayalam,
} from "next/font/google";
import "./globals.css";
import GoldenDustLoader from "@/components/GoldenDustLoader";
import RiverProgressLoader from "@/components/RiverProgressLoader";

/* ─── Fonts via next/font ──────────────────────────────────────────
   display: "swap"   → prevents FOIT (Flash of Invisible Text)
   fallback           → reserves correct glyph widths during load (CLS fix)
   adjustFontFallback → Next.js auto-generates size-adjust CSS (CLS fix)
   ──────────────────────────────────────────────────────────────── */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
  adjustFontFallback: true,
});

const notoMalayalam = Noto_Sans_Malayalam({
  subsets: ["malayalam"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ml",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
});

/* ─── SEO Metadata ─────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Velinelloor Sree Rama Swami Temple",
  description:
    "Official website of Velinelloor Sree Rama Swami Temple — a sacred sanctuary of devotion, culture, and timeless grace.",
  keywords: [
    "Velinelloor Temple",
    "Sree Rama",
    "Kerala Temple",
    "Ulsavam",
    "Hindu Temple",
  ],
  openGraph: {
    title: "Velinelloor Sree Rama Swami Temple",
    description: "A sacred sanctuary of devotion, culture, and timeless grace.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${notoMalayalam.variable}`}
    >
      <body className="min-h-screen antialiased">
        <GoldenDustLoader />
        <RiverProgressLoader />
        {children}
      </body>
    </html>
  );
}
