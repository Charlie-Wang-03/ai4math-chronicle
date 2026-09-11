# Deterministic Source Discovery

**English** · [简体中文](./deterministic-source-discovery.zh-CN.md)

This document defines the repeatable discovery layer that runs **before** AI4Math Chronicle's Source Lead triage and canonical Event workflow.

It addresses a specific operational weakness: broad web discovery performed only through a probabilistic language-model search session is difficult to replay. Search queries may be reformulated, rankings and indexes change, returned subsets vary, and the exact coverage boundary is often invisible. That makes a chat transcript a poor long-term record of what was actually scanned.

The objective here is not to eliminate editorial judgment. It is to make the **candidate enumeration step** more observable and reproducible so AI and humans reason over a known input set.

## Discovery hierarchy

Use discovery channels in this order:

1. **Versioned deterministic machine channels** — currently the arXiv API queries in [`config/source-channels.yaml`](../config/source-channels.yaml).
2. **Versioned direct-source checklist** — official lab/research surfaces and independent technical sources listed in the same registry.
3. **Auxiliary discovery signals** — for example AI4Math Radar, community discussion, social media, or other S5 surfaces.
4. **Probabilistic web search / LLM search** — use for gap filling, following a named lead, locating an independent source, or investigating a known uncertainty; do not treat it as the only baseline enumeration method.

A result found by any channel still has to pass the normal scope, significance, evidence, deduplication, and governance rules.

## Versioned channel registry

`config/source-channels.yaml` is an **operational discovery configuration**, not a second factual database.

Each channel records enough information to make the collection strategy inspectable:

- stable channel ID;
- whether it is enabled;
- `machine` or `manual` mode;
- adapter type;
- default source-tier expectation;
- editorial purpose;
- exact machine query or direct URL;
- per-channel result cap where relevant;
- notes and optional tracking Issue.

Changing a query changes the discovery policy and therefore belongs in a normal reviewable commit / PR. Historical scan artifacts retain a SHA-256 of the registry used for that run.

## R0 machine scan: arXiv

The first machine adapter uses the public arXiv API. The scanner constructs a fixed request from:

- the exact version-controlled query;
- an explicit inclusive `submittedDate` window;
- `start=0`;
- an explicit maximum result count;
- `sortBy=submittedDate`;
- `sortOrder=descending`.

The scanner waits between repeated arXiv API requests by default and identifies itself with a project User-Agent.

Current machine lanes cover:

- formal mathematics / theorem proving / autoformalization;
- mathematical reasoning with language models or agents;
- AI-assisted mathematical discovery / conjecture generation.

These lanes intentionally favor recall over automatic publication precision. A result appearing in the scan is only a candidate for triage.

## Running a scan locally

Use an explicit date interval:

```bash
npm run scan:sources -- --start 2026-09-01 --end 2026-09-11
```

Optional controls:

```bash
npm run scan:sources -- \
  --start 2026-09-01 \
  --end 2026-09-11 \
  --max-results 120 \
  --output source-scan-output
```

The default output directory is ignored by Git because scan output is operational evidence, not canonical corpus data.

## Running through GitHub Actions

Use **Actions → Deterministic Source Scan → Run workflow** and supply:

- `start_date`;
- `end_date`;
- optional `max_results`.

The workflow is deliberately **manual-only** in v0.1.x. It does not run on a schedule and it does not create Issues, branches, PRs, or canonical Events.

The workflow uploads a 30-day artifact containing:

- `source-scan.json` — structured scan evidence;
- `source-scan.md` — human-readable triage report.

This provides a durable evidence package for later maintainer or AI-assisted review without committing transient scan results into the repository.

## Audit fields and coverage diagnostics

Every scan records:

- exact start and end dates;
- generation timestamp;
- registry SHA-256;
- exact request URL for each machine channel;
- maximum results requested;
- number of records returned;
- SHA-256 of each upstream response;
- a `possible_truncation` flag when a channel reaches its configured cap;
- normalized arXiv metadata and the machine channels that matched it;
- whether an arXiv identifier is already cited by a canonical Event;
- the direct manual channels that still require explicit inspection.

If a channel reaches its cap, treat coverage as unresolved: rerun with a shorter date interval or a higher permitted cap. A successful HTTP request is not evidence that the whole intended interval was enumerated.

## What deterministic means here

The scanner reduces several avoidable uncertainties:

- hidden LLM query reformulation;
- stochastic result selection;
- opaque ranking choices;
- forgotten date boundaries;
- invisible result caps;
- loss of the exact discovery input after a chat ends.

It does **not** guarantee completeness. Coverage still depends on:

- the explicit query design;
- upstream indexing and metadata;
- sources that are not represented in arXiv;
- changes in the field's terminology;
- direct-source channels that remain manual in R0.

The correct interpretation is therefore:

> deterministic and auditable candidate enumeration, not exhaustive knowledge of AI4Math.

## Relationship to Source Lead intake

The output is upstream of [`source-intake.md`](./source-intake.md):

```text
versioned source registry
→ deterministic scan + direct-source checklist
→ known candidate set
→ deduplication / triage
→ Source Lead when a lead needs durable follow-up
→ Event proposal or focused Event PR when evidence is mature
→ canonical data/events/*.yaml
```

Do not open one Source Lead per machine result automatically. Triage first. Source Leads exist for items worth remembering or acting on, not as a mirror of an external feed.

## Role of AI after this change

AI remains useful for:

- clustering duplicate papers and announcements into one event hypothesis;
- screening likely scope and significance;
- finding the direct primary artifact behind an aggregator result;
- locating independent corroboration for a named candidate;
- extracting structured metadata;
- drafting bilingual Event records;
- identifying uncertainty and contradictory evidence.

The important boundary is that AI no longer has to be the sole mechanism deciding which recent sources exist. Whenever a deterministic or direct channel covers the task, use that channel first and let the model operate **after enumeration**.

## R0 non-goals

This implementation does not add:

- a backend or source database;
- a scheduled crawler;
- scraping of every lab website;
- semantic embedding search;
- LLM relevance scoring as a publication gate;
- automatic Source Lead creation;
- automatic Event creation or publication.

Additional stable feed adapters may be added later as ordinary source-maintenance improvements when they remain inside the approved v0.1.x mainline. Any materially broader autonomous publication system would require separate product/governance review.
