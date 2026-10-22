import { headers } from "next/headers";

function fromEnv(): string | undefined {
  const explicit = process.env.SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (process.env.VERCEL_ENV === "production" && productionHost) return `https://${productionHost}`;
  const deploymentHost = process.env.VERCEL_URL?.trim();
  if (deploymentHost) return `https://${deploymentHost}`;
  return undefined;
}

/** SITE_URL, the Vercel deployment host, or the incoming request. Never invented. */
export async function getOrigin(): Promise<string | undefined> {
  const configured = fromEnv();
  if (configured) return configured;
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
