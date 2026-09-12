import { getAllEvents } from '../lib/events';
import { absolute, localePath } from '../lib/site';

const locales = ['en', 'zh-CN'] as const;

function alternateLinks(path: string) {
  const links = [
    ...locales.map((locale) => ({ hreflang: locale, href: absolute(localePath(locale, path)) })),
    { hreflang: 'x-default', href: absolute(localePath('en', path)) },
  ];

  return links
    .map(({ hreflang, href }) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`)
    .join('\n');
}

export function GET() {
  const staticPages = ['', 'explore', 'methodology', 'about', 'data'];
  const pages: Array<{ path: string; lastmod?: string }> = [
    ...staticPages.map((path) => ({ path })),
    ...getAllEvents().map((event) => ({ path: `events/${event.slug}`, lastmod: event.dates.last_updated })),
  ];

  const urls = pages.flatMap(({ path, lastmod }) =>
    locales.map((locale) => ({
      loc: absolute(localePath(locale, path)),
      lastmod,
      alternates: alternateLinks(path),
    })),
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls
    .map(
      ({ loc, lastmod, alternates }) =>
        `  <url>\n    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n${alternates}\n  </url>`,
    )
    .join('\n')}\n</urlset>\n`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
