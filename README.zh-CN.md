<p align="center">
  <img src="./assets/readme/hero.svg" alt="AI4Math 大事记——以时间线为核心、基于证据的 AI for Mathematics 重大进展档案" width="100%" />
</p>

<p align="center">
  <a href="./README.md">English</a> · <strong>简体中文</strong>
</p>

# AI4Math 大事记

**AI4Math Chronicle / AI4Math 大事记** 是一个以时间线为核心、基于证据、支持中英双语的 **AI for Mathematics 重大进展档案**。

它希望让读者快速回答三个问题：

1. **发生了什么？** —— 按时间理解 AI4Math 的重要里程碑。
2. **AI 与人类分别做了什么？** —— 每条事件明确记录 AI / human contribution 边界。
3. **证据在哪里？** —— 重要事实尽量在 1–2 次点击内直达论文、官方公告、代码仓库等主要证据。

> **发布状态：** 当前仓库在 v0.1 公开发布门槛完成前仍保持私有。目标 GitHub Pages 地址为 `https://charlie-wang-03.github.io/ai4math-chronicle/`。

## 当前 MVP 一览

| 语料 | 当前规模 |
| --- | ---: |
| Canonical 时间线事件 | **51** |
| H1 — 历史级里程碑 | **6** |
| H2 — 领域级里程碑 | **43** |
| H3 — 背景事件 | **2** |
| 语言 | English + 简体中文 |
| 最低证据门槛 | 每条事件至少 1 个 S1/S2 来源 |

当前语料覆盖定理证明、形式化、数学发现、竞赛结果、数学专项系统、benchmark、dataset 与基础设施。H3 被刻意限制得很窄：只用于“数学主要作为能力评测，而事件本身并非数学专项进展”的通用推理模型发布。

## 为什么做这个项目

AI4Math 的重要进展分散在论文、研究机构公告、GitHub 仓库、benchmark 发布、竞赛报告与社区讨论中。新闻流很容易制作，却很难在数年后审计。AI4Math 大事记因此选择维护一个**可追溯的 canonical historical record**：

- **时间线优先：** 历史顺序始终是主要阅读界面。
- **证据优先：** 每条正式发布事件都必须包含权威 S1/S2 证据。
- **贡献边界明确：** AI 与人类贡献分别建模。
- **验证状态独立：** 历史重要性与“是否已被验证”严格分开。
- **双语同源：** 同一 canonical record 生成英文与简体中文页面。
- **机器可读：** JSON、NDJSON、JSON Schema、RSS、sitemap 与语义化 HTML 均来自同一数据源。

## 一个 canonical record，驱动所有公开表面

```text
Canonical YAML event
        │
        ├── schema + semantic validation
        ├── bilingual timeline / event pages
        ├── Explore filters + Pagefind search
        ├── JSON / NDJSON / JSON Schema
        ├── RSS
        └── sitemap + structured metadata
```

下游页面不单独维护第二份事实文本。事件卡片、详情页、筛选器、feed 与机器可读导出均由 `data/events/*.yaml` 派生。

## 重要性与验证状态相互独立

- **H1 — Historical Milestone / 历史级里程碑：** AI for Mathematics 中具有长期历史意义的转折点，最终定级必须人工审核。
- **H2 — Field Milestone / 领域级里程碑：** 对某个 AI4Math 子领域或技术方向产生实质影响的重要进展。
- **H3 — Context Event / 背景事件：** 用于补充历史背景；当前仅保留数学主要作为能力 benchmark 的通用推理模型发布。

H1 事件仍可能处于 `under_verification`。同样，`machine_checked` 并不自动意味着 `independently_verified`。

完整政策见 [编辑方法论](./docs/editorial-methodology.zh-CN.md)。

## 证据层级

| Tier | 含义 |
| --- | --- |
| **S1** | 一手研究记录或原始 artifact |
| **S2** | 机构或研究者官方来源 |
| **S3** | 独立学术验证或分析 |
| **S4** | 高质量二手媒体 |
| **S5** | 仅作为社区发现信号 |

每条正式发布的 MVP 事件至少需要一个 S1 或 S2 来源。重大科学事实应尽可能从事件卡片或详情页快速直达主要证据。

## 技术栈

- **Astro 7 + TypeScript** —— 静态站点生成
- **Pagefind** —— 静态全文搜索
- **YAML + JSON Schema + Ajv** —— canonical 内容与校验
- **GitHub Actions** —— validation、tests、build 与 Pages deployment
- **GitHub Pages** —— 静态公开托管

MVP 刻意**不**加入 backend、CMS、账号系统、vector database、leaderboard、chatbot 或 autonomous publishing pipeline。

## 仓库结构

```text
.
├── data/events/               # canonical YAML 事件记录
├── data/entities/             # 预留 canonical entity identifiers / notes
├── content/                   # 非 canonical 的编辑性文本
├── schema/event.schema.json   # Event v0.1 JSON Schema
├── scripts/                   # 校验 + 机器可读导出
├── src/                       # Astro pages / components / layouts / styles
├── public/                    # 静态资源 + 构建生成的公开数据
├── docs/                      # 架构与编辑方法论
├── tests/                     # 数据管线测试
└── .github/                   # CI、Pages deployment、模板
```

## 本地开发

需要 Node.js `>=22.12.0`。

```bash
npm install
npm run validate
npm test
npm run dev
```

生产构建：

```bash
npm run build
```

生产构建会校验全部 canonical YAML，生成机器可读数据，检查 Astro / TypeScript，渲染静态 HTML / RSS / sitemap，并构建 Pagefind 索引。

## 贡献一条事件

一份聚焦的事件贡献应当：

1. 在 `data/events/` 下新增或修改一个 canonical YAML record；
2. 保持稳定 Event ID；
3. 提供权威来源与中英双语事实字段；
4. 明确 AI 与人类贡献；
5. 必要时更新 verification history 与 corrections；
6. 通过 `npm run validate`、`npm test` 与 `npm run build`；
7. 未经人工编辑审核，不得单方面最终确定 `H1`、`independently_verified` 或“新数学事实成立”。

提交 Pull Request 前请阅读 [贡献指南](./CONTRIBUTING.zh-CN.md)。

## 机器可读输出

构建时生成：

- `/data/events.json`
- `/data/events.ndjson`
- `/data/schema/event.schema.json`
- `/feed.xml`
- `/sitemap.xml`

## 文档

- [Architecture](./docs/architecture.md) · [架构说明](./docs/architecture.zh-CN.md)
- [Editorial Methodology](./docs/editorial-methodology.md) · [编辑方法论](./docs/editorial-methodology.zh-CN.md)
- [Contributing](./CONTRIBUTING.md) · [贡献指南](./CONTRIBUTING.zh-CN.md)

## 仍未关闭的公开发布门槛

仓库切换为 public 前，v0.1 仍需要人工完成或确认：

- repository license 选择；
- GitHub Pages 设置与首次公开部署；
- desktop / mobile 最终视觉 QA；
- repository metadata 与公开贡献入口的最终验收。

这些是刻意保留的人工门槛，不由自动化流程直接越过。
