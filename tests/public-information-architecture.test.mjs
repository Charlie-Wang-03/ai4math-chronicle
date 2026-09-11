import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('primary header navigation keeps discovery and trust surfaces ahead of utility data', async () => {
  const source = await read('src/layouts/BaseLayout.astro');
  const nav = source.match(/<nav class="nav"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(nav, 'primary nav should be present');
  assert.match(nav, /localePath\(locale, 'explore'\)/);
  assert.match(nav, /localePath\(locale, 'methodology'\)/);
  assert.doesNotMatch(nav, /localePath\(locale, 'data'\)/);
  assert.match(source, /methodology: '标准与方法'/);
  assert.match(source, /methodology: 'Standards & Methodology'/);
});

test('homepage hero and closing section reflect the approved product hierarchy', async () => {
  const source = await read('src/components/TimelinePage.astro');
  const heroActions = source.match(/<nav class="hero-actions"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(heroActions, 'hero actions should be present');
  assert.match(heroActions, /localePath\(locale, 'explore'\)/);
  assert.match(heroActions, /localePath\(locale, 'methodology'\)/);
  assert.doesNotMatch(heroActions, /localePath\(locale, 'data'\)/);
  assert.match(source, /useEyebrow: '引用、复用与共建'/);
  assert.match(source, /citationTitle: '引用与研究'/);
  assert.match(source, /aiTitle: '数据与 AI 工作流'/);
  assert.match(source, /contributorTitle: '纠错与共建'/);
});

test('reader-facing standards and data pages use the approved positioning', async () => {
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
