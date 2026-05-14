"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";

export const QUIET_EASE = [0.16, 1, 0.3, 1] as const;

export type RevealKind = "chapter" | "heading" | "body" | "image" | "cta";

const DURATIONS: Record<RevealKind, number> = {
  chapter: 0.6,
  heading: 0.8,
  body: 0.6,
  image: 1.0,
  cta: 0.6,
};

type RevealAs =
  | "div"
  | "section"
  | "li"
  | "article"
  | "header"
  | "ul"
  | "ol"
  | "span"
  | "p"
  | "figure";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: RevealAs;
  once?: boolean;
  kind?: RevealKind;
  amount?: number;
  duration?: number;
};

export function Reveal({
  children,
  delay = 0,
  y = 12,
  className,
  as = "div",
  once = true,
  kind = "body",
  amount = 0.2,
  duration,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const [done, setDone] = useState(false);
  const Component = motion[as];

  const baseDuration = duration ?? DURATIONS[kind];
  const t = reduceMotion ? 0.001 : baseDuration;
  const offset = reduceMotion ? 0 : y;

  return (
    <Component
      className={className}
      style={{ willChange: done ? undefined : "opacity, transform" }}
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration: t,
        delay: reduceMotion ? 0 : delay,
        ease: QUIET_EASE,
      }}
      onAnimationComplete={() => setDone(true)}
    >
      {children}
    </Component>
  );
}

type RevealImageProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  blur?: number;
  duration?: number;
};

export function RevealImage({
  children,
  delay = 0,
  y = 12,
  className,
  once = true,
  amount = 0.2,
  blur = 8,
  duration = 1.0,
}: RevealImageProps) {
  const reduceMotion = useReducedMotion();
  const [done, setDone] = useState(false);

  const t = reduceMotion ? 0.001 : duration;
  const offset = reduceMotion ? 0 : y;
  const blurFrom = reduceMotion ? "blur(0px)" : `blur(${blur}px)`;

  return (
    <motion.div
      className={className}
      style={{
        willChange: done ? undefined : "opacity, transform, filter",
      }}
      initial={{ opacity: 0, y: offset, filter: blurFrom }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{
        duration: t,
        delay: reduceMotion ? 0 : delay,
        ease: QUIET_EASE,
      }}
      onAnimationComplete={() => setDone(true)}
    >
      {children}
    </motion.div>
  );
}

type RevealStaggerProps = {
  children: ReactNode;
  className?: string;
  as?: RevealAs;
  amount?: number;
  once?: boolean;
  staggerChildren?: number;
  delayChildren?: number;
};

export function RevealStagger({
  children,
  className,
  as = "div",
  amount = 0.2,
  once = true,
  staggerChildren = 0.08,
  delayChildren = 0,
}: RevealStaggerProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial="initial"
      whileInView="animate"
      viewport={{ once, amount }}
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: reduceMotion ? 0 : staggerChildren,
            delayChildren: reduceMotion ? 0 : delayChildren,
          },
        },
      }}
    >
      {children}
    </Component>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  as?: RevealAs;
  y?: number;
  kind?: RevealKind;
  duration?: number;
};

export function RevealItem({
  children,
  className,
  as = "div",
  y = 12,
  kind = "body",
  duration,
}: RevealItemProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  const baseDuration = duration ?? DURATIONS[kind];
  const t = reduceMotion ? 0.001 : baseDuration;
  const offset = reduceMotion ? 0 : y;

  return (
    <Component
      className={className}
      variants={{
        initial: { opacity: 0, y: offset },
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration: t, ease: QUIET_EASE },
        },
      }}
    >
      {children}
    </Component>
  );
}
