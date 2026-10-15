"use client";

import { useMemo, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { formatPrice } from "@/lib/format";
import type { Offer, OfferKind } from "@/lib/offers";
import { OfferCard } from "@/components/offer-card";
import { OffersEmpty } from "@/components/offers-empty";

type Sort = "popular" | "cheap" | "best";
type KindFilter = "all" | OfferKind;

const BANDS = [250, 500, 1000, 2500, 5000, 10000];

const KIND_LABEL: Record<OfferKind, keyof Dictionary["search"]["tabs"]> = {
  tour: "tours",
  flight: "flights",
  hotel: "hotels",
  excursion: "excursions",
};

function chip(active: boolean) {
  return [
    "h-9 rounded-full px-4 text-xs font-semibold transition",
    active
      ? "bg-navy-800 text-white"
      : "border border-ink-900/12 bg-white text-ink-700 hover:border-navy-600 hover:text-navy-700",
  ].join(" ");
}

export function OfferExplorer({
  offers,
  dict,
  showKinds = false,
  defaultKind = "all",
  title,
}: {
  offers: Offer[];
  dict: Dictionary;
  showKinds?: boolean;
  defaultKind?: KindFilter;
  title?: string;
}) {
  const [kind, setKind] = useState<KindFilter>(defaultKind);
  const [sort, setSort] = useState<Sort>("popular");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const kindsPresent = useMemo(() => {
    const set = new Set(offers.map((offer) => offer.kind));
    return (["tour", "flight", "hotel", "excursion"] as OfferKind[]).filter((k) => set.has(k));
  }, [offers]);

  const prices = useMemo(() => offers.map((offer) => offer.price), [offers]);
  const bands = useMemo(() => {
    if (prices.length === 0) return [];
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return BANDS.filter((band) => band > min && band < max).slice(0, 4);
  }, [prices]);

  const visible = useMemo(() => {
    let list = offers.filter((offer) => (kind === "all" ? true : offer.kind === kind));
    if (maxPrice !== null) list = list.filter((offer) => offer.price <= maxPrice);
    const sorted = [...list];
    if (sort === "cheap") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "best") sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    else sorted.sort((a, b) => b.reviews - a.reviews);
    return sorted;
  }, [offers, kind, sort, maxPrice]);

  const showKindTabs = showKinds && kindsPresent.length > 1;

  if (offers.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <OffersEmpty dict={dict} />
        <p className="text-xs leading-relaxed text-ink-600/80">{dict.search.disclaimer}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {showKindTabs ? (
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setKind("all")} className={chip(kind === "all")}>
              {dict.destinations.all}
            </button>
            {kindsPresent.map((offerKind) => (
              <button
                key={offerKind}
                type="button"
                onClick={() => setKind(offerKind)}
                className={chip(kind === offerKind)}
              >
                {dict.search.tabs[KIND_LABEL[offerKind]]}
              </button>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-600">
              {dict.search.filters}
            </span>
            <button type="button" onClick={() => setMaxPrice(null)} className={chip(maxPrice === null)}>
              {dict.destinations.all}
            </button>
            {bands.map((band) => (
              <button
                key={band}
                type="button"
                onClick={() => setMaxPrice(band)}
                className={chip(maxPrice === band)}
              >
                ≤ {formatPrice(band)}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-600">
            <span className="sr-only">{dict.search.sortPopular}</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as Sort)}
              className="h-9 rounded-full border border-ink-900/12 bg-white px-3 text-xs font-semibold normal-case text-ink-900 outline-none focus:border-navy-600"
            >
              <option value="popular">{dict.search.sortPopular}</option>
              <option value="cheap">{dict.search.sortCheap}</option>
              <option value="best">{dict.search.sortBest}</option>
            </select>
          </label>
        </div>

        <p className="text-sm text-ink-600">
          {title ? <strong className="font-semibold text-ink-900">{title} · </strong> : null}
          {visible.length} {dict.search.results.toLowerCase()}
        </p>
      </div>

      {visible.length === 0 ? (
        <div className="surface-card flex flex-col items-center gap-3 px-6 py-16 text-center">
          <p className="font-display text-xl font-semibold text-ink-950">{dict.search.noResults}</p>
          <button
            type="button"
            onClick={() => {
              setKind("all");
              setMaxPrice(null);
              setSort("popular");
            }}
            className="inline-flex h-11 items-center rounded-full bg-navy-800 px-6 text-sm font-semibold text-white transition hover:bg-navy-700"
          >
            {dict.search.showAll}
          </button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((offer) => (
            <OfferCard key={offer.id} offer={offer} dict={dict} />
          ))}
        </div>
      )}

      <p className="text-xs leading-relaxed text-ink-600/80">{dict.search.disclaimer}</p>
    </div>
  );
}
