import Image from "next/image";
import {
  WORKS_SAMPLES,
  WORKS_DISCLAIMER,
  type WorkStatus,
} from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { WORKS_THUMBS, ThumbHouse } from "@/components/sections/WorksThumbs";

const STATUS_LABEL: Record<WorkStatus, string> = {
  sample: "サンプル公開中",
  preparing: "Coming Soon — 2026年内公開予定",
};

const BADGE_LABEL: Record<WorkStatus, string> = {
  sample: "Sample",
  preparing: "Soon",
};

export function WorksGrid() {
  return (
    <section className="relative border-t border-line">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-20 md:py-28">
        {/* Disclaimer (top of page, prominently shown) */}
        <Reveal>
          <p
            className="mb-10 md:mb-14 text-[12.5px] leading-[2] text-ink-soft max-w-[44rem] border-l-2 border-accent pl-4"
            role="note"
          >
            {WORKS_DISCLAIMER}
          </p>
        </Reveal>

        {/* Works grid: hairline divider grid mirroring Process section */}
        <div className="border-t border-line">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {WORKS_SAMPLES.map((work, i) => {
              const Thumb = WORKS_THUMBS[i] ?? ThumbHouse;
              const isSample = work.status === "sample";

              const articleClasses = [
                "group relative block py-10 md:py-14",
                "border-b border-line md:border-b-0",
                i < WORKS_SAMPLES.length - 1
                  ? "md:border-r md:border-line"
                  : "",
                "md:px-7 lg:px-9",
                i === 0 ? "md:pl-0" : "",
                i === WORKS_SAMPLES.length - 1 ? "md:pr-0" : "",
              ].join(" ");

              const inner = (
                <>
                  <div
                    className={[
                      "relative aspect-[4/3] w-full overflow-hidden border border-line",
                      isSample
                        ? "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:shadow-[0_10px_30px_-12px_rgba(26,26,26,0.18)]"
                        : "",
                    ].join(" ")}
                  >
                    {work.image ? (
                      <Image
                        src={work.image}
                        alt={work.imageAlt ?? ""}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="lazy"
                        className="object-cover object-top"
                      />
                    ) : (
                      <Thumb />
                    )}
                    <span
                      className={[
                        "absolute top-3 left-3 inline-flex items-center px-2.5 py-1",
                        "text-[10.5px] tracking-[0.22em] uppercase",
                        isSample
                          ? "bg-accent text-paper"
                          : "bg-paper text-stone border border-line",
                      ].join(" ")}
                      style={{
                        fontFamily: "var(--font-en-display)",
                        fontStyle: "italic",
                      }}
                    >
                      {BADGE_LABEL[work.status]}
                    </span>
                  </div>

                  <p className="mt-7 text-[11.5px] tracking-[0.32em] text-stone">
                    {work.industry}
                  </p>

                  <h3
                    className="display-heading mt-3 text-[17px] md:text-[18px] text-ink"
                    style={{ letterSpacing: "0.04em", lineHeight: 1.5 }}
                  >
                    {work.title}
                  </h3>

                  <p className="mt-2 text-[11.5px] tracking-[0.18em] text-stone">
                    {STATUS_LABEL[work.status]}
                  </p>

                  <p className="mt-5 text-[13.5px] leading-[1.95] text-ink-soft">
                    {work.description}
                  </p>

                  {isSample && (
                    <p
                      className="mt-5 inline-flex items-center text-[12px] tracking-[0.18em] text-accent"
                      style={{
                        fontFamily: "var(--font-en-display)",
                        fontStyle: "italic",
                      }}
                    >
                      View Live Sample
                      <span
                        aria-hidden
                        className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
                      >
                        ↗
                      </span>
                    </p>
                  )}
                </>
              );

              return (
                <Reveal key={i} delay={0.05 + i * 0.08}>
                  {work.url ? (
                    <a
                      href={work.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${work.title}(サンプルサイト、新しいタブで開く)`}
                      className={articleClasses}
                    >
                      {inner}
                    </a>
                  ) : (
                    <article className={articleClasses}>{inner}</article>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Note */}
        <Reveal delay={0.24}>
          <p className="mt-12 md:mt-14 text-[12.5px] leading-[2] text-stone max-w-[36rem]">
            ※ 第1期パートナー(3社)については、初期費用半額(¥39,000 税抜 / ¥42,900 税込)にてご提供いたします。お早めにご相談ください。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
