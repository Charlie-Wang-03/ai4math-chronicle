import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const ROOT = path.resolve(import.meta.dirname, '..');
const read = (relative) => fs.readFileSync(path.join(ROOT, relative), 'utf8');

test('event pages expose the Pagefind facets used by Timeline and Explore', () => {
  const source = read('src/components/EventDetailPage.astro');
  for (const facet of ['year', 'type', 'significance', 'verification', 'system', 'ai_role', 'interface', 'evidence', 'formal_assurance']) {
    assert.ok(source.includes(`${facet}:`), `missing Pagefind facet: ${facet}`);
  }
});

test('timeline combines Pagefind text search and structured filters without a second result list', () => {
  const source = read('src/components/EventCollection.astro');
  assert.match(source, /engine\.search\(query, \{ filters: pagefindFilters \}\)/);
  assert.match(source, /timeline-filter-panel/);
  assert.doesNotMatch(source, /search-results/);
  assert.match(source, /chronology is unchanged/);
});

test('Explore exposes advanced facets and serializes query state to the URL', () => {
  const source = read('src/components/ExploreDirectory.astro');
  for (const facet of ['significance', 'verification', 'system', 'ai_role', 'interface', 'evidence', 'formal_assurance']) {
    assert.ok(source.includes(`data-filter=\"${facet}\"`), `missing Explore filter: ${facet}`);
  }
  assert.match(source, /data-advanced/);
  assert.match(source, /new URLSearchParams\(window\.location\.search\)/);
  assert.match(source, /window\.history\.replaceState/);
  assert.match(source, /data-filter-chips/);
});

test('Explore event count is derived from canonical records instead of hard-coded copy', () => {
  const source = read('src/components/ExplorePage.astro');
  assert.match(source, /\$\{events\.length\}/);
  assert.doesNotMatch(source, /51 条 canonical event records|all 51 canonical event records/);
});
