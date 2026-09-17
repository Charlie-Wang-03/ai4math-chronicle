# Development Guide

**English** · [简体中文](./development.zh-CN.md)

This document is for contributors working on the website implementation, build pipeline, validation, or repository automation. Reader-facing project introduction belongs in the root README; editorial policy belongs in the Editorial Methodology.

## Technical contract

The v0.1 implementation is intentionally static and GitHub-native:

- Astro + TypeScript;
- static site generation only;
- canonical event data in YAML;
- JSON Schema + semantic validation;
- Pagefind static search;
- GitHub Actions;
- GitHub Pages project-site base path `/ai4math-chronicle/`.

Do not introduce a backend, CMS, account system, database server, vector database, server API, or unnecessary SSR without a future product-specification change.

Auxiliary project URLs, hostname aliases, redirects, mirrors, and deployment notifications are allowed as ordinary engineering infrastructure when they keep the static build and canonical Event source of truth intact and preserve the active canonical origin. A change that moves the canonical site or changes the product architecture remains a separate migration decision.

## Local setup

Requires Node.js `>=22.12.0`.

```bash
npm ci
npm run validate
npm test
npm run dev
```

Production verification:

```bash
npm run build
```

The production build validates canonical YAML, generates machine-readable exports, checks Astro/TypeScript, renders the static site, and builds the Pagefind index.

For reader-interface work, run the focused browser smoke suite against the production build. The suite deliberately uses one pinned Chromium toolchain rather than a broad browser matrix. Playwright is installed ephemerally so it does not become a runtime dependency or change the committed lockfile:

```bash
npm run build
npm install --no-save --package-lock=false @playwright/test@1.55.0
npx playwright install chromium
npm run test:browser
```

CI installs the same pinned Playwright version plus Chromium system dependencies and runs `npm run test:browser` after the normal production build. Browser reports and failure artifacts are local/CI outputs and are not committed.

## Repository areas

```text
data/events/               canonical event records
schema/event.schema.json   Event schema
scripts/                   validation and export generation
src/                       Astro pages, layouts, components and styles
public/                    static public assets
tests/                     data-pipeline and static contract tests
tests/browser/             focused browser-level reader-interface smoke tests
.github/workflows/         CI and Pages deployment
```

## Implementation rules

1. Preserve the single-source-of-truth model: public surfaces derive from canonical event records.
2. Keep all internal links and assets safe under the Project Pages base path.
3. Preserve semantic static HTML and indexable content.
4. Keep JavaScript progressive and optional where practical.
5. Prefer simple static implementations over heavier frameworks or client-side state systems.
6. Do not weaken human editorial gates through automation.
7. Keep PRs focused; avoid mixing unrelated dependency, UI, and editorial changes.

## Validation expectations

CI should remain deterministic and cover at least:

- schema validation;
- duplicate IDs/slugs;
- date and enum validity;
- authoritative source requirements;
- internal relationships;
- generated-data consistency;
- Astro/TypeScript checks;
- static production build;
- Pagefind index build;
- a small real-browser responsive/accessibility smoke gate for critical reader interactions.

The browser smoke gate is intentionally narrow. It protects the compact mobile header, mobile-native Explore layout, keyboard operation and focus visibility for multi-select controls, explicit zero-results recovery, bilingual route switching, theme persistence, key landmarks, and Event Detail in-page navigation. It is not a pixel-diff suite, a full WCAG certification, or a cross-browser compatibility matrix.

External link checking should remain non-flaky and should not become a permanent source of false CI failures.

## Self-hosted mirror

The same `main` build is also published to a self-hosted mirror, served on `history.aixmath.org`, `timeline.aixmath.org`, and `news.aixmath.org`. Those hostnames are convenience aliases, not additional sites: the build keeps `site` at the Pages origin and the published HTML keeps a single canonical origin (`https://charlie-wang-03.github.io/ai4math-chronicle/`), so GitHub Pages remains the canonical, indexed home and the aliases consolidate instead of competing in search. The mirror is built outside this repository and does not change the required Project Pages behaviour: `site`, `base`, and every internal link stay exactly as they are for the Pages build.

`.github/workflows/notify-deploy.yml` sends a signed notification to the mirror's deploy API whenever `main` moves, so the mirror rebuilds from the same commit. It is a notification only: it does not gate CI, it is skipped when the `AI4MATH_DEPLOY_WEBHOOK_SECRET` repository secret is absent, and it is independent of the GitHub Pages deployment.

This mirror and the associated project URLs are explicitly allowed under the active trusted-maintainer engineering policy. Extending or maintaining similar auxiliary URLs does not require a Product Specification change as long as the canonical origin and static architecture remain unchanged.

## UI changes

The product is timeline-first and evidence-first. UI changes should improve discoverability, historical comprehension, evidence access, accessibility, or readability. Avoid cinematic timelines, WebGL, graph visualization, or decorative interaction that makes the archive harder to scan.

For the current architecture, see [Architecture](./architecture.md).

## Licensing

Source-code contributions are accepted under the MIT License. Original Chronicle editorial/data contributions are governed separately by [Content Licensing](../LICENSE-CONTENT.md).