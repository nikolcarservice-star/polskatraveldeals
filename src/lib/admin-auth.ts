import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "ptd-admin-session";

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "ptd-admin";
}

export function sessionToken(): string {
  return createHash("sha256").update(`ptd:${adminPassword()}`).digest("hex");
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const session = store.get(ADMIN_COOKIE)?.value;
  if (!session) return false;
  const expected = sessionToken();
  if (session.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(session, "utf8"), Buffer.from(expected, "utf8"));
}
