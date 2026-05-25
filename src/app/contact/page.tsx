import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "ドラシルデジタルへのお問い合わせ。お電話・メール・フォームのいずれもご利用いただけます。1〜2営業日以内にご返信いたします。",
  alternates: { canonical: "/contact" },
};

const DIRECT_LINES = [
  {
    en: "Phone",
    label: "お電話",
    value: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phoneTel}`,
    note: "平日 10:00 — 18:00 受付",
  },
  {
    en: "Email",
    label: "メール",
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
    note: "24時間受付・1〜2営業日以内に返信",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="09 / Contact"
        title="お問い合わせ。"
        lead={
          <>
            <span
              className="block text-[12px] tracking-[0.28em] text-stone uppercase mb-5"
              style={{
                fontFamily: "var(--font-en-display)",
                fontStyle: "italic",
              }}
            >
              A letter from you
            </span>
            ご相談・お見積もり依頼など、お気軽にお問い合わせください。
            通常、1〜2営業日以内にご返信いたします。
          </>
        }
      />

      {/* Form */}
      <section className="relative border-t border-line">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-12 mb-12 md:mb-16">
            <div className="md:col-span-5">
              <Reveal>
                <p
                  className="text-[11px] tracking-[0.32em] text-stone uppercase"
                  style={{
                    fontFamily: "var(--font-en-display)",
                    fontStyle: "italic",
                  }}
                >
                  Form
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-heading mt-6 text-[clamp(1.5rem,3vw,2.2rem)] text-ink leading-[1.5]">
                  お問い合わせフォーム
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-7 md:pt-2 mt-6 md:mt-0">
              <Reveal delay={0.14}>
                <p className="text-[14.5px] md:text-[15px] leading-[2.05] text-ink-soft max-w-[36rem]">
                  必須項目をご入力のうえ、ご送信ください。
                  内容は確認後、安全に当方へ届きます。
                  ご相談内容はできる範囲で結構です。
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.18}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Direct contact methods */}
      <section className="relative border-t border-line">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-12 mb-12 md:mb-16">
            <div className="md:col-span-5">
              <Reveal>
                <p className="chapter-num">— Direct contact</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-heading mt-8 text-[clamp(1.5rem,3vw,2.2rem)] text-ink leading-[1.5]">
                  お電話・メールでも、
                  <br className="hidden sm:block" />
                  承っております。
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-7 md:pt-2 mt-6 md:mt-0">
              <Reveal delay={0.14}>
                <p className="text-[14.5px] md:text-[15px] leading-[2.05] text-ink-soft max-w-[34rem]">
                  すぐにお話ししたい場合や、フォームの送信が難しい場合は、
                  お電話・メールでもご連絡いただけます。
                </p>
              </Reveal>
            </div>
          </div>

          <div className="border-t border-line">
            {DIRECT_LINES.map((line, i) => (
              <Reveal key={line.en} delay={0.05 + i * 0.06}>
                <div className="grid grid-cols-1 md:grid-cols-12 md:gap-12 border-b border-line py-10 md:py-12">
                  <div className="md:col-span-3">
                    <p
                      className="text-[11px] tracking-[0.32em] text-stone uppercase"
                      style={{
                        fontFamily: "var(--font-en-display)",
                        fontStyle: "italic",
                      }}
                    >
                      {line.en}
                    </p>
                    <p
                      className="mt-3 text-[14px] tracking-[0.18em] text-ink-soft"
                      style={{ fontFamily: "var(--font-jp-display)" }}
                    >
                      {line.label}
                    </p>
                  </div>
                  <div className="md:col-span-9 mt-4 md:mt-1">
                    <a
                      href={line.href}
                      className="group inline-flex items-baseline gap-3"
                    >
                      <span
                        className="text-[clamp(1.5rem,3vw,2.25rem)] leading-none text-ink"
                        style={{
                          fontFamily: "var(--font-en-display)",
                          fontWeight: 400,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {line.value}
                      </span>
                      <span
                        aria-hidden
                        className="text-accent text-lg transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </a>
                    <p className="mt-4 text-[12.5px] tracking-[0.06em] text-stone">
                      {line.note}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Hours / area */}
          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 md:gap-12 gap-8">
            <Reveal delay={0.1}>
              <div>
                <p
                  className="text-[11px] tracking-[0.32em] text-stone uppercase"
                  style={{
                    fontFamily: "var(--font-en-display)",
                    fontStyle: "italic",
                  }}
                >
                  Hours
                </p>
                <p className="mt-4 text-[14.5px] md:text-[15px] leading-[2.05] text-ink-soft">
                  平日 10:00 — 18:00 / 土日祝休み
                  <br />
                  土曜の対面打ち合わせは、事前予約にて承ります。
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div>
                <p
                  className="text-[11px] tracking-[0.32em] text-stone uppercase"
                  style={{
                    fontFamily: "var(--font-en-display)",
                    fontStyle: "italic",
                  }}
                >
                  Area
                </p>
                <p className="mt-4 text-[14.5px] md:text-[15px] leading-[2.05] text-ink-soft">
                  地方の工務店さまを中心に、{SITE_CONFIG.area}。
                  <br />
                  お打ち合わせはオンラインで全国対応いたします。
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
