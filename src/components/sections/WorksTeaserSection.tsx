import Image from "next/image";
import Link from "next/link";
import {
  WORKS_SAMPLES,
  WORKS_DISCLAIMER,
  type WorkStatus,
} from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { WORKS_THUMBS, ThumbHouse } from "@/components/sections/WorksThumbs";

const STATUS_LABEL: Record<WorkStatus, string> = {
  sample: "鈴木工務店(サンプルサイト)",
  preparing: "次の工務店さま、募集中",
};

const BADGE_LABEL: Record<WorkStatus, string> = {
  sample: "Sample",
  preparing: "Open",
};

export function WorksTeaserSection() {
  return (
    <Section
      id="works"
      spacing="large"
      className="border-t border-line scroll-mt-24"
    >
      {/* Section heading row */}
      <div className="grid grid-cols-1 md:grid-cols-12 md:gap-12 mb-12 md:mb-20">
        <div className="md:col-span-7">
          <Reveal kind="chapter">
            <p className="chapter-num">07 / Works</p>
          </Reveal>
          <Reveal kind="heading" delay={0.08}>
            <h2 className="display-heading mt-8 text-[clamp(1.9rem,4vw,3rem)] text-ink leading-[1.4]">
              これまでの
              <br className="md:hidden" />
              制作。
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-5 md:text-right md:pt-2 mt-3 md:mt-0">
          <Reveal delay={0.16}>
            <p
              className="text-[12px] tracking-[0.32em] text-stone uppercase"
              style={{
                fontFamily: "var(--font-en-display)",
                fontStyle: "italic",
              }}
            >
              Selected Works
            </p>
          </Reveal>
        </div>
      </div>

      {/* Thumbnail row */}
      <div className="border-t border-line">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {WORKS_SAMPLES.map((work, i) => {
            const Thumb = WORKS_THUMBS[i] ?? ThumbHouse;
            const isSample = work.status === "sample";
            const cardClasses = [
              "group relative block py-10 md:py-14",
              "border-b border-line md:border-b-0",
              i < WORKS_SAMPLES.length - 1
                ? "md:border-r md:border-line"
                : "",
              "md:px-7 lg:px-9",
              i === 0 ? "md:pl-0" : "",
              i === WORKS_SAMPLES.length - 1 ? "md:pr-0" : "",
            ].join(" ");

            const cardInner = (
              <>
                <div className="relative aspect-[4/3] w-full overflow-hidden border border-line transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:shadow-[0_10px_30px_-12px_rgba(26,26,26,0.18)]">
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

                <p className="mt-6 text-[11.5px] tracking-[0.32em] text-stone">
                  {work.industry}
                </p>
                <h3
                  className="display-heading mt-3 text-[16px] md:text-[17px] text-ink"
                  style={{ letterSpacing: "0.04em", lineHeight: 1.5 }}
                >
                  {STATUS_LABEL[work.status]}
                </h3>
                {!isSample && work.description && (
                  <p className="mt-3 text-[12.5px] leading-[1.95] text-ink-soft max-w-[18rem]">
                    {work.description}
                  </p>
                )}
                {isSample && (
                  <p
                    className="mt-3 inline-flex items-center text-[11.5px] tracking-[0.18em] text-accent"
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
                {!isSample && (
                  <p
                    className="mt-4 inline-flex items-center text-[11.5px] tracking-[0.18em] text-accent"
                    style={{
                      fontFamily: "var(--font-en-display)",
                      fontStyle: "italic",
                    }}
                  >
                    Apply as partner
                    <span
                      aria-hidden
                      className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
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
                    className={cardClasses}
                  >
                    {cardInner}
                  </a>
                ) : !isSample ? (
                  <Link
                    href="/contact"
                    aria-label={`${work.industry}向け制作のパートナー枠についてお問い合わせ`}
                    className={cardClasses}
                  >
                    {cardInner}
                  </Link>
                ) : (
                  <div className={cardClasses}>{cardInner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <Reveal delay={0.28}>
        <p
          role="note"
          className="mt-10 md:mt-12 text-[12.5px] leading-[2] text-ink-soft max-w-[44rem] border-l-2 border-accent pl-4"
        >
          {WORKS_DISCLAIMER}
        </p>
      </Reveal>
    </Section>
  );
}
