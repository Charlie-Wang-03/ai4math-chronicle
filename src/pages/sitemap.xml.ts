import { getAllEvents } from '../lib/events';
import { absolute, localePath } from '../lib/site';

export function GET() {
  const staticPages = ['','explore','methodology','use','data'];
  const urls: Array<{ loc: string; lastmod?: string }> = [];
  for (const locale of ['en','zh-CN'] as const) {
    for (const page of staticPages) urls.push({ loc: absolute(localePath(locale, page)) });
    for (const event of getAllEvents()) urls.push({ loc: absolute(localePath(locale, `events/${event.slug}`)), lastmod: event.dates.last_updated });
  }
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(({loc,lastmod}) => `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
