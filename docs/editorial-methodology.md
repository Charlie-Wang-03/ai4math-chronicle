# Editorial Methodology

**English** · [简体中文](./editorial-methodology.zh-CN.md)

This document is the repository-side companion to the public Methodology page.

## Publication gate

Candidate discovery may be broad, but published Chronicle events must be deduplicated canonical events with factual claims, authoritative sources, significance rationale, explicit AI/human contribution, and a verification state.

## Significance

- **H1 — Historical Milestone:** a durable turning point in AI for Mathematics. This includes major new mathematical results or algorithms discovered with substantive AI involvement, landmark formalization achievements, and competition or research breakthroughs that materially change the historical picture of what AI systems can do in mathematics. H1 measures historical significance, not verification certainty; an H1 claim may still be `under_verification`.
- **H2 — Field Milestone:** clear significance to an important AI4Math subfield or technical direction, including math-specific systems, benchmarks, datasets, proof-search methods, formalization infrastructure, and competition results that materially advance the field without constituting a top-level historical turning point.
- **H3 — Context Event:** primarily historical context rather than a substantive AI4Math milestone. General-purpose model releases belong here when mathematics is mainly used as a capability benchmark and the event does not itself contribute new mathematics or a math-specific system.

The v0.1 corpus contains **11 H1 / 38 H2 / 2 H3** events. H3 is intentionally narrow: being a benchmark, dataset, infrastructure contribution, or specialized mathematical system is not by itself a reason to classify an event as H3.

No public 0–100 “mathematical importance” score is used.

## Evidence hierarchy

- **S1:** primary research record or artifact.
- **S2:** official institutional/researcher source.
- **S3:** independent scholarly verification/analysis.
- **S4:** reputable secondary media.
- **S5:** community discovery signal only.

Every published MVP event must have at least one S1 or S2 source. Major scientific facts should preferentially resolve to primary evidence in one click from the event page/card.

## Verification

Evidence level (`E0`–`E4`), verification status, and formal assurance are separate dimensions. `machine_checked` does not automatically mean `independently_verified`, and neither automatically establishes mathematical novelty. Significance is also separate: a historically important claim can be H1 while still `under_verification`.

Status changes must append to `verification.history`. Factual corrections belong in `corrections` and should cite the relevant source IDs.

## AI boundary

AI may collect sources, draft bilingual text, suggest taxonomy, detect duplicate metadata, perform consistency checks, and propose H1/H2/H3 changes. Final H1 classification requires either direct human editorial review or explicit delegated classification authority under an already established human policy.

AI does not independently finalize:

- `independently_verified`;
- a claim that a new mathematical fact has been established.

The v0.1 significance pass was finalized under explicit human editorial approval and delegated authority. Future H1 additions remain subject to the same human gate.

## Historical claims versus endorsement

Chronicle inclusion records that a historically relevant claim or milestone occurred; it does not automatically endorse the claim as mathematically correct. This distinction is especially important for open or disputed research claims. Event significance and verification status must remain visible together.

## Corrections policy

The Chronicle should preserve an auditable historical trail. When later evidence changes the interpretation of an event:

1. update the current verification state;
2. append an entry to `verification.history`;
3. add a `corrections` record when factual prose changes;
4. retain or add the sources needed to understand why the record changed.

Silent retroactive rewriting is discouraged because it removes useful provenance.
