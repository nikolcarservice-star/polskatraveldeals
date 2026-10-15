import { SearchPanel, type SearchType } from "@/components/search-panel";
import { OfferExplorer } from "@/components/offer-explorer";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Offer, OfferKind } from "@/lib/offers";

const KIND_TO_TYPE: Record<OfferKind, SearchType> = {
  tour: "tours",
  flight: "flights",
  hotel: "hotels",
  excursion: "excursions",
};

export function CategoryView({
  dict,
  kind,
  title,
  lead,
  offers,
}: {
  dict: Dictionary;
  kind: OfferKind;
  title: string;
  lead: string;
  offers: Offer[];
}) {
  return (
    <>
      <section className="bg-navy-900 pt-12 pb-32 md:pt-16 md:pb-40">
        <div className="container-page flex flex-col gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
            {dict.nav.search}
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-white text-balance-heavy sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl leading-relaxed text-ivory-200/75">{lead}</p>
        </div>
      </section>

      <div id="szukaj" className="container-page relative z-20 -mt-24 md:-mt-28">
        <SearchPanel dict={dict} initialType={KIND_TO_TYPE[kind]} />
      </div>

      <section className="container-page py-14 md:py-20">
        <OfferExplorer offers={offers} dict={dict} />
      </section>
    </>
  );
}
