export type DomainId =
  | "fashion"
  | "home"
  | "electronics"
  | "beauty"
  | "fitness";

export type Retailer =
  | "Amazon"
  | "Walmart"
  | "Zara"
  | "Target"
  | "IKEA"
  | "Nordstrom"
  | "Sephora"
  | "Best Buy";

export type User = {
  id: string;
  name: string;
  email: string;
  provider: "google" | "email" | "apple";
};

export type Offer = {
  retailer: Retailer;
  price: number;
  url: string;
  inStock: boolean;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  domainId: DomainId;
  subdomainId: string;
  image: string;
  tagline: string;
  offers: Offer[];
};

export type Domain = {
  id: DomainId;
  label: string;
  subdomains: { id: string; label: string }[];
};

export type SessionState = {
  id: string;
  userId: string;
  selectedDomains: DomainId[];
  selectedSubdomains: string[];
  rejectedIds: string[];
  savedByDomain: Record<DomainId, string[]>;
};
