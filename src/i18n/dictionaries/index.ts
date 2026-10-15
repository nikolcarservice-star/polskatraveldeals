import { pl } from "./pl";

export type Dictionary = typeof pl;

export const dict: Dictionary = pl;

/** Replace `{token}` placeholders inside strings. */
export function interpolate(
  template: string,
  values: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match
  );
}
