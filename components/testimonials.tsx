import { site } from "@/content/site";
import { Reveal, SectionLabel } from "./reveal";

export function Testimonials() {
  const testimonials = site.testimonials.items.filter(
    (item) =>
      item.quote.trim() &&
      item.name.trim() &&
      item.role.trim() &&
      item.company.trim(),
  );
  if (!testimonials.length) return null;

  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel n="">{site.testimonials.title}</SectionLabel>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <Reveal key={`${item.name}-${item.company}`}>
              <figure className="h-full rounded-2xl border border-ink bg-sand p-6">
                <blockquote className="text-lg leading-relaxed">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-ink/20 pt-4">
                  <p className="font-semibold">{item.name}</p>
                  <p className="mt-1 text-sm opacity-75">
                    {item.role}, {item.company}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-widest opacity-60">
                    {site.testimonials.via}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
