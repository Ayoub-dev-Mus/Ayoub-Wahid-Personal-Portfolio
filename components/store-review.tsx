import { site } from "@/content/site";
import { ContactForm } from "./contact";
import { Reveal, SectionLabel } from "./reveal";

export function StoreReview() {
  return (
    <section id="review" className="bg-sand px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <div>
          <Reveal>
            <SectionLabel n="">{site.review.title}</SectionLabel>
          </Reveal>
          <Reveal>
            <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-80">
              {site.review.text}
            </p>
          </Reveal>
        </div>
        <Reveal>
          <ContactForm variant="review" id="store-review-form" />
        </Reveal>
      </div>
    </section>
  );
}
