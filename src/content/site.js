/**
 * Site-wide settings. Anything that appears in more than one place
 * (or that you will want to change without touching components) lives here.
 */
export const site = {
  name: "Element Vertex",
  tagline: "Built on Fundamentals. Designed for the Next Level.",
  description:
    "Element Vertex is one team for the marketing, accounting, CRM, software and virtual assistance small businesses need. One partner, one standard, one point of contact.",
  url: "https://elementvertex.com",
  email: "hello@elementvertex.com",
  region: "United States",

  /**
   * Paste your Calendly / Cal.com link here once the account exists.
   * While this is empty, every "Book a free call" button scrolls to the
   * contact form instead, so nothing on the page is a dead end.
   */
  bookingUrl: "",
};

/** Where every "Book a free call" button points. */
export function getBookingHref() {
  return site.bookingUrl || "/#contact";
}

export const hasExternalBooking = Boolean(site.bookingUrl);

export const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Approach", href: "/#approach" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
];
