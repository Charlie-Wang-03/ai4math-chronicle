import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('Event Card prioritizes title, significance, and verification over secondary taxonomy', async () => {
  const source = await read('src/components/EventCard.astro');
  const titleIndex = source.indexOf('<h3>');
  const statusIndex = source.indexOf('event-card-primary-status');

  assert.ok(titleIndex >= 0 && statusIndex > titleIndex, 'title should precede the primary status row');
  assert.match(source, /event-card-primary-status[\s\S]*presentationLabel\('significance'/);
  assert.match(source, /event-card-primary-status[\s\S]*presentationLabel\('verification'/);
  assert.match(source, /event-card-secondary-meta[\s\S]*presentationLabel\('evidence_level'/);
  assert.match(source, /typeLabels\.join\(' · '\)/);
  assert.doesNotMatch(source, /<span class="badge">\{presentationLabel\('evidence_level'/);
});

test('R1.1 derives collection and record-lede summaries without forking canonical Event data', async () => {
  const card = await read('src/components/EventCard.astro');
  const detail = await read('src/components/EventDetailPage.astro');
  const presentation = await read('src/lib/presentation.ts');

  assert.match(presentation, /type SummarySurface = 'collection' \| 'record_lede'/);
  assert.match(presentation, /collection: \{ en: 210, 'zh-CN': 120 \}/);
  assert.match(presentation, /record_lede: \{ en: 300, 'zh-CN': 180 \}/);
  assert.match(card, /presentationExcerpt\(text\(event\.summary, locale\), locale, 'collection'\)/);
  assert.doesNotMatch(card, /<p>\{text\(event\.summary, locale\)\}<\/p>/);
  assert.match(detail, /presentationExcerpt\(description, locale, 'record_lede'\)/);
  assert.match(detail, /summaryIsCondensed && <p class="event-summary-detail">\{description\}<\/p>/);
});

test('primary evidence shortcuts expose discriminating source identity', async () => {
  const source = await read('src/components/EventCard.astro');

  assert.match(source, /source-shortcuts-label/);
  assert.match(source, /source-shortcut-kind/);
  assert.match(source, /source-shortcut-title/);
  assert.match(source, /\{source\.title\}/);
  assert.match(source, /aria-label=\{`\$\{sourceType\}: \$\{source\.title\}`\}/);
  assert.match(source, /title=\{source\.title\}/);
});

test('Timeline and Explore expose explicit zero-result recovery states', async () => {
  const timeline = await read('src/components/EventCollection.astro');
  const explore = await read('src/components/ExploreDirectory.astro');
  const styles = await read('src/styles/reader-interface.css');

  assert.match(timeline, /data-empty-state/);
  assert.match(timeline, /No timeline events match/);
  assert.match(timeline, /恢复完整时间线/);
  assert.match(timeline, /href=\{href\(localePath\(locale\)\)\}/);

  assert.match(explore, /data-empty-state/);
  assert.match(explore, /No events match/);
  assert.match(explore, /Remove one of the active conditions above/);
  assert.match(explore, /清除全部条件/);
  assert.match(explore, /href=\{href\(localePath\(locale, 'explore'\)\)\}/);

  assert.match(styles, /:has\(\[data-event-item\]:not\(\.hidden\)\)/);
  assert.match(styles, /explore-table-wrap:not\(:has/);
  assert.match(styles, /\+ \.empty-state/);
});
