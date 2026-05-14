import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description:
    "ドラシルデジタル(屋号: Drasil)の特定商取引法に基づく表記ページです。販売事業者、提供サービス、販売価格、支払方法、役務の提供時期、解約・返金についてなどを記載しております。",
  robots: {
    index: false,
    follow: true,
  },
};

type Row = { label: string; value: ReactNode };

const ROWS: Row[] = [
  {
    label: "販売事業者",
    value: (
      <>
        {SITE_CONFIG.parentName}({SITE_CONFIG.parentNameJp})
        <span className="block mt-2 text-[13px] text-stone">
          サービス名: {SITE_CONFIG.name}({SITE_CONFIG.nameEn})
        </span>
      </>
    ),
  },
  { label: "運営統括責任者", value: "横澤 大輝" },
  {
    label: "所在地",
    value: "お客様からのご請求があった場合、遅滞なく開示いたします。",
  },
  {
    label: "電話番号",
    value: (
      <>
        {SITE_CONFIG.phone}
        <span className="block mt-2 text-[13px] text-stone">
          受付時間: 平日 10:00 — 18:00
        </span>
      </>
    ),
  },
  {
    label: "メールアドレス",
    value: (
      <>
        {SITE_CONFIG.email}
        <span className="block mt-2 text-[13px] text-stone">
          ※ ご返信は1〜2営業日以内に行います
        </span>
      </>
    ),
  },
  {
    label: "URL",
    value: (
      <>
        本サイト
        <span className="block mt-2 text-[13px] text-stone">
          ※ 独自ドメインは契約後に取得し、改めてご案内いたします
        </span>
      </>
    ),
  },
  {
    label: "提供サービス",
    value: (
      <div className="space-y-6">
        <div>
          <p
            className="text-[13.5px] tracking-[0.06em] text-stone"
            style={{ fontFamily: "var(--font-jp-display)" }}
          >
            Webサイト制作
          </p>
        </div>
        <div>
          <p
            className="text-[13.5px] tracking-[0.06em] text-stone"
            style={{ fontFamily: "var(--font-jp-display)" }}
          >
            月額運用プラン(以下を含む)
          </p>
          <ul className="mt-2 space-y-1.5">
            <li>サーバー・ドメイン管理</li>
            <li>軽微な修正対応(月3回まで、1回あたり30分以内)</li>
            <li>施工事例の追加(月1件、写真および文章)</li>
            <li>Googleマップ最適化(MEO)運用(月4回投稿、口コミ返信対応)</li>
            <li>月次レポートの提供</li>
          </ul>
        </div>
        <div>
          <p
            className="text-[13.5px] tracking-[0.06em] text-stone"
            style={{ fontFamily: "var(--font-jp-display)" }}
          >
            別途お見積もりとなるサービス
          </p>
          <ul className="mt-2 space-y-1.5">
            <li>大幅なデザイン変更</li>
            <li>新規ページの追加</li>
            <li>ECサイト化、予約システム等の機能追加</li>
            <li>月額プラン制限回数を超える修正対応(1回 5,500円〜)</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    label: "販売価格",
    value: (
      <ul className="space-y-3">
        <li>
          初期費用: 78,000円(税抜)/ 85,800円(税込)
          <span className="block mt-1.5 text-[13px] text-stone">
            ※ 第1期パートナー(先着3社)は半額の 39,000円(税抜)/ 42,900円(税込)にて提供
          </span>
        </li>
        <li>月額運用費: 4,980円(税抜)/ 5,478円(税込)</li>
      </ul>
    ),
  },
  {
    label: "商品代金以外に必要な費用",
    value: (
      <ul className="space-y-2">
        <li>銀行振込手数料(お客様負担)</li>
        <li>独自ドメイン取得費(年間 1,500円〜3,000円程度、実費)</li>
      </ul>
    ),
  },
  {
    label: "支払方法",
    value: "銀行振込のみ。ご契約後、当方より振込先をご案内いたします。",
  },
  {
    label: "支払時期",
    value: (
      <div className="space-y-5">
        <div>
          <p
            className="text-[13.5px] tracking-[0.06em] text-stone"
            style={{ fontFamily: "var(--font-jp-display)" }}
          >
            初期費用
          </p>
          <ul className="mt-2 space-y-1.5">
            <li>ご契約時に 50%(着手金)</li>
            <li>サイト公開時に残り 50%</li>
          </ul>
        </div>
        <div>
          <p
            className="text-[13.5px] tracking-[0.06em] text-stone"
            style={{ fontFamily: "var(--font-jp-display)" }}
          >
            月額運用費
          </p>
          <ul className="mt-2 space-y-1.5">
            <li>サイト公開月の翌月より発生</li>
            <li>当月末締め、翌月末日までにお振込みください</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    label: "役務の提供時期",
    value: (
      <ul className="space-y-2">
        <li>Webサイト制作: ご契約後、約4週間で公開(規模により前後します)</li>
        <li>月額運用: サイト公開月の翌月から開始</li>
      </ul>
    ),
  },
  {
    label: "解約・返金について",
    value: (
      <div className="space-y-5">
        <div>
          <p
            className="text-[13.5px] tracking-[0.06em] text-stone"
            style={{ fontFamily: "var(--font-jp-display)" }}
          >
            Webサイト制作について
          </p>
          <p className="mt-2 leading-[1.95]">
            制作着手前のキャンセルは、着手金を全額返金いたします。制作着手後のキャンセルは、進行状況に応じた実費精算となります。納品・公開後のキャンセルおよび返金はお受けできません。
          </p>
        </div>
        <div>
          <p
            className="text-[13.5px] tracking-[0.06em] text-stone"
            style={{ fontFamily: "var(--font-jp-display)" }}
          >
            月額運用プランについて
          </p>
          <ul className="mt-2 space-y-1.5">
            <li>解約をご希望の場合、希望月の前月末日までにご連絡ください</li>
            <li>解約月の月額利用料は日割り計算を行わず、満額をご請求いたします</li>
            <li>解約後30日間はサーバーを維持し、その後停止いたします</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    label: "動作環境",
    value: (
      <>
        <p className="leading-[1.95]">
          本サービスで制作するWebサイトは、以下の環境で正常に動作します。
        </p>
        <ul className="mt-3 space-y-2">
          <li>
            デスクトップ: 最新版の Google Chrome / Safari / Microsoft Edge / Firefox
          </li>
          <li>モバイル: iOS Safari(最新2バージョン)/ Android Chrome(最新版)</li>
        </ul>
      </>
    ),
  },
];

export default function CommercePage() {
  return (
    <>
      <PageHero
        eyebrow="00 / Commerce"
        title="特定商取引法に基づく表記。"
        lead={
          <>
            <span
              className="block text-[12px] tracking-[0.28em] text-stone uppercase mb-5"
              style={{
                fontFamily: "var(--font-en-display)",
                fontStyle: "italic",
              }}
            >
              A legal notice
            </span>
            本サイトおよび当サービスは、特定商取引法第11条に基づき、以下のとおり表記いたします。
          </>
        }
      />

      <section className="relative border-t border-line">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-20 md:py-28">
          <Reveal>
            <dl className="border-t border-line">
              {ROWS.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-12 gap-4 md:gap-12 border-b border-line py-7 md:py-9"
                >
                  <dt className="col-span-12 md:col-span-3">
                    <span
                      className="text-[12.5px] md:text-[13px] tracking-[0.18em] text-stone"
                      style={{ fontFamily: "var(--font-jp-display)" }}
                    >
                      {row.label}
                    </span>
                  </dt>
                  <dd className="col-span-12 md:col-span-9 -mt-2 md:mt-0 text-[14.5px] md:text-[15.5px] leading-[1.95] text-ink">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <p
              className="mt-12 md:mt-16 text-[12px] tracking-[0.18em] text-stone uppercase"
              style={{
                fontFamily: "var(--font-en-display)",
                fontStyle: "italic",
              }}
            >
              Last updated — May 2026
            </p>
            <p className="mt-2 text-[13px] text-stone">最終更新日: 2026年5月</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
