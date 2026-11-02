"use client";

import { useEffect, useRef, useState } from "react";
import { bookingHref, formatNaira, formatPrice, prices, type PriceItem, type ServiceGroup } from "@/lib/site";

// The price list doubles as an estimator: tick what you need, see a running total,
// then send the list on WhatsApp. The price is still agreed before any work starts.
export function PriceList({ groups, callout }: { groups: ServiceGroup[]; callout: number }) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [outside, setOutside] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  const items = groups.flatMap((g) => g.items);
  const chosen = items.filter((i) => (counts[i.id] ?? 0) > 0);
  const n = (id: string) => counts[id] ?? 0;
  const set = (id: string, value: number) => setCounts((c) => ({ ...c, [id]: Math.max(0, Math.min(10, value)) }));

  // Diagnosis comes off the bill when the fix goes ahead
  const otherFixes = chosen.some((i) => i.id !== "diagnosis" && i.price !== null);
  const diagnosisWaived = n("diagnosis") > 0 && otherFixes;
  const total =
    chosen.reduce((sum, i) => (i.price === null || (i.id === "diagnosis" && diagnosisWaived) ? sum : sum + i.price * n(i.id)), 0) +
    (outside ? callout : 0);
  const hasParts = chosen.some((i) => i.plusParts);
  const hasAsk = chosen.some((i) => i.price === null);

  // Point to a bundle only when it would actually cost less than the items picked
  const separately = (ids: string[]) => ids.reduce((sum, id) => sum + (items.find((i) => i.id === id)?.price ?? 0) * n(id), 0);
  const bundleFits = n("windows") > 0 && n("software") <= 4 && n("course") <= 1;
  const tip = !bundleFits
    ? null
    : n("course") === 1 && separately(["windows", "software", "course"]) > prices.premiumSetup
      ? `Tip: the premium bundle (${formatNaira(prices.premiumSetup)}) covers this for less.`
      : n("course") === 0 && separately(["windows", "software"]) > prices.fullSetup
        ? `Tip: the full setup bundle (${formatNaira(prices.fullSetup)}) covers this for less.`
        : null;

  const line = (i: PriceItem) =>
    `- ${i.name}${i.perUnit && n(i.id) > 1 ? ` x${n(i.id)}` : ""} (${i.price === null ? "price on request" : formatNaira(i.price * n(i.id)) + (i.plusParts ? " + parts" : "")})`;
  const estimate = `${formatNaira(total)}${hasParts ? " + parts" : ""}`;
  const message = [
    "Hi GadgetGeeks, I'd like:",
    ...chosen.map(line),
    ...(outside ? [`- Callout outside Gidan Kwano (${formatNaira(callout)})`] : []),
    `Estimate from your price list: ${estimate}`,
  ].join("\n");

  // Tell the back-to-top button how tall the estimate bar is, so it can sit above it
  const barOpen = chosen.length > 0;
  useEffect(() => {
    const root = document.documentElement;
    const bar = barRef.current;
    if (!barOpen || !bar) {
      root.style.removeProperty("--estimator-h");
      return;
    }
    const update = () => root.style.setProperty("--estimator-h", `${bar.offsetHeight}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(bar);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--estimator-h");
    };
  }, [barOpen]);

  return (
    <div className={chosen.length ? "pb-36" : ""}>
      {groups.map((g) => (
        <section key={g.slug} className="reveal mt-12">
          <p className="label">{g.problem}</p>
          <h2 className="mt-2 text-2xl">{g.name}</h2>
          <ul className="mt-4 border-t-2 border-navy">
            {g.items.map((item) => {
              const count = n(item.id);
              return (
                <li
                  key={item.id}
                  className={`flex items-center gap-4 border-b border-line py-4 transition-colors ${count ? "bg-accent/5" : ""}`}
                >
                  {item.perUnit ? (
                    <div className="flex shrink-0 items-center gap-1 font-mono text-sm" aria-label={`${item.name}, how many`}>
                      <button
                        type="button"
                        onClick={() => set(item.id, count - 1)}
                        className="h-8 w-8 cursor-pointer bg-navy/8 hover:bg-navy/15"
                        aria-label={`One less ${item.name}`}
                      >
                        −
                      </button>
                      <span className="w-6 text-center" aria-live="polite">
                        {count}
                      </span>
                      <button
                        type="button"
                        onClick={() => set(item.id, count + 1)}
                        className="h-8 w-8 cursor-pointer bg-navy/8 hover:bg-navy/15"
                        aria-label={`One more ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <input
                      id={`pick-${item.id}`}
                      type="checkbox"
                      checked={count > 0}
                      onChange={(e) => set(item.id, e.target.checked ? 1 : 0)}
                      className="h-5 w-5 shrink-0 cursor-pointer accent-accent"
                    />
                  )}
                  <label htmlFor={item.perUnit ? undefined : `pick-${item.id}`} className="flex-1 cursor-pointer">
                    <span className="font-medium">{item.name}</span>
                    {item.note && <span className="mt-1 block text-sm text-muted">{item.note}</span>}
                  </label>
                  <p className="shrink-0 font-mono text-sm text-right">{formatPrice(item)}</p>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <label className="mt-8 flex cursor-pointer items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={outside}
          onChange={(e) => setOutside(e.target.checked)}
          className="h-5 w-5 cursor-pointer accent-accent"
        />
        I&apos;m outside Gidan Kwano (+{formatNaira(callout)} callout)
      </label>

      {chosen.length > 0 && (
        <div ref={barRef} className="fixed inset-x-0 bottom-0 z-20 bg-navy text-paper shadow-[0_-8px_24px_rgba(10,31,60,0.25)] slide-up">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4">
            <div>
              <p className="font-mono text-xs text-paper/60">
                {chosen.length} {chosen.length === 1 ? "item" : "items"} · estimate
              </p>
              <p className="font-mono text-2xl font-medium text-accent-bright">{estimate}</p>
              {(diagnosisWaived || hasAsk || tip) && (
                <p className="mt-1 max-w-md text-xs text-paper/70">
                  {diagnosisWaived && "Diagnosis taken off the bill. "}
                  {hasAsk && "Accessory price on request. "}
                  {tip}
                </p>
              )}
            </div>
            <a href={bookingHref(message)} className="btn btn-light">
              Send on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
