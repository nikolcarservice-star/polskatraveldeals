import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { dict, interpolate } from "@/i18n/dictionaries";
import { DESTINATIONS, HERO_IMAGE } from "@/lib/data";
import { BRAND } from "@/lib/brand";
import { PARTNER_LIST } from "@/lib/partners";
import { visibleOffers } from "@/lib/offers";
import { getSettings } from "@/lib/settings";
import { formatNumber } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { SearchPanel } from "@/components/search-panel";
import { OfferCard, OfferRail } from "@/components/offer-card";
import { OffersEmpty } from "@/components/offers-empty";
import { DestinationCard } from "@/components/destination-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { Icon } from "@/components/icon";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: dict.meta.defaultTitle,
    description: dict.meta.defaultDescription,
    path: "/",
  });
}

function SectionHead({
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  tone?: "light" | "dark";
  align?: "center" | "left";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={[
        "mb-10 flex flex-col gap-3",
        align === "center" ? "mx-auto max-w-3xl items-center text-center" : "max-w-3xl",
      ].join(" ")}
    >
      {eyebrow ? (
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-600">{eyebrow}</p>
      ) : null}
      <h2
        className={[
          "font-display text-3xl font-semibold leading-tight text-balance-heavy sm:text-4xl",
          dark ? "text-white" : "text-ink-950",
        ].join(" ")}
      >
        {title}
      </h2>
      {lead ? (
        <p className={["text-balance-heavy", dark ? "text-ivory-200/75" : "text-ink-600"].join(" ")}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}

const WHY_ICONS: Record<string, string> = {
  compare: "compare",
  save: "tag",
  transparent: "shield",
  support: "headset",
  secure: "lock",
  mobile: "device",
};

export default function HomePage() {
  const settings = getSettings();

  const live = visibleOffers();
  const flights = live.filter((o) => o.kind === "flight");
  const hotFlights = [
    ...flights.filter((o) => o.tag),
    ...flights.filter((o) => !o.tag),
  ].slice(0, 6);
  const hotIds = new Set(hotFlights.map((o) => o.id));
  const featured = flights.filter((o) => !hotIds.has(o.id)).slice(0, 6);

  const stats: { value: number; label: string }[] = [
    { value: PARTNER_LIST.length, label: dict.stats.items.partners },
    { value: DESTINATIONS.length, label: dict.stats.items.destinations },
    { value: live.length, label: dict.stats.items.deals },
  ];

  const testimonialKeys = ["anna", "marek", "olena"] as const;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BRAND.url}/#organization`,
        name: BRAND.name,
        url: BRAND.url,
        logo: `${BRAND.url}/icon.svg`,
        sameAs: [BRAND.telegram],
      },
      {
        "@type": "WebSite",
        "@id": `${BRAND.url}/#website`,
        url: BRAND.url,
        name: BRAND.name,
        inLanguage: "pl-PL",
        publisher: { "@id": `${BRAND.url}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${BRAND.url}/search?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-ink-950">
        <div className="absolute inset-0">
          <Image
            src={settings.hero.image || HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/90 via-ink-950/65 to-ink-950/95" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_0%,rgb(23_69_111/0.55),transparent_60%)]" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink-950 to-transparent" />
        </div>

        <div className="container-page relative z-10 flex flex-col items-center gap-7 pb-40 pt-20 text-center md:pb-48 md:pt-28">
          <p className="animate-fade-up text-xs font-bold uppercase tracking-[0.34em] text-gold-400">
            {settings.hero.eyebrow || dict.hero.eyebrow}
          </p>
          <h1 className="max-w-4xl animate-fade-up font-display text-4xl font-semibold leading-[1.06] text-white text-balance-heavy sm:text-5xl md:text-6xl">
            {dict.hero.title}{" "}
            <span className="gold-text">{dict.hero.titleAccent}</span>
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-ivory-200/80 md:text-lg animate-fade-up">
            {settings.hero.lead || dict.hero.lead}
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-3 animate-fade-up">
            <a
              href="#szukaj"
              className="inline-flex h-13 items-center rounded-full bg-gradient-to-b from-gold-300 to-gold-500 px-9 py-3.5 text-sm font-bold tracking-wide text-ink-950 shadow-gold transition hover:from-gold-200 hover:to-gold-400"
            >
              {dict.hero.primaryCta}
            </a>
            <Link
              href="/destinations"
              className="inline-flex h-13 items-center rounded-full border border-white/30 bg-white/5 px-9 py-3.5 text-sm font-bold tracking-wide text-white backdrop-blur transition hover:border-gold-400 hover:bg-white/10 hover:text-gold-300"
            >
              {dict.hero.secondaryCta}
            </Link>
          </div>
          <p className="flex flex-wrap justify-center gap-x-3 gap-y-1 pt-3 text-xs text-ivory-200/65">
            {dict.hero.trust}
          </p>
        </div>
      </section>

      {/* ---------------- Search ---------------- */}
      <div id="szukaj" className="container-page relative z-20 -mt-24 md:-mt-32">
        <SearchPanel dict={dict} />
      </div>

      {/* ---------------- Hot flights ---------------- */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-page">
          <SectionHead
            eyebrow={dict.hotFlights.eyebrow}
            title={dict.hotFlights.title}
            lead={dict.hotFlights.lead}
          />
          {hotFlights.length > 0 ? (
            <OfferRail>
              {hotFlights.map((offer) => (
                <OfferCard key={offer.id} offer={offer} dict={dict} />
              ))}
            </OfferRail>
          ) : (
            <OffersEmpty dict={dict} />
          )}
          <div className="mt-8 flex justify-center">
            <Link
              href="/flights"
              className="inline-flex h-12 items-center rounded-full bg-navy-800 px-7 text-sm font-semibold text-white transition hover:bg-navy-700"
            >
              {dict.hotFlights.all}
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- Destinations ---------------- */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-page">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              align="left"
              eyebrow={dict.destinations.title}
              title={dict.deals.title}
              lead={dict.deals.lead}
            />
            <Link
              href="/destinations"
              className="mb-10 inline-flex h-11 items-center rounded-full border border-ink-900/15 px-6 text-sm font-semibold text-ink-900 transition hover:border-navy-700 hover:text-navy-800"
            >
              {dict.deals.all}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {DESTINATIONS.slice(0, 8).map((destination, index) => (
              <DestinationCard
                key={destination.slug}
                destination={destination}
                dict={dict}
                priority={index < 4}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Featured offers ---------------- */}
      <section className="container-page py-16 md:py-24">
        <SectionHead
          eyebrow={dict.nav.flights}
          title={dict.search.results}
          lead={interpolate(dict.search.resultsCount, { count: String(flights.length) })}
        />
        {featured.length > 0 ? (
          <OfferRail>
            {featured.map((offer) => (
              <OfferCard key={offer.id} offer={offer} dict={dict} />
            ))}
          </OfferRail>
        ) : (
          <OffersEmpty dict={dict} />
        )}
        <div className="mt-8 flex flex-col items-center gap-4">
          <Link
            href="/flights"
            className="inline-flex h-12 items-center rounded-full bg-navy-800 px-7 text-sm font-semibold text-white transition hover:bg-navy-700"
          >
            {dict.hotFlights.all}
          </Link>
          <p className="max-w-2xl text-center text-xs leading-relaxed text-ink-600/80">
            {dict.affiliate.note}
          </p>
        </div>
      </section>

      {/* ---------------- Why us ---------------- */}
      <section className="bg-navy-900 py-16 text-white md:py-24">
        <div className="container-page">
          <SectionHead tone="dark" title={dict.why.title} lead={dict.why.lead} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(dict.why.items) as (keyof typeof dict.why.items)[]).map((key) => (
              <div
                key={key}
                className="flex flex-col gap-3 rounded-card border border-white/10 bg-white/5 p-6 transition hover:border-gold-400/40 hover:bg-white/8"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500 text-ink-950">
                  <Icon name={WHY_ICONS[key]} size={22} />
                </span>
                <h3 className="font-display text-lg font-semibold text-white">
                  {dict.why.items[key].title}
                </h3>
                <p className="text-sm leading-relaxed text-ivory-200/75">
                  {dict.why.items[key].desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section className="container-page py-16 md:py-24">
        <SectionHead title={dict.how.title} />
        <div className="grid gap-6 md:grid-cols-3">
          {(["one", "two", "three"] as const).map((step, index) => (
            <div key={step} className="relative surface-card p-7">
              <span className="font-display text-5xl font-semibold text-gold-500/35">
                {index + 1}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink-950">
                {dict.how.steps[step].title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {dict.how.steps[step].desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Stats ---------------- */}
      <section className="bg-white py-14">
        <div className="container-page">
          <h2 className="mb-8 text-center font-display text-2xl font-semibold text-ink-950">
            {dict.stats.title}
          </h2>
          <dl className="grid grid-cols-2 gap-6 lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-4xl font-semibold text-navy-800">
                    {stat.value > 0 ? `${formatNumber(stat.value)}+` : "0"}
                  </span>
                  <span className="mt-1 block text-xs font-semibold uppercase tracking-wider text-ink-600">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------- Testimonials ---------------- */}
      <section className="container-page py-16 md:py-24">
        <SectionHead title={dict.testimonials.title} />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonialKeys.map((key) => (
            <figure key={key} className="surface-card flex flex-col gap-4 p-6">
              <span className="text-gold-500" aria-hidden="true">
                ★★★★★
              </span>
              <blockquote className="text-sm leading-relaxed text-ink-700">
                “{dict.testimonials.items[key].text}”
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-800 font-display text-sm font-semibold text-white">
                  {dict.testimonials.items[key].name.slice(0, 1)}
                </span>
                <span className="text-sm">
                  <strong className="block font-semibold text-ink-950">
                    {dict.testimonials.items[key].name}
                  </strong>
                  <span className="text-xs text-ink-600">{dict.testimonials.items[key].city}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------------- Newsletter ---------------- */}
      <section className="container-page pb-16 md:pb-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-navy-900 px-6 py-12 sm:px-10 md:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_85%_10%,rgb(207_160_55/0.28),transparent_65%)]" />
          <div className="relative grid items-center gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
                {dict.footer.newsletterTitle}
              </p>
              <h2 className="font-display text-3xl font-semibold text-white text-balance-heavy sm:text-4xl">
                {dict.newsletter.title}
              </h2>
              <p className="text-sm leading-relaxed text-ivory-200/75">
                {dict.newsletter.lead}
              </p>
            </div>
            <NewsletterForm dict={dict} tone="dark" />
          </div>
        </div>
      </section>

      {/* ---------------- Final CTA ---------------- */}
      <section className="border-t border-ink-900/8 bg-white py-16 text-center md:py-20">
        <div className="container-page flex flex-col items-center gap-4">
          <h2 className="font-display text-3xl font-semibold text-ink-950 text-balance-heavy sm:text-4xl">
            {dict.cta.title}
          </h2>
          <p className="max-w-xl text-ink-600">{dict.cta.lead}</p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a
              href="#szukaj"
              className="inline-flex h-12 items-center rounded-full bg-navy-800 px-7 text-sm font-semibold text-white transition hover:bg-navy-700"
            >
              {dict.cta.primary}
            </a>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center rounded-full border border-ink-900/15 px-7 text-sm font-semibold text-ink-900 transition hover:border-navy-700 hover:text-navy-800"
            >
              {dict.cta.secondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
