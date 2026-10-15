import Link from "next/link";
import { DEFAULT_LOCALE, localizedPath } from "@/lib/brand";
import { getDictionary } from "@/i18n/dictionaries";

export default function NotFound() {
  const dict = getDictionary(DEFAULT_LOCALE);

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-600">404</p>
      <h1 className="mt-4 font-display text-4xl font-semibold text-ink-950 sm:text-5xl">
        {dict.notFound.title}
      </h1>
      <p className="mt-4 max-w-md text-ink-700">{dict.notFound.text}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href={localizedPath(DEFAULT_LOCALE, "/")}
          className="rounded-full bg-navy-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-700"
        >
          {dict.notFound.home}
        </Link>
        <Link
          href={localizedPath(DEFAULT_LOCALE, "/#szukaj")}
          className="rounded-full border border-ink-900/15 bg-white px-6 py-3 text-sm font-semibold text-ink-900 transition hover:border-navy-700 hover:text-navy-800"
        >
          {dict.notFound.search}
        </Link>
      </div>
    </div>
  );
}
