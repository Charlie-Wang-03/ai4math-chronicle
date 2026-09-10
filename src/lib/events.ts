import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import type { ChronicleEvent, Locale, LocalizedText } from './types';

const EVENTS_DIR = path.resolve(process.cwd(), 'data/events');
let cache: ChronicleEvent[] | undefined;

export function getAllEvents(): ChronicleEvent[] {
  if (cache) return cache;
  cache = fs.readdirSync(EVENTS_DIR)
    .filter((name) => /\.ya?ml$/i.test(name))
    .sort()
    .map((name) => yaml.load(fs.readFileSync(path.join(EVENTS_DIR, name), 'utf8')) as ChronicleEvent)
    .sort((a, b) => b.dates.event.localeCompare(a.dates.event) || a.id.localeCompare(b.id));
  return cache;
}

export function getEventBySlug(slug: string): ChronicleEvent | undefined {
  return getAllEvents().find((event) => event.slug === slug);
}

export function getEventById(id: string): ChronicleEvent | undefined {
  return getAllEvents().find((event) => event.id === id);
}

export function text(value: LocalizedText, locale: Locale): string {
  return value[locale];
}

export function formatDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'zh-CN' ? 'zh-CN' : 'en-US', {
    year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}
