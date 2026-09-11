import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

test('presentation layer covers every canonical reader-facing enum', async () => {
  const schema = JSON.parse(await read('schema/event.schema.json'));
  const source = await read('src/lib/presentation.ts');
  const expected = {
    event_type: schema.properties.event_types.items.enum,
    significance: schema.properties.significance.properties.tier.enum,
    verification: schema.properties.verification.properties.status.enum,
    evidence_level: schema.properties.verification.properties.evidence_level.enum,
    formal_assurance: schema.properties.verification.properties.formal_assurance.enum,
    mathematical_novelty: schema.properties.mathematical_novelty.properties.type.enum,
    ai_role: schema.properties.ai_role.properties.level.enum,
    interface: schema.properties.interfaces.items.enum,
    source_type: schema.$defs.source.properties.type.enum,
    source_tier: schema.$defs.source.properties.tier.enum,
    artifact_kind: schema.$defs.artifact.properties.kind.enum,
  };

  for (const [category, values] of Object.entries(expected)) {
    assert.match(source, new RegExp(`${category}: \\{`), `${category} mapping should exist`);
    for (const value of values) {
      assert.match(
        source,
        new RegExp(`(?:^|\\n)\\s*${escapeRegex(value)}: \\{ en: ['\"]`),
        `${category}.${value} should have a bilingual presentation label`,
      );
    }
  }
});

test('reader surfaces use presentation labels while preserving canonical filter values', async () => {
  const card = await read('src/components/EventCard.astro');
  const timeline = await read('src/components/EventCollection.astro');
  const explore = await read('src/components/ExploreDirectory.astro');
  const detail = await read('src/components/EventDetailPage.astro');

  assert.match(card, /presentationLabel\('verification'/);
  assert.match(card, /presentationLabel\('evidence_level'/);
  assert.match(card, /presentationLabel\('event_type'/);
  assert.match(timeline, /presentationOptions\('event_type'/);
  assert.match(timeline, /presentationOptions\('verification'/);
  assert.match(explore, /presentationOptions\('ai_role'/);
  assert.match(explore, /presentationOptions\('formal_assurance'/);
  assert.match(explore, /presentationOptions\('source_type'/);
  assert.match(explore, /presentationOptions\('artifact_kind'/);
  assert.match(explore, /optionLabel\(group, value\)/);
  assert.match(detail, /presentationLabel\('mathematical_novelty'/);
  assert.match(detail, /presentationLabel\('source_tier'/);
  assert.match(detail, /presentationLabel\('artifact_kind'/);

  assert.match(detail, /data-pagefind-filter=\{`verification:\$\{event\.verification\.status\}`\}/);
  assert.match(explore, /data-verification=\{event\.verification\.status\}/);
  assert.match(explore, /data-source-types=/);
});

test('Chinese Event Detail no longer exposes implementation-only metadata headings', async () => {
  const detail = await read('src/components/EventDetailPage.astro');
  assert.match(detail, /zh \? '系统' : 'Systems'/);
  assert.match(detail, /zh \? '机构' : 'Organizations'/);
  assert.match(detail, /zh \? '数学问题' : 'Problems'/);
  assert.match(detail, /zh \? '方法' : 'Methods'/);
  assert.match(detail, /zh \? '访问于' : 'accessed'/);
  assert.match(detail, /zh \? '工件' : 'Artifact'/);
});
