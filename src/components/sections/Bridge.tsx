"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const QUIET_EASE = [0.16, 1, 0.3, 1] as const;

type BridgeProps = {
  quote: ReactNode;
  signature?: string;
};

export function Bridge({ quote, signature = "ドラシルデジタル" }: BridgeProps) {
  const reduceMotion = useReducedMotion();
  const offset = reduceMotion ? 0 : 20;
  const ruleOffset = reduceMotion ? 0 : 12;

  return (
    <section className="relative border-t border-line overflow-hidden">
      {/* Ink-wash divider band that bleeds down from the top edge */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-0 pointer-events-none h-[60px] md:h-[80px]"
      >
        <Image
          src="/images/divider-ink-opt.webp"
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover object-top"
          style={{
            opacity: 0.42,
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 py-32 md:py-40 min-h-[50vh] flex flex-col items-center justify-center text-center">
        <motion.span
          aria-hidden
          className="block h-px w-[60px] bg-ink/40 mb-12 md:mb-16"
          initial={{ opacity: 0, y: ruleOffset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: QUIET_EASE }}
        />
        <motion.p
          className="text-ink jp-phrase"
          style={{
            fontFamily: "var(--font-jp-display)",
            fontSize: "clamp(1.4rem, 2.6vw, 2rem)",
            lineHeight: 2.0,
            letterSpacing: "0.05em",
            maxWidth: "720px",
          }}
          initial={{ opacity: 0, y: offset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: QUIET_EASE }}
        >
          「{quote}」

        </motion.p>
        <motion.p
          className="mt-10 md:mt-14 flex items-center gap-3 text-[12.5px] tracking-[0.18em] text-stone"
          style={{ fontFamily: "var(--font-jp-display)" }}
          initial={{ opacity: 0, y: offset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, delay: 0.18, ease: QUIET_EASE }}
        >
          <span aria-hidden className="block h-px w-6 bg-stone/60" />
          <span>{signature}</span>
        </motion.p>
      </div>
    </section>
  );
}
