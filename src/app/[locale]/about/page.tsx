import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { DEFAULT_LOCALE, BRAND, LOCALES, localizedPath, type Locale } from "@/lib/brand";
import { CATEGORY_IMAGES, DESTINATIONS } from "@/lib/data";
import { PARTNER_LIST } from "@/lib/partners";
import { visibleOffers } from "@/lib/offers";
import { formatNumber } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { Icon } from "@/components/icon";

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
    title: dict.about.title,
    description: dict.about.lead,
    path: "/about",
  });
}

const VALUE_ICONS = ["shield", "tag", "lock", "star"];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const dict = getDictionary(lang);

  const numbers: { value: number; label: string }[] = [
    { value: DESTINATIONS.length, label: dict.stats.items.destinations },
    { value: visibleOffers().length, label: dict.stats.items.deals },
    { value: PARTNER_LIST.length, label: dict.stats.items.partners },
    { value: LOCALES.length, label: dict.stats.items.languages },
  ];

  return (
    <>
      <section className="bg-navy-900 pt-12 pb-20 md:pt-16 md:pb-24">
        <div className="container-page flex flex-col gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
            {dict.nav.about}
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-white text-balance-heavy sm:text-5xl">
            {dict.about.title}
          </h1>
          <p className="max-w-2xl leading-relaxed text-ivory-200/75">{dict.about.lead}</p>
        </div>
      </section>

      <section className="container-page grid gap-10 py-16 md:grid-cols-2 md:py-20">
        <div className="relative hidden overflow-hidden rounded-3xl md:block">
          <Image
            src={CATEGORY_IMAGES.tours}
            alt={dict.about.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-3xl font-semibold text-ink-950">
            {dict.about.missionTitle}
          </h2>
          <p className="leading-relaxed text-ink-700">{dict.about.missionText}</p>
          <div className="flex flex-col gap-3 pt-2">
            <h3 className="font-display text-2xl font-semibold text-ink-950">
              {dict.about.storyTitle}
            </h3>
            <p className="leading-relaxed text-ink-700">{dict.about.storyText}</p>
          </div>
          <div className="flex flex-col gap-3 pt-2">
            <h3 className="font-display text-2xl font-semibold text-ink-950">
              {dict.about.teamTitle}
            </h3>
            <p className="leading-relaxed text-ink-700">{dict.about.teamText}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-page">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-600">
              {dict.about.valuesTitle}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink-950">
              {dict.about.title}
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(["independent", "honest", "privacy", "quality"] as const).map((key, index) => (
              <div key={key} className="surface-card flex flex-col gap-3 p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy-800 text-gold-400">
                  <Icon name={VALUE_ICONS[index]} size={22} />
                </span>
                <h3 className="font-display text-lg font-semibold text-ink-950">
                  {dict.about.values[key].title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-600">
                  {dict.about.values[key].desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-600">
            {dict.about.numbersTitle}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink-950">
            {dict.stats.title}
          </h2>
        </div>
        <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {numbers.map((item) => (
            <div key={item.label} className="surface-card px-5 py-6 text-center">
              <dt className="text-[11px] font-bold uppercase tracking-wider text-ink-600">
                {item.label}
              </dt>
              <dd className="mt-1 font-display text-4xl font-semibold text-navy-800">
                {item.value > 0 ? `${formatNumber(item.value, lang)}+` : "0"}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-wrap items-center gap-3 rounded-card border border-ink-900/10 bg-ivory-50 p-6">
          <p className="flex-1 text-sm leading-relaxed text-ink-700">{dict.affiliate.note}</p>
          <Link
            href={localizedPath(lang, "/legal/ujawnienie-afiliacyjne")}
            className="inline-flex h-11 items-center rounded-full bg-navy-800 px-6 text-sm font-semibold text-white transition hover:bg-navy-700"
          >
            {dict.affiliate.readMore}
          </Link>
        </div>

        <p className="mt-6 text-xs text-ink-600/75">
          {BRAND.name} · {dict.footer.madeWith}
        </p>
      </section>
    </>
  );
}
