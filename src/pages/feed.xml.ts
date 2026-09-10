import rss from '@astrojs/rss';
import { getAllEvents } from '../lib/events';
import { BASE_URL } from '../lib/site';

export function GET(context: { site?: URL }) {
  const site = new URL(BASE_URL, context.site ?? new URL('https://charlie-wang-03.github.io'));
  return rss({
    title: 'AI4Math Chronicle',
    description: 'Major milestones in AI for Mathematics — timeline-first, evidence-backed.',
    site,
    items: getAllEvents().map((event) => ({
      title: event.title.en,
      description: event.summary.en,
      pubDate: new Date(`${event.dates.event}T00:00:00Z`),
      link: `en/events/${event.slug}/`,
      customData: `<guid isPermaLink="false">${event.id}</guid>`,
    })),
  });
}
