"use client";
import { useState } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";

export function TemplatePurchaseButton({ templateId, label }: { templateId: string; label: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function beginCheckout() {
    if (pending) return;
    setPending(true);
    setError("");

    try {
      const response = await fetch("/shop/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId }),
      });
      let result: unknown;
      try {
        result = await response.json();
      } catch {
        throw new Error("PayPal checkout returned an unexpected response. Please try again.");
      }
      if (!response.ok || !result || typeof result !== "object" || !("approvalUrl" in result) || typeof result.approvalUrl !== "string") {
        const message = result && typeof result === "object" && "error" in result && typeof result.error === "string"
          ? result.error
          : "PayPal checkout could not be started. Please try again.";
        throw new Error(message);
      }

      const approval = new URL(result.approvalUrl);
      if (approval.protocol !== "https:" || !(approval.hostname === "paypal.com" || approval.hostname.endsWith(".paypal.com"))) {
        throw new Error("PayPal returned an invalid checkout link. Please try again.");
      }
      window.location.assign(approval);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "PayPal checkout could not be started. Please try again.");
      setPending(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={beginCheckout}
        disabled={pending}
        className="group inline-flex min-h-12 w-full items-center justify-between gap-3 rounded-full bg-accent px-5 py-3 font-semibold text-onaccent transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
      >
        {pending ? "Opening PayPal…" : label}
        {pending ? <LoaderCircle size={18} className="animate-spin" aria-hidden /> : <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" aria-hidden />}
      </button>
      <p className="mt-2 min-h-5 text-sm text-[#9e341b]" role="alert">{error}</p>
    </div>
  );
}
