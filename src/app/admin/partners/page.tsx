import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE } from "@/lib/brand";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { PARTNERS, PARTNER_KEYS, partnerAcceptsOffers } from "@/lib/partners";
import { readOffersFile, readPartnersFile } from "@/lib/content-store";
import { readClickStats } from "@/lib/click-stats";
import { PartnersAdmin } from "@/components/partners-admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Partnerzy — administracja POLSKA TRAVEL DEALS",
  robots: { index: false, follow: false },
};

export default async function AdminPartnersPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin");

  const dict = getDictionary(DEFAULT_LOCALE);
  const file = await readPartnersFile();
  const offers = await readOffersFile();
  const stats = await readClickStats();

  const partners = PARTNER_KEYS.map((key) => file[key] ?? PARTNERS[key]);
  const liveKeys = partners.filter((partner) => partnerAcceptsOffers(partner)).map((p) => p.key);

  return (
    <div className="min-h-screen bg-ivory-100">
      <header className="border-b border-ink-900/8 bg-white">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 py-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold-600">
              {dict.admin.brand}
            </p>
            <h1 className="font-display text-2xl font-semibold text-ink-950">
              {dict.partners.title}
            </h1>
          </div>
          <div className="flex gap-2">
            <Link
              href="/admin"
              className="inline-flex h-11 items-center rounded-full border border-ink-900/15 px-5 text-sm font-semibold text-ink-900 transition hover:border-navy-700 hover:text-navy-800"
            >
              ← {dict.admin.title}
            </Link>
            <Link
              href="/"
              className="inline-flex h-11 items-center rounded-full bg-navy-800 px-5 text-sm font-semibold text-white transition hover:bg-navy-700"
            >
              {dict.admin.sections.home}
            </Link>
          </div>
        </div>
      </header>

      <main className="container-page flex flex-col gap-8 py-8">
        <p className="max-w-3xl text-sm leading-relaxed text-ink-600">{dict.partners.adminLead}</p>
        <PartnersAdmin
          dictionary={dict}
          partners={partners}
          liveKeys={liveKeys}
          offers={offers}
          stats={stats}
        />
      </main>
    </div>
  );
}
