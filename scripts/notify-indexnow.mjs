import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

export const SITE_BASE = 'https://charlie-wang-03.github.io/ai4math-chronicle';
export const SITE_HOST = 'charlie-wang-03.github.io';
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
export const INDEXNOW_KEY_FILE = '1f461c7e615ee1a096d24986265d7fda.txt';
export const INDEXNOW_KEY = INDEXNOW_KEY_FILE.replace(/\.txt$/, '');
export const INDEXNOW_KEY_LOCATION = `${SITE_BASE}/${INDEXNOW_KEY_FILE}`;

const XML_ENTITIES = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function decodeXmlEntitiesOnce(value) {
  return value.replace(/&(amp|lt|gt|quot|apos);/g, (_match, entity) => XML_ENTITIES[entity]);
}

export function extractSitemapUrls(xml) {
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decodeXmlEntitiesOnce(match[1]));

  return [...new Set(urls)].filter((value) => {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && url.hostname === SITE_HOST && url.pathname.startsWith('/ai4math-chronicle/');
    } catch {
      return false;
    }
  });
}

export function buildIndexNowPayload(urlList) {
  if (!Array.isArray(urlList) || urlList.length === 0) {
    throw new Error('IndexNow requires at least one URL.');
  }
  if (urlList.length > 10_000) {
    throw new Error(`IndexNow batch exceeds 10,000 URLs: ${urlList.length}`);
  }

  return {
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList,
  };
}

async function fetchWithRetry(url, options = {}, attempts = 4) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      lastError = new Error(`${url} returned HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    if (attempt < attempts) await sleep(2_000 * attempt);
  }
  throw lastError;
}

export async function notifyIndexNow() {
  const expectedKey = (await readFile(new URL(`../public/${INDEXNOW_KEY_FILE}`, import.meta.url), 'utf8')).trim();
  if (expectedKey !== INDEXNOW_KEY) {
    throw new Error('IndexNow key filename and file contents do not match.');
  }

  const liveKeyResponse = await fetchWithRetry(INDEXNOW_KEY_LOCATION);
  const liveKey = (await liveKeyResponse.text()).trim();
  if (liveKey !== INDEXNOW_KEY) {
    throw new Error(`Published IndexNow key mismatch at ${INDEXNOW_KEY_LOCATION}`);
  }

  const sitemapResponse = await fetchWithRetry(`${SITE_BASE}/sitemap.xml`);
  const urlList = extractSitemapUrls(await sitemapResponse.text());
  const payload = buildIndexNowPayload(urlList);

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  if (![200, 202].includes(response.status)) {
    const body = (await response.text()).slice(0, 500);
    throw new Error(`IndexNow returned HTTP ${response.status}${body ? `: ${body}` : ''}`);
  }

  console.log(`IndexNow accepted ${urlList.length} URLs with HTTP ${response.status}.`);
}

const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (invokedDirectly) {
  await notifyIndexNow();
}
