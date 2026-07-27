"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Web3Forms のアクセスキー（これは「公開してよい」キーです。秘密のAPIキーとは別物）。
// 取得方法: https://web3forms.com/ で受信したいメールアドレスを登録 → 届いたキーを下に貼る。
// Cloudflare Pages の環境変数 NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY で差し替えても動きます。
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "d846a9f6-b2ea-4e77-a49f-55e6d15fdafa";

const SUBJECTS = [
  { value: "new", label: "新規サイト制作のご相談" },
  { value: "renewal", label: "既存サイトのリニューアル" },
  { value: "meo", label: "MEO(Googleマップ対策)に関するご相談" },
  { value: "other", label: "その他" },
] as const;

const schema = z.object({
  name: z
    .string()
    .min(1, "お名前をご入力ください。")
    .max(80, "80文字以内でご入力ください。"),
  company: z.string().max(80, "80文字以内でご入力ください。").optional(),
  phone: z
    .string()
    .min(1, "電話番号をご入力ください。")
    .regex(/^[0-9\-+\s()]{8,20}$/, "正しい電話番号をご入力ください。"),
  email: z
    .string()
    .min(1, "メールアドレスをご入力ください。")
    .email("正しいメールアドレスをご入力ください。"),
  subject: z.enum(["new", "renewal", "meo", "other"], {
    message: "ご相談内容をお選びください。",
  }),
  message: z
    .string()
    .max(2000, "2000文字以内でご入力ください。")
    .optional(),
});

type FormValues = z.infer<typeof schema>;

const fieldRow =
  "grid grid-cols-1 md:grid-cols-12 md:gap-12 border-b border-line py-8 md:py-9";
const fieldLabelCol = "md:col-span-3 flex flex-col gap-2";
const fieldEnLabel =
  "text-[11px] tracking-[0.32em] text-stone uppercase";
const fieldJpLabel = "text-[14px] tracking-[0.18em] text-ink-soft";
const requiredBadge =
  "inline-block ml-2 text-[10px] tracking-[0.12em] text-accent uppercase align-middle";
const optionalBadge =
  "inline-block ml-2 text-[10px] tracking-[0.12em] text-stone uppercase align-middle";
const fieldInputCol = "md:col-span-9 mt-3 md:mt-0";
const inputCls =
  "w-full bg-transparent border-0 border-b border-line-strong text-[16px] md:text-[17px] text-ink py-3 outline-none transition-colors duration-300 focus:border-accent placeholder:text-stone/60";
const errorCls = "mt-3 text-[12.5px] tracking-[0.04em] text-accent";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      company: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setError(null);

    const subjectLabel =
      SUBJECTS.find((s) => s.value === data.subject)?.label ?? data.subject;

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `【ドラシルデジタル】お問い合わせ（${subjectLabel}）`,
          from_name: "ドラシルデジタル お問い合わせフォーム",
          // 送信者のアドレスを返信先に設定（Gmailでそのまま返信できる）
          replyto: data.email,
          botcheck: false,
          // 以下は受信メールの本文にそのまま表示される項目
          "お名前": data.name,
          "会社名・屋号": data.company || "（未記入）",
          "電話番号": data.phone,
          "メールアドレス": data.email,
          "ご相談内容": subjectLabel,
          "詳細メッセージ": data.message || "（未記入）",
        }),
      });

      const result = await res.json();

      if (result.success) {
        setSubmitted(true);
        reset();
      } else {
        setError(
          "送信に失敗しました。お手数ですが、お電話またはメールで直接ご連絡ください。"
        );
      }
    } catch {
      setError(
        "通信エラーが発生しました。お手数ですが、お電話またはメールで直接ご連絡ください。"
      );
    }
  };

  if (submitted) {
    return (
      <div
        className="border-y border-line py-20 md:py-28 text-center"
        style={{
          fontFamily: "var(--font-jp-display)",
          letterSpacing: "0.04em",
        }}
      >
        <p
          className="text-[11px] tracking-[0.32em] text-accent uppercase"
          style={{
            fontFamily: "var(--font-en-display)",
            fontStyle: "italic",
          }}
        >
          Thank you
        </p>
        <h3 className="display-heading mt-6 text-[clamp(1.5rem,3vw,2.2rem)] text-ink">
          お送りいただき、ありがとうございました。
        </h3>
        <p className="mt-8 max-w-[36rem] mx-auto text-[14.5px] md:text-[15px] leading-[2.05] text-ink-soft">
          内容を確認のうえ、1〜2営業日以内にご返信いたします。
          <br />
          すぐお話しされたい場合は、お電話でもご連絡いただけます。
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-12 inline-flex items-center gap-3 text-[13px] tracking-[0.18em] text-ink"
        >
          <span className="link-underline">もう一度送る</span>
          <span aria-hidden className="text-accent">
            →
          </span>
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="border-t border-line"
      style={{
        fontFamily: "var(--font-jp-display)",
      }}
    >
      {/* お名前 */}
      <div className={fieldRow}>
        <div className={fieldLabelCol}>
          <span
            className={fieldEnLabel}
            style={{
              fontFamily: "var(--font-en-display)",
              fontStyle: "italic",
            }}
          >
            Name
          </span>
          <span className={fieldJpLabel}>
            お名前
            <span className={requiredBadge}>必須</span>
          </span>
        </div>
        <div className={fieldInputCol}>
          <input
            type="text"
            autoComplete="name"
            placeholder="山田 太郎"
            aria-invalid={!!errors.name}
            className={inputCls}
            {...register("name")}
          />
          {errors.name && <p className={errorCls}>{errors.name.message}</p>}
        </div>
      </div>

      {/* 会社名 */}
      <div className={fieldRow}>
        <div className={fieldLabelCol}>
          <span
            className={fieldEnLabel}
            style={{
              fontFamily: "var(--font-en-display)",
              fontStyle: "italic",
            }}
          >
            Company
          </span>
          <span className={fieldJpLabel}>
            会社名・屋号
            <span className={optionalBadge}>任意</span>
          </span>
        </div>
        <div className={fieldInputCol}>
          <input
            type="text"
            autoComplete="organization"
            placeholder="◯◯工務店"
            aria-invalid={!!errors.company}
            className={inputCls}
            {...register("company")}
          />
          {errors.company && (
            <p className={errorCls}>{errors.company.message}</p>
          )}
        </div>
      </div>

      {/* 電話番号 */}
      <div className={fieldRow}>
        <div className={fieldLabelCol}>
          <span
            className={fieldEnLabel}
            style={{
              fontFamily: "var(--font-en-display)",
              fontStyle: "italic",
            }}
          >
            Phone
          </span>
          <span className={fieldJpLabel}>
            電話番号
            <span className={requiredBadge}>必須</span>
          </span>
        </div>
        <div className={fieldInputCol}>
          <input
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="090-0000-0000"
            aria-invalid={!!errors.phone}
            className={inputCls}
            {...register("phone")}
          />
          {errors.phone && <p className={errorCls}>{errors.phone.message}</p>}
        </div>
      </div>

      {/* メール */}
      <div className={fieldRow}>
        <div className={fieldLabelCol}>
          <span
            className={fieldEnLabel}
            style={{
              fontFamily: "var(--font-en-display)",
              fontStyle: "italic",
            }}
          >
            Email
          </span>
          <span className={fieldJpLabel}>
            メールアドレス
            <span className={requiredBadge}>必須</span>
          </span>
        </div>
        <div className={fieldInputCol}>
          <input
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="info@example.com"
            aria-invalid={!!errors.email}
            className={inputCls}
            {...register("email")}
          />
          {errors.email && <p className={errorCls}>{errors.email.message}</p>}
        </div>
      </div>

      {/* ご相談内容 */}
      <div className={fieldRow}>
        <div className={fieldLabelCol}>
          <span
            className={fieldEnLabel}
            style={{
              fontFamily: "var(--font-en-display)",
              fontStyle: "italic",
            }}
          >
            Subject
          </span>
          <span className={fieldJpLabel}>
            ご相談内容
            <span className={requiredBadge}>必須</span>
          </span>
        </div>
        <div className={fieldInputCol}>
          <fieldset className="space-y-4 mt-1">
            <legend className="sr-only">ご相談内容</legend>
            {SUBJECTS.map((s) => (
              <label
                key={s.value}
                className="group/radio flex items-start gap-4 cursor-pointer"
              >
                <input
                  type="radio"
                  value={s.value}
                  className="peer sr-only"
                  {...register("subject")}
                />
                <span
                  aria-hidden
                  className="mt-[7px] inline-block size-[14px] shrink-0 rounded-full border border-line-strong transition-all duration-300 group-hover/radio:border-accent peer-checked:border-accent peer-checked:bg-accent peer-checked:shadow-[inset_0_0_0_3px_var(--color-paper)] peer-focus-visible:ring-2 peer-focus-visible:ring-accent/30 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-paper"
                />
                <span className="text-[14.5px] md:text-[15px] tracking-[0.04em] text-ink leading-[1.6] transition-colors duration-300 peer-checked:text-accent">
                  {s.label}
                </span>
              </label>
            ))}
          </fieldset>
          {errors.subject && (
            <p className={errorCls}>{errors.subject.message}</p>
          )}
        </div>
      </div>

      {/* 詳細メッセージ */}
      <div className={fieldRow}>
        <div className={fieldLabelCol}>
          <span
            className={fieldEnLabel}
            style={{
              fontFamily: "var(--font-en-display)",
              fontStyle: "italic",
            }}
          >
            Message
          </span>
          <span className={fieldJpLabel}>
            詳細メッセージ
            <span className={optionalBadge}>任意</span>
          </span>
        </div>
        <div className={fieldInputCol}>
          <textarea
            rows={6}
            placeholder="ご検討中の時期、参考にされているサイト、ご予算など、お差し支えない範囲でお書きください。"
            aria-invalid={!!errors.message}
            className="w-full bg-transparent border border-line-strong text-[15.5px] md:text-[16px] leading-[2] text-ink p-5 outline-none transition-colors duration-300 focus:border-accent placeholder:text-stone/60 resize-y"
            style={{ borderRadius: "2px" }}
            {...register("message")}
          />
          {errors.message && (
            <p className={errorCls}>{errors.message.message}</p>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="grid grid-cols-1 md:grid-cols-12 md:gap-12 pt-10 md:pt-14">
        <div className="md:col-span-3" />
        <div className="md:col-span-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-6 sm:gap-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex items-center justify-center px-10 py-4 bg-accent text-paper text-[14px] tracking-[0.18em] hover:bg-[var(--color-accent-deep)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ borderRadius: "4px" }}
          >
            <span>{isSubmitting ? "送信しています…" : "内容を送る"}</span>
            {!isSubmitting && (
              <span
                aria-hidden
                className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            )}
          </button>
          <p className="text-[12.5px] tracking-[0.06em] text-stone leading-[1.85]">
            ご記入いただいた情報を、第三者に提供することはありません。
          </p>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-8 text-[13.5px] tracking-[0.04em] text-accent leading-[1.9]"
        >
          {error}
        </p>
      )}
    </form>
  );
}
