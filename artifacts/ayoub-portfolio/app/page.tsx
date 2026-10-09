import { site } from "@/content/site";
import { TopBar } from "@/components/top-bar";
import { BottomNav } from "@/components/bottom-nav";
import { Cursor } from "@/components/cursor";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Work } from "@/components/work";
import { Results } from "@/components/results";
import { Process } from "@/components/process";
import { TechStack } from "@/components/tech-stack";
import { Contact } from "@/components/contact";

export default function Page() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    address: { "@type": "PostalAddress", addressLocality: "Casablanca", addressCountry: "MA" },
    sameAs: [site.links.upwork],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Cursor />
      <TopBar />
      <main>
        <Hero />
        <About />
        <Services />
        <Work />
        <Results />
        <Process />
        <TechStack />
        <Contact />
      </main>
      <BottomNav />
    </>
  );
}
