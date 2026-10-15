"use client";

import { useMemo, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { REGIONS, type Destination, type RegionKey } from "@/lib/data";
import { DestinationCard } from "@/components/destination-card";

export function DestinationGrid({
  destinations,
  dict,
  showRegions = true,
  priorityCount = 4,
}: {
  destinations: Destination[];
  dict: Dictionary;
  showRegions?: boolean;
  priorityCount?: number;
}) {
  const [region, setRegion] = useState<RegionKey | "all">("all");

  const available = useMemo(() => {
    const keys = new Set(destinations.map((destination) => destination.region));
    return REGIONS.filter((item) => keys.has(item.key));
  }, [destinations]);

  const visible = useMemo(
    () =>
      region === "all"
        ? destinations
        : destinations.filter((destination) => destination.region === region),
    [destinations, region]
  );

  const showRegionFilter = showRegions && available.length > 1;

  return (
    <div className="flex flex-col gap-6">
      {showRegionFilter ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-bold uppercase tracking-wider text-ink-600">
            {dict.destinations.region}
          </span>
          <button
            type="button"
            onClick={() => setRegion("all")}
            className={[
              "h-9 rounded-full px-4 text-xs font-semibold transition",
              region === "all"
                ? "bg-navy-800 text-white"
                : "border border-ink-900/12 bg-white text-ink-700 hover:border-navy-600 hover:text-navy-700",
            ].join(" ")}
          >
            {dict.destinations.all}
          </button>
          {available.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setRegion(item.key)}
              className={[
                "h-9 rounded-full px-4 text-xs font-semibold transition",
                region === item.key
                  ? "bg-navy-800 text-white"
                  : "border border-ink-900/12 bg-white text-ink-700 hover:border-navy-600 hover:text-navy-700",
              ].join(" ")}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}

      {visible.length === 0 ? (
        <p className="surface-card px-6 py-12 text-center text-sm text-ink-600">
          {dict.deals.empty}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {visible.map((destination, index) => (
            <DestinationCard
              key={destination.slug}
              destination={destination}
              dict={dict}
              priority={index < priorityCount}
            />
          ))}
        </div>
      )}
    </div>
  );
}
