import { ArrowLeft } from "lucide-react";
import { site } from "@/content/site";
import { capturePaypalOrder, createDownloadToken, PayPalError } from "@/lib/paypal";
import { TemplateAutoDownload } from "@/components/template-auto-download";

export const runtime = "nodejs";

type Props = { searchParams: Promise<{ token?: string | string[] }> };

export default async function ShopCompletePage({ searchParams }: Props) {
  const { token } = await searchParams;
  if (typeof token !== "string") return <PaymentMessage message="We couldn’t verify the PayPal order. No download has been created." />;

  try {
    const template = await capturePaypalOrder(token);
    const downloadToken = createDownloadToken(token);
    return (
      <main className="grid min-h-screen place-items-center px-4 py-16">
        <section className="w-full max-w-xl rounded-3xl border border-ink bg-paper p-6 sm:p-10">
          <p className="font-mono text-xs uppercase tracking-widest text-emerald-700">Payment confirmed</p>
          <h1 className="mt-4 font-display text-5xl uppercase leading-[.9] sm:text-6xl">You’re ready to build.</h1>
          <p className="mt-4 leading-relaxed">Your {template.name} download is ready. It should start automatically; if it doesn’t, use the button below.</p>
          <TemplateAutoDownload href={`/shop/download?token=${encodeURIComponent(downloadToken)}`} filename={`${template.id}.zip`} />
          <a href="/shop" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm underline underline-offset-4">
            <ArrowLeft size={15} aria-hidden /> Back to the template shop
          </a>
        </section>
      </main>
    );
  } catch (error) {
    if (!(error instanceof PayPalError)) throw error;
    return <PaymentMessage message="We couldn’t confirm this payment with PayPal. Please contact Ayoub before trying again." />;
  }
}

function PaymentMessage({ message }: { message: string }) {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-16">
      <section className="w-full max-w-xl rounded-3xl border border-ink bg-paper p-6 sm:p-10">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Payment status</p>
        <h1 className="mt-4 font-display text-5xl uppercase leading-[.9]">Let’s check your order.</h1>
        <p className="mt-4 leading-relaxed">{message}</p>
        <a href={`mailto:${site.links.email}?subject=${encodeURIComponent("PayPal template order")}`} className="mt-7 inline-flex min-h-12 items-center rounded-full bg-ink px-6 py-3 font-semibold text-paper">Contact Ayoub</a>
        <a href="/shop" className="ml-4 inline-flex min-h-11 items-center text-sm underline underline-offset-4">Back to the shop</a>
      </section>
    </main>
  );
}
