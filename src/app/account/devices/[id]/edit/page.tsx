import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireProfile } from "@/lib/auth";
import { deleteDevice } from "@/app/actions";
import { DeviceForm } from "@/components/DeviceForm";
import { Button, Notice, PageHead } from "@/components/ui";
import type { Device } from "@/lib/types";

export const metadata: Metadata = { title: "Edit device" };

export default async function EditDevicePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const { supabase } = await requireProfile();
  const { data: device } = await supabase.from("devices").select("*").eq("id", id).maybeSingle<Device>();
  if (!device) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-8">
      <PageHead title={`Edit ${device.model}`} />
      <Notice error={error} />
      <DeviceForm device={device} back={`/account/devices/${id}/edit`} />
      <form action={deleteDevice} className="border-t border-line pt-8">
        <input type="hidden" name="id" value={id} />
        <p className="text-sm text-muted mb-3">Removing a device also removes its service history.</p>
        <Button variant="danger" type="submit">
          Remove this device
        </Button>
      </form>
    </div>
  );
}
