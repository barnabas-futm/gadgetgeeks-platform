import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { DeviceForm } from "@/components/DeviceForm";
import { serviceName } from "@/components/DevicePassport";
import { Card, Notice, PageHead, StatusPill, formatDate } from "@/components/ui";
import { requestRef, statusLabels, type Device, type Profile, type ServiceRequest } from "@/lib/types";

export const metadata: Metadata = { title: "Customer" };

export default async function CustomerPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const { supabase } = await requireAdmin();
  const { data: p } = await supabase.from("profiles").select("*").eq("id", id).maybeSingle<Profile>();
  if (!p) notFound();
  const [{ data: devices }, { data: requests }] = await Promise.all([
    supabase.from("devices").select("*").eq("owner_id", id).order("created_at", { ascending: false }),
    supabase.from("service_requests").select("*").eq("customer_id", id).order("created_at", { ascending: false }),
  ]);
  const ds = (devices ?? []) as Device[];
  const rs = (requests ?? []) as ServiceRequest[];
  const wa = p.phone ? `https://wa.me/${p.phone.replace(/\D/g, "").replace(/^0/, "234")}` : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-10">
      <Link href="/admin/customers" className="text-sm text-muted hover:text-navy">
        ← Customers
      </Link>
      <PageHead
        title={p.full_name ?? "Customer"}
        sub={[p.phone, p.email, p.user_id ? "has an account" : "no account yet"].filter(Boolean).join(" · ")}
        action={
          wa && (
            <a href={wa} className="rounded-full border border-navy px-5 py-2.5 text-sm hover:bg-navy hover:text-paper">
              WhatsApp
            </a>
          )
        }
      />

      <section>
        <h2 className="text-2xl">Devices</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {ds.map((d) => (
            <li key={d.id}>
              <Link href={`/admin/devices/${d.id}`} className="block rounded-xl border border-line bg-white p-4 hover:border-navy">
                <p className="text-xs text-muted">{d.brand}</p>
                <p className="font-serif text-xl">{d.model}</p>
              </Link>
            </li>
          ))}
          {ds.length === 0 && <li className="text-sm text-muted">No devices yet.</li>}
        </ul>
      </section>

      {rs.length > 0 && (
        <section>
          <h2 className="text-2xl">Requests</h2>
          <ul className="mt-4 divide-y divide-line rounded-xl border border-line bg-white">
            {rs.map((r) => (
              <li key={r.id} className="flex justify-between gap-4 px-5 py-3">
                <span>
                  {serviceName(r.service_slug)}{" "}
                  <span className="text-xs text-muted">
                    {requestRef(r.id)} · {formatDate(r.created_at)}
                  </span>
                </span>
                <StatusPill status={r.status} label={statusLabels[r.status]} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <Card>
        <h2 className="text-2xl mb-6">Add a device for {p.full_name?.split(" ")[0] ?? "this customer"}</h2>
        <div className="mb-6">
          <Notice error={error} />
        </div>
        <DeviceForm ownerId={p.id} back={`/admin/customers/${p.id}`} />
      </Card>
    </div>
  );
}
