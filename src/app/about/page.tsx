import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

// TODO: Barnabas to review this copy and rewrite in his own voice.
export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-5xl">About GadgetGeeks</h1>
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
          GadgetGeeks puts those steps in one place: advice before you buy, proper setup, upgrades when they make
          sense, and a record of your device so every job builds on the last.
        </p>
      </div>
      <div className="mt-12 border-t border-line pt-8">
        <h2 className="text-2xl">Founder</h2>
        <p className="mt-2 text-muted">
          Barnabas Olawoore studied Mechatronics Engineering at the Federal University of Technology, Minna. He has been
          taking devices apart to understand them for as long as he can remember.
        </p>
      </div>
    </div>
  );
}
