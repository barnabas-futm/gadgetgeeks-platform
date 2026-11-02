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

// TODO: Barnabas to confirm the answers marked "check" before they go live.
const faqs = [
  {
    q: "How long does a job take?",
    a: "Most jobs are done the same day. We tell you how long yours will take before we start.", // check
  },
  {
    q: "What happens to my files?",
    a: "We back them up before any reinstall or upgrade. We don't open, copy or keep your personal files.", // check: this is a promise
  },
  {
    q: "Do you install cracked software?",
    a: "No. We install software with a valid licence: yours, your school's, or a free student one. If you're not sure what you're entitled to, ask and we'll help you find out.",
  },
  {
    q: "What if the fix doesn't work?",
    a: "We tell you what we think is wrong before we start, and what we'll try. If something doesn't work, we tell you straight away and agree what to do next before charging anything more.", // check
  },
  {
    q: "Do you fix screens or other hardware?",
    a: "No. We don't do hardware repair such as screens, motherboards or liquid damage.",
  },
  {
    q: "Do you come outside campus?",
    a: `Yes. Hostel visits on campus are included. Outside Gidan Kwano there's a ${formatNaira(prices.callout)} callout.`,
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

      <section id="faq" className="reveal mt-20 scroll-mt-44">
        <p className="label">Questions</p>
        <h2 className="mt-3 text-4xl">Things people ask</h2>
        <div className="mt-8 border-t-2 border-navy">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line py-5">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="font-mono text-accent transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-muted fade-in">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <a href={bookingHref()} className="btn btn-primary mt-12">
        Book on WhatsApp
      </a>
    </div>
  );
}
