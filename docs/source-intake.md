# Source Intake Workflow

**English** · [简体中文](./source-intake.zh-CN.md)

This document defines how AI4Math Chronicle captures **raw source leads** before they mature into Event proposals or canonical Event evidence.

It complements the [Editorial Methodology](./editorial-methodology.md), [Maintenance Policy](./maintenance.md), [Contribution Guide](../CONTRIBUTING.md), and [GPT Project Governance Protocol](./gpt-project-governance.md). It does not change the frozen Event model, source tiers, significance framework, verification framework, or human hard gates.

## Why a separate source-intake step exists

Chronicle has two different editorial objects that should not be conflated:

1. **Source lead** — a paper, repository, announcement, independent analysis, replay, media report, community discussion, or other public source that may matter but has not yet been resolved into an Event-level editorial judgment.
2. **Event proposal / canonical Event** — an event hypothesis with a date, factual claim, AI/human contribution, significance rationale, evidence set, deduplication decision, and verification state.

The public Event proposal form is intentionally demanding because published Chronicle entries are selective. A maintainer or contributor may nevertheless discover useful evidence before enough context exists to propose an Event. Without a durable intake step, those leads can disappear in browser tabs, chat history, or ad-hoc research notes.

The Source Lead Issue form provides that durable GitHub-native inbox.

## Current implementation

Use the structured **Source lead / 信源线索** Issue form for a raw source that is worth triaging but is not yet a complete Event proposal.

Source Lead Issues use the title prefix:

```text
[Source]
```

and the existing `editorial-review` label. They are operational records, not canonical factual data.

The form captures:

- source title and direct public URL;
- publication / observation date when known;
- likely S1–S5 tier;
- likely editorial role;
- an optional existing Event / Issue link;
- why the source may matter;
- uncertainty or missing evidence;
- duplicate, privacy, and S5-boundary checks.

The submitted tier is only a triage hint. Maintainers remain responsible for assigning the source tier used in canonical Event data.

## Two intake paths

### Use a Source Lead when

- you found a potentially important paper, repository, announcement, analysis, replay, or discussion;
- it may update an existing Event but you have not yet established exactly how;
- it may imply a new candidate Event but significance / scope is still unclear;
- it is an S5 discovery signal that needs stronger sourcing;
- a provenance, attribution, correction, or dispute signal needs investigation before any canonical change.

### Use an Event Proposal when

You can already identify most of the following:

- the candidate event and event date;
- a concise factual claim;
- the AI contribution and human contribution;
- at least one strong S1 or S2 source, or a clear equivalent authoritative record;
- known independent corroboration / dispute / uncertainty;
- a plausible H1/H2/H3 recommendation.

Maintainers do not need to open an intermediate Event Proposal Issue when research has already reached the canonical-draft stage; they may proceed directly from a Source Lead to a focused Event PR when governance permits.

## Triage procedure

For each Source Lead, process the following steps.

### 1. Deduplicate the source

Search:

- `data/events/*.yaml` for the exact URL, source title, organization, author, system, or problem;
- open and closed `[Source]` Issues;
- Event proposal and correction Issues;
- recent PRs where the source may already have been incorporated.

The same source URL may legitimately support multiple related Events, so URL reuse is not automatically a duplicate. The triage question is whether the **lead and editorial action** are already represented.

### 2. Normalize the source role

Classify the lead under the existing source hierarchy:

- **S1** — primary research record or artifact;
- **S2** — official institutional / researcher source;
- **S3** — independent scholarly corroboration, analysis, reproduction, replay, or peer review;
- **S4** — reputable secondary media;
- **S5** — community discovery signal.

Also identify what the source may do editorially:

- discover a new candidate;
- strengthen an existing Event;
- provide independent corroboration or artifact replay;
- trigger a correction / dispute / attribution / provenance / priority review;
- provide historical context or relationships.

### 3. Cluster into an Event, existing record, or watch item

Determine whether the lead belongs to:

- an existing canonical Event;
- an existing candidate / Issue;
- a genuinely new Event candidate;
- an unresolved watch item that is not yet publication-ready;
- an out-of-scope or low-significance item.

Do not create multiple Timeline entries merely because multiple sources discuss the same underlying event.

### 4. Screen scope and significance before deep work

The Candidate Pool can be broad, but expensive evidence collection should concentrate on candidates that plausibly satisfy the frozen inclusion boundary.

S5 attention, citation count, social engagement, or multiple news reports can justify investigation but cannot substitute for mathematical or historical significance evidence.

### 5. Choose a disposition

Use one of these outcomes:

**A. Attach to an existing Event**  
If the source materially strengthens evidence, attribution, provenance, relationships, or correction history, prepare a focused PR under the normal editorial rules. If it does not change the record, close the Source Lead with a short explanation.

**B. Promote to a new Event candidate**  
When the source cluster supports an in-scope event and primary / official evidence is available, continue through deduplication, significance screening, evidence collection, bilingual drafting, and the canonical Event pipeline. Open an Event Proposal when it improves public reviewability; maintainers may also proceed directly to a focused branch / PR when the evidence package is already mature.

**C. Keep on watch**  
Leave the Source Lead open when a concrete missing dependency exists, such as an unavailable paper, pending artifact release, promised independent replay, unresolved institutional response, or insufficient authoritative sourcing. State the missing trigger explicitly so later reviews do not repeat the same search without reason.

**D. Close without publication**  
Close as duplicate, out of scope, insufficiently significant, superseded, or not currently actionable. Preserve a short disposition note and links to the relevant Event / Issue / PR when applicable. Closing a Source Lead does not delete the historical discovery record.

## Promotion boundary: Issues are not a second database

The canonical factual source remains:

```text
data/events/*.yaml
```

Source Lead and Event Proposal Issues are editorial workflow records. They may contain preliminary hypotheses, incomplete metadata, unverified interpretations, or later-superseded links.

A source becomes part of the published Chronicle record only when its normalized metadata is incorporated into a canonical Event or correction through the normal review and validation path.

Therefore:

- do not generate public Event pages directly from Source Lead Issues;
- do not treat an open or closed Source Lead as proof that an Event is true or significant;
- do not maintain a parallel `sources.yaml` or source database containing published factual state;
- preserve Event-level provenance in canonical YAML once a source is used for publication.

## Maintainer search patterns

Useful GitHub searches include:

```text
repo:Charlie-Wang-03/ai4math-chronicle is:issue is:open in:title "[Source]"
repo:Charlie-Wang-03/ai4math-chronicle is:issue is:closed in:title "[Source]"
repo:Charlie-Wang-03/ai4math-chronicle is:issue is:open label:editorial-review
```

Before opening a new Source Lead, also search the repository for the exact source URL.

## AI-assisted collection

AI-assisted maintainers may use web search, scholarly search, GitHub search, official feeds, community discussion, and existing watch Issues for candidate discovery.

The durable handoff rule is:

> If a source is worth remembering for later editorial action but is not yet ready for canonical Event work, persist it as a Source Lead rather than relying on chat history.

AI may autonomously collect, normalize, deduplicate, and triage sources inside the approved maintenance loop. Human hard gates still apply to H1 and high-risk verification / dispute decisions exactly as defined in the Governance Protocol.

## Current automation boundary

The v0.1.x implementation intentionally stops at a GitHub-native intake queue. It does **not** currently run a scheduled crawler that automatically opens Issues from arXiv, RSS, social media, or lab feeds.

A future collector, if ever approved, should feed the same Source Lead boundary rather than publish directly to canonical Events. Autonomous discovery must not become autonomous publication.

## Privacy, copyright, and source hygiene

- Link to public sources and summarize their relevance; do not copy full papers or long copyrighted passages into Issues.
- Do not submit confidential, private, embargoed, leaked, credential-gated, or otherwise non-public material through the public repository.
- Prefer the most direct stable URL available: paper / DOI / official repository / institutional announcement before mirrors or aggregators.
- Record uncertainty explicitly when publication dates, authorship, provenance, or claim scope are not yet established.

## Definition of a healthy intake queue

The source intake process is healthy when:

- useful raw leads do not depend on one maintainer's browser or chat history;
- duplicate searches are cheap;
- each open lead has a concrete reason to remain open;
- closed leads preserve disposition and linkage without polluting the canonical corpus;
- mature evidence moves into canonical Event records rather than accumulating indefinitely in Issues;
- the Event corpus remains selective even if the candidate/source inbox is broad.
