# AI4Math Chronicle — Governance Decision Log

This log records **durable governance decisions and their rationale**. It is not a task tracker and must not mirror volatile repository state.

## 2026-09-11 — Cross-conversation GPT governance v0.1 ratified

**Status:** Ratified by project owner

### Problem

The project needed a stable way for future GPT conversations to continue website optimization and Event corpus maintenance without repeatedly reconstructing context from chat history, while avoiding unchecked project-direction drift.

### Decision

Adopt a three-layer operating model:

1. **Stable constitutional layer** — frozen Product Specification + GPT Project Governance Protocol;
2. **Dynamic operational layer** — `project-state.md` + live GitHub repository state;
3. **Historical context layer** — previous conversations / memory used only for rationale and recovery clues.

### Authority model

The owner selected:

> **High execution authority, limited agenda authority, no autonomous constitutional authority.**

Operational priority is **execution continuity + content governance > direction reminders**.

Agents should be highly autonomous inside an approved mainline, but should not create a new long-term mainline when no approved one exists.

### Content autonomy

Ordinary engineering work and ordinary corpus maintenance may proceed autonomously, including candidate discovery, source collection, deduplication, bilingual drafting, normal H2/H3 publication, metadata, relationships, and lower-risk evidence / verification maintenance.

### Human hard gates

The following decisions remain human-gated unless explicitly delegated under an established policy:

- new or materially changed H1 classification;
- `independently_verified`;
- `disputed`;
- `corrected` as current verification status;
- `retracted`;
- unresolved mathematical-correctness / attribution / historical-priority adjudication by Chronicle itself;
- Product Specification changes;
- Governance Protocol changes;
- source-of-truth, canonical Event model, inclusion boundary, significance / verification framework, or human-gate changes;
- creation of a new long-term project phase.

### Mainline rule

If a fresh conversation receives only a broad “continue the project” instruction, it must recover state from the repository and continue an already-approved mainline / standing maintenance loop. If no such actionable mainline exists, it must return candidate next milestones to the owner rather than inventing a phase.

### State design

Long-lived instructions store **how to recover state**, not snapshots of volatile state. Commit SHAs, branches, PR / Issue status, releases, event counts, and CI results must be re-read from GitHub.

### Consequences

- `docs/gpt-project-governance.md` becomes the canonical AI operating protocol.
- `docs/project-state.md` becomes the canonical semantic operational-state anchor.
- `docs/chatgpt-project-instructions.md` provides a thin paste-ready bootstrap for the ChatGPT Project and points back to repository governance rather than duplicating it.
- Existing agent, editorial, maintenance, contribution, and public Methodology wording must remain consistent with the enumerated hard gates.

Future amendments to this decision require explicit owner approval and should be recorded as a new dated entry rather than silently rewriting the rationale.

## 2026-09-17 — Trusted co-maintainer governance adopted

**Status:** Ratified by repository owner under the amendment procedure defined by the 2026-09-11 governance decision

### Problem

The repository is transitioning from solo maintenance to collaboration with a second human who is intended to operate as a **trusted maintainer / co-maintainer**, not merely as an external contributor.

The prior governance documents assumed that the GitHub repository owner was the sole human project authority. That assumption no longer matched the intended collaboration model and would have created ambiguity around human hard gates, roadmap decisions, PR review, and AI behavior when more than one trusted human directs the project.

### Decision

Adopt the ratified [`gpt-project-governance-co-maintainer-amendment.md`](./gpt-project-governance-co-maintainer-amendment.md) and a repository-native trusted-maintainer registry in [`MAINTAINERS.md`](../MAINTAINERS.md).

The repository owner and any explicitly activated trusted co-maintainer have **near-peer project decision authority**. GitHub account-level ownership or security controls that cannot be fully delegated remain mechanical platform facts rather than a general project-agenda hierarchy.

### Human-gate interpretation

Where existing governance says that a project-level decision requires explicit owner / human approval, an explicit approval from an active trusted maintainer satisfies the gate when no conflicting trusted-maintainer decision is known.

The existing hard gates themselves are unchanged.

### Conflict rule

If trusted maintainers issue materially conflicting explicit decisions on a constitutional, phase, high-risk editorial, or destructive-operation question, AI agents and automation must not decide which maintainer wins based on repository ownership, recency, commit count, or convenience.

The conflict becomes a human reconciliation gate.

### Maintainer activation

GitHub collaborator status alone does not create trusted-maintainer authority. A new maintainer must be explicitly designated and recorded in `MAINTAINERS.md` after the concrete GitHub identity is known and repository access has been accepted.

Once a stable second maintainer is activated, the intended `main` protection target is one approving review plus Code Owner review for sensitive paths while retaining the existing required CI, resolved-conversation, squash-only, linear-history, deletion, and non-fast-forward protections.

### Roadmap boundary

This governance transition does **not** approve a new product phase or any particular future workstream.

Historical-lineage work, UI / UX optimization, hosting migration, discovery automation, or other future directions remain undecided unless they are already covered by the standing maintenance loops or later receive explicit human approval.

### Consequences

- `docs/project-state.md` records the trusted co-maintainer model as semantic operational state.
- `docs/maintenance*.md` no longer describe the repository as a single-maintainer project.
- `docs/maintainer-guide*.md` provides the operating contract for trusted human maintainers.
- `AGENTS.md` treats `MAINTAINERS.md` and the co-maintainer amendment as mandatory state-recovery inputs.
- The second maintainer's concrete GitHub identity, `CODEOWNERS` membership, and multi-maintainer ruleset activation remain explicit follow-up steps after the collaborator invitation is accepted.

Future changes to this co-maintainer authority model require an explicit trusted-maintainer governance decision and must follow the conflict rule above.