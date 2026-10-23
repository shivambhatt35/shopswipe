"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { allDomainIds, allSubdomainIds, productById } from "@/lib/catalog/catalog";
import { readJson, writeJson } from "@/lib/storage/browser-storage";
import type { DomainId, Product, SessionState } from "@/lib/types";
import { useAuth } from "@/lib/auth/auth-context";

type SessionContextValue = {
  session: SessionState | null;
  savedProducts: Product[];
  saveProduct: (product: Product) => void;
  rejectProduct: (productId: string) => void;
  toggleDomain: (domainId: DomainId) => void;
  toggleSubdomain: (subdomainId: string, domainId: DomainId) => void;
  selectAllFilters: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

function emptySaved(): Record<DomainId, string[]> {
  return {
    fashion: [],
    home: [],
    electronics: [],
    beauty: [],
    fitness: [],
  };
}

function createSession(userId: string): SessionState {
  return {
    id: crypto.randomUUID(),
    userId,
    selectedDomains: [...allDomainIds],
    selectedSubdomains: [...allSubdomainIds],
    rejectedIds: [],
    savedByDomain: emptySaved(),
  };
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const { user, ready } = useAuth();
  const [session, setSession] = useState<SessionState | null>(null);

  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(() => {
    if (!user) {
      setSession(null);
      return;
    }
    const stored = readJson<SessionState | null>("session", null);
    if (stored && stored.userId === user.id) {
      setSession(stored);
      return;
    }
    const next = createSession(user.id);
    writeJson("session", next);
    setSession(next);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [ready, user]);

  const persist = useCallback((next: SessionState) => {
    setSession(next);
    writeJson("session", next);
  }, []);

  const saveProduct = useCallback(
    (product: Product) => {
      if (!session) return;
      const existing = session.savedByDomain[product.domainId] ?? [];
      if (existing.includes(product.id)) return;
      persist({
        ...session,
        savedByDomain: {
          ...session.savedByDomain,
          [product.domainId]: [...existing, product.id],
        },
      });
    },
    [persist, session],
  );

  const rejectProduct = useCallback(
    (productId: string) => {
      if (!session) return;
      if (session.rejectedIds.includes(productId)) return;
      persist({
        ...session,
        rejectedIds: [...session.rejectedIds, productId],
      });
    },
    [persist, session],
  );

  const toggleDomain = useCallback(
    (domainId: DomainId) => {
      if (!session) return;
      const selected = session.selectedDomains.includes(domainId)
        ? session.selectedDomains.filter((id) => id !== domainId)
        : [...session.selectedDomains, domainId];
      persist({
        ...session,
        selectedDomains: selected,
      });
    },
    [persist, session],
  );

  const toggleSubdomain = useCallback(
    (subdomainId: string, domainId: DomainId) => {
      if (!session) return;
      const selected = session.selectedSubdomains.includes(subdomainId)
        ? session.selectedSubdomains.filter((id) => id !== subdomainId)
        : [...session.selectedSubdomains, subdomainId];
      persist({
        ...session,
        selectedDomains: session.selectedDomains.includes(domainId)
          ? session.selectedDomains
          : [...session.selectedDomains, domainId],
        selectedSubdomains: selected,
      });
    },
    [persist, session],
  );

  const selectAllFilters = useCallback(() => {
    if (!session) return;
    persist({
      ...session,
      selectedDomains: [...allDomainIds],
      selectedSubdomains: [...allSubdomainIds],
    });
  }, [persist, session]);

  const savedProducts = useMemo(() => {
    if (!session) return [];
    return allDomainIds.flatMap((domainId) =>
      (session.savedByDomain[domainId] ?? [])
        .map((id) => productById(id))
        .filter((product): product is Product => Boolean(product)),
    );
  }, [session]);

  const value = useMemo(
    () => ({
      session,
      savedProducts,
      saveProduct,
      rejectProduct,
      toggleDomain,
      toggleSubdomain,
      selectAllFilters,
    }),
    [
      rejectProduct,
      saveProduct,
      savedProducts,
      selectAllFilters,
      session,
      toggleDomain,
      toggleSubdomain,
    ],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useShopSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useShopSession must be used inside SessionProvider");
  }
  return context;
}
