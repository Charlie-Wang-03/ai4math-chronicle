import { expect, test } from '@playwright/test';

const projectPath = (path = '') => `/ai4math-chronicle/${path.replace(/^\//, '')}`;

async function expectStartsInFirstViewport(locator, viewportHeight = 844) {
  const box = await locator.boundingBox();
  expect(box, 'expected element to have a rendered bounding box').not.toBeNull();
  expect(box.y, 'primary task should begin within the first mobile viewport').toBeLessThan(viewportHeight);
}

test('R1A keeps core mobile tasks inside the first viewport budget', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto(projectPath('en/'));
  const firstEventLink = page.locator('[data-event-card] h3 a').first();
  await expectStartsInFirstViewport(page.locator('[data-event-card]').first());
  const eventHref = await firstEventLink.getAttribute('href');
  expect(eventHref).toBeTruthy();

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
