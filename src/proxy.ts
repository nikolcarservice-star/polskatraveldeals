import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES, isLocale } from "@/i18n/config";

const SUPPORTED = LOCALES as readonly string[];

function pickLocale(header: string | null): string | null {
  if (!header) return null;
  const scored = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="));
      const quality = q ? Number.parseFloat(q.slice(2)) : 1;
      return { tag: tag.trim().toLowerCase(), quality: Number.isNaN(quality) ? 0 : quality };
    })
    .filter((entry) => entry.tag)
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of scored) {
    const base = tag.split("-")[0];
    if (SUPPORTED.includes(base)) return base;
    if (tag === "be" || tag === "uk") return "uk";
  }
  return null;
}

/**
 * Locale routing: Polish (the default) is served from the root, every other
 * language from its own prefix (`/uk`, `/ru`, `/en`). An explicit choice is
 * remembered in a cookie, otherwise we fall back to the Accept-Language header.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (first && isLocale(first)) {
    if (first === DEFAULT_LOCALE) {
      const rest = pathname.slice(DEFAULT_LOCALE.length) || "/";
      const url = request.nextUrl.clone();
      url.pathname = rest.startsWith("/") ? rest : `/${rest}`;
      return NextResponse.redirect(url, 308);
    }
    return NextResponse.next();
  }

  const cookieLocale = request.cookies.get("ptd-locale")?.value;
  const preferred =
    cookieLocale && isLocale(cookieLocale)
      ? cookieLocale
      : pickLocale(request.headers.get("accept-language")) ?? DEFAULT_LOCALE;

  if (preferred === DEFAULT_LOCALE) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: [
    "/((?!_next|api|admin|favicon|robots|sitemap|opengraph-image|twitter-image|apple-icon|icon|.*\\..*).*)",
  ],
};
