import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "About" };

const skills = [
  "Windows 10 and 11 installs, recovery and driver setup",
  "Engineering and course software such as SolidWorks, MATLAB and AutoCAD",
  "Finding why a laptop is slow and fixing it: tune-ups, RAM upgrades, HDD to SSD moves",
  "Recovering files from failing drives",
  "Choosing parts and upgrades that fit the laptop and are worth the money",
];

// TODO: Barnabas to review this copy and rewrite in his own voice.
export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="label">Since 2024 · Minna</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">About GadgetGeeks</h1>
      <div className="mt-8 space-y-5 text-lg text-muted leading-relaxed">
        <p>
          GadgetGeeks started in 2024 in Minna. People kept asking Barnabas which laptop to buy, why theirs was slow, and
          whether it was worth upgrading. Helping them turned into a business.
        </p>
        <p>
          Most of the problems we see are not about one bad device. People buy without good advice, set up badly, and
          have no one to ask when something goes wrong. Each step happens with a different person, and nothing is
          written down.
        </p>
        <p>
          GadgetGeeks fixes that for laptops in Gidan Kwano: software set up properly, upgrades when they make sense,
          and a note of every job so the next one is quicker.
        </p>
      </div>
      <div className="mt-12 border-t-2 border-navy pt-8 grid gap-8 sm:grid-cols-[11rem_1fr]">
        <div className="cut cut-lg bg-line p-px self-start w-44 sm:w-auto">
          <Image
            src="/barnabas.jpg"
            alt="Barnabas Olawoore, founder of GadgetGeeks"
            width={1373}
            height={1600}
            sizes="(min-width: 640px) 176px, 176px"
            className="cut cut-lg block aspect-[4/5] w-full object-cover object-[50%_80%] bg-surface"
          />
        </div>
        <div>
          <p className="label">Founder</p>
          <h2 className="mt-2 text-2xl">Barnabas Olawoore</h2>
          <p className="mt-1 text-sm text-muted">Mechatronics Engineering, Federal University of Technology, Minna</p>
          <p className="mt-5 text-muted">
            Barnabas has been setting up, upgrading and fixing laptops for paying customers since 2024, about 50 so far,
            most of them students in Gidan Kwano. He does every job himself.
          </p>
          <ul className="mt-5 grid gap-2 text-muted">
            {skills.map((s) => (
              <li key={s} className="flex gap-3">
                <span className="font-mono text-accent">✓</span>
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-muted">
            His engineering training in embedded systems and IoT means he checks how the hardware and software fit
            together before changing anything.
          </p>
        </div>
      </div>
    </div>
  );
}
