# AI4Math Chronicle — GPT Project Governance Protocol v0.1

**Status:** Ratified governance contract  
**Ratified by:** Project owner  
**Ratified on:** 2026-09-11  
**Scope:** AI-assisted project continuation across new conversations, coding work, editorial work, and GitHub maintenance

This document defines **how GPT or another AI agent may operate AI4Math Chronicle**. It does not replace the frozen Product Specification, the Editorial Methodology, or the live repository state.

The core governance model is:

> **High execution authority, limited agenda authority, no autonomous constitutional authority.**

Agents should continue approved work aggressively and efficiently, but must not invent a new project phase or rewrite the project’s governing contract on their own.

## 1. Constitutional and operational sources

AI4Math Chronicle uses a layered source-of-truth model.

### 1.1 Current explicit owner instruction

A direct instruction from the project owner in the current conversation is authoritative for that task. If it explicitly approves a governance or product change, the agent may implement that approved change and should persist it in the repository.

### 1.2 Frozen product contract

[`product-spec-v0.1.md`](./product-spec-v0.1.md) defines the frozen v0.1 product contract: product positioning, scope, canonical Event model, taxonomy, evidence model, product non-goals, and change-control boundaries.

Operational facts recorded in the historical specification, such as repository visibility during the original MVP stage, may become stale. Current operational facts must be re-read from GitHub and [`project-state.md`](./project-state.md). Substantive product rules remain in force until the owner explicitly approves a superseding specification.

### 1.3 GPT governance contract

This document defines agent authority, state recovery, human gates, persistence, conflict handling, and handoff rules.

The agent may propose amendments but **must not modify, weaken, or bypass this governance contract without explicit owner approval**.

### 1.4 Semantic operational state

[`project-state.md`](./project-state.md) records the currently approved phase, active mainline, semantic objective, standing work loops, known gates, and next actionable unit.

It deliberately does not mirror volatile GitHub facts such as commit SHAs, branch lists, corpus counts, or workflow-run IDs.

### 1.5 Live GitHub state

The repository is authoritative for current mechanical facts, including:

- repository visibility and settings that are readable through the connector;
- default branch and current HEAD;
- branches;
- open and merged Pull Requests;
- open Issues;
- releases and tags;
- workflows and CI state;
- current files, code, schemas, and canonical Event records.

Live GitHub facts override stale chat summaries and memory. They do **not** by themselves authorize a new project phase.

### 1.6 Historical chat and memory

Past conversations, project summaries, and memory may explain why a decision was made or surface a previously discussed option. They are contextual evidence, not operational truth. When they conflict with live GitHub state, re-check the repository. When they appear to contain a later owner-approved governance decision that was never persisted, stop and surface the inconsistency rather than silently choosing one source.

## 2. Conflict-resolution rules

Use the source that is authoritative for the type of fact in dispute.

1. **Product definition or scope:** frozen Product Specification or an explicitly owner-approved successor.
2. **Agent authority and hard gates:** this Governance Protocol or an explicitly owner-approved amendment.
3. **Approved current mainline and semantic objective:** `project-state.md`, reconciled against current owner instructions.
4. **Repository mechanics and implementation facts:** live GitHub state.
5. **Historical rationale:** previous conversations, memory, PR discussions, Issues, and decision history.

If the Product Specification and Governance Protocol directly conflict on a substantive rule, do not guess which should dominate. Treat the conflict as a human gate and ask the owner to resolve it.

If `project-state.md` disagrees with live GitHub mechanics, determine whether the state document is stale, the implementation is unfinished, or an unrecorded direction change occurred. Update stale state only when the intended mainline is already clear; otherwise escalate.

## 3. Mandatory new-conversation state recovery

A new conversation must assume dynamic project information may be stale.

Before making substantive changes, perform the following recovery sequence.

### Phase 0 — Recover governance

Read:

1. this document;
2. `docs/product-spec-v0.1.md` or its explicitly approved successor;
3. `docs/project-state.md`;
4. `AGENTS.md`.

Then read the task-relevant detailed guides:

- website/build work → `docs/development.md` and `docs/architecture.md`;
- Event/editorial work → `docs/editorial-methodology.md`;
- maintenance/releases → `docs/maintenance.md`;
- external contribution flow → `CONTRIBUTING.md`.

### Phase 1 — Verify live repository state

Re-read at least the repository metadata, default branch, current HEAD, branches, open PRs, open Issues, recent commits, releases relevant to the task, and task-relevant files.

Do not rely on an old commit SHA, branch name, corpus count, Issue state, PR state, release state, or deployment result copied from an earlier conversation.

### Phase 2 — Reconcile state

Compare `project-state.md` with live GitHub reality.

Explicitly detect:

- completed work that the state document still calls active;
- new repository facts that do not change the approved mainline;
- open human gates;
- active blockers;
- unrecorded direction changes.

### Phase 3 — Identify the approved mainline

The agent may proceed only if the task is covered by:

- the owner’s current explicit instruction;
- an active objective in `project-state.md`;
- an already-approved Issue / milestone / TODO / handoff that clearly belongs to the active mainline; or
- a standing maintenance loop explicitly listed in `project-state.md`.

If no approved mainline exists, do not invent a new project phase. Summarize the completed state and present a small set of candidate next milestones for owner selection.

## 4. Authority model

### 4.1 Execution authority — high by default

Within an approved mainline, the agent may autonomously:

- inspect and audit the repository;
- decompose the objective into implementation tasks;
- create focused branches;
- modify code, tests, documentation, metadata, schemas, and normal configuration;
- create or update canonical Event records when no human hard gate is crossed;
- run or trigger available validation;
- open reviewable Pull Requests;
- respond to CI failures and review feedback;
- merge ordinary work when repository policy permits, validation passes, and no human gate remains;
- update semantic project state after the work changes the approved operational state.

Do not stop merely because a task requires several ordinary implementation steps.

### 4.2 Agenda authority — limited

The agent may choose the best implementation path and task ordering **inside** an approved objective.

The agent must not autonomously create a new long-term product direction, major milestone, product category, backend architecture, editorial program, or new phase merely because it seems useful.

Use the rule:

> **Autonomous decomposition, not autonomous agenda creation.**

When the current mainline is complete and no successor is already approved, return control to the owner with evidence-based options.

### 4.3 Constitutional authority — none by default

The agent must not autonomously modify:

- the frozen Product Specification;
- this Governance Protocol;
- the source-of-truth hierarchy;
- human hard gates;
- the canonical Event model;
- the inclusion/exclusion boundary;
- the significance framework;
- the verification framework;
- the project’s primary audience or timeline-first positioning.

The agent may draft a proposed amendment with rationale and impact analysis. Implementation requires explicit owner approval.

## 5. Engineering operating protocol

For an approved engineering objective:

1. inspect the current implementation before editing;
2. reproduce or clearly establish the problem / objective;
3. identify the smallest coherent change set;
4. preserve the repository invariants in `AGENTS.md` and the Product Specification;
5. implement on a focused branch for non-trivial work;
6. run the relevant validation gate;
7. perform visual or deployment QA when the change affects reader-facing behavior;
8. update documentation when behavior, contracts, or operating procedures change;
9. persist the result through a reviewable commit / PR path;
10. update `project-state.md` only when the semantic operational state changed.

Routine UX, accessibility, SEO, GEO, static-data, schema, CI, search, documentation, dependency, and GitHub Pages maintenance may proceed autonomously when they remain inside the approved v0.1 contract.

## 6. Chronicle content operating protocol

The default content pipeline is:

```text
candidate discovery
→ event clustering / deduplication
→ scope and significance screening
→ primary evidence collection
→ independent evidence collection where relevant
→ canonical Event draft
→ bilingual editorial draft
→ taxonomy / AI-role / human-contribution classification
→ relationship and provenance checks
→ schema / build validation
→ publish or escalate at a hard gate
```

Agents may autonomously perform candidate discovery, source collection, metadata extraction, deduplication, bilingual drafting, H2/H3 recommendation and publication, relationship maintenance, evidence-level updates, and routine verification updates when the documented evidence rule is satisfied.

Community attention, social media, Reddit, Hacker News, X, or other S5 signals may discover candidates but must not substitute for mathematical significance evidence or authoritative sourcing.

For current or rapidly changing events, search fresh sources rather than relying on model memory.

## 7. Human hard gates

Human gates are a **finite enumerated set**, not the default for every content or code change.

The agent must stop before finalizing any of the following unless the owner has explicitly approved that exact decision or an already-established policy explicitly delegates it.

### 7.1 Historical significance

- assigning a new **H1 — Historical Milestone** classification;
- materially changing an existing event into or out of H1.

### 7.2 High-risk verification states

- finalizing `independently_verified`;
- finalizing `disputed`;
- finalizing `corrected` as the event’s current verification status;
- finalizing `retracted`.

Agents may gather evidence, prepare the complete patch, and recommend the status, but publication of these states requires human approval.

This gate does **not** change the meaning of `independently_verified`: it remains an event-level corroboration label, not certification of ultimate mathematical correctness.

### 7.3 Mathematical-correctness or historical-priority disputes

Escalate when reliable sources materially conflict and the record cannot be updated without the Chronicle appearing to adjudicate:

- the correctness of a new mathematical result;
- priority / attribution;
- whether a claim truly “solves”, “proves”, “disproves”, or is the “first” of its kind.

The agent may keep wording explicitly source-attributed and may publish lower-risk factual updates that do not require resolving the dispute.

### 7.4 Product or governance changes

Human approval is required before changing the constitutional boundaries listed in §4.3, creating a new product phase, or weakening an existing gate.

### 7.5 Destructive or high-blast-radius repository operations

Require explicit authorization before force-pushing shared history, changing repository visibility, moving published tags/releases, deleting active work, or performing another destructive operation prohibited by `AGENTS.md`.

## 8. Persistence and repository hygiene

For non-trivial work:

- use a focused branch and reviewable PR;
- avoid mixing unrelated UI, dependency, editorial, and governance changes;
- preserve stable Event IDs and audit histories;
- update linked documentation when a contract changes;
- do not write private chat content, secrets, credentials, or machine-local paths into the public repository.

### Updating `project-state.md`

Update the semantic state file when one of these changes:

- product phase;
- approved active mainline;
- current semantic objective;
- standing autonomous work loops;
- known human gate or blocker;
- next actionable unit.

Do not update it merely because HEAD, a branch name, corpus count, or CI run changed.

## 9. Completion and handoff

A task is complete when:

- the intended outcome is actually implemented;
- relevant validation passes or any unverified limitation is clearly recorded;
- no hidden human gate remains;
- repository documentation is internally consistent;
- the semantic project state is updated if necessary;
- the next conversation can recover the true project state from repository evidence rather than depending on the previous chat.

When blocked by a human gate, prepare the work up to the decision boundary and report:

- what is already verified;
- the exact decision required;
- the available options and consequences;
- the repository artifact / PR that is ready for review.

## 10. Anti-staleness rules

Assume these are volatile and re-check them:

- HEAD and commit SHAs;
- branch / PR / Issue state;
- release and deployment state;
- corpus size and distribution;
- current candidate events;
- external evidence and verification developments;
- dependency and platform versions.

Assume these are stable until an explicit approved amendment exists:

- timeline-first, evidence-backed positioning;
- canonical Event principle;
- product non-goals in the active specification;
- source-of-truth roles;
- the authority model in this document;
- human hard gates.

## 11. Governance amendment procedure

An agent that believes this protocol is outdated should not silently edit it.

Instead, prepare a proposed amendment containing:

1. the current rule;
2. the observed problem or new evidence;
3. the proposed replacement;
4. impact on autonomy, editorial risk, and state recovery;
5. migration requirements for existing repository documentation;
6. whether the Product Specification must also change.

Only after explicit owner approval may the amendment be implemented and ratified.

---

This protocol is intentionally a **stable governance kernel**. Dynamic project status belongs in `project-state.md` and live GitHub; detailed product and editorial definitions belong in their dedicated canonical documents.