/** Public site URL from configuration. Does not read the request, so pages can stay cached. */
export function publicOrigin(): string | undefined {
  const explicit = process.env.SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (process.env.VERCEL_ENV === "production" && productionHost) return `https://${productionHost}`;
  const deploymentHost = process.env.VERCEL_URL?.trim();
  if (deploymentHost) return `https://${deploymentHost}`;
  return undefined;
}
