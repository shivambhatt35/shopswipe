import { test } from "node:test";
import assert from "node:assert/strict";
import ts from "typescript";
import fs from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
// Load the actual TypeScript logic without adding a test-runner dependency.
function load(file) {
  const loaded = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  new Function("module", "exports", "require", code)(loaded, loaded.exports, require);
  return loaded.exports;
}
const { products, domains, allDomainIds, allSubdomainIds, lowestOffer } = load("lib/catalog/catalog.ts");
const { filterDeck, swipeAction } = load("lib/catalog/discovery.ts");
const session = () => ({ selectedDomains: [...allDomainIds], selectedSubdomains: [...allSubdomainIds], rejectedIds: [], savedByDomain: Object.fromEntries(allDomainIds.map(id => [id, []])) });
test("all domains and subdomains are selected by default", () => {
  assert.equal(filterDeck(products, session()).length, products.length);
});
test("domain and subdomain selection excludes unchecked products, including none selected", () => {
  const state = session();
  state.selectedDomains = ["fashion"];
  state.selectedSubdomains = ["jackets"];
  const result = filterDeck(products, state);
  assert.ok(result.length);
  assert.ok(result.every(p => p.domainId === "fashion" && p.subdomainId === "jackets"));
  state.selectedSubdomains = [];
  assert.deepEqual(filterDeck(products, state), []);
  state.selectedDomains = [];
  assert.deepEqual(filterDeck(products, state), []);
});
test("liked and rejected products leave the deck", () => {
  const state = session();
  state.savedByDomain.fashion = [products[0].id];
  state.rejectedIds = [products[1].id];
  assert.equal(filterDeck(products, state).length, products.length - 2);
});
test("swipes distinguish left, right, upward diagonals, and short gestures", () => {
  assert.equal(swipeAction(-200, 0), "reject");
  assert.equal(swipeAction(200, 0), "like");
  assert.equal(swipeAction(100, -200), "super");
  assert.equal(swipeAction(200, -120), "like");
  assert.equal(swipeAction(40, -40), "cancel");
  assert.equal(swipeAction(0, 200), "cancel");
});
test("catalog IDs and categories are valid and every retailer link searches the product", () => {
  assert.equal(new Set(products.map(p => p.id)).size, products.length);
  for (const p of products) {
    assert.ok(domains.find(d => d.id === p.domainId)?.subdomains.some(s => s.id === p.subdomainId));
    assert.ok(p.offers.length > 1);
    assert.equal(lowestOffer(p).price, Math.min(...p.offers.filter(o => o.inStock).map(o => o.price)));
    for (const offer of p.offers) {
      const url = new URL(offer.url);
      assert.equal(url.protocol, "https:");
      assert.ok([...url.searchParams.values()].some(v => v.includes(p.name)));
    }
  }
});
