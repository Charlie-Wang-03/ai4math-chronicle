import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('editorial visual layer is loaded globally through the theme bundle', async () => {
  const theme = await read('src/styles/theme.css');
  const editorial = await read('src/styles/editorial.css');

  assert.match(theme, /@import '\.\/editorial\.css';/);
  assert.match(editorial, /--font-editorial:/);
  assert.match(editorial, /body h1,[\s\S]*?body h2,[\s\S]*?body h3/);
});

test('Timeline records use rule-based editorial hierarchy instead of elevated rounded cards', async () => {
  const editorial = await read('src/styles/editorial.css');

  assert.match(editorial, /body \.event-card\s*\{[\s\S]*?border-top:\s*1px solid var\(--border-strong\)/);
  assert.match(editorial, /body \.event-card\s*\{[\s\S]*?border-radius:\s*0/);
  assert.match(editorial, /body \.event-card\s*\{[\s\S]*?box-shadow:\s*none/);
  assert.match(editorial, /\.timeline-item:has\(\.event-card\.H1\) \.timeline-dot/);
  assert.match(editorial, /body \.timeline-date\s*\{[\s\S]*?font-family:\s*var\(--font-metadata\)/);
});

test('evidence and query tooling retain distinct publication roles', async () => {
  const editorial = await read('src/styles/editorial.css');

  assert.match(editorial, /body \.source-shortcuts\s*\{[\s\S]*?border-left:\s*2px solid var\(--border-strong\)/);
  assert.match(editorial, /body \.explore-filter-panel\s*\{[\s\S]*?border-top:\s*2px solid var\(--text\)/);
  assert.match(editorial, /body \.facet-group\s*\{[\s\S]*?border-radius:\s*0/);
  assert.match(editorial, /body \.explore-table-wrap\s*\{[\s\S]*?border-radius:\s*0/);
});

test('multi-select controls follow the restrained editorial geometry', async () => {
  const filter = await read('src/components/MultiSelectFilter.astro');

  assert.match(filter, /\.multi-filter-menu > summary\s*\{[\s\S]*?border-radius:\s*3px/);
  assert.match(filter, /\.multi-filter-options\s*\{[\s\S]*?border-radius:\s*3px/);
  assert.match(filter, /\.multi-filter-option\s*\{[\s\S]*?border-radius:\s*2px/);
});
