"use client";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowUp, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/content/site";
import { contactLinks } from "@/lib/site";
import { Clock } from "./clock";
import { Reveal, SectionLabel } from "./reveal";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "ok" | "error"; text: string };
type Values = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  website: string;
  storeUrl: string;
  goal: string;
};

export type ContactFormCopy = {
  labels: { name: string; email: string; projectType: string; budget: string; message: string; website: string };
  placeholders: { name: string; email: string; projectType: string; message: string };
  projectTypes: { value: string; label: string }[];
  budgets: { value: string; label: string }[];
  send: string;
  sending: string;
  sent: string;
  sendError: string;
  connectionError: string;
  validation: { name: string; email: string; projectType: string; message: string; summary: string };
};

const field = "mt-2 w-full rounded-xl border border-ink bg-paper px-4 py-3 text-base outline-none transition-shadow placeholder:opacity-50 focus:shadow-[4px_4px_0_rgb(var(--accent))]";
const label = "block font-mono text-xs uppercase tracking-widest";
const englishCopy: ContactFormCopy = {
  labels: site.contact.labels,
  placeholders: {
    name: site.contact.placeholders.name,
    email: site.contact.placeholders.email,
    projectType: site.contact.placeholders.projectType,
    message: site.contact.placeholders.message,
  },
  projectTypes: site.contact.projectTypes.map((value) => ({ value, label: value })),
  budgets: site.contact.budgets.map((value) => ({ value, label: value })),
  send: site.contact.send,
  sending: site.contact.sending,
  sent: site.contact.sent,
  sendError: site.contact.sendError,
  connectionError: site.contact.connectionError,
  validation: site.contact.validation,
};

function problems(v: Values, copy: ContactFormCopy) {
  const next: Partial<Record<keyof Values, string>> = {};
  const name = v.name.trim();
  const email = v.email.trim();
  const message = v.message.trim();
  if (name.length < 2 || name.length > 100) next.name = copy.validation.name;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) next.email = copy.validation.email;
  if (!copy.projectTypes.some((item) => item.value === v.projectType)) next.projectType = copy.validation.projectType;
  if (message.length < 10 || message.length > 5000) next.message = copy.validation.message;
  return next;
}

function reviewProblems(v: Values) {
  const next: Partial<Record<keyof Values, string>> = {};
  const storeUrl = v.storeUrl.trim();
  const email = v.email.trim();
  let validUrl = false;
  try {
    const url = new URL(storeUrl);
    validUrl = (url.protocol === "https:" || url.protocol === "http:") && !url.username && !url.password;
  } catch {
    validUrl = false;
  }
  if (!validUrl || storeUrl.length > 2048) next.storeUrl = site.review.validation.storeUrl;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) next.email = site.review.validation.email;
  if (!site.review.goals.includes(v.goal)) next.goal = site.review.validation.goal;
  return next;
}

export function ContactForm({
  copy = englishCopy,
  defaultProjectType = "",
  id = "contact-form",
  variant = "contact",
}: {
  copy?: ContactFormCopy;
  defaultProjectType?: string;
  id?: string;
  variant?: "contact" | "review";
}) {
  const [v, setV] = useState<Values>({
    name: "",
    email: "",
    projectType: variant === "review" ? site.review.projectType : defaultProjectType,
    budget: variant === "review" ? "" : "Not sure yet",
    message: "",
    website: "",
    storeUrl: "",
    goal: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    setV((p) => ({ ...p, [k]: e.target.value }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  useEffect(() => {
    if (variant === "review") return;
    const project = new URLSearchParams(window.location.search).get("project");
    if (project && copy.projectTypes.some((item) => item.value === project)) {
      setV((p) => ({ ...p, projectType: project }));
    }
  }, [copy.projectTypes, variant]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (status.kind === "sending") return;
    const next = variant === "review" ? reviewProblems(v) : problems(v, copy);
    if (Object.keys(next).length) {
      setErrors(next);
      setStatus({ kind: "error", text: variant === "review" ? site.review.validation.summary : copy.validation.summary });
      return;
    }
    setErrors({});
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(variant === "review" ? {
          email: v.email,
          projectType: site.review.projectType,
          storeUrl: v.storeUrl,
          goal: v.goal,
          website: v.website,
        } : v),
      });
      let data: { success?: boolean; message?: string; error?: string } | null = null;
      try { data = await res.json(); } catch { /* keep the fallback message */ }
      if (res.ok && data?.success) {
        setStatus({ kind: "ok", text: data.message || (variant === "review" ? site.review.sent : copy.sent) });
        setV({
          name: "",
          email: "",
          projectType: variant === "review" ? site.review.projectType : defaultProjectType,
          budget: variant === "review" ? "" : "Not sure yet",
          message: "",
          website: "",
          storeUrl: "",
          goal: "",
        });
      } else {
        setStatus({ kind: "error", text: data?.error || copy.sendError });
      }
    } catch {
      setStatus({ kind: "error", text: copy.connectionError });
    }
  }

  const sending = status.kind === "sending";
  return (
    <form id={id} onSubmit={submit} noValidate aria-busy={sending} className="relative rounded-2xl border border-paper/60 bg-paper p-5 text-ink md:p-8">
      {variant === "review" ? (
        <div className="grid gap-5">
          <div>
            <label htmlFor={`${id}-store-url`} className={label}>{site.review.labels.storeUrl}</label>
            <input id={`${id}-store-url`} name="storeUrl" type="url" required autoComplete="url" value={v.storeUrl} onChange={set("storeUrl")} aria-invalid={!!errors.storeUrl} aria-describedby={errors.storeUrl ? `${id}-store-url-error` : undefined} className={field} placeholder={site.review.placeholders.storeUrl} />
            {errors.storeUrl && <p id={`${id}-store-url-error`} className="mt-2 text-sm text-[#a8321a]">{errors.storeUrl}</p>}
          </div>
          <div>
            <label htmlFor={`${id}-email`} className={label}>{site.review.labels.email}</label>
            <input id={`${id}-email`} name="email" type="email" required autoComplete="email" value={v.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? `${id}-email-error` : undefined} className={field} placeholder={site.review.placeholders.email} />
            {errors.email && <p id={`${id}-email-error`} className="mt-2 text-sm text-[#a8321a]">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor={`${id}-goal`} className={label}>{site.review.labels.goal}</label>
            <select id={`${id}-goal`} name="goal" required value={v.goal} onChange={set("goal")} aria-invalid={!!errors.goal} aria-describedby={errors.goal ? `${id}-goal-error` : undefined} className={field}>
              <option value="">{site.review.placeholders.goal}</option>
              {site.review.goals.map((goal) => <option key={goal} value={goal}>{goal}</option>)}
            </select>
            {errors.goal && <p id={`${id}-goal-error`} className="mt-2 text-sm text-[#a8321a]">{errors.goal}</p>}
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor={`${id}-name`} className={label}>{copy.labels.name}</label>
              <input id={`${id}-name`} name="name" required autoComplete="name" value={v.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id}-name-error` : undefined} className={field} placeholder={copy.placeholders.name} />
              {errors.name && <p id={`${id}-name-error`} className="mt-2 text-sm text-[#a8321a]">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor={`${id}-email`} className={label}>{copy.labels.email}</label>
              <input id={`${id}-email`} name="email" type="email" required autoComplete="email" value={v.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? `${id}-email-error` : undefined} className={field} placeholder={copy.placeholders.email} />
              {errors.email && <p id={`${id}-email-error`} className="mt-2 text-sm text-[#a8321a]">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor={`${id}-project`} className={label}>{copy.labels.projectType}</label>
              <select id={`${id}-project`} name="projectType" required value={v.projectType} onChange={set("projectType")} aria-invalid={!!errors.projectType} aria-describedby={errors.projectType ? `${id}-project-error` : undefined} className={field}>
                <option value="">{copy.placeholders.projectType}</option>
                {copy.projectTypes.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              {errors.projectType && <p id={`${id}-project-error`} className="mt-2 text-sm text-[#a8321a]">{errors.projectType}</p>}
            </div>
            <div>
              <label htmlFor={`${id}-range`} className={label}>{copy.labels.budget}</label>
              <select id={`${id}-range`} name="budget" value={v.budget} onChange={set("budget")} className={field}>
                {copy.budgets.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-5">
            <label htmlFor={`${id}-message`} className={label}>{copy.labels.message}</label>
            <textarea id={`${id}-message`} name="message" required rows={6} value={v.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? `${id}-message-error` : undefined} className={`${field} resize-y`} placeholder={copy.placeholders.message} />
            {errors.message && <p id={`${id}-message-error`} className="mt-2 text-sm text-[#a8321a]">{errors.message}</p>}
          </div>
        </>
      )}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor={`${id}-website`}>{copy.labels.website}</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} />
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={sending} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-7 py-4 font-semibold text-onaccent transition-transform hover:-translate-y-1 disabled:translate-y-0 disabled:opacity-60">
          {sending ? (variant === "review" ? site.review.sending : copy.sending) : (variant === "review" ? site.review.send : copy.send)} {!sending && <ArrowUpRight size={18} aria-hidden />}
        </button>
        <p role="status" aria-live="polite" className={`text-sm font-medium ${status.kind === "error" ? "text-[#a8321a]" : ""} ${status.kind === "ok" ? "rounded-xl border border-ink px-4 py-3" : ""}`}>
          {(status.kind === "ok" || status.kind === "error") && status.text}
        </p>
      </div>
    </form>
  );
}

export function Contact() {
  const c = site.contact;
  const rows = [
    contactLinks.EMAIL ? { l: c.labels.email, h: `mailto:${contactLinks.EMAIL}`, t: contactLinks.EMAIL, I: Mail } : null,
    contactLinks.LINKEDIN_URL ? { l: c.labels.linkedin, h: contactLinks.LINKEDIN_URL, t: c.labels.linkedin, I: Linkedin } : null,
    contactLinks.GITHUB_URL ? { l: c.labels.github, h: contactLinks.GITHUB_URL, t: c.labels.github, I: Github } : null,
  ].filter((row) => row !== null);
  return (
    <section id="contact" className="bg-ink px-4 py-16 text-paper md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionLabel n="06">{c.title}</SectionLabel></Reveal>
        <Reveal>
          <h2 className="mt-8 max-w-4xl font-display text-5xl uppercase leading-[.9] sm:text-6xl md:text-7xl">
            {c.headline[0]}<br /><span className="text-accent">{c.headline[1]}</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
          <Reveal>
            <p className="max-w-md text-lg leading-relaxed">{c.text}</p>
            <div className="mt-7 rounded-2xl border border-paper/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest opacity-65">A simple first step</p>
              <ol className="mt-4 space-y-3 text-sm">
                <li className="flex gap-3"><span className="font-mono text-accent">01</span>Tell me what you need and what you want to improve.</li>
                <li className="flex gap-3"><span className="font-mono text-accent">02</span>I’ll reply with questions and a clear next step.</li>
              </ol>
            </div>
            {contactLinks.CALENDAR_URL && (
              <a href={contactLinks.CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="group mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-7 py-4 font-semibold text-onaccent transition-transform hover:-translate-y-1">
                {c.call} <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" aria-hidden />
              </a>
            )}
            {rows.length > 0 && (
              <ul className="mt-6 grid max-w-md gap-0 border-t border-paper/40">
                {rows.map(({ l, h, t, I }) => (
                  <li key={l}>
                    <a href={h} {...(h.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex min-h-11 items-center justify-between gap-3 border-b border-paper/40 py-4 transition-colors hover:text-accent">
                      <span className="flex items-center gap-3"><I size={18} aria-hidden /> <span className="font-mono text-xs uppercase tracking-widest">{l}</span></span>
                      <span className="flex min-w-0 items-center gap-2 text-right text-sm"><span className="break-all">{t}</span><ArrowUpRight size={16} className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden /></span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
          </div>
          <div className="lg:col-span-7">
            <p className="mb-3 text-sm text-paper/75">A few sentences are enough to get started. If you’re still figuring things out, choose “Not sure yet.”</p>
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </div>

        <footer className="mt-16 flex flex-col gap-6 border-t border-paper/40 pt-6 font-mono text-xs uppercase tracking-widest md:flex-row md:items-center md:justify-between">
          <p>{site.footer.copy}</p>
          <p>{site.clockLabel}: <Clock className="tabular-nums" /></p>
          <div className="flex flex-wrap items-center gap-4">
            {contactLinks.UPWORK_URL && (
              <a href={contactLinks.UPWORK_URL} target="_blank" rel="noopener noreferrer" className="normal-case tracking-normal underline underline-offset-4">{c.upwork}</a>
            )}
            <a href="#home" className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-paper px-5 py-3 transition-colors hover:bg-paper hover:text-ink">
              {site.footer.top} <ArrowUp size={14} aria-hidden />
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
