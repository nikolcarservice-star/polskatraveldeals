import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { DEFAULT_LOCALE, localizedPath, type Locale } from "@/lib/brand";
import { DESTINATIONS } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { LEGAL_SECTION_KEY, LEGAL_SLUGS } from "@/content/legal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const dict = getDictionary(lang);
  return buildMetadata({
    locale: lang,
    title: dict.sitemap.title,
    description: dict.sitemap.description,
    path: "/sitemap",
  });
}

export default async function SitemapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const dict = getDictionary(lang);

  const groups: { title: string; links: { href: string; label: string }[] }[] = [
    {
      title: dict.nav.destinations,
      links: [
        { href: "/", label: dict.notFound.home },
        { href: "/tours", label: dict.nav.tours },
        { href: "/flights", label: dict.nav.flights },
        { href: "/hotels", label: dict.nav.hotels },
        { href: "/excursions", label: dict.nav.excursions },
        { href: "/destinations", label: dict.destinations.title },
        { href: "/search", label: dict.nav.search },
      ],
    },
    {
      title: dict.footer.company,
      links: [
        { href: "/about", label: dict.nav.about },
        { href: "/contact", label: dict.nav.contact },
        { href: "/newsletter", label: dict.footer.newsletterTitle },
        { href: "/sitemap", label: dict.footer.sitemap },
      ],
    },
    {
      title: dict.nav.legal,
      links: LEGAL_SLUGS.map((slug) => ({
        href: `/legal/${slug}`,
        label: dict.legal.sections[LEGAL_SECTION_KEY[slug]],
      })),
    },
    {
      title: dict.destinations.title,
      links: DESTINATIONS.map((destination) => ({
        href: `/destinations/${destination.slug}`,
        label: destination.name[lang],
      })),
    },
  ];

  return (
    <>
      <section className="bg-navy-900 pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="container-page flex flex-col gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
            {dict.footer.sitemap}
          </p>
          <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {dict.sitemap.title}
          </h1>
        </div>
      </section>

      <section className="container-page grid gap-8 py-14 sm:grid-cols-2 md:py-20 lg:grid-cols-3">
        {groups.map((group) => (
          <div key={group.title} className="surface-card p-6">
            <h2 className="mb-4 font-display text-xl font-semibold text-ink-950">
              {group.title}
            </h2>
            <ul className="flex flex-col gap-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localizedPath(lang, link.href)}
                    className="text-sm text-ink-700 underline-offset-4 transition hover:text-navy-700 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}
