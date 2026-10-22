import Image from "next/image";
import { site } from "@/content/site";
import { Reveal, SectionLabel } from "./reveal";

export function About() {
  const a = site.about;
  return (
    <section id="about" className="px-4 py-24 md:px-8 md:py-32">
      <Reveal><SectionLabel n="01">{a.title}</SectionLabel></Reveal>
      <div className="mt-12 grid items-start gap-12 md:grid-cols-12 md:gap-16">
        <Reveal className="md:col-span-5">
          <div className="relative mx-auto max-w-sm rotate-[-4deg] transition-transform duration-500 hover:rotate-0 md:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-ink bg-sand">
              <Image src={a.portrait} alt={a.portraitAlt} fill sizes="(min-width:768px) 40vw, 90vw" className="object-cover" />
            </div>
            <span className="absolute -bottom-5 -right-3 rotate-6 rounded-full border border-ink bg-accent px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-onaccent shadow-[4px_4px_0_rgb(var(--ink))] md:-right-6">
              {a.sticker}
            </span>
            <span className="absolute -left-3 top-8 -rotate-12 rounded-full border border-ink bg-sand px-4 py-2 font-display text-xl uppercase">{site.ui.greeting}</span>
          </div>
        </Reveal>
        <div className="md:col-span-7">
          <Reveal>
            <p className="font-display text-3xl uppercase leading-[1.1] sm:text-4xl md:text-[2.6rem]">{a.text}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {a.tags.map((t) => (
                <li key={t} className="rounded-full border border-ink px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-onaccent">{t}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <dl className="mt-10 grid gap-0 border-t border-ink">
              <div className="grid gap-2 border-b border-ink py-5 sm:grid-cols-[9rem_1fr]">
                <dt className="font-mono text-xs uppercase tracking-widest opacity-70">{a.languagesLabel}</dt>
                <dd className="font-medium">{a.languages.join(" · ")}</dd>
              </div>
              <div className="grid gap-2 border-b border-ink py-5 sm:grid-cols-[9rem_1fr]">
                <dt className="font-mono text-xs uppercase tracking-widest opacity-70">{a.educationLabel}</dt>
                <dd className="space-y-2 font-medium">{a.education.map((e) => <p key={e}>{e}</p>)}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
