import fs from 'node:fs';
import path from 'node:path';
import { load } from 'js-yaml';

export const ROOT = path.resolve(import.meta.dirname, '../..');
export const EVENTS_DIR = path.join(ROOT, 'data', 'events');
export const SCHEMA_PATH = path.join(ROOT, 'schema', 'event.schema.json');

export function loadEventFiles() {
  if (!fs.existsSync(EVENTS_DIR)) return [];
  return fs.readdirSync(EVENTS_DIR)
    .filter((name) => /\.ya?ml$/i.test(name))
    .sort()
    .map((name) => {
      const filePath = path.join(EVENTS_DIR, name);
      const raw = fs.readFileSync(filePath, 'utf8');
      const data = load(raw);
      return { name, filePath, data };
    });
}

export function sortedEvents() {
  return loadEventFiles()
    .map(({ data }) => data)
    .sort((a, b) => b.dates.event.localeCompare(a.dates.event) || a.id.localeCompare(b.id));
}
