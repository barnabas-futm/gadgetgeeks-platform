import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireProfile } from "@/lib/auth";
import { Card, Notice, PageHead, StatusPill, formatDate } from "@/components/ui";
import { serviceName } from "@/components/DevicePassport";
import { bookingHref } from "@/lib/site";
import { requestRef, statusLabels, type Device, type ServiceRequest } from "@/lib/types";

export const metadata: Metadata = { title: "Your request" };

export default async function RequestPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sent?: string }>;
}) {
  const { id } = await params;
  const { sent } = await searchParams;
  const { supabase } = await requireProfile();
  const { data: r } = await supabase.from("service_requests").select("*").eq("id", id).maybeSingle<ServiceRequest>();
  if (!r) notFound();
  let device: Pick<Device, "brand" | "model"> | null = null;
  if (r.device_id) {
    const { data } = await supabase.from("devices").select("brand, model").eq("id", r.device_id).maybeSingle();
    device = data;
  }

  const ref = requestRef(r.id);
  const message = [
    `Hi GadgetGeeks, this is about request ${ref}.`,
    `Service: ${serviceName(r.service_slug)}`,
    device ? `Device: ${device.brand} ${device.model}` : null,
    r.description ? `Details: ${r.description}` : null,
    r.preferred_time ? `Preferred time: ${r.preferred_time}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 space-y-8">
      <Link href="/account" className="text-sm text-muted hover:text-navy">
        ← My devices
      </Link>
      <PageHead title={serviceName(r.service_slug)} sub={`Request ${ref} · ${formatDate(r.created_at)}`} />
      {sent && <Notice message="Request received. Send it on WhatsApp too, so we see it straight away." />}
      <Card className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted">Status</span>
          <StatusPill status={r.status} label={statusLabels[r.status]} />
        </div>
        {device && (
          <p className="text-sm">
            <span className="text-muted">Device: </span>
            {device.brand} {device.model}
          </p>
        )}
        {r.description && <p className="text-sm whitespace-pre-line">{r.description}</p>}
        {r.preferred_time && (
          <p className="text-sm">
            <span className="text-muted">Preferred time: </span>
            {r.preferred_time}
          </p>
        )}
      </Card>
      <a href={bookingHref(message)} className="inline-block rounded-full bg-navy text-paper px-6 py-3 hover:bg-navy-soft">
        Send on WhatsApp
      </a>
    </div>
  );
}
