import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('primary header navigation exposes browse, search, trust, and About surfaces while keeping data contextual', async () => {
  const source = await read('src/layouts/BaseLayout.astro');
  const nav = source.match(/<nav class="nav"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(nav, 'primary nav should be present');
  assert.match(nav, /localePath\(locale, 'explore'\)/);
  assert.match(nav, /localePath\(locale, 'methodology'\)/);
  assert.match(nav, /localePath\(locale, 'about'\)/);
  assert.doesNotMatch(nav, /localePath\(locale, 'use'\)/);
  assert.doesNotMatch(nav, /localePath\(locale, 'data'\)/);
  assert.match(source, /explore: '搜索与探索'/);
  assert.match(source, /explore: 'Search & Explore'/);
  assert.match(source, /methodology: '标准与方法'/);
  assert.match(source, /methodology: 'Standards & Methodology'/);
  assert.match(source, /about: '关于'/);
  assert.match(source, /about: 'About'/);
});

test('homepage keeps a compact timeline-first prelude and routes richer tasks outward', async () => {
  const source = await read('src/components/TimelinePage.astro');
  const heroActions = source.match(/<nav class="hero-actions"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(heroActions, 'hero actions should be present');
  assert.match(heroActions, /localePath\(locale, 'explore'\)/);
  assert.match(heroActions, /localePath\(locale, 'methodology'\)/);
  assert.doesNotMatch(heroActions, /localePath\(locale, 'data'\)/);
  assert.match(source, /搜索与探索事件/);
  assert.match(source, /Search & explore events/);
  assert.match(source, /class="timeline-summary"/);
  assert.match(source, /class="timeline-trust"/);
  assert.doesNotMatch(source, /credibility-strip/);
  assert.doesNotMatch(source, /section-heading/);
  assert.doesNotMatch(source, /participation-section/);
  assert.doesNotMatch(source, /useEyebrow/);
  assert.match(source, /<EventCollection events=\{events\} locale=\{locale\} mode="timeline" \/>/);
});

test('About owns project orientation plus the former citation, reuse, and contribution responsibilities', async () => {
  const source = await read('src/components/AboutPage.astro');
  const enRoute = await read('src/pages/en/about.astro');
  const zhRoute = await read('src/pages/zh-CN/about.astro');
  const legacyEn = await read('src/pages/en/use.astro');
  const legacyZh = await read('src/pages/zh-CN/use.astro');
  const sitemap = await read('src/pages/sitemap.xml.ts');

  assert.match(source, /'关于 — AI4Math 大事记'/);
  assert.match(source, /'About — AI4Math Chronicle'/);
  assert.match(source, /timelineTitle: '时间线：浏览历史'/);
  assert.match(source, /exploreTitle: '搜索与探索：定位事件'/);
  assert.match(source, /methodologyTitle: '标准与方法：理解可信度'/);
  assert.match(source, /citationTitle: '引用与研究'/);
  assert.match(source, /dataTitle: '数据与 AI 工作流'/);
  assert.match(source, /contributeTitle: '参与共建'/);
  assert.match(source, /CITATION\.cff/);
  assert.match(source, /localePath\(locale, 'data'\)/);
  assert.match(source, /source-lead\.yml/);
  assert.match(source, /event-proposal\.yml/);
  assert.match(source, /correction\.yml/);
  assert.match(source, /bug-report\.yml/);
  assert.match(enRoute, /<AboutPage locale="en" \/>/);
  assert.match(zhRoute, /<AboutPage locale="zh-CN" \/>/);
  assert.match(legacyEn, /<AboutPage locale="en" \/>/);
  assert.match(legacyZh, /<AboutPage locale="zh-CN" \/>/);
  assert.match(sitemap, /'about'/);
  assert.doesNotMatch(sitemap, /'use'/);
});

test('standards page owns trust interpretation and routes project orientation and actions to About', async () => {
  const methodology = await read('src/components/MethodologyPage.astro');
  const data = await read('src/components/DataPage.astro');

  assert.match(methodology, /'标准与方法 — AI4Math 大事记'/);
  assert.match(methodology, /重要性（Significance）≠ 验证状态（Verification）/);
  assert.match(methodology, /machine_checked ≠ independently_verified ≠ mathematical correctness/);
  assert.match(methodology, /localePath\(locale, 'about'\)/);
  assert.doesNotMatch(methodology, /correction\.yml/);
  assert.doesNotMatch(methodology, /event-proposal\.yml/);

  assert.match(data, /'数据与订阅 — AI4Math 大事记'/);
  assert.match(data, /'Data & Feeds — AI4Math Chronicle'/);
  assert.match(data, /llms\.txt/);
  assert.match(data, /CITATION\.cff/);
  assert.match(data, /LICENSE-CONTENT\.md/);
});

test('ratified R0 amendment remains discoverable from semantic project state', async () => {
  const state = await read('docs/project-state.md');
  const agents = await read('AGENTS.md');
  assert.match(state, /product-spec-v0\.1-r0-amendment\.md/);
  assert.match(state, /Timeline = browse history/);
  assert.match(state, /Search & Explore = find events/);
  assert.match(state, /About \/ 关于 is a top-level project surface/);
  assert.match(agents, /ratified amendment named by/);
});
