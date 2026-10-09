"use client";
import { useEffect, useState } from "react";
import { Briefcase, House, Layers, Mail, User, Workflow } from "lucide-react";
import { site } from "@/content/site";

const icons = { home: House, about: User, services: Layers, work: Briefcase, process: Workflow, contact: Mail };

export function BottomNav() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const els = site.nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Primary" className="fixed inset-x-0 bottom-3 z-50 flex justify-center px-2.5">
      <div className="flex w-full max-w-[44rem] flex-wrap items-center gap-1 rounded-3xl border border-ink bg-paper/90 p-1.5 shadow-[0_10px_30px_-12px_rgba(20,20,20,.45)] backdrop-blur-md sm:w-auto sm:flex-nowrap sm:gap-2 sm:rounded-full sm:pl-2 sm:pr-1.5">
        <a href="#home" aria-label="Ayoub Wahid, back to top" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink font-display text-lg leading-none tracking-wide text-paper sm:h-10 sm:w-10">
          {site.monogram}
        </a>
        <ul className="order-2 grid basis-full grid-cols-6 gap-0.5 sm:order-none sm:flex sm:basis-auto sm:gap-0.5">
          {site.nav.map((n) => {
            const Icon = icons[n.id as keyof typeof icons];
            const on = active === n.id;
            return (
              <li key={n.id} className="min-w-0">
                <a
                  href={`#${n.id}`}
                  aria-current={on ? "true" : undefined}
                  className={`flex flex-col items-center gap-0.5 rounded-full px-0.5 py-1.5 text-[9.5px] font-medium leading-none tracking-tight transition-colors sm:flex-row sm:gap-0 sm:px-3.5 sm:py-2.5 sm:text-sm ${on ? "bg-sand text-ink" : "hover:bg-sand/70"}`}
                >
                  <Icon size={16} aria-hidden className="sm:hidden" />
                  <span className="truncate">{n.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <a href="#contact" className="ml-auto shrink-0 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-onaccent transition-transform hover:scale-105 sm:ml-0 sm:py-2.5 sm:text-sm">
          {site.cta}
        </a>
      </div>
    </nav>
  );
}
