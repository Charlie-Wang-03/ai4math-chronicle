<p align="center">
  <img src="./assets/readme/hero.svg" alt="AI4Math Chronicle — timeline-first, evidence-backed archive of major milestones in AI for Mathematics" width="100%" />
</p>

<p align="center">
  <strong>English</strong> · <a href="./README.zh-CN.md">简体中文</a>
</p>

# AI4Math Chronicle

**AI4Math Chronicle / AI4Math 大事记** is a timeline-first, evidence-backed, bilingual archive of major milestones in **AI for Mathematics**.

It is designed to answer three questions quickly:

1. **What happened?** — a chronological view of important AI4Math milestones.
2. **What did the AI and humans actually contribute?** — explicit contribution boundaries on every event.
3. **What is the evidence?** — primary or official sources reachable in one or two clicks.

> **Release status:** the repository remains private until the v0.1 public-release gate is completed. The target GitHub Pages site is `https://charlie-wang-03.github.io/ai4math-chronicle/`.

## At a glance

| Corpus | Current MVP |
| --- | ---: |
| Canonical timeline events | **51** |
| H1 — historical milestones | **6** |
| H2 — field milestones | **43** |
| H3 — context events | **2** |
| Languages | English + 简体中文 |
| Minimum evidence gate | ≥ 1 S1/S2 source per event |

The corpus spans theorem proving, formalization, mathematical discovery, competition results, math-specific systems, benchmarks, datasets, and infrastructure. H3 is intentionally narrow: it is reserved for general-purpose model releases where mathematics mainly serves as a capability benchmark.

## Why this project exists

AI4Math progress is scattered across papers, lab announcements, repositories, benchmark releases, competition reports, and social discussion. A news feed is easy to produce but hard to audit later. AI4Math Chronicle instead maintains a **canonical historical record**:

- **Timeline-first:** history remains the primary reading interface.
- **Evidence-backed:** every published event must include authoritative S1/S2 evidence.
- **Contribution-aware:** AI and human contributions are modeled separately.
- **Verification-aware:** historical significance is separate from verification certainty.
- **Bilingual:** the same canonical record generates English and Simplified Chinese pages.
- **Machine-readable:** JSON, NDJSON, JSON Schema, RSS, sitemap, and semantic HTML are generated from the same source data.

## One canonical record, every public surface

```text
Canonical YAML event
        │
        ├── schema + semantic validation
        ├── bilingual timeline / event pages
        ├── Explore filters + Pagefind search
        ├── JSON / NDJSON / JSON Schema
        ├── RSS
        └── sitemap + structured metadata
```

No downstream page maintains a second factual copy. Event cards, detail pages, filters, feeds, and machine-readable exports are derived from `data/events/*.yaml`.

## Significance and verification are independent

- **H1 — Historical Milestone:** a durable turning point in AI for Mathematics. Human editorial review is required.
- **H2 — Field Milestone:** a material advance in an AI4Math subfield or technical direction.
- **H3 — Context Event:** supporting historical context; currently reserved for general-purpose reasoning-model releases where math is mainly a benchmark.

An H1 event may still be `under_verification`. Likewise, `machine_checked` does not automatically mean `independently_verified`.

See the full policy in [Editorial Methodology](./docs/editorial-methodology.md).

## Evidence model

| Tier | Meaning |
| --- | --- |
| **S1** | Primary research record or artifact |
| **S2** | Official institutional or researcher source |
| **S3** | Independent scholarly verification or analysis |
| **S4** | Reputable secondary media |
| **S5** | Community discovery signal only |

Every published MVP event must contain at least one S1 or S2 source. Major scientific claims should resolve to primary evidence from the event card or detail page with minimal navigation.

## Tech stack

- **Astro 7 + TypeScript** — static site generation
- **Pagefind** — static full-text search
- **YAML + JSON Schema + Ajv** — canonical content and validation
- **GitHub Actions** — validation, tests, build, and Pages deployment
- **GitHub Pages** — static public hosting

The MVP deliberately does **not** add a backend, CMS, account system, vector database, leaderboard, chatbot, or autonomous publishing pipeline.

## Repository map

```text
.
├── data/events/               # canonical YAML event records
├── data/entities/             # reserved canonical entity identifiers / notes
├── content/                   # non-canonical editorial prose
├── schema/event.schema.json   # Event v0.1 JSON Schema
├── scripts/                   # validation + machine-readable export
├── src/                       # Astro pages, components, layouts, styles
├── public/                    # static assets + generated public data
├── docs/                      # architecture + editorial methodology
├── tests/                     # data-pipeline tests
└── .github/                   # CI, Pages deployment, templates
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

The production build validates all canonical YAML, generates machine-readable data, checks Astro/TypeScript, renders static HTML/RSS/sitemap, and builds the Pagefind index.

## Contributing an event

A focused event contribution should:

1. add or edit one canonical YAML record under `data/events/`;
2. preserve stable Event IDs;
3. provide authoritative sources and bilingual factual fields;
4. make AI and human contributions explicit;
5. update verification history and corrections when applicable;
6. pass `npm run validate`, `npm test`, and `npm run build`;
7. avoid finalizing `H1`, `independently_verified`, or a new mathematical fact without human editorial review.

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.

## Machine-readable outputs

Generated during the build:

- `/data/events.json`
- `/data/events.ndjson`
- `/data/schema/event.schema.json`
- `/feed.xml`
- `/sitemap.xml`

## Documentation

- [Architecture](./docs/architecture.md) · [架构说明](./docs/architecture.zh-CN.md)
- [Editorial Methodology](./docs/editorial-methodology.md) · [编辑方法论](./docs/editorial-methodology.zh-CN.md)
- [Contributing](./CONTRIBUTING.md) · [贡献指南](./CONTRIBUTING.zh-CN.md)

## Public-release gates still open

Before repository visibility is switched to public, v0.1 still requires final human review of:

- repository license choice;
- GitHub Pages settings and first public deployment;
- final desktop/mobile visual QA;
- repository metadata and public contribution surfaces.

These are deliberate human gates rather than automated release steps.
