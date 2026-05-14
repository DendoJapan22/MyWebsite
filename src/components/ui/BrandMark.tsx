import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  ariaLabel?: string;
};

/**
 * Drasil Digital brand mark: a roof-and-beam glyph evoking 棟木 and 梁.
 * Drawn at 48×48 viewport; scales via Tailwind size utilities.
 */
export function BrandMark({ className, ariaLabel }: Props) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={cn("block", className)}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      {/* Roof — two angled rafters meeting at the peak */}
      <path d="M6 26 L24 9 L42 26" />
      {/* Top ridge dot — a small brass-like accent at the peak */}
      <circle cx="24" cy="9" r="1.1" fill="currentColor" stroke="none" />
      {/* Main beam (棟木) */}
      <line x1="4" y1="31" x2="44" y2="31" />
      {/* Two posts (柱) descending from the beam */}
      <line x1="14" y1="31" x2="14" y2="42" />
      <line x1="34" y1="31" x2="34" y2="42" />
      {/* A floor-line tying it back to the ground */}
      <line x1="10" y1="42" x2="38" y2="42" strokeOpacity="0.55" />
    </svg>
  );
}
