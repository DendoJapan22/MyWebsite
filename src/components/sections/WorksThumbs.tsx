export function ThumbHouse() {
  return (
    <svg
      viewBox="0 0 320 240"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <rect width="320" height="240" fill="var(--color-paper-deep)" />
      <g
        stroke="var(--color-line-strong)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="square"
      >
        <path d="M60 175 L60 105 L160 50 L260 105 L260 175 Z" />
        <path d="M60 175 L260 175" />
        <path d="M140 175 L140 130 L180 130 L180 175" />
        <path d="M85 150 L120 150 L120 120 L85 120 Z" />
        <path d="M200 150 L235 150 L235 120 L200 120 Z" />
        <path d="M102 120 L102 150 M218 120 L218 150" />
      </g>
      <line
        x1="160"
        y1="50"
        x2="160"
        y2="35"
        stroke="var(--color-accent)"
        strokeWidth="1"
      />
    </svg>
  );
}

export function ThumbReform() {
  return (
    <svg
      viewBox="0 0 320 240"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <rect width="320" height="240" fill="var(--color-paper-deep)" />
      <g stroke="var(--color-line-strong)" strokeWidth="1" fill="none">
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 7 }).map((_, c) => (
            <rect
              key={`${r}-${c}`}
              x={40 + c * 35}
              y={40 + r * 32}
              width="35"
              height="32"
            />
          ))
        )}
      </g>
      <rect
        x="145"
        y="104"
        width="35"
        height="32"
        fill="var(--color-accent)"
        opacity="0.85"
        transform="rotate(8 162.5 120)"
      />
    </svg>
  );
}

export function ThumbStudio() {
  return (
    <svg
      viewBox="0 0 320 240"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <rect width="320" height="240" fill="var(--color-paper-deep)" />
      <g
        stroke="var(--color-line-strong)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="square"
      >
        <circle cx="160" cy="125" r="62" />
        <line x1="60" y1="187" x2="260" y2="187" />
        <line x1="160" y1="63" x2="160" y2="187" />
        <line x1="98" y1="125" x2="222" y2="125" />
      </g>
      <circle cx="160" cy="125" r="3.5" fill="var(--color-accent)" />
    </svg>
  );
}

export const WORKS_THUMBS = [ThumbHouse, ThumbReform, ThumbStudio];
