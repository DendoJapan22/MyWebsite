import Image from "next/image";
import { SERVICES } from "@/lib/constants";
import { Reveal, RevealImage } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function ServicesSection() {
  return (
    <Section
      id="service"
      spacing="medium"
      className="border-t border-line scroll-mt-24"
    >
      {/* Section heading */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-12 mb-16 md:mb-24">
          <div className="md:col-span-5">
            <Reveal kind="chapter">
              <p className="chapter-num">03 / Service</p>
            </Reveal>
            <Reveal kind="heading" delay={0.1}>
              <h2 className="display-heading mt-8 text-[clamp(1.9rem,4vw,3rem)] text-ink leading-[1.4]">
                ご提供する
                <br />
                3つの柱。
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:pt-2 mt-6 md:mt-0">
            <Reveal delay={0.25}>
              <p className="text-[14.5px] md:text-[15.5px] leading-[2.05] text-ink-soft max-w-[34rem]">
                「制作して終わり」ではなく、公開後の運用までを含めた、
                工務店さまの集客の土台づくり全般を、
                ひとつの料金体系でご提供しています。
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <div className="mt-8 md:mt-10 pt-7 md:pt-9 border-t border-line/60 max-w-[34rem]">
                <p
                  className="text-[10.5px] tracking-[0.32em] uppercase mb-3.5"
                  style={{
                    fontFamily: "var(--font-en-display)",
                    fontStyle: "italic",
                    color: "var(--color-stone)",
                  }}
                >
                  — By hand
                </p>
                <p
                  className="text-[15px] md:text-[16.5px] leading-[1.95] text-ink"
                  style={{
                    fontFamily: "var(--font-jp-display)",
                    letterSpacing: "0.05em",
                  }}
                >
                  写真の選定、お客様との対話、最後のひと手間は、
                  <br className="hidden md:block" />
                  必ず人の手で。
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Service cards: 3-column (image / number / body) */}
        <div className="border-t border-line">
          {SERVICES.map((service, i) => {
            const cardDelay = 0.05 + i * 0.08;
            return (
              <article
                key={service.number}
                className="group relative grid grid-cols-1 md:grid-cols-12 md:gap-10 border-b border-line py-12 md:py-16 transition-colors duration-500 hover:bg-[var(--color-paper-deep)]/40"
              >
                {/* Image */}
                <RevealImage
                  className="md:col-span-3"
                  delay={cardDelay}
                  duration={1.0}
                >
                  <div className="service-image relative w-full md:w-[180px] aspect-[4/3] md:aspect-square">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 180px"
                      className="object-cover"
                      style={{
                        opacity: 0.92,
                        filter:
                          "grayscale(1) sepia(0.18) contrast(0.95) brightness(1.02)",
                      }}
                    />
                  </div>
                </RevealImage>

                {/* Number */}
                <Reveal
                  kind="chapter"
                  className="md:col-span-3 mt-8 md:mt-0"
                  delay={cardDelay + 0.1}
                >
                  <span
                    className="block text-[clamp(3.2rem,6vw,5rem)] leading-none text-accent"
                    style={{
                      fontFamily: "var(--font-en-display)",
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {service.number}
                  </span>
                  <span
                    className="mt-4 inline-block text-[11px] tracking-[0.28em] text-stone uppercase"
                    style={{
                      fontFamily: "var(--font-en-display)",
                      fontStyle: "italic",
                    }}
                  >
                    {service.titleEn}
                  </span>
                </Reveal>

                {/* Body */}
                <Reveal
                  className="md:col-span-6 mt-6 md:mt-3"
                  delay={cardDelay + 0.2}
                >
                  <h3
                    className="display-heading text-[clamp(1.35rem,2.4vw,1.75rem)] text-ink"
                    style={{ letterSpacing: "0.04em", lineHeight: 1.5 }}
                  >
                    {service.title}
                  </h3>
                  <p className="mt-5 max-w-[42rem] text-[14.5px] md:text-[15.5px] leading-[2.05] text-ink-soft">
                    {service.description}
                  </p>
                </Reveal>

                {/* Decorative arrow indicator on hover */}
                <span
                  aria-hidden
                  className="hidden md:block absolute right-0 top-12 text-ink-soft text-lg opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0"
                  style={{ fontFamily: "var(--font-en-display)" }}
                >
                  →
                </span>
              </article>
            );
          })}
        </div>
    </Section>
  );
}
