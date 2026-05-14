import { Reveal } from "@/components/ui/Reveal";
import { SITE_CONFIG } from "@/lib/constants";

const PARAGRAPHS = [
  "ドラシルデジタル代表の横澤と申します。",
  "縁あって暮らし始めた神奈川西部で、地方の工務店さまの素晴らしい技術と歴史が、Web上ではほとんど届いていない現実に出会いました。",
  "最新のAI技術を活用すれば、これまで30〜100万円かかっていたサイト制作を、ご負担の少ない価格で、しかも高品質にご提供できます。",
  "地方の工務店さまの「伝える力」を、Webで最大化する。それがドラシルデジタルの使命です。",
  "お気軽にご相談ください。",
];

export function AboutLetter() {
  return (
    <section className="relative border-t border-line">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-20 md:py-28">
        {/* Editorial body */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-12">
          {/* Decorative quote — left column on desktop */}
          <div className="md:col-span-3 relative">
            <Reveal delay={0.12}>
              <div className="relative h-[120px] md:h-full">
                <span
                  aria-hidden
                  className="absolute -top-4 left-0 select-none text-stone/35 leading-[0.75]"
                  style={{
                    fontFamily: "var(--font-jp-display)",
                    fontWeight: 400,
                    fontSize: "clamp(7rem, 13vw, 11rem)",
                  }}
                >
                  &ldquo;
                </span>
                {/* Vertical accent rule under the quote */}
                <span
                  aria-hidden
                  className="hidden md:block absolute left-[14px] top-[120px] bottom-0 w-px bg-line"
                />
              </div>
            </Reveal>
          </div>

          {/* Letter — right column */}
          <div className="md:col-span-8 md:col-start-5 mt-2 md:mt-0">
            <article
              className="text-ink"
              style={{
                fontFamily: "var(--font-jp-body)",
                fontWeight: 400,
                letterSpacing: "0.04em",
              }}
            >
              {PARAGRAPHS.map((p, i) => (
                <Reveal key={i} delay={0.18 + i * 0.06}>
                  <p
                    className="text-[18px] md:text-[20px] mb-7 md:mb-8"
                    style={{ lineHeight: 1.95 }}
                  >
                    {p}
                  </p>
                </Reveal>
              ))}

              {/* Signature block */}
              <Reveal delay={0.18 + PARAGRAPHS.length * 0.06}>
                <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-line flex items-center justify-between gap-6 flex-wrap">
                  <div>
                    <p
                      className="text-[11px] tracking-[0.28em] text-accent uppercase"
                      style={{
                        fontFamily: "var(--font-en-display)",
                        fontStyle: "italic",
                      }}
                    >
                      {SITE_CONFIG.nameEn} — Founder
                    </p>
                    <p
                      className="mt-3 text-[16px] md:text-[17px] text-ink font-medium"
                      style={{
                        fontFamily: "var(--font-jp-body)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {SITE_CONFIG.name} 代表 &nbsp;横澤 大輝
                    </p>
                  </div>
                </div>
              </Reveal>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
