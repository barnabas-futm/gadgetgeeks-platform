import type { Metadata } from "next";
import Link from "next/link";
import { requireProfile } from "@/lib/auth";
import { Card, LinkButton, PageHead, StatusPill, formatDate } from "@/components/ui";
import { serviceName } from "@/components/DevicePassport";
import { deviceKinds, requestRef, statusLabels, type Device, type ServiceRequest } from "@/lib/types";

export const metadata: Metadata = { title: "My devices" };

export default async function AccountPage() {
  const { supabase, profile } = await requireProfile();
  const [{ data: devices }, { data: requests }] = await Promise.all([
    supabase.from("devices").select("*").eq("owner_id", profile.id).order("created_at", { ascending: false }),
    supabase
      .from("service_requests")
      .select("*")
      .eq("customer_id", profile.id)
      .order("created_at", { ascending: false })
      .limit(10),
  ]);
  const ds = (devices ?? []) as Device[];
  const rs = (requests ?? []) as ServiceRequest[];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 space-y-12">
      <PageHead
        title={`Hello, ${profile.full_name?.split(" ")[0] ?? "there"}`}
        sub="Your devices and requests with GadgetGeeks."
        action={
          <div className="flex gap-2">
            <LinkButton href="/account/devices/new" variant="ghost">
              Add a device
            </LinkButton>
            <LinkButton href="/account/requests/new">Request a service</LinkButton>
          </div>
        }
      />

      <section>
        <h2 className="text-2xl">My devices</h2>
        {ds.length === 0 ? (
          <Card className="mt-4">
            <p className="text-muted">
              No devices yet. Add your laptop or phone to start its Device Passport: specs, warranty and every service in
              one place.
            </p>
            <div className="mt-4">
              <LinkButton href="/account/devices/new">Add your first device</LinkButton>
            </div>
          </Card>
        ) : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {ds.map((d) => (
              <li key={d.id}>
                <Link href={`/account/devices/${d.id}`} className="block rounded-xl border border-line bg-white p-5 hover:border-navy">
                  <p className="text-xs uppercase tracking-wider text-muted">
                    {deviceKinds.find((k) => k.value === d.kind)?.label} · {d.brand}
                  </p>
                  <p className="mt-1 font-serif text-2xl">{d.model}</p>
                  <p className="mt-2 text-sm text-muted">
                    {[d.cpu, d.ram_gb && `${d.ram_gb} GB RAM`, d.storage_gb && `${d.storage_gb} GB`]
                      .filter(Boolean)
                      .join(" · ") || "Specs not added yet"}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-2xl">My requests</h2>
        {rs.length === 0 ? (
          <p className="mt-3 text-sm text-muted">No requests yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-line rounded-xl border border-line bg-white">
            {rs.map((r) => (
              <li key={r.id}>
                <Link href={`/account/requests/${r.id}`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-paper">
                  <div>
                    <p className="font-medium">{serviceName(r.service_slug)}</p>
                    <p className="text-xs text-muted">
                      {requestRef(r.id)} · {formatDate(r.created_at)}
                    </p>
                  </div>
                  <StatusPill status={r.status} label={statusLabels[r.status]} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
