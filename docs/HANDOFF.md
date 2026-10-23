# Development handoff

## Where we left off

The frontend prototype implements the shopping/swiping demo. Source is organized by route and feature, and README contains a walkthrough and setup instructions. This documentation is intended to let the next session resume without the chat history.

Completed fixes include category exclusion when no categories are checked, independent domain selection and category expansion, cancellation-safe pointer handling, upward diagonal detection, logout session clearing, frontend route visibility gating, salted local demo password hashes, explicit sample-data notices, and product-specific retailer searches.

## Remaining product work

1. **Real authentication:** choose an auth provider, configure Google OAuth and email login, create trusted server sessions, store users in a database, and enforce authorization on server data access. Apple remains optional. Current browser identities are simulations.
2. **Retailer ingestion:** obtain approved Amazon/Walmart/other retailer API access, add server-only adapters, normalize offers and currency, and track source/product identifiers and freshness. Add loading/error/empty states before switching from static products.
3. **Exact-item comparison:** match identifiers and variants across sellers; distinguish exact matches from alternatives. Do not compare different branded items as though they are identical.
4. **Persistence:** decide whether Saved should support session history or durable wishlists. The current requirement is implemented as one active local session, cleared on logout.
5. **Browser verification:** add end-to-end coverage for login, filtering, left/right/up gestures, Saved grouping, comparison navigation, refresh, logout, and mobile layouts. Include storage-disabled and unavailable-image cases.
6. **Release:** complete a production build, inspect CI results, configure hosting, and verify the deployed flow. No deployed production URL is recorded here.

These integrations need provider/retailer credentials and product decisions. The current app needs no environment file; add documented variable names and a secret-free example only when integrations are implemented.

## Verification record and limits

Before the folder reorganization, five regression tests, lint, and TypeScript passed. A local development page returned HTTP 200 on port 3001. Full browser behavior was not automatically verified. Production build attempts in the restricted agent environment failed on network/process/port restrictions. Do not treat those attempts as a passing production build; rerun in a suitable environment and review CI.

After any changes, rerun `npm test`, `npm run lint`, `npx tsc --noEmit`, and `npm run build`. The README lists what the tests cover.

## Git and collaboration

Target repository: https://github.com/shivambhatt35/shopswipe (main branch). The initial app checkpoint was committed locally as `7390943`, based on the repository's initial README commit. Its first upload attempt failed because terminal Git lacked HTTPS credentials and the connected integration denied write access. Check current remote history to determine what has since been published; a local commit is not proof of GitHub publication.

Keep node_modules, .next, secrets, and generated TypeScript files out of commits. Use package-lock.json with npm ci. Follow AGENTS.md and the installed Next.js guides before changing framework conventions.
