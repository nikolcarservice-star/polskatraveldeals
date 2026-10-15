"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { localizedPath, type Locale } from "@/lib/brand";
import type { Dictionary } from "@/i18n/dictionaries";

const KEY = "ptd-cookie-consent";
const EVENT = "ptd-cookie-consent-changed";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(EVENT, onStoreChange);
  return () => window.removeEventListener(EVENT, onStoreChange);
}

function getSnapshot(): string | null {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function getServerSnapshot(): null {
  return null;
}

function write(value: "all" | "essential") {
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    /* storage unavailable — the bar simply stays dismissed for this session */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function CookieBar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (stored !== null) return null;

  return (
    <div
      role="region"
      aria-label={dict.cookieBar.text.slice(0, 40)}
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-white/10 bg-ink-950/95 p-5 text-ivory-100 shadow-lift backdrop-blur-xl sm:flex-row sm:items-center">
        <p className="flex-1 text-sm leading-relaxed text-ivory-200/85">
          {dict.cookieBar.text}{" "}
          <Link
            href={localizedPath(locale, "/legal/polityka-cookies")}
            className="font-semibold text-gold-300 underline underline-offset-4"
          >
            {dict.cookieBar.more}
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => write("essential")}
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-ivory-100 transition hover:bg-white/10"
          >
            {dict.cookieBar.decline}
          </button>
          <button
            type="button"
            onClick={() => write("all")}
            className="rounded-full bg-gold-500 px-5 py-2 text-sm font-bold text-ink-950 transition hover:bg-gold-400"
          >
            {dict.cookieBar.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
