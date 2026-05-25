import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { AboutEssay } from "@/components/sections/AboutEssay";
import { BrandMark } from "@/components/ui/BrandMark";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "代表の手記",
  description:
    "ドラシルデジタル代表の長文の手記。なぜこの事業を立ち上げたのか、AIをどう活用するのか、5年後に何を目指しているのか。",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="— A longer letter"
        title="代表の手記。"
        lead={
          <>
            <span
              className="block text-[12px] tracking-[0.28em] text-stone uppercase mb-5"
              style={{
                fontFamily: "var(--font-en-display)",
                fontStyle: "italic",
              }}
            >
              The full story
            </span>
            紹介や口コミだけでは、これからの世代の施主さまには届きにくくなっています。
            ドラシルデジタルが、何を考え、どんな方法で、地方の工務店さまのWebをお作りしているか。
            すこし長くなりますが、お時間のあるときに読んでいただけたら幸いです。
          </>
        }
      />

      <AboutEssay />

      {/* Closing CTA strip */}
      <section className="relative border-t border-line">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-12 items-end">
            <div className="md:col-span-7">
              <Reveal>
                <p
                  className="text-[11px] tracking-[0.32em] text-stone uppercase"
                  style={{
                    fontFamily: "var(--font-en-display)",
                    fontStyle: "italic",
                  }}
                >
                  Next — Get in touch
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2
                  className="display-heading mt-5 text-[clamp(1.6rem,3vw,2.4rem)] text-ink"
                  style={{ letterSpacing: "0.04em", lineHeight: 1.5 }}
                >
                  まずは、
                  <br className="hidden sm:block" />
                  お話を聞かせてください。
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-6 max-w-[36rem] text-[14px] md:text-[14.5px] leading-[2.05] text-ink-soft">
                  60分のヒアリングは無料です。お電話・オンラインのいずれもご都合に合わせてお伺いします。
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-5 md:text-right mt-8 md:mt-0">
              <Reveal delay={0.22}>
                <Link
                  href="/#contact"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-accent text-paper text-[14px] tracking-[0.18em] hover:bg-[var(--color-accent-deep)] transition-colors"
                  style={{ borderRadius: "4px" }}
                >
                  <span>お問い合わせ</span>
                  <span
                    aria-hidden
                    className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Signature — quiet author's mark */}
      <section className="relative border-t border-line">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 pt-32 md:pt-[240px] pb-32 md:pb-[200px]">
          <div className="flex flex-col items-center text-center">
            <Reveal kind="chapter">
              <p
                className="text-[14px] tracking-[0.15em]"
                style={{
                  fontFamily: "var(--font-en-display)",
                  fontStyle: "italic",
                  color: "var(--color-accent)",
                  opacity: 0.7,
                }}
              >
                — Signature
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-16 md:mt-20 flex flex-col items-center gap-5">
                <span
                  aria-hidden
                  style={{ color: "var(--color-wood-deep)" }}
                >
                  <BrandMark className="size-[64px] md:size-[80px]" />
                </span>
                <div className="text-center mt-2 leading-tight">
                  <span
                    className="block text-[24px] md:text-[28px] tracking-[0.1em] text-ink font-medium"
                    style={{ fontFamily: "var(--font-jp-display)" }}
                  >
                    ドラシルデジタル
                  </span>
                  <span
                    className="mt-2 block text-[12px] md:text-[12.5px] tracking-[0.3em] uppercase"
                    style={{
                      fontFamily: "var(--font-en-display)",
                      fontStyle: "italic",
                      color: "var(--color-wood)",
                    }}
                  >
                    Drasil Digital
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.42}>
              <p
                className="mt-12 md:mt-14 text-[16px] text-stone"
                style={{
                  fontFamily: "var(--font-en-display)",
                  fontStyle: "italic",
                }}
              >
                — with care from a small craft studio.
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <span
                aria-hidden
                className="mt-28 md:mt-36 block h-px w-[160px] bg-line"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
