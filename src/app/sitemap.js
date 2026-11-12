import { site } from "@/content/site";

/** Add each new page here as it is built. */
export default function sitemap() {
  return [
    {
      url: site.url,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
