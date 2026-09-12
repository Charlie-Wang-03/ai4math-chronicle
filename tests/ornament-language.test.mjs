import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('R1.2C ornament language is explicit and discoverable', async () => {
  const [ornament, state, agents] = await Promise.all([
    read('docs/ornament-language.md'),
    read('docs/project-state.md'),
    read('AGENTS.md'),
  ]);

  for (const motif of [
    'Chronicle Graph',
    'Mathematical Construction Geometry',
    'Scholarly Marginalia',
  ]) {
    assert.match(ornament, new RegExp(motif));
  }

  for (const strength of ['O0', 'O1', 'O2', 'O3']) {
    assert.match(ornament, new RegExp(`\\*\\*${strength}\\*\\*`));
  }

  assert.match(ornament, /Home hero/);
  assert.match(ornament, /Standards & Methodology top/);
  assert.match(ornament, /About top/);
  assert.match(ornament, /Ornament is an \*\*identity layer\*\*, not an information layer/);
  assert.match(ornament, /R1\.2C-A does not authorize decorative animation/);
  assert.match(ornament, /robot heads, brains, humanoid AI mascots/);
  assert.match(ornament, /random equations or mathematical-symbol wallpaper/);
  assert.match(ornament, /R1\.2C-B — Identity anchor surfaces/);

  assert.match(state, /\[ornament-language\.md\]\(\.\/ornament-language\.md\)/);
  assert.match(agents, /\[docs\/ornament-language\.md\]\(docs\/ornament-language\.md\)/);
});
