# AI4Math Chronicle / AI4Math 大事记

**Timeline-first, evidence-backed.** AI4Math Chronicle is a GitHub-native, static chronicle of major milestones in AI for Mathematics.

MVP target: `https://charlie-wang-03.github.io/ai4math-chronicle/`

## Product contract

One event has one canonical YAML record. Timeline cards, bilingual event pages, filters, JSON, NDJSON, RSS, sitemap, and search are derived from that record.

The MVP deliberately does **not** implement a backend, CMS, account system, vector database, leaderboard, news feed, chatbot, or autonomous publishing pipeline.

## Stack

- Astro 7 + TypeScript
- Static Site Generation
- Pagefind static search
- JSON Schema + Ajv validation
- GitHub Actions
- GitHub Pages project-site deployment (`/ai4math-chronicle/` base path)

## Repository map

```text
.
├── data/events/              # canonical YAML event records
├── data/entities/            # reserved canonical entity identifiers/notes
├── content/                  # non-canonical editorial prose only
├── schema/event.schema.json  # Event v0.1 JSON Schema
├── scripts/                  # validation + machine-readable export
├── src/                      # Astro pages/components/layouts
├── public/                   # static public assets; generated data appears here at build
├── docs/                     # architecture/editorial documentation
├── tests/                    # data-pipeline tests
└── .github/workflows/        # CI + Pages deployment
```

## Local development

Requires Node.js `>=22.12.0`.

```bash
npm install
npm run validate
npm test
npm run dev
```

Production build:

```bash
npm run build
```

The build validates canonical YAML, generates `/data/events.json`, `/data/events.ndjson`, copies the public JSON Schema, type-checks Astro/TypeScript, renders static HTML/RSS/sitemap, then builds a Pagefind index in `dist/pagefind/`.

## Canonical event workflow

1. Add or edit exactly one YAML record under `data/events/`.
2. Keep the stable `id`; do not change it when titles or narratives evolve.
3. Add authoritative S1/S2 sources and explicit AI/human contribution fields.
4. Run `npm run validate` and `npm test`.
5. Review the rendered timeline/event page and primary-evidence links.
6. Human editorial review is required before finalizing `H1`, `independently_verified`, or a new mathematical fact.

The current seed events are pipeline-validation records, not a claim that the MVP content corpus is complete.

## Machine-readable outputs

Generated during the build:

- `/data/events.json`
- `/data/events.ndjson`
- `/data/schema/event.schema.json`
- `/feed.xml`
- `/sitemap.xml`

## Bilingual model

Canonical identifiers, source metadata, taxonomies, and relationships are shared. Human-facing fields carry both `en` and `zh-CN` values in the same event record. Routes are generated under `/en/` and `/zh-CN/`.

## Editorial status

The repository remains private during MVP implementation. Seed records avoid AI-only `H1` and `independently_verified` designations; those remain human editorial gates.
