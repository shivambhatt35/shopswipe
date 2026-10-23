"use client";

import { DomainFilters } from "@/components/discovery/DomainFilters";
import { NavBar } from "@/components/navigation/NavBar";
import { SwipeDeck } from "@/components/discovery/SwipeDeck";
import { useAuth } from "@/lib/auth/auth-context";

export default function DiscoverPage() {
  const { user, logout } = useAuth();

  return (
    <main className="mx-auto min-h-dvh w-full max-w-md px-5 pb-40 pt-6">
      <header className="mb-5 flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
          ShopSwipe
        </p>
        <button
          type="button"
          onClick={logout}
          className="text-xs text-[var(--muted)]"
        >
          {user?.name} · log out
        </button>
      </header>
      <p className="mb-4 text-xs text-[var(--muted)]">Demo catalog · sample prices and availability, not live retailer listings.</p>
      <DomainFilters />
      <div className="mt-6">
        <SwipeDeck />
      </div>
      <p className="mt-4 text-center text-xs text-[var(--muted)]">
        Left = skip · Right = save · Up = super-like & compare prices
      </p>
      <NavBar />
    </main>
  );
}
