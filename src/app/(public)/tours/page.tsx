import type { Metadata } from "next";
import { dict } from "@/i18n/dictionaries";
import { offersByKind } from "@/lib/offers";
import { buildMetadata } from "@/lib/seo";
import { CategoryView } from "@/components/category-view";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: dict.nav.tours,
    description: dict.categories.items.tours.desc,
    path: "/tours",
  });
}

export default function ToursPage() {
  return (
    <CategoryView
      dict={dict}
      kind="tour"
      title={dict.nav.tours}
      lead={dict.categories.items.tours.desc}
      offers={offersByKind("tour")}
    />
  );
}
