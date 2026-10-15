"use client";

import { useEffect, useRef } from "react";

/**
 * Loads a third-party search widget (Travelpayouts content script) into the
 * container on mount. The script is injected only in the browser and removed
 * on unmount, so SSR stays clean.
 */
export function ScriptWidget({
  src,
  id = "ptd-search-widget",
}: {
  src: string;
  id?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const script = document.createElement("script");
    script.async = true;
    script.charset = "utf-8";
    script.src = src;
    host.appendChild(script);

    return () => {
      script.remove();
    };
  }, [src]);

  return <div ref={hostRef} id={id} className="min-h-24" />;
}
