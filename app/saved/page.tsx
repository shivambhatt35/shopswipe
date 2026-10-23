"use client";

import { NavBar } from "@/components/navigation/NavBar";
import { domains, lowestOffer } from "@/lib/catalog/catalog";
import { useShopSession } from "@/lib/session/session-context";
import Link from "next/link";

export default function SavedPage() {
  const { session, savedProducts } = useShopSession();

  return (
    <main className="mx-auto min-h-dvh w-full max-w-md px-5 pb-28 pt-8">
      <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
        This session
      </p>
      <h1 className="font-serif text-4xl">Saved</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Likes are grouped by domain for the current login.
      </p>

      {savedProducts.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-black/15 p-8 text-center text-sm text-[var(--muted)]">
          Right-swipe a few pieces first.
        </div>
      ) : (
        <div className="mt-6 space-y-8">
          {domains.map((domain) => {
            const items = savedProducts.filter(
              (product) => product.domainId === domain.id,
            );
            if (!items.length) return null;
            return (
              <section key={domain.id}>
                <h2 className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
                  {domain.label}
                </h2>
                <div className="space-y-3">
                  {items.map((product) => {
                    const offer = lowestOffer(product);
                    return (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className="flex gap-3 overflow-hidden rounded-2xl bg-white shadow-sm"
                      >
                        <div
                          className="h-24 w-20 shrink-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${product.image})` }}
                        />
                        <div className="py-3 pr-3">
                          <p className="text-xs text-[var(--muted)]">
                            {product.brand}
                          </p>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-[var(--muted)]">
                            from ${offer.price} on {offer.retailer}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
      {session ? (
        <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
          Session {session.id.slice(0, 8)}
        </p>
      ) : null}
      <NavBar />
    </main>
  );
}
