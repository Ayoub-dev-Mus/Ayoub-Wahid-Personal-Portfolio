"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { site } from "@/content/site";
import { Clock } from "./clock";

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
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink bg-paper transition-transform hover:rotate-12 hover:bg-sand"
    >
      {dark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
    </button>
  );
}

export function TopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-start justify-between gap-3 border-b border-ink/10 bg-paper/75 px-4 py-2.5 backdrop-blur-md md:px-8">
      <div className="font-mono leading-tight">
        <div className="text-[10px] uppercase tracking-widest opacity-70">{site.clockLabel}</div>
        <Clock className="text-sm font-medium tabular-nums" />
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-right font-mono text-[10px] uppercase leading-tight tracking-wider md:text-xs">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inset-0 animate-pulseDot rounded-full bg-emerald-500" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="max-w-[9.5rem] text-left sm:max-w-none">{site.availability}</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
