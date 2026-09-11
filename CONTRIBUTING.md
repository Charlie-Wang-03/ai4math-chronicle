# Contributing to AI4Math Chronicle

**English** · [简体中文](./CONTRIBUTING.zh-CN.md)

AI4Math Chronicle welcomes focused contributions that improve the historical record: source leads, new milestone proposals, factual corrections, stronger evidence, translation fixes, verification updates, and carefully scoped editorial changes.

Implementation and build documentation is intentionally maintained separately. For code changes, use the [Development Guide](./docs/development.md) and [Architecture](./docs/architecture.md). Long-term review cadence, dependency maintenance, and release snapshot policy are defined in the [Maintenance Policy](./docs/maintenance.md). Raw-source discovery and triage are documented in the [Source Intake Workflow](./docs/source-intake.md). AI-assisted maintainer authority and human hard gates are defined in the [GPT Project Governance Protocol](./docs/gpt-project-governance.md).

## Choose the right contribution path

### Submit a source lead

Use the **Source lead** issue form when you found a potentially useful public source but do not yet have a complete milestone proposal. Examples include a new paper, repository, official announcement, independent analysis, artifact replay, media report, or community signal that may deserve follow-up.

A useful source lead should include:

- the most direct public URL;
- the source title and date when known;
- a rough S1–S5 tier if you can infer it;
- what the source might contribute: candidate discovery, evidence for an existing Event, independent corroboration, correction/dispute/provenance review, or historical context;
- any known uncertainty or missing evidence.

Source leads are an editorial inbox, not canonical data. They may be preliminary, duplicated, or ultimately closed without publication. See the [Source Intake Workflow](./docs/source-intake.md) for triage and promotion rules.

### Propose a missing event

Use the **Event proposal** issue form when you believe an important AI4Math milestone is missing and can already describe the event rather than only a raw source. A useful proposal should include:

- the event and date;
- a concise factual claim;
- the AI contribution and human contribution;
- at least one strong primary or official source;
- any independent corroboration, dispute, or important uncertainty;
- a suggested H1/H2/H3 level, if you have one.

Submitting a proposal does not guarantee inclusion. The Chronicle is selective rather than exhaustive.

### Report a correction

Use the **Correction** issue form for factual, sourcing, translation, date, significance, or verification problems.

Corrections are treated as provenance updates. Published history should not be silently rewritten when the underlying evidence changes.

### Report a website problem

Use the **Website bug** issue form for navigation, search, filtering, rendering, accessibility, data-export, or build problems.

## Contribution lifecycle

The default public workflow is intentionally simple and reviewable:

1. Capture a raw source in a **Source lead** Issue when it is worth remembering but not yet ready for Event-level judgment; otherwise open the appropriate Event proposal, correction, or bug Issue directly.
2. A maintainer triages scope, deduplicates the source/event, identifies missing evidence, and determines whether any editorial gate applies.
3. Mature source leads are either attached to an existing canonical Event, promoted into a new candidate Event, kept on watch with a concrete missing trigger, or closed with a disposition note.
4. External contributors normally work from a fork; maintainers may use a focused repository branch.
5. Open a small Pull Request that links the relevant Issue and explains the evidence and remaining uncertainty.
6. CI validates canonical data and the static build.
7. A maintainer completes any required editorial review before merge.

For event data, one event or one tightly related event cluster per PR is preferred.

## Editorial expectations

Before proposing a content change, read the [Editorial Methodology](./docs/editorial-methodology.md).

The main rules are:

- prefer primary research records and official sources;
- every published event must contain at least one S1 or S2 source;
- S5/community attention may discover candidates but cannot by itself support a major research claim;
- keep historical significance separate from event-level verification and from ultimate mathematical correctness;
- state AI and human contributions separately;
- preserve stable Event IDs;
- record verification-status changes in verification history;
- record factual corrections explicitly instead of silently overwriting them;
- keep Source Lead Issues as workflow records rather than a second factual database.

`independently_verified` is an event-level evidence label: use it only when reliable sources independent of the originating claim substantively corroborate the Chronicle's core event description. It must not be presented as a Chronicle certification that the underlying mathematics is ultimately correct.

## Human editorial gates

Automated analysis may collect evidence, prepare the full Event / correction patch, and recommend significance or verification changes. Lower-risk H2/H3 publication and routine verification maintenance may proceed under the documented rules.

Contributions and automation must not unilaterally finalize any of the following without direct human editorial approval unless an already-established human policy explicitly delegates that exact class of decision:

- a new or materially changed **H1 — Historical Milestone** classification;
- `independently_verified`;
- `disputed`;
- `corrected` as the current verification status;
- `retracted`;
- a material mathematical-correctness, attribution, or historical-priority adjudication made on the Chronicle's own authority.

The Chronicle does not adjudicate ultimate mathematical correctness. High-risk historical wording such as “first”, “solves”, “proves”, or “disproves” should be attributed to reliable sources unless the historical fact itself is independently established.

## Pull requests for event data

If you are comfortable editing the canonical YAML directly, keep the pull request small and reviewable.

A content PR should explain:

- what changed;
- why it changed;
- which sources support it;
- what uncertainty remains;
- whether any human editorial gate is triggered.

Technical validation and local build instructions are documented in the [Development Guide](./docs/development.md).

## Community standards

Participation in repository discussions, Issues, reviews, and Pull Requests is governed by the [Code of Conduct](./CODE_OF_CONDUCT.md).

Security or privacy-sensitive problems should follow the [Security Policy](./SECURITY.md) rather than being disclosed with exploit details in a public Issue. Ordinary factual corrections and website bugs should continue to use the structured Issue forms.

Do not submit confidential, private, embargoed, leaked, credential-gated, or otherwise non-public research material through Source Lead Issues. Link public sources and summarize relevance rather than copying full third-party papers or long copyrighted passages.

## Licensing of contributions

By contributing source code, you agree that your contribution may be distributed under the repository's MIT License.

By contributing original Chronicle editorial text or data compilation, you agree that your contribution may be distributed under CC BY 4.0 according to [Content Licensing](./LICENSE-CONTENT.md). Do not submit third-party material that you do not have the right to contribute under the applicable terms.
