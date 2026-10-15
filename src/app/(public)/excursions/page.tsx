import type { Metadata } from "next";
import { dict } from "@/i18n/dictionaries";
import { offersByKind } from "@/lib/offers";
import { buildMetadata } from "@/lib/seo";
import { CategoryView } from "@/components/category-view";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: dict.nav.excursions,
    description: dict.categories.items.excursions.desc,
    path: "/excursions",
  });
}

export default function ExcursionsPage() {
  return (
    <CategoryView
      dict={dict}
      kind="excursion"
      title={dict.nav.excursions}
      lead={dict.categories.items.excursions.desc}
      offers={offersByKind("excursion")}
    />
  );
}
