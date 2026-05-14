import { PROBLEMS } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function ProblemSection() {
  return (
    <Section spacing="large">
      <div className="grid grid-cols-1 md:grid-cols-12 md:gap-12">
        {/* Header column */}
        <div className="md:col-span-5">
          <Reveal kind="chapter">
            <p className="chapter-num">02 / Problem</p>
          </Reveal>
          <Reveal kind="heading" delay={0.1}>
            <h2 className="display-heading mt-8 text-[clamp(1.9rem,4vw,3rem)] text-ink leading-[1.4]">
              こんなお悩み、
              <br />
              ありませんか。
            </h2>
          </Reveal>
        </div>

        {/* List column */}
        <div className="mt-14 md:mt-2 md:col-span-7">
          <ul className="border-t border-line">
            {PROBLEMS.map((p, i) => (
              <Reveal
                key={i}
                as="li"
                delay={0.25 + i * 0.08}
                className="flex items-start gap-5 md:gap-7 border-b border-line py-7 md:py-8"
              >
                <span
                  className="shrink-0 mt-[2px] text-stone tracking-widest text-[12px] tabular-nums"
                  style={{
                    fontFamily: "var(--font-en-display)",
                    fontStyle: "italic",
                  }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="select-none text-stone text-[18px] leading-none -mt-[1px]"
                  aria-hidden
                >
                  —
                </span>
                <span className="text-[15.5px] md:text-[16.5px] leading-[1.95] text-ink">
                  {p}
                </span>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.25 + PROBLEMS.length * 0.08 + 0.05}>
            <p className="mt-10 md:mt-12 max-w-[28rem] text-[14.5px] leading-[2] text-ink-soft">
              ひとつでも当てはまる場合、
              <br className="hidden md:block" />
              Webの見直しの時期かもしれません。
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
