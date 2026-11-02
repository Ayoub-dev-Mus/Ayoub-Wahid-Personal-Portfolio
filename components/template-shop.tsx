import { ArrowDown, ArrowUpRight, Check, CreditCard, Download, ShieldCheck } from "lucide-react";
import { templates } from "@/content/templates";
import { site } from "@/content/site";
import { templateCheckoutReady, templateFileReady } from "@/lib/paypal";
import { TemplateCatalog } from "./template-catalog";

export function TemplateShop({ checkoutCancelled = false }: { checkoutCancelled?: boolean }) {
  const products = templates.map((template) => ({
    ...template,
    fileReady: templateFileReady(template),
    checkoutReady: templateCheckoutReady(template),
  }));
  const availableCount = products.filter((product) => product.checkoutReady).length;
  const price = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(29);

  return (
    <main>
      <header className="border-b border-ink/10 bg-paper">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
          <a href="/" className="font-display text-xl uppercase tracking-wide">{site.name}</a>
          <nav aria-label="Shop navigation" className="flex items-center gap-2">
            <a href="#templates" className="hidden min-h-11 items-center rounded-full px-4 text-sm font-medium hover:bg-sand sm:inline-flex">Browse templates</a>
            <a href={`mailto:${site.links.email}?subject=${encodeURIComponent("Template shop question")}`} className="inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-sm font-semibold text-paper transition-colors hover:bg-accent hover:text-onaccent">
              Questions? <span className="hidden sm:inline">&nbsp;Contact Ayoub</span><ArrowUpRight size={15} className="ml-1" aria-hidden />
            </a>
          </nav>
        </div>
      </header>

      <section className="px-4 pb-10 pt-12 md:px-8 md:pb-14 md:pt-16">
        <div className="mx-auto max-w-7xl">
          <a href="/" className="inline-flex min-h-10 items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink/60 transition-colors hover:text-ink">
            ← Back to portfolio
          </a>

          <div className="mt-7 grid gap-8 rounded-3xl bg-sand p-5 sm:p-8 lg:grid-cols-[1fr_.55fr] lg:items-end lg:p-10">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.2em] text-ink/60">The digital template shop</p>
              <h1 className="mt-4 max-w-4xl font-display text-5xl uppercase leading-[.9] sm:text-6xl md:text-7xl">
                Skip the blank page. Start with a solid base.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/75 sm:text-lg">
                Shopify storefront concepts and Next.js dashboard starters. Explore the collection, check what’s available, and get in touch if you need help choosing.
              </p>
              <a href="#templates" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-onaccent transition-transform hover:-translate-y-0.5">
                Browse the collection <ArrowDown size={17} aria-hidden />
              </a>
            </div>
            <aside className="rounded-2xl border border-ink/10 bg-paper p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink/55">Every template</p>
              <p className="mt-2 font-display text-4xl uppercase">{price} <span className="font-mono text-xs">USD · one time</span></p>
              <ul className="mt-5 grid gap-3 border-t border-ink/10 pt-4 text-sm">
                <li className="flex items-start gap-2.5"><CreditCard size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />Secure PayPal checkout when available</li>
                <li className="flex items-start gap-2.5"><Download size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />Private download after payment</li>
                <li className="flex items-start gap-2.5"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />{site.shop.license}</li>
              </ul>
            </aside>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            {[
              { n: "01", title: "Choose a base", text: "Filter by platform and search the collection." },
              { n: "02", title: "Check availability", text: "Release status is shown on every product." },
              { n: "03", title: "Build from there", text: "Available purchases include a private ZIP download." },
            ].map((step) => (
              <div key={step.n} className="flex gap-3 rounded-xl border border-ink/10 bg-paper p-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink font-mono text-[10px] text-paper">{step.n}</span>
                <div><p className="text-sm font-semibold">{step.title}</p><p className="mt-1 text-xs leading-relaxed text-ink/60">{step.text}</p></div>
              </div>
            ))}
          </div>

          {!availableCount && (
            <div className="mt-5 flex flex-col gap-3 rounded-xl border border-ink/10 bg-paper p-4 text-sm sm:flex-row sm:items-center sm:justify-between" role="status">
              <p><strong>First releases are in preparation.</strong> Listings will become purchasable as their files and secure checkout are ready.</p>
              <a href={`mailto:${site.links.email}?subject=${encodeURIComponent("Notify me about template releases")}`} className="inline-flex min-h-10 shrink-0 items-center gap-2 font-semibold underline underline-offset-4">
                Ask about a release <ArrowUpRight size={15} aria-hidden />
              </a>
            </div>
          )}
          {checkoutCancelled && (
            <div className="mt-4 rounded-xl border border-ink/10 bg-paper p-4 text-sm" role="status">
              Checkout was cancelled. No payment was taken.
            </div>
          )}
        </div>
      </section>

      <TemplateCatalog products={products} />

      <section className="bg-ink px-4 py-12 text-paper md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-paper/60">Good to know</p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-[.92] sm:text-5xl">No surprises at checkout.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-paper/75">
              Refund requests are reviewed case by case. If a listing is marked “Coming soon,” that product is not available to buy yet and no payment will be taken.
            </p>
          </div>
          <a href={`mailto:${site.links.email}?subject=${encodeURIComponent("Template shop question")}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-paper px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent hover:text-onaccent">
            Ask Ayoub <ArrowUpRight size={16} aria-hidden />
          </a>
        </div>
      </section>

      <footer className="border-t border-ink/10 px-4 py-4 font-mono text-[10px] uppercase tracking-widest md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <span>{site.footer.copy}</span>
          <a href="/" className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4">Back to portfolio <Check size={14} aria-hidden /></a>
        </div>
      </footer>
    </main>
  );
}
