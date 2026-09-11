import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('primary header navigation exposes discovery, trust, and use surfaces while keeping data contextual', async () => {
  const source = await read('src/layouts/BaseLayout.astro');
  const nav = source.match(/<nav class="nav"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(nav, 'primary nav should be present');
  assert.match(nav, /localePath\(locale, 'explore'\)/);
  assert.match(nav, /localePath\(locale, 'methodology'\)/);
  assert.match(nav, /localePath\(locale, 'use'\)/);
  assert.doesNotMatch(nav, /localePath\(locale, 'data'\)/);
  assert.match(source, /methodology: '标准与方法'/);
  assert.match(source, /methodology: 'Standards & Methodology'/);
  assert.match(source, /use: '引用、复用与共建'/);
  assert.match(source, /use: 'Cite, Reuse & Contribute'/);
});

test('homepage keeps the timeline focused and no longer duplicates the use and contribution hub', async () => {
  const source = await read('src/components/TimelinePage.astro');
  const heroActions = source.match(/<nav class="hero-actions"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(heroActions, 'hero actions should be present');
  assert.match(heroActions, /localePath\(locale, 'explore'\)/);
  assert.match(heroActions, /localePath\(locale, 'methodology'\)/);
  assert.doesNotMatch(heroActions, /localePath\(locale, 'data'\)/);
  assert.doesNotMatch(source, /participation-section/);
  assert.doesNotMatch(source, /useEyebrow/);
});

test('use page owns citation, data reuse, and contribution paths', async () => {
  const source = await read('src/components/UsePage.astro');
  const enRoute = await read('src/pages/en/use.astro');
  const zhRoute = await read('src/pages/zh-CN/use.astro');
  const sitemap = await read('src/pages/sitemap.xml.ts');

  assert.match(source, /'引用、复用与共建 — AI4Math 大事记'/);
  assert.match(source, /'Cite, Reuse & Contribute — AI4Math Chronicle'/);
  assert.match(source, /citationTitle: '引用与研究'/);
  assert.match(source, /dataTitle: '数据与 AI 工作流'/);
  assert.match(source, /contributeTitle: '纠错与共建'/);
  assert.match(source, /CITATION\.cff/);
  assert.match(source, /localePath\(locale, 'data'\)/);
  assert.match(source, /source-lead\.yml/);
  assert.match(source, /event-proposal\.yml/);
  assert.match(source, /correction\.yml/);
  assert.match(source, /bug-report\.yml/);
  assert.match(enRoute, /<UsePage locale="en" \/>/);
  assert.match(zhRoute, /<UsePage locale="zh-CN" \/>/);
  assert.match(sitemap, /'use'/);
});

test('reader-facing standards and data pages keep their approved positioning', async () => {
  const methodology = await read('src/components/MethodologyPage.astro');
  const data = await read('src/components/DataPage.astro');

  assert.match(methodology, /'标准与方法 — AI4Math 大事记'/);
  assert.match(methodology, /重要性（Significance）≠ 验证状态（Verification）/);
  assert.match(methodology, /machine_checked ≠ independently_verified ≠ mathematical correctness/);
  assert.match(methodology, /correction\.yml/);
  assert.match(methodology, /event-proposal\.yml/);

  assert.match(data, /'数据与订阅 — AI4Math 大事记'/);
  assert.match(data, /'Data & Feeds — AI4Math Chronicle'/);
  assert.match(data, /llms\.txt/);
  assert.match(data, /CITATION\.cff/);
  assert.match(data, /LICENSE-CONTENT\.md/);
});
