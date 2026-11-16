import CtaBand from "@/components/sections/CtaBand";
import Hero from "@/components/sections/Hero";
import JsonLd from "@/components/JsonLd";
import OneTeam from "@/components/sections/OneTeam";
import Problem from "@/components/sections/Problem";
import ServicesOverview from "@/components/sections/ServicesOverview";
import Ticker from "@/components/sections/Ticker";
import { services } from "@/content/services";
import { site } from "@/content/site";

export const metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | One team for every business function`,
    description: site.description,
    url: "/",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  email: site.email,
  description: site.description,
  slogan: site.tagline,
  knowsAbout: services.map((s) => s.title),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <Hero />
      <Ticker />
      <Problem />
      <OneTeam />
      <ServicesOverview />
      <CtaBand />
    </>
  );
}
