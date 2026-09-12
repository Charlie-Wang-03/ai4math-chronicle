import { expect, test } from '@playwright/test';

const projectPath = (path = '') => `/ai4math-chronicle/${path.replace(/^\//, '')}`;

async function expectNoHorizontalOverflow(page) {
  const widths = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(widths.scrollWidth).toBeLessThanOrEqual(widths.clientWidth + 1);
}

test('mobile header is compact, keyboard-operable, and restores focus on Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(projectPath('en/'));

  const toggle = page.getByRole('button', { name: 'Menu' });
  const nav = page.getByRole('navigation', { name: 'Primary navigation' });

  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(nav).toBeHidden();

  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(nav).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Search & Explore' })).toHaveAttribute('href', /\/en\/explore\/$/);
  await expect(nav.getByRole('link', { name: 'About' })).toHaveAttribute('href', /\/en\/about\/$/);

  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(nav).toBeHidden();
  await expect(toggle).toBeFocused();
  await expectNoHorizontalOverflow(page);
});

test('Explore is mobile-native and its multi-select is keyboard-operable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(projectPath('en/explore/'));

  const table = page.locator('table[data-explore-list]');
  const firstRow = table.locator('tbody tr[data-event-item]').first();
  await expect(table).toHaveCount(1);
  await expect(firstRow).toBeVisible();
  await expectNoHorizontalOverflow(page);

  const tableMinWidth = await table.evaluate((element) => getComputedStyle(element).minWidth);
  const rowDisplay = await firstRow.evaluate((element) => getComputedStyle(element).display);
  expect(tableMinWidth).toBe('0px');
  expect(rowDisplay).toBe('grid');

  const search = page.getByRole('searchbox', { name: 'Search' });
  const yearFilter = page.locator('[data-multi-filter][data-filter="year"]');
  const yearSummary = yearFilter.locator('summary');
  const firstOption = yearFilter.locator('input[data-filter-option]').first();

  await search.focus();
  await page.keyboard.press('Tab');
  await expect(yearSummary).toBeFocused();

  const focusStyle = await yearSummary.evaluate((element) => {
    const style = getComputedStyle(element);
    return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth };
  });
  expect(focusStyle.outlineStyle).not.toBe('none');
  expect(focusStyle.outlineWidth).not.toBe('0px');

  await page.keyboard.press('Enter');
  await expect(yearFilter.locator('details')).toHaveAttribute('open', '');
  await page.keyboard.press('Tab');
  await expect(firstOption).toBeFocused();
  await page.keyboard.press('Space');
  await expect(firstOption).toBeChecked();
  await expect(page.locator('[data-active-filters]')).toBeVisible();
});

test('Explore defaults text queries to relevance while preserving an explicit user sort', async ({ page }) => {
  await page.goto(projectPath('en/explore/'));

  const search = page.getByRole('searchbox', { name: 'Search' });
  const sort = page.getByLabel('Sort');
  await expect(sort).toHaveValue('newest');

  await search.fill('Lean');
  await expect(sort).toHaveValue('relevance');
  await expect(page).not.toHaveURL(/sort=/);

  await sort.selectOption('newest');
  await expect(sort).toHaveValue('newest');
  await expect(page).toHaveURL(/sort=newest/);

  await search.fill('proof');
  await expect(sort).toHaveValue('newest');
  await expect(page).toHaveURL(/sort=newest/);
});

test('Explore exposes an explicit zero-results recovery path', async ({ page }) => {
  await page.goto(projectPath('en/explore/'));

  const emptyState = page.locator('[data-empty-state]');
  await expect(emptyState).toBeHidden();

  await page.getByRole('searchbox', { name: 'Search' }).fill('zzzz-no-ai4math-event-should-match-zzzz');
  await expect(emptyState).toBeVisible({ timeout: 10_000 });
  await expect(emptyState.getByText('No events match')).toBeVisible();

  const reset = emptyState.getByRole('link', { name: 'Clear all conditions' });
  await expect(reset).toHaveAttribute('href', /\/ai4math-chronicle\/en\/explore\/$/);
  await reset.click();
  await expect(emptyState).toBeHidden();
  await expect(page.locator('[data-event-item]:not(.hidden)').first()).toBeVisible();
});

test('language switch preserves the bilingual route contract', async ({ page }) => {
  await page.goto(projectPath('en/'));
  await page.getByRole('link', { name: '简体中文' }).click();

  await expect(page).toHaveURL(/\/ai4math-chronicle\/zh-CN\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(page.getByRole('navigation', { name: '主导航' })).toBeVisible();
});

test('theme preference cycles accessibly and persists across reloads', async ({ page }) => {
  await page.goto(projectPath('en/'));

  const root = page.locator('html');
  const theme = page.getByRole('button', { name: 'Theme: System' });
  await expect(root).toHaveAttribute('data-theme-preference', 'system');

  await theme.click();
  await expect(root).toHaveAttribute('data-theme-preference', 'light');
  await expect(page.getByRole('button', { name: 'Theme: Light' })).toBeVisible();

  await page.getByRole('button', { name: 'Theme: Light' }).click();
  await expect(root).toHaveAttribute('data-theme-preference', 'dark');
  await expect(page.getByRole('button', { name: 'Theme: Dark' })).toBeVisible();

  await page.reload();
  await expect(root).toHaveAttribute('data-theme-preference', 'dark');
  await expect(page.getByRole('button', { name: 'Theme: Dark' })).toBeVisible();
});

test('core reader landmarks and insight-first Event Detail navigation survive real browser rendering', async ({ page }) => {
  await page.goto(projectPath('en/'));

  const skip = page.getByRole('link', { name: 'Skip to main content' });
  await page.keyboard.press('Tab');
  await expect(skip).toBeFocused();
  await expect(page.locator('main#main-content')).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);

  const firstEvent = page.locator('[data-event-card] h3 a').first();
  await expect(firstEvent).toBeVisible();
  await firstEvent.click();

  await expect(page.getByRole('heading', { name: 'Evidence & status at a glance' })).toBeVisible();
  const sectionNav = page.getByRole('navigation', { name: 'On this page' });
  await expect(sectionNav).toBeVisible();
  await expect(sectionNav.getByRole('link', { name: 'What happened?' })).toHaveAttribute('href', '#what-happened');
  await expect(sectionNav.getByRole('link', { name: 'Historical context' })).toHaveAttribute('href', '#historical-context');
  await expect(page.locator('#what-happened')).toBeVisible();
  await expect(page.locator('#historical-context')).toBeVisible();
  await expect(page.locator('#evidence-status')).toBeVisible();
  await expect(page.locator('#verification-history')).toBeVisible();

  const order = await page.locator('.event-detail-main').evaluate((root) => {
    const ids = ['what-happened', 'why-it-matters', 'historical-context', 'primary-evidence', 'evidence-status'];
    return ids.map((id) => [...root.children].findIndex((element) => element.id === id));
  });
  expect(order).toEqual([0, 1, 2, 3, 4]);
});
