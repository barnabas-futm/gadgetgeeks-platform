import Link from "next/link";
import { bookingHref, services, site } from "@/lib/site";

const steps = [
  { n: "1", title: "Tell us what you need", body: "Buying a laptop, fixing a slow one, or setting up something new. Message us or book online." },
  { n: "2", title: "We sort it", body: "We do the work ourselves. For hardware repair, we send you to a technician we trust." },
  { n: "3", title: "We keep a record", body: "Every device we touch gets a record of its specs and service history, so the next job is faster." },
];

const beta = [
  { name: "Device Passport", body: "One page per device: specs, battery health, warranty and every service done." },
  { name: "Buying advisor", body: "Answer a few questions about budget and use, get three devices that fit, with the reasons." },
  { name: "Diagnostic assistant", body: "Describe the problem, see the likely causes, and know whether to fix it yourself or book us." },
  { name: "Gadget Health Score", body: "A 0–100 score for each device, with what would improve it." },
];

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pt-16 pb-14 sm:pt-24">
        <p className="text-xs uppercase tracking-[0.25em] text-muted">Technology concierge · Minna</p>
        <h1 className="mt-4 text-5xl sm:text-6xl leading-[1.05] max-w-3xl">
          The right device, set up properly, and looked after.
        </h1>
        <p className="mt-6 text-lg text-muted max-w-2xl">{site.oneLiner}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={bookingHref()} className="rounded-full bg-navy text-paper px-6 py-3 hover:bg-navy-soft">
            Book a service
          </a>
          <Link href="/services" className="rounded-full border border-navy px-6 py-3 hover:bg-navy hover:text-paper">
            See services
          </Link>
        </div>
        <p className="mt-10 text-sm text-muted">About 50 customers served since 2024, mostly by referral.</p>
      </section>

      <section className="border-y border-line bg-white/60">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-3xl">What we do</h2>
          <ul className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3 border border-line rounded-lg overflow-hidden">
            {services.map((s) => (
              <li key={s.slug} className="bg-paper p-5">
                <h3 className="text-xl">{s.name}</h3>
                <p className="mt-2 text-sm text-muted">{s.summary}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">
            We don&apos;t do hardware repair ourselves. We refer you to technicians we trust.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14">
        <h2 className="text-3xl">How it works</h2>
        <ol className="mt-8 grid gap-8 sm:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n}>
              <span className="font-serif text-4xl text-accent">{s.n}</span>
              <h3 className="mt-2 text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-6">
        <div className="rounded-2xl bg-navy text-paper p-8 sm:p-10">
          <p className="text-xs uppercase tracking-[0.25em] text-paper/60">In development · beta</p>
          <h2 className="mt-3 text-3xl">The GadgetGeeks platform</h2>
          <p className="mt-3 text-paper/75 max-w-2xl">
            We are building our service into a platform. These AI-assisted tools are being built now and will open to
            customers first.
          </p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {beta.map((b) => (
              <li key={b.name} className="border-t border-paper/20 pt-4">
                <h3 className="text-xl">{b.name}</h3>
                <p className="mt-1 text-sm text-paper/70">{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
