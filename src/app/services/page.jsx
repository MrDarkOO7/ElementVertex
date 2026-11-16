import CtaBand from "@/components/sections/CtaBand";
import Quiz from "@/components/sections/Quiz";
import Services from "@/components/sections/Services";
import { routes } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Marketing and branding, CRM and automation, accounting and tax, software and web, virtual assistance and e-commerce, from one team with one point of contact.",
  path: routes.services,
});

export default function ServicesPage() {
  return (
    <>
      <Services />
      <Quiz />
      <CtaBand />
    </>
  );
}
