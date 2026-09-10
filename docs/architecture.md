# MVP Architecture

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

No downstream surface maintains its own factual copy.

## Project Pages safety

`astro.config.mjs` freezes:

- `site = https://charlie-wang-03.github.io`
- `base = /ai4math-chronicle`
- static output
- trailing slashes

Internal links and Pagefind use `import.meta.env.BASE_URL`; canonical URLs use the same base through `src/lib/site.ts`. RSS, robots, sitemap, JSON/NDJSON paths are therefore compatible with GitHub Project Pages.

## Data validation

`schema/event.schema.json` enforces required bilingual fields, taxonomies, date formats, source/artifact shapes, verification fields, and relationship arrays.

`scripts/validate-events.mjs` adds cross-record checks that JSON Schema alone cannot express cleanly:

- duplicate Event ID;
- duplicate slug;
- missing S1/S2 authoritative source;
- `last_updated < added_to_chronicle`;
- self-referential relationships;
- relationships to missing Event IDs.

The validator reports shared source URLs as warnings because legitimate related records can cite the same paper or announcement.

## Search

Pagefind runs after Astro renders `dist/`. The browser search API is configured with the Project Pages base URL, so result links remain valid under `/ai4math-chronicle/`. The npm Pagefind package uses the extended binary and supports Chinese/Japanese indexing.

## SEO / AI-readable structure

Event pages render semantic, visible sections for date, claim, AI contribution, human contribution, verification, sources, and last review. Each page includes canonical/hreflang metadata plus standard schema.org `Article` and `BreadcrumbList` JSON-LD. The timeline includes `WebSite` JSON-LD.

## Deployment

- `ci.yml` validates/tests/builds pull requests and pushes.
- `deploy-pages.yml` builds and deploys `dist/` only from `main` (plus manual dispatch).
- Repository Settings → Pages remains a human permission gate.
