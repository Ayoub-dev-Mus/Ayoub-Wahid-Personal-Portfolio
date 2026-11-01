import { site } from "@/content/site";
import { ContactForm } from "./contact";
import { Reveal, SectionLabel } from "./reveal";

export function Booking() {
  const booking = site.booking;

  return (
    <section id="book" className="px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        {booking.spotsLeft > 0 && (
          <p className="mb-4 font-mono text-xs uppercase tracking-widest opacity-70">
            {booking.spotsLeft} spots open for {booking.month}
          </p>
        )}
        <Reveal>
          <SectionLabel n="">{booking.title}</SectionLabel>
        </Reveal>
        <div className="mt-8 grid gap-6 lg:grid-cols-[.7fr_1.3fr] lg:gap-12">
          <p className="max-w-md leading-relaxed opacity-75">
            {booking.formText}
          </p>
          <ContactForm id="booking-contact-form" />
        </div>
      </div>
    </section>
  );
}
