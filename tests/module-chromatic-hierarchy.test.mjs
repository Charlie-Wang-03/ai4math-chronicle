import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('R1.2B chromatic hierarchy loads after semantic information modules and before ornament', async () => {
  const entry = await read('src/styles/information-design.css');
  const imports = [...entry.matchAll(/@import '\.\/(.*?)';/g)].map((match) => match[1]);

  const colorIndex = imports.indexOf('r1-color-system.css');
  const referenceIndex = imports.indexOf('r1-reference.css');
  const chromaIndex = imports.indexOf('r1-module-chroma.css');
  const ornamentIndex = imports.indexOf('r1-ornament.css');

  assert.ok(colorIndex >= 0);
  assert.ok(referenceIndex >= 0);
  assert.ok(chromaIndex > referenceIndex);
  assert.ok(chromaIndex > colorIndex);
  assert.ok(ornamentIndex > chromaIndex);
});

test('module chroma keeps semantic color subordinate to the Paper-led editorial system', async () => {
  const css = await read('src/styles/r1-module-chroma.css');

  for (const fragment of [
    '--module-radius: 8px',
    'body .timeline-year-label',
    'color: var(--archive)',
    'body .event-card.H1',
    'body .event-card.H2',
    'body .event-card.H3',
    'var(--milestone-soft)',
    'var(--research-soft)',
    'body #historical-context',
    'var(--archive)',
    'body #primary-evidence',
    'var(--evidence)',
    'body .explore-filter-panel',
    'var(--context-research)',
    'body #evidence-status',
    'var(--rule-strong)',
  ]) {
    assert.ok(css.includes(fragment), `missing R1.2B contract fragment: ${fragment}`);
  }

  assert.doesNotMatch(
    css,
    /background-color:\s*var\(--context-(?:research|archive|milestone|evidence)\)/,
    'domain context colors should not render as full chromatic slabs',
  );
});

test('Timeline H1 H2 H3 share one geometry and use graduated gradients for significance', async () => {
  const css = await read('src/styles/r1-module-chroma.css');

  assert.match(css, /body \.event-card\.H1,[\s\S]*?body \.event-card\.H2,[\s\S]*?body \.event-card\.H3\s*\{[\s\S]*?border-radius:\s*0;[\s\S]*?padding-inline:\s*0/);
  assert.match(css, /body \.event-card\.H1\s*\{[\s\S]*?background:\s*linear-gradient\(/);
  assert.match(css, /body \.event-card\.H2\s*\{[\s\S]*?background:\s*linear-gradient\(/);
  assert.match(css, /body \.event-card\.H3\s*\{[\s\S]*?background:\s*linear-gradient\(/);
  assert.doesNotMatch(css, /body \.event-card\.H1\s*\{[\s\S]*?border-left:\s*[1-9]/);
});

test('Event Detail uses explicit section rules instead of boxed primary and trust modules', async () => {
  const css = await read('src/styles/r1-module-chroma.css');

  assert.match(css, /body \.event-detail-main \.event-section \+ \.event-section\s*\{[\s\S]*?border-top:\s*1px solid var\(--rule-strong\)/);
  assert.match(css, /body #why-it-matters,[\s\S]*?body #evidence-status\s*\{[\s\S]*?border-radius:\s*0;[\s\S]*?background:\s*transparent/);
  assert.match(css, /body #why-it-matters\s*\{[\s\S]*?border-top:\s*2px solid/);
  assert.match(css, /body #historical-context\s*\{[\s\S]*?border-top:\s*2px solid/);
  assert.match(css, /body #primary-evidence\s*\{[\s\S]*?border-top:\s*2px solid/);
  assert.match(css, /body #evidence-status\s*\{[\s\S]*?border-top:\s*2px solid var\(--rule-strong\)/);
});

test('Event Detail preserves breathing room between the two primary trust cells without boxing them', async () => {
  const css = await read('src/styles/r1-module-chroma.css');

  assert.match(css, /body #evidence-status \.event-glance-primary:first-of-type\s*\{[\s\S]*?margin-right:\s*\.35rem[\s\S]*?border-radius:\s*0[\s\S]*?background:\s*transparent/);
  assert.match(css, /body #evidence-status \.event-glance-primary:nth-of-type\(2\)\s*\{[\s\S]*?margin-left:\s*\.35rem[\s\S]*?border-radius:\s*0[\s\S]*?background:\s*transparent/);
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