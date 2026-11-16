/**
 * Site-wide settings. Anything that appears in more than one place
 * (or that you will want to change without touching components) lives here.
 */
export const site = {
  name: "Element Vertex",
  tagline: "Built on Fundamentals. Designed for the Next Level.",
  description:
    "Element Vertex is one team for the marketing, accounting, CRM, software and virtual assistance a business needs. One partner, one standard, one point of contact.",
  url: "https://elementvertex.com",
  email: "hello@elementvertex.com",
  /** Shown on the contact form. Only promise what you can keep. */
  replyTime: "one working day",

  /**
   * Paste your Calendly / Cal.com link here once the account exists.
   * While this is empty, every "Book a free call" button scrolls to the
   * contact form instead, so nothing on the page is a dead end.
   */
  bookingUrl: "",
};

/**
 * Every page and in-page link on the site, in one place. To add a page:
 *   1. add it here, 2. create src/app/<route>/page.jsx, 3. add it to `sitePages` below
 *      if it should be in the sitemap, and to `navLinks` if it belongs in the menu.
 */
export const routes = {
  home: "/",
  services: "/services",
  howWeWork: "/how-we-work",
  about: "/about",
  contact: "/contact",
  faq: "/contact#faq",
};

/** Real pages (no #anchors). Drives the sitemap. */
export const sitePages = [
  { path: routes.home, priority: 1 },
  { path: routes.services, priority: 0.9 },
  { path: routes.contact, priority: 0.9 },
  { path: routes.howWeWork, priority: 0.8 },
  { path: routes.about, priority: 0.7 },
];

/**
 * Pages whose first section is light. The header is transparent over dark
 * openings, so on these pages it starts out solid to keep its white text readable.
 */
export const lightTopPages = [routes.services];

/** Where every "Book a free call" button points. */
export function getBookingHref() {
  return site.bookingUrl || routes.contact;
}

export const hasExternalBooking = Boolean(site.bookingUrl);

/** Main menu. Contact is the "Book a free call" button, so it is not listed here. */
export const navLinks = [
  { label: "Services", href: routes.services },
  { label: "How we work", href: routes.howWeWork },
  { label: "About", href: routes.about },
];
