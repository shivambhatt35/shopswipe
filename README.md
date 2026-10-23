# ShopSwipe

Tinder for shopping: discover products by category, swipe to skip or save, and super-like to compare retailer offers

## Current checkpoint

This repository contains the working frontend demo and its regression tests. Authentication and retailer offers are simulated. Start here to resume development; see [the handoff](docs/HANDOFF.md) for remaining work and [architecture](docs/ARCHITECTURE.md) for code ownership and data flow.

| Original requirement | Current implementation |
| --- | --- |
| Google one-click login | Simulated Google account; no OAuth exchange |
| Other login methods | Simulated Apple account and browser-local email signup/signin |
| Domains and subdomain checklist | Fashion, Home decor, Electronics, Beauty, Fitness; all selected initially |
| Left swipe | Rejects the product and removes it from the session deck |
| Right swipe | Saves the product under its domain and removes it from the deck |
| Upward super-like | Saves the product and opens its comparison page |
| Saved items by session and domain | Browser-local session; survives refresh, clears on logout |
| Products fetched from Amazon/Walmart | Pending; curated catalog with illustrative offers |
| Same-product price comparison | Pending live integration; sample prices and retailer search links |

## Requirements and setup

Use Node.js 24 LTS and npm. CI uses Node 24. No environment variables or API credentials are needed for the current demo.

```bash
git clone https://github.com/shivambhatt35/shopswipe.git
cd shopswipe
npm ci
npm run dev
```

Open the Local URL printed by Next.js. It normally uses http://localhost:3000 and chooses another port if occupied. During the recent demo the app ran at http://localhost:3001.

```bash
npm run build
npm start
```

The build downloads Google fonts; product images load from Unsplash. Both need network access. The browser must support localStorage and Web Crypto; use localhost or HTTPS for demo email login.

## Demo walkthrough

1. Choose **Continue with Google** or **Continue with Apple** for simulated sign-in. For email, choose **Create account**, enter a throwaway password of at least six characters, and then use **Email login** on future visits.
2. All domains and subcategories begin selected. Use domain checkboxes to include or exclude a domain. Open its adjacent arrow to show the subcategory checklist, such as Fashion → Jackets or Shirts.
3. Uncheck categories to narrow the deck. Selecting no categories produces an empty deck. **All** restores all selections.
4. Drag left to reject, right to save, or upward to super-like. **Nope**, **Like**, and **Super** buttons perform the same actions. Short or cancelled gestures do not select a product.
5. Open **Saved** to view likes grouped by domain. Click a saved item to open its comparison page.
6. A super-like saves the item and opens its sample offers. Retailer links open searches in a new tab; verify the exact product, stock, and price there.
7. Refresh preserves the active session. **Log out** clears the session; the next login starts fresh. Local email accounts remain in that browser.

## Project structure

```text
shopswipe/
├── app/                           # Next.js routes and app composition
│   ├── layout.tsx                 # Fonts, metadata, providers, auth gate
│   ├── providers.tsx              # AuthProvider and SessionProvider
│   ├── globals.css                # Theme and global styles
│   ├── page.tsx                   # Login and email account form (/)
│   ├── discover/page.tsx          # Product browsing (/discover)
│   ├── saved/page.tsx             # Likes grouped by domain (/saved)
│   └── product/[id]/page.tsx      # Comparison (/product/:id)
├── components/
│   ├── auth/AuthGate.tsx          # Demo route visibility and redirects
│   ├── discovery/
│   │   ├── DomainFilters.tsx      # Domain and subcategory controls
│   │   └── SwipeDeck.tsx          # Pointer gestures and action buttons
│   └── navigation/NavBar.tsx      # Discover/Saved navigation
├── lib/
│   ├── auth/auth-context.tsx      # Local demo identities and email accounts
│   ├── catalog/
│   │   ├── catalog.ts             # Sample domains, products, offers, helpers
│   │   └── discovery.ts           # Pure deck filtering and swipe decisions
│   ├── session/session-context.tsx # Session filters, rejects, likes
│   ├── storage/browser-storage.ts # Browser JSON persistence
│   └── types.ts                   # Shared domain/product/session types
├── public/                        # Static assets
├── tests/demo.test.mjs             # Regression tests using Node test runner
├── docs/
│   ├── ARCHITECTURE.md            # Data flow and implementation boundaries
│   └── HANDOFF.md                 # Checkpoint, limitations, next steps
├── .github/workflows/ci.yml        # Install, tests, lint, production build
├── AGENTS.md                      # Repository instructions for coding agents
├── next.config.ts                 # Next.js/Tailwind configuration
├── eslint.config.mjs
├── tsconfig.json                  # Strict TypeScript; @/ maps to repo root
├── package.json
└── package-lock.json              # Reproducible npm dependency versions
```

## Development and verification

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm test` | Run five regression tests for catalog and discovery behavior |
| `npm run lint` | ESLint checks |
| `npx tsc --noEmit` | TypeScript checks |
| `npm run build` | Build the production app |
| `npm start` | Serve a completed production build |

Tests cover defaults, category exclusions including an empty selection, hidden saved/rejected products, swipe direction thresholds, catalog IDs/categories, lowest available sample offers, and retailer search links. They do not replace browser end-to-end tests. CI runs on pushes and pull requests.

Before editing Next.js behavior, follow AGENTS.md and read the relevant installed guides in `node_modules/next/dist/docs/`.

## Demo data and security boundaries

There is no backend, account database, OAuth provider setup, or retailer API integration. `AuthGate` provides frontend navigation behavior, not trusted server authorization. Local state can be edited by the browser user.

Email demo passwords use salted PBKDF2-SHA256 hashes (100,000 iterations) in browser storage. Use throwaway credentials. Older demo accounts stored before password hashing must be recreated after removing their local account data. No demo credentials should be used as a production authentication design.

Local storage keys are `shopswipe:user`, `shopswipe:accounts`, and `shopswipe:session`. Clearing them in browser developer tools resets that browser's demo data; removing accounts also removes local email registrations. Nothing syncs across devices or browsers.

Retailer prices, stock flags, product photos, and brand associations are illustrative. Search links can return similar items; the app does not establish that each retailer sells the exact same item. Real feeds need approved API access and normalized product identifiers. Keep future API secrets on the server and out of Git.

## Troubleshooting

- **Port occupied:** use the URL printed by Next.js. If another server already owns this checkout, reuse its printed URL or stop that process before starting another.
- **Fonts/build fail offline:** restore access to Google Fonts, or implement bundled local fonts before offline deployment.
- **Empty deck:** press All; if every item was saved or rejected, log out and sign back in to start a new session.
- **Email login fails:** create a local demo account first and use the same browser. Check browser storage and Web Crypto availability.
- **Turbopack process/port permission errors:** run in an environment that allows Next.js and its CSS worker processes. This restricted agent environment previously blocked a production build; that failure does not establish a successful build.

## Continue from here

Read [docs/HANDOFF.md](docs/HANDOFF.md), run the checks above, and keep the existing demo working while adding real authentication, retailer data, and browser tests. Do not present sample offers as live prices.
