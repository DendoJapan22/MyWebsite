import { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
};

export function PageHero({ eyebrow, title, lead }: Props) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 pt-32 md:pt-44 pb-16 md:pb-24">
        <Reveal>
          <p className="chapter-num">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1
            className="display-heading mt-6 md:mt-8 text-[clamp(2.25rem,5vw,4rem)] text-ink"
            style={{ letterSpacing: "0.02em", lineHeight: 1.35 }}
          >
            {title}
          </h1>
        </Reveal>
        {lead && (
          <Reveal delay={0.16}>
            <p className="mt-8 md:mt-10 max-w-[36rem] text-[15px] md:text-[16.5px] leading-[2.05] text-ink-soft">
              {lead}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
