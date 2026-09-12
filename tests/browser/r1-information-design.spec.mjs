import { expect, test } from '@playwright/test';

const projectPath = (path = '') => `/ai4math-chronicle/${path.replace(/^\//, '')}`;

async function expectStartsInFirstViewport(locator, viewportHeight = 844) {
  const box = await locator.boundingBox();
  expect(box, 'expected element to have a rendered bounding box').not.toBeNull();
  expect(box.y, 'primary task should begin within the first mobile viewport').toBeLessThan(viewportHeight);
}

async function firstEventHref(page) {
  await page.goto(projectPath('en/'));
  const href = await page.locator('[data-event-card] h3 a').first().getAttribute('href');
  expect(href).toBeTruthy();
  return href;
}

test('R1A keeps core mobile tasks inside the first viewport budget', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  const eventHref = await firstEventHref(page);
  await expectStartsInFirstViewport(page.locator('[data-event-card]').first());

  await page.goto(projectPath('en/explore/'));
  await expectStartsInFirstViewport(page.getByRole('searchbox', { name: 'Search' }));

  await page.goto(eventHref);
  await expectStartsInFirstViewport(page.locator('#what-happened'));
});

test('R1A preserves language-aware editorial typography hooks', async ({ page }) => {
  await page.goto(projectPath('zh-CN/'));
  const heading = page.getByRole('heading', { level: 1 });
  const family = await heading.evaluate((element) => getComputedStyle(element).fontFamily);
  expect(family).toContain('Noto Serif SC');
});

test('R1B gives Event semantics distinct lineage, trust, and contribution hierarchy', async ({ page }) => {
  const eventHref = await firstEventHref(page);
  await page.goto(eventHref);

  const relationships = page.locator('#historical-context .relationships');
  await expect(relationships).toBeVisible();
  expect(await relationships.evaluate((element) => getComputedStyle(element).display)).toBe('grid');

  const glanceItems = page.locator('#evidence-status .event-glance-item');
  await expect(glanceItems).toHaveCount(5);
  const first = await glanceItems.nth(0).boundingBox();
  const third = await glanceItems.nth(2).boundingBox();
  expect(first).not.toBeNull();
  expect(third).not.toBeNull();
  expect(third.y).toBeGreaterThan(first.y);

  const contribution = page.locator('#contribution-verification .fact-grid .fact').nth(2);
  const gridColumnEnd = await contribution.evaluate((element) => getComputedStyle(element).gridColumnEnd);
  expect(gridColumnEnd).toBe('-1');
});
