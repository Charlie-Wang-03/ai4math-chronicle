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

async function backgroundColor(locator) {
  return locator.evaluate((element) => getComputedStyle(element).backgroundColor);
}

async function backgroundImage(locator) {
  return locator.evaluate((element) => getComputedStyle(element).backgroundImage);
}

async function borderTopColor(locator) {
  return locator.evaluate((element) => getComputedStyle(element).borderTopColor);
}

async function color(locator) {
  return locator.evaluate((element) => getComputedStyle(element).color);
}

async function stylePx(locator, property) {
  return locator.evaluate((element, propertyName) => parseFloat(getComputedStyle(element)[propertyName]) || 0, property);
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

test('R1.2B restores graduated Timeline gradients and rule-led Event Detail hierarchy', async ({ page }) => {
  const eventHref = await firstEventHref(page);

  const yearLabel = page.locator('.timeline-year-label').first();
  const timelineTools = page.locator('.timeline-tools');
  const h1Card = page.locator('.event-card.H1').first();
  const h2Card = page.locator('.event-card.H2').first();
  const h3Card = page.locator('.event-card.H3').first();
  await expect(timelineTools).toBeVisible();
  await expect(h1Card).toBeVisible();
  await expect(h2Card).toBeVisible();
  await expect(h3Card).toBeVisible();

  const tierGradients = await Promise.all([h1Card, h2Card, h3Card].map((locator) => backgroundImage(locator)));
  for (const gradient of tierGradients) expect(gradient).toContain('linear-gradient');
  expect(new Set(tierGradients).size).toBe(3);
  expect(await color(yearLabel)).not.toBe(await color(page.locator('body')));
  expect(await stylePx(timelineTools, 'paddingLeft')).toBeGreaterThanOrEqual(12);
  expect(await stylePx(timelineTools, 'borderTopLeftRadius')).toBeGreaterThanOrEqual(6);
  for (const card of [h1Card, h2Card, h3Card]) {
    expect(await stylePx(card, 'paddingLeft')).toBe(0);
    expect(await stylePx(card, 'borderTopLeftRadius')).toBe(0);
    expect(await stylePx(card, 'borderLeftWidth')).toBe(0);
  }

  await page.goto(eventHref);
  const why = page.locator('#why-it-matters');
  const historical = page.locator('#historical-context');
  const primaryEvidence = page.locator('#primary-evidence');
  const trust = page.locator('#evidence-status');
  for (const section of [why, historical, primaryEvidence, trust]) {
    expect(await backgroundColor(section)).toBe('rgba(0, 0, 0, 0)');
    expect(await stylePx(section, 'borderTopLeftRadius')).toBe(0);
    expect(await stylePx(section, 'paddingLeft')).toBe(0);
    expect(await stylePx(section, 'borderLeftWidth')).toBe(0);
    expect(await stylePx(section, 'borderTopWidth')).toBeGreaterThanOrEqual(2);
  }
  expect(new Set(await Promise.all([why, historical, primaryEvidence].map((section) => borderTopColor(section)))).size).toBe(3);

  const primaryTrustCells = trust.locator('.event-glance-primary');
  const firstTrustBox = await primaryTrustCells.nth(0).boundingBox();
  const secondTrustBox = await primaryTrustCells.nth(1).boundingBox();
  expect(firstTrustBox).not.toBeNull();
  expect(secondTrustBox).not.toBeNull();
  expect(secondTrustBox.x - (firstTrustBox.x + firstTrustBox.width)).toBeGreaterThanOrEqual(8);
  expect(await backgroundColor(primaryTrustCells.nth(0))).toBe('rgba(0, 0, 0, 0)');
  expect(await backgroundColor(primaryTrustCells.nth(1))).toBe('rgba(0, 0, 0, 0)');
  expect(await stylePx(primaryTrustCells.nth(0), 'borderTopLeftRadius')).toBe(0);
  expect(await stylePx(primaryTrustCells.nth(1), 'borderTopLeftRadius')).toBe(0);

  await page.goto(projectPath('en/explore/'));
  const filterPanel = page.locator('.explore-filter-panel');
  const resultsSurface = page.locator('.explore-table-wrap');
  expect(await backgroundColor(filterPanel)).not.toBe(await backgroundColor(resultsSurface));
  expect(await stylePx(filterPanel, 'borderTopLeftRadius')).toBeGreaterThanOrEqual(6);

  await page.goto(projectPath('en/methodology/'));
  const overview = page.locator('.trust-model-overview');
  const dimensions = page.locator('[data-trust-dimension]');
  const dimensionBackgrounds = await dimensions.evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).backgroundColor));
  expect(new Set(dimensionBackgrounds).size).toBe(4);
  expect(await stylePx(overview, 'columnGap')).toBeGreaterThanOrEqual(8);
  expect(await stylePx(dimensions.first(), 'paddingLeft')).toBeGreaterThanOrEqual(12);
  expect(await stylePx(dimensions.first(), 'borderTopLeftRadius')).toBeGreaterThanOrEqual(6);
});

test('R1.2B keeps gradient and rule semantics legible in dark mode', async ({ page }) => {
  await page.goto(projectPath('en/'));
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'dark';
    document.documentElement.style.colorScheme = 'dark';
  });

  const tierGradients = await Promise.all([
    page.locator('.event-card.H1').first(),
    page.locator('.event-card.H2').first(),
    page.locator('.event-card.H3').first(),
  ].map((locator) => backgroundImage(locator)));
  expect(new Set(tierGradients).size).toBe(3);

  await page.goto(projectPath(`en/events/${worstCaseSlug}/`));
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'dark';
    document.documentElement.style.colorScheme = 'dark';
  });
  const historical = page.locator('#historical-context');
  const evidence = page.locator('#primary-evidence');
  const trust = page.locator('#evidence-status');
  expect(await backgroundColor(historical)).toBe('rgba(0, 0, 0, 0)');
  expect(await backgroundColor(evidence)).toBe('rgba(0, 0, 0, 0)');
  expect(await backgroundColor(trust)).toBe('rgba(0, 0, 0, 0)');
  expect(await borderTopColor(historical)).not.toBe(await borderTopColor(evidence));
});