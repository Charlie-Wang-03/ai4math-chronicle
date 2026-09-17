# AI4Math Chronicle — Trusted Maintainer Guide

**English** · [简体中文](./maintainer-guide.zh-CN.md)

This guide is for humans who have been explicitly designated as **trusted maintainers** in [`MAINTAINERS.md`](../MAINTAINERS.md).

It explains how to exercise maintainer authority without turning collaboration into undocumented personal convention. It complements the Product Specification, Governance Protocol, co-maintainer amendment, Editorial Methodology, Maintenance Policy, Development Guide, Architecture, and `AGENTS.md`.

It does **not** define a new roadmap. The collaboration model is intentionally separated from decisions about what the next concrete product / editorial / engineering initiative should be.

## 1. Start from repository truth

Before substantial work, recover the current state from the repository rather than from old chat history or remembered SHAs.

Read:

1. [`gpt-project-governance.md`](./gpt-project-governance.md);
2. [`gpt-project-governance-co-maintainer-amendment.md`](./gpt-project-governance-co-maintainer-amendment.md);
3. [`product-spec-v0.1.md`](./product-spec-v0.1.md) plus active amendments named in [`project-state.md`](./project-state.md);
4. [`project-state.md`](./project-state.md);
5. [`../AGENTS.md`](../AGENTS.md);
6. task-relevant guides such as [`development.md`](./development.md), [`architecture.md`](./architecture.md), [`editorial-methodology.md`](./editorial-methodology.md), [`maintenance.md`](./maintenance.md), and [`../CONTRIBUTING.md`](../CONTRIBUTING.md).

Then verify live GitHub mechanics: default branch, HEAD, open PRs / Issues, relevant branches, recent commits, current release, CI / deployment state, and task-relevant files.

## 2. Maintainer authority

Trusted maintainers have near-peer project decision authority.

A trusted maintainer may ordinarily:

- choose and execute scoped work inside the approved mainline;
- create branches, Issues, PRs, reviews, and release-preparation changes;
- triage source leads, corrections, bugs, and maintenance work;
- publish ordinary H2 / H3 Event changes when the evidence rules are satisfied;
- approve or reject ordinary engineering / editorial PRs;
- authorize an existing human hard gate when they are comfortable taking responsibility for that decision;
- propose and explicitly approve product or governance changes, subject to the conflict rule below;
- coordinate with AI agents or automation under the same repository governance rules.

The GitHub repository owner may retain account-level controls that the platform cannot fully delegate. Treat that as a mechanical security / administration fact, not as a default agenda hierarchy.

## 3. Human hard gates

The standing gates remain unchanged. They include:

- a new or materially changed H1 classification;
- `independently_verified`;
- `disputed`;
- `corrected` as the current verification status;
- `retracted`;
- material Chronicle adjudication of mathematical correctness, attribution, or historical priority;
- Product Specification or governance changes;
- source-of-truth, canonical Event model, inclusion-boundary, significance / verification framework, or human-gate changes;
- creation of a new long-term product / editorial phase;
- destructive or high-blast-radius repository operations covered by governance.

Any active trusted maintainer may satisfy a human gate through explicit approval when no conflicting trusted-maintainer decision is known.

Do not convert a human gate into a routine automated check merely because the project has more maintainers.

## 4. Maintainer conflict handling

Near-peer authority requires an explicit disagreement rule.

If another trusted maintainer has made a materially conflicting explicit decision about a constitutional, phase, high-risk editorial, or destructive-operation question:

1. do not ask an AI agent to choose whose instruction should win;
2. do not infer priority from repository ownership, recency, commit count, or who opened the PR;
3. pause only the conflicting decision boundary, not unrelated project maintenance;
4. reconcile the decision between the human maintainers;
5. persist the resolved durable rule in the appropriate canonical document if the semantic project state changed.

For ordinary implementation details, maintainers can delegate ownership of a task to one another and avoid unnecessary dual approval outside the repository's normal PR review rule.

## 5. Branch and Pull Request workflow

For non-trivial work:

1. start from current `main`;
2. use a focused branch;
3. keep the PR limited to one coherent objective;
4. link relevant Issues when they add useful traceability;
5. explain evidence, uncertainty, and any human gate in the PR body;
6. run the relevant validation;
7. use squash merge when the PR is ready and all required review / CI conditions are satisfied.

Do not bypass the protected-branch workflow merely because both maintainers trust one another.

After the second maintainer is fully activated, the intended `main` protection model is one approving review plus Code Owner review for sensitive paths, together with the existing required CI and history protections.

## 6. Editorial changes

For Event work, preserve the canonical YAML model and follow the Editorial Methodology.

A maintainer should be able to answer before merge:

- Is this one canonical Event rather than duplicated reporting?
- Is the date supported rather than invented for schema convenience?
- Is there at least one S1 / S2 authoritative source?
- Are AI and human contributions separated accurately?
- Is significance distinct from verification?
- Is any high-risk wording source-attributed where needed?
- Does a human gate apply?
- Are relationships and correction / verification history still internally coherent?

Source Lead Issues remain operational workflow records, not a second factual database.

## 7. Engineering changes

For code, UI, search, accessibility, SEO / GEO, deployment, and maintenance work:

- preserve the static Astro + TypeScript architecture unless a Product Specification change is explicitly approved;
- preserve the GitHub Project Pages base-path contract unless an approved migration changes it;
- keep canonical Event YAML as the single factual source;
- keep English and `zh-CN` presentation derived from shared canonical records;
- update documentation when behavior or operating contracts change;
- run the full validation gate for ordinary code or Event-data changes:

```bash
npm ci
npm test
npm run build
```

Run browser-level QA when reader-facing behavior changes.

## 8. Releases and production changes

GitHub Pages deploys continuously from `main`; Releases are citable snapshots rather than every-PR artifacts.

Before a release, verify:

1. `main` is green;
2. production Pages deployment is green;
3. citation/version metadata is correct when relevant;
4. the tag points to the intended commit;
5. release notes do not overstate mathematical correctness or verification.

Do not rewrite published tags or releases.

A future hosting / domain / deployment migration is not implicitly authorized by this collaboration setup. Such a migration should be evaluated and approved on its own merits under the active Product Specification and governance rules.

## 9. Roadmap discipline

The co-maintainer model does not preselect what the maintainers should work on next.

Do not treat possible future directions—such as deeper historical relationship work, UI / UX redesign, hosting migration, new discovery automation, or another feature family—as approved merely because they have been discussed.

Use [`project-state.md`](./project-state.md) to distinguish:

- standing maintenance loops that are already approved;
- explicit active objectives;
- candidate directions that still need a human decision.

## 10. Activating a second trusted maintainer

When the concrete collaborator account is ready:

1. invite the account with repository access appropriate to trusted maintenance;
2. wait until the invitation is accepted;
3. add the exact GitHub username to [`MAINTAINERS.md`](../MAINTAINERS.md);
4. add the maintainer to the appropriate entries in [`.github/CODEOWNERS`](../.github/CODEOWNERS);
5. update the `main` ruleset to require one approving review and Code Owner review for sensitive paths;
6. retain `validate-and-build`, strict up-to-date checks, resolved review conversations, squash-only merge, linear history, deletion protection, and non-fast-forward protection;
7. verify that both maintainers can create branches, review PRs, and complete the intended workflow without a protection deadlock;
8. ensure the new maintainer has read the canonical governance and maintainer documents;
9. update `project-state.md` only if the semantic maintenance state changed beyond the already-approved co-maintainer model.

Do not add a placeholder GitHub identity before the collaborator has accepted access.

## 11. Offboarding

When a trusted maintainer leaves:

- update `MAINTAINERS.md`;
- update `CODEOWNERS` and repository review routing;
- remove or reduce repository access as appropriate;
- reassign active Issues / PRs / release responsibilities;
- preserve historical authorship and decision records;
- update `project-state.md` if the semantic maintenance model changes.

## 12. Definition of healthy collaboration

The collaboration model is healthy when:

- either maintainer can recover project state from the repository;
- substantial changes go through focused PRs and deterministic validation;
- sensitive editorial / governance decisions remain explicit and auditable;
- neither maintainer depends on private chat context to understand the current rules;
- known human disagreement is surfaced rather than arbitrated by AI;
- project decision authority is shared without weakening the canonical data model, evidence discipline, or branch protections;
- roadmap decisions remain deliberate rather than being inferred from whoever happens to implement something first.