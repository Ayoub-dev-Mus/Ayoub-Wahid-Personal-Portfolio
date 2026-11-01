import { Check } from "lucide-react";
import { site } from "@/content/site";
import { Reveal, SectionLabel } from "./reveal";

const strengths = [
  {
    title: "Clear project leadership",
    text: "Scope, milestones, and estimates are agreed before development starts.",
  },
  {
    title: "Hands-on engineering",
    text: "Work directly with the developer building your store or product.",
  },
  {
    title: "Built for handoff",
    text: "Get documented, maintainable work your team can own after launch.",
  },
];

export function About() {
  const about = site.about;
  return (
    <section id="about" className="bg-sand px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionLabel n="04">{about.title}</SectionLabel></Reveal>
        <div className="mt-8 grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="font-display text-4xl uppercase leading-[.95] sm:text-5xl md:text-6xl">Experienced delivery. Direct communication.</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed opacity-80">{about.text}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {about.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-ink/40 px-3 py-1.5 text-xs font-medium">{tag}</li>
              ))}
            </ul>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-3">
            {strengths.map((strength, index) => (
              <Reveal key={strength.title} delay={index * 0.06}>
                <article className="h-full rounded-2xl border border-ink bg-paper p-5">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-onaccent"><Check size={17} aria-hidden /></span>
                  <h3 className="mt-5 font-display text-2xl uppercase leading-[.95]">{strength.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed opacity-75">{strength.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <dl className="mt-8 grid gap-4 border-t border-ink/25 pt-5 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-widest opacity-60">{about.languagesLabel}</dt>
              <dd className="mt-2 text-sm font-medium">{about.languages.join(" · ")}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-widest opacity-60">{about.educationLabel}</dt>
              <dd className="mt-2 text-sm font-medium">{about.education[0]}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
