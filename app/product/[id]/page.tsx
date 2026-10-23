"use client";

import { NavBar } from "@/components/navigation/NavBar";
import { lowestOffer, productById } from "@/lib/catalog/catalog";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const product = productById(params.id);

  if (!product) {
    return (
      <main className="grid min-h-dvh place-items-center px-6 text-center">
        <div>
          <p className="font-serif text-3xl">Missing piece</p>
          <Link href="/discover" className="mt-4 inline-block text-sm underline">
            Back to discover
          </Link>
        </div>
      </main>
    );
  }

  const best = lowestOffer(product);

  return (
    <main className="mx-auto min-h-dvh w-full max-w-md px-5 pb-28 pt-6">
      <Link href="/discover" className="text-sm text-[var(--muted)]">
        ← Discover
      </Link>
      <div
        className="mt-4 h-72 rounded-[28px] bg-cover bg-center shadow-[0_20px_40px_rgba(40,24,12,0.12)]"
        style={{ backgroundImage: `url(${product.image})` }}
      />
      <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
        Super-like · {product.brand}
      </p>
      <h1 className="font-serif text-4xl">{product.name}</h1>
      <p className="mt-2 text-[var(--muted)]">{product.tagline}</p>

      <p className="mt-4 text-sm text-[var(--muted)]">Sample comparison only. Prices and availability are illustrative. Retailer links search for similar products; verify the exact item and price on their website.</p>
      <section className="mt-6 space-y-2">
        <h2 className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
          Prices across sites
        </h2>
        {product.offers
          .slice()
          .sort((a, b) => a.price - b.price)
          .map((offer) => {
            const cheapest = offer.retailer === best.retailer;
            return (
              <a
                key={offer.retailer}
                href={offer.url}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-between rounded-2xl px-4 py-3 ${
                  cheapest
                    ? "bg-[var(--ink)] text-[var(--paper)]"
                    : "bg-white"
                }`}
              >
                <div>
                  <p className="font-medium">{offer.retailer}</p>
                  <p
                    className={`text-xs ${
                      cheapest ? "text-white/70" : "text-[var(--muted)]"
                    }`}
                  >
                    {offer.inStock ? "In stock" : "Sold out"}
                    {cheapest ? " · best price" : ""}
                  </p>
                </div>
                <p className="text-lg">${offer.price}</p>
              </a>
            );
          })}
      </section>
      <NavBar />
    </main>
  );
}
