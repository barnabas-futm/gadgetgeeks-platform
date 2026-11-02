import type { Metadata } from "next";
import { bookingHref, formatNaira, prices } from "@/lib/site";

export const metadata: Metadata = { title: "How it works" };

const steps = [
  {
    title: "You message us on WhatsApp",
    body: "Tell us your laptop model and what you want done, or what is going wrong.",
  },
  {
    title: "We agree the job and the price",
    body: `We tell you what we will do, how long it takes and what it costs before any work starts. If we need to look first, a diagnosis is ${formatNaira(prices.diagnosis)}, taken off the bill if you go ahead.`,
  },
  {
    title: "We do the work at your hostel",
    body: `On campus the visit is included; outside Gidan Kwano there's a ${formatNaira(prices.callout)} callout. Your files are backed up first, and when we finish we show you what changed.`,
  },
  {
    title: "We keep a note of the job",
    body: "We write down your laptop's specs and what we did. Next time you need help, we already know your device.",
  },
];

export default function HowItWorks() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="label">Four steps</p>
      <h1 className="mt-3 text-5xl">How it works</h1>
      <ol className="mt-12 border-t-2 border-navy">
        {steps.map((s, i) => (
          <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-8">
            <span className="font-mono text-sm font-medium text-accent pt-1.5">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h2 className="text-2xl">{s.title}</h2>
              <p className="mt-2 text-muted">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <a href={bookingHref()} className="btn btn-primary mt-12">
        Book on WhatsApp
      </a>
    </div>
  );
}
