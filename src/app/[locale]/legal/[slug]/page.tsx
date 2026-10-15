import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { DEFAULT_LOCALE, LOCALES, localizedPath, type Locale } from "@/lib/brand";
import { buildMetadata } from "@/lib/seo";
import { getLegalDoc, isLegalSlug, LEGAL_SECTION_KEY, LEGAL_SLUGS } from "@/content/legal";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => LEGAL_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const lang: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE;
  if (!isLegalSlug(slug)) return {};
  const dict = getDictionary(lang);
  const doc = getLegalDoc(slug, lang);
  return buildMetadata({
    locale: lang,
    title: dict.legal.sections[LEGAL_SECTION_KEY[slug]],
    description: doc.intro,
    path: `/legal/${slug}`,
    type: "article",
  });
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLegalSlug(slug)) notFound();
  const lang: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const dict = getDictionary(lang);
  const doc = getLegalDoc(slug, lang);

  return (
    <>
      <section className="bg-navy-900 pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="container-page flex flex-col gap-4">
          <Link
            href={localizedPath(lang, "/")}
            className="text-xs font-semibold uppercase tracking-wider text-gold-400 transition hover:text-gold-300"
          >
            ← {dict.legal.backToHome}
          </Link>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-white text-balance-heavy sm:text-5xl">
            {dict.legal.sections[LEGAL_SECTION_KEY[slug]]}
          </h1>
          <p className="text-sm text-ivory-200/70">
            {dict.legal.updated} {doc.updated}
          </p>
        </div>
      </section>

      <section className="container-page grid gap-10 py-14 md:grid-cols-[220px_1fr] md:py-20">
        <nav aria-label={dict.legal.toc} className="hidden md:block">
          <div className="sticky top-28 flex flex-col gap-1.5">
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-ink-600">
              {dict.legal.toc}
            </p>
            {doc.sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-lg px-2 py-1.5 text-sm text-ink-600 transition hover:bg-white hover:text-navy-700"
              >
                {section.heading}
              </a>
            ))}
          </div>
        </nav>

        <article className="flex max-w-3xl flex-col gap-8">
          <p className="text-base leading-relaxed text-ink-700">{doc.intro}</p>

          {doc.sections.map((section) => (
            <section key={section.id} id={section.id} className="flex scroll-mt-28 flex-col gap-3">
              <h2 className="font-display text-xl font-semibold text-ink-950 sm:text-2xl">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-sm leading-relaxed text-ink-700">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <div className="flex flex-wrap gap-2 border-t border-ink-900/8 pt-8">
            {LEGAL_SLUGS.filter((item) => item !== slug).map((item) => (
              <Link
                key={item}
                href={localizedPath(lang, `/legal/${item}`)}
                className="rounded-full border border-ink-900/12 px-4 py-2 text-xs font-semibold text-ink-700 transition hover:border-navy-600 hover:text-navy-700"
              >
                {dict.legal.sections[LEGAL_SECTION_KEY[item]]}
              </Link>
            ))}
          </div>

          <p className="text-xs leading-relaxed text-ink-600/80">
            {dict.affiliate.note}
          </p>
        </article>
      </section>
    </>
  );
}
