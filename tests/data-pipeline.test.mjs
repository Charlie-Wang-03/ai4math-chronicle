import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { ROOT, sortedEvents } from '../scripts/lib/events.mjs';

test('generated JSON and NDJSON are consistent with canonical YAML', () => {
  const canonical = sortedEvents();
  const jsonPath = path.join(ROOT, 'public', 'data', 'events.json');
  const ndjsonPath = path.join(ROOT, 'public', 'data', 'events.ndjson');
  const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8')).events;
  const ndjson = fs.readFileSync(ndjsonPath, 'utf8').trim().split('\n').map(JSON.parse);
  assert.deepEqual(json, canonical);
  assert.deepEqual(ndjson, canonical);
});

test('event dates are descending in generated order', () => {
  const events = sortedEvents();
  for (let i = 1; i < events.length; i += 1) {
    assert.ok(events[i - 1].dates.event >= events[i].dates.event);
  }
});
