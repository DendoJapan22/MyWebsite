import { Reveal } from "@/components/ui/Reveal";
import { SITE_CONFIG } from "@/lib/constants";

const INFO_ROWS: { label: string; value: string }[] = [
  { label: "サービス名", value: `${SITE_CONFIG.name}(${SITE_CONFIG.nameEn})` },
  { label: "屋号", value: SITE_CONFIG.parentName },
  { label: "代表者", value: "横澤 大輝" },
  { label: "所在地", value: "詳細は契約時に開示いたします" },
  { label: "電話", value: SITE_CONFIG.phone },
  { label: "メール", value: SITE_CONFIG.email },
  { label: "事業開始", value: "2026年5月" },
  {
    label: "対応エリア",
    value: "全国(お打ち合わせはオンラインで承ります)",
  },
  {
    label: "事業内容",
    value: "地方の工務店向けWebサイト制作、Googleマップ最適化(MEO)初期構築、施工事例ページの継続更新",
  },
];

export function BusinessInfoSection() {
  return (
    <section className="relative border-t border-line">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-20 md:py-32">
        {/* Section heading */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-12 mb-14 md:mb-20">
          <div className="md:col-span-5">
            <Reveal>
              <p className="chapter-num">09 / Info</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-heading mt-8 text-[clamp(1.9rem,3.5vw,2.6rem)] text-ink leading-[1.4]">
                事業者情報。
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:pt-2 mt-6 md:mt-0">
            <Reveal delay={0.16}>
              <p className="text-[14.5px] md:text-[15px] leading-[2.05] text-ink-soft max-w-[34rem]">
                {SITE_CONFIG.name}の基本情報を、こちらにまとめております。
                ご契約の前に、ご不明な点があればお気軽にお問い合わせください。
              </p>
            </Reveal>
          </div>
        </div>

        {/* Info table */}
        <Reveal delay={0.18}>
          <dl className="border-t border-line">
            {INFO_ROWS.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-12 gap-4 md:gap-12 border-b border-line py-6 md:py-7"
              >
                <dt className="col-span-12 md:col-span-3">
                  <span
                    className="text-[12.5px] md:text-[13px] tracking-[0.18em] text-stone"
                    style={{
                      fontFamily: "var(--font-jp-display)",
                    }}
                  >
                    {row.label}
                  </span>
                </dt>
                <dd className="col-span-12 md:col-span-9 -mt-2 md:mt-0">
                  <span className="block text-[14.5px] md:text-[15.5px] leading-[1.95] text-ink">
                    {row.value}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
