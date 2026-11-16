import { Bricolage_Grotesque, Manrope } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { InterestProvider } from "@/components/providers/InterestProvider";
import { site } from "@/content/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const title = `${site.name} | One team for every business function`;

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  // Canonical URL and openGraph.url are set per page (see lib/metadata.js), not here,
  // otherwise every route would claim to be the homepage.
  openGraph: {
    type: "website",
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#01010d",
  colorScheme: "dark light",
};

export default function RootLayout({ children }) {
  return (
    // data-scroll-behavior="smooth": globals.css enables smooth scrolling for in-page
    // jumps. This tells Next.js 16 to switch it off during page changes, so a new page
    // opens instantly at the top instead of animating there from the old scroll position.
    <html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <InterestProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </InterestProvider>
      </body>
    </html>
  );
}
