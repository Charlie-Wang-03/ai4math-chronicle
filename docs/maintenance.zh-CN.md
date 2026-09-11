# 长期维护政策

[English](./maintenance.md) · **简体中文**

本文定义 AI4Math 大事记在 v0.1.0 公开发布后的长期维护节奏。它补充而不替代 [编辑方法论](./editorial-methodology.zh-CN.md)、[信源收集与 Intake 工作流](./source-intake.zh-CN.md)、[开发指南](./development.zh-CN.md)、[GPT 项目治理协议](./gpt-project-governance.md) 与 [贡献指南](../CONTRIBUTING.zh-CN.md)。

## 维护模型

AI4Math 大事记定位为精选历史档案，而不是实时新闻流。因此长期维护采用 **事件驱动 + 周期复核**，而不是固定每日发布数量。

默认工作循环为：

1. 通过结构化 Issues 与维护者研究收集 raw source leads、候选事件或纠错；
2. 完成去重与 triage，判断信源属于已有 Event、新 candidate、watch item，还是 scope 外 / 重要性不足的条目；
3. 对成熟 candidate，识别仍缺少哪些证据，并为每条事件或紧密相关事件组准备一个聚焦 PR；
4. 运行 CI，并完成必要的人工编辑门槛；
5. 审核后使用 squash merge；
6. `main` 持续部署到 GitHub Pages。

项目不承诺固定发布 SLA。准确性、可追溯性与历史选择质量优先于速度。

## 建议复核节奏

### Source Intake — 持续进行

可能有价值的论文、代码仓库、公告、artifact replay、独立分析、媒体报道和社区信号，可以在成熟为 Event proposal 之前先记录为 **Source Lead** Issue。

按照 [信源收集与 Intake 工作流](./source-intake.zh-CN.md) 处理这些 raw discovery，可以在不建立第二套事实数据库的前提下保持长期可追溯。每个 open lead 都应有明确的 triage 理由或缺失 trigger；成熟证据应进入 canonical Event，而不是长期堆积在 Issues。

Source Lead 不表示底层 claim 已经为真、足够重要或应当发布。S5 / 社区热度仍只用于 discovery，除非出现更强证据支持正式编辑判断。

### 事件收录 — 持续进行

新的候选里程碑可以随时提出。维护者可在合适时批量处理，不把项目运作成实时新闻流。

Candidate 可以直接来自成熟 Event Proposal，也可以由 Source Lead 在完成去重、scope 筛查与证据收集后升级得到。对于已经掌握成熟 evidence package 的 maintainer，如果中间 Issue 并不能增加审核价值，可以直接进入聚焦 Event branch / PR。

### 纠错 — 优先路径

当证据明确时，事实错误、一手证据链接失效、重要翻译错误以及误导性的验证状态，应优先于普通语料扩展处理。

### Verification 与独立佐证复核 — 相关事件至少每月一次

对标记为 `under_verification`、`partially_verified`、`disputed`，或仍存在重要未决不确定性的事件，应在可信新证据出现时及时复核。复核目标是追踪 Chronicle 的核心事件描述是否得到更多独立佐证、受到争议、发生纠错或需要重新解释，而不是让 Chronicle 充当数学正确性的最终裁判。

作为基线，仍处于活跃编辑关注中的高重要性事件至少每月进行一次轻量复核。Verification 更新必须保留历史，不得静默覆盖。

### 语料健康检查 — 每季度一次

至少每季度检查一次：

- 一手来源链接是否失效；
- verification 或独立佐证状态是否出现新进展；
- 是否存在重复或高度重叠的 Event；
- relationships 是否完整；
- taxonomy 是否发生漂移；
- `en` 与 `zh-CN` 呈现字段是否出现翻译漂移；
- 生成数据与搜索索引是否保持一致。

季度复核是维护目标，不是服务级保证。

## 人工编辑门槛

人工审核只保留给有限枚举的高风险决定，而不是所有普通维护修改。

长期保留的人工编辑 hard gates 为：

- 新增或实质性改变 **H1 — 历史级里程碑** 分类；
- 最终确定 `independently_verified`；
- 最终确定 `disputed`；
- 最终将 `corrected` 设为当前 verification status；
- 最终确定 `retracted`；
- 以 Chronicle 自身权威解决存在实质冲突的数学正确性、归属或历史优先权争议。

自动化可以把证据收集、完整 patch 与推荐结论准备到 gate 边界，但除非既有人工政策已经明确授权该类决定，否则不得在没有直接人工批准的情况下正式发布 gated status 或 classification。

较低风险的 evidence / verification 更新，在文档化规则满足且支持来源已记录时仍可高自治推进。

`independently_verified` 仍然表示独立于原始发布方的可靠来源已经实质性佐证 Chronicle 的核心事件描述；人工 gate 是发布治理要求，不表示 Chronicle 已经认证底层数学 claim 的最终正确性。

Chronicle 不应把“某个新数学事实是正确的”写成项目自身的最终裁决。这类判断应继续归属于可靠来源，并随着公开记录变化而更新。

历史重要性、来源强度、事件级独立佐证、formal assurance 与数学正确性是不同概念。

## 依赖与平台维护

Dependabot 每周检查 npm 与 GitHub Actions。

默认策略：

- patch / minor 依赖更新在 CI 通过并完成快速兼容性检查后可合并；
- runtime 或 toolchain major 升级作为专门迁移处理，而不是例行 housekeeping；
- GitHub Actions 继续固定到 immutable commit SHA；
- 会影响 production 的 workflow 变化，除了 PR CI，还必须通过合并后的真实 GitHub Pages 部署验证。

除非通过专门迁移有意修改，当前 runtime baseline 保持 Node 22。

## 版本发布策略

网站从 `main` 持续部署；GitHub Releases 用于提供不可漂移、可引用的 Chronicle 快照。

版本号采用 **项目快照版本策略，而不是面向库 API 的严格 Semantic Versioning**。

默认解释：

- `v0.1.x` — 冻结 v0.1 产品 / 编辑契约下的维护快照，包括纠错、增量事件收录、metadata、依赖和 UI 维护，只要这些变化不要求修改产品 Specification；
- `v0.2.0` — 有意义的产品 / 编辑阶段变化、较大规模语料计划变化，或新增会改变 v0.1 契约的持续维护能力，但尚未达到稳定 1.0；
- `v1.0.0` — 保留给经过实践验证、适合作为长期公共参考的成熟稳定编辑与维护模型。

不要为每个合并 PR 或每条新事件创建 GitHub Release。只有当累积变化形成一个值得引用、复现或对外沟通的完整状态时，才创建新的 snapshot。

发布前应：

1. 确认 `main` 全绿；
2. 确认 production Pages 部署全绿；
3. 必要时更新带版本信息的 citation metadata；
4. 在准确的目标 commit 上创建 tag；
5. 发布 Release notes，总结语料与治理变化，但不得夸大 verification 或数学正确性。

已经发布的 tag 与 Release 属于历史记录，不应移动或重写。

## 维护责任模型

在形成多位可信维护者之前，仓库继续采用单 maintainer 模式：

- 外部贡献者通常通过 Issues、fork 和聚焦 PR 工作；
- `CODEOWNERS` 用于把敏感改动路由给维护者关注；
- required approvals 保持为 0，避免单人维护被自锁；
- 当出现第二位稳定 maintainer 后，可以考虑对敏感路径要求 1 个 approval 与 Code Owner review。

仓库设置继续保持最小化：开启 Issues；Projects、Wiki 与 Discussions 保持关闭，直到真实协作规模证明它们有必要。

跨对话的 Agent 权限、state recovery 与 agenda 限制以 [`gpt-project-governance.md`](./gpt-project-governance.md) 为准；当前批准的语义阶段与主线记录在 [`project-state.md`](./project-state.md)。

## 健康维护的定义

满足以下条件时，可以认为项目处于健康维护状态：

- canonical Event data 始终是唯一事实源；
- 有价值的 source lead 会被持久化 triage，而不是依赖浏览器标签页或聊天历史；
- 未解决的纠错与高重要性事件佐证问题保持可见，而不是被隐藏；
- CI、CodeQL 与 Pages deployment 保持绿色；
- 依赖更新受控，不制造 toolchain churn；
- 公开贡献入口始终可用；
- Release 周期性提供可引用快照，同时不会把仓库拖入沉重的 release management；
- 一个全新的 AI 协作对话可以仅依赖仓库证据恢复当前项目状态，而不依赖陈旧聊天上下文。
