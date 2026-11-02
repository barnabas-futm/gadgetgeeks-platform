import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

// TODO: Barnabas to review this copy and rewrite in his own voice.
export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="label">Since 2024 · Minna</p>
      <h1 className="mt-3 text-5xl">About GadgetGeeks</h1>
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
      <div className="mt-12 border-t-2 border-navy pt-8">
        <h2 className="text-2xl">Founder</h2>
        <div className="mt-2 space-y-4 text-muted">
          <p>
            Barnabas Olawoore studied Mechatronics Engineering at the Federal University of Technology, Minna, where his
            work covers embedded systems and IoT.
          </p>
          <p>
            He taught himself to fix computers before university. He watched a technician install Windows once, then went
            home and did it on his own laptop. He has never handed his own laptop to anyone else to fix.
          </p>
          <p>
            Since 2024 he has sorted out laptops for about 50 people in Gidan Kwano, most of them students. He still does
            every job himself.
          </p>
        </div>
      </div>
    </div>
  );
}
