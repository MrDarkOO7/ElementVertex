import Contact from "@/components/sections/Contact";
import Faq from "@/components/sections/Faq";
import JsonLd from "@/components/JsonLd";
import { faqs } from "@/content/copy";
import { routes } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell us what your business needs. Book a free intro call or send a message and get a clear written quote.",
  path: routes.contact,
});

const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={faqData} />
      <Contact />
      <Faq />
    </>
  );
}
