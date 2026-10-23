"use client";

import { AuthProvider } from "@/lib/auth/auth-context";
import { SessionProvider } from "@/lib/session/session-context";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <SessionProvider>{children}</SessionProvider>
    </AuthProvider>
  );
}
