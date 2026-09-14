# Editorial Methodology

**English** · [简体中文](./editorial-methodology.zh-CN.md)

This document is the repository-side companion to the public Methodology page.

## Publication gate

Candidate discovery may be broad, but published Chronicle events must be deduplicated canonical events with factual claims, authoritative sources, significance rationale, explicit AI/human contribution, and a verification state.

## Significance

- **H1 — Historical Milestone:** a durable turning point in AI for Mathematics. This includes major new mathematical results or algorithms discovered with substantive AI involvement, landmark formalization achievements, and competition or research breakthroughs that materially change the historical picture of what AI systems can do in mathematics. H1 measures historical significance, not verification status; an H1 event may still carry unresolved questions about the scope, attribution, reception, or correctness of an underlying research claim.
- **H2 — Field Milestone:** clear significance to an important AI4Math subfield, technical direction, or field-building process, including math-specific systems, benchmarks, datasets, proof-search methods, formalization infrastructure, competition results, durable scholarly venues, and norm-setting institutional milestones that materially advance or organize the field without constituting a top-level historical turning point.
- **H3 — Context Event:** primarily historical context rather than a substantive AI4Math milestone. General-purpose model releases belong here when mathematics is mainly used as a capability benchmark and the event does not itself contribute new mathematics or a math-specific system.

The `v0.1.1` release snapshot contains **11 H1 / 38 H2 / 2 H3** events. Live `main` may continue to evolve between citable release snapshots. H3 is intentionally narrow: being a benchmark, dataset, infrastructure contribution, specialized mathematical system, or field-building event is not by itself a reason to classify an event as H3.

No public 0–100 “mathematical importance” score is used.

## Field-building events

`field_building` records historically significant milestones in the formation, institutionalization, norms, governance, or scholarly infrastructure of AI for Mathematics as a research field. It is distinct from technical `infrastructure`.

Strong candidates include durable AI4Math-specific peer-reviewed journals or conferences, and community statements that materially shape AI4Math research norms, attribution, verification, disclosure, ethics, venue policy, or scholarly governance. A high-signature petition, individual opinion piece, one-off workshop, ordinary special issue, local symposium, or ephemeral community campaign is excluded by default unless later evidence shows durable field-level significance.

For venues, prefer the date on which scholarly operation actually begins—such as an inaugural conference, first issue, or equivalent formal launch—when that differs materially from an earlier aspirational announcement.

A field-building event may also carry another Event Type when warranted, for example `field_building + controversy`.

Some purely institutional events do not have an applicable mathematical-novelty class, AI role, or mathematical interface. Such records use `not_applicable` rather than forcing misleading values such as `tooling_only`, `unclear`, or `informal`. `not_applicable` is permitted only when `event_types` includes `field_building`; for interfaces it must be used alone. If a field-building event genuinely includes a technical mathematical contribution, use the ordinary applicable taxonomy values instead.

Inclusion records the historical event, not endorsement of a statement's normative position, a venue's prestige, or the quality of every work associated with an institution.

## Evidence hierarchy

- **S1:** primary research record or artifact.
- **S2:** official institutional/researcher source.
- **S3:** independent scholarly corroboration or analysis, including reproduction, external scoring, peer review, or artifact replay.
- **S4:** reputable secondary media.
- **S5:** community discovery signal only.

Every published MVP event must have at least one S1 or S2 source. Major historical claims should preferentially resolve to primary evidence in one click from the event page/card. For field-building events, authoritative evidence may be institutional rather than a research paper, such as an official venue page, society announcement, published statement, governance document, proceedings record, or journal launch record.

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

For field-building events, verification concerns whether the statement, venue, governance change, or institutional event occurred as recorded and whether its documented historical effects are supported. It does not turn the Chronicle into an arbiter of normative positions or venue prestige.

Status changes must append to `verification.history`. Factual corrections belong in `corrections` and should cite the relevant source IDs.

## AI and editorial boundary

AI may collect sources, draft bilingual text, suggest taxonomy, detect duplicate metadata, perform consistency checks, create ordinary H2/H3 Event records, and apply lower-risk evidence / verification updates when the documented rule is satisfied and the supporting sources are recorded.

The standing human hard gates are:

- final **H1 — Historical Milestone** classification or a material move into / out of H1;
- finalizing `independently_verified`;
- finalizing `disputed`;
- finalizing `corrected` as the current verification status;
- finalizing `retracted`;
- resolving a material mathematical-correctness, attribution, or historical-priority dispute on the Chronicle's own authority.

AI may prepare a complete evidence-backed patch and recommendation up to any of these gates, but publication of the gated decision requires direct human editorial approval unless an already-established human policy explicitly delegates that exact class of decision.

The `independently_verified` gate is a governance requirement on publication; it does **not** redefine the status. The status still means event-level independent corroboration, not ultimate certification of mathematical correctness.

Neither AI nor the Chronicle should present “this new mathematical fact is correct” as the project's own adjudication. High-risk wording such as “first”, “solves”, “proves”, or “disproves” should be attributed to reliable sources unless the historical fact itself is independently established.

The v0.1 significance pass was finalized under explicit human editorial approval and delegated authority. Future H1 additions remain subject to the same human gate.

Detailed cross-conversation authority and state-recovery rules are defined in [`gpt-project-governance.md`](./gpt-project-governance.md).

## Historical record versus endorsement

Chronicle inclusion records that a historically relevant event, result, claim, or field-building milestone occurred and evaluates its significance in AI4Math history. It does not automatically endorse the ultimate mathematical correctness of every underlying claim, the normative position of a community statement, or the prestige of a scholarly venue. This distinction is especially important for open or disputed research claims and institutional developments: the event may be real and historically important while its interpretation remains contested.

## Corrections policy

The Chronicle should preserve an auditable historical trail. When later evidence changes the interpretation of an event:

1. update the current verification state;
2. append an entry to `verification.history`;
3. add a `corrections` record when factual prose changes;
4. retain or add the sources needed to understand why the record changed.

Silent retroactive rewriting is discouraged because it removes useful provenance.
