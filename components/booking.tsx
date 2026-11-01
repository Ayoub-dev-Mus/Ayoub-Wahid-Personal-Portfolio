import { CAL_LINK, site } from "@/content/site";
import { Reveal, SectionLabel } from "./reveal";

export function Booking() {
  const booking = site.booking;
  if (!CAL_LINK.trim()) return null;
  const embedUrl = `https://cal.com/${CAL_LINK.trim()}?embed=true`;

  return (
    <section id="book" className="px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        {booking.spotsLeft > 0 && (
          <p className="mb-4 font-mono text-xs uppercase tracking-widest opacity-70">
            {booking.spotsLeft} spots open for {booking.month}
          </p>
        )}
        <Reveal>
          <SectionLabel n="05">{booking.title}</SectionLabel>
        </Reveal>
        <div className="mt-8 overflow-hidden rounded-2xl border border-ink bg-paper">
          <iframe
            src={embedUrl}
            title={booking.title}
            className="h-[680px] w-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
