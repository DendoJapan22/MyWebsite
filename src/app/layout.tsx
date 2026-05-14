import type { Metadata } from "next";
import {
  Zen_Old_Mincho,
  Shippori_Mincho_B1,
  Noto_Sans_JP,
  Fraunces,
  DM_Serif_Display,
  Source_Sans_3,
} from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/lib/constants";
import "./globals.css";

const zenOldMincho = Zen_Old_Mincho({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-zen-old-mincho",
  display: "swap",
});

const shipporiMincho = Shippori_Mincho_B1({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-shippori-mincho",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source-sans",
  display: "swap",
});

const SITE_DESCRIPTION =
  "地方の工務店専門のWeb制作。第1期パートナー(先着3社)初期費用半額 39,000円(税抜)、月額運用費 4,980円から。Drasilが運営する「ドラシルデジタル」がご提供します。";

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.description}`,
    template: `%s — ${SITE_CONFIG.name}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    title: `${SITE_CONFIG.name}(${SITE_CONFIG.nameEn})`,
    description: SITE_DESCRIPTION,
    locale: "ja_JP",
    type: "website",
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name}(${SITE_CONFIG.nameEn})`,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${zenOldMincho.variable} ${shipporiMincho.variable} ${notoSansJP.variable} ${fraunces.variable} ${dmSerifDisplay.variable} ${sourceSans.variable}`}
    >
      <body className="min-h-screen flex flex-col paper-grain">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
