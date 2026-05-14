import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const ESSAY = [
  {
    num: "01",
    en: "Reality",
    title: "Webの上では、届いていない。",
    paragraphs: [
      "地方の工務店さまの魅力が、Web上ではうまく届いていない現実を、各地で見てきました。建てた家の写真は紙焼きアルバムに残ったまま、Googleで検索しても自社の名前が上位に出てこない。「HPはあるけれど、5年以上前に作ったまま」「業者の見積もりが30万円を超えて、踏み出せずにいる」——そんなお声を、何度もうかがってきました。",
      "加えて、職人の高齢化と後継者不足は、業界全体の喫緊の課題です。長年積み上げてきた技術と歴史を、次の世代に引き継ぐためにも、Webを通じて若い施主さまや働き手にまで届けることが、これまで以上に大切になっています。",
      "紹介や近所の口コミだけでは、これからの世代の施主さまには届きません。Webを整えることは、現役で活躍されている工務店さまにとって、明日の仕事につながる現実的な施策です。",
    ],
  },
  {
    num: "02",
    en: "Why AI",
    title: "AIに任せる部分と、人の手で仕上げる部分。",
    paragraphs: [
      "はじめに、はっきりとお伝えしておきます。ドラシルデジタルのサイトは、AIを活用して制作しています。コード生成、デザインの骨格、ページ構造の初稿——いわゆる「下地」にあたる工程は、AIの力を借りながら短期間で組み立てます。2025年以降、AIによるコード生成・デザイン補助の精度は実用水準に到達し、これまでデザイナーとエンジニアで分業し、何ヶ月もかけていた制作工程を、ひとりが指揮しながら一気通貫で進められるようになりました。",
      "一方で、人の手でしか整えられない領域があります。職人さまの仕事ぶりを伝える写真の選定、文章のニュアンス、お客様一社一社との対話、そして公開直前の最終調整。こうした「最後のひと手間」は、必ず私自身の手で、一枚一枚・一文一文確かめながら仕上げております。代々受け継いでこられた仕事の重みに、機械任せの言葉や構図を当てるわけにはいかない——というのが、譲れない一線です。",
      "この役割分担こそが、「低価格」と「職人さまの仕事に見合うサイト」の両立を、ドラシルデジタルがお約束できる理由です。低価格は、品質を落としているのではなく、技術の進歩を価格にそのまま反映している——というのが正確な表現です。「安かろう悪かろう」ではないこと、そして職人さまの仕事に手抜きのサイトをお渡ししないことだけは、必ずお約束いたします。",
    ],
  },
  {
    num: "03",
    en: "Arrival",
    title: "東北から、神奈川西部へ。",
    paragraphs: [
      "私の生まれは東北です。雪に閉ざされる冬と、海と山に囲まれた小さな街で、十八年を過ごしました。神奈川という土地に来たのは、進学がきっかけです。最初は伊勢原行きの小田急線、丹沢の麓まで広がる住宅地、平塚で見た海。生まれ育った景色とはまったく違う風景に、少しずつ目が慣れていきました。",
      "住み始めて気付いたのは、この一帯の工務店さまが持つ、技術と歴史の確かさです。看板は派手ではなく、けれど代々受け継がれてきた仕事ぶりが、街の家並みそのものを形づくっている。秦野・伊勢原・厚木——どの街を歩いても、職人さんの手仕事に出会えます。",
      "そして同時に気付いたのが、ひとつ前の章でお話しした「Webの上で届いていない」現実でした。外から来た人間だからこそ、その「もったいなさ」が見えてしまった、というのが正直なところです。卒業後もこの地で事業を続けながら、神奈川西部の工務店さまにとってのWebインフラを、長く担っていきたいと考えています。",
    ],
  },
  {
    num: "04",
    en: "Vision",
    title: "5年後に向けて。",
    paragraphs: [
      "ドラシルデジタルが目指しているのは、地方の工務店さまにとっての「Webの相談相手」であり続けることです。サイトを作って終わり、ではなく、月々の運用、検索順位、施工事例の追加までを、一つの料金体系のなかで継続的にお手伝いする。",
      "5年後、地方の工務店さまが、Webからも安定して声を受けられるようになる。地域の住宅文化が、Web上でもしっかりと記録され、未来へ伝わっていく。そんな状態をつくれたら、と願っています。",
      "そのためには、まず初期のパートナーとして、3社の工務店さまと深くご一緒する必要があります。お声がけ、心よりお待ちしております。",
    ],
  },
];

export function AboutEssay() {
  return (
    <section className="relative overflow-x-clip border-t border-line">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-20 md:py-32">
        {/* Section heading */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-12 mb-14 md:mb-20">
          <div className="md:col-span-5">
            <Reveal>
              <p className="chapter-num">— Editorial</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-heading mt-8 text-[clamp(1.6rem,3vw,2.4rem)] text-ink leading-[1.5]">
                紹介と口コミだけでは、
                <br className="hidden sm:block" />
                もう届かない。
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:pt-2 mt-6 md:mt-0">
            <Reveal delay={0.16}>
              <p className="text-[14.5px] md:text-[15px] leading-[2.05] text-ink-soft max-w-[34rem]">
                施主が家を探す入り口は、いまやスマホです。これまで積み上げてきた仕事を次の代へ確かに渡していくために——
                ドラシルデジタルが何を考え、なぜAIを使い、どこへ向かおうとしているのか。
                すこし長くなりますが、お時間のあるときに読んでいただけたら幸いです。
              </p>
            </Reveal>
          </div>
        </div>

        {/* Essay body */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-12">
          {ESSAY.map((part, i) => {
            const separator =
              i === 0
                ? ""
                : "mt-16 md:mt-20 pt-16 md:pt-20 border-t border-line";

            const eyebrow = (
              <p
                className="text-[11px] tracking-[0.32em] text-stone uppercase"
                style={{
                  fontFamily: "var(--font-en-display)",
                  fontStyle: "italic",
                }}
              >
                {part.num} — {part.en}
              </p>
            );

            const heading = (
              <h3
                className="display-heading mt-5 md:mt-6 text-[clamp(1.5rem,2.6vw,2rem)] text-ink"
                style={{ letterSpacing: "0.04em", lineHeight: 1.5 }}
              >
                {part.title}
              </h3>
            );

            const body = (
              <div
                className="mt-8 md:mt-10 text-ink"
                style={{
                  fontFamily: "var(--font-jp-display)",
                  letterSpacing: "0.05em",
                }}
              >
                {part.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    className="text-[15.5px] md:text-[17px] mb-6 md:mb-7"
                    style={{ lineHeight: 2 }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            );

            if (part.en === "Reality") {
              return (
                <Reveal
                  key={part.num}
                  delay={0.1 + i * 0.04}
                  className="md:col-span-12"
                >
                  <article className={separator}>
                    <div className="grid grid-cols-1 md:grid-cols-12 md:gap-0 md:items-stretch">
                      {/* Left: workshop image bleeds to viewport-left, feathers right (desktop) / top+bottom (mobile) */}
                      <div className="md:col-span-5 reality-bleed-cell">
                        <div className="reality-feather relative w-full aspect-[4/3] md:aspect-auto md:h-full">
                          <Image
                            src="/images/problem-workshop.webp"
                            alt=""
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                          {/* Editorial gray overlay — sinks the image into the page tone */}
                          <div
                            aria-hidden
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              backgroundColor: "rgba(60, 60, 60, 0.18)",
                            }}
                          />
                        </div>
                      </div>

                      {/* Right: text — feather replaces the hard separator */}
                      <div className="md:col-span-7 md:pl-12 mt-2 md:mt-0 pt-2 md:pt-0">
                        {eyebrow}
                        {heading}
                        {body}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            }

            return (
              <Reveal
                key={part.num}
                delay={0.1 + i * 0.04}
                className="md:col-span-9 md:col-start-3"
              >
                <article className={separator}>
                  {eyebrow}
                  {heading}
                  {body}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
