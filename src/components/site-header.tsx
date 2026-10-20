"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { BRAND } from "@/lib/brand";
import { Logo } from "@/components/logo";
import type { Dictionary } from "@/i18n/dictionaries";

export function SiteHeader({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";
  const segments = pathname.split("/").filter(Boolean);

  const nav = [
    { href: "/flights", label: dict.nav.flights },
    { href: "/destinations", label: dict.nav.destinations },
    { href: "/about", label: dict.nav.about },
    { href: "/contact", label: dict.nav.contact },
  ];

  const isActive = (href: string) => segments[0] === href.replace("/", "");

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-navy-900 text-ivory-100">
        <div className="container-page flex h-9 items-center justify-between gap-4 text-[11px] sm:text-xs">
          <p className="truncate font-medium tracking-wide text-gold-300">{dict.footer.tagline}</p>
          <div className="flex items-center gap-4">
            <a
              href="https://t.me/polska_travel_deals"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden shrink-0 font-semibold uppercase tracking-[0.18em] text-white/80 transition hover:text-gold-300 sm:inline"
            >
              Telegram
            </a>
          </div>
        </div>
      </div>

      <div className="border-b border-ink-900/10 bg-ivory-100/85 backdrop-blur-xl">
        <div className="container-page flex h-16 items-center justify-between gap-6 md:h-20">
          <Link
            href="/"
            aria-label={`${BRAND.name} — ${dict.footer.tagline}`}
            className="shrink-0 text-[0.62rem] sm:text-[0.72rem]"
          >
            <Logo markSize={40} showTagline={false} />
          </Link>

          <nav aria-label={dict.nav.menu} className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={[
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition",
                  isActive(item.href)
                    ? "text-navy-800"
                    : "text-ink-700 hover:bg-white hover:text-navy-800",
                ].join(" ")}
              >
                {item.label}
                {isActive(item.href) ? (
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-gold-500" />
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              href="/contact"
              className="hidden items-center rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-5 py-2.5 text-sm font-bold text-ink-950 shadow-gold transition hover:from-gold-300 hover:to-gold-500 lg:inline-flex"
            >
              {dict.nav.pickFlight}
            </Link>
            <Link
              href="/#szukaj"
              className="hidden rounded-full bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_-12px_rgb(15_47_82/0.9)] transition hover:bg-navy-700 sm:inline-flex"
            >
              {dict.nav.search}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 bg-white text-ink-900 lg:hidden"
            >
              <span className="sr-only">{open ? dict.nav.closeMenu : dict.nav.openMenu}</span>
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                {open ? (
                  <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                ) : (
                  <path d="M2.5 5h13M2.5 9h13M2.5 13h13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-ink-900/10 bg-ivory-50 lg:hidden">
            <nav aria-label={dict.nav.menu} className="container-page flex flex-col gap-1 py-4">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-ink-800 transition hover:bg-white hover:text-navy-800"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-ink-900/10 pt-4">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-5 text-sm font-bold text-ink-950 shadow-gold"
                >
                  {dict.nav.pickFlight}
                </Link>
                <a
                  href="https://t.me/polska_travel_deals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-navy-800 px-4 text-sm font-semibold text-white"
                >
                  Telegram
                </a>
              </div>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
