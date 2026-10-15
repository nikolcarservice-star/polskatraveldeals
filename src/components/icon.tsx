const PATHS: Record<string, string> = {
  compare: "M4 6h6M4 12h9M4 18h6M14 4l3 3-3 3M20 14l-3 3 3 3",
  tag: "M4 11V5a1 1 0 0 1 1-1h6l8 8-7 7-8-8Zm3.5-4.5h.01",
  shield: "M12 3l7 3v5c0 4.4-3 8.2-7 10-4-1.8-7-5.6-7-10V6l7-3Zm-3 9 2 2 4-4",
  headset: "M5 13v-1a7 7 0 0 1 14 0v1M4 13h2v5H5a1 1 0 0 1-1-1v-3Zm16 0h-2v5h1a1 1 0 0 0 1-1v-3Z",
  lock: "M7 11V8a5 5 0 0 1 10 0v3M5 11h14v9H5v-9Zm7 4v2",
  device: "M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm3 15h4",
  check: "M4 12.5 9 17.5 20 6.5",
  star: "M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8-4.3-4.1 5.9-.9L12 3.5Z",
  plane: "M2.5 12.5 21 4l-4 17-4.5-6.5L2.5 12.5Z",
  bed: "M3 18v-6a2 2 0 0 1 2-2h9a4 4 0 0 1 4 4v4M3 14h18M3 18h18M7 10V7h4v3",
  ticket: "M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a2 2 0 0 0 0 6v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1a2 2 0 0 0 0-6V8Zm10-2v12",
  map: "M9 4 3 6.5v14L9 18l6 2.5 6-2.5v-14L15 6.5 9 4Zm0 0v14m6-11.5v14",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-14v5l3 2",
};

export type IconName = keyof typeof PATHS;

export function Icon({
  name,
  size = 22,
  className = "",
  strokeWidth = 1.7,
}: {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const d = PATHS[name] ?? PATHS.check;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d={d}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
