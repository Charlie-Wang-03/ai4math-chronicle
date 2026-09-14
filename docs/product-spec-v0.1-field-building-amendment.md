# AI4Math Chronicle — Product Specification v0.1 Field-Building Amendment

**Status:** Ratified owner-approved amendment  
**Approved by:** Project owner  
**Approved on:** 2026-09-14  
**Scope:** Field-building milestones and non-applicable technical taxonomy values

This document amends the frozen [`product-spec-v0.1.md`](./product-spec-v0.1.md) to include historically significant milestones in the formation and institutionalization of AI for Mathematics as a research field. It is additive to the owner-approved [`product-spec-v0.1-r0-amendment.md`](./product-spec-v0.1-r0-amendment.md). All other v0.1 product, editorial, evidence, verification, architecture, and human-review rules remain in force.

The amendment does **not** create a new product phase. It extends the canonical Event model only as needed to represent a class of historical events that the previous technical taxonomy could not describe faithfully.

## 1. New Event Type: `field_building`

Add the canonical Event Type:

```text
field_building
```

Definition:

> **Field Building:** historically significant milestones in the formation, institutionalization, norms, governance, or scholarly infrastructure of AI for Mathematics as a research field.

This type is intended for events whose historical importance lies primarily in shaping the AI4Math research community rather than in producing a new mathematical result, proof, model, benchmark, dataset, or technical system.

Examples that may qualify include:

- the establishment of a durable AI4Math-specific peer-reviewed journal or conference;
- a community statement, declaration, or norm-setting document that materially shapes research practice, attribution, verification, disclosure, ethics, or scholarly governance in AI4Math;
- another institutional milestone that clearly changes how the field organizes, evaluates, or governs research.

`field_building` is multi-axis and may coexist with another Event Type when the event genuinely spans both dimensions. For example, a historically important community dispute could use:

```yaml
event_types:
  - field_building
  - controversy
```

Do not use `infrastructure` as a substitute for `field_building`. `infrastructure` continues to mean technical or research infrastructure such as proof assistants, proof-search environments, formalization tooling, agent frameworks, benchmark infrastructure, and related systems.

## 2. Publication gate for field-building events

Field-building coverage follows the same **broad discovery, strict publication** principle as the rest of the Chronicle.

### 2.1 Community statements

A petition, open letter, declaration, or signed statement is not included merely because it has many signatories or receives social attention.

A community statement should normally enter the published Chronicle only when there is evidence that it is a durable AI4Math milestone, for example because it:

- represents a substantively cross-institutional mathematical or AI4Math community position;
- addresses AI4Math-specific research norms, attribution, verification, disclosure, scholarly practice, or governance rather than generic AI policy alone;
- establishes or materially changes an observable norm, policy, editorial practice, venue rule, or research agenda; or
- becomes an enduring reference point in later scholarly or institutional developments.

Ordinary petitions, individual opinion pieces, ephemeral social-media campaigns, and generic AI-policy statements remain out of scope by default.

### 2.2 Journals, conferences, and venues

The Chronicle may record the establishment of a durable AI4Math-specific scholarly venue when the event marks meaningful institutionalization of the field.

Strong signals include:

- an explicit AI4Math research identity rather than a one-off general-AI session;
- formal peer review or comparable scholarly governance;
- a durable editorial board, program committee, proceedings, journal volume, or continuing series;
- evidence of continuity or clear field-level influence.

One-off workshops, ordinary special issues, local symposia, and events whose AI4Math scope is incidental are excluded by default. A first edition can still qualify when the institutional commitment and field significance are already clear.

For chronology, prefer the date on which the institution actually begins scholarly operation—such as the inaugural conference, first issue, or equivalent formal launch—over an earlier aspirational announcement when the distinction is material.

## 3. Significance

Field-building events use the existing H1 / H2 / H3 significance framework.

- **H2** is the normal level for a durable venue, norm-setting document, or institutional milestone with clear field-level significance.
- **H3** may be used when the event is valuable primarily as historical context.
- **H1** remains exceptional and subject to the existing human hard gate.

Popularity, signatory count, prestige, or media attention alone do not establish H1/H2 significance.

## 4. Technical taxonomy values that are not applicable

Some field-building events do not involve a mathematical task or an AI system performing mathematical work. Forcing such records into technical values such as `tooling_only`, `unclear`, or `informal` would corrupt the canonical corpus.

The Event schema therefore adds:

```text
mathematical_novelty.type: not_applicable
ai_role.level: not_applicable
interfaces: [not_applicable]
```

These values mean **the dimension does not apply to the historical event**, not that the evidence is missing or the classification is uncertain.

Rules:

1. `not_applicable` may be used only when `event_types` contains `field_building`.
2. `interfaces: [not_applicable]` is exclusive; it must not be combined with `informal`, `formal`, `symbolic`, `numeric`, or `hybrid`.
3. A `field_building` event that genuinely includes a technical mathematical contribution should use the ordinary applicable taxonomy values instead of `not_applicable` for those dimensions.
4. `ai_role: unclear` continues to mean that AI involvement is substantively relevant but unclear; it must not be used as a proxy for “AI role does not apply.”

## 5. Source and verification semantics

The existing S1–S5 evidence hierarchy and verification model remain in force.

For field-building events, authoritative evidence will often be institutional rather than a research paper—for example an official venue page, society announcement, published statement, governance document, proceedings record, or journal launch record. Existing source types such as `official_announcement`, `community`, `media`, and `other` may be used as appropriate; no new source tier is created by this amendment.

Verification continues to concern the evidence for **what happened**. Inclusion of a community statement does not imply Chronicle endorsement of its normative position, and inclusion of a venue does not imply endorsement of its prestige or scholarly quality.

## 6. Reader-facing taxonomy

Reader-facing surfaces should present `field_building` bilingually as:

- English: **Field building**
- Simplified Chinese: **领域建构**

Reader-facing representations of `not_applicable` should communicate **Not applicable / 不适用**, not “unknown.”

The existing facet-discipline rule remains unchanged: adding this Event Type to the existing Event Type filter is appropriate because Event Type is already a primary retrieval axis, but this amendment does not authorize new standalone facets merely because the schema now contains `not_applicable`.

## 7. Unchanged constitutional boundaries

This amendment does **not** change:

- the timeline-first, evidence-backed positioning;
- the canonical Event principle;
- the H1 / H2 / H3 significance semantics or H1 human gate;
- the S1–S5 source hierarchy;
- the E0–E4 evidence model;
- verification-state or formal-assurance semantics;
- the distinction between event verification and mathematical correctness;
- the static GitHub Pages architecture;
- the project's news-feed, paper-database, backend, CMS, account, vector-search, and chatbot non-goals;
- any standing human hard gate in the GPT Governance Protocol.

The core principle remains:

> **One event, one canonical record, many ways to consume it.**
