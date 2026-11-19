# AI4Math Chronicle — Autonomous H1 Governance Amendment

**Status:** Ratified by active trusted maintainer
**Approved by:** `@Charlie-Wang-03`
**Approved on:** 2026-11-19
**Amends:** [GPT Project Governance Protocol](./gpt-project-governance.md) and the H1-specific human-gate clause in the [Co-Maintainer Amendment](./gpt-project-governance-co-maintainer-amendment.md)
**Product companion:** [H1 Autonomy Product Amendment](./product-spec-v0.1-h1-autonomy-amendment.md)

## Decision and precedence

The owner explicitly authorizes AI Chronicle maintainers to **independently assign, publish, upgrade, or downgrade H1 — Historical Milestone classifications** for new or existing Events. No case-by-case human H1 approval is required. This authorization includes `field_building` milestones and overrides earlier H1-specific hard-gate wording in the frozen Product Specification, governance protocol, co-maintainer amendment, and subordinate operational guides. Earlier decisions remain as dated historical records.

This changes *who may decide the significance tier*, not what H1 means. H1 still requires a demonstrable, durable turning point in AI4Math history. H1 classification is separate from verification, formal assurance, and ultimate mathematical truth.

## Mandatory autonomous H1 safeguards

Before an H1 record is published, an agent must:

1. Identify one canonical, in-scope historical Event, deduplicate existing YAML/Issues/PRs, and establish the actual event date apart from the source discovery date and Chronicle addition date.
2. Inspect **at least one authoritative S1 or S2 source**; link direct research, artifact, formal proof, or institutional records. Seek independent S3 scrutiny when available and disclose when it is missing.
3. Write a concrete **long-term historical-significance rationale**, not merely cite hype, company prestige, media attention, general model performance, or arbitrary numeric scoring.
4. Distinguish reported claim, actual public record, new mathematical content, AI contribution, human contribution, verification state, limitations and unresolved uncertainty. Use source-attributed language for `first`, `solves`, `proves`, and similar consequential claims unless independently established.
5. Preserve bilingual accuracy, provenance, source links, relationships, IDs, and revision / verification history.
6. Choose a conservative evidence/verification state: **H1 does not imply `independently_verified` or mathematical correctness**.
7. Submit a focused branch/PR with inspectable H1 rationale and sources; require the normal schema, tests, build, protected-branch checks, and relevant human gates before merge. Never bypass CI or direct-write to protected `main`.

There is **no quota** for H1 or other events. When publication evidence is insufficient, retain a Source Lead with a concrete follow-up trigger or exclude the candidate. Human maintainers may later revise a published judgment with auditable editorial history.

## Human gates unchanged

The following **still require explicit approval** by an active trusted maintainer (absent a prior applicable explicit delegation):

- `independently_verified`;
- `disputed`;
- `corrected` as current verification status;
- `retracted`;
- material mathematical-correctness, historical-priority or attribution adjudication on Chronicle's own authority;
- unrelated product/governance/phase/constitutional changes or destructive high-blast-radius repository actions.

If sources conflict on a gated question, prepare the evidence and reviewable PR to the decision boundary without independently finalizing the gated judgment. Explicit materially conflicting directions from trusted maintainers still trigger human reconciliation, without ranking maintainers.

## Weekly operation

The same explicit owner decision authorizes a **weekly ChatGPT research and editorial task** within the existing Chronicle corpus-maintenance mainline. Follow [Weekly Chronicle Loop](./weekly-chronicle-loop.md). It is external scheduled orchestration, **not** an autonomous GitHub Actions crawler, news feed, parallel dataset, or new product phase. The weekly agent may research, triage, open PRs, and publish qualified H1/H2/H3 Events through the protected workflow when no other gate applies.

All other source-of-truth, inclusion, canonical Event, static architecture, audience, co-maintainer and governance constraints remain in force. AI retains high execution authority, limited agenda authority, and **no autonomous constitutional authority**.
