import { expect, test } from '@playwright/test';

const projectPath = (path = '') => `/ai4math-chronicle/${path.replace(/^\//, '')}`;
const locales = ['en', 'zh-CN'];
const themes = ['light', 'dark'];

async function expectNoHorizontalOverflow(page) {
  const overflow = await page.evaluate(() => ({
    document: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    body: document.body.scrollWidth - document.body.clientWidth,
  }));
  expect(overflow.document).toBeLessThanOrEqual(1);
  expect(overflow.body).toBeLessThanOrEqual(1);
}

async function applyTheme(page, theme) {
  await page.evaluate((value) => {
    document.documentElement.dataset.theme = value;
    document.documentElement.style.colorScheme = value;
  }, theme);
  await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
}

async function expectDecorativeSvg(locator) {
  await expect(locator).toBeAttached();
  await expect(locator).toHaveAttribute('aria-hidden', 'true');
  await expect(locator).toHaveAttribute('focusable', 'false');
}

async function expectOrnamentPresentation(
  page,
  locator,
  { minVisibleWidthRatio, maxVisibleWidthRatio, minOpacity, maxOpacity },
) {
  await expect(locator).toBeVisible();
  expect(await locator.evaluate((element) => getComputedStyle(element).pointerEvents)).toBe('none');

  const opacity = parseFloat(await locator.evaluate((element) => getComputedStyle(element).opacity));
  expect(opacity).toBeGreaterThanOrEqual(minOpacity);
  expect(opacity).toBeLessThanOrEqual(maxOpacity);

  const viewport = page.viewportSize();
  const box = await locator.boundingBox();
  expect(viewport).not.toBeNull();
  expect(box).not.toBeNull();

  const visibleLeft = Math.max(0, box.x);
  const visibleRight = Math.min(viewport.width, box.x + box.width);
  const visibleWidth = Math.max(0, visibleRight - visibleLeft);
  const visibleRatio = visibleWidth / viewport.width;
  expect(visibleRatio).toBeGreaterThanOrEqual(minVisibleWidthRatio);
  expect(visibleRatio).toBeLessThanOrEqual(maxVisibleWidthRatio);
}

const anchorCases = [
  {
    route: '',
    anchor: 'home',
    motifs: ['chronicle-graph', 'construction-geometry'],
    desktopWidth: [0.35, 0.55],
    desktopOpacity: { light: [0.65, 0.78], dark: [0.55, 0.67] },
    mobileWidth: [0.65, 0.9],
    hiddenMobileMotif: 'construction-geometry',
    taskCheck: async (page) => {
      const firstEvent = await page.locator('[data-event-card]').first().boundingBox();
      expect(firstEvent).not.toBeNull();
      expect(firstEvent.y).toBeLessThan(844);
    },
  },
  {
    route: 'methodology/',
    anchor: 'methodology',
    motifs: ['construction-geometry', 'marginalia'],
    desktopWidth: [0.2, 0.36],
    desktopOpacity: { light: [0.6, 0.72], dark: [0.52, 0.64] },
    mobileWidth: [0.48, 0.72],
    hiddenMobileMotif: 'construction-geometry',
    taskCheck: async (page) => {
      const overview = await page.locator('.trust-model-overview').boundingBox();
      expect(overview).not.toBeNull();
      expect(overview.y).toBeLessThan(844);
    },
  },
  {
    route: 'about/',
    anchor: 'about',
    motifs: ['chronicle-graph', 'marginalia'],
    desktopWidth: [0.24, 0.42],
    desktopOpacity: { light: [0.58, 0.7], dark: [0.52, 0.64] },
    mobileWidth: [0.48, 0.74],
    hiddenMobileMotif: 'chronicle-graph',
    taskCheck: async (page) => {
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    },
  },
];

test('R1.2C renders the approved motif families on both bilingual identity-anchor routes', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });

  for (const locale of locales) {
    for (const surface of anchorCases) {
      await page.goto(projectPath(`${locale}/${surface.route}`));
      const anchor = page.locator(`[data-ornament-anchor="${surface.anchor}"]`);
      await expect(anchor).toBeVisible();
      for (const motif of surface.motifs) {
        await expectDecorativeSvg(anchor.locator(`[data-ornament="${motif}"]`));
      }
      await expectNoHorizontalOverflow(page);
    }
  }
});

test('R1.2C-D freezes the accepted production surface profile', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });

  await page.goto(projectPath('en/'));
  await expect(page.locator('[data-ornament-transition="chronology"]')).toHaveCount(0);
  await expect(page.locator('[data-event-card] [data-ornament]')).toHaveCount(0);

  const footer = page.locator('[data-ornament-anchor="footer"]');
  await expect(footer).toBeVisible();
  await expectDecorativeSvg(footer.locator('[data-ornament="chronicle-graph"]'));

  await page.goto(projectPath('en/explore/'));
  await expect(page.locator('main [data-ornament]')).toHaveCount(0);
  await expect(page.locator('[data-ornament-anchor="explore-empty"]')).toHaveCount(0);

  await page.goto(projectPath('en/data/'));
  await expect(page.locator('main [data-ornament]')).toHaveCount(0);

  await page.goto(projectPath('en/'));
  await page.locator('[data-event-card] h3 a').first().click();
  await expect(page.locator('main [data-ornament]')).toHaveCount(0);
});

test('R1.2C-D preserves accepted desktop composition across locale and theme', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });

  for (const locale of locales) {
    for (const theme of themes) {
      for (const surface of anchorCases) {
        await page.goto(projectPath(`${locale}/${surface.route}`));
        await applyTheme(page, theme);
        const anchor = page.locator(`[data-ornament-anchor="${surface.anchor}"]`);
        const [minOpacity, maxOpacity] = surface.desktopOpacity[theme];
        await expectOrnamentPresentation(page, anchor, {
          minVisibleWidthRatio: surface.desktopWidth[0],
          maxVisibleWidthRatio: surface.desktopWidth[1],
          minOpacity,
          maxOpacity,
        });
        await expectNoHorizontalOverflow(page);
      }

      const footer = page.locator('[data-ornament-anchor="footer"]');
      await expectOrnamentPresentation(page, footer, {
        minVisibleWidthRatio: 0.2,
        maxVisibleWidthRatio: 0.35,
        minOpacity: theme === 'dark' ? 0.1 : 0.12,
        maxOpacity: theme === 'dark' ? 0.2 : 0.22,
      });
      expect(await footer.locator('xpath=following-sibling::*[1]').evaluate((element) => getComputedStyle(element).zIndex)).toBe('1');
    }
  }
});

test('R1.2C-D preserves accepted mobile composition across locale and theme', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const locale of locales) {
    for (const theme of themes) {
      for (const surface of anchorCases) {
        await page.goto(projectPath(`${locale}/${surface.route}`));
        await applyTheme(page, theme);
        const anchor = page.locator(`[data-ornament-anchor="${surface.anchor}"]`);
        await expectOrnamentPresentation(page, anchor, {
          minVisibleWidthRatio: surface.mobileWidth[0],
          maxVisibleWidthRatio: surface.mobileWidth[1],
          minOpacity: 0.32,
          maxOpacity: 0.42,
        });
        await expect(anchor.locator(`[data-ornament="${surface.hiddenMobileMotif}"]`)).toBeHidden();
        await surface.taskCheck(page);
        await expectNoHorizontalOverflow(page);
      }

      const footer = page.locator('[data-ornament-anchor="footer"]');
      await expectOrnamentPresentation(page, footer, {
        minVisibleWidthRatio: 0.5,
        maxVisibleWidthRatio: 0.75,
        minOpacity: 0.1,
        maxOpacity: 0.17,
      });
    }
  }
});

test('R1.2C ornament remains suppressible in forced-colors and print media', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(projectPath('en/'));

  const home = page.locator('[data-ornament-anchor="home"]');
  const footer = page.locator('[data-ornament-anchor="footer"]');
  await expect(home).toBeVisible();
  await expect(footer).toBeVisible();

  await page.emulateMedia({ forcedColors: 'active' });
  await expect(home).toBeHidden();
  await expect(footer).toBeHidden();

  await page.emulateMedia({ forcedColors: 'none', media: 'print' });
  await expect(home).toBeHidden();
  await expect(footer).toBeHidden();
});

test('R1.2C uses the semantic palette without glow or filter effects in dark mode', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(projectPath('en/'));
  await applyTheme(page, 'dark');

  for (const anchor of [
    page.locator('[data-ornament-anchor="home"]'),
    page.locator('[data-ornament-anchor="footer"]'),
  ]) {
    await expect(anchor).toBeVisible();
    expect(await anchor.evaluate((element) => getComputedStyle(element).filter)).toBe('none');
  }

  const researchNode = page.locator('[data-ornament-anchor="home"] .ornament-node-research').first();
  const researchColor = await researchNode.evaluate((element) => getComputedStyle(element).fill);
  const semanticResearch = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--research').trim());
  expect(researchColor).not.toBe('none');
  expect(semanticResearch).toBeTruthy();
});
