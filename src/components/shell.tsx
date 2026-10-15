import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  display: "swap",
});

/**
 * Root document shell (html/body) shared by the public site and the admin
 * panel so typography and brand variables stay identical.
 */
export function DocumentShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pl" className={`${inter.variable} ${playfair.variable}`} data-scroll-behavior="smooth">
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
    var script = document.createElement("script");
    script.async = 1;
    script.setAttribute("data-cmp-ab","2");
    script.src = 'https://tp-em.com/NTg2MTk3.js?t=586197';
    document.head.appendChild(script);
})();`,
          }}
          {...({
            nowprocket: "",
            "data-noptimize": "1",
            "data-cfasync": "false",
            "data-wpfc-render": "false",
            "seraph-accel-crit": "1",
            "data-no-defer": "1",
            "data-cmp-ab": "2",
          } as Record<string, string>)}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
