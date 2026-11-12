/**
 * The services we offer. Used by the services explorer, the "find your fit"
 * quiz, the contact form's select, the footer and the marquee.
 *
 * `need` is the short phrase the quiz shows for this service.
 */
export const services = [
  {
    id: "marketing",
    number: "01",
    title: "Marketing & Branding",
    short: "Marketing",
    tagline: "We help businesses be seen, remembered and chosen.",
    items: [
      "Brand identity and packaging design",
      "Social media management and content",
      "Paid media, SEO and email marketing",
      "Campaign planning and reporting",
    ],
    need: "More customers finding and remembering us",
  },
  {
    id: "crm",
    number: "02",
    title: "CRM & Automation",
    short: "CRM",
    tagline: "Customer data and follow-up that run in the background.",
    items: [
      "CRM setup, cleanup and daily management",
      "Lead follow-up and nurture sequences",
      "Workflow automation across your tools",
      "Reporting that shows what works",
    ],
    need: "Better follow-up with leads and customers",
  },
  {
    id: "accounting",
    number: "03",
    title: "Accounting & Tax",
    short: "Accounting",
    tagline: "Finances that stay accurate, organized and compliant.",
    items: [
      "Bookkeeping and accounting support",
      "Tax preparation and compliance",
      "Financial reporting for decision makers",
    ],
    need: "Clean books and stress-free taxes",
  },
  {
    id: "software",
    number: "04",
    title: "Software & Web",
    short: "Software",
    tagline: "The digital tools a business runs on.",
    items: [
      "Custom software development",
      "Websites and landing pages",
      "Integrations and APIs",
      "Ongoing maintenance and support",
    ],
    need: "A website or a tool built for how we work",
  },
  {
    id: "operations",
    number: "05",
    title: "Virtual Assistance & Ops",
    short: "Virtual assistance",
    tagline: "The day-to-day work that keeps a business moving.",
    items: [
      "Administrative and back-office support",
      "Transaction and project coordination",
      "Lead generation and scheduling",
      "Process documentation and workflow support",
    ],
    need: "Hours back from admin and busywork",
  },
  {
    id: "ecommerce",
    number: "06",
    title: "E-commerce & Growth",
    short: "E-commerce",
    tagline: "Help for online businesses to list, sell and scale.",
    items: [
      "Online marketplace and store management",
      "Listings, advertising and performance",
      "Search visibility and local presence",
    ],
    need: "Selling more online",
  },
];

export const getService = (id) => services.find((s) => s.id === id);
