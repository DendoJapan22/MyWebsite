import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ページが見つかりません",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center">
      <div className="mx-auto max-w-[640px] px-6 md:px-10 py-24 md:py-32 text-center">
        <p className="chapter-num">— Not Found</p>

        <p
          className="mt-10 leading-none text-stone/55"
          style={{
            fontFamily: "var(--font-en-numeral)",
            fontSize: "clamp(5rem, 12vw, 8.5rem)",
            letterSpacing: "-0.04em",
          }}
        >
          404
        </p>

        <h1
          className="display-heading mt-8 md:mt-10 text-[clamp(1.6rem,3vw,2.2rem)] text-ink leading-[1.5]"
          style={{ letterSpacing: "0.04em" }}
        >
          ページが見つかりませんでした。
        </h1>

        <p
          className="mt-7 md:mt-8 text-[14.5px] md:text-[15.5px] leading-[2.05] text-ink-soft max-w-[34rem] mx-auto"
          style={{ fontFamily: "var(--font-jp-body)" }}
        >
          お探しのページは移動・削除された可能性がございます。
          <br className="hidden sm:block" />
          お手数ですが、ホームよりご覧いただけますと幸いです。
        </p>

        <div className="mt-12 md:mt-14 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            href="/"
            className="group inline-flex items-center justify-center px-8 py-4 min-h-[52px] text-[14.5px] tracking-[0.16em] font-medium transition-colors"
            style={{
              backgroundColor: "var(--color-wood)",
              color: "var(--color-paper)",
              borderRadius: "4px",
              fontFamily: "var(--font-jp-body)",
            }}
          >
            <span>ホームへ戻る</span>
            <span
              aria-hidden
              className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center px-8 py-4 min-h-[52px] text-[14.5px] tracking-[0.16em] font-medium transition-colors"
            style={{
              color: "var(--color-wood-deep)",
              border: "1.5px solid var(--color-wood)",
              borderRadius: "4px",
              fontFamily: "var(--font-jp-body)",
            }}
          >
            <span>お問い合わせ</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
