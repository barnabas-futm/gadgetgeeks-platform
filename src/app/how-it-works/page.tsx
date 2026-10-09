import type { Metadata } from "next";
import { bookingHref } from "@/lib/site";

export const metadata: Metadata = { title: "How it works" };

const steps = [
  {
    title: "You get in touch",
    body: "Message us or book online. Tell us the device and what you want done, or what is going wrong.",
  },
  {
    title: "We agree the job and the price",
    body: "We tell you what we will do, how long it takes and what it costs before any work starts.",
  },
  {
    title: "We do the work",
    body: "Your files are backed up first. When we finish, we show you what changed, such as the boot time before and after.",
  },
  {
    title: "Your device gets a record",
    body: "We note the specs, what we did and when. Next time you need help, or want to upgrade, we already know your device.",
  },
];

export default function HowItWorks() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-5xl">How it works</h1>
      <ol className="mt-10 space-y-10">
        {steps.map((s, i) => (
          <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-4">
            <span className="font-serif text-4xl text-accent leading-none">{i + 1}</span>
            <div>
              <h2 className="text-2xl">{s.title}</h2>
              <p className="mt-2 text-muted">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <a href={bookingHref()} className="mt-12 inline-block rounded-full bg-navy text-paper px-6 py-3 hover:bg-navy-soft">
        Book a service
      </a>
    </div>
  );
}
