import type { Metadata } from "next";
import Link from "next/link";
import { signIn } from "@/app/auth-actions";
import { Button, Field, Notice, inputClass } from "@/components/ui";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string; next?: string }>;
}) {
  const { error, message, next } = await searchParams;
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-5xl">Sign in</h1>
      <p className="mt-2 text-muted">See your devices, their service history and your requests.</p>
      <form action={signIn} className="mt-8 space-y-5">
        <Notice error={error} message={message} />
        <input type="hidden" name="next" value={next ?? "/account"} />
        <Field label="Email">
          <input className={inputClass} type="email" name="email" autoComplete="email" required />
        </Field>
        <Field label="Password">
          <input className={inputClass} type="password" name="password" autoComplete="current-password" required />
        </Field>
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
      <p className="mt-6 text-sm text-muted">
        New here?{" "}
        <Link href="/signup" className="text-navy underline underline-offset-4">
          Create an account
        </Link>
      </p>
    </div>
  );
}
