import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  INDEXNOW_ENDPOINT,
  INDEXNOW_KEY,
  INDEXNOW_KEY_FILE,
  INDEXNOW_KEY_LOCATION,
  SITE_HOST,
  buildIndexNowPayload,
  extractSitemapUrls,
} from '../scripts/notify-indexnow.mjs';

test('IndexNow key file is scoped beneath the GitHub Project Pages path', async () => {
  const keyFile = (await readFile(new URL(`../public/${INDEXNOW_KEY_FILE}`, import.meta.url), 'utf8')).trim();

  assert.equal(keyFile, INDEXNOW_KEY);
  assert.equal(INDEXNOW_ENDPOINT, 'https://api.indexnow.org/indexnow');
  assert.equal(SITE_HOST, 'charlie-wang-03.github.io');
  assert.equal(
    INDEXNOW_KEY_LOCATION,
    `https://charlie-wang-03.github.io/ai4math-chronicle/${INDEXNOW_KEY_FILE}`,
  );
});

test('IndexNow sitemap extraction keeps only canonical Project Pages URLs', () => {
  const xml = `<?xml version="1.0"?>
    <urlset>
      <url><loc>https://charlie-wang-03.github.io/ai4math-chronicle/en/</loc></url>
      <url><loc>https://charlie-wang-03.github.io/ai4math-chronicle/zh-CN/events/example/</loc></url>
      <url><loc>https://charlie-wang-03.github.io/other-project/</loc></url>
      <url><loc>https://example.com/ai4math-chronicle/en/</loc></url>
      <url><loc>https://charlie-wang-03.github.io/ai4math-chronicle/en/</loc></url>
    </urlset>`;

  assert.deepEqual(extractSitemapUrls(xml), [
    'https://charlie-wang-03.github.io/ai4math-chronicle/en/',
    'https://charlie-wang-03.github.io/ai4math-chronicle/zh-CN/events/example/',
  ]);
});

test('IndexNow sitemap extraction decodes XML entities exactly once', () => {
  const xml = `<urlset>
    <url><loc>https://charlie-wang-03.github.io/ai4math-chronicle/en/explore/?a=1&amp;b=2</loc></url>
    <url><loc>https://charlie-wang-03.github.io/ai4math-chronicle/en/explore/?literal=%26amp%3B</loc></url>
  </urlset>`;

  assert.deepEqual(extractSitemapUrls(xml), [
    'https://charlie-wang-03.github.io/ai4math-chronicle/en/explore/?a=1&b=2',
    'https://charlie-wang-03.github.io/ai4math-chronicle/en/explore/?literal=%26amp%3B',
  ]);
});

test('IndexNow payload uses explicit keyLocation and rejects invalid batch sizes', () => {
  const urlList = ['https://charlie-wang-03.github.io/ai4math-chronicle/en/'];
  assert.deepEqual(buildIndexNowPayload(urlList), {
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList,
  });

  assert.throws(() => buildIndexNowPayload([]), /at least one URL/);
  assert.throws(() => buildIndexNowPayload(Array.from({ length: 10_001 }, (_, index) => `https://example.com/${index}`)), /10,000/);
});

test('Pages workflow runs IndexNow only after deploy and treats it as best-effort discovery', async () => {
  const workflow = await readFile(new URL('../.github/workflows/deploy-pages.yml', import.meta.url), 'utf8');

  assert.match(workflow, /notify-indexnow:/);
  assert.match(workflow, /needs: deploy/);
  assert.match(workflow, /git diff --quiet HEAD\^ HEAD -- data public schema scripts src/);
  assert.match(workflow, /continue-on-error: true/);
  assert.match(workflow, /node scripts\/notify-indexnow\.mjs/);
});
