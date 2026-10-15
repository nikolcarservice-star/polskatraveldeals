const LOCALE_TAG = "pl-PL";

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat(LOCALE_TAG, {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat(LOCALE_TAG).format(value);
}

export function formatRating(value: number): string {
  return new Intl.NumberFormat(LOCALE_TAG, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(LOCALE_TAG, {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

export function joinPath(...parts: (string | number)[]): string {
  return parts
    .map((p) => String(p).replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .join("/");
}
