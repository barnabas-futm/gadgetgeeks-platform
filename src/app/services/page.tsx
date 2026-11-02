import type { Metadata } from "next";
import { bookingHref, formatNaira, services } from "@/lib/site";

export const metadata: Metadata = { title: "Services and prices" };

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="label">Price list</p>
      <h1 className="mt-3 text-5xl">Services and prices</h1>
      <p className="mt-4 text-muted max-w-2xl">
        We agree the price before we start. Parts such as RAM or an SSD are charged at cost on top.
      </p>
      <ul className="mt-12 border-t-2 border-navy">
        {services.map((s) => (
          <li key={s.slug} className="border-b border-line py-8 grid gap-6 sm:grid-cols-[1fr_12rem] sm:items-start">
            <div>
              <h2 className="text-2xl">{s.name}</h2>
              <p className="mt-2 text-muted max-w-2xl">{s.summary}</p>
              <ul className="mt-4 grid gap-1.5 font-mono text-[0.8rem] text-muted">
                {s.includes.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent">✓</span>
                    {i}
                  </li>
                ))}
              </ul>
              {s.tiers && (
                <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                  {s.tiers.map((t) => (
                    <li key={t.name} className="cut bg-line p-px">
                      <div className="cut bg-surface h-full p-4">
                        <p className="label">{t.name}</p>
                        <p className="mt-1 font-mono text-2xl font-medium">{formatNaira(t.price)}</p>
                        <p className="mt-2 text-sm text-muted">{t.includes}</p>
                        <a
                          href={bookingHref(`Hi GadgetGeeks, I'd like ${s.name} (${t.name}). My budget is `)}
                          className="mt-3 inline-block text-sm font-semibold underline underline-offset-4"
                        >
                          Book {t.name}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="sm:text-right">
              <p className="font-mono text-xl font-medium">
                {s.priceFrom ? `from ${formatNaira(s.priceFrom)}` : "Ask for price"}
              </p>
              <a
                href={bookingHref(`Hi GadgetGeeks, I'd like to book: ${s.name}.`)}
                className="btn btn-secondary mt-3 px-4 py-2 text-sm"
              >
                Book this
              </a>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted">
        Hardware repair (screens, boards, charging ports) is not something we do. Ask us and we will point you to a
        technician we trust.
      </p>
    </div>
  );
}
