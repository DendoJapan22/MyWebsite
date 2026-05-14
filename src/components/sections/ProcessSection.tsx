import { PROCESS_STEPS } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const PHASE_DURATIONS_EN = ["1 hour", "1 week", "2-3 weeks", "ongoing"];

export function ProcessSection() {
  return (
    <Section
      spacing="tight"
      className="border-t border-line"
      innerClassName="pb-16 md:pb-24"
    >
        {/* Section heading */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-12 mb-16 md:mb-28">
          <div className="md:col-span-5">
            <Reveal>
              <p className="chapter-num">06 / Process</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-heading mt-8 text-[clamp(1.9rem,4vw,3rem)] text-ink leading-[1.4]">
                ご契約から
                <br />
                公開まで。
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:pt-2 mt-6 md:mt-0">
            <Reveal delay={0.16}>
              <p className="text-[14.5px] md:text-[15.5px] leading-[2.05] text-ink-soft max-w-[34rem]">
                お客様との対話から、公開後の運用まで。一つひとつのステップを、丁寧に。
                標準で約1ヶ月、お急ぎの場合はご相談に応じます。
              </p>
            </Reveal>
          </div>
        </div>

        {/* Steps: 4 columns on desktop, stacked on mobile, hairlines between */}
        <div className="grid grid-cols-1 md:grid-cols-4 border-t border-line">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal
              key={step.number}
              delay={0.05 + i * 0.08}
              className={[
                "relative flex flex-col pt-10 md:pt-14 pb-0 px-5 md:px-7 lg:px-9",
                // Mobile dividers (between rows, not after last)
                i < PROCESS_STEPS.length - 1
                  ? "border-b border-line md:border-b-0"
                  : "",
                // Desktop vertical hairlines (not after last)
                i < PROCESS_STEPS.length - 1
                  ? "md:border-r md:border-line"
                  : "",
                i === 0 ? "md:pl-0" : "",
                i === PROCESS_STEPS.length - 1 ? "md:pr-0" : "",
              ].join(" ")}
            >
              <span
                className="block text-[12px] tracking-[0.15em] text-stone"
                style={{
                  fontFamily: "var(--font-en-display)",
                  fontStyle: "italic",
                }}
              >
                Phase {step.number}
              </span>

              <span
                className="block mt-3 text-[clamp(2.4rem,4vw,3.5rem)] leading-none text-accent"
                style={{
                  fontFamily: "var(--font-en-display)",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                }}
              >
                {step.number}
              </span>

              <span className="mt-6 block h-px w-8 bg-line" aria-hidden />

              <h3
                className="display-heading mt-5 text-[16.5px] md:text-[17.5px] text-ink"
                style={{ letterSpacing: "0.04em", lineHeight: 1.5 }}
              >
                {step.title}
              </h3>

              <p className="mt-3 text-[12.5px] tracking-[0.14em] text-ink-soft min-h-[1.4em]">
                {step.duration !== "—" ? `所要 ${step.duration}` : " "}
              </p>

              <p className="mt-6 text-[13.5px] leading-[1.95] text-ink-soft">
                {step.description}
              </p>

              {/* Duration badge — pinned to bottom of cell so all 4 align */}
              <div className="mt-auto pt-7">
                <span
                  className="inline-flex items-center px-3 py-[5px] text-[11.5px] tracking-[0.12em] text-stone border border-line"
                  style={{
                    fontFamily: "var(--font-en-body)",
                    borderRadius: 0,
                  }}
                >
                  {PHASE_DURATIONS_EN[i]}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
    </Section>
  );
}
