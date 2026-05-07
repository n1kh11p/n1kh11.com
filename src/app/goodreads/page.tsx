"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GoodreadsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/writing");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
      <div className="space-y-3">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
          Redirecting
        </p>
        <p className="font-serif text-2xl italic text-foreground-strong">
          This room moved.
        </p>
        <p className="text-sm text-muted">
          Taking you to{" "}
          <Link href="/writing" className="text-foreground hover:text-foreground-strong">
            /writing
          </Link>
          …
        </p>
      </div>
    </div>
  );
}
