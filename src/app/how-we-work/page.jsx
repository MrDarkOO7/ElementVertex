import Comparison from "@/components/sections/Comparison";
import CtaBand from "@/components/sections/CtaBand";
import Process from "@/components/sections/Process";
import { routes } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "How we work",
  description:
    "Understand the objective, build what is needed, keep it running. How Element Vertex works with you, from the first conversation to ongoing support.",
  path: routes.howWeWork,
});

export default function HowWeWorkPage() {
  return (
    <>
      <Process />
      <Comparison />
      <CtaBand />
    </>
  );
}
