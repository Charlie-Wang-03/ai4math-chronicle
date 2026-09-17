# AI4Math Chronicle — Trusted Co-Maintainer Governance Amendment

**Status:** Ratified governance amendment  
**Approved by:** Repository owner / current project maintainer  
**Approved on:** 2026-09-17  
**Amends:** [`gpt-project-governance.md`](./gpt-project-governance.md)  
**Scope:** Human maintainer authority, conflict handling, collaboration activation, and trusted-maintainer PR operation

This amendment changes the human-maintainer model from a single-owner decision surface to a **trusted co-maintainer model**. It does **not** create a new product phase or preselect a future editorial / UI / historical-lineage roadmap. It does allow trusted maintainers to carry out ordinary engineering and infrastructure work inside the approved static architecture, including auxiliary project URLs, hostname aliases, redirects, mirrors, and deployment notifications, provided those changes preserve the active canonical-origin and product contracts.

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

## 5. Agenda discipline and allowed engineering scope

Trusted co-maintainership does not itself authorize a new roadmap.

The approved standing mainline remains whatever is recorded in [`project-state.md`](./project-state.md) and the active Product Specification. A trusted maintainer may choose implementation paths and ordinary maintenance priorities inside that state, but a new long-term phase or major feature family still requires an explicit human decision under the existing governance process.

The collaboration-readiness work deliberately leaves future concrete editorial, UI / UX, and historical-lineage routes open.

Ordinary product / engineering maintenance may nevertheless include project-owned web URLs and deployment infrastructure when they remain subordinate to the active architecture. In particular, trusted maintainers may create or maintain auxiliary hostnames, redirects, mirrors, deployment notifications, and similar static-delivery infrastructure without treating each one as a new product phase. Such work must preserve the canonical Event source of truth, security boundaries, and the current canonical-site contract unless a separate migration decision explicitly changes that contract.

The self-hosted mirror notification introduced in PR #112 is an approved example of this allowed engineering scope: GitHub Pages remains the canonical indexed origin while auxiliary `aixmath.org` hostnames mirror the same `main` build.

## 6. Activation and Pull Request operation

A new co-maintainer becomes active only after all of the following are true:

1. an existing trusted maintainer explicitly designates the person as a trusted maintainer;
2. the person's concrete GitHub identity is recorded in [`MAINTAINERS.md`](../MAINTAINERS.md);
3. repository access appropriate to the intended maintenance work has been granted and accepted;
4. `CODEOWNERS` is updated where ownership / review routing should include the new maintainer;
5. the branch / ruleset configuration is reviewed for multi-maintainer operation;
6. the new maintainer has read the Product Specification, Governance Protocol plus this amendment, `project-state.md`, `AGENTS.md`, Maintenance Policy, Editorial Methodology, and the Maintainer Guide.

For the active trusted-maintainer setup, the required `main` protection model is:

- Pull Requests required for `main`;
- `validate-and-build` required and up to date with the target branch;
- review conversations resolved;
- squash merge only;
- linear history;
- deletion and non-fast-forward protection retained.

A blanket second-person approval is **not** required for trusted-maintainer PRs. `CODEOWNERS` records ownership and enables review routing, but Code Owner review is not a universal merge gate. An active trusted maintainer may open a focused PR and squash-merge that same PR after all enforced CI and branch-protection conditions pass, unless a specific task, a standing human gate, or an explicit maintainer decision requires another human review.

Requesting another maintainer's review is encouraged when it adds value, especially for high-blast-radius infrastructure, constitutional changes, ambiguous editorial judgments, or unfamiliar subsystems. A requested review does not itself become a blocking gate unless the maintainers explicitly make it one for that change.

The repository ruleset should therefore preserve the existing zero blanket-approval requirement unless the trusted maintainers later explicitly change the review model. This does not weaken the enumerated human hard gates: when such a gate applies, an active trusted maintainer must still make and record the required human decision.

## 7. Offboarding and authority removal

Removing repository access is not, by itself, a complete governance offboarding action. When a trusted maintainer leaves the role:

1. remove or update the entry in `MAINTAINERS.md`;
2. update `CODEOWNERS` and ruleset / review routing as needed;
3. review outstanding PRs, Issues, release responsibilities, and any human gates owned by that maintainer;
4. preserve historical authorship, review records, releases, and decision logs;
5. update `project-state.md` if the semantic maintenance model changed.

## 8. Precedence and unchanged rules

This amendment overrides the core Governance Protocol where that protocol assumes that the **repository owner is the sole human project authority**, and it supersedes the earlier collaboration-readiness expectation that every stable two-maintainer PR should require one approving review plus Code Owner review.

All other rules remain unchanged, including:

- source-of-truth hierarchy by information type;
- agent execution / agenda / constitutional authority boundaries;
- Event editorial hard gates themselves;
- static architecture and Product Specification boundaries;
- repository hygiene, validation, and handoff requirements;
- the rule that live GitHub state controls mechanical repository facts.

If this amendment and the core Governance Protocol appear to conflict outside the human-maintainer authority and PR-operation changes described here, treat that as a governance ambiguity and escalate to a trusted maintainer rather than silently broadening the amendment.