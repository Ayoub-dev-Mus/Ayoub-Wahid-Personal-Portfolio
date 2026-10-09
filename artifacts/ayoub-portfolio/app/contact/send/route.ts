import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const attempts = new Map<string, { count: number; expires: number }>();
const projectTypes = new Set([
  "Shopify store",
  "AI agent",
  "SaaS or web app",
  "Mobile app",
  "Other",
]);

function fail(error: string, status: number) {
  return NextResponse.json({ success: false, error }, { status });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host")?.split(",")[0].trim() || request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return fail("Please send your message from this website.", 403);
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return fail("Please submit the contact form as JSON.", 415);
  }
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  for (const [key, value] of attempts) {
    if (value.expires < now) attempts.delete(key);
  }
  const attempt = attempts.get(ip) || { count: 0, expires: now + 15 * 60_000 };
  if (attempt.count >= 5) return fail("Too many messages. Please try again in 15 minutes.", 429);
  attempt.count++;
  if (attempts.size < 10_000 || attempts.has(ip)) attempts.set(ip, attempt);

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
  if (name.length < 2 || name.length > 100) return fail("Please enter a name between 2 and 100 characters.", 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return fail("Please enter a valid email address.", 400);
  if (!projectTypes.has(projectType)) return fail("Please select a project type.", 400);
  if (budget.length > 100) return fail("Please choose a valid budget range.", 400);
  if (message.length < 10 || message.length > 5000) return fail("Please write a message between 10 and 5,000 characters.", 400);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return fail("Email delivery is not configured yet. Please use the Upwork link to get in touch.", 503);
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
    if (!result.ok) return fail("Email delivery failed. Please try again later or contact me on Upwork.", 502);
    return NextResponse.json({
      success: true,
      message: "Thanks for getting in touch. Your message has been sent, and I'll reply within 24 hours.",
    });
  } catch {
    return fail("Email delivery is temporarily unavailable. Please try again or contact me on Upwork.", 502);
  }
}
