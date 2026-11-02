import { readFile } from "node:fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { PayPalError, templateArchivePath, verifyDownloadToken, verifyPaypalOrder } from "@/lib/paypal";

export const runtime = "nodejs";

function isMissingFile(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const orderId = token ? verifyDownloadToken(token) : null;
  if (!orderId) {
    return NextResponse.json({ error: "This download link is invalid or has expired." }, { status: 401 });
  }

  try {
    const template = await verifyPaypalOrder(orderId);
    const archive = await readFile(templateArchivePath(template.id));
    return new Response(new Uint8Array(archive), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${template.id}.zip"`,
        "Content-Length": String(archive.byteLength),
        "Cache-Control": "private, no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    if (isMissingFile(error)) {
      return NextResponse.json({ error: "The template file is not available yet. Contact Ayoub for help." }, { status: 503 });
    }
    if (error instanceof PayPalError) {
      return NextResponse.json({ error: "The payment could not be verified. Contact Ayoub for help." }, { status: 503 });
    }
    console.error("Paid template download failed", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "The download could not be prepared. Contact Ayoub for help." }, { status: 500 });
  }
}
