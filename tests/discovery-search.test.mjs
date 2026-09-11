import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const ROOT = path.resolve(import.meta.dirname, '..');
const read = (relative) => fs.readFileSync(path.join(ROOT, relative), 'utf8');

const coreFacets = ['year', 'type', 'significance', 'verification', 'system', 'ai_role', 'interface', 'evidence', 'formal_assurance'];
const expandedFacets = ['novelty', 'organization', 'person', 'problem', 'method', 'source_type', 'artifact_kind', 'tag'];

test('event pages expose all Pagefind facets used by Timeline and Explore', () => {
  const source = read('src/components/EventDetailPage.astro');
  for (const facet of [...coreFacets, ...expandedFacets]) {
    assert.ok(source.includes(`${facet}:`), `missing Pagefind facet: ${facet}`);
  }
});

test('multi-select facet control uses checkbox options instead of native multi-select gestures', () => {
  const source = read('src/components/MultiSelectFilter.astro');
  assert.match(source, /data-multi-filter/);
  assert.match(source, /type="checkbox"/);
  assert.match(source, /data-filter-option/);
  assert.doesNotMatch(source, /<select/);
});

test('timeline combines text search with OR-within-facet multi-select filters without changing chronology', () => {
  const source = read('src/components/EventCollection.astro');
  assert.match(source, /MultiSelectFilter/);
  assert.match(source, /\[key, \{ any: values \}\]/);
  assert.match(source, /engine\.search\(query, \{ filters: pagefindFilters \}\)/);
  assert.match(source, /timeline-filter-panel/);
  assert.doesNotMatch(source, /search-results/);
  assert.match(source, /chronology is unchanged/);
  assert.match(source, /filters\.year\.includes\(year\)/);
});

test('Explore exposes multi-select advanced facets and repeatable URL query state', () => {
  const source = read('src/components/ExploreDirectory.astro');
  for (const facet of [...coreFacets.slice(2), ...expandedFacets]) {
    assert.ok(source.includes(`name="${facet}"`), `missing Explore filter: ${facet}`);
  }
  assert.match(source, /name="year"/);
  assert.match(source, /name="type"/);
  assert.match(source, /\[key, \{ any: values \}\]/);
  assert.match(source, /params\.getAll\(group\.dataset\.filter\)/);
  assert.match(source, /params\.append\(key, value\)/);
  assert.match(source, /data-advanced/);
  assert.match(source, /window\.history\.replaceState/);
  assert.match(source, /data-filter-chips/);
});

test('Explore advanced facets are organized into semantic groups', () => {
  const source = read('src/components/ExploreDirectory.astro');
  for (const group of ['event-attributes', 'ai-mathematics', 'actors-objects', 'evidence-verification']) {
    assert.ok(source.includes(`data-facet-group="${group}"`), `missing advanced facet group: ${group}`);
  }
  assert.match(source, /groupEvent: '事件属性'/);
  assert.match(source, /groupAiMath: 'AI 与数学'/);
  assert.match(source, /groupActors: '主体与对象'/);
  assert.match(source, /groupEvidence: '证据与验证'/);
  assert.match(source, /groupEvent: 'Event attributes'/);
  assert.match(source, /groupEvidence: 'Evidence & verification'/);
});

test('Explore event count is derived from canonical records instead of hard-coded copy', () => {
  const source = read('src/components/ExplorePage.astro');
  assert.match(source, /\$\{events\.length\}/);
  assert.doesNotMatch(source, /51 条 canonical event records|all 51 canonical event records/);
});
