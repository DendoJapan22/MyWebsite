import Link from "next/link";
import { LEGAL_LINKS, NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative mt-32 md:mt-40 text-paper"
      style={{ backgroundColor: "var(--color-accent-deep)" }}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 pt-20 md:pt-24 pb-12 md:pb-16">
        {/* Hero copy — featured */}
        <div
          className="flex flex-col items-center text-center py-10 md:py-14 mb-12 md:mb-16"
          style={{
            borderTop: "1px solid rgba(216, 229, 220, 0.35)",
            borderBottom: "1px solid rgba(216, 229, 220, 0.35)",
          }}
        >
          <p
            className="text-[26px] md:text-[34px] leading-[1.5] font-medium jp-phrase"
            style={{
              fontFamily: "var(--font-jp-body)",
              letterSpacing: "0.06em",
              color: "var(--color-paper)",
            }}
          >
            地方の工務店専門のWeb制作。
          </p>
          <p
            className="mt-4 text-[14px] tracking-[0.2em] uppercase"
            style={{
              fontFamily: "var(--font-en-display)",
              fontStyle: "italic",
              color: "var(--color-accent-tint)",
              opacity: 0.85,
            }}
          >
            Refined web for local craftsmen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand — bilingual stacked */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-flex flex-col leading-tight"
              aria-label={`${SITE_CONFIG.name} ${SITE_CONFIG.nameEn}`}
            >
              <span
                className="text-[22px] tracking-[0.1em] text-paper font-medium"
                style={{ fontFamily: "var(--font-jp-body)" }}
              >
                {SITE_CONFIG.name}
              </span>
              <span
                className="mt-1 text-[12px] tracking-[0.22em] uppercase"
                style={{
                  fontFamily: "var(--font-en-display)",
                  fontStyle: "italic",
                  color: "var(--color-accent-tint)",
                }}
              >
                {SITE_CONFIG.nameEn}
              </span>
            </Link>
            <p className="mt-7 text-[14px] leading-[2] text-paper/75 max-w-sm">
              「{SITE_CONFIG.name}」は{SITE_CONFIG.parentName}が運営する、
              <br />
              地方工務店向けのWeb制作サービスです。
            </p>
            <Link
              href="/about"
              className="group mt-6 inline-flex items-baseline gap-2 text-[13.5px] tracking-[0.14em] text-paper/85 hover:text-paper transition-colors"
            >
              <span>{SITE_CONFIG.parentName}について</span>
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <p
              className="text-[11px] tracking-[0.28em] uppercase mb-5"
              style={{
                fontFamily: "var(--font-en-display)",
                fontStyle: "italic",
                color: "var(--color-accent-tint)",
              }}
            >
              — navigation
            </p>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[14px] tracking-[0.06em] text-paper/80 hover:text-paper link-underline transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Legal — quiet sub-block */}
            <p
              className="text-[11px] tracking-[0.28em] uppercase mt-10 mb-4 opacity-80"
              style={{
                fontFamily: "var(--font-en-display)",
                fontStyle: "italic",
                color: "var(--color-accent-tint)",
              }}
            >
              — legal
            </p>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[13px] tracking-[0.04em] text-paper/65 hover:text-paper transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <p
              className="text-[11px] tracking-[0.28em] uppercase mb-5"
              style={{
                fontFamily: "var(--font-en-display)",
                fontStyle: "italic",
                color: "var(--color-accent-tint)",
              }}
            >
              — contact
            </p>
            <dl className="space-y-4 text-[14px] text-paper/80">
              <div className="flex gap-4">
                <dt className="shrink-0 w-14 text-paper/55 tracking-[0.12em]">電話</dt>
                <dd>
                  <a
                    href={`tel:${SITE_CONFIG.phoneTel}`}
                    className="link-underline hover:text-paper transition-colors"
                  >
                    {SITE_CONFIG.phone}
                  </a>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="shrink-0 w-14 text-paper/55 tracking-[0.12em]">メール</dt>
                <dd>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="link-underline hover:text-paper transition-colors break-all"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="shrink-0 w-14 text-paper/55 tracking-[0.12em]">対応</dt>
                <dd>{SITE_CONFIG.area}</dd>
              </div>
            </dl>
          </div>
        </div>

        <hr
          className="mt-16"
          style={{
            border: 0,
            borderTop: "1px solid rgba(248, 245, 240, 0.14)",
          }}
        />

        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[12px] text-paper/55 tracking-[0.08em]">
          <p>
            © {year} {SITE_CONFIG.parentName}. All rights reserved.
          </p>
          <div className="md:text-right">
            <p
              className="tracking-[0.18em] uppercase"
              style={{
                fontFamily: "var(--font-en-display)",
                fontStyle: "italic",
              }}
            >
              {SITE_CONFIG.parentName} — quiet support, like the world tree.
            </p>
            <p
              className="mt-1.5 text-[11px] tracking-[0.18em] text-paper/35"
              style={{ fontFamily: "var(--font-jp-body)" }}
            >
              世界樹のように、静かに支える。
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
