import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { Bridge } from "@/components/sections/Bridge";
import { CraftBalanceSection } from "@/components/sections/CraftBalanceSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { NumbersSection } from "@/components/sections/NumbersSection";
import { PriceSection } from "@/components/sections/PriceSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { WorksTeaserSection } from "@/components/sections/WorksTeaserSection";
import { AboutLetter } from "@/components/sections/AboutLetter";
import { DrasilOriginSection } from "@/components/sections/DrasilOriginSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { BusinessInfoSection } from "@/components/sections/BusinessInfoSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FAQ_ITEMS, SITE_CONFIG } from "@/lib/constants";

const HOME_TITLE =
  "工務店専門のホームページ制作・MEO初期構築 | 初期費用33,000円・月額3,980円";
const HOME_DESCRIPTION =
  "地方の工務店向けWebサイト制作・Googleビジネスプロフィール初期構築(MEO対策)。初期費用33,000円(税抜)、月額運用費3,980円から。AI効率化と人の手仕上げで、集客につながるホームページを。";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
    locale: "ja_JP",
    type: "website",
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "ja-JP",
  about: {
    "@type": "Service",
    name: "工務店向けWebサイト制作・MEO初期構築",
    provider: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  },
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HeroSection />
      <ProblemSection />
      <Bridge quote="サイトは、社長の代わりに 24時間、語ってくれる存在です。" />
      <CraftBalanceSection />
      <ServicesSection />
      <NumbersSection />
      <PriceSection />
      <Bridge
        quote={
          <>
            価格はシンプルでいい。
            <br />
            約束は、それより大切に。
          </>
        }
      />
      <ProcessSection />
      <WorksTeaserSection />
      <Bridge quote="会社の物語を、 次の世代へ手渡すために。" />

      <div id="about" className="scroll-mt-24">
        <AboutLetter />
        <DrasilOriginSection />
      </div>

      <div id="faq" className="scroll-mt-24">
        <FaqSection chapterNum="08 / FAQ" />
      </div>

      <BusinessInfoSection />

      <div id="contact" className="scroll-mt-24">
        <ContactSection />
      </div>
    </>
  );
}
