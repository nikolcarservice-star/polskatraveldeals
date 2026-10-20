"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { CITIES, DESTINATIONS } from "@/lib/data";

export type SearchType = "tours" | "flights" | "hotels" | "excursions";

const TABS: SearchType[] = ["flights"];

const FIELD_LABEL: Record<SearchType, { primary: keyof Dictionary["search"]; secondary: keyof Dictionary["search"] }> = {
  tours: { primary: "destination", secondary: "origin" },
  flights: { primary: "arrival", secondary: "origin" },
  hotels: { primary: "destination", secondary: "dates" },
  excursions: { primary: "destination", secondary: "dates" },
};

export function SearchPanel({
  dict,
  initialType = "flights",
}: {
  dict: Dictionary;
  initialType?: SearchType;
}) {
  const router = useRouter();
  const [type, setType] = useState<SearchType>(initialType);
  const [primary, setPrimary] = useState("");
  const [secondary, setSecondary] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2");
  const [pending, setPending] = useState(false);

  const labels = FIELD_LABEL[type];
  const primaryLabel = dict.search[labels.primary] as string;
  const secondaryLabel = dict.search[labels.secondary] as string;

  const destinationList = useMemo(() => DESTINATIONS.map((d) => d.name), []);
  const cityList = useMemo(() => Object.values(CITIES), []);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    const params = new URLSearchParams({ type });
    if (primary) params.set("q", primary);
    if (secondary) params.set("from", secondary);
    if (type !== "flights" && date) params.set("date", date);
    if (type === "flights" && date) params.set("date", date);
    params.set("guests", guests);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form
      onSubmit={submit}
      className="overflow-hidden rounded-3xl border border-white/60 bg-white shadow-lift"
    >
      <div className="flex flex-wrap gap-1 border-b border-ink-900/8 bg-ivory-50 px-3 pt-3 sm:px-5">
        {TABS.map((tab) => {
          const active = tab === type;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setType(tab)}
              aria-pressed={active}
              className={[
                "relative rounded-t-2xl px-4 py-3 text-sm font-semibold transition sm:px-5",
                active
                  ? "bg-white text-navy-800 shadow-[0_-2px_0_0_#cfa037_inset]"
                  : "text-ink-600 hover:text-navy-700",
              ].join(" ")}
            >
              {dict.search.tabs[tab]}
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 p-4 sm:p-5 md:grid-cols-4">
        <label className="flex flex-col gap-1.5 md:col-span-1">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-600">
            {primaryLabel}
          </span>
          <input
            list={type === "flights" ? "ptd-cities" : "ptd-destinations"}
            value={primary}
            onChange={(e) => setPrimary(e.target.value)}
            placeholder={
              type === "flights"
                ? dict.search.arrivalPlaceholder
                : dict.search.destinationPlaceholder
            }
            className="h-12 rounded-xl border border-ink-900/12 bg-ivory-50 px-3.5 text-sm text-ink-900 outline-none transition placeholder:text-ink-600/60 focus:border-navy-600 focus:bg-white"
          />
        </label>

        <label className="flex flex-col gap-1.5 md:col-span-1">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-600">
            {secondaryLabel}
          </span>
          <input
            list="ptd-all-cities"
            value={secondary}
            onChange={(e) => setSecondary(e.target.value)}
            placeholder={
              type === "flights" ? dict.search.originPlaceholder : dict.search.datesPlaceholder
            }
            className="h-12 rounded-xl border border-ink-900/12 bg-ivory-50 px-3.5 text-sm text-ink-900 outline-none transition placeholder:text-ink-600/60 focus:border-navy-600 focus:bg-white"
          />
        </label>

        <label className="flex flex-col gap-1.5 md:col-span-1">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-600">
            {dict.search.dates}
          </span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-12 rounded-xl border border-ink-900/12 bg-ivory-50 px-3.5 text-sm text-ink-900 outline-none transition focus:border-navy-600 focus:bg-white"
          />
        </label>

        <label className="flex flex-col gap-1.5 md:col-span-1">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-600">
            {dict.search.guests}
          </span>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="h-12 rounded-xl border border-ink-900/12 bg-ivory-50 px-3.5 text-sm text-ink-900 outline-none transition focus:border-navy-600 focus:bg-white"
          >
            {["1", "2", "3", "4", "5", "6"].map((n) => (
              <option key={n} value={n}>
                {n} ×
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-col gap-3 px-4 pb-5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className="text-xs leading-relaxed text-ink-600/80">{dict.search.disclaimer}</p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-navy-800 px-7 text-sm font-bold text-white transition hover:bg-navy-700 disabled:opacity-70"
        >
          {pending ? dict.search.searching : dict.search.submit}
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M2 8h11M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>
      </div>

      <datalist id="ptd-destinations">
        {destinationList.map((name) => (
          <option key={name} value={name} />
        ))}
      </datalist>
      <datalist id="ptd-cities">
        {cityList.map((name) => (
          <option key={name} value={name} />
        ))}
      </datalist>
      <datalist id="ptd-all-cities">
        {cityList.map((name) => (
          <option key={name} value={name} />
        ))}
      </datalist>
      <datalist id="ptd-all-destinations">
        {destinationList.map((name) => (
          <option key={name} value={name} />
        ))}
      </datalist>
    </form>
  );
}
