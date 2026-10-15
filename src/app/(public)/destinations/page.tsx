import type { Metadata } from "next";
import { dict } from "@/i18n/dictionaries";
import { DESTINATIONS } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { DestinationGrid } from "@/components/destination-grid";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: dict.destinations.title,
    description: dict.destinations.lead,
    path: "/destinations",
  });
}

export default function DestinationsPage() {
  return (
    <>
      <section className="bg-navy-900 pt-12 pb-20 md:pt-16 md:pb-24">
        <div className="container-page flex flex-col gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
            {dict.hero.secondaryCta}
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-white text-balance-heavy sm:text-5xl">
            {dict.destinations.title}
          </h1>
          <p className="max-w-2xl leading-relaxed text-ivory-200/75">{dict.destinations.lead}</p>
        </div>
      </section>

      <section className="container-page py-14 md:py-20">
        <DestinationGrid destinations={DESTINATIONS} dict={dict} />
      </section>
    </>
  );
}
