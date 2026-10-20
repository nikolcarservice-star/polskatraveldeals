import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";
import { formatPrice, formatRating, formatNumber } from "@/lib/format";
import { offerImage, offerLink, offerTitle, type Offer } from "@/lib/offers";

export function OfferCard({
  offer,
  dict,
  priority = false,
}: {
  offer: Offer;
  dict: Dictionary;
  priority?: boolean;
}) {
  const image = offerImage(offer);
  const link = offerLink(offer);
  const partnerName = link?.partner.name ?? offer.partner;

  return (
    <article className="group surface-card flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden bg-ivory-200">
        <Image
          src={image}
          alt={offerTitle(offer)}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {offer.tag ? (
          <span className="absolute left-3 top-3 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-950 shadow-md">
            {offer.tag}
          </span>
        ) : null}
        <span className="absolute bottom-3 right-3 rounded-full bg-ink-950/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
          {dict.affiliate.badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-snug text-ink-950">
            {offerTitle(offer)}
          </h3>
          {offer.rating > 0 ? (
            <span className="shrink-0 rounded-lg bg-navy-800/8 px-2 py-1 text-xs font-bold text-navy-800">
              ★ {formatRating(offer.rating)}
            </span>
          ) : null}
        </div>

        {offer.meta ? <p className="text-sm text-ink-600">{offer.meta}</p> : null}

        <p className="text-xs text-ink-600/75">
          {offer.reviews > 0 ? (
            <>
              {formatNumber(offer.reviews)} {dict.common.rating.toLowerCase()} ·{" "}
            </>
          ) : null}
          {partnerName}
        </p>

        <div className="mt-auto flex flex-col gap-3 border-t border-ink-900/8 pt-4">
          <div>
            {offer.oldPrice ? (
              <p className="text-xs text-ink-600/60 line-through">
                {formatPrice(offer.oldPrice)}
              </p>
            ) : null}
            <p className="font-display text-2xl font-semibold text-navy-800">
              <span className="mr-1 text-xs font-sans font-medium uppercase tracking-wider text-ink-600">
                {dict.search.priceFrom}
              </span>
              {formatPrice(offer.price)}
            </p>
            <p className="text-[11px] text-ink-600/70">
              {offer.kind === "hotel" ? dict.search.perNight : dict.search.perPerson}
            </p>
          </div>

          {link ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="inline-flex h-11 items-center justify-center rounded-full bg-navy-800 text-sm font-semibold text-white transition hover:bg-navy-700"
            >
              {link.partner.cta.label || dict.search.viewDeal}
              <span className="sr-only">
                {" "}
                — {dict.search.openIn} {link.partner.name}
              </span>
            </a>
          ) : (
            <p className="rounded-xl bg-ivory-100 px-4 py-3 text-xs leading-relaxed text-ink-600">
              {dict.partners.ctaUnavailable}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export function OfferRail({ children }: { children: React.ReactNode }) {
  return (
    <div className="scrollbar-slim -mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
      {children}
    </div>
  );
}
