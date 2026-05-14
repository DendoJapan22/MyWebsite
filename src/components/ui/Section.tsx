import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SectionSpacing = "large" | "medium" | "tight";

// Each value is the gap BEFORE this section (its top padding).
// Mobile = 60% of desktop per the rhythm spec.
const SPACING_TOP: Record<SectionSpacing, string> = {
  large: "pt-24 md:pt-40", // 96px / 160px
  medium: "pt-[72px] md:pt-[120px]", // 72px / 120px
  tight: "pt-12 md:pt-20", // 48px / 80px
};

export interface SectionProps {
  id?: string;
  spacing: SectionSpacing;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}

export function Section({
  id,
  spacing,
  className,
  innerClassName,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn("relative", className)}>
      <div
        className={cn(
          "mx-auto max-w-[1200px] px-6 md:px-10",
          SPACING_TOP[spacing],
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
