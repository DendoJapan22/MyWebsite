"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "bg-paper/92 backdrop-blur-sm border-b border-line"
          : "bg-transparent border-b border-transparent",
      )}
      style={{
        backgroundColor:
          scrolled || open ? "rgba(248, 245, 240, 0.94)" : "transparent",
        borderBottomColor: scrolled || open ? "var(--color-line)" : "transparent",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="inline-flex items-center gap-3"
            onClick={() => setOpen(false)}
            aria-label={`${SITE_CONFIG.name} ${SITE_CONFIG.nameEn}`}
          >
            <Image
              src="/images/drasil-logo-full-opt.webp"
              alt=""
              width={400}
              height={237}
              loading="eager"
              className="h-10 w-auto md:h-12"
            />
            <span className="flex flex-col leading-tight">
              <span
                className="text-[17px] md:text-[19px] tracking-[0.08em] text-ink"
                style={{
                  fontFamily: "var(--font-jp-display)",
                  fontWeight: 600,
                }}
              >
                {SITE_CONFIG.name}
              </span>
              <span
                className="mt-0.5 text-[9.5px] md:text-[10.5px] tracking-[0.28em] uppercase"
                style={{
                  fontFamily: "var(--font-en-display)",
                  fontStyle: "italic",
                  color: "var(--color-accent)",
                }}
              >
                {SITE_CONFIG.nameEn}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-9">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-[13px] tracking-[0.16em] text-ink-soft hover:text-ink transition-colors"
                style={{ fontFamily: "var(--font-jp-body)" }}
              >
                <span>{item.label}</span>
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-[width] duration-300 group-hover:w-full"
                />
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center size-11 min-w-[44px] min-h-[44px] -mr-2 text-ink"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-[max-height,opacity] duration-500",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
        style={{
          backgroundColor: "rgba(248, 245, 240, 0.98)",
        }}
      >
        <nav className="px-6 pt-6 pb-12 flex flex-col gap-1">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline justify-between border-b border-line py-5"
            >
              <span
                className="text-[20px] tracking-[0.08em] text-ink"
                style={{ fontFamily: "var(--font-jp-display)" }}
              >
                {item.label}
              </span>
              <span
                className="chapter-num"
                style={{ color: "var(--color-stone)" }}
              >
                {String(i + 1).padStart(2, "0")} / {item.labelEn}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
