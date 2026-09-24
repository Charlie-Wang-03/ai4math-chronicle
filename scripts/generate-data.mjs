import fs from 'node:fs';
import path from 'node:path';
import { ROOT, SCHEMA_PATH, sortedEvents } from './lib/events.mjs';

const events = sortedEvents();
const dataDir = path.join(ROOT, 'public', 'data');
const schemaDir = path.join(dataDir, 'schema');
const perEventDir = path.join(dataDir, 'events');
const canonicalBase = 'https://charlie-wang-03.github.io/ai4math-chronicle/';
fs.mkdirSync(schemaDir, { recursive: true });
fs.mkdirSync(perEventDir, { recursive: true });

fs.writeFileSync(path.join(dataDir, 'events.json'), `${JSON.stringify({ schema_version: 1, generated_from: 'data/events/*.yaml', events }, null, 2)}\n`);
fs.writeFileSync(path.join(dataDir, 'events.ndjson'), `${events.map((event) => JSON.stringify(event)).join('\n')}\n`);

for (const event of events) {
  fs.writeFileSync(path.join(perEventDir, `${event.slug}.json`), `${JSON.stringify(event, null, 2)}\n`);
}

const eventIndex = events.map((event) => ({
  id: event.id,
  slug: event.slug,
  title: event.title,
  event_date: event.dates.event,
  last_updated: event.dates.last_updated,
  event_types: event.event_types,
  significance: event.significance.tier,
  verification: {
    status: event.verification.status,
    evidence_level: event.verification.evidence_level,
    formal_assurance: event.verification.formal_assurance,
  },
  urls: {
    en: `${canonicalBase}en/events/${event.slug}/`,
    'zh-CN': `${canonicalBase}zh-CN/events/${event.slug}/`,
    json: `${canonicalBase}data/events/${event.slug}.json`,
  },
  primary_sources: event.sources
    .filter((source) => source.primary || source.tier === 'S1')
    .map((source) => ({
      title: source.title,
      url: source.url,
      tier: source.tier,
      type: source.type,
    })),
}));

fs.writeFileSync(
  path.join(perEventDir, 'index.json'),
  `${JSON.stringify({ schema_version: 1, generated_from: 'data/events/*.yaml', events: eventIndex }, null, 2)}\n`,
);
fs.copyFileSync(SCHEMA_PATH, path.join(schemaDir, 'event.schema.json'));
console.log(`Generated collection, per-Event JSON, and discovery index for ${events.length} events.`);
