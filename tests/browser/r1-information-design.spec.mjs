import { expect, test } from '@playwright/test';

const projectPath = (path = '') => `/ai4math-chronicle/${path.replace(/^\//, '')}`;
const worstCaseSlug = 'openai-navier-stokes-solution-claim';

async function expectStartsInFirstViewport(locator, viewportHeight = 844) {
  const box = await locator.boundingBox();
  expect(box, 'expected element to have a rendered bounding box').not.toBeNull();
  expect(box.y, 'primary task should begin within the first mobile viewport').toBeLessThan(viewportHeight);
}

async function firstEventHref(page, locale = 'en') {
  await page.goto(projectPath(`${locale}/`));
  const href = await page.locator('[data-event-card] h3 a').first().getAttribute('href');
  expect(href).toBeTruthy();
  return href;
}

test('R1A keeps core bilingual mobile tasks inside the first viewport budget', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const locale of ['en', 'zh-CN']) {
    const eventHref = await firstEventHref(page, locale);
    await expectStartsInFirstViewport(page.locator('[data-event-card]').first());

    await page.goto(projectPath(`${locale}/explore/`));
    await expectStartsInFirstViewport(page.getByRole('searchbox', { name: locale === 'zh-CN' ? '搜索' : 'Search' }));

    await page.goto(eventHref);
    await expectStartsInFirstViewport(page.locator('#what-happened'));
  }
});

test('R1.1 protects the longest bilingual Event from information-budget regression', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const [locale, leadLimit] of [['en', 300], ['zh-CN', 180]]) {
    await page.goto(projectPath(`${locale}/events/${worstCaseSlug}/`));

    const lead = page.locator('.event-detail-header .lede');
    const fullSummary = page.locator('#what-happened .event-summary-detail');
    await expect(lead).toBeVisible();
    await expect(fullSummary).toBeVisible();
    await expectStartsInFirstViewport(page.locator('#what-happened'));

    const leadText = (await lead.textContent())?.trim() ?? '';
    const fullText = (await fullSummary.textContent())?.trim() ?? '';
    expect(leadText.length).toBeLessThanOrEqual(leadLimit);
    expect(fullText.length).toBeGreaterThan(leadText.length);

    await expect(page.locator('.breadcrumb-current')).toBeHidden();
    const primaryNav = page.locator('.event-section-nav-group').first().locator('ul');
    expect(await primaryNav.evaluate((element) => getComputedStyle(element).gridTemplateColumns)).not.toBe('none');
    expect(await primaryNav.evaluate((element) => getComputedStyle(element).overflowX)).not.toBe('auto');
  }
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

test('R1C exposes chronology as visible year chapters without losing Event scanning', async ({ page }) => {
  await page.goto(projectPath('en/'));

  const yearLabels = page.locator('.timeline-year-label');
  await expect(yearLabels.first()).toBeVisible();
  expect(await yearLabels.count()).toBeGreaterThan(1);
  await expect(yearLabels.first()).toHaveText(/^20\d{2}$/);

  const firstCard = page.locator('.timeline-item [data-event-card]').first();
  await expect(firstCard).toBeVisible();
  const sourceLayout = await firstCard.locator('.source-shortcuts').evaluate((element) => getComputedStyle(element).gridTemplateColumns);
  expect(sourceLayout).not.toBe('none');
});

test('R1D makes the four-dimensional trust model a scannable semantic reference near the top', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(projectPath('en/methodology/'));

  const overview = page.locator('.trust-model-overview');
  await expect(overview).toBeVisible();
  await expectStartsInFirstViewport(overview);
  await expect(overview.getByRole('heading', { level: 2, name: 'Four dimensions of the Chronicle trust model' })).toBeAttached();

  const dimensions = page.locator('[data-trust-dimension]');
  await expect(dimensions).toHaveCount(4);
  await expect(dimensions.nth(0).getByRole('heading', { level: 3 })).toContainText('How important');
  await expect(dimensions.nth(1)).toContainText('Evidence');
  await expect(dimensions.nth(2)).toContainText('Verification');
  await expect(dimensions.nth(3)).toContainText('Formal assurance');
});
