import Image from "next/image";
import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/brand";
import type { Dictionary } from "@/i18n/dictionaries";
import { interpolate } from "@/i18n/dictionaries";
import { formatPrice } from "@/lib/format";
import { REGIONS, type Destination } from "@/lib/data";
import { visibleOffers } from "@/lib/offers";

export function DestinationCard({
  destination,
  locale,
  dict,
  priority = false,
}: {
  destination: Destination;
  locale: Locale;
  dict: Dictionary;
  priority?: boolean;
}) {
  // Only real, approved offers may produce a price on the card. Destinations
  // without live offers show a neutral notice instead of an invented figure.
  const live = visibleOffers({ destination: destination.slug });
  const minPrice = live.length
    ? Math.min(...live.map((offer) => offer.price))
    : null;

  return (
    <Link
      href={localizedPath(locale, `/destinations/${destination.slug}`)}
      className="group relative block overflow-hidden rounded-3xl bg-ink-950 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[4/5] sm:aspect-[3/4]">
        <Image
          src={destination.image}
          alt={destination.name[locale]}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-5">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
          {REGIONS.find((region) => region.key === destination.region)?.label[locale]}
        </span>
        <h3 className="font-display text-xl font-semibold text-white">{destination.name[locale]}</h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-ivory-200/75">
          {destination.blurb[locale]}
        </p>
        <div className="mt-2 flex items-center justify-between gap-2 text-xs text-ivory-200/85">
          {minPrice !== null ? (
            <span>
              {dict.destinations.fromPrice}{" "}
              <strong className="font-display text-base font-semibold text-gold-300">
                {formatPrice(minPrice, locale)}
              </strong>
              <span className="ml-1 text-ivory-200/60">{dict.deals.perPersonShort}</span>
            </span>
          ) : (
            <span className="text-ivory-200/60">{dict.partners.offersSoon}</span>
          )}
          <span className="rounded-full bg-white/12 px-2.5 py-1 backdrop-blur">
            {interpolate(dict.search.resultsCount, { count: String(live.length) })}
          </span>
        </div>
      </div>
    </Link>
  );
}
