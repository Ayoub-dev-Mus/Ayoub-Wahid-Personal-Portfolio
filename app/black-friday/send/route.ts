import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 20;

const WINDOW_MS = 15 * 60_000;
const PER_ADDRESS = 5;
const PER_INSTANCE = 20;
const attempts = new Map<string, { count: number; expires: number }>();
let instanceCount = 0;
let instanceExpires = 0;

function fail(error: string, status: number) {
  return NextResponse.json({ success: false, error }, { status });
}

function requestHost(request: NextRequest) {
  return request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() || request.headers.get("host") || "";
}

function fromThisSite(request: NextRequest) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "none") return false;
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === requestHost(request);
  } catch {
    return false;
  }
}

function clientAddress(request: NextRequest) {
  return request.headers.get("x-real-ip")?.trim()
    || request.headers.get("x-forwarded-for")?.split(",").pop()?.trim()
    || "unknown";
}

function limited(address: string) {
  const now = Date.now();
  if (instanceExpires < now) {
    instanceCount = 0;
    instanceExpires = now + WINDOW_MS;
  }
  if (instanceCount >= PER_INSTANCE) return true;
  for (const [key, value] of attempts) {
    if (value.expires < now) attempts.delete(key);
  }
  const attempt = attempts.get(address) || { count: 0, expires: now + WINDOW_MS };
  if (attempt.count >= PER_ADDRESS) return true;
  attempt.count += 1;
  instanceCount += 1;
  if (attempts.size < 10_000 || attempts.has(address)) attempts.set(address, attempt);
  return false;
}

function hasControl(value: string) {
  for (const char of value) {
    const code = char.charCodeAt(0);
    if (code < 32 || code === 127) return true;
  }
  return false;
}

function safe(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(request: NextRequest) {
  if (!fromThisSite(request)) return fail("Please send your request from this website.", 403);
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return fail("Please submit the form as JSON.", 415);
  }
  if (limited(clientAddress(request))) return fail("Too many requests. Please try again in 15 minutes.", 429);

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 4_000) return fail("Your request is too long.", 413);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return fail("Please complete the required fields.", 400);
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return fail("The request could not be read. Please try again.", 400);
  }

  const field = (key: string) => typeof body[key] === "string" ? body[key].trim() : "";
  const name = field("name");
  const shop = field("shop");
  const date = field("date");
  const contact = field("contact");
  const lang = field("lang") === "en" ? "en" : "fr";
  if (name.length > 80 || hasControl(name)) return fail("Please check the name.", 400);
  if (shop.length < 2 || shop.length > 300 || hasControl(shop)) return fail("Add the link to your shop or account.", 400);
  if (date.length > 80 || hasControl(date)) return fail("Please check the promotion date.", 400);
  if (contact.length < 3 || contact.length > 200 || hasControl(contact)) return fail("Add a WhatsApp or an email so I can reply.", 400);

  const token = process.env.TELEGRAM_BOT_TOKEN?.trim() || "";
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim() || "";
  if (!token || !chatId) return fail("Telegram delivery is not configured yet.", 503);

  const text = [
    "<b>Black Friday preview</b>",
    "",
    `<b>Name</b>\n${safe(name || "—")}`,
    `<b>Shop</b>\n${safe(shop)}`,
    `<b>Promo date</b>\n${safe(date || "—")}`,
    `<b>Contact</b>\n${safe(contact)}`,
    `<b>Language</b>\n${lang}`,
  ].join("\n");

  try {
    const result = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!result.ok) {
      console.error("Black Friday Telegram alert failed", result.status);
      return fail("The request could not be sent. Please try again.", 502);
    }
    return NextResponse.json({ success: true });
  } catch {
    return fail("Telegram is temporarily unavailable. Please try again.", 502);
  }
}
