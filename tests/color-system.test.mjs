import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

function hexToRgb(hex) {
  const value = hex.replace('#', '');
  return [0, 2, 4].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16) / 255);
}

function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((channel) => (
    channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4
  ));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
}

function scope(css, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\}`));
  assert.ok(match, `missing ${selector} scope`);
  return match[1];
}

function token(block, name) {
  const match = block.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})\\s*;`));
  assert.ok(match, `missing --${name}`);
  return match[1].toLowerCase();
}

function assertPalette(block, mode) {
  const canvas = token(block, 'canvas');
  const paper = token(block, 'paper');
  const ink = token(block, 'ink');
  const muted = token(block, 'ink-muted');
  const research = token(block, 'research');
  const milestone = token(block, 'milestone');
  const archive = token(block, 'archive');

  assert.ok(contrast(canvas, paper) >= 1.15, `${mode}: Canvas and Paper need visible tonal separation`);
  assert.ok(contrast(ink, paper) >= 7, `${mode}: primary ink should retain AAA-like reading contrast`);
  assert.ok(contrast(muted, paper) >= 4.5, `${mode}: muted prose must remain readable`);
  assert.ok(contrast(research, paper) >= 4.5, `${mode}: research/link accent must remain readable`);
  assert.ok(contrast(milestone, paper) >= 4.5, `${mode}: milestone accent must remain readable`);
  assert.ok(contrast(archive, paper) >= 4.5, `${mode}: archive accent must remain readable`);
}

test('R1.2A color system loads before the semantic information modules', async () => {
  const entry = await read('src/styles/information-design.css');
  const imports = [...entry.matchAll(/@import '\.\/(.*?)';/g)].map((match) => match[1]);

  assert.equal(imports[0], 'r1-color-system.css');
  assert.ok(imports.includes('r1-foundations.css'));
  assert.ok(imports.includes('r1-event-modules.css'));
  assert.ok(imports.includes('r1-reference.css'));
});

test('light and dark palettes preserve surface separation and readable semantic accents', async () => {
  const css = await read('src/styles/r1-color-system.css');
  assertPalette(scope(css, 'html:root'), 'light');
  assertPalette(scope(css, "html:root[data-theme='dark']"), 'dark');
});

test('legacy interface variables are compatibility aliases, not a second palette', async () => {
  const css = await read('src/styles/r1-color-system.css');

  for (const alias of [
    '--bg: var(--canvas)',
    '--surface: var(--paper)',
    '--surface-2: var(--context-neutral)',
    '--text: var(--ink)',
    '--muted: var(--ink-muted)',
    '--accent: var(--research)',
    '--h1: var(--milestone)',
    '--good: var(--status-good)',
    '--warn: var(--status-warn)',
    '--danger: var(--status-danger)',
  ]) {
    assert.ok(css.includes(alias), `missing compatibility alias ${alias}`);
  }
});

test('archive and warning semantics remain independently named', async () => {
  const css = await read('src/styles/r1-color-system.css');

  assert.match(css, /--archive:\s*#[0-9a-fA-F]{6}/);
  assert.match(css, /--status-warn:\s*#[0-9a-fA-F]{6}/);
  assert.match(css, /Status colors remain separate from editorial\/brand meaning/);
});
