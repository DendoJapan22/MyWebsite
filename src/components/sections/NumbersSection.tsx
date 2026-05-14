import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

type Stat = { num: string; unit: string; label: string };

const NUMBERS: Stat[] = [
  { num: "3", unit: "倍", label: "平均問い合わせ\n増加(目標値)" },
  { num: "4", unit: "週間", label: "契約から\n公開まで" },
  { num: "1", unit: "秒以内", label: "ページの\n表示速度" },
  { num: "12", unit: "ヶ月", label: "最低契約期間" },
];

export function NumbersSection() {
  return (
    <Section spacing="medium" className="border-t border-line">
      {/* Section heading */}
      <div className="grid grid-cols-1 md:grid-cols-12 md:gap-12 mb-12 md:mb-20">
        <div className="md:col-span-5">
          <Reveal>
            <p className="chapter-num">04 / Numbers</p>
          </Reveal>
          <Reveal delay={0.04}>
            <p
              className="mt-3 text-[12px] tracking-[0.32em] text-stone uppercase"
              style={{
                fontFamily: "var(--font-en-display)",
                fontStyle: "italic",
              }}
            >
              Numbers that matter
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-heading mt-7 text-[clamp(1.7rem,3.4vw,2.6rem)] text-ink leading-[1.4]">
              数字で見る、
              <br />
              <span className="whitespace-nowrap">ドラシルデジタル。</span>
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-7 md:pt-2 mt-6 md:mt-0">
          <Reveal delay={0.16}>
            <p className="text-[14.5px] md:text-[15.5px] leading-[2.05] text-ink-soft max-w-[34rem]">
              制作の品質と運用の手応えを、数字でも示しています。
              小さな工房だからこそ、ひとつひとつの指標を丁寧に。
            </p>
          </Reveal>
        </div>
      </div>

      {/* Numbers grid — vertical hairlines only, no top/bottom borders */}
      <div className="grid grid-cols-2 md:grid-cols-4">
        {NUMBERS.map((n, i) => (
          <Reveal
            key={i}
            delay={0.05 + i * 0.08}
            className={[
              "px-5 md:px-7 lg:px-9 py-10 md:py-14",
              // Desktop: hairline divider between columns (no border on last)
              i < NUMBERS.length - 1 ? "md:border-r md:border-line/50" : "",
              // Mobile: 2x2 — vertical divider on right cell of each row
              i % 2 === 1 ? "border-l border-line/50 md:border-l-0" : "",
            ].join(" ")}
          >
            <span className="flex items-baseline gap-2 leading-none text-ink">
              <span
                className="text-[clamp(2.5rem,5vw,4rem)]"
                style={{
                  fontFamily: "var(--font-en-display)",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                }}
              >
                {n.num}
              </span>
              <span
                className="text-[clamp(0.95rem,1.4vw,1.15rem)] tracking-[0.04em] text-ink"
                style={{ fontFamily: "var(--font-jp-display)" }}
              >
                {n.unit}
              </span>
            </span>
            <span aria-hidden className="mt-5 block h-px w-8 bg-ink/60" />
            <p className="mt-5 text-[13px] md:text-[13.5px] leading-[1.7] text-ink-soft whitespace-pre-line">
              {n.label}
            </p>
          </Reveal>
        ))}
      </div>

      {/* Disclaimer — fully outside the grid */}
      <Reveal delay={0.4}>
        <p className="mt-10 md:mt-12 text-[12px] leading-[2] text-stone max-w-[44rem]">
          ※ 「3倍」はWeb改善前後の参考目標値であり、実績を保証するものではございません。
          <br />
          ※ 「1秒以内」は当社の制作物における目安値であり、回線速度等の環境により変動します。
        </p>
      </Reveal>
    </Section>
  );
}
