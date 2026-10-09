import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";

export async function getSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null, profile: null as Profile | null };
  const { data: profile } = await supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle<Profile>();
  return { supabase, user, profile };
}

export async function requireProfile() {
  const s = await getSession();
  if (!s.user || !s.profile) redirect("/login");
  return { supabase: s.supabase, user: s.user, profile: s.profile };
}

export async function requireAdmin() {
  const s = await requireProfile();
  if (s.profile.role !== "admin") redirect("/account");
  return s;
}
