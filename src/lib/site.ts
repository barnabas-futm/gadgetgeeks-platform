// Single source for business details and prices used across the site.
// To change a price, change it in `prices` below. Every page reads from there.

export const site = {
  name: "GadgetGeeks",
  legalName: "GadgetGeeks Technologies",
  rcNumber: "BN 9889039",
  oneLiner: "Windows, software, upgrades and tune-ups for laptops in Gidan Kwano. On campus, we come to your hostel.",
  email: "gadgetgeeks.technologies@gmail.com",
  // WhatsApp number in international format, digits only
  whatsapp: "2348051015605",
  area: "Gidan Kwano · FUTMinna",
  location: "Gidan Kwano, Minna, Niger State",
};

export function bookingHref(message = "Hi GadgetGeeks, I'd like to book a service.") {
  if (site.whatsapp) {
    return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
  }
  return `mailto:${site.email}?subject=${encodeURIComponent("Service request")}&body=${encodeURIComponent(message)}`;
}

// Price sheet for the 8-week test (naira). Parts are charged on top where marked.
export const prices = {
  windowsReinstall: 5000,
  dataRecovery: 7000,
  softwarePerProgram: 2000,
  courseSoftware: 5000,
  fullSetup: 12000,
  premiumSetup: 15000,
  ramUpgrade: 2000,
  ssdCloned: 4000,
  ssdFreshInstall: 7000,
  diagnosis: 1000,
  tuneUp: 3000,
  callout: 2000,
};

export type PriceItem = {
  name: string;
  // null shows "Ask"
  price: number | null;
  plusParts?: boolean;
  note?: string;
};

export type ServiceGroup = {
  slug: string;
  name: string;
  problem: string;
  items: PriceItem[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    slug: "os-software",
    name: "OS and software",
    problem: "Windows crashed, or your course software won't install?",
    items: [
      { name: "Format and reinstall Windows 10/11", price: prices.windowsReinstall, note: "With drivers and a basic backup of your files" },
      { name: "Software install", price: prices.softwarePerProgram, note: "Per program" },
      {
        name: "Course software: SolidWorks, MATLAB, AutoCAD",
        price: prices.courseSoftware,
        note: "Needs a valid licence: yours, your school's, or a free student one where available",
      },
      { name: "Full setup bundle", price: prices.fullSetup, note: "Windows, drivers, backup, Office and up to 3 programs" },
      { name: "Premium bundle", price: prices.premiumSetup, note: "Full setup plus one course software" },
    ],
  },
  {
    slug: "upgrades",
    name: "Upgrades",
    problem: "Laptop too slow to keep up?",
    items: [
      { name: "RAM upgrade", price: prices.ramUpgrade, plusParts: true, note: "Labour only" },
      { name: "HDD to SSD, cloned", price: prices.ssdCloned, plusParts: true, note: "Everything moved across as it is" },
      { name: "HDD to SSD with a fresh Windows install", price: prices.ssdFreshInstall, plusParts: true },
    ],
  },
  {
    slug: "diagnosis",
    name: "Diagnosis and tune-up",
    problem: "Not sure what's wrong?",
    items: [
      { name: "Diagnosis", price: prices.diagnosis, note: "Taken off the bill if you go ahead with the fix" },
      { name: "Tune-up", price: prices.tuneUp, note: "Cleanup, startup fixes and fresh thermal paste" },
      { name: "Data recovery", price: prices.dataRecovery, note: "From a failing or dead drive" },
    ],
  },
  {
    slug: "accessories",
    name: "Accessories",
    problem: "Need a charger, mouse or flash drive?",
    items: [
      { name: "Mice, chargers, flash drives, adapters", price: null, note: "Ordered when you ask. We tell you the price first." },
    ],
  },
];

// Shown in the site header strip and on flyers
export const headlinePrices = [
  { label: "Windows reinstall", price: `from ${formatNaira(prices.windowsReinstall)}` },
  { label: "Full setup", price: formatNaira(prices.fullSetup) },
  { label: "RAM and SSD upgrades", price: `from ${formatNaira(prices.ramUpgrade)} + parts` },
];

export function formatNaira(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

export function formatPrice(item: PriceItem) {
  if (item.price === null) return "Ask";
  return formatNaira(item.price) + (item.plusParts ? " + parts" : "");
}
