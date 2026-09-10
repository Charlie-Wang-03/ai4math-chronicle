<p align="center">
  <img src="./assets/readme/hero.svg" alt="AI4Math Chronicle — timeline-first, evidence-backed archive of major milestones in AI for Mathematics" width="100%" />
</p>

<p align="center">
  <a href="./README.md">English</a> · <strong>简体中文</strong>
</p>

# AI4Math 大事记

**AI4Math 大事记** 是一个以时间线为核心、基于证据的 **AI for Mathematics 重大进展档案**。

它主要面向希望快速理解 AI4Math 历史演进的读者：哪些事件真正重要，它们为什么重要，AI 与人类分别完成了什么，以及最强的一手证据在哪里。

> **公开网站：** [AI4Math 大事记](https://charlie-wang-03.github.io/ai4math-chronicle/zh-CN/)

## 开始浏览

- **[完整时间线](https://charlie-wang-03.github.io/ai4math-chronicle/zh-CN/)** —— 从早期神经定理证明一直浏览到研究级数学发现。
- **[探索事件](https://charlie-wang-03.github.io/ai4math-chronicle/zh-CN/explore/)** —— 按年份、事件类型、重要性、验证状态与系统比较和筛选事件。
- **[方法论](https://charlie-wang-03.github.io/ai4math-chronicle/zh-CN/methodology/)** —— 了解收录、重要性、证据、验证与纠错规则。
- **[数据](https://charlie-wang-03.github.io/ai4math-chronicle/zh-CN/data/)** —— 获取 JSON、NDJSON、Schema、RSS 与 Sitemap 等机器可读输出。

## 使用 AI 查询大事记

如果你的 AI 工具支持联网或访问 GitHub，可以直接复制下面这句提示词，并把最后的占位符替换为你的问题：

> 请使用 AI4Math Chronicle（https://charlie-wang-03.github.io/ai4math-chronicle/zh-CN/；canonical data：https://charlie-wang-03.github.io/ai4math-chronicle/data/events.json）作为我查询 AI4Math 的索引：定位相关 canonical events，保留其 H1/H2/H3 与 verification 状态，沿记录中的 primary sources 核实关键事实，并在回答中引用 Chronicle 事件页与一手证据：[你的问题]

Chronicle 的作用是帮助 AI 定位并组织证据，而不是替代对记录中一手来源的核验。

## 大事记记录什么

v0.1 当前包含 **51 条 canonical 事件**，覆盖定理证明、形式化、数学发现、竞赛结果、数学专项系统、基准、数据集与基础设施。

每条事件都尽量回答六个问题：

1. **发生了什么？**
2. **为什么具有历史意义？**
3. **AI 系统实际完成了什么？**
4. **人类完成了什么？**
5. **事件及其公开 claim 得到了多强的独立佐证？**
6. **最重要的一手证据在哪里？**

本项目不是论文流，也不是模型排行榜。时间线只收录能够帮助解释 AI for Mathematics 历史演进的重要事件。

## H1 / H2 / H3 重要性分级

当前语料采用三档编辑分级：

- **H1 — 历史级里程碑：** 对 AI for Mathematics 历史产生长期影响的转折事件，例如重大的新数学结果、标志性形式化成果，以及真正改变历史阶段判断的竞赛或研究突破。
- **H2 — 领域级里程碑：** 对数学 AI 某个子领域、系统、基准、数据集、证明方法或基础设施方向具有重要影响的进展。
- **H3 — 背景事件：** 有助于理解历史背景，但事件本身并非实质性的 AI4Math 里程碑，例如数学主要只是能力评测场景的通用推理模型发布。

当前 51 条事件的分布为 **11 H1 / 38 H2 / 2 H3**。重要性与 verification 状态严格分开，H1 事件仍然可能处于外部审查或争议之中。

## 证据与验证

每条正式发布事件至少需要一个权威的 **S1 或 S2** 来源。

| 等级 | 来源角色 |
| --- | --- |
| **S1** | 一手研究记录或原始产物 |
| **S2** | 机构或研究者官方来源 |
| **S3** | 独立学术佐证或分析 |
| **S4** | 高质量二手报道 |
| **S5** | 仅用于发现候选事件的社区信号 |

事件详情页还会单独展示 claim 状态、证据等级、形式保证、验证历史与纠错记录。在 Chronicle 中，verification 核验的是**发生了什么，以及可靠独立来源在多大程度上佐证事件描述**。`independently_verified` 不表示 AI4Math Chronicle 已经认证某个定理、证明、反例或开放问题解答的最终数学正确性；`machine_checked` 与 `independently_replayed` 描述的是形式化产物，而不是通用的“真理标签”。

完整规则见 **[方法论页面](https://charlie-wang-03.github.io/ai4math-chronicle/zh-CN/methodology/)**。

## 一条事件，一份 canonical record

同一条 canonical 事件记录统一驱动时间线、事件详情、筛选、搜索、RSS、Sitemap 与机器可读导出。

```text
Canonical 事件
      │
      ├── 时间线与探索页
      ├── 事件详情页
      ├── 一手证据入口
      ├── JSON / NDJSON / Schema
      ├── RSS
      └── Sitemap 与结构化元数据
```

这样可以避免同一历史事实在多个页面中维护互相漂移的副本。

## 纠错与贡献

AI4Math 大事记强调可审计与可纠错。如果你发现遗漏的重要事件、薄弱来源、翻译问题或验证状态需要更新，可以使用仓库中的结构化 Issue 表单。

- [贡献指南](./CONTRIBUTING.zh-CN.md)
- [编辑方法论](./docs/editorial-methodology.zh-CN.md)
- [社区行为准则](./CODE_OF_CONDUCT.zh-CN.md)
- [安全政策](./SECURITY.zh-CN.md)

本 README 不承担开发者手册职责。实现、构建与代码贡献请阅读 [开发指南](./docs/development.zh-CN.md) 与 [架构说明](./docs/architecture.zh-CN.md)。

## 许可协议

仓库采用分离许可：

- **源代码：** MIT License。
- **项目原创编辑内容与数据编纂：** Creative Commons Attribution 4.0 International（CC BY 4.0），具体范围见 [内容许可说明](./LICENSE-CONTENT.zh-CN.md)。

外部论文、机构公告、代码仓库、媒体内容、图像、引用及第三方产物仍保留其原始权利，不会因为被本项目链接或引用而重新授权。

## 发布状态

**AI4Math 大事记 v0.1 已正式公开。** 网站部署于 GitHub Pages，公开仓库接受 Issue 与 Pull Request；后续修改仍需通过 CI，并遵守既定编辑政策。
