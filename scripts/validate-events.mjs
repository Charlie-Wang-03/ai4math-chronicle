import fs from 'node:fs';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { loadEventFiles, SCHEMA_PATH } from './lib/events.mjs';

const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8'));
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validate = ajv.compile(schema);
const files = loadEventFiles();

if (files.length === 0) {
  console.error('No canonical event YAML files found in data/events/.');
  process.exit(1);
}

let failed = false;
const ids = new Map();
const slugs = new Map();
const sourceKeys = new Map();

for (const { name, data } of files) {
  if (!validate(data)) {
    failed = true;
    console.error(`Schema validation failed: ${name}`);
    for (const error of validate.errors ?? []) {
      console.error(`  ${error.instancePath || '/'} ${error.message}`);
    }
  }

  for (const [value, map, label] of [[data?.id, ids, 'event id'], [data?.slug, slugs, 'slug']]) {
    if (!value) continue;
    if (map.has(value)) {
      failed = true;
      console.error(`Duplicate ${label} '${value}' in ${map.get(value)} and ${name}`);
    } else map.set(value, name);
  }

  for (const source of data?.sources ?? []) {
    const url = source.url?.toLowerCase();
    if (!url) continue;
    if (sourceKeys.has(url)) {
      console.warn(`Shared source URL across events: ${url} (${sourceKeys.get(url)}, ${name})`);
    } else sourceKeys.set(url, name);
  }

  if (!(data?.sources ?? []).some((source) => source.tier === 'S1' || source.tier === 'S2')) {
    failed = true;
    console.error(`${name} has no S1/S2 authoritative source.`);
  }

  if (data?.dates?.last_updated < data?.dates?.added_to_chronicle) {
    failed = true;
    console.error(`${name}: last_updated predates added_to_chronicle.`);
  }
}

const knownIds = new Set(ids.keys());
for (const { name, data } of files) {
  const groups = data?.relationships ?? {};
  for (const key of ['predecessors', 'successors', 'related']) {
    for (const ref of groups[key] ?? []) {
      if (ref === data.id) {
        failed = true;
        console.error(`${name}: ${key} contains self reference '${ref}'.`);
      }
      if (!knownIds.has(ref)) {
        failed = true;
        console.error(`${name}: ${key} references missing event '${ref}'.`);
      }
    }
  }
}

if (failed) process.exit(1);
console.log(`Validated ${files.length} event records: schema, IDs, dates, sources, and relationships PASS.`);
