import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealImage } from "@/components/ui/Reveal";

export function AboutTeaserSection() {
  return (
    <section className="relative overflow-x-clip border-t border-line">
      <div className="mx-auto max-w-[1200px] md:px-10 pt-24 md:pt-40 pb-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-16 items-stretch">
          {/* Left: full-bleed image */}
          <div className="md:col-span-6 about-bleed-cell">
            <RevealImage className="relative w-full aspect-[4/3] md:aspect-auto md:h-full about-feather">
              <Image
                src="/images/problem-workshop.webp"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Editorial gray overlay */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundColor: "rgba(60, 60, 60, 0.18)" }}
              />
            </RevealImage>
          </div>

          {/* Right: text + CTA */}
          <div className="md:col-span-6 px-6 md:px-0 md:pl-4 mt-10 md:mt-0 flex flex-col justify-center">
            <Reveal>
              <p className="chapter-num">08 / About</p>
            </Reveal>
            <Reveal delay={0.06}>
              <p
                className="mt-3 text-[12px] tracking-[0.32em] text-stone uppercase"
                style={{
                  fontFamily: "var(--font-en-display)",
                  fontStyle: "italic",
                }}
              >
                A word from the founder
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <h2 className="display-heading mt-7 text-[clamp(1.9rem,4vw,3rem)] text-ink leading-[1.4]">
                ごあいさつ。
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-7 max-w-[34rem] text-[14.5px] md:text-[15.5px] leading-[2.2] text-ink-soft">
                東北から、神奈川県西部へ。
                <br />
                この地で工務店のWebに向き合う、
                <br />
                ひとりの代表からのご挨拶です。
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <div className="mt-10 md:mt-14">
                <Link
                  href="/about"
                  className="group inline-flex items-baseline gap-3 text-[13px] tracking-[0.18em] text-ink"
                >
                  <span className="relative inline-block">
                    代表挨拶を読む
                    <span
                      aria-hidden
                      className="absolute left-0 -bottom-1 h-px w-0 bg-accent transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                    />
                  </span>
                  <span
                    aria-hidden
                    className="text-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[4px]"
                  >
                    →
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
