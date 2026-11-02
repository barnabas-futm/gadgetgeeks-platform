import { formatNaira, prices } from "@/lib/site";

// Homepage headlines. One is picked at random on each visit, never the same one twice in a row.
// `lead` is the problem, `answer` is shown in green after it. Add, remove or reword freely.
export type Hook = { lead: string; answer: string; sub: string };

export const hooks: Hook[] = [
  {
    lead: "Laptop slow? Need course software?",
    answer: "We sort it.",
    sub: "Windows, software, upgrades and tune-ups for laptops in Gidan Kwano. On campus, we come to your hostel.",
  },
  {
    lead: "Windows crashed the night before a deadline?",
    answer: "We'll get you back up.",
    sub: `A clean reinstall with drivers, and your files backed up first. From ${formatNaira(prices.windowsReinstall)}, at your hostel.`,
  },
  {
    lead: "Your laptop isn't too old.",
    answer: "It's probably just slow.",
    sub: "A tune-up, more RAM or an SSD usually brings it back, for far less than a new laptop.",
  },
  {
    lead: "Course software won't install?",
    answer: "We'll get it working.",
    sub: "SolidWorks, MATLAB, AutoCAD or whatever your course uses, set up properly with a valid licence.",
  },
  {
    lead: "New laptop?",
    answer: "Set it up properly from day one.",
    sub: `Windows, drivers, backup, Office and up to three programs for ${formatNaira(prices.fullSetup)}.`,
  },
  {
    lead: "Waiting ages for your laptop to start?",
    answer: "An SSD fixes that.",
    sub: `HDD to SSD from ${formatNaira(prices.ssdCloned)} + parts, with everything moved across as it was.`,
  },
];
