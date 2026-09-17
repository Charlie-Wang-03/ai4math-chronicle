# AI4Math Chronicle Maintainers

This file records the humans who currently hold **trusted maintainer** authority under the [Trusted Co-Maintainer Governance Amendment](./docs/gpt-project-governance-co-maintainer-amendment.md).

GitHub collaborator status alone does not create this role. A person becomes a trusted maintainer only after explicit designation and an update to this file.

## Active trusted maintainers

- [`@Charlie-Wang-03`](https://github.com/Charlie-Wang-03) — trusted maintainer and GitHub repository owner.
- [`@Zecyel`](https://github.com/Zecyel) — trusted co-maintainer, explicitly activated on 2026-09-17.

Both active trusted maintainers have near-peer project decision authority under the co-maintainer amendment. GitHub account-level controls that remain mechanically tied to the repository owner do not create a broader project-decision hierarchy.

## Maintainer operating model

Trusted maintainers may independently create focused branches and Pull Requests, run the required validation, and squash-merge their own PRs once all enforced branch-protection and CI conditions pass, unless a specific task, gate, or explicit maintainer decision requires another human review.

`CODEOWNERS` is used for ownership and review routing, not as a blanket requirement for cross-maintainer approval. The repository intentionally does **not** require one approving review or Code Owner review for every trusted-maintainer PR.

Project engineering may include auxiliary project URLs, hostname aliases, redirects, mirrors, or deployment notifications when they remain inside the approved static architecture and preserve the active canonical-origin contract. Such infrastructure work does not, by itself, authorize a canonical-site migration or a new product phase.

## Authority boundary

Trusted maintainers may exercise the human decision authority defined by the active governance documents, including approval at existing human hard gates.

If trusted maintainers issue materially conflicting explicit decisions on a constitutional, high-risk editorial, phase, or destructive-operation question, agents and automation must not choose between them; the conflict must be reconciled by the human maintainers.

---

## 中文说明

本文件记录当前拥有 **trusted maintainer / 可信维护者** 权限的人类维护者。GitHub collaborator 身份本身不等于 trusted maintainer；必须经过明确授权并写入本文件。

当前 active trusted maintainers 为：

- [`@Charlie-Wang-03`](https://github.com/Charlie-Wang-03) — trusted maintainer 与 GitHub 仓库所有者；
- [`@Zecyel`](https://github.com/Zecyel) — trusted co-maintainer，于 2026-09-17 明确激活。

两位维护者在项目决策层面基本持平。Trusted maintainer 可以自行创建聚焦 branch / PR，在 required CI 与分支保护条件全部通过后自行 squash merge；除非某个具体任务、human gate 或明确的人类决定要求另一位维护者复核，否则不强制双人审批。

`CODEOWNERS` 用于 ownership 与 review routing，并不意味着所有 trusted-maintainer PR 都必须取得另一位维护者的 approval。项目允许在既有静态架构与 canonical-origin 契约内建设辅助网页 URL、hostname alias、redirect、mirror 与部署通知；这类工程能力本身不等于批准 canonical-site migration 或新产品阶段。