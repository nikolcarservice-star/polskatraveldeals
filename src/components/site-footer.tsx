import Link from "next/link";
import { BRAND, localizedPath, type Locale } from "@/lib/brand";
import { Logo } from "@/components/logo";
import type { Dictionary } from "@/i18n/dictionaries";
import { IMAGE_CREDITS } from "@/lib/data";

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const link = (href: string) => localizedPath(locale, href);

  const columns: { title: string; items: { href: string; label: string }[] }[] = [
    {
      title: dict.footer.explore,
      items: [
        { href: "/tours", label: dict.nav.tours },
        { href: "/flights", label: dict.nav.flights },
        { href: "/hotels", label: dict.nav.hotels },
        { href: "/excursions", label: dict.nav.excursions },
        { href: "/destinations", label: dict.nav.destinations },
      ],
    },
    {
      title: dict.footer.company,
      items: [
        { href: "/about", label: dict.nav.about },
        { href: "/contact", label: dict.nav.contact },
        { href: "/newsletter", label: dict.footer.newsletterTitle },
      ],
    },
    {
      title: dict.footer.legal,
      items: [
        { href: "/legal/regulamin", label: dict.legal.sections.terms },
        { href: "/legal/polityka-prywatnosci", label: dict.legal.sections.privacy },
        { href: "/legal/polityka-cookies", label: dict.legal.sections.cookies },
        { href: "/legal/ujawnienie-afiliacyjne", label: dict.legal.sections.affiliate },
        { href: "/legal/nota-prawna", label: dict.legal.sections.imprint },
      ],
    },
  ];

  return (
    <footer className="mt-24 bg-ink-950 text-ivory-200">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <div className="text-[0.7rem]">
            <Logo locale={locale} tone="light" markSize={46} showTagline />
          </div>
          <p className="mt-6 text-sm leading-relaxed text-ivory-300/75">
            {dict.footer.disclaimer}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={BRAND.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-2 text-sm font-semibold text-gold-300 transition hover:bg-gold-500/20"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M21.9 4.3 18.7 19.4c-.24 1.07-.88 1.33-1.78.83l-4.93-3.64-2.38 2.29c-.26.26-.48.48-.99.48l.35-5.02 9.15-8.27c.4-.35-.09-.55-.62-.2L6.34 12.9 1.46 11.38c-1.06-.33-1.08-1.06.22-1.57L20.54 2.7c.88-.32 1.65.2 1.36 1.6Z" />
              </svg>
              {dict.footer.telegram}
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
              {col.title}
            </h3>
            <ul className="mt-5 space-y-3">
              {col.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={link(item.href)}
                    className="text-sm text-ivory-200/80 transition hover:text-gold-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-6 py-7 text-xs text-ivory-300/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND.legalName}. {dict.footer.rights}{" "}
            <span className="text-ivory-300/45">· {dict.footer.madeWith}</span>
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href={BRAND.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-gold-300">
              {BRAND.telegramHandle}
            </a>
            <a href={`mailto:${BRAND.email}`} className="hover:text-gold-300">
              {BRAND.email}
            </a>
            <Link href={link("/sitemap")} className="hover:text-gold-300">
              {dict.footer.sitemap}
            </Link>
            <span className="text-ivory-300/40">{IMAGE_CREDITS}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
