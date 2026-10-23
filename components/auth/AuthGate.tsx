"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

export function AuthGate({ children }: { children: ReactNode }) {
  const { user, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready) return;
    if (!user && pathname !== "/") router.replace("/");
    if (user && pathname === "/") router.replace("/discover");
  }, [pathname, ready, router, user]);

  if (!ready || (!user && pathname !== "/") || (user && pathname === "/")) {
    return (
      <div className="grid min-h-dvh place-items-center text-sm text-[var(--muted)]">
        Loading ShopSwipe…
      </div>
    );
  }

  return <>{children}</>;
}
