# MVP Architecture

**English** · [简体中文](./architecture.zh-CN.md)

## Principle

```text
Canonical YAML Event
        │
        ├── JSON Schema + semantic validation
        │
        ├── Astro static pages
        │   ├── /en/
        │   ├── /zh-CN/
        │   ├── Explore
        │   ├── Event detail
        │   ├── Methodology
        │   └── Data
        │
        ├── JSON / NDJSON
        ├── RSS
        ├── sitemap.xml
        └── Pagefind index
```

No downstream surface maintains its own factual copy. The canonical YAML event record is the single source of truth for factual event data.

## Project Pages safety

`astro.config.mjs` freezes:

- `site = https://charlie-wang-03.github.io`
- `base = /ai4math-chronicle`
- static output
- trailing slashes

Internal links and Pagefind use `import.meta.env.BASE_URL`; canonical URLs use the same base through `src/lib/site.ts`. RSS, robots, sitemap, JSON/NDJSON paths are therefore compatible with a GitHub Project Pages deployment rather than assuming a domain root.

## Canonical data validation

`schema/event.schema.json` enforces required bilingual fields, taxonomies, date formats, source/artifact shapes, verification fields, and relationship arrays.

`scripts/validate-events.mjs` adds cross-record checks that JSON Schema alone cannot express cleanly:

- duplicate Event ID;
- duplicate slug;
- missing S1/S2 authoritative source;
- `last_updated < added_to_chronicle`;
- self-referential relationships;
- relationships to missing Event IDs.

The validator reports shared source URLs as warnings because legitimate related records can cite the same paper or announcement.

## Search and exploration

Pagefind runs after Astro renders `dist/`. The browser search API is configured with the Project Pages base URL, so result links remain valid under `/ai4math-chronicle/`. The npm Pagefind package uses the extended binary and supports Chinese/Japanese indexing.

The UI separates two discovery modes:

- **Timeline:** chronological reading remains the primary product surface.
- **Explore:** compact comparison, filtering, search, and sorting support targeted retrieval without replacing the historical view.

The interaction model follows an information-dense publication pattern: overview first, then search/filter, then event-level evidence details on demand. Reader theme preference is a lightweight client-side enhancement with Light, Dark, and System modes; it does not change content or routing.

## SEO / GEO / AI-readable structure

Event pages render semantic, visible sections for date, claim, AI contribution, human contribution, verification, sources, and last review. Each page includes canonical and hreflang metadata plus schema.org `Article` and `BreadcrumbList` JSON-LD. The timeline includes `WebSite` JSON-LD.

The same canonical data also generates JSON, NDJSON, RSS, and sitemap outputs. These machine-readable surfaces are treated as first-class publication outputs rather than post-processing extras.

## Bilingual architecture

Canonical identifiers, source metadata, relationships, and taxonomies are shared across languages. Human-facing event fields contain both `en` and `zh-CN` values in the same YAML record. This prevents English and Chinese pages from drifting into separate factual datasets.

Repository documentation uses paired Markdown files with explicit language-switch links, for example:

- `README.md` ↔ `README.zh-CN.md`
- `CONTRIBUTING.md` ↔ `CONTRIBUTING.zh-CN.md`
- `docs/architecture.md` ↔ `docs/architecture.zh-CN.md`

## Deployment

- `ci.yml` validates, tests, and builds pull requests and pushes.
- `deploy-pages.yml` builds and deploys `dist/` only from `main` plus manual dispatch.
- Repository Settings → Pages remains a human-controlled deployment setting.
- The repository is public; future high-blast-radius visibility, ruleset, or release-setting changes remain human-authorized operations.

## Explicit non-goals for v0.1

The MVP does not introduce:

- a backend or database service;
- a CMS;
- user accounts;
- a vector database;
- a leaderboard;
- a chatbot;
- autonomous publication without human editorial review.

These exclusions are architectural constraints for v0.1, not claims that the project can never add such capabilities later.
