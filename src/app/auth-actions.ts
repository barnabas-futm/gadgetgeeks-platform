"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { str, withError } from "@/lib/form";

function safeNext(next: string | null) {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/account";
}

export async function signIn(fd: FormData) {
  const email = str(fd, "email");
  const password = str(fd, "password");
  const next = safeNext(str(fd, "next"));
  if (!email || !password) redirect(withError("/login", "Enter your email and password."));

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(withError(`/login?next=${encodeURIComponent(next)}`, "Email or password is not correct."));
  redirect(next);
}

export async function signUp(fd: FormData) {
  const full_name = str(fd, "full_name");
  const phone = str(fd, "phone");
  const email = str(fd, "email");
  const password = str(fd, "password");
  if (!full_name || !email || !password) redirect(withError("/signup", "Name, email and password are required."));
  if (password.length < 8) redirect(withError("/signup", "Use a password of at least 8 characters."));

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name, phone } },
  });
  if (error) redirect(withError("/signup", error.message));
  if (!data.session) {
    redirect("/login?message=" + encodeURIComponent("Account created. Check your email to confirm it, then sign in."));
  }
  redirect("/account");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
