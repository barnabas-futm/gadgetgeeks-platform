import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { updateRequestStatus } from "@/app/actions";
import { serviceName } from "@/components/DevicePassport";
import { Card, PageHead, StatusPill, formatDate, inputClass } from "@/components/ui";
import { requestRef, statusLabels, type Profile, type RequestStatus, type ServiceRequest } from "@/lib/types";

export const metadata: Metadata = { title: "Admin" };

export default async function AdminHome() {
  const { supabase } = await requireAdmin();
  const [customers, devices, records, reqs] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("devices").select("id", { count: "exact", head: true }),
    supabase.from("service_records").select("id", { count: "exact", head: true }),
    supabase.from("service_requests").select("*").order("created_at", { ascending: false }).limit(50),
  ]);
  const requests = (reqs.data ?? []) as ServiceRequest[];
  const ids = [...new Set(requests.map((r) => r.customer_id))];
  const { data: people } = ids.length
    ? await supabase.from("profiles").select("id, full_name, phone").in("id", ids)
    : { data: [] };
  const byId = new Map(((people ?? []) as Pick<Profile, "id" | "full_name" | "phone">[]).map((p) => [p.id, p]));
  const open = requests.filter((r) => ["new", "confirmed", "in_progress"].includes(r.status)).length;

  const stats = [
    ["Customers", customers.count ?? 0],
    ["Devices recorded", devices.count ?? 0],
    ["Services recorded", records.count ?? 0],
    ["Open requests", open],
  ] as const;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 space-y-10">
      <PageHead title="Requests" sub="Everything customers have asked for, newest first." />
      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(([k, v]) => (
          <Card key={k} className="p-4">
            <dt className="text-xs uppercase tracking-wider text-muted">{k}</dt>
            <dd className="mt-1 font-serif text-3xl">{v}</dd>
          </Card>
        ))}
      </dl>

      {requests.length === 0 ? (
        <p className="text-muted">No requests yet.</p>
      ) : (
        <ul className="divide-y divide-line rounded-xl border border-line bg-white">
          {requests.map((r) => {
            const c = byId.get(r.customer_id);
            return (
              <li key={r.id} className="px-5 py-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="font-medium">
                    {serviceName(r.service_slug)} <StatusPill status={r.status} label={statusLabels[r.status]} />
                  </p>
                  <p className="text-sm text-muted">
                    <Link href={`/admin/customers/${r.customer_id}`} className="underline underline-offset-4">
                      {c?.full_name ?? "Customer"}
                    </Link>
                    {c?.phone && ` · ${c.phone}`} · {requestRef(r.id)} · {formatDate(r.created_at)}
                  </p>
                  {r.description && <p className="mt-1 text-sm">{r.description}</p>}
                  {r.preferred_time && <p className="text-xs text-muted">Preferred: {r.preferred_time}</p>}
                </div>
                <form action={updateRequestStatus} className="flex gap-2">
                  <input type="hidden" name="id" value={r.id} />
                  <select name="status" defaultValue={r.status} className={`${inputClass} py-1.5 text-sm`}>
                    {(Object.keys(statusLabels) as RequestStatus[]).map((s) => (
                      <option key={s} value={s}>
                        {statusLabels[s]}
                      </option>
                    ))}
                  </select>
                  <button className="rounded-full border border-navy px-3 text-sm hover:bg-navy hover:text-paper cursor-pointer">
                    Save
                  </button>
                </form>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
