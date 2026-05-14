import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function ContactSection() {
  return (
    <Section
      spacing="large"
      className="border-t border-line"
      innerClassName="min-h-[80vh] flex flex-col justify-center pb-24 md:pb-32"
    >
      <div className="flex flex-col items-center text-center">
        <Reveal>
          <p className="chapter-num">10 / Contact</p>
        </Reveal>

        <Reveal delay={0.1}>
          <span
            aria-hidden
            className="mt-10 md:mt-14 block h-px w-[60px] bg-ink/40"
          />
        </Reveal>

        <Reveal delay={0.16}>
          <h2
            className="display-heading mt-12 md:mt-14 text-ink"
            style={{
              fontFamily: "var(--font-jp-display)",
              fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
              lineHeight: 1.55,
              letterSpacing: "0.04em",
            }}
          >
            紹介から、検索へ。
            <br />
            あなたの工務店を、
            <br className="sm:hidden" />
            もっと多くの方に。
          </h2>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mt-10 md:mt-14 max-w-[34rem] text-[15px] md:text-[16.5px] leading-[2.05] text-ink-soft">
            地方の工務店さま、
            <br className="hidden sm:block" />
            お気軽にお問い合わせください。
          </p>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-12 md:mt-14 flex flex-col sm:flex-row items-stretch justify-center gap-3 sm:gap-5 w-full sm:w-auto">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center px-8 py-4 bg-accent text-paper text-[14px] tracking-[0.18em] hover:bg-[var(--color-accent-deep)] transition-colors"
              style={{ borderRadius: "4px" }}
            >
              <span>お問い合わせフォーム</span>
              <span
                aria-hidden
                className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>

            <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              className="group inline-flex items-center justify-center px-8 py-4 border border-ink text-ink text-[14px] tracking-[0.18em] hover:bg-ink hover:text-paper transition-colors"
              style={{ borderRadius: "4px" }}
            >
              <span className="mr-3 text-stone group-hover:text-paper/80 transition-colors">
                ☏
              </span>
              <span>お電話する {SITE_CONFIG.phone}</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="mt-10 md:mt-12 text-[12.5px] tracking-[0.06em] text-stone/80">
            平日 10:00 — 18:00 受付 / 1〜2営業日以内に返信
          </p>
        </Reveal>

        <Reveal delay={0.48}>
          <span
            aria-hidden
            className="mt-14 md:mt-20 block h-px w-[60px] bg-ink/40"
          />
        </Reveal>

        <Reveal delay={0.54}>
          <p
            className="mt-10 md:mt-12 text-[11px] tracking-[0.32em] text-stone uppercase"
            style={{
              fontFamily: "var(--font-en-display)",
              fontStyle: "italic",
            }}
          >
            {SITE_CONFIG.nameEn} — For local craftsmen, nationwide
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
