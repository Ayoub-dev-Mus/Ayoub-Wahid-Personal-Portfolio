import { NextRequest, NextResponse } from "next/server";
import { site } from "@/content/site";

export const runtime = "nodejs";
export const maxDuration = 20;

const WINDOW_MS = 15 * 60_000;
const PER_ADDRESS = 5;
const PER_INSTANCE = 20;
const attempts = new Map<string, { count: number; expires: number }>();
let instanceCount = 0;
let instanceExpires = 0;

const projectTypes = new Set(site.contact.projectTypes);
const budgets = new Set(site.contact.budgets);

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

function hasControl(value: string, allowNewlines = false) {
  for (const char of value) {
    const code = char.charCodeAt(0);
    if (code === 127) return true;
    if (code < 32 && !(allowNewlines && (code === 10 || code === 13))) return true;
  }
  return false;
}

export async function POST(request: NextRequest) {
  if (!fromThisSite(request)) return fail("Please send your message from this website.", 403);
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return fail("Please submit the contact form as JSON.", 415);
  }
  if (limited(clientAddress(request))) return fail("Too many messages. Please try again in 15 minutes.", 429);

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 12_000) return fail("Your message is too long.", 413);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return fail("Please complete all required fields.", 400);
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return fail("The message could not be read. Please try again.", 400);
  }
  if (body.website) return fail("The message could not be accepted.", 400);
  const field = (key: string) => typeof body[key] === "string" ? body[key].trim() : "";
  const name = field("name");
  const email = field("email");
  const projectType = field("projectType");
  const budget = field("budget");
  const message = field("message");
  if (name.length < 2 || name.length > 100 || hasControl(name)) return fail("Please enter a name between 2 and 100 characters.", 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return fail("Please enter a valid email address.", 400);
  if (!projectTypes.has(projectType)) return fail("Please select a project type.", 400);
  if (budget && (budget.length > 100 || !budgets.has(budget))) return fail("Please choose a valid budget range.", 400);
  if (message.length < 10 || message.length > 5000 || hasControl(message, true)) return fail("Please write a message between 10 and 5,000 characters.", 400);

  const setting = (key: string) => {
    const value = process.env[key];
    return typeof value === "string" ? value.trim() : "";
  };
  const apiKey = setting("RESEND_API_KEY");
  const to = setting("CONTACT_TO_EMAIL");
  const from = setting("CONTACT_FROM_EMAIL");
  const missing = [
    !apiKey && "RESEND_API_KEY",
    !to && "CONTACT_TO_EMAIL",
    !from && "CONTACT_FROM_EMAIL",
  ].filter((item) => item !== false);
  if (missing.length) {
    return fail(`Email delivery is not configured yet. Missing ${missing.join(", ")}. Save them for Production, then redeploy.`, 503);
  }

  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio enquiry: ${projectType}`,
        text: `Name: ${name}\nEmail: ${email}\nProject type: ${projectType}\nBudget: ${budget || "Not specified"}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!result.ok) {
      let detail = "";
      try {
        const payload: unknown = await result.json();
        const message = payload && typeof payload === "object" && "message" in payload ? payload.message : "";
        if (typeof message === "string") detail = message.replace(/\s+/g, " ").slice(0, 180);
      } catch { /* keep the generic failure */ }
      return fail(detail ? `Email delivery failed. ${detail}` : "Email delivery failed. Please try again later.", 502);
    }
    return NextResponse.json({
      success: true,
      message: "Thanks for getting in touch. Your message has been sent, and I'll reply within 24 hours.",
    });
  } catch {
    return fail("Email delivery is temporarily unavailable. Please try again.", 502);
  }
}
