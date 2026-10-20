import rawOffers from "@/content/offers.json";
import { CATEGORY_IMAGES, CITIES, DESTINATIONS } from "@/lib/data";
import {
  buildPartnerTarget,
  getPartner,
  isAllowedHost,
  partnerAcceptsOffers,
  type Partner,
  type PartnerKey,
} from "@/lib/partners";

export type OfferKind = "tour" | "flight" | "hotel" | "excursion";

export interface Offer {
  id: string;
  kind: OfferKind;
  /** Which of the four partner programmes carries this offer. */
  partner: PartnerKey;
  /** Verified destination URL (required for manual TravelLead offers). */
  url: string;
  /** Where the offer was found — filled in by the admin before publishing. */
  source: string;
  /** Admin-controlled visibility switch; sample rows ship as `false`. */
  published: boolean;
  title?: string;
  destination?: string;
  image?: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  nights?: number;
  meta?: string;
  tag?: string;
  /** Airport keys for flights (title is composed from city names). */
  from?: string;
  to?: string;
  /** Polish city names supplied by the feed; preferred over the CITIES lookup. */
  fromName?: string;
  toName?: string;
}

export const OFFERS: Offer[] = rawOffers as unknown as Offer[];

/** Title; flights are composed from city names. */
export function offerTitle(offer: Offer): string {
  if (offer.from && offer.to) {
    const from = offer.fromName ?? CITIES[offer.from] ?? offer.from;
    const to = offer.toName ?? CITIES[offer.to] ?? offer.to;
    return `${from} → ${to}`;
  }
  return offer.title ?? offer.id;
}

export function offerImage(offer: Offer): string {
  if (offer.image) return offer.image;
  if (offer.destination) {
    const destination = DESTINATIONS.find((d) => d.slug === offer.destination);
    if (destination) return destination.image;
  }
  return CATEGORY_IMAGES[
    offer.kind === "tour"
      ? "tours"
      : offer.kind === "flight"
        ? "flights"
        : offer.kind === "hotel"
          ? "hotels"
          : "excursions"
  ];
}

/**
 * The single gatekeeper for the public site: an offer renders only when it is
 * published, its programme is approved and switched on, and (for manual
 * TravelLead rows) a verified destination URL exists. Anything else is omitted
 * instead of being shown with a fake price or a dead button.
 */
export function isOfferVisible(offer: Offer): boolean {
  if (!offer.published) return false;
  const partner = getPartner(offer.partner);
  if (!partnerAcceptsOffers(partner)) return false;
  if (partner?.programme === "travellead") {
    // Manual rows must carry a verified URL that the /go redirector will accept.
    if (!offer.url.trim() || !isAllowedHost(partner, offer.url.trim())) return false;
  }
  return true;
}

export function visibleOffers(
  filter: { kind?: OfferKind; destination?: string } = {}
): Offer[] {
  return OFFERS.filter(
    (offer) =>
      (!filter.kind || offer.kind === filter.kind) &&
      (!filter.destination || offer.destination === filter.destination) &&
      isOfferVisible(offer)
  );
}

export function offersByKind(kind: OfferKind): Offer[] {
  return visibleOffers({ kind });
}

export interface OfferLink {
  /** Route through the /go click logger. */
  href: string;
  partner: Partner;
}

/**
 * Builds the tracked outgoing link for an offer. Returns `null` when the
 * programme is not ready — callers must hide the CTA, never render a dead one.
 */
export function offerLink(offer: Offer): OfferLink | null {
  const partner = getPartner(offer.partner);
  if (!partner) return null;

  const target = buildPartnerTarget(partner, { url: offer.url || undefined });
  if (!target) return null;

  const params = new URLSearchParams({ u: target, s: `ptd-${offer.id}` });
  return { href: `/go/${partner.key}?${params.toString()}`, partner };
}
