import type { Product, SessionState } from "@/lib/types";

export function filterDeck(products: Product[], session: SessionState): Product[] {
  const hidden = new Set([...session.rejectedIds, ...Object.values(session.savedByDomain).flat()]);
  return products.filter(product => !hidden.has(product.id)
    && session.selectedDomains.includes(product.domainId)
    && session.selectedSubdomains.includes(product.subdomainId));
}

export function swipeAction(x: number, y: number) {
  if (y < -110 && Math.abs(y) > Math.abs(x)) return "super";
  if (x > 110) return "like";
  if (x < -110) return "reject";
  return "cancel";
}
