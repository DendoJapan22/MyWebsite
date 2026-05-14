import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function CraftBalanceSection() {
  return (
    <section className="relative border-t border-line">
      <div className="mx-auto max-w-[760px] px-6 md:px-10 py-24 md:py-32 flex flex-col items-center text-center">
        <Reveal>
          <p
            className="text-[11px] tracking-[0.32em] uppercase"
            style={{
              fontFamily: "var(--font-en-display)",
              fontStyle: "italic",
              color: "var(--color-stone)",
            }}
          >
            — Our Approach
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            className="display-heading mt-7 md:mt-9 text-ink"
            style={{
              fontFamily: "var(--font-jp-display)",
              fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)",
              lineHeight: 1.6,
              letterSpacing: "0.05em",
            }}
          >
            AIで効率化する部分と、
            <br className="hidden sm:block" />
            人の手で仕上げる部分。
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <span
            aria-hidden
            className="mt-10 md:mt-12 block h-px w-[60px] bg-ink/40"
          />
        </Reveal>

        <Reveal delay={0.22}>
          <p
            className="mt-10 md:mt-12 max-w-[36rem] text-[15px] md:text-[16px] text-ink-soft"
            style={{
              fontFamily: "var(--font-jp-display)",
              lineHeight: 2,
              letterSpacing: "0.04em",
            }}
          >
            コード生成やデザイン補助はAIに任せ、写真の選定、お客様との対話、
            <br className="hidden md:block" />
            最後のひと手間は、必ず人の手で。
            <br className="hidden md:block" />
            そうして、低価格と職人さまのお仕事に見合うサイトを両立しています。
          </p>
        </Reveal>

        <Reveal delay={0.32}>
          <Link
            href="/about"
            className="group mt-10 md:mt-14 inline-flex items-baseline gap-3 text-[13.5px] tracking-[0.18em] text-ink"
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
    </section>
  );
}
