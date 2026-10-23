"use client";

import { filterDeck, swipeAction } from "@/lib/discovery";
import { lowestOffer, products } from "@/lib/catalog";
import { useShopSession } from "@/lib/session-context";
import type { Product } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState, type PointerEvent } from "react";

const threshold = 110;

export function SwipeDeck() {
  const router = useRouter();
  const { session, saveProduct, rejectProduct } = useShopSession();
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const origin = useRef({ x: 0, y: 0 });

  const deck = useMemo(() => {
    if (!session) return [];
    return filterDeck(products, session);
  }, [session]);

  const top = deck[0];
  const next = deck[1];

  function settle(product: Product, x: number, y: number) {
    const action = swipeAction(x, y);
    setDrag({ x: 0, y: 0 });
    if (action === "super") {
      const id = product.id;
      saveProduct(product);
      window.setTimeout(() => router.push(`/product/${id}`), 0);
      return;
    }
    if (action === "like") saveProduct(product);
    else if (action === "reject") rejectProduct(product.id);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    dragging.current = true;
    setIsDragging(true);
    origin.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    setDrag({
      x: event.clientX - origin.current.x,
      y: event.clientY - origin.current.y,
    });
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!dragging.current || !top) return;
    dragging.current = false;
    setIsDragging(false);
    settle(top, event.clientX - origin.current.x, event.clientY - origin.current.y);
  }

  if (!top) {
    return (
      <div className="grid min-h-[420px] place-items-center rounded-[28px] border border-dashed border-black/15 bg-white/60 px-8 text-center">
        <div>
          <p className="font-serif text-2xl">That&apos;s the rack</p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Change domains, or open Saved to compare the pieces you kept.
          </p>
        </div>
      </div>
    );
  }

  const rotate = drag.x / 18;
  const likeOpacity = Math.min(1, Math.max(0, drag.x / threshold));
  const nopeOpacity = Math.min(1, Math.max(0, -drag.x / threshold));
  const superOpacity = Math.min(1, Math.max(0, -drag.y / threshold));

  return (
    <div className="mx-auto w-full max-w-[380px]">
      <div className="relative h-[390px]">
        {next ? <Card product={next} stacked /> : null}
        <div
          className="absolute inset-0 touch-none"
          style={{
            transform: `translate(${drag.x}px, ${drag.y}px) rotate(${rotate}deg)`,
            transition: isDragging ? "none" : "transform 180ms ease",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            dragging.current = false;
            setIsDragging(false);
            setDrag({ x: 0, y: 0 });
          }}
        >
          <Card product={top} />
          <Stamp className="left-5 top-8 border-emerald-700 text-emerald-700" opacity={likeOpacity}>
            LIKE
          </Stamp>
          <Stamp className="right-5 top-8 border-rose-700 text-rose-700" opacity={nopeOpacity}>
            NOPE
          </Stamp>
          <Stamp className="left-1/2 top-8 -translate-x-1/2 border-sky-700 text-sky-700" opacity={superOpacity}>
            SUPER
          </Stamp>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-20 z-20 flex items-center justify-center gap-4">
        <Action
          label="Nope"
          onClick={() => settle(top, -200, 0)}
          className="border-rose-200 text-rose-800"
        />
        <Action
          label="Super"
          onClick={() => settle(top, 0, -200)}
          className="h-16 w-16 border-sky-200 text-sky-800"
        />
        <Action
          label="Like"
          onClick={() => settle(top, 200, 0)}
          className="border-emerald-200 text-emerald-800"
        />
      </div>
    </div>
  );
}

function Card({ product, stacked }: { product: Product; stacked?: boolean }) {
  const offer = lowestOffer(product);
  return (
    <article
      className={`absolute inset-0 overflow-hidden rounded-[28px] bg-white shadow-[0_24px_60px_rgba(40,24,12,0.16)] ${
        stacked ? "translate-y-3 scale-[0.96]" : ""
      }`}
    >
      <div
        className="h-[72%] bg-cover bg-center"
        style={{ backgroundImage: `url(${product.image})` }}
      />
      <div className="flex h-[28%] flex-col justify-between p-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
            {product.brand} · {product.subdomainId}
          </p>
          <h2 className="font-serif text-2xl leading-tight">{product.name}</h2>
        </div>
        <p className="text-sm text-[var(--muted)]">
          from ${offer.price} · {offer.retailer}
        </p>
      </div>
    </article>
  );
}

function Stamp({
  children,
  className,
  opacity,
}: {
  children: string;
  className: string;
  opacity: number;
}) {
  return (
    <span
      className={`pointer-events-none absolute rounded-md border-2 px-3 py-1 text-xl font-bold tracking-[0.2em] ${className}`}
      style={{ opacity }}
    >
      {children}
    </span>
  );
}

function Action({
  label,
  onClick,
  className,
}: {
  label: string;
  onClick: () => void;
  className: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-14 w-14 rounded-full border bg-white text-[10px] font-semibold uppercase tracking-[0.14em] shadow-sm ${className}`}
    >
      {label}
    </button>
  );
}
