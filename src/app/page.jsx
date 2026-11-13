import About from "@/components/sections/About";
import Comparison from "@/components/sections/Comparison";
import Contact from "@/components/sections/Contact";
import Faq from "@/components/sections/Faq";
import Hero from "@/components/sections/Hero";
import OneTeam from "@/components/sections/OneTeam";
import Problem from "@/components/sections/Problem";
import Process from "@/components/sections/Process";
import Quiz from "@/components/sections/Quiz";
import Services from "@/components/sections/Services";
import Ticker from "@/components/sections/Ticker";
import { services } from "@/content/services";
import { faqs } from "@/content/copy";
import { site } from "@/content/site";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    email: site.email,
    description: site.description,
    slogan: site.tagline,
    knowsAbout: services.map((s) => s.title),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // "<" is escaped so the JSON can never close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Ticker />
      <Problem />
      <OneTeam />
      <Services />
      <Quiz />
      <Process />
      <Comparison />
      <About />
      <Faq />
      <Contact />
    </>
  );
}
