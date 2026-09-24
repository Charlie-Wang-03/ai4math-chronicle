import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const canonicalBase = 'https://charlie-wang-03.github.io/ai4math-chronicle/';

const readJson = async (relativePath) =>
  JSON.parse(await readFile(path.join(root, relativePath), 'utf8'));

test('generated discovery index routes every Event to bilingual pages and per-Event JSON', async () => {
  const collection = await readJson('public/data/events.json');
  const index = await readJson('public/data/events/index.json');

  assert.equal(index.schema_version, 1);
  assert.equal(index.events.length, collection.events.length);

  for (const event of collection.events) {
    const entry = index.events.find((candidate) => candidate.id === event.id);
    assert.ok(entry, `missing discovery-index entry for ${event.id}`);
    assert.equal(entry.slug, event.slug);
    assert.equal(entry.last_updated, event.dates.last_updated);
    assert.equal(entry.significance, event.significance.tier);
    assert.equal(entry.verification.status, event.verification.status);
    assert.equal(entry.urls.en, `${canonicalBase}en/events/${event.slug}/`);
    assert.equal(entry.urls['zh-CN'], `${canonicalBase}zh-CN/events/${event.slug}/`);
    assert.equal(entry.urls.json, `${canonicalBase}data/events/${event.slug}.json`);

    const perEvent = await readJson(`public/data/events/${event.slug}.json`);
    assert.deepEqual(perEvent, event, `per-Event JSON drifted from canonical-derived collection for ${event.id}`);
  }
});

test('discovery-index primary-source hints are derived from canonical Event sources', async () => {
  const collection = await readJson('public/data/events.json');
  const index = await readJson('public/data/events/index.json');

  for (const event of collection.events) {
    const entry = index.events.find((candidate) => candidate.id === event.id);
    const expected = event.sources
      .filter((source) => source.primary || source.tier === 'S1')
      .map(({ title, url, tier, type }) => ({ title, url, tier, type }));
    assert.deepEqual(entry.primary_sources, expected);
  }
});
