# AI4Math 大事记 — Trusted Maintainer 指南

[English](./maintainer-guide.md) · **简体中文**

本指南面向已经在 [`MAINTAINERS.md`](../MAINTAINERS.md) 中被明确指定为 **trusted maintainer / 可信维护者** 的人类维护者。

它用于说明：如何在多人维护下行使维护权限，同时避免把项目规则退化成依赖私人聊天、口头默契或临时习惯的协作方式。本文补充 Product Specification、GPT Governance Protocol、co-maintainer amendment、Editorial Methodology、Maintenance Policy、Development Guide、Architecture 与 `AGENTS.md`。

本文**不定义新的项目路线图**。协作治理与“下一阶段具体做什么”被明确分离；建立共同维护模式本身，不代表已经批准“历史事件逻辑链条”“网页 UI / UX 优化”“网站迁移”或其他具体路线。

## 1. 从仓库真实状态开始

进行 substantial work 之前，先从仓库恢复当前状态，不依赖旧聊天摘要、旧 SHA 或记忆中的分支状态。

至少阅读：

1. [`gpt-project-governance.md`](./gpt-project-governance.md)；
2. [`gpt-project-governance-co-maintainer-amendment.md`](./gpt-project-governance-co-maintainer-amendment.md)；
3. [`product-spec-v0.1.md`](./product-spec-v0.1.md) 与 [`project-state.md`](./project-state.md) 指定的有效 amendments；
4. [`project-state.md`](./project-state.md)；
5. [`../AGENTS.md`](../AGENTS.md)；
6. 与当前任务有关的 [`development.md`](./development.md)、[`architecture.md`](./architecture.md)、[`editorial-methodology.md`](./editorial-methodology.md)、[`maintenance.md`](./maintenance.md) 和 [`../CONTRIBUTING.md`](../CONTRIBUTING.md)。

随后核验 live GitHub 机械事实：默认分支、HEAD、开放 PR / Issues、相关 branches、近期 commits、当前 Release、CI / deployment 状态以及任务相关文件。

## 2. Maintainer 权限

Trusted maintainers 在项目决策层面拥有基本对等的权限。

一位 trusted maintainer 通常可以：

- 在已批准 mainline 内选择并推进聚焦任务；
- 创建 branches、Issues、PRs、reviews 与 release-preparation 改动；
- triage source leads、corrections、bugs 与维护任务；
- 在证据规则满足时发布普通 H2 / H3 Event 改动；
- 审批或拒绝普通工程 / 编辑 PR；
- 在愿意承担该决定责任时，对现有 human hard gate 给出明确批准；
- 提议并明确批准产品或治理变更，但仍受下文冲突规则约束；
- 在相同仓库治理规则下协调 AI agents 与自动化。

GitHub 仓库所有者可能因为平台限制而保留某些无法完全委派的账户级权限。应把这看作平台机械事实，而不是默认的项目议程层级。

## 3. Human hard gates

现有 hard gates 不因多人维护而削弱，包括：

- 新增或实质性改变 H1 分类；
- `independently_verified`；
- `disputed`；
- 将 `corrected` 设为当前 verification status；
- `retracted`；
- Chronicle 自身对重大数学正确性、归属或历史优先权争议作出裁决；
- Product Specification 或治理规则变更；
- source-of-truth、canonical Event model、inclusion boundary、significance / verification framework 或 human-gate policy 变更；
- 创建新的长期产品 / 编辑阶段；
- 治理文档定义的 destructive / high-blast-radius repository operations。

在不存在另一位 trusted maintainer 的已知冲突决定时，**任何 active trusted maintainer 的明确批准都可以满足 human gate**。

不要因为维护者变多，就把这些人工门槛转化为普通自动化检查。

## 4. Maintainer 冲突处理

基本对等权限必须配套明确的人类冲突规则。

如果另一位 trusted maintainer 已经对宪法性、阶段性、高风险编辑或 destructive-operation 问题作出实质冲突的明确决定：

1. 不要要求 AI 选择谁的指令“优先”；
2. 不要根据仓库 owner 身份、时间先后、commit 数量或谁创建了 PR 推断优先级；
3. 只暂停真正发生冲突的决策边界，不阻塞无关维护工作；
4. 由人类维护者协商解决；
5. 若结果改变长期语义状态，应写回对应 canonical 文档。

对于已批准目标内部的普通实现细节，维护者可以互相委派 task ownership，不需要在仓库既有 PR review 规则之外人为增加重复审批。

## 5. Branch 与 Pull Request 工作流

对于 non-trivial work：

1. 从当前 `main` 开始；
2. 使用聚焦 branch；
3. 一个 PR 只处理一个连贯目标；
4. 当 Issue 能增加可追溯性时再关联相关 Issue；
5. 在 PR body 中说明证据、不确定性与任何 human gate；
6. 运行相关 validation；
7. 在 review / CI 条件满足后使用 squash merge。

不要因为两位维护者彼此信任，就绕过受保护分支工作流。

第二位 maintainer 正式激活后，`main` 的目标保护模型为：至少 1 个 approving review；敏感路径要求 Code Owner review；同时继续保留既有 required CI 与 history protections。

## 6. Event / 编辑改动

Event 工作必须继续维护 canonical YAML 模型，并遵循 Editorial Methodology。

合并前至少应能回答：

- 这是否是一个 canonical Event，而不是重复报道？
- 日期是否有证据支持，而不是为了 schema 方便人为补齐？
- 是否至少存在一个 S1 / S2 authoritative source？
- AI 与 human contribution 是否准确分离？
- significance 与 verification 是否保持独立？
- 高风险表述是否在需要时明确 attribution？
- 是否触发 human gate？
- relationships、correction history 与 verification history 是否仍然一致？

Source Lead Issues 继续只是 operational workflow records，不是第二套事实数据库。

## 7. 工程改动

对于代码、UI、search、accessibility、SEO / GEO、deployment 与 maintenance：

- 除非 Product Specification 已明确批准变更，否则保持 static Astro + TypeScript 架构；
- 除非已有迁移决策，否则保持 GitHub Project Pages base-path contract；
- canonical Event YAML 始终是唯一事实源；
- English 与 `zh-CN` 展示继续从同一 canonical record 派生；
- 行为或操作契约变化时同步更新文档；
- 普通 code 或 Event-data 改动执行完整验证：

```bash
npm ci
npm test
npm run build
```

若影响 reader-facing behavior，还应执行 browser-level QA。

## 8. Release 与 production 改动

GitHub Pages 从 `main` 持续部署；Releases 是可引用快照，而不是每个 PR 的产物。

发布前确认：

1. `main` 全绿；
2. production Pages deployment 全绿；
3. 必要时 citation / version metadata 正确；
4. tag 指向预期 commit；
5. release notes 不夸大数学正确性或 verification。

不得重写已发布 tag 或 Release。

未来 hosting / domain / deployment migration **不会因为 co-maintainer 模式建立而自动获得批准**。任何此类迁移都应根据当时 Product Specification 与 governance 单独评估和批准。

## 9. 路线图纪律

Co-maintainer 模式不预先决定维护者下一步应该推进什么。

不要因为某些方向曾被讨论，就把更深的历史 relationships、UI / UX redesign、hosting migration、新 discovery automation 或其他 feature family 当成已批准路线。

使用 [`project-state.md`](./project-state.md) 区分：

- 已批准的 standing maintenance loops；
- 明确 active objectives；
- 仍需人类决定的 candidate directions。

## 10. 激活第二位 trusted maintainer

当具体 collaborator 账号准备好后：

1. 邀请该账号，并授予与 trusted maintenance 相匹配的 repository access；
2. 等待其接受邀请；
3. 将准确 GitHub username 写入 [`MAINTAINERS.md`](../MAINTAINERS.md)；
4. 将其加入 [`.github/CODEOWNERS`](../.github/CODEOWNERS) 中相应条目；
5. 更新 `main` ruleset：要求 1 个 approving review，并对敏感路径启用 Code Owner review；
6. 保留 `validate-and-build`、strict up-to-date checks、resolved review conversations、squash-only merge、linear history、deletion protection 与 non-fast-forward protection；
7. 实际验证两位维护者都能创建 branch、review PR，并在不造成 protection deadlock 的前提下完成预期 workflow；
8. 确认新维护者已经阅读 canonical governance 与 maintainer 文档；
9. 仅在语义维护状态相较已批准 co-maintainer 模式继续发生变化时，再更新 `project-state.md`。

在 collaborator 接受权限之前，不要把占位 GitHub 身份写入 canonical maintainer registry。

## 11. Offboarding

当 trusted maintainer 离开维护角色时：

- 更新 `MAINTAINERS.md`；
- 更新 `CODEOWNERS` 与 repository review routing；
- 按需要撤销或降低 repository access；
- 重新分配 active Issues / PRs / release responsibilities；
- 保留历史 authorship 与 decision records；
- 如果语义维护模型发生变化，更新 `project-state.md`。

## 12. 健康协作的定义

满足以下条件时，可以认为多人维护模型处于健康状态：

- 任一维护者都能仅依赖仓库恢复项目真实状态；
- substantial changes 通过聚焦 PR 与 deterministic validation；
- 敏感编辑 / 治理决定显式且可审计；
- 任一维护者都不需要私人聊天上下文才能理解当前规则；
- 已知人类分歧被明确暴露，而不是交给 AI 仲裁；
- 项目决策权得到共享，同时 canonical data model、证据纪律与 branch protections 没有被削弱；
- 路线图仍通过明确决策产生，而不是由“谁先实现了某项东西”反向决定。