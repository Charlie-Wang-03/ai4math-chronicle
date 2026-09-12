import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

const sectionIds = [
  'what-happened',
  'why-it-matters',
  'historical-context',
  'primary-evidence',
  'evidence-status',
  'contribution-verification',
  'technical-details',
  'sources-artifacts',
  'verification-history',
  'corrections',
];

test('Event Detail keeps a compact evidence-and-status summary without putting it before narrative insight', async () => {
  const detail = await read('src/components/EventDetailPage.astro');
  assert.match(detail, /class="event-section event-section-secondary event-at-a-glance"/);
  assert.match(detail, /presentationLabel\('significance'/);
  assert.match(detail, /presentationLabel\('verification'/);
  assert.match(detail, /presentationLabel\('evidence_level'/);
  assert.match(detail, /presentationLabel\('ai_role'/);
  assert.match(detail, /presentationLabel\('formal_assurance'/);

  const what = detail.indexOf('id="what-happened"');
  const why = detail.indexOf('id="why-it-matters"');
  const history = detail.indexOf('id="historical-context"');
  const evidence = detail.indexOf('id="primary-evidence"');
  const trust = detail.indexOf('id="evidence-status"');
  assert.ok(what < why && why < history && history < evidence && evidence < trust, 'primary reading flow should be insight-first before trust taxonomy');
});

test('Event Detail section navigation targets every visible record section', async () => {
  const detail = await read('src/components/EventDetailPage.astro');
  assert.match(detail, /class="event-section-nav"/);
  for (const id of sectionIds) {
    assert.ok(detail.includes(`id="${id}"`), `missing visible section id: ${id}`);
    assert.ok(detail.includes(`'${id}'`), `missing navigation target: ${id}`);
  }
});

test('historical context is part of the Start here flow rather than deep metadata', async () => {
  const detail = await read('src/components/EventDetailPage.astro');
  const primaryBlock = detail.match(/const navPrimary = \[[\s\S]*?\] as const;/)?.[0];
  const secondaryBlock = detail.match(/const navSecondary = \[[\s\S]*?\] as const;/)?.[0];
  assert.ok(primaryBlock, 'primary Event Detail navigation should exist');
  assert.ok(secondaryBlock, 'secondary Event Detail navigation should exist');
  assert.match(primaryBlock, /'historical-context'/);
  assert.doesNotMatch(secondaryBlock, /historical-context/);
  assert.match(detail, /event\.relationships\.predecessors/);
  assert.match(detail, /event\.relationships\.successors/);
  assert.match(detail, /event\.relationships\.related/);
});

test('Event Detail keeps canonical sections visible while differentiating reading priority', async () => {
  const detail = await read('src/components/EventDetailPage.astro');
  assert.match(detail, /event-section event-section-primary/);
  assert.match(detail, /event-section event-section-secondary/);
  assert.doesNotMatch(detail, /<details[^>]*class="event-section/);
  assert.doesNotMatch(detail, /hidden[^>]*event-section/);
});

test('Event Detail navigation is sticky on wide screens and returns to document flow responsively', async () => {
  const css = await read('src/styles/event-detail.css');
  assert.match(css, /\.event-section-nav-inner\s*\{[\s\S]*?position:\s*sticky/);
  assert.match(css, /@media \(max-width: 960px\)[\s\S]*?\.event-section-nav-inner\s*\{[\s\S]*?position:\s*static/);
  assert.match(css, /scroll-margin-top:\s*84px/);
});
