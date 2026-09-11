import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

const sectionIds = [
  'what-happened',
  'why-it-matters',
  'primary-evidence',
  'contribution-verification',
  'technical-details',
  'sources-artifacts',
  'historical-relationships',
  'verification-history',
  'corrections',
];

test('Event Detail exposes a compact at-a-glance status summary', async () => {
  const detail = await read('src/components/EventDetailPage.astro');
  assert.match(detail, /class="event-at-a-glance"/);
  assert.match(detail, /presentationLabel\('significance'/);
  assert.match(detail, /presentationLabel\('verification'/);
  assert.match(detail, /presentationLabel\('evidence_level'/);
  assert.match(detail, /presentationLabel\('ai_role'/);
  assert.match(detail, /presentationLabel\('formal_assurance'/);
});

test('Event Detail section navigation targets every visible record section', async () => {
  const detail = await read('src/components/EventDetailPage.astro');
  assert.match(detail, /class="event-section-nav"/);
  for (const id of sectionIds) {
    assert.ok(detail.includes(`id="${id}"`), `missing visible section id: ${id}`);
    assert.ok(detail.includes(`'${id}'`), `missing navigation target: ${id}`);
  }
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
