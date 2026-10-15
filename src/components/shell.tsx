import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-heading",
  display: "swap",
});

/**
 * Every root layout in this project (localised routes and the admin panel)
 * renders through this shell so typography and brand variables stay identical.
 */
export function DocumentShell({ lang, children }: { lang: string; children: ReactNode }) {
  return (
    <html
      lang={lang}
      className={`${inter.variable} ${playfair.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>{children}</body>
    </html>
  );
}
