import Link from "next/link";
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
import { Reveal } from "@/components/ui/Reveal";

export default function HomePage() {
  return (
    <>
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

        {/* Bridge to the long-form essay on /about */}
        <section className="relative border-t border-line">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-16 md:py-24">
            <div className="flex flex-col items-center text-center">
              <Reveal>
                <p
                  className="text-[11.5px] tracking-[0.32em] uppercase"
                  style={{
                    fontFamily: "var(--font-en-display)",
                    fontStyle: "italic",
                    color: "var(--color-stone)",
                  }}
                >
                  — A longer letter
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <p
                  className="mt-5 text-[15px] md:text-[16px] leading-[2] text-ink-soft max-w-[34rem]"
                  style={{ fontFamily: "var(--font-jp-body)" }}
                >
                  なぜこの事業を立ち上げたのか、5年後に何を目指しているのか。
                  すこし長くなりますが、お時間のあるときに読んでいただけたら幸いです。
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <Link
                  href="/about"
                  className="group mt-8 inline-flex items-baseline gap-3 text-[14px] tracking-[0.18em] text-ink"
                >
                  <span className="link-underline">代表の手記を読む(全文)</span>
                  <span
                    aria-hidden
                    className="text-accent transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
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
