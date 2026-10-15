import type { Metadata } from "next";
import { dict, interpolate } from "@/i18n/dictionaries";
import { DESTINATIONS, CITIES } from "@/lib/data";
import { visibleOffers, type Offer, type OfferKind } from "@/lib/offers";
import { buildMetadata } from "@/lib/seo";
import { SearchPanel, type SearchType } from "@/components/search-panel";
import { OfferExplorer } from "@/components/offer-explorer";

const TYPE_TO_KIND: Record<SearchType, OfferKind> = {
  tours: "tour",
  flights: "flight",
  hotels: "hotel",
  excursions: "excursion",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: dict.search.results,
    description: dict.meta.defaultDescription,
    path: "/search",
    index: false,
  });
}

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;

  const rawType = first(query.type);
  const type: SearchType =
    rawType === "flights" || rawType === "hotels" || rawType === "excursions"
      ? rawType
      : rawType === "tours"
        ? "tours"
        : "tours";

  const q = first(query.q).trim();
  const from = first(query.from).trim();
  const guests = first(query.guests) || "2";

  const haystackFor = (offer: Offer) => {
    const parts: string[] = [];
    if (offer.title) parts.push(offer.title);
    if (offer.meta) parts.push(offer.meta);
    if (offer.destination) {
      const destination = DESTINATIONS.find((d) => d.slug === offer.destination);
      if (destination) parts.push(destination.name);
    }
    if (offer.from && CITIES[offer.from]) parts.push(CITIES[offer.from]);
    if (offer.to && CITIES[offer.to]) parts.push(CITIES[offer.to]);
    return parts.join(" ").toLowerCase();
  };

  const needle = `${q} ${from}`.trim().toLowerCase();
  const kind = TYPE_TO_KIND[type];

  const results = visibleOffers()
    .filter((offer) => offer.kind === kind)
    .filter((offer) => (needle ? haystackFor(offer).includes(needle) : true));

  const criteria: { label: string; value: string }[] = [];
  if (q) criteria.push({ label: dict.search.destination, value: q });
  if (from) criteria.push({ label: dict.search.origin, value: from });
  criteria.push({ label: dict.search.tabs[type], value: dict.destinations.all });
  criteria.push({ label: dict.search.guests, value: guests });

  return (
    <>
      <section className="bg-navy-900 pt-12 pb-32 md:pt-16 md:pb-40">
        <div className="container-page flex flex-col gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
            {dict.nav.search}
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-white text-balance-heavy sm:text-5xl">
            {dict.search.results}
          </h1>
          <p className="max-w-2xl leading-relaxed text-ivory-200/75">
            {interpolate(dict.search.resultsCount, { count: results.length })}
          </p>
        </div>
      </section>

      <div id="szukaj" className="container-page relative z-20 -mt-24 md:-mt-28">
        <SearchPanel dict={dict} initialType={type} />
      </div>

      <section className="container-page py-14 md:py-20">
        <div className="mb-6 flex flex-wrap gap-2">
          {criteria.map((item, index) => (
            <span
              key={`${item.label}-${index}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink-700 shadow-soft"
            >
              <span className="text-ink-600/70">{item.label}:</span>
              {item.value}
            </span>
          ))}
          <a
            href="/search"
            className="inline-flex items-center rounded-full border border-ink-900/12 px-3 py-1.5 text-xs font-semibold text-navy-700 transition hover:border-navy-600"
          >
            {dict.destinations.all}
          </a>
        </div>

        <OfferExplorer
          offers={results}
          dict={dict}
          showKinds={false}
          defaultKind={kind}
          title={q || from ? `${q || from}` : undefined}
        />
      </section>
    </>
  );
}
