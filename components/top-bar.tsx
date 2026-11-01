"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { site } from "@/content/site";

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("aw-theme", next ? "dark" : "light"); } catch {}
  };
  return (
    <button
      onClick={toggle}
      aria-label={dark ? site.ui.lightMode : site.ui.darkMode}
      aria-pressed={dark}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink bg-paper transition-transform hover:rotate-12 hover:bg-sand"
    >
      {dark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
    </button>
  );
}

export function TopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-ink/10 bg-paper/90 px-4 backdrop-blur-md md:px-8">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3">
        <a href="#home" className="shrink-0 font-display text-lg uppercase tracking-wide sm:text-xl">{site.name}</a>
        <nav aria-label="Main" className="hidden items-center gap-1 font-medium md:flex">
          {site.nav.filter((item) => ["services", "work", "process", "about"].includes(item.id)).map((item) => (
            <a key={item.id} href={`#${item.id}`} className="inline-flex min-h-11 items-center rounded-full px-3 text-sm transition-colors hover:bg-sand">{item.label}</a>
          ))}
          <a href="/shop" className="inline-flex min-h-11 items-center rounded-full px-3 text-sm transition-colors hover:bg-sand">Templates</a>
        </nav>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a href="/shop" className="inline-flex min-h-11 items-center rounded-full px-2 text-xs font-medium transition-colors hover:bg-sand sm:hidden">Templates</a>
          <a href="#book" className="inline-flex min-h-11 items-center rounded-full bg-accent px-3 text-[11px] font-semibold text-onaccent transition-transform hover:-translate-y-0.5 sm:px-5 sm:text-sm">{site.cta}</a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
