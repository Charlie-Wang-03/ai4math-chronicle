import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  arxivIdFromUrl,
  buildArxivUrl,
  loadChannels,
  normalizeArxivId,
  parseArxivAtom,
  validateDate,
} from '../scripts/source-scan.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FIXTURE = fs.readFileSync(path.join(HERE, 'fixtures', 'arxiv-sample.xml'), 'utf8');

test('parseArxivAtom extracts stable metadata and normalizes versions', () => {
  const entries = parseArxivAtom(FIXTURE);
  assert.equal(entries.length, 2);
  assert.deepEqual(entries[0], {
    arxiv_id: '2609.01234',
    title: 'Example & Verified Mathematical Reasoning',
    authors: ['Alice Example', 'Bob Example'],
    published: '2026-09-09T08:00:00Z',
    updated: '2026-09-10T12:30:00Z',
    summary: 'A compact example for parser tests <with entities> and normalized whitespace.',
    primary_category: 'cs.AI',
    categories: ['cs.AI', 'math.LO'],
    url: 'https://arxiv.org/abs/2609.01234v2',
    pdf_url: 'https://arxiv.org/pdf/2609.01234v2',
  });
  assert.equal(entries[1].arxiv_id, 'math/0301234');
  assert.equal(entries[1].pdf_url, 'https://arxiv.org/pdf/math/0301234');
});

test('arXiv identifier helpers cover abs/pdf URLs and version suffixes', () => {
  assert.equal(normalizeArxivId('2609.01234v3'), '2609.01234');
  assert.equal(arxivIdFromUrl('https://arxiv.org/abs/2609.01234v3'), '2609.01234');
  assert.equal(arxivIdFromUrl('https://arxiv.org/pdf/math/0301234v2.pdf'), 'math/0301234');
  assert.equal(arxivIdFromUrl('https://example.com/paper'), null);
});

test('buildArxivUrl fixes the date window and deterministic sort', () => {
  const url = buildArxivUrl({ id: 'test', query: 'all:"mathematical reasoning"', max_results: 25 }, '2026-09-01', '2026-09-11');
  assert.equal(url.origin + url.pathname, 'https://export.arxiv.org/api/query');
  assert.equal(url.searchParams.get('start'), '0');
  assert.equal(url.searchParams.get('max_results'), '25');
  assert.equal(url.searchParams.get('sortBy'), 'submittedDate');
  assert.equal(url.searchParams.get('sortOrder'), 'descending');
  assert.match(url.searchParams.get('search_query'), /submittedDate:\[202609010000 TO 202609112359\]/);
});

test('validateDate rejects malformed and impossible dates', () => {
  assert.equal(validateDate('2026-09-11', 'date'), '2026-09-11');
  assert.throws(() => validateDate('2026/09/11', 'date'));
  assert.throws(() => validateDate('2026-02-30', 'date'));
});

test('source channel registry has unique, actionable channel definitions', () => {
  const { config } = loadChannels();
  const allowedTiers = new Set(['S1', 'S2', 'S3', 'S4', 'S5']);
  const ids = config.channels.map((channel) => channel.id);

  assert.equal(new Set(ids).size, ids.length, 'channel IDs must be unique');
  assert.ok(config.channels.some((channel) => channel.enabled && channel.mode === 'machine'), 'at least one enabled machine channel is required');

  for (const channel of config.channels) {
    assert.match(channel.id, /^[a-z0-9][a-z0-9-]*$/, `invalid channel ID: ${channel.id}`);
    assert.ok(['machine', 'manual'].includes(channel.mode), `invalid mode for ${channel.id}`);
    assert.ok(allowedTiers.has(channel.default_source_tier), `invalid source tier for ${channel.id}`);
    assert.ok(typeof channel.purpose === 'string' && channel.purpose.length > 0, `missing purpose for ${channel.id}`);

    if (channel.mode === 'machine') {
      assert.ok(['arxiv_api', 'rss_atom'].includes(channel.adapter), `unsupported machine adapter for ${channel.id}`);
      assert.ok(Number.isInteger(channel.max_results) && channel.max_results > 0 && channel.max_results <= 2000, `invalid max_results for ${channel.id}`);
      if (channel.adapter === 'arxiv_api') {
        assert.ok(typeof channel.query === 'string' && channel.query.trim().length > 0, `missing query for ${channel.id}`);
      } else {
        assert.doesNotThrow(() => {
          const url = new URL(channel.url);
          assert.equal(url.protocol, 'https:');
        }, `invalid feed URL for ${channel.id}`);
      }
    } else {
      assert.equal(channel.adapter, 'direct_url', `unsupported manual adapter for ${channel.id}`);
      assert.doesNotThrow(() => {
        const url = new URL(channel.url);
        assert.equal(url.protocol, 'https:');
      }, `invalid direct URL for ${channel.id}`);
    }
  }
});
