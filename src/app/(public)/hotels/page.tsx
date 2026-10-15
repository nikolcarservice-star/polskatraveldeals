import type { Metadata } from "next";
import { dict } from "@/i18n/dictionaries";
import { offersByKind } from "@/lib/offers";
import { buildMetadata } from "@/lib/seo";
import { CategoryView } from "@/components/category-view";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: dict.nav.hotels,
    description: dict.categories.items.hotels.desc,
    path: "/hotels",
  });
}

export default function HotelsPage() {
  return (
    <CategoryView
      dict={dict}
      kind="hotel"
      title={dict.nav.hotels}
      lead={dict.categories.items.hotels.desc}
      offers={offersByKind("hotel")}
    />
  );
}
