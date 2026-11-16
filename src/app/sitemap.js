import { sitePages, site } from "@/content/site";

/** Pages are listed in content/site.js, so this file never needs editing. */
export default function sitemap() {
  return sitePages.map(({ path, priority }) => ({
    url: path === "/" ? site.url : `${site.url}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
