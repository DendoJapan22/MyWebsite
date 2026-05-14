"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { BrandMark } from "@/components/ui/BrandMark";
import { SITE_CONFIG } from "@/lib/constants";

const ease = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.11, delayChildren: 0.14 },
  },
};

const item: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
  },
};

const headline: Variants = {
  initial: { opacity: 0, y: 22 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease },
  },
};

const numeral: Variants = {
  initial: { opacity: 0, y: 28, letterSpacing: "0.06em" },
  animate: {
    opacity: 1,
    y: 0,
    letterSpacing: "-0.02em",
    transition: { duration: 1.35, delay: 0.45, ease },
  },
};

const scrollHint: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.8, delay: 1.7, ease },
  },
};

const bgSettle: Variants = {
  initial: { opacity: 0, scale: 1.06 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 2.2, ease },
  },
};

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? "animate" : "initial";

  return (
    <section
      className="relative overflow-hidden min-h-screen washi-noise"
      style={{ backgroundColor: "var(--color-paper)" }}
    >
      {/* Layer 1 — washi paper photograph, very low opacity */}
      <motion.div
        aria-hidden
        variants={bgSettle}
        initial={initial}
        animate="animate"
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <Image
          src="/images/hero-washi.webp"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
          style={{ opacity: 0.32, mixBlendMode: "multiply" }}
        />
      </motion.div>

      {/* Layer 2 — workshop photograph hugging the far-right edge only, fully desaturated */}
      <motion.div
        aria-hidden
        variants={bgSettle}
        initial={initial}
        animate="animate"
        className="absolute inset-y-0 right-0 z-0 pointer-events-none hidden lg:block"
        style={{ width: "26%" }}
      >
        <Image
          src="/images/problem-workshop.webp"
          alt=""
          fill
          sizes="26vw"
          className="object-cover"
          style={{
            opacity: 0.14,
            filter: "grayscale(1) contrast(0.85) brightness(1.02)",
            maskImage:
              "linear-gradient(to right, transparent 0%, transparent 15%, rgba(0,0,0,0.7) 65%, rgba(0,0,0,0.3) 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, transparent 15%, rgba(0,0,0,0.7) 65%, rgba(0,0,0,0.3) 100%)",
          }}
        />
      </motion.div>

      {/* Layer 3 — paper warmth wash that neutralises any colour cast */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(248,245,240,0.94) 0%, rgba(248,245,240,0.86) 28%, rgba(248,245,240,0.84) 55%, rgba(248,245,240,0.92) 82%, rgba(248,245,240,1) 100%)",
        }}
      />

      {/* Layer 4 — vertical wood-grain hairlines */}
      <div
        aria-hidden
        className="wood-grain absolute inset-0 z-10 pointer-events-none"
      />

      {/* Top + bottom hairlines bracketing the hero */}
      <span
        aria-hidden
        className="absolute top-[80px] left-0 right-0 h-px z-10 hidden md:block"
        style={{ backgroundColor: "var(--color-wood)", opacity: 0.25 }}
      />

      <div className="relative z-20 mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="relative min-h-[100svh] md:min-h-screen pt-28 md:pt-32 pb-20 md:pb-28 flex flex-col justify-center">
          <motion.div
            variants={container}
            initial={initial}
            animate="animate"
            className="flex flex-col"
          >
            {/* Establishment line — quiet brand statement, not a repeat of the headline */}
            <motion.div
              variants={item}
              className="inline-flex items-center gap-3 md:gap-4 mb-10 md:mb-14"
            >
              <span
                className="shrink-0"
                style={{ color: "var(--color-wood-deep)" }}
              >
                <BrandMark
                  className="size-[24px] md:size-[28px]"
                  ariaLabel={`${SITE_CONFIG.parentName} brand mark`}
                />
              </span>
              <span
                aria-hidden
                className="block h-[16px] md:h-[18px] w-px"
                style={{ backgroundColor: "var(--color-wood)", opacity: 0.45 }}
              />
              <span
                className="text-[10.5px] md:text-[11.5px] tracking-[0.32em] uppercase"
                style={{
                  fontFamily: "var(--font-en-display)",
                  fontStyle: "italic",
                  color: "var(--color-wood-deep)",
                  letterSpacing: "0.32em",
                }}
              >
                Est. 2026 — A craft web studio
              </span>
            </motion.div>

            {/* Main grid: headline on left, giant numeral on right */}
            <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-8 lg:gap-x-12 items-start">
              {/* Left column — headline + lede */}
              <div className="md:col-span-7 lg:col-span-7">
                {/* Small specialty rule — quiet positioning above the headline */}
                <motion.div
                  variants={item}
                  className="inline-flex items-center gap-3 mb-6 md:mb-8"
                >
                  <span
                    aria-hidden
                    className="block h-px w-8"
                    style={{ backgroundColor: "var(--color-wood)" }}
                  />
                  <span
                    className="text-[11.5px] md:text-[12.5px] tracking-[0.3em]"
                    style={{
                      fontFamily: "var(--font-jp-body)",
                      color: "var(--color-wood-deep)",
                      fontWeight: 600,
                      letterSpacing: "0.3em",
                    }}
                  >
                    地方の工務店専門
                  </span>
                </motion.div>

                <h1
                  className="text-ink"
                  style={{
                    fontFamily: "var(--font-jp-display)",
                    fontSize: "clamp(2.2rem, 5.4vw, 4.6rem)",
                    lineHeight: 1.2,
                    letterSpacing: "0.02em",
                    fontWeight: 600,
                  }}
                >
                  <motion.span
                    variants={headline}
                    className="block whitespace-nowrap"
                  >
                    集客につながる
                  </motion.span>
                  <motion.span
                    variants={headline}
                    className="block mt-1 md:mt-2 whitespace-nowrap"
                    style={{ color: "var(--color-accent)" }}
                  >
                    ホームページを。
                  </motion.span>
                </h1>

                <motion.p
                  variants={item}
                  className="mt-10 md:mt-12 max-w-[34rem]"
                  style={{
                    fontFamily: "var(--font-jp-body)",
                    fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)",
                    lineHeight: 2,
                    letterSpacing: "0.04em",
                    color: "var(--color-ink-soft)",
                    fontWeight: 500,
                  }}
                >
                  紹介や口コミでは届かない方にも、
                  <br className="hidden sm:block" />
                  ひとつひとつ、丁寧にお作りいたします。
                </motion.p>
              </div>

              {/* Right column — stacked Initial + Monthly pricing */}
              <div className="md:col-span-5 lg:col-span-5 mt-14 md:mt-0 md:pt-2 relative">
                {/* Decorative bracket above the price */}
                <motion.div
                  variants={item}
                  className="flex items-center gap-3 mb-5 md:mb-7"
                >
                  <span
                    aria-hidden
                    className="block h-px w-8"
                    style={{ backgroundColor: "var(--color-brass)" }}
                  />
                  <span
                    className="text-[11.5px] md:text-[12.5px] tracking-[0.28em] uppercase"
                    style={{
                      fontFamily: "var(--font-en-display)",
                      fontStyle: "italic",
                      color: "var(--color-brass)",
                    }}
                  >
                    Price
                  </span>
                </motion.div>

                {/* Initial fee — the visual HERO: bold half-price callout */}
                <motion.div variants={numeral} className="mb-8 md:mb-10">
                  {/* Limited-3 badge: brass-bordered tag */}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 mb-5"
                    style={{
                      border: "1px solid var(--color-brass)",
                      backgroundColor: "rgba(184, 134, 11, 0.07)",
                      borderRadius: "2px",
                    }}
                  >
                    <span
                      aria-hidden
                      className="block size-[5px] rounded-full"
                      style={{ backgroundColor: "var(--color-brass)" }}
                    />
                    <span
                      className="text-[10px] md:text-[10.5px] tracking-[0.26em] uppercase"
                      style={{
                        fontFamily: "var(--font-en-display)",
                        fontStyle: "italic",
                        color: "var(--color-wood-deep)",
                        fontWeight: 600,
                      }}
                    >
                      先着 3 社さま 限定 / Half price
                    </span>
                  </div>

                  <p
                    className="text-[12px] md:text-[13px] tracking-[0.2em] mb-3"
                    style={{
                      fontFamily: "var(--font-jp-body)",
                      color: "var(--color-stone)",
                      fontWeight: 500,
                    }}
                  >
                    初期費用
                  </p>

                  {/* Strikethrough original price — small, supporting */}
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <span
                      aria-hidden
                      className="line-through decoration-[1.5px] leading-none"
                      style={{
                        fontFamily: "var(--font-en-numeral)",
                        color: "var(--color-stone)",
                        fontSize: "clamp(1.4rem, 2.4vw, 2.1rem)",
                        textDecorationColor: "var(--color-wood)",
                        textDecorationThickness: "1.5px",
                      }}
                    >
                      ¥78,000
                    </span>
                    <span
                      className="text-[10.5px] tracking-[0.2em] uppercase"
                      style={{
                        fontFamily: "var(--font-en-display)",
                        fontStyle: "italic",
                        color: "var(--color-stone)",
                      }}
                    >
                      → half
                    </span>
                  </div>

                  {/* GIANT discounted price — the visual hero */}
                  <div className="flex items-start gap-2 md:gap-3">
                    <span
                      aria-hidden
                      className="leading-none mt-[0.5em]"
                      style={{
                        fontFamily: "var(--font-en-numeral)",
                        color: "var(--color-wood)",
                        fontSize: "clamp(2.6rem, 5.4vw, 4.4rem)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      ¥
                    </span>
                    <span
                      className="leading-[0.85] block"
                      style={{
                        fontFamily: "var(--font-en-numeral)",
                        color: "var(--color-ink)",
                        fontSize: "clamp(4.8rem, 12vw, 9.5rem)",
                        letterSpacing: "-0.04em",
                        fontWeight: 400,
                      }}
                    >
                      39,000
                    </span>
                  </div>

                  <p
                    className="mt-4 text-[12.5px] md:text-[13px] tracking-[0.05em]"
                    style={{
                      fontFamily: "var(--font-jp-body)",
                      color: "var(--color-stone)",
                      lineHeight: 1.75,
                    }}
                  >
                    税抜 / 税込 ¥42,900(通常 ¥78,000 のところ半額)
                  </p>
                </motion.div>

                {/* Divider — hairline */}
                <motion.span
                  variants={item}
                  aria-hidden
                  className="block h-px w-full mb-7 md:mb-8"
                  style={{
                    backgroundColor: "var(--color-wood)",
                    opacity: 0.25,
                  }}
                />

                {/* Monthly fee — supporting role, smaller scale */}
                <motion.div variants={item} className="relative">
                  <p
                    className="text-[11.5px] md:text-[12px] tracking-[0.2em] mb-2"
                    style={{
                      fontFamily: "var(--font-jp-body)",
                      color: "var(--color-stone)",
                      fontWeight: 500,
                    }}
                  >
                    月額運用費
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span
                      aria-hidden
                      className="leading-none"
                      style={{
                        fontFamily: "var(--font-en-numeral)",
                        color: "var(--color-wood)",
                        fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)",
                      }}
                    >
                      ¥
                    </span>
                    <span
                      className="leading-none"
                      style={{
                        fontFamily: "var(--font-en-numeral)",
                        color: "var(--color-ink-soft)",
                        fontSize: "clamp(2.4rem, 4.6vw, 4rem)",
                        letterSpacing: "-0.02em",
                        fontWeight: 400,
                      }}
                    >
                      4,980
                    </span>
                    <span
                      className="ml-1 text-[12.5px] tracking-[0.06em]"
                      style={{
                        fontFamily: "var(--font-jp-body)",
                        color: "var(--color-stone)",
                      }}
                    >
                      / 月(税抜)
                    </span>
                  </div>
                  <p
                    className="mt-2 text-[12px] md:text-[12.5px] tracking-[0.05em]"
                    style={{
                      fontFamily: "var(--font-jp-body)",
                      color: "var(--color-stone)",
                      lineHeight: 1.75,
                    }}
                  >
                    税込 ¥5,478 / サーバー・更新・MEO運用 すべて込み
                  </p>
                </motion.div>

                {/* Decorative dots — small craft accent */}
                <motion.div
                  variants={item}
                  className="absolute -top-3 right-0 hidden md:flex gap-1.5"
                  aria-hidden
                >
                  <span
                    className="block size-[5px] rounded-full"
                    style={{ backgroundColor: "var(--color-brass)" }}
                  />
                  <span
                    className="block size-[5px] rounded-full"
                    style={{
                      backgroundColor: "var(--color-brass)",
                      opacity: 0.5,
                    }}
                  />
                  <span
                    className="block size-[5px] rounded-full"
                    style={{
                      backgroundColor: "var(--color-brass)",
                      opacity: 0.25,
                    }}
                  />
                </motion.div>
              </div>
            </div>

            {/* CTAs — wood primary, outlined wood secondary */}
            <motion.div
              variants={item}
              className="mt-14 md:mt-20 flex flex-col sm:flex-row gap-3 sm:gap-4 md:max-w-[42rem]"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-9 py-5 min-h-[56px] text-[15px] md:text-[16px] tracking-[0.16em] font-medium transition-[transform,box-shadow,background-color] duration-200 active:translate-y-[1px]"
                style={{
                  backgroundColor: "var(--color-wood)",
                  color: "var(--color-paper)",
                  borderRadius: "4px",
                  boxShadow: "0 1px 0 rgba(77, 48, 24, 0.4)",
                  fontFamily: "var(--font-jp-body)",
                }}
              >
                <span>お問い合わせ</span>
                <span
                  aria-hidden
                  className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Link
                href="/#service"
                className="group inline-flex items-center justify-center px-9 py-5 min-h-[56px] text-[15px] md:text-[16px] tracking-[0.16em] font-medium transition-[transform,background-color,color] duration-200 active:translate-y-[1px]"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--color-wood-deep)",
                  border: "1.5px solid var(--color-wood)",
                  borderRadius: "4px",
                  fontFamily: "var(--font-jp-body)",
                }}
              >
                <span>サービスを見る</span>
              </Link>
            </motion.div>

            {/* Reassurance line */}
            <motion.p
              variants={item}
              className="mt-10 md:mt-14 text-[13px] md:text-[13.5px] tracking-[0.08em] max-w-[40rem]"
              style={{
                color: "var(--color-stone)",
                fontFamily: "var(--font-jp-body)",
                lineHeight: 1.95,
              }}
            >
              ご相談は無料です。お電話・オンライン、ご都合に合わせて承ります。
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          aria-hidden
          variants={scrollHint}
          initial={initial}
          animate="animate"
          className="hero-scroll-hint hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
          style={{
            fontFamily: "var(--font-en-display)",
            fontStyle: "italic",
            color: "var(--color-wood)",
          }}
        >
          <span className="text-[14px] leading-none">↓</span>
          <span className="text-[10.5px] tracking-[0.32em] uppercase">
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}
