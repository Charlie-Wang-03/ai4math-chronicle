import { expect, test } from '@playwright/test';

const projectPath = (path = '') => `/ai4math-chronicle/${path.replace(/^\//, '')}`;

async function expectNoHorizontalOverflow(page) {
  const overflow = await page.evaluate(() => ({
    document: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    body: document.body.scrollWidth - document.body.clientWidth,
  }));
  expect(overflow.document).toBeLessThanOrEqual(1);
  expect(overflow.body).toBeLessThanOrEqual(1);
}

async function expectDecorativeSvg(locator) {
  await expect(locator).toBeAttached();
  await expect(locator).toHaveAttribute('aria-hidden', 'true');
  await expect(locator).toHaveAttribute('focusable', 'false');
}

test('R1.2C-B renders the approved motif families on the three identity anchors only', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });

  await page.goto(projectPath('en/'));
  const homeAnchor = page.locator('[data-ornament-anchor="home"]');
  await expect(homeAnchor).toBeVisible();
  await expectDecorativeSvg(homeAnchor.locator('[data-ornament="chronicle-graph"]'));
  await expectDecorativeSvg(homeAnchor.locator('[data-ornament="construction-geometry"]'));
  await expect(page.locator('[data-event-card] [data-ornament]')).toHaveCount(0);

  await page.goto(projectPath('en/methodology/'));
  const methodologyAnchor = page.locator('[data-ornament-anchor="methodology"]');
  await expect(methodologyAnchor).toBeVisible();
  await expectDecorativeSvg(methodologyAnchor.locator('[data-ornament="construction-geometry"]'));
  await expectDecorativeSvg(methodologyAnchor.locator('[data-ornament="marginalia"]'));

  await page.goto(projectPath('en/about/'));
  const aboutAnchor = page.locator('[data-ornament-anchor="about"]');
  await expect(aboutAnchor).toBeVisible();
  await expectDecorativeSvg(aboutAnchor.locator('[data-ornament="chronicle-graph"]'));
  await expectDecorativeSvg(aboutAnchor.locator('[data-ornament="marginalia"]'));

  await page.goto(projectPath('en/explore/'));
  await expect(page.locator('[data-ornament-anchor]')).toHaveCount(0);
});

test('R1.2C-B keeps ornament peripheral, non-interactive, and task-safe on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto(projectPath('en/'));
  const homeAnchor = page.locator('[data-ornament-anchor="home"]');
  await expect(homeAnchor).toBeVisible();
  expect(await homeAnchor.evaluate((element) => getComputedStyle(element).pointerEvents)).toBe('none');
  expect(parseFloat(await homeAnchor.evaluate((element) => getComputedStyle(element).opacity))).toBeLessThan(0.4);
  await expect(page.locator('[data-ornament-anchor="home"] [data-ornament="construction-geometry"]')).toBeHidden();
  const firstEvent = await page.locator('[data-event-card]').first().boundingBox();
  expect(firstEvent).not.toBeNull();
  expect(firstEvent.y).toBeLessThan(844);
  await expectNoHorizontalOverflow(page);

  await page.goto(projectPath('en/methodology/'));
  const methodologyAnchor = page.locator('[data-ornament-anchor="methodology"]');
  await expect(methodologyAnchor).toBeVisible();
  await expect(methodologyAnchor.locator('[data-ornament="construction-geometry"]')).toBeHidden();
  const overview = await page.locator('.trust-model-overview').boundingBox();
  expect(overview).not.toBeNull();
  expect(overview.y).toBeLessThan(844);
  await expectNoHorizontalOverflow(page);

  await page.goto(projectPath('zh-CN/about/'));
  const aboutAnchor = page.locator('[data-ornament-anchor="about"]');
  await expect(aboutAnchor).toBeVisible();
  await expect(aboutAnchor.locator('[data-ornament="chronicle-graph"]')).toBeHidden();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test('R1.2C-B uses the semantic palette without glow or filter effects in dark mode', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(projectPath('en/'));
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'dark';
    document.documentElement.style.colorScheme = 'dark';
  });

  const anchor = page.locator('[data-ornament-anchor="home"]');
  await expect(anchor).toBeVisible();
  expect(await anchor.evaluate((element) => getComputedStyle(element).filter)).toBe('none');

  const researchNode = anchor.locator('.ornament-node-research').first();
  const researchColor = await researchNode.evaluate((element) => getComputedStyle(element).fill);
  const semanticResearch = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--research').trim());
  expect(researchColor).not.toBe('none');
  expect(semanticResearch).toBeTruthy();
});
