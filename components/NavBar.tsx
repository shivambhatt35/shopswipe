"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShopSession } from "@/lib/session-context";

const items = [
  { href: "/discover", label: "Discover" },
  { href: "/saved", label: "Saved" },
];

export function NavBar() {
  const pathname = usePathname();
  const { savedProducts } = useShopSession();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-black/8 bg-[var(--paper)]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <div className="mx-auto flex max-w-md">
        {items.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-1 py-3 text-[11px] tracking-[0.18em] uppercase ${
                active ? "text-[var(--ink)]" : "text-[var(--muted)]"
              }`}
            >
              <span className="font-medium">{item.label}</span>
              {item.href === "/saved" ? (
                <span className="rounded-full bg-[var(--ink)] px-2 py-0.5 text-[10px] text-[var(--paper)]">
                  {savedProducts.length}
                </span>
              ) : (
                <span className="h-4" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
