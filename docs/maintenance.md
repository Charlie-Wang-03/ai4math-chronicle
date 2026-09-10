# Maintenance Policy

**English** · [简体中文](./maintenance.zh-CN.md)

This document defines the long-term maintenance rhythm for AI4Math Chronicle after the v0.1.0 public launch. It complements, rather than replaces, the [Editorial Methodology](./editorial-methodology.md), [Development Guide](./development.md), and [Contributing Guide](../CONTRIBUTING.md).

## Maintenance model

AI4Math Chronicle is maintained as a curated historical archive, not a real-time news feed. Maintenance is therefore **event-driven with periodic review**, rather than tied to a daily publishing quota.

The default operating loop is:

1. collect candidate events or corrections through Issues and maintainer research;
2. triage whether the item is in scope and what evidence is still missing;
3. prepare one focused PR per event or tightly related event cluster;
4. run CI and complete any required editorial gate;
5. merge by squash after review;
6. let `main` deploy continuously to GitHub Pages.

There is no guaranteed publication SLA. Accuracy, provenance, and historical selectivity take priority over speed.

## Suggested review cadence

### Event intake — continuous

New candidate milestones may be proposed at any time. Maintainers should process them in batches when practical rather than treating the project as a live news stream.

### Corrections — priority path

Factual errors, broken primary-evidence links, material translation errors, and misleading verification states should be handled ahead of ordinary corpus expansion when the supporting evidence is clear.

### Verification watch — at least monthly when relevant

Events marked `under_verification`, `partially_verified`, `disputed`, or otherwise carrying unresolved material uncertainty should be revisited when credible new evidence appears. As a baseline, active unresolved high-significance claims should receive a lightweight monthly review while they remain live editorial concerns.

A verification update must preserve history rather than silently overwrite it.

### Corpus health review — quarterly

At least once per quarter, review the corpus for:

- stale or broken primary-source links;
- unresolved verification states that may have changed;
- duplicate or overlapping event records;
- relationship integrity;
- taxonomy drift;
- translation drift between `en` and `zh-CN` presentation fields;
- generated-data and search consistency.

The quarterly review is a maintenance target, not a service-level guarantee.

## Editorial gates

The standing human editorial gates remain unchanged. Automation and contributors may propose, but must not unilaterally finalize:

- a new **H1 — Historical Milestone** classification unless explicitly delegated under an established policy;
- `independently_verified`;
- a claim that a new mathematical fact has been established.

Significance, evidence strength, and verification certainty remain separate dimensions.

## Dependency and platform maintenance

Dependabot runs weekly for npm and GitHub Actions.

Routine policy:

- patch and minor dependency updates may be merged after CI and a quick compatibility review;
- runtime or toolchain major upgrades are deliberate migrations, not routine housekeeping;
- GitHub Actions remain pinned to immutable commit SHAs;
- production-impacting workflow changes should be validated by the post-merge GitHub Pages deployment, not only by PR CI.

The current runtime baseline is Node 22 unless intentionally changed through a dedicated migration.

## Release strategy

The website is continuously deployed from `main`, while GitHub Releases provide immutable, citable snapshots of the Chronicle.

Release numbering is **project snapshot versioning, not strict Semantic Versioning for a library API**.

Default interpretation:

- `v0.1.x` — maintenance snapshots within the frozen v0.1 product/editorial contract, including corrections, incremental event additions, metadata, dependency, and UI maintenance that do not require a new product specification;
- `v0.2.0` — a meaningful product/editorial phase change, substantial corpus-program change, or new maintained capability that changes the v0.1 contract without constituting a stable 1.0 milestone;
- `v1.0.0` — reserved for a mature, stable editorial and maintenance model judged ready for long-term public reference.

Do not create a GitHub Release for every merged PR or every new event. Create a snapshot when the accumulated changes are useful to cite, reproduce, or communicate as a coherent state.

Before a release:

1. ensure `main` is green;
2. ensure the production Pages deployment is green;
3. update version-bearing citation metadata when needed;
4. tag the exact intended commit;
5. publish release notes summarizing corpus and governance changes without overstating verification.

Published tags and releases are historical records and should not be moved or rewritten.

## Operational ownership

Until multiple trusted maintainers exist, the repository uses a single-maintainer model:

- external contributors normally work through Issues, forks, and focused PRs;
- `CODEOWNERS` routes sensitive changes for maintainer attention;
- required approvals remain at zero to avoid deadlocking solo maintenance;
- when a second stable maintainer exists, the repository may require one approval and Code Owner review for sensitive paths.

Repository settings should remain intentionally minimal: Issues enabled; Projects, Wiki, and Discussions disabled until real collaboration volume justifies them.

## Definition of healthy maintenance

The project is healthy when:

- canonical Event data remains the single factual source;
- open corrections and unresolved high-significance verification questions are visible rather than hidden;
- CI, CodeQL, and Pages deployment remain green;
- dependency updates are controlled without creating toolchain churn;
- public contribution paths remain usable;
- releases periodically provide citable snapshots without turning the repository into a release-management burden.
