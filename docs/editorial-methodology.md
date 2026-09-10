# Editorial Methodology

This document is the repository-side companion to the public Methodology page.

## Publication gate

Candidate discovery may be broad, but published Chronicle events must be deduplicated canonical events with factual claims, authoritative sources, significance rationale, explicit AI/human contribution, and a verification state.

## Significance

- **H1 — Historical Milestone:** a durable turning point in AI for Mathematics, especially when AI contributes a major new mathematical result, proof, disproof, formalization milestone, or repeated research-level advances. Final designation requires human editorial review. H1 measures historical significance, not verification certainty; an H1 claim may still be `under_verification`.
- **H2 — Field Milestone:** clear significance to an important AI4Math subfield or technical direction, including math-specific systems, benchmarks, datasets, proof-search methods, formalization infrastructure, and competition results that materially change the field without constituting a top-level historical turning point.
- **H3 — Context Event:** primarily historical context. General-purpose model releases belong here when mathematics is mainly used as a capability benchmark rather than the event contributing new mathematics or a math-specific system.

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

AI may collect sources, draft bilingual text, suggest taxonomy, and detect duplicate metadata. AI does not unilaterally finalize:

- `H1`;
- `independently_verified`;
- a claim of a new mathematical fact.
