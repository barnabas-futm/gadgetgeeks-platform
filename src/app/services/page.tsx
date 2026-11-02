import type { Metadata } from "next";
import { bookingHref, formatNaira, formatPrice, prices, serviceGroups } from "@/lib/site";

export const metadata: Metadata = { title: "Services and prices" };

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <p className="label">Price list</p>
      <h1 className="mt-3 text-5xl">Services and prices</h1>
      <p className="mt-4 text-muted max-w-2xl">
        We agree the price before any work starts. Where it says &quot;+ parts&quot;, we tell you the part price before
        buying it.
      </p>

      {serviceGroups.map((g) => (
        <section key={g.slug} className="mt-12">
          <p className="label">{g.problem}</p>
          <h2 className="mt-2 text-2xl">{g.name}</h2>
          <ul className="mt-4 border-t-2 border-navy">
            {g.items.map((item) => (
              <li key={item.name} className="flex items-baseline justify-between gap-4 border-b border-line py-4">
                <div>
                  <a
                    href={bookingHref(`Hi GadgetGeeks, I'd like to book: ${item.name}.`)}
                    className="font-medium underline-offset-4 hover:underline"
                  >
                    {item.name}
                  </a>
                  {item.note && <p className="mt-1 text-sm text-muted">{item.note}</p>}
                </div>
                <p className="shrink-0 font-mono text-sm text-right">{formatPrice(item)}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div className="mt-12 grid gap-2 text-sm text-muted">
        <p>Hostel visits on campus are included. Outside Gidan Kwano there&apos;s a {formatNaira(prices.callout)} callout.</p>
        <p>We don&apos;t do hardware repair such as screens, motherboards or liquid damage.</p>
      </div>

      <a href={bookingHref()} className="btn btn-primary mt-10">
        Book on WhatsApp
      </a>
    </div>
  );
}
