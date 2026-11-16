import { site } from "@/content/site";

/**
 * Per-page metadata. Next.js merges `metadata` objects shallowly, so a page that
 * sets `openGraph` replaces the layout's one; this helper keeps them consistent.
 * The title is combined with the layout's "%s | Element Vertex" template.
 */
export function pageMetadata({ title, description, path }) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
    },
  };
}
