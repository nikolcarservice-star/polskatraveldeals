import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, interpolate } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { DEFAULT_LOCALE, LOCALES, localizedPath, type Locale } from "@/lib/brand";
import { DESTINATIONS, REGIONS, destinationBySlug } from "@/lib/data";
import { visibleOffers } from "@/lib/offers";
import { formatNumber, formatPrice } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { OfferExplorer } from "@/components/offer-explorer";
import { DestinationGrid } from "@/components/destination-grid";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    DESTINATIONS.map((destination) => ({ locale, slug: destination.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const lang: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const destination = destinationBySlug(slug);
  if (!destination) return {};
  return buildMetadata({
    locale: lang,
    title: destination.name[lang],
    description: destination.blurb[lang],
    path: `/destinations/${slug}`,
    image: destination.image,
    type: "article",
  });
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const destination = destinationBySlug(slug);
  if (!destination) notFound();

  const dict = getDictionary(lang);
  const regionLabel = REGIONS.find((item) => item.key === destination.region)?.label[lang];
  const offers = visibleOffers({ destination: destination.slug });
  const others = DESTINATIONS.filter((item) => item.slug !== destination.slug).slice(0, 4);

  // Real per-kind counts of live (approved + published) offers — never
  // decorative totals.
  const countOf = (kind: "tour" | "hotel" | "excursion") =>
    offers.filter((offer) => offer.kind === kind).length;
  const stats: { label: string; value: number }[] = [
    { label: dict.destinations.tours, value: countOf("tour") },
    { label: dict.destinations.hotels, value: countOf("hotel") },
    { label: dict.destinations.excursions, value: countOf("excursion") },
  ];
  const minPrice = offers.length
    ? Math.min(...offers.map((offer) => offer.price))
    : null;

  return (
    <>
      <section className="relative overflow-hidden bg-ink-950">
        <div className="absolute inset-0">
          <Image
            src={destination.image}
            alt={destination.name[lang]}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/40" />
        </div>

        <div className="container-page relative z-10 flex min-h-24 flex-col justify-end gap-3 pt-24 pb-14 md:pt-32 md:pb-20">
          <Link
            href={localizedPath(lang, "/destinations")}
            className="text-xs font-semibold uppercase tracking-wider text-gold-400 transition hover:text-gold-300"
          >
            ← {dict.destinations.title}
          </Link>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {destination.name[lang]}
          </h1>
          <p className="max-w-2xl leading-relaxed text-ivory-200/80">{destination.blurb[lang]}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-ivory-200/85">
            <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold backdrop-blur">
              {regionLabel}
            </span>
            {minPrice !== null ? (
              <span>
                {dict.destinations.fromPrice}{" "}
                <strong className="font-display text-xl font-semibold text-gold-300">
                  {formatPrice(minPrice, lang)}
                </strong>
              </span>
            ) : (
              <span className="text-ivory-200/70">{dict.partners.offersSoon}</span>
            )}
          </div>
        </div>
      </section>

      {offers.length > 0 ? (
        <section className="container-page py-10">
          <dl className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="surface-card px-4 py-5 text-center">
                <dt className="text-[11px] font-bold uppercase tracking-wider text-ink-600">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-display text-2xl font-semibold text-navy-800">
                  {formatNumber(stat.value, lang)}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <section className="container-page pb-6">
        <div className="mb-8 flex flex-col gap-2">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-600">
            {dict.destinations.about}
          </p>
          <h2 className="font-display text-3xl font-semibold text-ink-950">
            {dict.search.results}
          </h2>
          <p className="text-ink-600">
            {interpolate(dict.search.resultsCount, { count: offers.length })}
          </p>
        </div>
        <OfferExplorer offers={offers} locale={lang} dict={dict} title={destination.name[lang]} />
      </section>

      <section className="container-page py-14 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold text-ink-950">
            {dict.destinations.title}
          </h2>
          <Link
            href={localizedPath(lang, "/destinations")}
            className="text-sm font-semibold text-navy-700 transition hover:text-gold-600"
          >
            {dict.destinations.all} →
          </Link>
        </div>
        <DestinationGrid
          destinations={others}
          locale={lang}
          dict={dict}
          showRegions={false}
          priorityCount={0}
        />
      </section>
    </>
  );
}
