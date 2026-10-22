"use client";
import { useState, type FormEvent } from "react";
import { ArrowUp, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/content/site";
import { Clock } from "./clock";
import { Reveal, SectionLabel } from "./reveal";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "ok" | "error"; text: string };
const empty = { name: "", email: "", projectType: "", budget: "", message: "", website: "" };

const field = "mt-2 w-full rounded-xl border border-ink bg-paper px-4 py-3 text-base outline-none transition-shadow placeholder:opacity-50 focus:shadow-[4px_4px_0_rgb(var(--accent))]";
const label = "block font-mono text-xs uppercase tracking-widest";

export function Contact() {
  const c = site.contact;
  const [v, setV] = useState(empty);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const set = (k: keyof typeof empty) => (e: { target: { value: string } }) => setV((p) => ({ ...p, [k]: e.target.value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (status.kind === "sending") return;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      });
      let data: { success?: boolean; message?: string; error?: string } | null = null;
      try { data = await res.json(); } catch {}
      if (res.ok && data?.success) {
        setStatus({ kind: "ok", text: data.message || c.sent });
        setV(empty);
      } else {
        setStatus({ kind: "error", text: data?.error || c.sendError });
      }
    } catch {
      setStatus({ kind: "error", text: c.connectionError });
    }
  }

  const sending = status.kind === "sending";
  return (
    <section id="contact" className="rounded-t-[2.5rem] bg-ink px-4 pb-32 pt-20 text-paper md:px-8 md:pt-28">
      <Reveal><SectionLabel n="06">{c.title}</SectionLabel></Reveal>
      <Reveal>
        <h2 className="mt-10 font-display text-[19vw] uppercase leading-[0.84] md:text-[12.5vw]">
          {c.headline[0]}<br /><span className="text-accent">{c.headline[1]}</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="max-w-md text-lg leading-relaxed">{c.text}</p>
            <a href={site.links.upwork} target="_blank" rel="noopener noreferrer" className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-semibold text-onaccent transition-transform hover:-translate-y-1 hover:rotate-[-1.5deg]">
              {c.upwork} <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" aria-hidden />
            </a>
            <ul className="mt-8 grid max-w-md gap-0 border-t border-paper/40">
              {[
                { l: c.labels.email, h: `mailto:${site.links.email}`, t: site.links.email, I: Mail },
                { l: c.labels.linkedin, h: site.links.linkedin, t: c.labels.linkedin, I: Linkedin },
                { l: c.labels.github, h: site.links.github, t: c.labels.github, I: Github },
              ].map(({ l, h, t, I }) => (
                <li key={l}>
                  <a href={h} {...(h.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex items-center justify-between border-b border-paper/40 py-4 transition-colors hover:text-accent">
                    <span className="flex items-center gap-3"><I size={18} aria-hidden /> <span className="font-mono text-xs uppercase tracking-widest">{l}</span></span>
                    <span className="flex items-center gap-2 text-sm">{t}<ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden /></span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7">
          <form onSubmit={submit} className="rounded-2xl border border-paper/60 bg-paper p-5 text-ink md:p-8" aria-describedby="form-status">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="name" className={label}>{c.labels.name}</label>
                <input id="name" name="name" required autoComplete="name" value={v.name} onChange={set("name")} className={field} placeholder={c.placeholders.name} />
              </div>
              <div>
                <label htmlFor="email" className={label}>{c.labels.email}</label>
                <input id="email" name="email" type="email" required autoComplete="email" value={v.email} onChange={set("email")} className={field} placeholder={c.placeholders.email} />
              </div>
              <div>
                <label htmlFor="projectType" className={label}>{c.labels.projectType}</label>
                <select id="projectType" name="projectType" required value={v.projectType} onChange={set("projectType")} className={field}>
                  <option value="" disabled>{c.placeholders.projectType}</option>
                  {c.projectTypes.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="budget" className={label}>{c.labels.budget}</label>
                <select id="budget" name="budget" value={v.budget} onChange={set("budget")} className={field}>
                  <option value="">{c.placeholders.budget}</option>
                  {c.budgets.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="message" className={label}>{c.labels.message}</label>
              <textarea id="message" name="message" required rows={6} value={v.message} onChange={set("message")} className={`${field} resize-y`} placeholder={c.placeholders.message} />
            </div>
            {/* Honeypot: hidden from people and assistive tech */}
            <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
              <label htmlFor="website">{c.labels.website}</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button type="submit" disabled={sending} className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-semibold text-onaccent transition-transform hover:-translate-y-1 disabled:translate-y-0 disabled:opacity-60">
                {sending ? c.sending : c.send} {!sending && <ArrowUpRight size={18} aria-hidden />}
              </button>
              <p id="form-status" role="status" aria-live="polite" className={`text-sm font-medium ${status.kind === "error" ? "text-[#a8321a]" : ""}`}>
                {(status.kind === "ok" || status.kind === "error") && status.text}
              </p>
            </div>
          </form>
        </Reveal>
      </div>

      <footer className="mt-24 flex flex-col gap-6 border-t border-paper/40 pt-6 font-mono text-xs uppercase tracking-widest md:flex-row md:items-center md:justify-between">
        <p>{site.footer.copy}</p>
        <p>{site.clockLabel}: <Clock className="tabular-nums" /></p>
        <a href="#home" className="inline-flex w-fit items-center gap-2 rounded-full border border-paper px-5 py-3 transition-colors hover:bg-paper hover:text-ink">
          {site.footer.top} <ArrowUp size={14} aria-hidden />
        </a>
      </footer>
    </section>
  );
}
