import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('R1.2C ornament language is explicit and discoverable', async () => {
  const [ornament, informationDesign, state, agents] = await Promise.all([
    read('docs/ornament-language.md'),
    read('docs/information-design.md'),
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

  assert.match(informationDesign, /ornament-language\.md/);
  assert.match(informationDesign, /identity layer, not an information layer/);
  assert.match(informationDesign, /Timeline significance gradients are semantic hierarchy rather than ornament/);
  assert.match(state, /ornament-language\.md/);
  assert.match(agents, /docs\/ornament-language\.md/);
});

test('R1.2C-B implements only the approved identity anchors with reusable decorative SVG', async () => {
  const [
    entry,
    ornamentCss,
    timeline,
    methodology,
    about,
    chronicleGraph,
    constructionGeometry,
    marginalia,
  ] = await Promise.all([
    read('src/styles/information-design.css'),
    read('src/styles/r1-ornament.css'),
    read('src/components/TimelinePage.astro'),
    read('src/components/MethodologyPage.astro'),
    read('src/components/AboutPage.astro'),
    read('src/components/ornament/ChronicleGraph.astro'),
    read('src/components/ornament/ConstructionGeometry.astro'),
    read('src/components/ornament/MarginaliaMark.astro'),
  ]);

  const imports = [...entry.matchAll(/@import '\.\/(.*?)';/g)].map((match) => match[1]);
  assert.equal(imports.at(-1), 'r1-ornament.css');

  assert.match(timeline, /data-ornament-anchor="home"/);
  assert.match(timeline, /<ChronicleGraph variant="hero" \/>/);
  assert.match(timeline, /<ConstructionGeometry variant="hero" \/>/);
  assert.ok(timeline.indexOf('data-ornament-anchor="home"') < timeline.indexOf('<EventCollection'));

  assert.match(methodology, /data-ornament-anchor="methodology"/);
  assert.match(methodology, /<ConstructionGeometry variant="compact" \/>/);
  assert.match(methodology, /<MarginaliaMark variant="reference" \/>/);

  assert.match(about, /data-ornament-anchor="about"/);
  assert.match(about, /<ChronicleGraph variant="compact" \/>/);
  assert.match(about, /<MarginaliaMark variant="project" \/>/);

  for (const component of [chronicleGraph, constructionGeometry, marginalia]) {
    assert.match(component, /aria-hidden="true"/);
    assert.match(component, /focusable="false"/);
    assert.doesNotMatch(component, /<text\b/);
  }

  assert.match(ornamentCss, /pointer-events: none/);
  assert.match(ornamentCss, /@media \(forced-colors: active\)/);
  assert.match(ornamentCss, /@media \(max-width: 760px\)/);
  assert.doesNotMatch(ornamentCss, /filter:\s*(blur|drop-shadow)/);
  assert.doesNotMatch(ornamentCss, /animation\s*:/);
});
