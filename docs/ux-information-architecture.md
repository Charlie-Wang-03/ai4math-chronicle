# Timeline and Explore information architecture

AI4Math Chronicle deliberately exposes the same canonical event corpus through two different reader tasks.

## Timeline

The locale homepage (`/en/` or `/zh-CN/`) is the historical reading surface. It answers:

> What happened next, and how did AI for Mathematics evolve over time?

It uses a chronological vertical timeline, year navigation, event cards, primary-evidence shortcuts, and lightweight filters. Historical sequence and narrative comprehension take priority.

## Explore

The locale Explore page (`/en/explore/` or `/zh-CN/explore/`) is the comparative directory. It answers:

> Which events match a set of attributes, and how do records differ side by side?

It uses a compact tabular directory rather than timeline cards. It supports year, event type, significance, verification, and system filters, plus newest/oldest/significance sorting. Columns expose date, event, classification, verification, primary evidence, and the event-detail entry point.

## Shared source of truth

Both views derive from the same `data/events/*.yaml` canonical records. They must not maintain separate factual datasets.
