# AI4Math Chronicle — Trusted Co-Maintainer Governance Amendment

**Status:** Ratified governance amendment  
**Approved by:** Repository owner / current project maintainer  
**Approved on:** 2026-09-17  
**Amends:** [`gpt-project-governance.md`](./gpt-project-governance.md)  
**Scope:** Human maintainer authority, conflict handling, and collaboration activation

This amendment changes the human-maintainer model from a single-owner decision surface to a **trusted co-maintainer model**. It does **not** create a new product phase, select a new roadmap, or authorize any particular future workstream such as historical-lineage expansion, UI / UX redesign, hosting migration, or another major capability.

The core operating principle remains:

> **High execution authority, limited agenda authority, no autonomous constitutional authority.**

The change is that human approval may now come from an explicitly designated trusted maintainer, not only from the GitHub repository owner.

## 1. Trusted maintainer role

A **trusted maintainer** is a human explicitly designated as such in [`MAINTAINERS.md`](../MAINTAINERS.md).

GitHub collaborator status, repository write access, Issue assignment, PR review activity, or contribution history does **not** by itself create trusted-maintainer authority. The role must be explicitly granted and recorded.

The repository owner and any explicitly designated trusted co-maintainer have **near-peer project decision authority** across ordinary product, editorial, engineering, release, maintenance, and governance decisions.

The GitHub repository owner may retain account-level controls that the platform cannot fully delegate, including ownership, certain security / billing / installation settings, and other account-scoped operations. That mechanical distinction does **not** create a general project-agenda hierarchy between trusted maintainers.

## 2. Human hard-gate authority

Where the core Governance Protocol, `AGENTS.md`, the Editorial Methodology, Maintenance Policy, contribution workflow, or PR template says that a decision requires explicit owner / human approval, interpret the project-level approval authority as follows unless a more specific rule applies:

> **Explicit approval from an active trusted maintainer satisfies the human gate.**

This includes the standing gates for:

- a new or materially changed `H1` classification;
- finalizing `independently_verified`;
- finalizing `disputed`;
- finalizing `corrected` as the current verification status;
- finalizing `retracted`;
- resolving a material mathematical-correctness, attribution, or historical-priority dispute on the Chronicle's own authority;
- changing the Product Specification;
- changing the GPT Governance Protocol or a ratified governance amendment;
- changing the source-of-truth hierarchy, canonical Event model, inclusion boundary, significance framework, verification framework, or human-gate policy;
- creating a new long-term product / editorial phase;
- authorizing destructive or high-blast-radius repository operations that are human-gated by policy.

A trusted maintainer may prepare, propose, review, or explicitly approve such a decision. Agents and automation still have no autonomous authority to cross these gates.

## 3. Maintainer-to-maintainer conflict rule

Trusted maintainers are not ranked by an AI agent, automation, recency heuristic, commit count, repository activity, or GitHub role.

If two trusted maintainers issue **materially conflicting explicit decisions** about any of the following, the conflict becomes a human reconciliation gate:

- Product Specification or project scope;
- governance or human-gate policy;
- a new project phase or major maintained capability;
- an H1 or high-risk verification decision;
- a material mathematical-correctness / attribution / priority adjudication;
- a destructive or high-blast-radius repository operation.

In that situation, an agent must not silently choose the newer instruction, the repository owner's instruction, or the instruction that appears more convenient. It should surface the conflict and wait for the human maintainers to reconcile it.

For ordinary implementation details inside an already-approved objective, maintainers may delegate task ownership to one another. A clearly scoped task instruction from the maintainer currently directing that task is authoritative unless it conflicts with a standing project contract or an explicit decision from another trusted maintainer.

## 4. Constitutional-change interpretation

A trusted maintainer may explicitly authorize a constitutional or governance change when no conflicting trusted-maintainer decision is known.

If another trusted maintainer has already expressed a conflicting standing position on the same constitutional question, the change must not be finalized until the conflict is reconciled.

This rule preserves near-peer human authority without forcing unanimous approval for every routine governance edit, while preventing AI or automation from arbitrating substantive human disagreement.

## 5. Agenda discipline remains unchanged

Trusted co-maintainership does not itself authorize a new roadmap.

The approved standing mainline remains whatever is recorded in [`project-state.md`](./project-state.md) and the active Product Specification. A trusted maintainer may choose implementation paths and ordinary maintenance priorities inside that state, but a new long-term phase or major feature family still requires an explicit human decision under the existing governance process.

The collaboration-readiness work ratified by this amendment deliberately leaves future concrete routes open.

## 6. Activation of a new trusted maintainer

A new co-maintainer becomes active only after all of the following are true:

1. an existing trusted maintainer explicitly designates the person as a trusted maintainer;
2. the person's concrete GitHub identity is recorded in [`MAINTAINERS.md`](../MAINTAINERS.md);
3. repository access appropriate to the intended maintenance work has been granted and accepted;
4. `CODEOWNERS` is updated where review routing should include the new maintainer;
5. the branch / ruleset configuration is reviewed for multi-maintainer operation;
6. the new maintainer has read the Product Specification, Governance Protocol plus this amendment, `project-state.md`, `AGENTS.md`, Maintenance Policy, Editorial Methodology, and the Maintainer Guide.

For a stable two-maintainer setup, the intended protection target is:

- Pull Requests required for `main`;
- one approving review required;
- Code Owner review required for sensitive paths once both maintainers are represented in `CODEOWNERS`;
- `validate-and-build` required and up to date with the target branch;
- review conversations resolved;
- squash merge only;
- linear history;
- deletion and non-fast-forward protection retained.

Do not enable a protection rule that would deadlock the repository before the second maintainer has accepted access and can actually review.

## 7. Offboarding and authority removal

Removing repository access is not, by itself, a complete governance offboarding action. When a trusted maintainer leaves the role:

1. remove or update the entry in `MAINTAINERS.md`;
2. update `CODEOWNERS` and ruleset / review routing as needed;
3. review outstanding PRs, Issues, release responsibilities, and any human gates owned by that maintainer;
4. preserve historical authorship, review records, releases, and decision logs;
5. update `project-state.md` if the semantic maintenance model changed.

## 8. Precedence and unchanged rules

This amendment overrides the core Governance Protocol only where that protocol assumes that the **repository owner is the sole human project authority**.

All other rules remain unchanged, including:

- source-of-truth hierarchy by information type;
- agent execution / agenda / constitutional authority boundaries;
- Event editorial hard gates themselves;
- static architecture and Product Specification boundaries;
- repository hygiene, validation, and handoff requirements;
- the rule that live GitHub state controls mechanical repository facts.

If this amendment and the core Governance Protocol appear to conflict outside the human-maintainer authority change described here, treat that as a governance ambiguity and escalate to a trusted maintainer rather than silently broadening the amendment.