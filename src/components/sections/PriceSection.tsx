import Link from "next/link";
import {
  PRICING,
  SERVICE_INCLUDES_INITIAL,
  SERVICE_INCLUDES_MONTHLY,
} from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const yen = (n: number) => `¥${n.toLocaleString("ja-JP")}`;

export function PriceSection() {
  return (
    <Section
      id="price"
      spacing="medium"
      className="border-t border-line scroll-mt-24"
      innerClassName="md:pb-20"
    >
      {/* Section heading */}
      <div className="grid grid-cols-1 md:grid-cols-12 md:gap-12 mb-14 md:mb-20">
        <div className="md:col-span-5">
          <Reveal>
            <p className="chapter-num">05 / Price</p>
          </Reveal>
          <Reveal delay={0.04}>
            <p
              className="mt-3 text-[12px] tracking-[0.32em] text-stone uppercase"
              style={{
                fontFamily: "var(--font-en-display)",
                fontStyle: "italic",
              }}
            >
              A single, honest price
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-heading mt-7 text-[clamp(1.9rem,4vw,3rem)] text-ink leading-[1.4] font-medium">
              サービス料金。
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-7 md:pt-2 mt-6 md:mt-0">
          <Reveal delay={0.16}>
            <p className="text-[15.5px] md:text-[16.5px] leading-[2] text-ink-soft max-w-[34rem]">
              工務店さま 1 社 1 社にしっかり向き合うため、プランは 1 つに絞っております。
              迷わずにご検討いただける、シンプルで誠実な料金体系です。
            </p>
          </Reveal>
        </div>
      </div>

      {/* Magazine-spread: Initial fee | Monthly fee */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Initial fee */}
        <Reveal delay={0.05}>
          <div
            className="relative md:border-r md:border-line py-12 md:py-20"
            style={{
              borderRadius: 0,
              borderTop: "1px solid rgba(45, 90, 63, 0.3)",
              borderBottom: "1px solid var(--color-line)",
            }}
          >
            <div className="mx-auto max-w-[420px] md:px-6">
              <div className="flex items-baseline justify-between gap-4">
                <p
                  className="text-[11px] tracking-[0.3em] uppercase"
                  style={{
                    fontFamily: "var(--font-en-display)",
                    fontStyle: "italic",
                    color: "var(--color-accent)",
                  }}
                >
                  Initial Fee
                </p>

                {/* Limited-3 badge — brass tag */}
                <div
                  className="inline-flex items-center gap-2 px-2.5 py-1"
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
                    className="text-[10px] tracking-[0.22em] uppercase"
                    style={{
                      fontFamily: "var(--font-en-display)",
                      fontStyle: "italic",
                      color: "var(--color-wood-deep)",
                      fontWeight: 600,
                    }}
                  >
                    先着 3 社さま 半額
                  </span>
                </div>
              </div>

              {/* Strikethrough original price */}
              <div className="mt-10 md:mt-14 flex items-baseline gap-3 mb-1">
                <span
                  aria-hidden
                  className="line-through decoration-[1.5px] leading-none"
                  style={{
                    fontFamily: "var(--font-en-numeral)",
                    color: "var(--color-stone)",
                    fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)",
                    textDecorationColor: "var(--color-wood)",
                    textDecorationThickness: "1.5px",
                  }}
                >
                  {yen(PRICING.initial)}
                </span>
                <span
                  className="text-[11px] tracking-[0.2em] uppercase"
                  style={{
                    fontFamily: "var(--font-en-display)",
                    fontStyle: "italic",
                    color: "var(--color-stone)",
                  }}
                >
                  通常価格
                </span>
              </div>

              {/* Big discounted price — the visual centrepiece */}
              <div className="flex items-baseline gap-3">
                <span
                  className="leading-none text-ink"
                  style={{
                    fontFamily: "var(--font-en-numeral)",
                    fontWeight: 400,
                    fontSize: "clamp(4.4rem, 10.5vw, 7.6rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {yen(PRICING.initialPartner)}
                </span>
              </div>
              <span aria-hidden className="mt-6 block h-px w-20 bg-ink" />
              <p className="mt-5 text-[13.5px] tracking-[0.05em] text-ink-soft/80">
                税抜 / 税込 {yen(PRICING.initialPartnerTaxIn)}
              </p>
              <p
                className="mt-3 text-[12.5px] tracking-[0.04em] text-stone"
                style={{ lineHeight: 1.8 }}
              >
                ※ 第1期パートナー(先着3社さま)限定の半額価格。4社目以降は通常 {yen(PRICING.initial)}(税込 {yen(PRICING.initialTaxIn)})となります。
              </p>

              <ul className="mt-12 space-y-4">
                {SERVICE_INCLUDES_INITIAL.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-5 text-[14.5px] leading-[1.9] text-ink"
                  >
                    <span aria-hidden className="block h-px w-4 bg-ink/50" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Monthly fee */}
        <Reveal delay={0.12}>
          <div
            className="relative py-12 md:py-20"
            style={{
              borderRadius: 0,
              borderTop: "1px solid rgba(45, 90, 63, 0.3)",
              borderBottom: "1px solid var(--color-line)",
            }}
          >
            <div className="mx-auto max-w-[420px] md:px-6">
              <p
                className="text-[11px] tracking-[0.3em] uppercase"
                style={{
                  fontFamily: "var(--font-en-display)",
                  fontStyle: "italic",
                  color: "var(--color-accent)",
                }}
              >
                Monthly Fee
              </p>

              <div className="mt-12 md:mt-16 flex items-baseline gap-3 flex-wrap">
                <span
                  className="leading-none text-ink-soft"
                  style={{
                    fontFamily: "var(--font-en-numeral)",
                    fontWeight: 400,
                    fontSize: "clamp(2.6rem, 5.4vw, 4rem)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {yen(PRICING.monthly)}
                </span>
                <span className="text-[14px] tracking-[0.14em] text-ink-soft/80">
                  / 月
                </span>
              </div>
              <span aria-hidden className="mt-6 block h-px w-20 bg-ink" />
              <p className="mt-5 text-[13.5px] tracking-[0.05em] text-ink-soft/80">
                税抜 / 税込 {yen(PRICING.monthlyTaxIn)}
              </p>

              <ul className="mt-12 space-y-4">
                {SERVICE_INCLUDES_MONTHLY.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center gap-5 text-[14.5px] leading-[1.9] text-ink"
                  >
                    <span
                      aria-hidden
                      className="block h-px w-4 shrink-0 bg-ink/50"
                    />
                    <span>
                      {item.label}
                      {item.note && (
                        <span className="ml-2 text-[11.5px] tracking-[0.04em] text-stone">
                          ({item.note})
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>

      {/* CTA + Notes */}
      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 md:gap-12 items-end">
        <div className="md:col-span-7">
          <Reveal delay={0.2}>
            <p
              className="text-[13.5px] leading-[2] text-stone"
              style={{ fontFamily: "var(--font-jp-body)" }}
            >
              ※ ページ数の上限は設けておりません。必要なボリュームでサイトを一式承ります。
              <br />※ {PRICING.contractMonths}ヶ月のご契約をお願いしております。
              <br />※ 上記制限を超える作業や、大幅なデザイン変更・新規ページ追加等は別途お見積もりにて承ります。
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-5 md:text-right mt-8 md:mt-0">
          <Reveal delay={0.26}>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center px-8 py-4 min-h-[52px] text-[14.5px] tracking-[0.16em] font-medium transition-colors"
              style={{
                backgroundColor: "var(--color-wood)",
                color: "var(--color-paper)",
                borderRadius: "4px",
                fontFamily: "var(--font-jp-body)",
              }}
            >
              <span>このプランで相談する</span>
              <span
                aria-hidden
                className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
