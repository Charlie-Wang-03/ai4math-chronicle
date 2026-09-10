# Editorial Methodology

**English** · [简体中文](./editorial-methodology.zh-CN.md)

This document is the repository-side companion to the public Methodology page.

## Publication gate

Candidate discovery may be broad, but published Chronicle events must be deduplicated canonical events with factual claims, authoritative sources, significance rationale, explicit AI/human contribution, and a verification state.

## Significance

- **H1 — Historical Milestone:** a durable turning point in AI for Mathematics. This includes major new mathematical results or algorithms discovered with substantive AI involvement, landmark formalization achievements, and competition or research breakthroughs that materially change the historical picture of what AI systems can do in mathematics. H1 measures historical significance, not verification status; an H1 event may still carry unresolved questions about the scope, attribution, reception, or correctness of an underlying research claim.
- **H2 — Field Milestone:** clear significance to an important AI4Math subfield or technical direction, including math-specific systems, benchmarks, datasets, proof-search methods, formalization infrastructure, and competition results that materially advance the field without constituting a top-level historical turning point.
- **H3 — Context Event:** primarily historical context rather than a substantive AI4Math milestone. General-purpose model releases belong here when mathematics is mainly used as a capability benchmark and the event does not itself contribute new mathematics or a math-specific system.

The v0.1 corpus contains **11 H1 / 38 H2 / 2 H3** events. H3 is intentionally narrow: being a benchmark, dataset, infrastructure contribution, or specialized mathematical system is not by itself a reason to classify an event as H3.

No public 0–100 “mathematical importance” score is used.

## Evidence hierarchy

- **S1:** primary research record or artifact.
- **S2:** official institutional/researcher source.
- **S3:** independent scholarly corroboration or analysis, including reproduction, external scoring, peer review, or artifact replay.
- **S4:** reputable secondary media.
- **S5:** community discovery signal only.

Every published MVP event must have at least one S1 or S2 source. Major historical claims should preferentially resolve to primary evidence in one click from the event page/card.

## What verification means

AI4Math Chronicle verifies **the evidence for what happened**: whether an event occurred as described, what the originating organization or researchers publicly claimed, what artifacts were released, and how far reliable independent sources corroborate the Chronicle's core event description.

The Chronicle does **not** act as a mathematical referee of last resort. It does not independently decide whether a newly claimed theorem, proof, disproof, or solution is ultimately correct. Mathematical correctness, priority, and community acceptance are recorded through attributed sources, later developments, disputes, corrections, and changes in the historical record.

Evidence level (`E0`–`E4`), verification status, formal assurance, and significance are separate dimensions. In particular:

- `claimed` — a reliable primary or official source establishes that the event or claim was publicly made, with little or no independent corroboration recorded yet;
- `paper_released` — a public research record exists, but this alone does not imply independent corroboration;
- `under_verification` — the event is authentic, while material parts of its public claim, scope, attribution, or historical interpretation remain under active external scrutiny;
- `partially_verified` — important parts of the Chronicle's event description have independent or external corroboration, while material aspects remain unsettled or incompletely corroborated;
- `independently_verified` — reliable sources independent of the originating claim have substantively corroborated the Chronicle's core event description;
- `disputed` — reliable sources materially contest the event's facts, attribution, scope, or public claim;
- `corrected` — the Chronicle record has been materially updated after a correction;
- `retracted` — the originating claim or research record has been withdrawn or retracted.

`independently_verified` is therefore an **event-level evidence label**, not a declaration that the underlying mathematics has been finally proved correct. Likewise, `machine_checked` or `independently_replayed` describes formal artifacts and does not by itself settle mathematical novelty, faithfulness, priority, or the truth of informal claims.

Status changes must append to `verification.history`. Factual corrections belong in `corrections` and should cite the relevant source IDs.

## AI and editorial boundary

AI may collect sources, draft bilingual text, suggest taxonomy, detect duplicate metadata, perform consistency checks, and propose or apply verification updates when the documented evidence rule is satisfied and the supporting sources are recorded.

Final **H1 — Historical Milestone** classification requires either direct human editorial review or explicit delegated classification authority under an already established human policy.

Neither AI nor the Chronicle should present “this new mathematical fact is correct” as the project's own adjudication. High-risk wording such as “first”, “solves”, “proves”, or “disproves” should be attributed to reliable sources unless the historical fact itself is independently established.

The v0.1 significance pass was finalized under explicit human editorial approval and delegated authority. Future H1 additions remain subject to the same human gate.

## Historical record versus endorsement

Chronicle inclusion records that a historically relevant event, result, or claim occurred and evaluates its significance in AI4Math history. It does not automatically endorse the ultimate mathematical correctness of every underlying claim. This distinction is especially important for open or disputed research claims: the event may be real and historically important even while the mathematics remains contested.

## Corrections policy

The Chronicle should preserve an auditable historical trail. When later evidence changes the interpretation of an event:

1. update the current verification state;
2. append an entry to `verification.history`;
3. add a `corrections` record when factual prose changes;
4. retain or add the sources needed to understand why the record changed.

Silent retroactive rewriting is discouraged because it removes useful provenance.
