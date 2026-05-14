"use client";

import type { ReactNode } from "react";
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
    <section className="relative border-t border-line">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-32 md:py-40 min-h-[50vh] flex flex-col items-center justify-center text-center">
        <motion.span
          aria-hidden
          className="block h-px w-[60px] bg-ink/40 mb-12 md:mb-16"
          initial={{ opacity: 0, y: ruleOffset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: QUIET_EASE }}
        />
        <motion.p
          className="text-ink"
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
