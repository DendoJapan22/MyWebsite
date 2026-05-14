"use client";

import { Accordion } from "@base-ui/react/accordion";
import { FAQ_ITEMS } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

type Props = { chapterNum?: string };

export function FaqSection({ chapterNum = "08 / FAQ" }: Props = {}) {
  return (
    <section className="relative border-t border-line">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-20 md:py-32">
        {/* Section heading */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-12 mb-12 md:mb-20">
          <div className="md:col-span-5">
            <Reveal>
              <p className="chapter-num">{chapterNum}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-heading mt-8 text-[clamp(1.9rem,4vw,3rem)] text-ink leading-[1.4]">
                よくある
                <br />
                ご質問。
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:pt-2 mt-6 md:mt-0">
            <Reveal delay={0.16}>
              <p className="text-[14.5px] md:text-[15.5px] leading-[2.05] text-ink-soft max-w-[34rem]">
                ご相談前にお寄せいただくことの多いご質問をまとめました。
                ここに記載のないご質問も、お気軽にお問い合わせください。
              </p>
            </Reveal>
          </div>
        </div>

        {/* Accordion */}
        <Reveal delay={0.18}>
          <Accordion.Root className="border-t border-line">
            {FAQ_ITEMS.map((item, i) => (
              <Accordion.Item
                key={i}
                value={i}
                className="border-b border-line"
              >
                <Accordion.Header>
                  <Accordion.Trigger
                    className={[
                      "group/faq flex w-full items-start justify-between gap-6 md:gap-10",
                      "py-7 md:py-8 text-left outline-none",
                      "hover:text-ink transition-colors duration-300",
                    ].join(" ")}
                  >
                    <span className="flex items-baseline gap-5 md:gap-7">
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
                      <span className="text-[15px] md:text-[16px] leading-[1.7] text-ink">
                        {item.q}
                      </span>
                    </span>

                    {/* +/− indicator */}
                    <span
                      aria-hidden
                      className="relative mt-[6px] size-[14px] shrink-0 text-ink-soft"
                    >
                      <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-current" />
                      <span className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-current transition-transform duration-300 ease-out group-aria-expanded/faq:scale-y-0" />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Panel className="overflow-hidden data-open:animate-accordion-down data-closed:animate-accordion-up">
                  <div className="h-(--accordion-panel-height) data-ending-style:h-0 data-starting-style:h-0">
                    <div className="pl-9 md:pl-12 pr-2 pb-8 md:pb-10 max-w-[44rem]">
                      <p className="text-[14px] md:text-[14.5px] leading-[2.05] text-ink-soft">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Reveal>
      </div>
    </section>
  );
}
