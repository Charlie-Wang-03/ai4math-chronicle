# Deterministic Source Discovery

**English** · [简体中文](./deterministic-source-discovery.zh-CN.md)

This document defines the repeatable discovery layer that runs **before** AI4Math Chronicle's Source Lead triage and canonical Event workflow.

It addresses a specific operational weakness: broad web discovery performed only through a probabilistic language-model search session is difficult to replay. Search queries may be reformulated, rankings and indexes change, returned subsets vary, and the exact coverage boundary is often invisible. That makes a chat transcript a poor long-term record of what was actually scanned.

The objective here is not to eliminate editorial judgment. It is to make the **candidate enumeration step** more observable and reproducible so AI and humans reason over a known input set.

## Discovery hierarchy

Use discovery channels in this order:

1. **Versioned deterministic machine channels** — currently fixed arXiv API queries plus official RSS / Atom feeds in [`config/source-channels.yaml`](../config/source-channels.yaml).
2. **Versioned direct-source checklist** — official lab/research surfaces and independent technical sources that do not expose a verified machine-readable feed.
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
- exact machine query, official feed endpoint, or direct URL;
- per-channel result cap where relevant;
- notes and optional tracking Issue.

Changing a query or machine endpoint changes the discovery policy and therefore belongs in a normal reviewable commit / PR. Historical scan artifacts retain a SHA-256 of the registry used for that run.

## Machine scan: arXiv

The `arxiv_api` adapter constructs a fixed request from:

- the exact version-controlled query;
- an explicit inclusive `submittedDate` window;
- `start=0`;
- an explicit maximum result count;
- `sortBy=submittedDate`;
- `sortOrder=descending`.

The scanner waits between repeated arXiv API requests by default and identifies itself with a project User-Agent.

Current arXiv lanes cover:

- formal mathematics / theorem proving / autoformalization;
- mathematical reasoning with language models or agents;
- AI-assisted mathematical discovery / conjecture generation.

These lanes intentionally favor recall over automatic publication precision. A result appearing in the scan is only a candidate for triage.

## Machine scan: official RSS / Atom feeds

The `rss_atom` adapter directly reads a feed URL that has been verified as an official source. The first such channel is OpenAI's News RSS endpoint, which is linked from OpenAI's own News site.

The feed scanner:

- captures the complete upstream response available at scan time;
- filters parsed items into the requested date window;
- normalizes item URLs before comparing them with canonical Event sources / artifacts;
- records the response SHA-256, upstream item count, in-window count and local cap;
- emits official-feed items separately from arXiv candidates so source type remains explicit.

An official RSS item is an S2 official record, **not** an AI4Math relevance judgment. Broad feeds may contain Product, Company, Safety, policy and other unrelated items; retain high recall and triage them downstream rather than using probabilistic model scoring to silently delete them.

RSS / Atom replay also has a different coverage boundary from a queryable API: a date filter can only operate over entries the upstream feed currently exposes. Therefore the report explicitly states that completeness is bounded by upstream feed retention / history. Capturing a response hash makes a run auditable; it does not prove the provider exposed every historical item for the requested window.

Do not guess undocumented feed URLs. A lab remains on the direct manual checklist until an official machine-readable endpoint is verified.

## Running scans locally

Use the same explicit date interval for both machine layers:

```bash
npm run scan:sources -- --start 2026-09-01 --end 2026-09-11
npm run scan:feeds -- --start 2026-09-01 --end 2026-09-11
```

Optional controls:

```bash
npm run scan:sources -- \
  --start 2026-09-01 \
  --end 2026-09-11 \
  --max-results 120 \
  --output source-scan-output

npm run scan:feeds -- \
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

- `source-scan.json` / `source-scan.md` — arXiv scan evidence;
- `official-feed-scan.json` / `official-feed-scan.md` — official RSS / Atom scan evidence.

This provides a durable evidence package for later maintainer or AI-assisted review without committing transient scan results into the repository.

## Audit fields and coverage diagnostics

Machine scan evidence records, as applicable:

- exact start and end dates;
- generation timestamp;
- registry SHA-256;
- exact request URL or official feed endpoint;
- maximum results requested;
- number of records returned / present upstream;
- SHA-256 of each upstream response;
- cap / truncation diagnostics;
- normalized metadata;
- canonical-corpus matches;
- direct manual channels that still require explicit inspection.

For arXiv, if a channel reaches its configured result cap, treat coverage as unresolved: rerun with a shorter date interval or a higher permitted cap. For RSS / Atom, treat the provider's exposed feed history as an explicit upstream coverage limit even when the local cap is not reached.

A successful HTTP request is never, by itself, evidence that every relevant AI4Math development has been enumerated.

## What deterministic means here

The scanners reduce several avoidable uncertainties:

- hidden LLM query reformulation;
- stochastic result selection;
- opaque ranking choices;
- forgotten date boundaries;
- invisible local result caps;
- loss of the exact discovery input after a chat ends.

They do **not** guarantee completeness. Coverage still depends on:

- explicit query design;
- upstream indexing and metadata;
- provider feed retention;
- sources that are not represented in current machine channels;
- changes in the field's terminology;
- direct-source channels that remain manual.

The correct interpretation is therefore:

> deterministic and auditable candidate enumeration, not exhaustive knowledge of AI4Math.

## Relationship to Source Lead intake

The output is upstream of [`source-intake.md`](./source-intake.md):

```text
versioned source registry
→ deterministic arXiv/API + official-feed scans + direct-source checklist
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
- finding the direct primary artifact behind an aggregator or official announcement;
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
- guessed or third-party feed proxies for labs without a verified official feed;
- semantic embedding search;
- LLM relevance scoring as a publication gate;
- automatic Source Lead creation;
- automatic Event creation or publication.

Additional verified official feed adapters may be added as ordinary source-maintenance improvements when they remain inside the approved v0.1.x mainline. Any materially broader autonomous publication system would require separate product/governance review.
