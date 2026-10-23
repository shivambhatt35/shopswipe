"use client";

import { domains } from "@/lib/catalog";
import { useShopSession } from "@/lib/session-context";
import { useState } from "react";

export function DomainFilters() {
  const { session, toggleDomain, toggleSubdomain, selectAllFilters } =
    useShopSession();
  const [openId, setOpenId] = useState<string | null>(null);

  if (!session) return null;

  const allSelected =
    session.selectedDomains.length === domains.length &&
    session.selectedSubdomains.length ===
      domains.reduce((count, domain) => count + domain.subdomains.length, 0);

  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
            Browse
          </p>
          <h1 className="font-serif text-3xl leading-none text-[var(--ink)]">
            Find something
          </h1>
        </div>
        <button
          type="button"
          onClick={selectAllFilters}
          className={`rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] ${
            allSelected
              ? "bg-[var(--ink)] text-[var(--paper)]"
              : "border border-black/15 text-[var(--ink)]"
          }`}
        >
          All
        </button>
      </div>

      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
        {domains.map((domain) => {
          const on = session.selectedDomains.includes(domain.id);
          return (
            <div key={domain.id} className="flex shrink-0 items-center gap-1">
              <label className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm ${on ? "bg-[var(--terracotta)] text-white" : "bg-black/5 text-[var(--muted)]"}`}>
                <input type="checkbox" checked={on} onChange={() => toggleDomain(domain.id)} />
                {domain.label}
              </label>
              <button type="button" aria-label={`Choose ${domain.label} categories`} aria-expanded={openId === domain.id}
                onClick={() => setOpenId(openId === domain.id ? null : domain.id)} className="px-2 py-2">▾</button>
            </div>
          );
        })}
      </div>

      {domains.map((domain) => {
        if (openId !== domain.id) {
          return null;
        }
        return (
          <div
            key={domain.id}
            className="rounded-2xl border border-black/8 bg-white p-3"
          >
            <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
              {domain.label} · pick a list
            </p>
            <div className="flex flex-wrap gap-2">
              {domain.subdomains.map((subdomain) => {
                const checked = session.selectedSubdomains.includes(subdomain.id);
                return (
                  <label
                    key={subdomain.id}
                    className={`flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 text-sm ${
                      checked
                        ? "bg-[var(--ink)] text-[var(--paper)]"
                        : "bg-black/5 text-[var(--ink)]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggleSubdomain(subdomain.id, domain.id)}
                    />
                    {subdomain.label}
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
