import type { Metadata } from "next";
import Link from "next/link";
import { signUp } from "@/app/auth-actions";
import { Button, Field, Notice, inputClass } from "@/components/ui";

export const metadata: Metadata = { title: "Create an account" };

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-5xl">Create an account</h1>
      <p className="mt-2 text-muted">
        Keep a record of your devices in one place, and book GadgetGeeks when you need help.
      </p>
      <form action={signUp} className="mt-8 space-y-5">
        <Notice error={error} />
        <Field label="Full name">
          <input className={inputClass} name="full_name" autoComplete="name" required />
        </Field>
        <Field label="Phone (WhatsApp)" hint="So we can reach you about a booking.">
          <input className={inputClass} name="phone" type="tel" autoComplete="tel" placeholder="0803 000 0000" />
        </Field>
        <Field label="Email">
          <input className={inputClass} type="email" name="email" autoComplete="email" required />
        </Field>
        <Field label="Password" hint="At least 8 characters.">
          <input className={inputClass} type="password" name="password" autoComplete="new-password" minLength={8} required />
        </Field>
        <Button type="submit" className="w-full">
          Create account
        </Button>
      </form>
      <p className="mt-6 text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-navy underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </div>
  );
}
