import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { load } from 'js-yaml';
import { ROOT, loadEventFiles } from './lib/events.mjs';

export const CHANNELS_PATH = path.join(ROOT, 'config', 'source-channels.yaml');
const DEFAULT_OUTPUT_DIR = path.join(ROOT, 'source-scan-output');
const ARXIV_ENDPOINT = 'https://export.arxiv.org/api/query';
const USER_AGENT = 'AI4Math-Chronicle/0.1 source-scan (+https://github.com/Charlie-Wang-03/ai4math-chronicle)';

function usage() {
  return `Usage: node scripts/source-scan.mjs --start YYYY-MM-DD --end YYYY-MM-DD [--output DIR] [--max-results N] [--no-delay]\n`;
}

export function parseArgs(argv) {
  const args = { output: DEFAULT_OUTPUT_DIR, maxResults: null, noDelay: false };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--start') args.start = argv[++index];
    else if (token === '--end') args.end = argv[++index];
    else if (token === '--output') args.output = path.resolve(argv[++index]);
    else if (token === '--max-results') args.maxResults = Number(argv[++index]);
    else if (token === '--no-delay') args.noDelay = true;
    else if (token === '--help' || token === '-h') args.help = true;
    else throw new Error(`Unknown argument: ${token}`);
  }
  return args;
}

export function validateDate(value, label) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? '')) {
    throw new Error(`${label} must use YYYY-MM-DD`);
  }
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== value) {
    throw new Error(`${label} is not a valid calendar date`);
  }
  return value;
}

function arxivDateBoundary(date, endOfDay) {
  return `${date.replaceAll('-', '')}${endOfDay ? '2359' : '0000'}`;
}

export function buildArxivUrl(channel, start, end, maxOverride = null) {
  const maxResults = maxOverride ?? channel.max_results ?? 80;
  if (!Number.isInteger(maxResults) || maxResults < 1 || maxResults > 2000) {
    throw new Error(`Invalid max_results for ${channel.id}: ${maxResults}`);
  }

  const dateFilter = `submittedDate:[${arxivDateBoundary(start, false)} TO ${arxivDateBoundary(end, true)}]`;
  const url = new URL(ARXIV_ENDPOINT);
  url.searchParams.set('search_query', `(${channel.query.trim()}) AND ${dateFilter}`);
  url.searchParams.set('start', '0');
  url.searchParams.set('max_results', String(maxResults));
  url.searchParams.set('sortBy', 'submittedDate');
  url.searchParams.set('sortOrder', 'descending');
  return url;
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
  return decodeXml(value.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function firstTag(block, tag) {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match ? normalizeText(match[1]) : null;
}

function extractAttribute(tagText, name) {
  const match = tagText.match(new RegExp(`${name}=["']([^"']+)["']`, 'i'));
  return match ? decodeXml(match[1]) : null;
}

export function normalizeArxivId(value) {
  if (!value) return null;
  const clean = value.trim().replace(/^https?:\/\/(?:export\.)?arxiv\.org\/(?:abs|pdf)\//i, '').replace(/\.pdf$/i, '');
  return clean.replace(/v\d+$/i, '');
}

export function arxivIdFromUrl(value) {
  if (!value || typeof value !== 'string') return null;
  const match = value.match(/https?:\/\/(?:export\.)?arxiv\.org\/(?:abs|pdf)\/([^?#]+)/i);
  return match ? normalizeArxivId(match[1]) : null;
}

export function parseArxivAtom(xml) {
  const entries = [];
  for (const match of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/gi)) {
    const block = match[1];
    const idUrl = firstTag(block, 'id');
    const arxivId = normalizeArxivId(idUrl);
    if (!arxivId) continue;

    const authors = [...block.matchAll(/<author>([\s\S]*?)<\/author>/gi)]
      .map((authorMatch) => firstTag(authorMatch[1], 'name'))
      .filter(Boolean);
    const categories = [...block.matchAll(/<category\b[^>]*>/gi)]
      .map((categoryMatch) => extractAttribute(categoryMatch[0], 'term'))
      .filter(Boolean);
    const links = [...block.matchAll(/<link\b[^>]*>/gi)].map((linkMatch) => ({
      href: extractAttribute(linkMatch[0], 'href'),
      rel: extractAttribute(linkMatch[0], 'rel'),
      type: extractAttribute(linkMatch[0], 'type'),
      title: extractAttribute(linkMatch[0], 'title'),
    }));

    const absUrl = links.find((link) => link.rel === 'alternate')?.href ?? idUrl ?? `https://arxiv.org/abs/${arxivId}`;
    const pdfUrl = links.find((link) => link.title === 'pdf' || link.type === 'application/pdf')?.href ?? `https://arxiv.org/pdf/${arxivId}`;

    entries.push({
      arxiv_id: arxivId,
      title: firstTag(block, 'title'),
      authors,
      published: firstTag(block, 'published'),
      updated: firstTag(block, 'updated'),
      summary: firstTag(block, 'summary'),
      primary_category: extractAttribute(block.match(/<arxiv:primary_category\b[^>]*\/>/i)?.[0] ?? '', 'term') ?? categories[0] ?? null,
      categories,
      url: absUrl.replace('http://', 'https://'),
      pdf_url: pdfUrl.replace('http://', 'https://'),
    });
  }
  return entries;
}

export function loadChannels(filePath = CHANNELS_PATH) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const config = load(raw);
  if (config?.schema_version !== 1 || !Array.isArray(config.channels)) {
    throw new Error('config/source-channels.yaml must contain schema_version: 1 and a channels array');
  }
  return { raw, config };
}

export function buildCorpusArxivIndex(eventFiles = loadEventFiles()) {
  const index = new Map();
  for (const { data } of eventFiles) {
    const urls = [
      ...(data.sources ?? []).map((source) => source.url),
      ...(data.artifacts ?? []).map((artifact) => artifact.url),
    ];
    for (const url of urls) {
      const arxivId = arxivIdFromUrl(url);
      if (!arxivId) continue;
      if (!index.has(arxivId)) index.set(arxivId, new Set());
      index.get(arxivId).add(data.id);
    }
  }
  return new Map([...index].map(([id, eventIds]) => [id, [...eventIds].sort()]));
}

async function fetchText(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45_000);
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT, Accept: 'application/atom+xml, application/xml;q=0.9, text/xml;q=0.8' },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status} from ${url}`);
    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function mergeCandidate(map, entry, channelId, corpusIndex) {
  const existing = map.get(entry.arxiv_id);
  if (existing) {
    if (!existing.matched_channels.includes(channelId)) existing.matched_channels.push(channelId);
    existing.matched_channels.sort();
    return;
  }
  const matchedEvents = corpusIndex.get(entry.arxiv_id) ?? [];
  map.set(entry.arxiv_id, {
    ...entry,
    matched_channels: [channelId],
    already_in_corpus: matchedEvents.length > 0,
    corpus_event_ids: matchedEvents,
  });
}

function markdownReport(report) {
  const fresh = report.candidates.filter((candidate) => !candidate.already_in_corpus);
  const lines = [
    '# AI4Math Chronicle deterministic source scan',
    '',
    `- Window: ${report.window.start} → ${report.window.end} (arXiv submittedDate, GMT)`,
    `- Generated: ${report.generated_at}`,
    `- Registry SHA-256: \`${report.registry_sha256}\``,
    `- Machine channels: ${report.channels.map((channel) => `\`${channel.id}\``).join(', ')}`,
    `- Unique arXiv records: ${report.candidates.length}`,
    `- Not already cited by canonical Events: ${fresh.length}`,
    '',
    '> This is a discovery artifact, not a Chronicle Event list and not a significance or verification judgment.',
    '',
    '## Candidates not already cited in the corpus',
    '',
  ];

  if (fresh.length === 0) lines.push('_None in this scan window._', '');
  for (const candidate of fresh) {
    lines.push(`### ${candidate.title}`);
    lines.push('');
    lines.push(`- arXiv: [${candidate.arxiv_id}](${candidate.url})`);
    lines.push(`- Published: ${candidate.published ?? 'unknown'}`);
    lines.push(`- Authors: ${candidate.authors.join(', ') || 'unknown'}`);
    lines.push(`- Channels: ${candidate.matched_channels.map((channel) => `\`${channel}\``).join(', ')}`);
    lines.push(`- Categories: ${candidate.categories.join(', ') || 'unknown'}`);
    lines.push('');
    if (candidate.summary) lines.push(`${candidate.summary}`, '');
  }

  const already = report.candidates.filter((candidate) => candidate.already_in_corpus);
  lines.push('## Already represented by canonical Events', '');
  if (already.length === 0) lines.push('_None._', '');
  for (const candidate of already) {
    lines.push(`- [${candidate.arxiv_id}](${candidate.url}) — ${candidate.title} — ${candidate.corpus_event_ids.join(', ')}`);
  }
  lines.push('');
  return `${lines.join('\n')}\n`;
}

export async function runScan({ start, end, output = DEFAULT_OUTPUT_DIR, maxResults = null, noDelay = false }) {
  validateDate(start, '--start');
  validateDate(end, '--end');
  if (start > end) throw new Error('--start must be on or before --end');
  if (maxResults !== null && (!Number.isInteger(maxResults) || maxResults < 1 || maxResults > 2000)) {
    throw new Error('--max-results must be an integer between 1 and 2000');
  }

  const { raw: registryRaw, config } = loadChannels();
  const channels = config.channels.filter((channel) => channel.enabled && channel.mode === 'machine' && channel.adapter === 'arxiv_api');
  if (channels.length === 0) throw new Error('No enabled machine arXiv channels configured');

  const corpusIndex = buildCorpusArxivIndex();
  const candidates = new Map();
  const channelRuns = [];

  for (let index = 0; index < channels.length; index += 1) {
    const channel = channels[index];
    const url = buildArxivUrl(channel, start, end, maxResults);
    const xml = await fetchText(url);
    const entries = parseArxivAtom(xml);
    channelRuns.push({ id: channel.id, request_url: url.toString(), returned: entries.length });
    for (const entry of entries) mergeCandidate(candidates, entry, channel.id, corpusIndex);
    if (!noDelay && index < channels.length - 1) await sleep(3000);
  }

  const sorted = [...candidates.values()].sort((a, b) => {
    const byPublished = (b.published ?? '').localeCompare(a.published ?? '');
    return byPublished || a.arxiv_id.localeCompare(b.arxiv_id);
  });

  const report = {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    window: { start, end },
    registry_sha256: sha256(registryRaw),
    channels: channelRuns,
    candidates: sorted,
  };

  fs.mkdirSync(output, { recursive: true });
  fs.writeFileSync(path.join(output, 'source-scan.json'), `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(path.join(output, 'source-scan.md'), markdownReport(report));
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
    const report = await runScan(args);
    const fresh = report.candidates.filter((candidate) => !candidate.already_in_corpus).length;
    console.log(`Source scan complete: ${report.candidates.length} unique records; ${fresh} not already cited by canonical Events.`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
