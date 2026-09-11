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
        │   ├── Standards & Methodology
        │   ├── Use & Contribute
        │   └── Data & Feeds
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

Pagefind runs after Astro renders `dist/`. Its CLI glob indexes only bilingual Event Detail routes under `**/events/**/*.html`, so Timeline, Explore, Standards & Methodology, Use & Contribute, Data & Feeds, and other non-Event pages never appear as search results. The browser search API is configured with the Project Pages base URL, so result links remain valid under `/ai4math-chronicle/`. The npm Pagefind package uses the extended binary and supports Chinese/Japanese indexing.

Event Detail pages expose Pagefind filter metadata derived from the canonical record. The indexed facets now include year, event type, significance, verification status, system, AI role, interface, evidence level, formal assurance, mathematical novelty, organization, person, problem, method, source type, artifact type, and tags. Text search and structured facets therefore resolve through one Pagefind query rather than through independent result sets.

All user-facing filter controls are multi-select. Within one facet, selected values use OR semantics; different facets combine with AND semantics. For example, `H1 + H2` and `Lean + Isabelle` means `(H1 OR H2) AND (Lean OR Isabelle)`. The client sends these groups to Pagefind with compound `any` filters and mirrors the same semantics in the local fallback path.

Canonical taxonomy identifiers remain the values used by YAML, `data-*` attributes, Pagefind filters, and shareable URL query parameters. Reader-facing surfaces resolve those identifiers through the centralized bilingual presentation layer in `src/lib/presentation.ts`, so machine-stable values such as `under_verification` or `ai_primary_human_verified` do not have to appear as final interface copy.

The UI separates two discovery modes:

- **Timeline:** chronological reading remains the primary product surface. Full-text search plus multi-select event type and significance provide only lightweight refinement and never reorder history. Year controls are true in-page chronology anchors that jump to the first record for a year rather than duplicating filter state. Year filtering, verification filtering, and richer cross-field combinations are intentionally delegated to Explore.
- **Explore:** targeted retrieval and comparison. Full-text search, basic multi-select facets, advanced facets, sorting, removable per-value condition chips, and URL query state operate on one event result set. Advanced facets are grouped into four semantic sections—Event attributes, AI & mathematics, Actors & objects, and Evidence & verification—so the richer query surface remains scannable as the corpus grows.

Explore persists multi-select state with repeatable URL query parameters, so a filtered view can be shared or revisited without a backend. The interaction remains entirely static and client-side.

Responsive presentation does not create parallel data or result surfaces. At compact widths, the primary header progressively collapses behind an accessible menu button when JavaScript is available, while the complete navigation remains visible as the no-JS fallback. Explore keeps one semantic result table for filtering and sorting; CSS reflows those same rows into stacked result cards at phone/tablet widths, preserving table headers for assistive technology and avoiding horizontal panning for the main retrieval task.

## Public information architecture

The reader-facing hierarchy intentionally separates product discovery, trust interpretation, and practical use / participation:

- **Timeline + Explore are the primary product surfaces.** Timeline answers “what happened over time?” while Explore answers “which events match these conditions?”.
- **Standards & Methodology is the trust and interpretation layer.** It explains inclusion, significance, source tiers, evidence levels, verification semantics, formal assurance, uncertainty, and correction principles. It explains why the Chronicle is correctable, but practical submission actions are routed to Use & Contribute instead of being duplicated here.
- **Use & Contribute is the top-level action layer.** It concentrates the practical ways to use the Chronicle in research, access citation and release metadata, reuse machine-readable data and AI workflows, or participate through source leads, event proposals, corrections, and website contributions.
- **Data & Feeds remains a specialized utility surface.** It owns export formats, feeds, Quick Start examples, version guidance, licensing, and canonical-record access without competing with the main reading modes.

Accordingly, the primary header contains Timeline, Explore, Standards & Methodology, Use & Contribute, and GitHub. Data & Feeds remains reachable from the use page and footer rather than becoming a peer reading mode. The homepage hero continues to prioritize Explore and Standards & Methodology, while the dedicated `/use/` page owns citation, machine reuse, and public contribution actions so the Timeline stays focused on historical reading.

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
