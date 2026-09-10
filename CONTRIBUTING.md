# Contributing to AI4Math Chronicle

**English** · [简体中文](./CONTRIBUTING.zh-CN.md)

AI4Math Chronicle welcomes focused contributions that improve the historical record: new milestone proposals, factual corrections, stronger evidence, translation fixes, verification updates, and carefully scoped editorial changes.

Implementation and build documentation is intentionally maintained separately. For code changes, use the [Development Guide](./docs/development.md) and [Architecture](./docs/architecture.md). Long-term review cadence, dependency maintenance, and release snapshot policy are defined in the [Maintenance Policy](./docs/maintenance.md).

## Choose the right contribution path

### Propose a missing event

Use the **Event proposal** issue form when you believe an important AI4Math milestone is missing. A useful proposal should include:

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

1. Open the appropriate structured Issue when proposing a new event, correction, or bug.
2. A maintainer triages the scope and identifies any editorial gate.
3. External contributors normally work from a fork; maintainers may use a focused repository branch.
4. Open a small Pull Request that links the Issue and explains the evidence and remaining uncertainty.
5. CI validates canonical data and the static build.
6. A maintainer completes any required editorial review before merge.

For event data, one event or one tightly related event cluster per PR is preferred.

## Editorial expectations

Before proposing a content change, read the [Editorial Methodology](./docs/editorial-methodology.md).

The main rules are:

- prefer primary research records and official sources;
- every published event must contain at least one S1 or S2 source;
- keep historical significance separate from event-level verification and from ultimate mathematical correctness;
- state AI and human contributions separately;
- preserve stable Event IDs;
- record verification-status changes in verification history;
- record factual corrections explicitly instead of silently overwriting them.

`independently_verified` is an event-level evidence label: use it only when reliable sources independent of the originating claim substantively corroborate the Chronicle's core event description. It must not be presented as a Chronicle certification that the underlying mathematics is ultimately correct.

## Human editorial gates

Automated analysis may suggest or apply verification updates when the documented evidence rule is satisfied and the supporting sources are recorded. Contributions must not unilaterally finalize **H1 — Historical Milestone** unless the editor has explicitly delegated the classification pass under an established policy.

The Chronicle does not adjudicate ultimate mathematical correctness. High-risk historical wording such as “first”, “solves”, “proves”, or “disproves” should be attributed to reliable sources unless the historical fact itself is independently established.

## Pull requests for event data

If you are comfortable editing the canonical YAML directly, keep the pull request small and reviewable.

A content PR should explain:

- what changed;
- why it changed;
- which sources support it;
- what uncertainty remains;
- whether a human H1 editorial gate is triggered.

Technical validation and local build instructions are documented in the [Development Guide](./docs/development.md).

## Community standards

Participation in repository discussions, Issues, reviews, and Pull Requests is governed by the [Code of Conduct](./CODE_OF_CONDUCT.md).

Security or privacy-sensitive problems should follow the [Security Policy](./SECURITY.md) rather than being disclosed with exploit details in a public Issue. Ordinary factual corrections and website bugs should continue to use the structured Issue forms.

## Licensing of contributions

By contributing source code, you agree that your contribution may be distributed under the repository's MIT License.

By contributing original Chronicle editorial text or data compilation, you agree that your contribution may be distributed under CC BY 4.0 according to [Content Licensing](./LICENSE-CONTENT.md). Do not submit third-party material that you do not have the right to contribute under the applicable terms.
