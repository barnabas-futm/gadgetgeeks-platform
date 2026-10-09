import type { Metadata } from "next";
import { bookingHref, formatNaira, services } from "@/lib/site";

export const metadata: Metadata = { title: "Services and prices" };

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-5xl">Services and prices</h1>
      <p className="mt-4 text-muted max-w-2xl">
        Fixed prices, agreed before we start. Parts such as RAM or an SSD are charged at cost on top.
      </p>
      <ul className="mt-10 divide-y divide-line border-y border-line">
        {services.map((s) => (
          <li key={s.slug} className="py-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
            <div>
              <h2 className="text-2xl">{s.name}</h2>
              <p className="mt-1 text-muted">{s.summary}</p>
              <ul className="mt-3 flex flex-wrap gap-2 text-xs">
                {s.includes.map((i) => (
                  <li key={i} className="rounded-full border border-line px-3 py-1 text-muted">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:text-right">
              <p className="font-serif text-2xl">{s.priceFrom ? `From ${formatNaira(s.priceFrom)}` : "Ask for price"}</p>
              <a
                href={bookingHref(`Hi GadgetGeeks, I'd like to book: ${s.name}.`)}
                className="mt-2 inline-block text-sm underline underline-offset-4"
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
