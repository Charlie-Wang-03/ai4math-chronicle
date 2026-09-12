import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('R1.2B chromatic hierarchy loads after semantic information modules', async () => {
  const entry = await read('src/styles/information-design.css');
  const imports = [...entry.matchAll(/@import '\.\/(.*?)';/g)].map((match) => match[1]);

  assert.equal(imports.at(-1), 'r1-module-chroma.css');
  assert.ok(imports.indexOf('r1-color-system.css') < imports.indexOf('r1-module-chroma.css'));
});

test('module chroma maps domain meaning to restrained semantic tokens', async () => {
  const css = await read('src/styles/r1-module-chroma.css');

  for (const fragment of [
    'body .timeline-year-label',
    'color: var(--archive)',
    'body .event-card.H1',
    'background-color: var(--context-milestone)',
    'body #historical-context',
    'background-color: var(--context-archive)',
    'body #primary-evidence',
    'background-color: var(--context-evidence)',
    'body .explore-filter-panel',
    'background-color: var(--context-research)',
    'body #evidence-status',
    'background-color: var(--context-neutral)',
  ]) {
    assert.ok(css.includes(fragment), `missing R1.2B contract fragment: ${fragment}`);
  }
});

test('trust reference keeps significance, evidence, verification, and assurance visually distinct', async () => {
  const css = await read('src/styles/r1-module-chroma.css');

  assert.match(css, /\.trust-dimension:nth-of-type\(1\)[\s\S]*?var\(--context-milestone\)/);
  assert.match(css, /\.trust-dimension:nth-of-type\(2\)[\s\S]*?var\(--context-evidence\)/);
  assert.match(css, /\.trust-dimension:nth-of-type\(3\)[\s\S]*?var\(--context-neutral\)/);
  assert.match(css, /\.trust-dimension:nth-of-type\(4\)[\s\S]*?var\(--context-research\)/);
});

test('editorial module mapping does not substitute status colors for domain semantics', async () => {
  const css = await read('src/styles/r1-module-chroma.css');

  assert.doesNotMatch(css, /var\(--status-(?:good|warn|danger)\)/);
  assert.doesNotMatch(css, /box-shadow:\s*[^;]*(?:8px|12px|16px|24px)/);
});
