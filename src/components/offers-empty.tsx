import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { Icon } from "@/components/icon";

/**
 * Honest placeholder used whenever a programme is still pending: no invented
 * prices, no dead buttons — just a clear explanation of what is happening.
 */
export function OffersEmpty({
  dict,
  title,
  lead,
}: {
  dict: Dictionary;
  title?: string;
  lead?: string;
}) {
  return (
    <div className="surface-card flex flex-col items-center gap-4 px-6 py-16 text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-800 text-gold-400">
        <Icon name="clock" size={26} />
      </span>
      <h3 className="font-display text-2xl font-semibold text-ink-950">
        {title ?? dict.partners.noOffers}
      </h3>
      <p className="max-w-xl text-sm leading-relaxed text-ink-600">
        {lead ?? dict.partners.noOffersLead}
      </p>
      <p className="max-w-xl rounded-xl bg-ivory-100 px-4 py-3 text-xs leading-relaxed text-ink-600">
        {dict.partners.pendingNotice}
      </p>
      <div className="flex flex-wrap justify-center gap-3 pt-1">
        <Link
          href="/about"
          className="inline-flex h-11 items-center rounded-full bg-navy-800 px-6 text-sm font-semibold text-white transition hover:bg-navy-700"
        >
          {dict.common.learnMore}
        </Link>
        <Link
          href="/contact"
          className="inline-flex h-11 items-center rounded-full border border-ink-900/15 px-6 text-sm font-semibold text-ink-900 transition hover:border-navy-700 hover:text-navy-800"
        >
          {dict.nav.contact}
        </Link>
      </div>
    </div>
  );
}
