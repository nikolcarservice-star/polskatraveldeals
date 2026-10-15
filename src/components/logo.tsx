import { BRAND, SLOGANS, type Locale } from "@/lib/brand";

type Tone = "dark" | "light";
type Variant = "horizontal" | "stacked" | "mark" | "wordmark";

/**
 * POLSKA TRAVEL DEALS mark — a folded paper plane inside a badge.
 * The ring carries a gold arc (premium travel) and a short crimson arc
 * (Polish flag), so the logo stays recognisable down to 16 px.
 */
export function BrandMark({
  size = 40,
  rounded = "square",
  className = "",
  title = BRAND.name,
}: {
  size?: number;
  rounded?: "square" | "circle";
  className?: string;
  title?: string;
}) {
  const radius = rounded === "circle" ? 32 : 18;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={className}
    >
      <title>{title}</title>
      <defs>
        <linearGradient id="ptd-gold" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F3DCA6" />
          <stop offset="0.42" stopColor="#E3BD63" />
          <stop offset="1" stopColor="#A97E22" />
        </linearGradient>
        <linearGradient id="ptd-badge" x1="6" y1="4" x2="58" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#123052" />
          <stop offset="0.55" stopColor="#0B1B31" />
          <stop offset="1" stopColor="#060D18" />
        </linearGradient>
      </defs>

      <rect x="1.5" y="1.5" width="61" height="61" rx={radius} fill="url(#ptd-badge)" />
      <rect
        x="1.5"
        y="1.5"
        width="61"
        height="61"
        rx={radius}
        fill="none"
        stroke="url(#ptd-gold)"
        strokeWidth="2.2"
      />
      <path
        d="M 26.97 60.56 A 29 29 0 0 1 4.75 41.92"
        fill="none"
        stroke="#D4213D"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <g>
        <path d="M 53 11 L 11.5 30.4 L 27.6 37.2 Z" fill="url(#ptd-gold)" />
        <path d="M 53 11 L 33.4 53 L 27.6 37.2 Z" fill="#FFFDF7" />
        <path d="M 53 11 L 27.6 37.2" stroke="#0B1220" strokeWidth="1.6" strokeLinejoin="round" />
      </g>

      <path
        d="M 13.5 46.5 h 9.5"
        stroke="#FFFFFF"
        strokeOpacity="0.5"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M 13.5 52.5 h 6"
        stroke="#D4213D"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  locale,
  variant = "horizontal",
  tone = "dark",
  markSize = 42,
  showTagline = true,
  className = "",
}: {
  locale: Locale;
  variant?: Variant;
  tone?: Tone;
  markSize?: number;
  showTagline?: boolean;
  className?: string;
}) {
  const primary = tone === "dark" ? "text-ink-950" : "text-white";
  const secondary = tone === "dark" ? "text-navy-700" : "text-gold-300";

  if (variant === "mark") {
    return <BrandMark size={markSize} className={className} />;
  }

  const wordmark = (
    <span className="flex flex-col leading-none">
      <span className={`flex flex-wrap items-baseline gap-x-2 ${primary}`}>
        <span className="font-display text-[1.32em] font-semibold tracking-[-0.015em]">
          Polska
        </span>
        <span className="font-sans text-[0.72em] font-semibold uppercase tracking-[0.34em] gold-text">
          Travel Deals
        </span>
      </span>
      {showTagline ? (
        <span
          className={`mt-1.5 font-sans text-[0.42em] font-medium uppercase tracking-[0.2em] ${secondary}`}
        >
          {SLOGANS[locale]}
        </span>
      ) : null}
    </span>
  );

  if (variant === "wordmark") {
    return <div className={`text-[1rem] ${className}`}>{wordmark}</div>;
  }

  return (
    <span
      className={`flex items-center gap-3 ${variant === "stacked" ? "flex-col text-center" : ""} ${className}`}
    >
      <BrandMark size={markSize} />
      <span className="text-[1rem]">{wordmark}</span>
    </span>
  );
}
