import Link from "next/link";
import { bookingHref } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24">
      <p className="label">404 · page not found</p>
      <h1 className="mt-3 text-5xl">
        This page doesn&apos;t exist. <em className="not-italic text-accent">Your laptop can still be fixed.</em>
      </h1>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">
          Go to the homepage
        </Link>
        <a href={bookingHref()} className="btn btn-secondary">
          Book on WhatsApp
        </a>
      </div>
    </div>
  );
}
