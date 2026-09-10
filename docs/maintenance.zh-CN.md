# 长期维护政策

[English](./maintenance.md) · **简体中文**

本文定义 AI4Math 大事记在 v0.1.0 公开发布后的长期维护节奏。它补充而不替代 [编辑方法论](./editorial-methodology.zh-CN.md)、[开发指南](./development.zh-CN.md) 与 [贡献指南](../CONTRIBUTING.zh-CN.md)。

## 维护模型

AI4Math 大事记定位为精选历史档案，而不是实时新闻流。因此长期维护采用 **事件驱动 + 周期复核**，而不是固定每日发布数量。

默认工作循环为：

1. 通过 Issues 与维护者研究收集候选事件或纠错；
2. triage 判断是否属于收录范围，以及仍缺少哪些证据；
3. 每条事件或紧密相关事件组准备一个聚焦 PR；
4. 运行 CI，并完成必要的人工编辑门槛；
5. 审核后使用 squash merge；
6. `main` 持续部署到 GitHub Pages。

项目不承诺固定发布 SLA。准确性、可追溯性与历史选择质量优先于速度。

## 建议复核节奏

### 事件收录 — 持续进行

新的候选里程碑可以随时提出。维护者可在合适时批量处理，不把项目运作成实时新闻流。

### 纠错 — 优先路径

当证据明确时，事实错误、一手证据链接失效、重要翻译错误以及误导性的验证状态，应优先于普通语料扩展处理。

### 验证状态复核 — 相关事件至少每月一次

对标记为 `under_verification`、`partially_verified`、`disputed`，或仍存在重要未决不确定性的事件，应在可信新证据出现时及时复核。作为基线，仍处于活跃争议中的高重要性 claim 至少每月进行一次轻量复核。

验证状态更新必须保留历史，不得静默覆盖。

### 语料健康检查 — 每季度一次

至少每季度检查一次：

- 一手来源链接是否失效；
- 未决 verification 状态是否出现新进展；
- 是否存在重复或高度重叠的 Event；
- relationships 是否完整；
- taxonomy 是否发生漂移；
- `en` 与 `zh-CN` 呈现字段是否出现翻译漂移；
- 生成数据与搜索索引是否保持一致。

季度复核是维护目标，不是服务级保证。

## 人工编辑门槛

既有人工编辑门槛保持不变。自动化和贡献者可以提出建议，但不得单方面最终确定：

- 新的 **H1 — 历史级里程碑**，除非已经在既定标准下获得明确授权；
- `independently_verified`；
- “某个新数学事实已经成立”的判断。

历史重要性、证据强度与验证确定性继续作为彼此独立的维度。

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
5. 发布 Release notes，总结语料与治理变化，但不得夸大 verification。

已经发布的 tag 与 Release 属于历史记录，不应移动或重写。

## 维护责任模型

在形成多位可信维护者之前，仓库继续采用单 maintainer 模式：

- 外部贡献者通常通过 Issues、fork 和聚焦 PR 工作；
- `CODEOWNERS` 用于把敏感改动路由给维护者关注；
- required approvals 保持为 0，避免单人维护被自锁；
- 当出现第二位稳定 maintainer 后，可以考虑对敏感路径要求 1 个 approval 与 Code Owner review。

仓库设置继续保持最小化：开启 Issues；Projects、Wiki 与 Discussions 保持关闭，直到真实协作规模证明它们有必要。

## 健康维护的定义

满足以下条件时，可以认为项目处于健康维护状态：

- canonical Event data 始终是唯一事实源；
- 未解决的纠错与高重要性 verification 问题保持可见，而不是被隐藏；
- CI、CodeQL 与 Pages deployment 保持绿色；
- 依赖更新受控，不制造 toolchain churn；
- 公开贡献入口始终可用；
- Release 周期性提供可引用快照，同时不会把仓库拖入沉重的 release management。
