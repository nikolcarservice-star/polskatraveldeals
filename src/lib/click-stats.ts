import { promises as fs } from "node:fs";
import path from "node:path";

export interface ClickEvent {
  ts: string;
  partner: string;
  sub: string;
  target: string;
}

const STATS_DIR = path.join(process.cwd(), "content", "stats");
const CLICKS_FILE = path.join(STATS_DIR, "clicks.ndjson");

/**
 * Best-effort click logging:
 *  - local / self-hosted: appended to `content/stats/clicks.ndjson`
 *  - read-only hosts (Vercel serverless): written to the function log so the
 *    event is never silently dropped
 */
export async function recordClick(event: Omit<ClickEvent, "ts">): Promise<void> {
  const line = JSON.stringify({ ...event, ts: new Date().toISOString() }) + "\n";
  try {
    await fs.mkdir(STATS_DIR, { recursive: true });
    await fs.appendFile(CLICKS_FILE, line, "utf8");
  } catch {
    console.info(`[ptd:click] ${line.trim()}`);
  }
}

export interface ClickStats {
  total: number;
  byPartner: Record<string, number>;
  recent: { ts: string; partner: string; sub: string }[];
  /** `false` when the stats file cannot be read (read-only environment). */
  persisted: boolean;
}

export async function readClickStats(): Promise<ClickStats> {
  try {
    const raw = await fs.readFile(CLICKS_FILE, "utf8");
    const rows = raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line) as ClickEvent;
        } catch {
          return null;
        }
      })
      .filter((row): row is ClickEvent => row !== null);

    const byPartner: Record<string, number> = {};
    for (const row of rows) {
      byPartner[row.partner] = (byPartner[row.partner] ?? 0) + 1;
    }

    return {
      total: rows.length,
      byPartner,
      recent: rows
        .slice(-10)
        .reverse()
        .map((row) => ({ ts: row.ts, partner: row.partner, sub: row.sub })),
      persisted: true,
    };
  } catch {
    return { total: 0, byPartner: {}, recent: [], persisted: false };
  }
}
