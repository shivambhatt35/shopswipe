import type { Domain, Product } from "./types";

export const domains: Domain[] = [
  {
    id: "fashion",
    label: "Fashion",
    subdomains: [
      { id: "jackets", label: "Jackets" },
      { id: "shirts", label: "Shirts" },
      { id: "dresses", label: "Dresses" },
      { id: "shoes", label: "Shoes" },
    ],
  },
  {
    id: "home",
    label: "Home decor",
    subdomains: [
      { id: "furniture", label: "Furniture" },
      { id: "lighting", label: "Lighting" },
      { id: "textiles", label: "Textiles" },
    ],
  },
  {
    id: "electronics",
    label: "Electronics",
    subdomains: [
      { id: "audio", label: "Audio" },
      { id: "wearables", label: "Wearables" },
    ],
  },
  {
    id: "beauty",
    label: "Beauty",
    subdomains: [
      { id: "skincare", label: "Skincare" },
      { id: "makeup", label: "Makeup" },
    ],
  },
  {
    id: "fitness",
    label: "Fitness",
    subdomains: [
      { id: "gear", label: "Gear" },
      { id: "apparel", label: "Apparel" },
    ],
  },
];

export const allDomainIds = domains.map((domain) => domain.id);
export const allSubdomainIds = domains.flatMap((domain) =>
  domain.subdomains.map((subdomain) => subdomain.id),
);

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const sampleProducts: Product[] = [
  {
    id: "fj-01",
    name: "Cropped wool bomber",
    brand: "Arket",
    domainId: "fashion",
    subdomainId: "jackets",
    image: img("photo-1551028719-00167b16eac5"),
    tagline: "Soft structure, city-night weight.",
    offers: [
      { retailer: "Zara", price: 129, url: "https://www.zara.com", inStock: true },
      { retailer: "Amazon", price: 142, url: "https://www.amazon.com", inStock: true },
      { retailer: "Nordstrom", price: 158, url: "https://www.nordstrom.com", inStock: true },
    ],
  },
  {
    id: "fj-02",
    name: "Oversized trench",
    brand: "COS",
    domainId: "fashion",
    subdomainId: "jackets",
    image: img("photo-1539533018447-63fcce2678e3"),
    tagline: "A classic that still photographs well.",
    offers: [
      { retailer: "Amazon", price: 189, url: "https://www.amazon.com", inStock: true },
      { retailer: "Walmart", price: 164, url: "https://www.walmart.com", inStock: true },
      { retailer: "Zara", price: 179, url: "https://www.zara.com", inStock: false },
    ],
  },
  {
    id: "fs-01",
    name: "Poplin camp shirt",
    brand: "Uniqlo",
    domainId: "fashion",
    subdomainId: "shirts",
    image: img("photo-1596755094514-f87e34085b2c"),
    tagline: "Crisp collar, easy drape.",
    offers: [
      { retailer: "Amazon", price: 39, url: "https://www.amazon.com", inStock: true },
      { retailer: "Walmart", price: 34, url: "https://www.walmart.com", inStock: true },
      { retailer: "Target", price: 36, url: "https://www.target.com", inStock: true },
    ],
  },
  {
    id: "fs-02",
    name: "Silk-blend blouse",
    brand: "Massimo Dutti",
    domainId: "fashion",
    subdomainId: "shirts",
    image: img("photo-1485968579580-b6d095142e6e"),
    tagline: "Quiet sheen for daytime meetings.",
    offers: [
      { retailer: "Nordstrom", price: 98, url: "https://www.nordstrom.com", inStock: true },
      { retailer: "Zara", price: 79, url: "https://www.zara.com", inStock: true },
      { retailer: "Amazon", price: 88, url: "https://www.amazon.com", inStock: true },
    ],
  },
  {
    id: "fd-01",
    name: "Bias-cut slip dress",
    brand: "Reformation",
    domainId: "fashion",
    subdomainId: "dresses",
    image: img("photo-1515372039744-b8f02a3ae446"),
    tagline: "Moves like water, photographs like film.",
    offers: [
      { retailer: "Nordstrom", price: 248, url: "https://www.nordstrom.com", inStock: true },
      { retailer: "Amazon", price: 229, url: "https://www.amazon.com", inStock: false },
      { retailer: "Zara", price: 119, url: "https://www.zara.com", inStock: true },
    ],
  },
  {
    id: "fd-02",
    name: "Linen midi dress",
    brand: "Everlane",
    domainId: "fashion",
    subdomainId: "dresses",
    image: img("photo-1496747611176-843222e1e57c"),
    tagline: "Vacation-coded, office-optional.",
    offers: [
      { retailer: "Amazon", price: 128, url: "https://www.amazon.com", inStock: true },
      { retailer: "Target", price: 112, url: "https://www.target.com", inStock: true },
      { retailer: "Walmart", price: 99, url: "https://www.walmart.com", inStock: true },
    ],
  },
  {
    id: "fsh-01",
    name: "Suede Mary Janes",
    brand: "Everlane",
    domainId: "fashion",
    subdomainId: "shoes",
    image: img("photo-1543163521-1bf539c55dd2"),
    tagline: "Rounded toe, all-day strap.",
    offers: [
      { retailer: "Nordstrom", price: 165, url: "https://www.nordstrom.com", inStock: true },
      { retailer: "Amazon", price: 149, url: "https://www.amazon.com", inStock: true },
      { retailer: "Zara", price: 89, url: "https://www.zara.com", inStock: true },
    ],
  },
  {
    id: "fsh-02",
    name: "Chunky court sneakers",
    brand: "Veja",
    domainId: "fashion",
    subdomainId: "shoes",
    image: img("photo-1542291026-7eec264c27ff"),
    tagline: "Clean leather, extra sole.",
    offers: [
      { retailer: "Amazon", price: 155, url: "https://www.amazon.com", inStock: true },
      { retailer: "Nordstrom", price: 165, url: "https://www.nordstrom.com", inStock: true },
      { retailer: "Walmart", price: 139, url: "https://www.walmart.com", inStock: false },
    ],
  },
  {
    id: "hf-01",
    name: "Bouclé lounge chair",
    brand: "Article",
    domainId: "home",
    subdomainId: "furniture",
    image: img("photo-1567538096630-e0c55bd6374c"),
    tagline: "A corner that finally looks finished.",
    offers: [
      { retailer: "Amazon", price: 649, url: "https://www.amazon.com", inStock: true },
      { retailer: "Walmart", price: 579, url: "https://www.walmart.com", inStock: true },
      { retailer: "IKEA", price: 399, url: "https://www.ikea.com", inStock: true },
    ],
  },
  {
    id: "hf-02",
    name: "Low oak coffee table",
    brand: "West Elm",
    domainId: "home",
    subdomainId: "furniture",
    image: img("photo-1533090481720-856c6e3c1fdc"),
    tagline: "Warm grain, no visual noise.",
    offers: [
      { retailer: "IKEA", price: 179, url: "https://www.ikea.com", inStock: true },
      { retailer: "Target", price: 249, url: "https://www.target.com", inStock: true },
      { retailer: "Amazon", price: 269, url: "https://www.amazon.com", inStock: true },
    ],
  },
  {
    id: "hl-01",
    name: "Paper lantern pendant",
    brand: "Hay",
    domainId: "home",
    subdomainId: "lighting",
    image: img("photo-1507473889761-e5e88307eccd"),
    tagline: "Soft light, sculptural silhouette.",
    offers: [
      { retailer: "IKEA", price: 49, url: "https://www.ikea.com", inStock: true },
      { retailer: "Amazon", price: 72, url: "https://www.amazon.com", inStock: true },
      { retailer: "Walmart", price: 58, url: "https://www.walmart.com", inStock: true },
    ],
  },
  {
    id: "hl-02",
    name: "Brass wall sconce",
    brand: "CB2",
    domainId: "home",
    subdomainId: "lighting",
    image: img("photo-1513506003901-1e6a229e2d15"),
    tagline: "Gallery glow without the installer.",
    offers: [
      { retailer: "Amazon", price: 128, url: "https://www.amazon.com", inStock: true },
      { retailer: "Target", price: 119, url: "https://www.target.com", inStock: true },
      { retailer: "IKEA", price: 39, url: "https://www.ikea.com", inStock: true },
    ],
  },
  {
    id: "ht-01",
    name: "Heavy linen throw",
    brand: "Parachute",
    domainId: "home",
    subdomainId: "textiles",
    image: img("photo-1616486338812-3dadae4b4ace"),
    tagline: "Washed texture, sofa-ready weight.",
    offers: [
      { retailer: "Amazon", price: 98, url: "https://www.amazon.com", inStock: true },
      { retailer: "Target", price: 79, url: "https://www.target.com", inStock: true },
      { retailer: "Walmart", price: 64, url: "https://www.walmart.com", inStock: true },
    ],
  },
  {
    id: "ea-01",
    name: "Studio wireless headphones",
    brand: "Sony",
    domainId: "electronics",
    subdomainId: "audio",
    image: img("photo-1505740420928-5e560c06d30e"),
    tagline: "Quiet cabin, long battery, no bulk.",
    offers: [
      { retailer: "Best Buy", price: 278, url: "https://www.bestbuy.com", inStock: true },
      { retailer: "Amazon", price: 248, url: "https://www.amazon.com", inStock: true },
      { retailer: "Walmart", price: 239, url: "https://www.walmart.com", inStock: true },
    ],
  },
  {
    id: "ea-02",
    name: "Ceramic bluetooth speaker",
    brand: "Bang & Olufsen",
    domainId: "electronics",
    subdomainId: "audio",
    image: img("photo-1608043152269-423dbba4e7e1"),
    tagline: "Looks like an object, not a gadget.",
    offers: [
      { retailer: "Amazon", price: 399, url: "https://www.amazon.com", inStock: true },
      { retailer: "Best Buy", price: 429, url: "https://www.bestbuy.com", inStock: true },
      { retailer: "Target", price: 379, url: "https://www.target.com", inStock: false },
    ],
  },
  {
    id: "ew-01",
    name: "Minimal analog watch",
    brand: "Nordgreen",
    domainId: "electronics",
    subdomainId: "wearables",
    image: img("photo-1523275335684-37898b6baf30"),
    tagline: "Mesh strap, quiet face.",
    offers: [
      { retailer: "Amazon", price: 179, url: "https://www.amazon.com", inStock: true },
      { retailer: "Nordstrom", price: 199, url: "https://www.nordstrom.com", inStock: true },
      { retailer: "Walmart", price: 149, url: "https://www.walmart.com", inStock: true },
    ],
  },
  {
    id: "bs-01",
    name: "Vitamin C serum",
    brand: "The Ordinary",
    domainId: "beauty",
    subdomainId: "skincare",
    image: img("photo-1620916566398-39f1143ab7be"),
    tagline: "Brightening without the fragrance cloud.",
    offers: [
      { retailer: "Sephora", price: 12, url: "https://www.sephora.com", inStock: true },
      { retailer: "Amazon", price: 11, url: "https://www.amazon.com", inStock: true },
      { retailer: "Target", price: 13, url: "https://www.target.com", inStock: true },
    ],
  },
  {
    id: "bs-02",
    name: "Cloud cream moisturizer",
    brand: "Laneige",
    domainId: "beauty",
    subdomainId: "skincare",
    image: img("photo-1556228720-195a672e8a03"),
    tagline: "Dewy finish, travel-size friendly.",
    offers: [
      { retailer: "Sephora", price: 38, url: "https://www.sephora.com", inStock: true },
      { retailer: "Amazon", price: 34, url: "https://www.amazon.com", inStock: true },
      { retailer: "Walmart", price: 32, url: "https://www.walmart.com", inStock: true },
    ],
  },
  {
    id: "bm-01",
    name: "Soft-matte lip color",
    brand: "Rare Beauty",
    domainId: "beauty",
    subdomainId: "makeup",
    image: img("photo-1586495777744-4413f21062fa"),
    tagline: "One swipe, stays put through lunch.",
    offers: [
      { retailer: "Sephora", price: 24, url: "https://www.sephora.com", inStock: true },
      { retailer: "Amazon", price: 22, url: "https://www.amazon.com", inStock: true },
      { retailer: "Target", price: 23, url: "https://www.target.com", inStock: true },
    ],
  },
  {
    id: "fg-01",
    name: "Compact yoga mat",
    brand: "Lululemon",
    domainId: "fitness",
    subdomainId: "gear",
    image: img("photo-1601925260368-ae2f83cf8b7f"),
    tagline: "Grips when you sweat, rolls small.",
    offers: [
      { retailer: "Amazon", price: 78, url: "https://www.amazon.com", inStock: true },
      { retailer: "Target", price: 68, url: "https://www.target.com", inStock: true },
      { retailer: "Walmart", price: 54, url: "https://www.walmart.com", inStock: true },
    ],
  },
  {
    id: "fa-01",
    name: "Lightweight run jacket",
    brand: "Nike",
    domainId: "fitness",
    subdomainId: "apparel",
    image: img("photo-1556821840-3a63f95609a7"),
    tagline: "Packs into its own pocket.",
    offers: [
      { retailer: "Amazon", price: 98, url: "https://www.amazon.com", inStock: true },
      { retailer: "Nordstrom", price: 110, url: "https://www.nordstrom.com", inStock: true },
      { retailer: "Walmart", price: 89, url: "https://www.walmart.com", inStock: true },
    ],
  },
];

// Search links deliberately avoid claiming these illustrative offers are exact listings.
export const products: Product[] = sampleProducts.map(product => ({
  ...product,
  offers: product.offers.map(offer => {
    const search = new URL(offer.url);
    const paths: Record<string, [string, string]> = {
      Amazon: ["/s", "k"], Walmart: ["/search", "q"], Zara: ["/us/en/search", "searchTerm"],
      Target: ["/s", "searchTerm"], IKEA: ["/us/en/search/", "q"], Nordstrom: ["/sr", "keyword"],
      Sephora: ["/search", "keyword"], "Best Buy": ["/site/searchpage.jsp", "st"],
    };
    const [path, parameter] = paths[offer.retailer];
    search.pathname = path;
    search.searchParams.set(parameter, `${product.brand} ${product.name}`);
    return { ...offer, url: search.toString() };
  }),
}));

export function productById(id: string) {
  return products.find((product) => product.id === id);
}

export function lowestOffer(product: Product) {
  return [...product.offers]
    .filter((offer) => offer.inStock)
    .sort((a, b) => a.price - b.price)[0] ?? product.offers[0];
}
