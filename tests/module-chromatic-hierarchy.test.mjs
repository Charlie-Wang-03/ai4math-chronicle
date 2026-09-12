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

test('module chroma maps domain meaning to restrained Paper-led surfaces', async () => {
  const css = await read('src/styles/r1-module-chroma.css');

  for (const fragment of [
    '--module-radius: 8px',
    'body .timeline-year-label',
    'color: var(--archive)',
    'body .event-card.H1',
    'var(--context-milestone)',
    'body #historical-context',
    'var(--context-archive)',
    'body #primary-evidence',
    'var(--context-evidence)',
    'body .explore-filter-panel',
    'var(--context-research)',
    'body #evidence-status',
    'var(--context-neutral)',
  ]) {
    assert.ok(css.includes(fragment), `missing R1.2B contract fragment: ${fragment}`);
  }

  assert.doesNotMatch(
    css,
    /background-color:\s*var\(--context-(?:research|archive|milestone|evidence)\)/,
    'domain context colors should be mixed back toward Paper instead of rendered as full chromatic slabs',
  );
});

test('high-emphasis modules provide inset and restrained radius instead of edge-hugging bands', async () => {
  const css = await read('src/styles/r1-module-chroma.css');

  assert.match(css, /body \.event-card\.H1\s*\{[\s\S]*?border-radius:\s*var\(--module-radius-compact\)[\s\S]*?padding-inline:\s*\.75rem/);
  assert.match(css, /body #historical-context,[\s\S]*?body #primary-evidence\s*\{[\s\S]*?padding:\s*var\(--module-inset-y\) var\(--module-inset-x\)/);
  assert.match(css, /body \.trust-model-overview\s*\{[\s\S]*?gap:\s*\.75rem[\s\S]*?background:\s*transparent/);
  assert.match(css, /body \.trust-dimension,[\s\S]*?border-radius:\s*var\(--module-radius\)[\s\S]*?padding:\s*1rem/);
});

test('H1 stays in the same Timeline record family instead of becoming a dominant category card', async () => {
  const css = await read('src/styles/r1-module-chroma.css');

  assert.match(css, /body \.event-card\.H1\s*\{[\s\S]*?border-left:\s*2px solid[\s\S]*?background-color:\s*color-mix\(in srgb, var\(--paper\) 94%, var\(--context-milestone\)\)/);
  assert.match(css, /body \.event-card\.H1:hover\s*\{[\s\S]*?background-color:\s*color-mix\(in srgb, var\(--paper\) 90%, var\(--context-milestone\)\)/);
});

test('Event Detail keeps breathing room between major evidence and trust modules', async () => {
  const css = await read('src/styles/r1-module-chroma.css');

  assert.match(css, /body #evidence-status\s*\{[\s\S]*?margin-top:\s*\.75rem/);
  assert.match(css, /body #evidence-status \.event-glance-primary:first-of-type\s*\{[\s\S]*?margin-right:\s*\.35rem/);
  assert.match(css, /body #evidence-status \.event-glance-primary:nth-of-type\(2\)\s*\{[\s\S]*?margin-left:\s*\.35rem/);
});

test('trust reference keeps significance, evidence, verification, and assurance visually distinct', async () => {
  const css = await read('src/styles/r1-module-chroma.css');

  assert.match(css, /\.trust-dimension:nth-of-type\(1\)[\s\S]*?var\(--context-milestone\)/);
  assert.match(css, /\.trust-dimension:nth-of-type\(2\)[\s\S]*?var\(--context-evidence\)/);
  assert.match(css, /\.trust-dimension:nth-of-type\(3\)[\s\S]*?var\(--context-neutral\)/);
  assert.match(css, /\.trust-dimension:nth-of-type\(4\)[\s\S]*?var\(--context-research\)/);
});

test('editorial module mapping does not substitute status colors or elevation for domain semantics', async () => {
  const css = await read('src/styles/r1-module-chroma.css');

  assert.doesNotMatch(css, /var\(--status-(?:good|warn|danger)\)/);
  assert.doesNotMatch(css, /box-shadow:\s*[^;]*(?:8px|12px|16px|24px)/);
});