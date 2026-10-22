import { site } from "@/content/site";
import { Reveal, SectionLabel } from "./reveal";

export function TechStack() {
  return (
    <section id="stack" className="px-4 pb-24 md:px-8 md:pb-32">
      <Reveal><SectionLabel n="05">{site.stack.title}</SectionLabel></Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-6">
        {site.stack.groups.map((g, i) => (
          <Reveal key={g.name} delay={(i % 3) * 0.07} className={i === 0 ? "md:col-span-3" : i < 3 ? "md:col-span-3" : "md:col-span-2"}>
            <div className="h-full rounded-2xl border border-ink p-6 transition-colors hover:bg-sand">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em]">{g.name}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((t) => (
                  <li key={t} className="cursor-default rounded-full border border-ink px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 hover:-rotate-2 hover:bg-accent hover:text-onaccent">{t}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
