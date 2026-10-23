# Architecture

## Routing and composition

Next.js App Router exposes `/`, `/discover`, `/saved`, and `/product/[id]`. The root layout composes AuthProvider, SessionProvider, and AuthGate. Interactive pages and providers are client components. The application currently has no route handlers or server-side data services.

## State flow

1. AuthProvider restores `shopswipe:user` after mounting. Simulated Google/Apple sign-in sets a fixed demo identity. Email signup writes a salted password hash to `shopswipe:accounts`.
2. SessionProvider restores a session for the current user or creates one with all domains/subcategories selected, no rejects, and empty per-domain saves.
3. DomainFilters updates the session selection. `filterDeck` excludes products outside the selection and all saved/rejected IDs.
4. SwipeDeck converts pointer displacement into a decision through `swipeAction`. Horizontal movement beyond 110px saves or rejects; upward movement beyond 110px super-likes when vertical displacement dominates.
5. Saving writes the product ID under its domain. Super-like additionally navigates to `/product/:id`. Saved resolves IDs against the same catalog.
6. Logout removes the session and current user. Local email accounts remain available for later logins.

## Module boundaries

- `components/`: user interactions and presentation, grouped by feature.
- `lib/auth/`: demo authentication state. Replace this boundary when adding trusted authentication.
- `lib/session/`: shopping state and persistence actions.
- `lib/catalog/`: sample catalog and pure browsing rules. Real feed ingestion should live in future server-only modules and expose normalized data to the UI.
- `lib/storage/`: local browser persistence helpers.
- `lib/types.ts`: shared Product, Offer, Domain, User, and SessionState contracts.

Current catalog consumers import static data directly. A live feed integration must update discovery, saved-item resolution, and comparison together; adding a fetch only to discovery would leave the other pages inconsistent.

## Verification boundaries

Node tests transpile the actual pure TypeScript modules using the installed TypeScript package. They verify domain/filter and swipe decisions without a separate test framework. Lint and TypeScript check the UI code; browser interaction, responsive layout, provider lifecycle, storage failures, and real external services need additional integration/end-to-end coverage.
