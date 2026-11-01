import { site } from "@/content/site";

export function BrandRow() {
  return (
    <section
      aria-label={site.brands.title}
      className="px-4 pb-14 md:px-8 md:pb-20"
    >
      <div className="mx-auto max-w-7xl border-y border-ink/20 py-5">
        <p className="font-mono text-[10px] uppercase tracking-[.2em] opacity-60">
          {site.brands.title}
        </p>
        <ul className="mt-4 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-2 text-nowrap text-sm font-semibold text-ink/50 sm:justify-between sm:gap-5 sm:overflow-visible sm:text-base">
          {site.brands.names.map((name) => (
            <li key={name} className="snap-start">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
