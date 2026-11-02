// Single source for business details used across the site.
// Anything marked TODO needs Barnabas's confirmation before launch.

export const site = {
  name: "GadgetGeeks",
  legalName: "GadgetGeeks Technologies",
  rcNumber: "BN 9889039",
  oneLiner:
    "We help you choose the right technology and keep it working for as long as you own it.",
  email: "gadgetgeeks.technologies@gmail.com",
  // WhatsApp number in international format, digits only
  whatsapp: "2348051015605",
  location: "Gidan Kwano, Minna, Niger State",
};

export function bookingHref(message = "Hi GadgetGeeks, I'd like to book a service.") {
  if (site.whatsapp) {
    return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
  }
  return `mailto:${site.email}?subject=${encodeURIComponent("Service request")}&body=${encodeURIComponent(message)}`;
}

export type Tier = {
  name: string;
  price: number;
  includes: string;
};

export type Service = {
  slug: string;
  name: string;
  summary: string;
  includes: string[];
  // TODO: fixed prices (Decision #026). null shows "Ask for price".
  priceFrom: number | null;
  tiers?: Tier[];
};

// Starting prices from the 90-day validation plan; adjust once real jobs show what people pay.
export const buyingHelpTiers: Tier[] = [
  { name: "Basic", price: 10000, includes: "Shortlist and inspection before you pay" },
  { name: "Standard", price: 15000, includes: "Basic, plus full setup of Windows, drivers and your software" },
  { name: "Complete", price: 20000, includes: "Standard, plus your files moved across and 30 days of WhatsApp support" },
];

export const services: Service[] = [
  {
    slug: "buying-help",
    name: "Laptop buying help",
    summary:
      "Tell us your budget and your course. We find the right laptop, check it before you pay, and set it up.",
    includes: [
      "Two or three options actually for sale in Minna or Abuja",
      "Battery, drive, screen and ports checked before you pay",
      "Setup with licensed software",
    ],
    priceFrom: buyingHelpTiers[0].price,
    tiers: buyingHelpTiers,
  },
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
    summary: "The tools your course or job needs, installed and working. Licensed copies only.",
    includes: [
      "Microsoft Office",
      "Engineering software using your own or a free student licence",
      "Drivers and utilities",
    ],
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
];

export function formatNaira(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}
