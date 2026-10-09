import { headers } from "next/headers";

/** SITE_URL if configured, otherwise derived from the incoming request. Never invented. */
export async function getOrigin(): Promise<string | undefined> {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  try {
    const h = await headers();
    const host = h.get("x-forwarded-host") ?? h.get("host");
    if (!host) return undefined;
    const proto = h.get("x-forwarded-proto")?.split(",")[0] ?? (host.startsWith("localhost") ? "http" : "https");
    return `${proto}://${host}`;
  } catch {
    return undefined;
  }
}
