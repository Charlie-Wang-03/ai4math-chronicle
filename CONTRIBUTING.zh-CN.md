# 贡献指南

[English](./CONTRIBUTING.md) · **简体中文**

感谢你帮助改进 AI4Math 大事记。本项目接受聚焦的事实纠错、证据升级、新事件提案、元数据修正，以及不破坏 canonical data model 的实现改进。

## 开始之前

内容相关修改请先阅读 [编辑方法论](./docs/editorial-methodology.zh-CN.md)；实现相关修改请先阅读 [架构说明](./docs/architecture.zh-CN.md)。

当前仓库仍处于 v0.1 公开发布门槛之前，因此在切换为 public 前，贡献入口仍可能继续调整。

## 事件贡献流程

对于新增或修改事件：

1. 在 `data/events/*.yaml` 下新增或修改一条记录。
2. 保持稳定 Event ID；不要因为标题变化就重命名已有 ID。
3. 提供中英双语事实字段（`en` 与 `zh-CN`）。
4. 提供权威证据。每条正式发布事件至少需要一个 S1 或 S2 来源。
5. 明确写出 AI contribution 与 human contribution。
6. 将 significance、verification status、evidence level 与 formal assurance 分开处理。
7. 状态变化应追加到 `verification.history`。
8. 事实纠正应写入 `corrections`，并引用对应 source ID。
9. 运行完整本地校验流程。
10. 提交聚焦的 Pull Request，说明证据、不确定性与预期的编辑性改动。

## 人工编辑门槛

自动化分析可以提出分类建议，但贡献不得单方面最终确定：

- `H1`；
- `independently_verified`；
- “某个新数学事实已经成立”的判断。

这些决定必须经过人工编辑审核。

## 本地校验

需要 Node.js `>=22.12.0`。

```bash
npm install
npm run validate
npm test
npm run build
```

内容类 Pull Request 在以上三个 validation / build 步骤全部通过前，不应视为 ready。

## 来源要求

证据层级定义为：

- **S1：** 一手研究记录或原始 artifact；
- **S2：** 机构或研究者官方来源；
- **S3：** 独立学术验证或分析；
- **S4：** 高质量二手媒体；
- **S5：** 仅作为社区发现信号。

S5 可以帮助发现候选事件，但不足以单独支持正式收录。

## Pull Request 范围

优先提交小而可审查的 PR。事件相关修改通常应限制为单条事件或一个紧密相关的事件组。不要在同一 PR 中混入无关的 UI refactor、依赖升级与编辑性修改。

一份合格的 PR 描述应说明：

- 改了什么；
- 为什么需要修改；
- 哪些来源支持修改；
- 仍存在哪些不确定性；
- 是否触发人工编辑门槛；
- 哪些校验命令已通过。

## 实现类贡献

MVP 刻意保持静态、GitHub-native。除非未来 Product Specification 明确修改方向，否则实现应保持：

- 不引入 backend 或账号系统；
- 不在 canonical YAML 之外维护第二份事实数据库；
- 不允许绕过人工编辑审核的 autonomous publication；
- 保持 `/ai4math-chronicle/` 下的 GitHub Pages project-site 兼容性；
- 静态、可索引 HTML 与机器可读导出继续作为一级产物。

## 纠错与争议事件

不要静默重写历史记录。如果发布后证据发生变化：

- 视情况更新 `verification.status`；
- 追加 `verification.history`；
- 当事实陈述发生变化时新增 `corrections`；
- 保留理解“改了什么、为什么改”所需的来源。

Chronicle 应当显式呈现不确定性，而不是把不确定性从历史记录中抹去。
