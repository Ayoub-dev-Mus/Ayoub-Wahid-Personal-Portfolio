"use client";
import { useMemo, useState } from "react";
import { ArrowUpRight, Check, Search, ShieldCheck } from "lucide-react";
import type { Template } from "@/content/templates";
import { site } from "@/content/site";
import { TemplatePurchaseButton } from "./template-purchase-button";

type CatalogTemplate = Template & { fileReady: boolean; checkoutReady: boolean };
type Category = "All" | "Shopify" | "Next.js";

function TemplatePreview({ kind }: { kind: Template["preview"] }) {
  if (kind === "atelier" || kind === "goods") {
    const atelier = kind === "atelier";
    return (
      <div className={`h-full p-4 sm:p-5 ${atelier ? "bg-[#d9c8b3] text-[#29251f]" : "bg-[#e7e5df] text-[#24231f]"}`}>
        <div className="flex items-center justify-between border-b border-current/30 pb-2 font-mono text-[8px] uppercase tracking-[.14em] sm:text-[9px]">
          <span>{atelier ? "Atelier / Objects" : "Goods / Supply"}</span><span>Menu&nbsp;&nbsp; Bag (0)</span>
        </div>
        <div className={`mt-3 grid min-h-40 gap-2 ${atelier ? "grid-cols-[1.2fr_.8fr]" : "grid-cols-2"}`}>
          <div className={`flex flex-col justify-between p-3 sm:p-4 ${atelier ? "bg-[#c3a78a]" : "bg-[#c8c8be]"}`}>
            <span className="font-mono text-[7px] uppercase tracking-widest">Collection 01 — New season</span>
            <span className="max-w-[12rem] font-display text-3xl uppercase leading-[.9] sm:text-4xl">{atelier ? "Made to move." : "Less, but better."}</span>
            <span className="font-mono text-[7px] uppercase underline underline-offset-4">Explore collection ↗</span>
          </div>
          <div className={`flex items-end p-3 sm:p-4 ${atelier ? "bg-[#aa9981]" : "bg-[#a9afa4]"}`}>
            <div className="h-16 w-full rounded-t-full border border-current/40 sm:h-20" />
          </div>
        </div>
      </div>
    );
  }

  const metrics = kind === "metrics";
  return (
    <div className="flex h-full min-h-52 gap-3 bg-[#242421] p-4 text-[#f4efe6]">
      <div className="hidden w-9 shrink-0 border-r border-white/15 sm:block">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-[#d9572b] font-display text-xs">A</span>
        <div className="mt-4 space-y-3">{[0, 1, 2, 3].map((n) => <span key={n} className={`block h-1.5 rounded-full ${n === 0 ? "w-5 bg-[#d9572b]" : "w-3 bg-white/25"}`} />)}</div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between border-b border-white/15 pb-2 font-mono text-[8px] uppercase tracking-widest">
          <span>{metrics ? "Overview" : "Workspace"}</span><span>•••</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((n) => (
            <div key={n} className="rounded-md border border-white/15 p-2">
              <span className="block h-1 w-6 rounded bg-white/30" />
              <span className="mt-2 block font-display text-lg">{metrics ? ["$24k", "1.8k", "12%"][n] : ["08", "24", "03"][n]}</span>
              <span className="mt-1 block h-1 w-8 rounded bg-[#d9572b]/80" />
            </div>
          ))}
        </div>
        <div className="mt-3 flex h-16 items-end gap-1 border-b border-l border-white/20 px-2">
          {[30, 55, 42, 75, 48, 92, 63, 80, 55, 100, 72, 88].map((height, n) => (
            <span key={n} className="flex-1 rounded-t-sm bg-[#d9572b]/80" style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: CatalogTemplate }) {
  const price = new Intl.NumberFormat("en-US", { style: "currency", currency: product.currency, maximumFractionDigits: 0 }).format(product.price);
  const category = product.category === "Shopify theme" ? "Shopify" : "Next.js";
  const subject = encodeURIComponent(`Template release: ${product.name}`);

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-ink/15 bg-white shadow-[0_8px_24px_-22px_rgba(20,20,20,.5)] transition-shadow hover:shadow-[0_14px_32px_-22px_rgba(20,20,20,.55)]">
      <div
        className="relative overflow-hidden border-b border-ink/10"
        aria-label={`Illustrative concept preview for ${product.name}, not a screenshot of the downloadable template`}
      >
        <TemplatePreview kind={product.preview} />
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <span className="rounded-full bg-paper px-3 py-1 font-mono text-[9px] uppercase tracking-wider">{product.category}</span>
          <span className={`rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-wider ${product.fileReady ? "bg-emerald-100 text-emerald-950" : "bg-paper"}`}>
            {product.fileReady ? "Ready to download" : "Coming soon"}
          </span>
        </div>
        <span className="absolute bottom-3 left-3 rounded-full bg-paper/90 px-2.5 py-1 font-mono text-[8px] uppercase tracking-wider">Concept preview</span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[.16em] text-ink/55">{product.number} / {category}</span>
          <span className="shrink-0 font-display text-2xl">{price} <span className="font-mono text-[9px] uppercase">{product.currency}</span></span>
        </div>
        <h3 className="mt-4 font-display text-3xl uppercase leading-[.95] sm:text-4xl">{product.name}</h3>
        <p className="mt-2 text-sm font-medium leading-snug">{product.title}</p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{product.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${product.name} template details`}>
          {product.tags.map((tag) => (
            <li key={tag} className="rounded-full bg-sand/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider">{tag}</li>
          ))}
        </ul>

        <div className="mt-5 border-t border-ink/10 pt-4">
          <p className="flex gap-2 text-xs leading-relaxed text-ink/70">
            <ShieldCheck size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden />
            <span>One end product per purchase. Refund requests reviewed case by case.</span>
          </p>
          <div className="mt-4">
            {product.checkoutReady ? (
              <TemplatePurchaseButton templateId={product.id} label={`Buy now · ${price}`} />
            ) : product.fileReady ? (
              <div className="rounded-xl bg-sand/70 p-3 text-xs leading-relaxed" role="status">
                <span className="flex items-center gap-2 font-semibold"><Check size={14} aria-hidden /> Files are ready</span>
                <span className="mt-1 block text-ink/70">Checkout is being configured. No payment is taken yet.</span>
              </div>
            ) : (
              <a
                href={`mailto:${site.links.email}?subject=${subject}`}
                className="group inline-flex min-h-11 w-full items-center justify-between gap-2 rounded-full border border-ink/20 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-ink hover:bg-sand"
              >
                Ask about this release
                <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function TemplateCatalog({ products }: { products: CatalogTemplate[] }) {
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const categories: Category[] = ["All", "Shopify", "Next.js"];
  const counts = {
    All: products.length,
    Shopify: products.filter((product) => product.category === "Shopify theme").length,
    "Next.js": products.filter((product) => product.category === "Next.js dashboard").length,
  };
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === "All"
        || (category === "Shopify" && product.category === "Shopify theme")
        || (category === "Next.js" && product.category === "Next.js dashboard");
      const searchable = [product.name, product.category, product.title, product.description, ...product.tags].join(" ").toLowerCase();
      return matchesCategory && (!normalized || searchable.includes(normalized));
    });
  }, [category, products, query]);

  return (
    <section id="templates" className="scroll-mt-24 px-4 pb-20 md:px-8 md:pb-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 border-b border-ink/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-ink/55">Browse the collection</p>
            <h2 className="mt-2 font-display text-4xl uppercase leading-none sm:text-5xl">Find your starting point</h2>
          </div>
          <p className="text-sm text-ink/60" aria-live="polite">
            Showing {filtered.length} of {products.length} templates
          </p>
        </div>

        <div className="sticky top-0 z-20 -mx-4 mt-4 border-b border-ink/10 bg-paper/95 px-4 py-3 backdrop-blur-md md:-mx-8 md:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-0.5" aria-label="Filter templates by platform">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                  className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors ${category === item ? "bg-ink text-paper" : "border border-ink/15 bg-paper hover:bg-sand"}`}
                >
                  {item}<span className="font-mono text-[10px] opacity-65">{counts[item]}</span>
                </button>
              ))}
            </div>
            <label className="relative block w-full sm:max-w-xs">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/45" aria-hidden />
              <span className="sr-only">Search templates</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search templates"
                className="min-h-10 w-full rounded-full border border-ink/15 bg-paper py-2 pl-9 pr-4 text-sm outline-none transition-shadow placeholder:text-ink/45 focus:shadow-[0_0_0_2px_rgb(var(--accent))]"
              />
            </label>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-ink/25 px-5 py-12 text-center">
            <p className="font-display text-3xl uppercase">No matching templates</p>
            <p className="mt-2 text-sm text-ink/65">Try another search or browse the full collection.</p>
            <button type="button" onClick={() => { setCategory("All"); setQuery(""); }} className="mt-5 inline-flex min-h-11 items-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper">Clear filters</button>
          </div>
        )}
      </div>
    </section>
  );
}
