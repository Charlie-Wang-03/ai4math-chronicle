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