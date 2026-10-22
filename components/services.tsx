import { site } from "@/content/site";
import { Reveal, SectionLabel } from "./reveal";

const skins = [
  "bg-sand text-ink",
  "bg-ink text-paper",
  "bg-accent text-onaccent border-onaccent",
];

export function Services() {
  const s = site.services;
  return (
    <section id="services" className="px-4 py-24 md:px-8 md:py-32">
      <Reveal><SectionLabel n="02">{s.title}</SectionLabel></Reveal>
      <div className="mt-12 space-y-6">
        {s.items.map((it, i) => (
          <Reveal key={it.n}>
            <article className={`group grid gap-8 rounded-2xl border border-ink p-6 transition-transform duration-500 hover:scale-[1.012] md:grid-cols-12 md:p-12 ${skins[i]} ${i === 1 ? "md:ml-12" : i === 2 ? "md:mr-12" : ""}`}>
              <div className="md:col-span-5">
                <div className="font-display text-[7rem] leading-[0.8] opacity-90 transition-transform duration-500 group-hover:-translate-y-1 md:text-[10rem]">{it.n}</div>
                <h3 className="mt-6 font-display text-5xl uppercase leading-none md:text-6xl">{it.title}</h3>
                <p className="mt-4 max-w-sm text-lg font-medium">{it.pitch}</p>
              </div>
              <ul className="grid content-start gap-x-8 md:col-span-7 md:grid-cols-2">
                {it.bullets.map((b) => (
                  <li key={b} className="flex gap-3 border-t border-current/40 py-3 text-[15px] leading-snug">
                    <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-current" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
