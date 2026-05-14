import { Reveal } from "@/components/ui/Reveal";
import { SITE_CONFIG } from "@/lib/constants";

const PARAGRAPHS: { text: string; quiet?: boolean }[] = [
  { text: `${SITE_CONFIG.parentName}は、北欧神話の世界樹「Yggdrasil」に由来します。` },
  {
    text: "世界の中心に立ち、誰かが何かを学び、成し遂げる時、その傍らで静かに支え続ける存在——それが世界樹。",
  },
  {
    text: "私たちは、地方の工務店経営者の挑戦を支える、そんな存在でありたいと願っています。",
  },
  {
    text: `「${SITE_CONFIG.name}」は、${SITE_CONFIG.parentName}が運営する最初の事業です。工務店の集客と発信を、Webの力でサポートします。`,
    quiet: true,
  },
];

export function DrasilOriginSection() {
  return (
    <section
      id="drasil"
      className="relative border-t border-line"
      style={{ backgroundColor: "var(--color-accent-tint)" }}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <Reveal>
              <p
                className="text-[11px] tracking-[0.32em] text-accent-deep uppercase"
                style={{
                  fontFamily: "var(--font-en-display)",
                  fontStyle: "italic",
                  color: "var(--color-accent-deep)",
                }}
              >
                — About the parent brand
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2
                className="mt-7 text-[clamp(1.7rem,3.2vw,2.4rem)] font-medium leading-[1.45]"
                style={{
                  fontFamily: "var(--font-jp-body)",
                  letterSpacing: "0.05em",
                  color: "var(--color-accent-deep)",
                }}
              >
                {SITE_CONFIG.parentName}
                <span className="ml-3 text-[0.65em] tracking-[0.1em] align-baseline text-ink-soft">
                  ({SITE_CONFIG.parentNameJp})
                </span>
                <br />
                について。
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 text-[13px] tracking-[0.06em] text-ink-soft leading-[1.95]">
                屋号「{SITE_CONFIG.parentName}」は、将来複数の事業に展開する親ブランドです。
                その最初の事業として、地方工務店向けのWeb制作サービス「{SITE_CONFIG.name}」を運営しています。
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-8 md:pl-4 mt-10 md:mt-0">
            <article
              style={{
                fontFamily: "var(--font-jp-body)",
                letterSpacing: "0.05em",
              }}
            >
              {PARAGRAPHS.map((p, i) => (
                <Reveal key={i} delay={0.14 + i * 0.06}>
                  <p
                    className={
                      p.quiet
                        ? "mt-10 pt-8 border-t border-ink/15 text-[16px] md:text-[17px] text-ink-soft"
                        : "mb-7 text-[18px] md:text-[20px] text-ink"
                    }
                    style={{ lineHeight: 2 }}
                  >
                    {p.text}
                  </p>
                </Reveal>
              ))}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
