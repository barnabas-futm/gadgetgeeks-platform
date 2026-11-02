import Link from "next/link";
import { bookingHref, buyingHelpTiers, formatNaira, services, site } from "@/lib/site";
import { InspectionReport } from "@/components/InspectionReport";

const steps = [
  { n: "01", title: "Tell us what you need", body: "Buying a laptop, fixing a slow one, or setting up something new. Send us a WhatsApp message." },
  { n: "02", title: "We sort it", body: "We do the work ourselves. For hardware repair, we send you to a technician we trust." },
  { n: "03", title: "We keep a record", body: "Every device we touch gets a record of its specs and service history, so the next job is faster." },
];

const checks = [
  "Specs match what the seller listed",
  "Battery wear measured, not guessed",
  "Drive health and hours of use read",
  "Screen checked for dead pixels",
  "Every key and port tested",
  "No BIOS password or company lock",
  "Charger is the right wattage and genuine",
  "Windows activated and working",
];

const buyingHelpMessage = "Hi GadgetGeeks, I'd like help buying a laptop. My budget is ";

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-16 sm:pt-20 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className="label">Technology concierge · Gidan Kwano, Minna</p>
          <h1 className="mt-4 text-[2.6rem] sm:text-6xl">Know what you&apos;re buying before you pay.</h1>
          <p className="mt-6 text-lg text-muted max-w-xl">
            {site.oneLiner} Starting with the laptop: we find it, check it, and set it up.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={bookingHref(buyingHelpMessage)} className="btn btn-primary">
              Get buying help · from {formatNaira(buyingHelpTiers[0].price)}
            </a>
            <Link href="/services" className="btn btn-secondary">
              All services
            </Link>
          </div>
          <p className="label mt-10">~50 customers since 2024 · most came by referral</p>
        </div>
        <InspectionReport />
      </section>

      <section className="bg-surface border-y border-line">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl">What we do</h2>
            <Link href="/services" className="label hover:text-navy">
              Prices →
            </Link>
          </div>
          <ul className="mt-8 border-t-2 border-navy">
            {services.map((s, i) => (
              <li
                key={s.slug}
                className="grid gap-1 border-b border-line py-5 sm:grid-cols-[3rem_16rem_1fr_auto] sm:items-baseline sm:gap-6"
              >
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-lg">{s.name}</h3>
                <p className="text-sm text-muted">{s.summary}</p>
                <p className="font-mono text-sm sm:text-right">
                  {s.priceFrom ? `from ${formatNaira(s.priceFrom)}` : "ask"}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted">
            We don&apos;t do hardware repair ourselves. We refer you to technicians we trust.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
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

      <section className="mx-auto max-w-6xl px-4">
        <div className="cut cut-lg bg-navy text-paper p-8 sm:p-12">
          <p className="font-mono text-xs text-accent-bright">Buying a laptop this semester?</p>
          <h2 className="mt-3 text-3xl sm:text-4xl max-w-2xl">Every inspection covers these eight checks.</h2>
          <ul className="mt-10 grid gap-x-10 gap-y-4 font-mono text-sm sm:grid-cols-2">
            {checks.map((c) => (
              <li key={c} className="flex gap-3 border-b border-paper/15 pb-4">
                <span className="text-accent-bright">✓</span>
                <span className="text-paper/85">{c}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={bookingHref(buyingHelpMessage)} className="btn btn-light">
              Get buying help
            </a>
            <Link href="/services" className="btn bg-paper/10 text-paper hover:bg-paper/15">
              See the three packages
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
