import { site } from "@/content/site";
import { visibleProjects } from "@/lib/projects";
import { TopBar } from "@/components/top-bar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Work } from "@/components/work";
import { Results } from "@/components/results";
import { Process } from "@/components/process";
import { BrandRow } from "@/components/brand-row";
import { Testimonials } from "@/components/testimonials";
import { StoreReview } from "@/components/store-review";
import { FAQ } from "@/components/faq";
import { Booking } from "@/components/booking";
import { Contact } from "@/components/contact";
import { BottomNav } from "@/components/bottom-nav";

export default function Page() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    address: { "@type": "PostalAddress", addressLocality: "Casablanca", addressCountry: "MA" },
    sameAs: [site.links.upwork, site.links.linkedin, site.links.github].filter(Boolean),
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: site.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <TopBar />
      <main>
        <Hero />
        <BrandRow />
        <About />
        <Services />
        <Work projects={visibleProjects()} />
        <Testimonials />
        <Results />
        <Process />
        <StoreReview />
        <FAQ />
        <Booking />
        <Contact />
      </main>
      <BottomNav />
    </>
  );
}
