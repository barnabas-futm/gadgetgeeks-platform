import Link from "next/link";
import { bookingHref, formatNaira, headlinePrices, prices, site } from "@/lib/site";
import { Hook } from "@/components/Hook";
import { ProblemPicker, type Problem } from "@/components/ProblemPicker";

const problems: Problem[] = [
  {
    chip: "Slow laptop",
    problem: "Laptop slow?",
    fix: "We find out why, then fix it: a tune-up, more RAM or an SSD.",
    price: `diagnosis ${formatNaira(prices.diagnosis)}`,
    message: "Hi GadgetGeeks, my laptop is slow. It's a ",
  },
  {
    chip: "Software",
    problem: "Need software for your course?",
    fix: "Whatever your course uses, from Office to SolidWorks or MATLAB, installed and working with a valid licence.",
    price: `from ${formatNaira(prices.softwarePerProgram)}`,
    message: "Hi GadgetGeeks, I need software installed: ",
  },
  {
    chip: "Windows crashed",
    problem: "Windows crashed or full of viruses?",
    fix: "A clean Windows 10/11 reinstall with drivers. Your files are backed up first.",
    price: `from ${formatNaira(prices.windowsReinstall)}`,
    message: "Hi GadgetGeeks, I need Windows reinstalled on my ",
  },
  {
    chip: "New laptop",
    problem: "New laptop, or starting fresh?",
    fix: "Full setup: Windows, drivers, backup, Office and up to three programs.",
    price: formatNaira(prices.fullSetup),
    message: "Hi GadgetGeeks, I'd like the full setup bundle for my ",
  },
  {
    chip: "Lost files",
    problem: "Drive failing and your files are on it?",
    fix: "We recover what can be recovered from a failing or dead drive.",
    price: formatNaira(prices.dataRecovery),
    message: "Hi GadgetGeeks, I need data recovered from my ",
  },
  {
    chip: "Accessories",
    problem: "Need something for your laptop?",
    fix: "A charger, mouse, flash drive, adapter or anything else. We order it and tell you the price before we buy.",
    price: "ask",
    message: "Hi GadgetGeeks, I need an accessory: ",
  },
];

const steps = [
  { n: "01", title: "Message us on WhatsApp", body: "Tell us your laptop model and what's wrong, or what you need installed." },
  {
    n: "02",
    title: "We agree the price first",
    body: `From the price list, before any work starts. A diagnosis is ${formatNaira(prices.diagnosis)}, taken off the bill if you go ahead.`,
  },
  {
    n: "03",
    title: "We do it at your hostel",
    body: `On campus the visit is included. Outside Gidan Kwano there's a ${formatNaira(prices.callout)} callout.`,
  },
];

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-16 sm:pt-20 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="label">{site.area} · we come to your hostel</p>
          <div className="mt-4">
            <Hook />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={bookingHref()} className="btn btn-primary">
              Book on WhatsApp
            </a>
            <Link href="/services" className="btn btn-secondary">
              Full price list
            </Link>
          </div>
        </div>

        <div className="cut cut-lg bg-line p-px">
          <div className="cut cut-lg bg-surface">
            <p className="label border-b border-line px-5 py-3">Prices</p>
            <dl className="px-5 py-2">
              {headlinePrices.map((p) => (
                <div key={p.label} className="flex items-baseline justify-between gap-4 border-b border-dashed border-line py-3 last:border-0">
                  <dt className="font-medium">{p.label}</dt>
                  <dd className="font-mono text-sm text-right">{p.price}</dd>
                </div>
              ))}
            </dl>
            <div className="bg-navy px-5 py-4 text-paper">
              <p className="text-sm">Price agreed before any work starts. Hostel visits on campus included.</p>
              <Link href="/services" className="mt-2 inline-block font-mono text-xs text-accent-bright hover:underline">
                See every price →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="reveal bg-surface border-y border-line">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl sm:text-4xl">What we fix</h2>
          <ProblemPicker problems={problems} />
          <p className="mt-5 text-sm text-muted">
            We don&apos;t do hardware repair such as screens, motherboards or liquid damage.
          </p>
        </div>
      </section>

      <section className="reveal mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl sm:text-4xl">How it works</h2>
        <ol className="mt-10 grid gap-10 sm:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="border-t border-line pt-5">
              <span className="font-mono text-sm font-medium text-accent">{s.n}</span>
              <h3 className="mt-3 text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="reveal mx-auto max-w-6xl px-4">
        <div className="cut cut-lg bg-navy text-paper p-8 sm:p-12">
          <h2 className="text-3xl sm:text-4xl max-w-2xl">Book with one WhatsApp message.</h2>
          <p className="mt-4 text-paper/75 max-w-xl">
            Tell us your laptop model and what you need. We reply with the price and a time that suits you.
          </p>
          <a href={bookingHref()} className="btn btn-light mt-8">
            Book on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
