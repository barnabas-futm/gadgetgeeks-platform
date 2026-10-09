import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireProfile } from "@/lib/auth";
import { DevicePassport } from "@/components/DevicePassport";
import { LinkButton, PageHead } from "@/components/ui";
import type { Device, ServiceRecord } from "@/lib/types";

export const metadata: Metadata = { title: "Device Passport" };

export default async function DevicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireProfile();
  const { data: device } = await supabase.from("devices").select("*").eq("id", id).maybeSingle<Device>();
  if (!device) notFound();
  const { data: records } = await supabase
    .from("service_records")
    .select("*")
    .eq("device_id", id)
    .order("performed_on", { ascending: false });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-8">
      <Link href="/account" className="text-sm text-muted hover:text-navy">
        ← My devices
      </Link>
      <PageHead
        title={device.model}
        sub={`${device.brand} · Device Passport`}
        action={
          <div className="flex gap-2">
            <LinkButton href={`/account/devices/${id}/edit`} variant="ghost">
              Edit
            </LinkButton>
            <LinkButton href={`/account/requests/new?device=${id}`}>Request a service</LinkButton>
          </div>
        }
      />
      <DevicePassport device={device} records={(records ?? []) as ServiceRecord[]} />
    </div>
  );
}
