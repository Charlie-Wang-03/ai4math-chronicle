import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('schema supports the approved field-building taxonomy', async () => {
  const schema = JSON.parse(await read('schema/event.schema.json'));

  assert.ok(schema.properties.event_types.items.enum.includes('field_building'));
  assert.ok(schema.properties.mathematical_novelty.properties.type.enum.includes('not_applicable'));
  assert.ok(schema.properties.ai_role.properties.level.enum.includes('not_applicable'));
  assert.ok(schema.properties.interfaces.items.enum.includes('not_applicable'));
});

test('not_applicable is semantically restricted to field-building events', async () => {
  const validator = await read('scripts/validate-events.mjs');

  assert.match(validator, /usesNotApplicable/);
  assert.match(validator, /eventTypes\.includes\('field_building'\)/);
  assert.match(validator, /interfaces 'not_applicable' must be used alone/);
});

test('reader-facing surfaces expose field building as a canonical event type', async () => {
  const presentation = await read('src/lib/presentation.ts');
  const timeline = await read('src/components/EventCollection.astro');

  assert.match(presentation, /field_building: \{ en: 'Field building', 'zh-CN': '领域建构' \}/);
  assert.match(presentation, /not_applicable: \{ en: 'Not applicable', 'zh-CN': '不适用' \}/);
  assert.match(timeline, /'field_building'/);
});

test('owner-approved amendment documents the strict publication boundary', async () => {
  const amendment = await read('docs/product-spec-v0.1-field-building-amendment.md');

  assert.match(amendment, /Ratified owner-approved amendment/);
  assert.match(amendment, /Community statements/);
  assert.match(amendment, /Journals, conferences, and venues/);
  assert.match(amendment, /not_applicable/);
});
