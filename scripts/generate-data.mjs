import fs from 'node:fs';
import path from 'node:path';
import { ROOT, SCHEMA_PATH, sortedEvents } from './lib/events.mjs';

const events = sortedEvents();
const dataDir = path.join(ROOT, 'public', 'data');
const schemaDir = path.join(dataDir, 'schema');
fs.mkdirSync(schemaDir, { recursive: true });

fs.writeFileSync(path.join(dataDir, 'events.json'), `${JSON.stringify({ schema_version: 1, generated_from: 'data/events/*.yaml', events }, null, 2)}\n`);
fs.writeFileSync(path.join(dataDir, 'events.ndjson'), `${events.map((event) => JSON.stringify(event)).join('\n')}\n`);
fs.copyFileSync(SCHEMA_PATH, path.join(schemaDir, 'event.schema.json'));
console.log(`Generated JSON and NDJSON for ${events.length} events.`);
