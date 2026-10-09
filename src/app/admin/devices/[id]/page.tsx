import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { addServiceRecord } from "@/app/actions";
import { DevicePassport } from "@/components/DevicePassport";
import { Button, Card, Field, LinkButton, Notice, PageHead, inputClass } from "@/components/ui";
import { services } from "@/lib/site";
import type { Device, Profile, ServiceRecord } from "@/lib/types";

export const metadata: Metadata = { title: "Device" };

export default async function AdminDevicePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const { supabase } = await requireAdmin();
  const { data: device } = await supabase.from("devices").select("*").eq("id", id).maybeSingle<Device>();
  if (!device) notFound();
  const [{ data: records }, { data: owner }] = await Promise.all([
    supabase.from("service_records").select("*").eq("device_id", id).order("performed_on", { ascending: false }),
    supabase.from("profiles").select("id, full_name").eq("id", device.owner_id).maybeSingle<Pick<Profile, "id" | "full_name">>(),
  ]);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-8">
      <Link href={`/admin/customers/${device.owner_id}`} className="text-sm text-muted hover:text-navy">
        ← {owner?.full_name ?? "Customer"}
      </Link>
      <PageHead
        title={device.model}
        sub={`${device.brand} · ${owner?.full_name ?? ""}`}
        action={
          <LinkButton href={`/admin/devices/${id}/edit`} variant="ghost">
            Edit device
          </LinkButton>
        }
      />

      <Card>
        <h2 className="text-2xl">Record a service</h2>
        <form action={addServiceRecord} className="mt-5 grid gap-4 sm:grid-cols-2">
          <input type="hidden" name="device_id" value={id} />
          <Field label="Service">
            <select name="service_slug" className={inputClass} required defaultValue="">
              <option value="" disabled>
                Choose
              </option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
              <option value="referral">Referred to partner</option>
              <option value="other">Other</option>
            </select>
          </Field>
          <Field label="Date">
            <input name="performed_on" type="date" defaultValue={today} className={inputClass} />
          </Field>
          <Field label="What was done" className="sm:col-span-2">
            <textarea name="summary" rows={2} className={inputClass} required placeholder="Replaced 500 GB HDD with 512 GB NVMe SSD, cloned Windows." />
          </Field>
          <Field label="Amount charged (₦)">
            <input name="amount_ngn" type="number" min="0" className={inputClass} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Boot before (s)">
              <input name="boot_seconds_before" type="number" min="0" className={inputClass} />
            </Field>
            <Field label="Boot after (s)">
              <input name="boot_seconds_after" type="number" min="0" className={inputClass} />
            </Field>
          </div>
          <div className="sm:col-span-2 space-y-3">
            <Notice error={error} />
            <Button type="submit">Save service record</Button>
          </div>
        </form>
      </Card>

      <DevicePassport device={device} records={(records ?? []) as ServiceRecord[]} />
    </div>
  );
}
