import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('Event Article metadata uses Chronicle publication semantics and stable identity', async () => {
  const source = await read('src/components/EventDetailPage.astro');

  assert.match(source, /datePublished:\s*event\.dates\.added_to_chronicle/);
  assert.doesNotMatch(source, /datePublished:\s*event\.dates\.event/);
  assert.match(source, /dateModified:\s*event\.dates\.last_updated/);
  assert.match(source, /identifier:\s*event\.id/);
  assert.match(source, /inLanguage:\s*locale/);
  assert.match(source, /publisher:\s*chronicleOrganization/);
  assert.match(source, /'@type': 'WebSite'/);
  assert.match(source, /ogType="article"/);
  assert.match(source, /publishedTime=\{event\.dates\.added_to_chronicle\}/);
  assert.match(source, /modifiedTime=\{event\.dates\.last_updated\}/);
});

test('Base layout keeps HTML locale metadata reciprocal and page-specific', async () => {
  const source = await read('src/layouts/BaseLayout.astro');

  assert.match(source, /<link rel="alternate" hreflang=\{locale\} href=\{absolute\(canonicalPath\)\} \/>/);
  assert.match(source, /<link rel="alternate" hreflang=\{other\} href=\{absolute\(alternate\)\} \/>/);
  assert.match(source, /const englishPath = locale === 'en' \? canonicalPath : alternate/);
  assert.match(source, /hreflang="x-default" href=\{absolute\(englishPath\)\}/);
  assert.doesNotMatch(source, /hreflang="x-default" href=\{absolute\(localePath\('en'\)\)\}/);
  assert.match(source, /<meta property="og:locale:alternate" content=\{ogAlternateLocale\} \/>/);
});

test('Event pages can emit article-specific Open Graph dates', async () => {
  const source = await read('src/layouts/BaseLayout.astro');

  assert.match(source, /ogType\?: 'website' \| 'article'/);
  assert.match(source, /ogType = 'website'/);
  assert.match(source, /<meta property="og:type" content=\{ogType\} \/>/);
  assert.match(source, /article:published_time/);
  assert.match(source, /article:modified_time/);
});

test('Data & Feeds publishes Dataset and DataDownload structured data', async () => {
  const source = await read('src/components/DataPage.astro');

  assert.match(source, /'@type': 'Dataset'/);
  assert.match(source, /'@type': 'DataDownload'/);
  assert.match(source, /contentUrl:\s*eventsJsonUrl/);
  assert.match(source, /contentUrl:\s*eventsNdjsonUrl/);
  assert.match(source, /contentUrl:\s*schemaUrl/);
  assert.match(source, /license:\s*'https:\/\/creativecommons\.org\/licenses\/by\/4\.0\/'/);
  assert.match(source, /jsonLd=\{datasetJsonLd\}/);
});

test('sitemap publishes reciprocal bilingual hreflang metadata', async () => {
  const source = await read('src/pages/sitemap.xml.ts');

  assert.match(source, /const locales = \['en', 'zh-CN'\] as const/);
  assert.match(source, /xmlns:xhtml="http:\/\/www\.w3\.org\/1999\/xhtml"/);
  assert.match(source, /\{ hreflang: 'x-default'/);
  assert.match(source, /<xhtml:link rel="alternate" hreflang="\$\{hreflang\}" href="\$\{href\}" \/>/);
});

test('llms discovery index exposes canonical, trust, and update entry points', async () => {
  const source = await read('public/llms.txt');

  for (const expected of [
    'Events JSON',
    'Events NDJSON',
    'Event JSON Schema',
    'Canonical YAML on GitHub',
    'Standards & Methodology',
    'Sitemap',
    'RSS',
    'CITATION.cff',
    'Guidance for AI systems',
  ]) {
    assert.ok(source.includes(expected), `llms.txt should include ${expected}`);
  }
  assert.match(source, /ultimate mathematical correctness/);
});
