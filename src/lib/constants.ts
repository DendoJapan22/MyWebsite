export const SITE_CONFIG = {
  name: "ドラシルデジタル",
  nameEn: "Drasil Digital",
  parentName: "Drasil",
  parentNameJp: "ドラシル",
  tagline: "地方の工務店専門のWeb制作。",
  description: "地方の工務店向けWebサイト制作・集客運用",
  url: "https://drasil.jp",
  email: "info@drasil.jp",
  phone: "080-1553-6788",
  phoneTel: "+818015536788",
  area: "全国対応(オンライン打ち合わせ)",
  areaList: ["全国"],
} as const;

export const PRICING = {
  initial: 22000,
  initialTaxIn: 24200,
  monthly: 3980,
  monthlyTaxIn: 4378,
  contractMonths: 12,
} as const;

export const SERVICE_INCLUDES_INITIAL: readonly string[] = [
  "サイト制作(必要なボリュームで一式)",
  "ドメイン取得",
  "Google設定",
  "Googleビジネスプロフィール構築(MEO初期最適化)",
  "公開作業",
];

export const SERVICE_INCLUDES_MONTHLY: readonly {
  label: string;
  note?: string;
}[] = [
  { label: "サーバー・ドメイン管理" },
  { label: "軽微な修正", note: "月2回まで" },
  { label: "施工事例の追加", note: "月1件" },
  { label: "月次レポート" },
];

export const NAV_ITEMS = [
  { href: "/#service", label: "サービス", labelEn: "Service" },
  { href: "/#price", label: "料金", labelEn: "Price" },
  { href: "/#works", label: "実績", labelEn: "Works" },
  { href: "/#faq", label: "FAQ", labelEn: "FAQ" },
  { href: "/#contact", label: "お問い合わせ", labelEn: "Contact" },
] as const;

export const LEGAL_LINKS = [
  { href: "/about", label: "Drasilについて" },
  { href: "/legal/commerce", label: "特定商取引法に基づく表記" },
] as const;

export const SERVICES = [
  {
    number: "01",
    title: "低コスト・高品質サイト制作",
    titleEn: "Web Production",
    image: "/images/service-drafting-opt.webp",
    description:
      "ベース設計とコード生成はAIで効率化、デザインの最終調整と文章の仕上げは必ず人の手で。従来30〜100万円かかっていた制作を、品質を落とさず抑えた価格でご提供いたします。",
  },
  {
    number: "02",
    title: "MEO初期構築(Googleマップ対策)",
    titleEn: "Local SEO Setup",
    image: "/images/service-map-opt.webp",
    description:
      "「お住まいの地域名 + 工務店」「地域名 + リフォーム」などの検索で上位表示の土台を整えます。サイト公開と同時に、Googleビジネスプロフィールの新規作成・基本情報の整備・カテゴリ最適化・初回写真登録までを一括で対応いたします。公開後の月次投稿運用は含みません。",
  },
  {
    number: "03",
    title: "施工事例の継続更新",
    titleEn: "Ongoing Updates",
    image: "/images/service-photos-opt.webp",
    description:
      "スマートフォンで撮影された写真をお送りいただくだけで、毎月1件、施工事例ページを追加いたします。写真の選定と紹介文の最終仕上げは、必ず人の手で行います。",
  },
] as const;

export const PROBLEMS = [
  "紹介客から「HPないんですか?」と聞かれることが増えた。",
  "同業他社のサイトを見ると、自社が見劣りする気がする。",
  "業者の見積もりが30万円以上で、躊躇している。",
  "既存サイトが古く、スマホで見づらい。",
  "Googleマップで上位に出てこない。",
] as const;

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "無料相談・ヒアリング",
    duration: "60分",
    description:
      "事業内容、現状の課題、ご要望をうかがいます。お電話でもオンラインでも、ご都合に合わせて。",
  },
  {
    number: "02",
    title: "デザイン提案",
    duration: "1週間",
    description:
      "ヒアリング内容をもとに、初稿のデザインを作成します。文章の方向性もこの段階でご相談します。",
  },
  {
    number: "03",
    title: "制作・修正",
    duration: "2〜3週間",
    description:
      "コーディング、写真整理、文章校正までこちらで進めます。途中で2回まで修正をお受けします。",
  },
  {
    number: "04",
    title: "公開・運用開始",
    duration: "—",
    description:
      "ドメイン取得、Google設定、公開作業をすべてこちらで行い、当日から運用を開始します。",
  },
] as const;

export const FAQ_ITEMS = [
  {
    q: "本当にこの価格でサイトが作れるのですか?",
    a: "はい。最新のAI技術を活用することで、従来は数十万円かかっていた工程を大幅に圧縮しています。品質は大手制作会社と同等水準を担保いたします。",
  },
  {
    q: "AIで制作したサイトでも、品質は大丈夫ですか?",
    a: "ご安心ください。AIを使うのはコード生成・デザインの骨格・初稿作成といった「下地」の工程に限ります。写真の選定、文章のニュアンス、お客様との対話、そして公開直前の最終調整は、必ず人の手で一枚一枚確かめながら仕上げております。「安かろう悪かろう」ではなく、技術の進歩を価格にそのまま反映している——というのが正確な表現です。",
  },
  {
    q: "途中解約はできますか?",
    a: "月額運用は12ヶ月のご契約をお願いしておりますが、特別なご事情がある場合は個別にご相談ください。",
  },
  {
    q: "ドメインとサイトデータの所有権は、どちらにありますか? 解約後はどうなりますか?",
    a: "ドメインは取得時から工務店さまの名義で取得し、所有権はお客様にございます。サイトデータ(コード・画像・テキスト)も同様にお客様の資産です。万一ご解約となった場合は、ドメインとサイト一式をそのままお引き渡しいたしますので、他社さまでも継続して運用いただけます。",
  },
  {
    q: "ドメイン・サーバーは別料金ですか?",
    a: "初期費用に独自ドメインの取得費(1年分)が含まれております。サーバー代は月額運用費に含まれます。2年目以降のドメイン更新費のみ別途、年1,500円ほどでご請求いたします。",
  },
  {
    q: "対応エリアはどこまでですか?",
    a: "全国の工務店さまに対応しております。お打ち合わせはオンラインで承りますので、地方でもお気軽にご相談ください。",
  },
  {
    q: "施工事例の写真は、こちらで撮影が必要ですか?",
    a: "はい。スマートフォンで撮影されたお写真で十分です。撮影のコツも事前にお伝えします。プロカメラマンの手配も別料金でご相談を承ります。",
  },
  {
    q: "既存のサイトからのリニューアルにも対応していますか?",
    a: "対応しております。既存ページの内容を活かしつつ、デザイン・構成を整えて新しいサイトに作り直します。お見積もりは無料です。",
  },
  {
    q: "MEO(Googleマップ最適化)はどこまで対応していただけますか?",
    a: "初期費用に含まれる範囲で、Googleビジネスプロフィールの新規作成および初期最適化(基本情報の整備、業種カテゴリの選定、初回写真の登録など)まで対応いたします。公開後の継続的な投稿運用・口コミ返信などの月次MEO運用は、現在のプランには含まれておりません。ご希望の場合は別途お見積もりにてお受けいたします。",
  },
] as const;

export type WorkStatus = "sample" | "preparing";

export interface WorkSample {
  title: string;
  industry: string;
  description: string;
  status: WorkStatus;
  url?: string;
  image?: string;
  imageAlt?: string;
}

export const WORKS_SAMPLES: readonly WorkSample[] = [
  {
    title: "鈴木工務店(サンプル)",
    industry: "工務店 / 地方の小規模事業者向け",
    description:
      "地方の工務店さまをモデルに制作したサンプルサイト。ドラシルデジタルの制作品質を、実際のページとしてご確認いただけます。",
    status: "sample",
    url: "https://koumuten-suzuki.vercel.app/",
    image: "/images/works-suzuki-sample-opt.webp",
    imageAlt: "鈴木工務店 サンプルサイトのヒーローセクション",
  },
  {
    title: "次の工務店さま、募集中",
    industry: "リフォーム業 / 地方の小規模事業者向け",
    description:
      "第1期パートナー(先着3社)の2社目として、ご一緒する工務店さまをお待ちしています。",
    status: "preparing",
  },
  {
    title: "次の工務店さま、募集中",
    industry: "建築設計事務所 / 地方の小規模事業者向け",
    description:
      "第1期パートナー(先着3社)の3社目として、ご一緒する工務店さまをお待ちしています。",
    status: "preparing",
  },
];

export const WORKS_DISCLAIMER =
  "※ 掲載中の制作実績は、ドラシルデジタルが制作品質をお示しするためのサンプル(架空のもの)です。実在する企業さまのサイトではございません。";
