# ShopSwipe

A Tinder-style shopping demo built with Next.js 16 and React 19.

## Run

```bash
npm ci
npm run dev
```

Open http://localhost:3000 (use the port printed by Next.js if occupied).

## Demo walkthrough

1. Choose Google or Apple for one-click simulated login, or create a local email demo account with a throwaway password.
2. All domains and categories start selected. Use domain checkboxes to include/exclude Fashion, Home decor, Electronics, Beauty, or Fitness. Open the adjacent arrow to choose subcategories such as jackets or shirts. Unchecking every category shows an empty deck; All restores every selection.
3. Drag left to reject, right to save, or up to super-like. The Nope, Like, and Super buttons provide the same actions. Cancelled gestures do not make a selection.
4. Saved groups likes by domain. Super-like also saves the item and opens its sample retailer comparison.
5. Retailer links open a search for that product in a new tab. Verify the exact item and price on the retailer site.
6. Refresh keeps the current demo session. Logout clears it; logging in again starts a fresh session.

## What is implemented and what is simulated

| Requirement | Status |
| --- | --- |
| Google one-click login and other login methods | Simulated Google/Apple accounts; local email signup/signin |
| All domains by default and category checklist | Implemented |
| Left reject, right save, upward compare | Implemented, with button alternatives |
| Session likes grouped by domain | Implemented in browser storage; cleared on logout |
| Amazon/Walmart product fetching | Not connected; curated sample catalog in lib/catalog.ts |
| Compare exact products across retailer sites | Sample offers only; links search for similar items |

This is a frontend prototype, not production authentication. Email credentials are stored as salted PBKDF2 hashes locally, but browser data is user-editable and there is no trusted backend authorization. Older demo accounts created before password hashing must be recreated with another email or cleared from browser storage. Google/Apple OAuth, server-side sessions, an account database, and approved retailer API integrations are still required for real users and live prices. Never put retailer API secrets in client code.

Images require access to Unsplash. The production build downloads Google fonts and requires network access.

## Checks

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
```

Regression tests cover default browsing, category exclusion (including no selections), saved/rejected exclusion, swipe direction thresholds, catalog integrity, and retailer search links. Browser end-to-end tests have not been added.
