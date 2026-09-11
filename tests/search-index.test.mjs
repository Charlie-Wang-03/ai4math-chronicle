import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { ROOT } from '../scripts/lib/events.mjs';

test('Pagefind indexes event detail routes only', () => {
  const packageJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  const command = packageJson.scripts?.['index:search'];

  assert.equal(typeof command, 'string');
  assert.match(command, /pagefind\s+--site\s+dist/);
  assert.match(command, /--glob\s+['"]\*\*\/events\/\*\*\/\*\.html['"]/);
});
