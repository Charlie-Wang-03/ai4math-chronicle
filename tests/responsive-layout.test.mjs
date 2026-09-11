import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('mobile header uses progressive disclosure without removing no-JS navigation', async () => {
  const layout = await read('src/layouts/BaseLayout.astro');
  const responsive = await read('src/styles/responsive.css');

  assert.match(layout, /document\.documentElement\.classList\.add\('js'\)/);
  assert.match(layout, /data-nav-toggle/);
  assert.match(layout, /aria-controls="primary-nav"/);
  assert.match(layout, /aria-expanded="false"/);
  assert.match(layout, /id="primary-nav" data-site-nav/);
  assert.match(layout, /matchMedia\('\(max-width: 760px\)'\)/);
  assert.match(layout, /event\.key === 'Escape'/);

  assert.match(responsive, /@media \(max-width: 760px\)/);
  assert.match(responsive, /\.js \.nav-toggle \{[\s\S]*display: inline-flex;/);
  assert.match(responsive, /\.js \.nav \{[\s\S]*display: none;/);
  assert.match(responsive, /\.js \.nav\[data-open='true'\] \{[\s\S]*display: grid;/);

  const mobileBlock = responsive.match(/@media \(max-width: 760px\) \{[\s\S]*?\n\}/)?.[0] ?? '';
  assert.doesNotMatch(mobileBlock, /\.nav-toggle \{[\s\S]*display: none;/);
});

test('Explore switches its single semantic result table to stacked mobile cards', async () => {
  const exploreCss = await read('src/styles/explore.css');
  const explore = await read('src/components/ExploreDirectory.astro');

  assert.match(explore, /<table class="explore-table" data-explore-list>/);
  assert.match(explore, /<thead>/);
  assert.match(explore, /<tbody>/);
  assert.doesNotMatch(explore, /explore-mobile-results/);

  assert.match(exploreCss, /@media \(max-width: 760px\)/);
  assert.match(exploreCss, /\.explore-table-wrap \{[\s\S]*overflow: visible;/);
  assert.match(exploreCss, /\.explore-table \{[\s\S]*min-width: 0;/);
  assert.match(exploreCss, /\.explore-table thead \{[\s\S]*clip-path: inset\(50%\);/);
  assert.match(exploreCss, /\.explore-table tbody tr \{[\s\S]*display: grid;/);
  assert.match(exploreCss, /@media \(max-width: 560px\)/);
});
