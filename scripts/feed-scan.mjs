import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'js-yaml';
import { ROOT, loadEventFiles } from './lib/events.mjs';

const CHANNELS_PATH = path.join(ROOT, 'config', 'source-channels.yaml');
const DEFAULT_OUTPUT_DIR = path.join(ROOT, 'source-scan-output');
const USER_AGENT = 'AI4Math-Chronicle/0.1 feed-scan (+https://github.com/Charlie-Wang-03/ai4math-chronicle)';

function usage() {
  return `Usage: node scripts/feed-scan.mjs --start YYYY-MM-DD --end YYYY-MM-DD [--output DIR] [--max-results N]\n`;
}

export function parseArgs(argv) {
  const args = { output: DEFAULT_OUTPUT_DIR, maxResults: null };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--start') args.start = argv[++index];
    else if (token === '--end') args.end = argv[++index];
    else if (token === '--output') args.output = path.resolve(argv[++index]);
    else if (token === '--max-results') args.maxResults = Number(argv[++index]);
    else if (token === '--help' || token === '-h') args.help = true;
    else throw new Error(`Unknown argument: ${token}`);
  }
  return args;
}

export function validateDate(value, label) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? '')) throw new Error(`${label} must use YYYY-MM-DD`);
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== value) {
    throw new Error(`${label} is not a valid calendar date`);
  }
  return value;
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function decodeXml(value) {
  return value
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'")
    .replaceAll('&amp;', '&');
}

function normalizeText(value) {
  return decodeXml(
    value
      .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
      .replace(/<[^>]+>/g, ' '),
  ).replace(/\s+/g, ' ').trim();
}

function firstTag(block, tag) {
  const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = block.match(new RegExp(`<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}>`, 'i'));
  return match ? normalizeText(match[1]) : null;
}

function extractAttribute(tagText, name) {
  const match = tagText.match(new RegExp(`${name}=["']([^"']+)["']`, 'i'));
  return match ? decodeXml(match[1]) : null;
}

function dateDay(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return null;
  return date.toISOString().slice(0, 10);
}

export function normalizeComparableUrl(value) {
  if (!value || typeof value !== 'string') return null;
  try {
    const url = new URL(value.trim());
    url.hash = '';
    url.search = '';
    url.protocol = 'https:';
    url.hostname = url.hostname.toLowerCase();
    url.pathname = url.pathname.replace(/\/+$/, '') || '/';
    return url.toString();
  } catch {
    return null;
  }
}

function atomLink(block) {
  const links = [...block.matchAll(/<link\b[^>]*>/gi)].map((match) => ({
    href: extractAttribute(match[0], 'href'),
    rel: extractAttribute(match[0], 'rel'),
  }));
  return links.find((link) => link.rel === 'alternate')?.href ?? links.find((link) => link.href)?.href ?? null;
}

export function parseRssAtom(xml) {
  const records = [];
  const rssItems = [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)];
  const blocks = rssItems.length > 0
    ? rssItems.map((match) => ({ block: match[1], format: 'rss' }))
    : [...xml.matchAll(/<entry\b[^>]*>([\s\S]*?)<\/entry>/gi)].map((match) => ({ block: match[1], format: 'atom' }));

  for (const { block, format } of blocks) {
    const link = format === 'rss' ? firstTag(block, 'link') : atomLink(block);
    const guid = firstTag(block, 'guid') ?? firstTag(block, 'id');
    const url = normalizeComparableUrl(link ?? guid);
    if (!url) continue;

    const categories = [...block.matchAll(/<category(?:\s[^>]*)?>([\s\S]*?)<\/category>/gi)]
      .map((match) => normalizeText(match[1]))
      .filter(Boolean);
    const publishedRaw = firstTag(block, 'pubDate') ?? firstTag(block, 'published') ?? firstTag(block, 'updated') ?? firstTag(block, 'dc:date');
    const publishedDay = dateDay(publishedRaw);

    records.push({
      title: firstTag(block, 'title') ?? url,
      url,
      published: publishedRaw,
      published_day: publishedDay,
      author: firstTag(block, 'dc:creator') ?? firstTag(block, 'author') ?? firstTag(block, 'creator'),
      categories,
      summary: firstTag(block, 'description') ?? firstTag(block, 'summary') ?? firstTag(block, 'content'),
    });
  }
  return records;
}

function loadChannels() {
  const raw = fs.readFileSync(CHANNELS_PATH, 'utf8');
  const config = load(raw);
  if (config?.schema_version !== 1 || !Array.isArray(config.channels)) {
    throw new Error('config/source-channels.yaml must contain schema_version: 1 and a channels array');
  }
  return { raw, config };
}

export function buildCorpusUrlIndex(eventFiles = loadEventFiles()) {
  const index = new Map();
  for (const { data } of eventFiles) {
    const urls = [
      ...(data.sources ?? []).map((source) => source.url),
      ...(data.artifacts ?? []).map((artifact) => artifact.url),
    ];
    for (const value of urls) {
      const normalized = normalizeComparableUrl(value);
      if (!normalized) continue;
      if (!index.has(normalized)) index.set(normalized, new Set());
      index.get(normalized).add(data.id);
    }
  }
  return new Map([...index].map(([url, eventIds]) => [url, [...eventIds].sort()]));
}

async function fetchText(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45_000);
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'application/rss+xml, application/atom+xml, application/xml;q=0.9, text/xml;q=0.8',
      },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status} from ${url}`);
    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
}

function markdownReport(report) {
  const fresh = report.items.filter((item) => !item.already_in_corpus);
  const lines = [
    '# AI4Math Chronicle official feed scan',
    '',
    `- Window: ${report.window.start} → ${report.window.end}`,
    `- Generated: ${report.generated_at}`,
    `- Registry SHA-256: \`${report.registry_sha256}\``,
    `- Machine feed channels: ${report.channels.map((channel) => `\`${channel.id}\``).join(', ') || 'none'}`,
    `- Feed items in window: ${report.items.length}`,
    `- Not already linked by canonical Events: ${fresh.length}`,
    '',
    '> Official-feed enumeration is deterministic for a captured response, but completeness is bounded by each upstream feed\'s own retention/history window.',
    '> Feed inclusion is not an AI4Math relevance, significance, or verification judgment.',
    '',
    '## Coverage diagnostics',
    '',
  ];

  for (const channel of report.channels) {
    const capNote = channel.possible_truncation ? ' **LOCAL CAP REACHED — rerun with a higher cap.**' : '';
    lines.push(`- \`${channel.id}\`: ${channel.returned_in_window}/${channel.upstream_items} upstream items in requested window; local cap ${channel.max_results}; response SHA-256 \`${channel.response_sha256}\`.${capNote}`);
    lines.push(`  - Feed: ${channel.request_url}`);
  }
  lines.push('', '## Feed items not already linked by the corpus', '');

  if (fresh.length === 0) lines.push('_None in this scan window._', '');
  for (const item of fresh) {
    lines.push(`### ${item.title}`);
    lines.push('');
    lines.push(`- URL: ${item.url}`);
    lines.push(`- Published: ${item.published ?? 'unknown'}`);
    lines.push(`- Channel: \`${item.channel_id}\``);
    if (item.categories.length > 0) lines.push(`- Categories: ${item.categories.join(', ')}`);
    if (item.author) lines.push(`- Author: ${item.author}`);
    lines.push('');
    if (item.summary) lines.push(item.summary, '');
  }

  const already = report.items.filter((item) => item.already_in_corpus);
  lines.push('## Already linked by canonical Events', '');
  if (already.length === 0) lines.push('_None._', '');
  for (const item of already) {
    lines.push(`- ${item.url} — ${item.title} — ${item.corpus_event_ids.join(', ')}`);
  }
  lines.push('');
  return `${lines.join('\n')}\n`;
}

export async function runFeedScan({ start, end, output = DEFAULT_OUTPUT_DIR, maxResults = null }) {
  validateDate(start, '--start');
  validateDate(end, '--end');
  if (start > end) throw new Error('--start must be on or before --end');
  if (maxResults !== null && (!Number.isInteger(maxResults) || maxResults < 1 || maxResults > 2000)) {
    throw new Error('--max-results must be an integer between 1 and 2000');
  }

  const { raw: registryRaw, config } = loadChannels();
  const channels = config.channels.filter((channel) => channel.enabled && channel.mode === 'machine' && channel.adapter === 'rss_atom');
  const corpusIndex = buildCorpusUrlIndex();
  const channelRuns = [];
  const items = [];

  for (const channel of channels) {
    const maxForChannel = maxResults ?? channel.max_results ?? 120;
    const xml = await fetchText(channel.url);
    const parsed = parseRssAtom(xml);
    const inWindow = parsed.filter((item) => item.published_day && item.published_day >= start && item.published_day <= end);
    const selected = inWindow.slice(0, maxForChannel);

    channelRuns.push({
      id: channel.id,
      request_url: channel.url,
      upstream_items: parsed.length,
      returned_in_window: inWindow.length,
      max_results: maxForChannel,
      possible_truncation: inWindow.length > maxForChannel,
      response_sha256: sha256(xml),
    });

    for (const item of selected) {
      const matchedEvents = corpusIndex.get(item.url) ?? [];
      items.push({
        ...item,
        channel_id: channel.id,
        default_source_tier: channel.default_source_tier ?? null,
        already_in_corpus: matchedEvents.length > 0,
        corpus_event_ids: matchedEvents,
      });
    }
  }

  items.sort((a, b) => (b.published_day ?? '').localeCompare(a.published_day ?? '') || a.url.localeCompare(b.url));
  const report = {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    window: { start, end },
    registry_sha256: sha256(registryRaw),
    channels: channelRuns,
    items,
  };

  fs.mkdirSync(output, { recursive: true });
  fs.writeFileSync(path.join(output, 'official-feed-scan.json'), `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(path.join(output, 'official-feed-scan.md'), markdownReport(report));
  return report;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  try {
    const args = parseArgs(process.argv.slice(2));
    if (args.help) {
      process.stdout.write(usage());
      process.exit(0);
    }
    if (!args.start || !args.end) throw new Error(`--start and --end are required\n${usage()}`);
    const report = await runFeedScan(args);
    const fresh = report.items.filter((item) => !item.already_in_corpus).length;
    console.log(`Official feed scan complete: ${report.items.length} items in window; ${fresh} not already linked by canonical Events.`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
