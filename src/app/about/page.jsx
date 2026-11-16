import About from "@/components/sections/About";
import CtaBand from "@/components/sections/CtaBand";
import { routes } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Built on fundamentals, designed for the next level. Meet the co-founders behind Element Vertex and the values we work by.",
  path: routes.about,
});

export default function AboutPage() {
  return (
    <>
      <About />
      <CtaBand />
    </>
  );
}
