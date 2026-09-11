import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { normalizeComparableUrl, parseRssAtom, validateDate } from '../scripts/feed-scan.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FIXTURE = fs.readFileSync(path.join(HERE, 'fixtures', 'rss-sample.xml'), 'utf8');

test('parseRssAtom extracts RSS metadata and normalizes URLs', () => {
  const items = parseRssAtom(FIXTURE);
  assert.equal(items.length, 2);
  assert.deepEqual(items[0], {
    title: 'Example & Mathematical Discovery',
    url: 'https://example.org/research/math-discovery',
    published: 'Tue, 08 Sep 2026 12:30:00 GMT',
    published_day: '2026-09-08',
    author: 'Example Lab',
    categories: ['Research', 'Mathematics'],
    summary: 'A research announcement.',
  });
});

test('normalizeComparableUrl removes tracking query, fragment and trailing slash', () => {
  assert.equal(
    normalizeComparableUrl('http://Example.org/research/item/?utm_source=rss#section'),
    'https://example.org/research/item',
  );
  assert.equal(normalizeComparableUrl('not a URL'), null);
});

test('feed date validation rejects malformed dates', () => {
  assert.equal(validateDate('2026-09-11', 'date'), '2026-09-11');
  assert.throws(() => validateDate('2026-09-31', 'date'));
});
