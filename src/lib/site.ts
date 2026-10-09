// Single source for business details used across the site.
// Anything marked TODO needs Barnabas's confirmation before launch.

export const site = {
  name: "GadgetGeeks",
  legalName: "GadgetGeeks Technologies",
  rcNumber: "BN 9889039",
  oneLiner:
    "We help you choose the right technology and keep it working for as long as you own it.",
  email: "gadgetgeeks.technologies@gmail.com",
  whatsapp: "2348051015605",
  location: "Gidan Kwano, Minna, Niger State",
};

export function bookingHref(message = "Hi GadgetGeeks, I'd like to book a service.") {
  if (site.whatsapp) {
    return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
  }
  return `mailto:${site.email}?subject=${encodeURIComponent("Service request")}&body=${encodeURIComponent(message)}`;
}

export type Service = {
  slug: string;
  name: string;
  summary: string;
  includes: string[];
  // TODO: fixed prices (Decision #026). null shows "Ask for price".
  priceFrom: number | null;
};

export const services: Service[] = [
  {
    slug: "os",
    name: "Operating system install and upgrade",
    summary: "A clean Windows install or upgrade, with drivers and updates done.",
    includes: ["Backup of your files first", "Drivers and updates", "Basic security setup"],
    priceFrom: null,
  },
  {
    slug: "software",
    name: "Software installation",
    summary: "The tools your course or job needs, installed and working.",
    includes: ["Microsoft Office", "Engineering software such as SolidWorks", "Drivers and utilities"],
    priceFrom: null,
  },
  {
    slug: "optimisation",
    name: "Performance optimisation",
    summary: "A slow laptop made usable again without buying a new one.",
    includes: ["Startup and background clean-up", "Storage clean-up", "Before and after boot time"],
    priceFrom: null,
  },
  {
    slug: "upgrades",
    name: "RAM and SSD upgrades",
    summary: "The upgrade that gives the biggest speed gain for the money.",
    includes: ["Compatibility check before buying", "Part sourcing", "Data moved to the new drive"],
    priceFrom: null,
  },
  {
    slug: "setup",
    name: "New device setup",
    summary: "A new laptop or phone set up properly from day one.",
    includes: ["Accounts and backups", "Essential apps", "Bloatware removed"],
    priceFrom: null,
  },
  {
    slug: "advice",
    name: "Buying advice",
    summary: "Tell us your budget and what you need it for. We tell you what to buy and what to avoid.",
    includes: ["Shortlist that fits your budget", "What to check before paying", "Where to buy"],
    priceFrom: null,
  },
];

export function formatNaira(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}
