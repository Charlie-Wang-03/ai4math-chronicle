# AI4Math Chronicle — Product Specification v0.1 R0 Amendment

**Status:** Ratified owner-approved amendment  
**Approved by:** Project owner  
**Approved on:** 2026-09-12  
**Scope:** Product-coherence decisions from Baseline Product Audit R0

This document amends the frozen [`product-spec-v0.1.md`](./product-spec-v0.1.md) where the R0 decisions below are more specific or directly conflict with the original MVP wording. All other v0.1 product, editorial, architecture, audience, data-model, and human-review rules remain in force.

The amendment does **not** create a new product phase. It reconciles the post-launch v0.1.x reader experience with the owner-approved product model.

## 1. Discovery model

The two primary discovery surfaces have distinct jobs:

> **Timeline = browse history.**  
> **Search & Explore = find events.**

### 1.1 Timeline

Timeline remains the primary product surface and preserves chronological order.

It supports:

- chronological browsing;
- full-text event search without reordering chronology;
- lightweight multi-select refinement by event type and significance;
- year-level chronology navigation through in-page year anchors;
- responsive mobile reading;
- stable Event deep links.

Year controls are navigation, not duplicate filter state. Verification filtering and richer cross-field queries belong to Search & Explore rather than Timeline.

This supersedes the original §20 and §34 wording that required Timeline itself to filter by year / category / significance / verification.

### 1.2 Search & Explore

Search & Explore is the structured retrieval surface.

It supports:

- full-text event search;
- year and event-type filters;
- richer structured facets;
- multi-select OR-within-facet / AND-across-facets semantics;
- shareable URL query state;
- explicit sorting and event comparison.

Default sorting is contextual:

- with no text query: **Newest first**;
- with a text query: **Relevance**;
- an explicit user-selected sort overrides the contextual default and is preserved.

Search & Explore must remain a persistent, obvious top-level discovery entry so a reader arriving directly on an Event Detail page can return to corpus-level discovery without first learning the site architecture.

## 2. Facet discipline

The existing advanced Explore facet set is sufficient for the current v0.1.x product.

New schema fields must **not** automatically become reader-facing filters merely because the data exists. A new facet requires a concrete user job or retrieval need that justifies the added interaction and cognitive cost.

This is a product guardrail, not a prohibition on future justified facets.

## 3. Event Detail information hierarchy

Event Detail follows an **insight-first, evidence-backed** hierarchy.

The primary reading path is:

```text
Title / Date / concise summary
↓
What happened?
↓
Why it matters
↓
Historical context
↓
Primary evidence
↓
Evidence & status at a glance
↓
Detailed contribution / verification / technical record
```

Historical context should expose the canonical relationship fields early enough to support the product goal of `Time to Historical Context < 60s`.

Significance, verification status, evidence level, AI role, and formal assurance remain visible and readily accessible, but they should not require a new reader to interpret the Chronicle's full internal trust taxonomy before understanding the event itself.

All canonical evidence, contribution, source, artifact, verification-history, relationship, and correction material remains visible semantic HTML. This amendment changes presentation hierarchy, not the underlying Event model or verification semantics.

This supersedes the original §22 ordering that placed status / evidence / AI role / significance before `What happened?`.

## 4. Trust interpretation

**Standards & Methodology** remains the canonical reader-facing explanation of:

- inclusion and exclusion;
- H1–H3 significance;
- S1–S5 source tiers;
- E0–E4 evidence levels;
- verification status;
- formal assurance;
- uncertainty and dispute handling;
- correction semantics.

Core reading surfaces should show the trust information needed for the current decision and link to Standards & Methodology for the full model rather than repeatedly reproducing the complete taxonomy.

## 5. Public information architecture

The top-level reader model is:

```text
Timeline              → browse history
Search & Explore      → find and compare events
Standards & Methodology → interpret trust and editorial rules
About                 → understand the project, use it, reuse it, and contribute
GitHub                → inspect the open project
```

### 5.1 About

The former **Use & Contribute** responsibility is retained and promoted into the broader **About / 关于** surface.

About owns:

- what AI4Math Chronicle is and is not;
- how Timeline, Search & Explore, and Standards & Methodology differ;
- research citation and reproducible release snapshots;
- machine-readable data and AI workflow entry points;
- public contribution and correction paths;
- open-source project, licensing, and long-term-maintenance orientation.

A legacy `/use/` route may remain as a compatibility alias, but `/about/` is the canonical reader-facing route and sitemap entry.

This refines the original §18 `Methodology / About` placeholder into a distinct trust surface plus a distinct project-orientation surface.

## 6. Unchanged constitutional boundaries

R0 does **not** change:

- the timeline-first, evidence-backed positioning;
- Primary Audience definitions;
- inclusion / exclusion scope;
- H1–H3 significance semantics;
- S1–S5 source model;
- E0–E4 evidence model;
- verification-state semantics;
- formal-assurance semantics;
- the canonical Event model;
- bilingual canonical strategy;
- static GitHub Pages architecture;
- backend / CMS / account / vector-search / chatbot non-goals;
- human hard gates for H1, high-risk verification states, mathematical-correctness / priority disputes, or governance changes.

The core principle remains:

> **One event, one canonical record, many ways to consume it.**
