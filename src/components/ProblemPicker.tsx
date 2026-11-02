"use client";

import { useState } from "react";
import { bookingHref } from "@/lib/site";

export type Problem = {
  chip: string;
  problem: string;
  fix: string;
  price: string;
  message: string;
};

export function ProblemPicker({ problems }: { problems: Problem[] }) {
  const [active, setActive] = useState(0);
  const p = problems[active];

  return (
    <div className="mt-8">
      <p className="label">Tap what&apos;s wrong</p>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Choose a problem">
        {problems.map((item, i) => (
          <button
            key={item.chip}
            type="button"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={`btn px-4 py-2 text-sm cursor-pointer ${i === active ? "btn-primary" : "btn-secondary"}`}
          >
            {item.chip}
          </button>
        ))}
      </div>

      <div className="mt-6 cut cut-lg bg-line p-px">
        <div key={active} aria-live="polite" className="cut cut-lg bg-paper p-6 sm:p-8 fade-in">
          <h3 className="text-2xl sm:text-3xl">{p.problem}</h3>
          <p className="mt-3 text-muted max-w-2xl">{p.fix}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href={bookingHref(p.message)} className="btn btn-primary">
              Book on WhatsApp
            </a>
            <p className="font-mono text-sm">{p.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
