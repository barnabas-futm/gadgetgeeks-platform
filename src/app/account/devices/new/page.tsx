import type { Metadata } from "next";
import { requireProfile } from "@/lib/auth";
import { DeviceForm } from "@/components/DeviceForm";
import { Notice, PageHead } from "@/components/ui";

export const metadata: Metadata = { title: "Add a device" };

export default async function NewDevicePage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  await requireProfile();
  const { error } = await searchParams;
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-8">
      <PageHead title="Add a device" sub="Fill in what you know. You can add the rest later, or we will when we service it." />
      <Notice error={error} />
      <DeviceForm back="/account/devices/new" />
    </div>
  );
}
