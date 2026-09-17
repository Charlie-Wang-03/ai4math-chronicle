# AI4Math Chronicle — Product Specification v0.1 Public Entrypoints Amendment

**Status:** Ratified trusted-maintainer-approved amendment  
**Approved by:** `@Charlie-Wang-03`  
**Approved on:** 2026-09-17  
**Scope:** Public product entrypoints, promotional URL roles, and reserved `news.aixmath.org` namespace

This document amends the frozen [`product-spec-v0.1.md`](./product-spec-v0.1.md) where the rules below are more specific than the original MVP hosting wording. All other active v0.1 product, editorial, data-model, governance, and human-gate rules remain in force.

This amendment does **not** create a new product phase and does not authorize the future AI4Math News product described below. It records the approved public-entrypoint topology for the existing Chronicle.

## 1. Three peer public entrypoints for AI4Math Chronicle

AI4Math Chronicle has three approved **peer public entrypoints for product communication and user access**:

1. `https://charlie-wang-03.github.io/ai4math-chronicle/`
2. `https://history.aixmath.org/`
3. `https://timeline.aixmath.org/`

From a product-promotion perspective, none of these three should be described as a secondary, unofficial, fallback, or merely incidental URL. Maintainers may use any of them in project promotion, sharing, onboarding, or public communication.

`history.aixmath.org` and `timeline.aixmath.org` are two memorable Chronicle-facing names for the same underlying product and canonical Event corpus. They do **not** create separate editorial databases, separate timelines, or divergent factual copies.

## 2. Product-entrypoint parity is distinct from SEO canonicalization

Peer product entrypoints do not require multiple competing HTML canonical origins.

Until a later explicit canonical-domain migration decision changes the technical SEO contract:

- the static build may continue emitting the existing GitHub Pages canonical URLs;
- sitemap, structured metadata, IndexNow, machine-readable canonical URLs, and other search-engine consolidation mechanisms may continue using the GitHub Pages URL scope;
- `history.aixmath.org` and `timeline.aixmath.org` remain fully approved public entrypoints even when their rendered pages canonicalize to the GitHub Pages URL.

This distinction is deliberate:

> **Product-facing entrypoint parity does not imply duplicate SEO canonical authority.**

A future decision may move canonical indexing to an `aixmath.org` hostname, but that is a separate product / SEO migration decision and is not implied by this amendment.

## 3. `news.aixmath.org` is reserved for a future AI4Math News surface

`https://news.aixmath.org/` is **not** a current AI4Math Chronicle public entrypoint.

The hostname is reserved for a possible future AI4Math news product inspired by high-quality AI-news aggregation patterns such as AIHOT. This reservation only protects the URL role; it does not approve implementation, scope, editorial cadence, architecture, data model, or launch of that future product.

Until such a product receives a separate explicit decision:

- do not promote `news.aixmath.org` as a Chronicle URL;
- do not treat it as one of the Chronicle's peer public entrypoints;
- infrastructure may keep the hostname parked, redirected to a neutral placeholder, or otherwise reserved, but should not create a misleading impression that an AI4Math News product already exists.

## 4. Architecture and source-of-truth invariants

This amendment does not change the existing v0.1 architectural invariants:

- canonical Event YAML remains the single factual source of truth;
- the Chronicle remains a static Astro + TypeScript product;
- the same Chronicle content may be delivered through multiple approved entrypoints without creating parallel factual copies;
- backend, CMS, account-system, and other major architecture changes remain separately gated;
- GitHub Pages remains an active production deployment even though it is no longer the only peer product-facing entrypoint.

## 5. Promotion and documentation rule

Public project documentation should present the Chronicle's entrypoints consistently:

```text
AI4Math Chronicle
├── GitHub Pages      https://charlie-wang-03.github.io/ai4math-chronicle/
├── History entry     https://history.aixmath.org/
└── Timeline entry    https://timeline.aixmath.org/

Reserved for future product
└── AI4Math News      https://news.aixmath.org/
```

Reader-facing or contributor-facing documentation may still use the GitHub Pages URL when a stable canonical deep link is technically useful. That does not make the other two approved product entrypoints subordinate from a promotional perspective.

## 6. Unchanged product boundaries

This amendment does **not** change:

- timeline-first, evidence-backed positioning;
- the canonical Event principle;
- Timeline / Search & Explore / Event Detail / Standards & Methodology / About roles;
- inclusion, significance, source, evidence, verification, or formal-assurance models;
- the bilingual canonical strategy;
- existing human hard gates;
- the rule that a new major product family or phase requires an explicit trusted-maintainer decision.
