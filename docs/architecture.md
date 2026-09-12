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
        │   ├── Search & Explore
        │   ├── Event detail
        │   ├── Standards & Methodology
        │   ├── About
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

Pagefind runs after Astro renders `dist/`. Its CLI glob indexes only bilingual Event Detail routes under `**/events/**/*.html`, so Timeline, Search & Explore, Standards & Methodology, About, Data & Feeds, and other non-Event pages never appear as search results. The browser search API is configured with the Project Pages base URL, so result links remain valid under `/ai4math-chronicle/`. The npm Pagefind package uses the extended binary and supports Chinese/Japanese indexing.

Event Detail pages expose Pagefind filter metadata derived from the canonical record. The indexed facets include year, event type, significance, verification status, system, AI role, interface, evidence level, formal assurance, mathematical novelty, organization, person, problem, method, source type, artifact type, and tags. Text search and structured facets therefore resolve through one Pagefind query rather than through independent result sets.

All user-facing filter controls are multi-select. Within one facet, selected values use OR semantics; different facets combine with AND semantics. For example, `H1 + H2` and `Lean + Isabelle` means `(H1 OR H2) AND (Lean OR Isabelle)`. The client sends these groups to Pagefind with compound `any` filters and mirrors the same semantics in the local fallback path.

Canonical taxonomy identifiers remain the values used by YAML, `data-*` attributes, Pagefind filters, and shareable URL query parameters. Reader-facing surfaces resolve those identifiers through the centralized bilingual presentation layer in `src/lib/presentation.ts`, so machine-stable values such as `under_verification` or `ai_primary_human_verified` do not have to appear as final interface copy.

The UI separates two discovery modes:

- **Timeline:** chronological reading remains the primary product surface. Full-text search plus multi-select event type and significance provide only lightweight refinement and never reorder history. Year controls are true in-page chronology anchors that jump to the first record for a year rather than duplicating filter state. Year filtering, verification filtering, and richer cross-field combinations are intentionally delegated to Search & Explore.
- **Search & Explore:** targeted retrieval and comparison. Full-text search, basic multi-select facets, advanced facets, sorting, removable per-value condition chips, and URL query state operate on one event result set. With no text query the contextual default is newest-first; once a text query is present it changes to relevance unless the reader explicitly selected another sort. Advanced facets are grouped into four semantic sections—Event attributes, AI & mathematics, Actors & objects, and Evidence & verification—so the richer query surface remains scannable as the corpus grows.

The top-level navigation names the second mode **Search & Explore** so corpus-level discovery remains obvious even to readers who arrive directly on an Event Detail page. This is a route to the existing static retrieval surface, not a second search implementation.

Search & Explore persists multi-select state with repeatable URL query parameters, so a filtered view can be shared or revisited without a backend. Explicit user-selected sort state is also preserved. The interaction remains entirely static and client-side.

The current advanced facet set is intentionally treated as sufficient for v0.1.x. New schema fields do not automatically become reader-facing filters; a new facet should be added only when a concrete user retrieval job justifies the interaction and cognitive cost.

Reader-facing Event Cards use an explicit metadata hierarchy rather than presenting every taxonomy dimension as an equal pill. The title leads the card; significance and verification are the two primary status badges; event type and evidence level are quieter secondary metadata. Primary-evidence shortcuts remain one-click links, but each shortcut combines the bilingual source type with the concrete canonical source title so multiple papers, repositories, or announcements are distinguishable before navigation. When Timeline or Search & Explore filters hide every Event, the result surface is replaced by a bilingual empty state with a direct reset path; Search & Explore additionally points readers back to its removable active-condition chips.

Event Detail uses static progressive disclosure and an **insight-first, evidence-backed** reading order rather than hiding canonical material or forcing readers to decode trust taxonomy first. The header gives date, title, and a concise summary. The primary `Start here` path is `What happened?` → `Why it matters` → `Historical context` → `Primary evidence`. Historical context is generated directly from canonical predecessor / successor / related relationships so the product's historical-comprehension value appears early in the reading flow. A compact **Evidence & status at a glance** section then summarizes significance, verification, evidence level, AI role, and formal assurance before the detailed contribution, technical, source, verification-history, and correction record.

Every major Event Detail section has a stable in-page anchor. On wide screens the section navigator is sticky; on compact layouts it returns to normal document flow and wraps without horizontal panning. All event prose, evidence, verification history, relationships, artifacts, and corrections remain visible semantic HTML for accessibility, SEO, GEO, and Pagefind.

Responsive presentation does not create parallel data or result surfaces. At compact widths, the primary header progressively collapses behind an accessible menu button when JavaScript is available, while the complete navigation remains visible as the no-JS fallback. Search & Explore keeps one semantic result table for filtering and sorting; CSS reflows those same rows into stacked result cards at phone/tablet widths, preserving table headers for assistive technology and avoiding horizontal panning for the main retrieval task.

## Public information architecture

The reader-facing hierarchy intentionally separates historical browsing, targeted retrieval, trust interpretation, and project orientation:

- **Timeline is the primary historical-browsing surface.** It answers “what happened over time?” and protects chronology.
- **Search & Explore is the targeted retrieval surface.** It answers “which events match these conditions?” and is exposed persistently in the primary navigation.
- **Standards & Methodology is the trust and interpretation layer.** It explains inclusion, significance, source tiers, evidence levels, verification semantics, formal assurance, uncertainty, and correction principles. Core surfaces show the trust metadata necessary for reading an event and point here for the complete model rather than duplicating the full taxonomy.
- **About is the project-orientation and action layer.** It explains what the Chronicle is, how its core surfaces differ, how to cite or reuse it, and how to participate through source leads, event proposals, corrections, and website contributions. It retains the former Use & Contribute responsibilities inside a broader About role.
- **Data & Feeds remains a specialized utility surface.** It owns export formats, feeds, Quick Start examples, version guidance, licensing, and canonical-record access without competing with the main reading modes.

Accordingly, the primary header contains Timeline, Search & Explore, Standards & Methodology, About, and GitHub. Data & Feeds remains reachable from About and the footer rather than becoming a peer reading mode. `/about/` is the canonical project-orientation route; the former `/use/` routes remain compatibility aliases that render the same About surface but are omitted from the sitemap and canonicalize to `/about/`.

The homepage hero continues to prioritize Search & Explore and Standards & Methodology while the Timeline remains immediately browsable below it. The interaction model follows an information-dense publication pattern: understand the historical surface first, retrieve more precisely when needed, then inspect event-level evidence and trust details. Reader theme preference is a lightweight client-side enhancement with Light, Dark, and System modes; it does not change content or routing.

## SEO / GEO / AI-readable structure

Event pages render semantic, visible sections for date, claim, historical context, AI contribution, human contribution, verification, sources, and last review. Each page includes canonical and hreflang metadata plus schema.org `Article` and `BreadcrumbList` JSON-LD. The timeline includes `WebSite` JSON-LD.

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
