import type { Metadata } from "next";
import { dict } from "@/i18n/dictionaries";
import { BRAND } from "@/lib/brand";
import { offerTitle, offersByKind } from "@/lib/offers";
import { buildMetadata } from "@/lib/seo";
import { CategoryView } from "@/components/category-view";
import { ScriptWidget } from "@/components/script-widget";

const WIDGET_SRC =
  "https://tpemb.com/content?currency=pln&trs=586197&shmarker=789859&show_hotels=true&powered_by=true&locale=pl&searchUrl=www.aviasales.pl%2Fsearch&primary_override=%2332a8dd&color_button=%2332a8dd&color_icons=%2332a8dd&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=0&plain=false&promo_id=7879&campaign_id=100";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: dict.nav.flights,
    description: dict.meta.defaultDescription,
    path: "/flights",
  });
}

export default function FlightsPage() {
  const offers = offersByKind("flight");
  const routes = offers
    .slice(0, 14)
    .map((offer) => offerTitle(offer).replace(" → ", " – "));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Tanie loty z Polski",
    numberOfItems: offers.length,
    itemListElement: offers.slice(0, 20).map((offer, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Offer",
        name: offerTitle(offer),
        price: offer.price,
        priceCurrency: "PLN",
        url: `${BRAND.url}/flights`,
        seller: { "@type": "Organization", name: "Aviasales" },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoryView
        dict={dict}
        kind="flight"
        title={dict.nav.flights}
        lead={dict.meta.defaultDescription}
        offers={offers}
        afterSearch={
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-600">
                  {dict.flightsWidget.eyebrow}
                </p>
                <h2 className="font-display text-3xl font-semibold text-ink-950 text-balance-heavy sm:text-4xl">
                  {dict.flightsWidget.title}
                </h2>
                <p className="text-balance-heavy text-ink-600">{dict.flightsWidget.lead}</p>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-ink-900/8 bg-white shadow-lift">
                <div className="flex items-center gap-3 border-b border-ink-900/6 bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 px-6 py-4 md:px-10">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-500 text-lg font-bold text-ink-950">
                    ✈
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold uppercase tracking-[0.22em] text-gold-300">
                      {dict.flightsWidget.eyebrow}
                    </p>
                    <p className="truncate text-sm font-semibold text-white">
                      {BRAND.name} × Aviasales
                    </p>
                  </div>
                </div>

                <div className="px-4 py-8 sm:px-8 md:px-12 md:py-10">
                  <ScriptWidget src={WIDGET_SRC} id="ptd-flights-widget" />
                </div>

                <p className="border-t border-ink-900/6 bg-ivory-50 px-6 py-4 text-center text-xs leading-relaxed text-ink-600/80 md:px-10">
                  {dict.flightsWidget.note}
                </p>
              </div>
            </div>

            <div className="surface-card flex flex-col gap-4 p-6 md:p-8">
              <h2 className="font-display text-2xl font-semibold text-ink-950 sm:text-3xl">
                {dict.flightsSeo.title}
              </h2>
              <p className="text-sm leading-relaxed text-ink-600">
                {dict.flightsSeo.intro}{" "}
                <strong className="font-semibold text-ink-900">{routes.join(", ")}</strong>.
              </p>
              <p className="text-sm leading-relaxed text-ink-600">{dict.flightsSeo.keywords}</p>
              <p className="text-xs leading-relaxed text-ink-600/75">{dict.flightsSeo.outro}</p>
            </div>
          </div>
        }
      />
    </>
  );
}
