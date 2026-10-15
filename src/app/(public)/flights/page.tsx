import type { Metadata } from "next";
import { dict } from "@/i18n/dictionaries";
import { offersByKind } from "@/lib/offers";
import { buildMetadata } from "@/lib/seo";
import { CategoryView } from "@/components/category-view";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: dict.nav.flights,
    description: dict.categories.items.flights.desc,
    path: "/flights",
  });
}

export default function FlightsPage() {
  return (
    <CategoryView
      dict={dict}
      kind="flight"
      title={dict.nav.flights}
      lead={dict.categories.items.flights.desc}
      offers={offersByKind("flight")}
    />
  );
}
