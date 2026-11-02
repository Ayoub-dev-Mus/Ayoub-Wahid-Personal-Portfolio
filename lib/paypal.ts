import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { existsSync } from "node:fs";
import path from "node:path";
import { templates, type Template } from "@/content/templates";
import { site } from "@/content/site";

const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const paypalHosts = {
  live: "https://api-m.paypal.com",
  sandbox: "https://api-m.sandbox.paypal.com",
} as const;

type PaypalMode = keyof typeof paypalHosts;
type PaypalConfig = { mode: PaypalMode; clientId: string; clientSecret: string; origin: string };

export class PayPalError extends Error {}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function readJson(response: Response): Promise<Record<string, unknown>> {
  let value: unknown;
  try {
    value = await response.json();
  } catch {
    throw new PayPalError("PayPal returned an unreadable response.");
  }
  if (!isRecord(value)) throw new PayPalError("PayPal returned an invalid response.");
  return value;
}

async function paypalFetch(url: string, init: RequestInit) {
  try {
    return await fetch(url, { ...init, cache: "no-store", signal: AbortSignal.timeout(10_000) });
  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") {
      throw new PayPalError("PayPal did not respond in time. Please try again.");
    }
    throw new PayPalError("PayPal could not be reached. Please try again.");
  }
}

function paypalConfig(): PaypalConfig | null {
  const mode = process.env.PAYPAL_MODE?.trim();
  const clientId = process.env.PAYPAL_CLIENT_ID?.trim();
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET?.trim();
  const configuredOrigin = process.env.SITE_URL?.trim();

  if (!clientId || !clientSecret || (mode !== "live" && mode !== "sandbox") || !configuredOrigin) return null;
  if (process.env.NODE_ENV === "production" && mode !== "live") return null;

  try {
    const url = new URL(configuredOrigin);
    if (url.protocol !== "https:" || url.pathname !== "/" || url.search || url.hash) return null;
    return { mode, clientId, clientSecret, origin: url.origin };
  } catch {
    return null;
  }
}

function archivePath(templateId: string) {
  if (!templates.some((template) => template.id === templateId)) {
    throw new PayPalError("That template is not available.");
  }
  return path.join(process.cwd(), "private", "templates", `${templateId}.zip`);
}

export function templateFileReady(template: Template) {
  return existsSync(archivePath(template.id));
}

export function templateCheckoutReady(template: Template) {
  return Boolean(
    site.shop.refundPolicy?.trim()
    && paypalConfig()
    && templateFileReady(template),
  );
}

function requireConfig() {
  const config = paypalConfig();
  if (!config) throw new PayPalError("PayPal checkout is not configured.");
  return config;
}

async function accessToken(config: PaypalConfig) {
  const response = await paypalFetch(`${paypalHosts[config.mode]}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${config.clientId}:${config.clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await readJson(response);
  if (!response.ok || typeof data.access_token !== "string") {
    throw new PayPalError("PayPal could not authorize the checkout request.");
  }
  return data.access_token;
}

async function paypalRequest(config: PaypalConfig, token: string, endpoint: string, init?: RequestInit) {
  const response = await paypalFetch(`${paypalHosts[config.mode]}${endpoint}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  const data = await readJson(response);
  if (!response.ok) throw new PayPalError("PayPal could not complete the payment request.");
  return data;
}

export async function createPaypalOrder(template: Template) {
  const config = requireConfig();
  if (!site.shop.refundPolicy?.trim() || !templateFileReady(template)) {
    throw new PayPalError("This template is not ready for purchase yet.");
  }

  const token = await accessToken(config);
  const order = await paypalRequest(config, token, "/v2/checkout/orders", {
    method: "POST",
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{
        reference_id: template.id,
        custom_id: template.id,
        description: `${template.name} — ${template.category}`,
        amount: { currency_code: template.currency, value: template.price.toFixed(2) },
      }],
      payment_source: {
        paypal: {
          experience_context: {
            brand_name: site.name,
            payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
            shipping_preference: "NO_SHIPPING",
            user_action: "PAY_NOW",
            return_url: `${config.origin}/shop/complete`,
            cancel_url: `${config.origin}/shop?checkout=cancelled`,
          },
        },
      },
    }),
  });

  if (typeof order.id !== "string" || !/^[A-Z0-9-]{10,64}$/.test(order.id) || !Array.isArray(order.links)) {
    throw new PayPalError("PayPal did not return a valid checkout link.");
  }

  const approval = order.links
    .map((link) => isRecord(link) ? link : null)
    .find((link) => link?.rel === "approve" || link?.rel === "payer-action");
  if (typeof approval?.href !== "string") throw new PayPalError("PayPal did not return an approval link.");

  let approvalUrl: URL;
  try {
    approvalUrl = new URL(approval.href);
  } catch {
    throw new PayPalError("PayPal returned an invalid approval link.");
  }
  if (approvalUrl.protocol !== "https:" || !(approvalUrl.hostname === "paypal.com" || approvalUrl.hostname.endsWith(".paypal.com"))) {
    throw new PayPalError("PayPal returned an untrusted approval link.");
  }

  return { id: order.id, approvalUrl: approvalUrl.toString() };
}

function orderIdIsValid(orderId: string) {
  return /^[A-Z0-9-]{10,64}$/.test(orderId);
}

function templateFromCapturedOrder(order: Record<string, unknown>, orderId: string): Template {
  if (order.id !== orderId || order.status !== "COMPLETED" || !Array.isArray(order.purchase_units) || order.purchase_units.length !== 1) {
    throw new PayPalError("PayPal has not confirmed this payment.");
  }

  const unit = order.purchase_units[0];
  if (!isRecord(unit) || typeof unit.custom_id !== "string") {
    throw new PayPalError("The payment does not match a template.");
  }
  const template = templates.find((item) => item.id === unit.custom_id);
  if (!template) throw new PayPalError("The payment does not match a template.");

  const amount = isRecord(unit.amount) ? unit.amount : null;
  const payments = isRecord(unit.payments) ? unit.payments : null;
  const captures = Array.isArray(payments?.captures) ? payments.captures : [];
  const capture = captures.find((item) => isRecord(item) && item.status === "COMPLETED");
  const capturedAmount = isRecord(capture) && isRecord(capture.amount) ? capture.amount : null;
  const expectedValue = template.price.toFixed(2);

  if (
    amount?.currency_code !== template.currency
    || amount.value !== expectedValue
    || capturedAmount?.currency_code !== template.currency
    || capturedAmount.value !== expectedValue
  ) {
    throw new PayPalError("The captured payment amount does not match this template.");
  }

  return template;
}

export async function capturePaypalOrder(orderId: string) {
  if (!orderIdIsValid(orderId)) throw new PayPalError("The PayPal order ID is invalid.");
  const config = requireConfig();
  const token = await accessToken(config);
  let order = await paypalRequest(config, token, `/v2/checkout/orders/${encodeURIComponent(orderId)}`);

  if (order.status === "APPROVED") {
    try {
      order = await paypalRequest(config, token, `/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: "{}",
      });
    } catch (error) {
      const current = await paypalRequest(config, token, `/v2/checkout/orders/${encodeURIComponent(orderId)}`);
      if (current.status !== "COMPLETED") throw error;
      order = current;
    }
  }

  return templateFromCapturedOrder(order, orderId);
}

export async function verifyPaypalOrder(orderId: string) {
  if (!orderIdIsValid(orderId)) throw new PayPalError("The PayPal order ID is invalid.");
  const config = requireConfig();
  const token = await accessToken(config);
  const order = await paypalRequest(config, token, `/v2/checkout/orders/${encodeURIComponent(orderId)}`);
  return templateFromCapturedOrder(order, orderId);
}

export function createDownloadToken(orderId: string) {
  const config = requireConfig();
  const expiresAt = Date.now() + TOKEN_TTL_MS;
  const payload = `${orderId}.${expiresAt}`;
  const signature = createHmac("sha256", config.clientSecret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function verifyDownloadToken(value: string) {
  const [orderId, expires, signature, extra] = value.split(".");
  if (extra !== undefined || !orderId || !orderIdIsValid(orderId) || !expires || !signature) return null;
  const expiresAt = Number(expires);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Date.now() || expiresAt > Date.now() + TOKEN_TTL_MS) return null;

  const config = paypalConfig();
  if (!config) return null;
  const expected = createHmac("sha256", config.clientSecret).update(`${orderId}.${expiresAt}`).digest();
  let supplied: Buffer;
  try {
    supplied = Buffer.from(signature, "base64url");
  } catch {
    return null;
  }
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return null;
  return orderId;
}

export { archivePath as templateArchivePath };
