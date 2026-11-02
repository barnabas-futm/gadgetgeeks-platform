import type { Metadata } from "next";
import { bookingHref, formatNaira, prices, serviceGroups } from "@/lib/site";
import { PriceList } from "@/components/PriceList";

export const metadata: Metadata = { title: "Services and prices" };

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <p className="label">Price list</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Services and prices</h1>
      <p className="mt-4 text-muted max-w-2xl">
        Tick what you need to see an estimate, then send the list to us on WhatsApp. We agree the final price before any
        work starts. Where it says &quot;+ parts&quot;, we tell you the part price before buying it.
      </p>

      <PriceList groups={serviceGroups} callout={prices.callout} />

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
