"use client";

import { AuthProvider } from "@/lib/auth-context";
import { SessionProvider } from "@/lib/session-context";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <SessionProvider>{children}</SessionProvider>
    </AuthProvider>
  );
}
