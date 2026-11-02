import { NextRequest, NextResponse } from "next/server";
import { templates } from "@/content/templates";
import { createPaypalOrder, PayPalError, templateCheckoutReady } from "@/lib/paypal";

export const runtime = "nodejs";

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim()
    || request.headers.get("host")
    || "";
  const fetchSite = request.headers.get("sec-fetch-site");
  if (!origin || !host || (fetchSite && fetchSite !== "same-origin" && fetchSite !== "none")) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "This checkout request could not be verified." }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Send a valid checkout request." }, { status: 415 });
  }

  const length = Number(request.headers.get("content-length") || "0");
  if (length > 2_048) return NextResponse.json({ error: "The checkout request is too large." }, { status: 413 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send a valid checkout request." }, { status: 400 });
  }
  if (typeof body !== "object" || body === null || !("templateId" in body) || typeof body.templateId !== "string") {
    return NextResponse.json({ error: "Choose a template before checkout." }, { status: 400 });
  }

  const template = templates.find((item) => item.id === body.templateId);
  if (!template) return NextResponse.json({ error: "That template could not be found." }, { status: 404 });
  if (!templateCheckoutReady(template)) {
    return NextResponse.json({ error: "This template is not ready for purchase yet." }, { status: 503 });
  }

  try {
    const order = await createPaypalOrder(template);
    return NextResponse.json({ approvalUrl: order.approvalUrl });
  } catch (error) {
    console.error("PayPal checkout order could not be created", error instanceof Error ? error.message : "Unknown error");
    const message = error instanceof PayPalError ? error.message : "PayPal is temporarily unavailable. Please try again.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
