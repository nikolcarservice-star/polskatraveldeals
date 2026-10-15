import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { DEFAULT_LOCALE, type Locale } from "@/lib/brand";
import { DESTINATIONS } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { DestinationGrid } from "@/components/destination-grid";

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
    title: dict.destinations.title,
    description: dict.destinations.lead,
    path: "/destinations",
  });
}

export default async function DestinationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const dict = getDictionary(lang);

  return (
    <>
      <section className="bg-navy-900 pt-12 pb-20 md:pt-16 md:pb-24">
        <div className="container-page flex flex-col gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
            {dict.hero.secondaryCta}
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-white text-balance-heavy sm:text-5xl">
            {dict.destinations.title}
          </h1>
          <p className="max-w-2xl leading-relaxed text-ivory-200/75">{dict.destinations.lead}</p>
        </div>
      </section>

      <section className="container-page py-14 md:py-20">
        <DestinationGrid destinations={DESTINATIONS} locale={lang} dict={dict} />
      </section>
    </>
  );
}
