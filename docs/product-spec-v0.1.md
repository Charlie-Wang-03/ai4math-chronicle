# AI4Math Chronicle — Product Specification v0.1

> **Governance note (2026-09-11):** This file preserves the frozen v0.1 product contract. Historical operational facts recorded during the MVP stage (for example repository visibility at that time) are not a substitute for current repository state. Use [`project-state.md`](./project-state.md) and live GitHub for current operational facts. This note does not alter the substantive v0.1 product contract.

**Status:** Frozen for MVP  
**Repository:** `Charlie-Wang-03/ai4math-chronicle`  
**Repository visibility during MVP:** Private  
**Default branch:** `main`  
**Initial hosting:** GitHub Pages  
**Initial public URL:** `https://charlie-wang-03.github.io/ai4math-chronicle/`

---

# 1. Product Definition

## 1.1 Name

**English:** AI4Math Chronicle  
**Chinese:** AI4Math 大事记  
**Repository:** `ai4math-chronicle`

## 1.2 Positioning

AI4Math Chronicle is a **timeline-first, evidence-backed, GitHub-native chronicle of major milestones in AI for Mathematics**.

It helps users:

1. quickly discover important AI4Math developments;
2. understand where each development sits in the historical evolution of the field;
3. inspect what the AI actually contributed;
4. reach primary papers, code, proof artifacts and official sources with minimal friction;
5. distinguish confirmed results, preliminary claims, formalizations, benchmark milestones and disputed developments.

## 1.3 English Positioning Statement

> For AI and mathematics researchers, students, developers, and technically curious readers, AI4Math Chronicle is a visual and searchable chronicle of major milestones in AI for Mathematics that makes important developments easy to discover, places them in historical context, and exposes the evidence behind each claim. Unlike awesome lists, benchmark leaderboards, lab blogs, and general AI news feeds, it organizes multiple sources into stable event records and preserves significance, attribution, verification status, provenance, and historical relationships.

## 1.4 Chinese Positioning Statement

> 面向 AI / 数学研究者、学生、开发者与具有技术背景的读者，AI4Math 大事记是一个可视化、可搜索的 AI for Mathematics 重大进展档案，让用户快速发现重要事件、理解其历史位置，并进一步核查每项成果背后的证据。区别于 Awesome List、排行榜、实验室博客和普通 AI 新闻流，它把多个来源组织成稳定的事件记录，并长期保留事件的重要性、AI 与人类贡献、验证状态、来源与历史关系。

---

# 2. Product Priority

MVP 阶段按以下顺序优化：

1. **Content Discoverability**
2. **Timeline UX / Historical Navigation**
3. **Content Selection Quality**
4. **SEO**
5. **GEO / AI Search**
6. **Evidence & Verification**
7. **Structured Data**
8. **Open-source Contribution**
9. **Agent Automation**

Evidence-first 不再作为唯一的前台卖点。

正式原则为：

> **Timeline-first, evidence-backed.**

---

# 3. Product Moat

不得把“实现一个漂亮时间线”本身描述为长期护城河。

## 3.1 User-perceived moat

> 最方便、最快、最好浏览的 AI4Math 重大进展历史入口。

## 3.2 Long-term moat

> 持续积累、经过编辑筛选、有稳定标识符、来源、历史关系与修订记录的 canonical AI4Math event corpus。

长期竞争力来自以下组合：

```text
High-quality selection
+ low-friction discovery
+ historical context
+ stable event pages
+ provenance
+ structured data
+ accumulated editorial trust
```

---

# 4. Core Product Principle

## One event, one canonical record, many ways to consume it.

一个事件只能有一份 canonical structured record。

由同一数据源生成：

```text
Canonical Event
├── Timeline
├── Event Page
├── Search / Filters
├── Related Events
├── JSON
├── NDJSON
├── RSS / Atom
├── Sitemap
└── SEO / AI-readable metadata
```

禁止为 Timeline、中文页面、RSS、API 分别维护互相独立的数据副本。

---

# 5. Target Audience

## Primary

### A. AI / Mathematics Researchers

核心问题：

- 发生了什么？
- 是否真的重要？
- AI 实际完成了哪一部分？
- 数学结论是否新颖？
- proof / code / artifact 在哪里？
- 当前验证状态如何？

### B. Students / Learners

核心问题：

- AI4Math 近年来是如何演进的？
- 哪些事件是真正的 milestone？
- 一个系统、方法或问题和前后的事件有什么关系？
- 我应该从哪里继续阅读？

## Secondary

### C. AI Developers / Practitioners

关注：

- model；
- agent；
- framework；
- repository；
- reproducibility；
- formal toolchain。

### D. Technically Curious General Audience

关注：

- AI 最近到底在数学上做到了什么？
- 为什么重要？
- 新闻标题有没有夸大？

专业用户的可信度判断仍然是内容质量的最高标准。

---

# 6. Product Model

产品不是：

- AI 新闻站；
- arXiv feed；
- paper database；
- benchmark leaderboard；
- Awesome List；
- AI4Math 百科全书。

核心内容单位不是 Article，而是：

```text
Event
├── Claim
├── What happened
├── Why it matters
├── Mathematical novelty
├── AI contribution
├── Human contribution
├── Primary sources
├── Independent sources
├── Verification
├── Artifacts
├── Historical relationships
└── Revision history
```

多个新闻、论文、博客、代码仓库和评论必须聚合到同一个 canonical Event，而不是产生多个 Timeline 条目。

---

# 7. Content Pipeline

借鉴高质量信息聚合产品，但针对数学研究降低实时性、提高 significance gate。

```text
Sources
↓
Candidate discovery
↓
Deduplication / event clustering
↓
Significance screening
↓
Evidence collection
↓
Canonical Event
↓
Editorial review
↓
Timeline / Event Page / Dataset
```

## Candidate Pool

可以宽进。

包括：

- arXiv；
- journals / conferences；
- official lab blogs；
- GitHub；
- Lean / Coq / Isabelle / HOL artifacts；
- benchmarks；
- mathematical community discussions；
- HN / Reddit / X 等 discovery signals。

## Published Chronicle

必须严出。

多来源热度只能作为：

> candidate discovery signal

不能作为：

> mathematical significance evidence。

---

# 8. Inclusion Scope

## Include

原则上覆盖：

### Discovery
AI 发现新的数学结果、结构、算法或 conjecture。

### Proof
AI 对此前未知或重要问题完成 substantive proof work。

### Human–AI Research
AI 对重要数学研究承担 substantive intellectual contribution。

### Formalization
具有明显历史意义的自动形式化或 formal proof milestone。

### Competition
IMO、Putnam 等具有领域历史意义的突破。

### System
改变 AI4Math 技术路线的重要系统。

### Benchmark
只记录改变领域能力认知或评价范式的 milestone。

### Dataset
对 AI4Math 研究方法产生明显影响的数据资源。

### Infrastructure
Lean、proof search、autoformalization、agents 等重大基础设施进展。

### Controversy
具有历史意义但验证状态仍存在争议的重大 claim。

---

# 9. Exclusion Scope

默认不收录：

- 普通新模型发布；
- 普通 arXiv paper；
- 普通 benchmark SOTA；
- MATH 等成熟 benchmark 的微小百分点提升；
- 纯 prompt engineering；
- 普通数学教育产品；
- 普通形式化工作；
- 普通 Lean library update；
- 没有历史意义的 dataset release；
- 只有营销材料、没有 substantive technical content 的产品发布。

若 Timeline 开始演化为每日几十条更新，视为 scope failure。

---

# 10. Significance

对外不显示虚假精确的 0–100 分。

采用：

```text
H1 — Historical Milestone
H2 — Field Milestone
H3 — Context Event
```

### H1

对 AI4Math 历史具有长期意义。

### H2

对某个重要子领域或技术路线具有明显意义。

### H3

用于建立历史上下文，但通常不作为首页重点事件。

主 Timeline 默认突出 H1 / H2。

内部可以使用更细评分，但不得把内部 AI scoring 当作客观数学事实公开展示。

---

# 11. Taxonomy

采用多轴 taxonomy，不使用一个互斥 `category` 字段承载全部含义。

## Event Type

```text
discovery
proof
formalization
competition
system
benchmark
dataset
infrastructure
controversy
```

## Mathematical Novelty

```text
new_result
new_proof
new_algorithm
new_conjecture
formalization_of_known_result
rediscovery
benchmark_result
tooling_only
```

## AI Role

```text
autonomous_primary
ai_primary_human_verified
human_ai_collaboration
ai_substantive_support
ai_minor_support
computation_only
literature_assistance
unclear
```

## Interface

```text
informal
formal
symbolic
numeric
hybrid
```

---

# 12. Timeline Semantics

绝不能只有一个 `date`。

至少区分：

```yaml
dates:
  event:
  first_public_claim:
  paper_release:
  artifact_release:
  independently_verified:
  added_to_chronicle:
  last_updated:
```

主历史 Timeline 默认使用：

```text
event
```

“Recently Added” 使用：

```text
added_to_chronicle
```

“Recently Updated” 使用：

```text
last_updated
```

历史事件补录不得错误显示成补录年份的新事件。

---

# 13. Relationships

MVP Schema 必须支持：

```yaml
relationships:
  predecessors: []
  successors: []
  related: []
```

MVP 不建设 Knowledge Graph UI。

先利用关系字段自动生成：

- Related milestones；
- Earlier developments；
- Later developments。

---

# 14. Source Model

建议使用以下 source tiers。

## S1 — Primary Research Source

- paper；
- journal / conference；
- formal proof artifact；
- official research repository；
- dataset artifact。

## S2 — Official Institutional Source

- lab announcement；
- university page；
- official researcher announcement。

## S3 — Independent Scholarly Source

- independent expert analysis；
- reproduction；
- peer review；
- independent mathematical verification。

## S4 — Reputable Secondary Source

- high-quality science / technology media。

## S5 — Community Signal

- Hacker News；
- Reddit；
- X；
- forums。

S5 可以发现 candidate，但不能单独支持重大科研事实。

Primary evidence 应尽量从 Timeline Card / Event Page **1 click 可达**。

---

# 15. Verification Model

不要把所有可信度压成一个数字。

## Evidence Level

```text
E0 — Unsubstantiated
E1 — Primary Claim
E2 — Research Record
E3 — Inspectable Artifact
E4 — Independent Check
```

## Verification Status

```text
claimed
paper_released
under_verification
partially_verified
independently_verified
disputed
corrected
retracted
```

## Formal Assurance

```text
none
artifact_available
machine_checked
independently_replayed
```

必须持续区分：

```text
machine-checked proof
≠ faithful formalization
≠ new mathematical discovery
```

状态修改必须保留历史记录。

---

# 16. Event Schema v0.1

Canonical source format：

> **YAML**

理由：

- GitHub diff friendly；
- human editable；
- 易做 JSON Schema validation；
- 易生成 JSON / RSS / static pages。

推荐基础结构：

```yaml
schema_version: 1

id:
slug:

title:
  en:
  zh-CN:

dates:
  event:
  first_public_claim:
  paper_release:
  artifact_release:
  independently_verified:
  added_to_chronicle:
  last_updated:

event_types: []

significance:
  tier:
  rationale:
    en:
    zh-CN:

mathematical_novelty:
  type:

claim:
  en:
  zh-CN:

summary:
  en:
  zh-CN:

why_it_matters:
  en:
  zh-CN:

ai_role:
  level:
  description:
    en:
    zh-CN:

human_contribution:
  description:
    en:
    zh-CN:

systems: []
organizations: []
people: []
problems: []
methods: []

verification:
  evidence_level:
  status:
  formal_assurance:
  history: []

sources: []

artifacts: []

relationships:
  predecessors: []
  successors: []
  related: []

timeline:
  featured:
  significance:

tags: []

editorial:
  created_at:
  last_reviewed:
  reviewers: []

corrections: []
```

`id` 必须稳定，不随标题修改。

---

# 17. Bilingual Strategy

冻结采用：

> **English canonical structured dataset + Chinese presentation layer**

事实实体、IDs、technical terms、source metadata 以英文 canonical identifiers 为准。

中英文共同维护：

- title；
- summary；
- why it matters；
- claim；
- AI contribution；
- human contribution；
- significance rationale。

禁止维护两套彼此独立数据库。

长期 URL：

```text
/en/...
/zh-CN/...
```

MVP 如果双语路由显著增加工程复杂度，可以先实现统一数据层和语言切换基础，但 Schema 必须从第一天支持双语。

---

# 18. Information Architecture

MVP 只需要：

```text
/
├── Timeline
├── Explore / Events
├── Event Detail
├── Methodology / About
└── Data
```

导航建议控制在：

```text
Timeline
Explore
Methodology
GitHub
```

Systems、Problems、Organizations 等 facet pages 可以在 V1 自动生成。

---

# 19. Homepage

首页不采用长篇欢迎页。

第一屏应立即回答：

> AI4Math 这些年发生了什么？

基本结构：

```text
AI4Math Chronicle

A visual timeline of major milestones in AI for Mathematics.

[Search]

[Year navigation]

[Category filters]

Timeline
```

用户首先浏览事件，而不是首先阅读 Methodology。

---

# 20. Timeline UX

MVP 最重要的视觉产品。

需要支持：

- chronological browsing；
- year navigation；
- category filtering；
- significance filtering；
- verification filtering；
- responsive mobile layout；
- stable deep links。

长期采用三层尺度：

```text
Global chronology
→ Year-level chronology
→ Event-level history
```

MVP 不需要复杂 canvas、WebGL 或图数据库。

优先：

> readable > visually spectacular

---

# 21. Event Card

目标：

> Scan first, investigate second.

卡片至少包含：

```text
Date

Title

Organization / System

1–2 sentence summary

Event type
Significance
Verification status

Primary source shortcuts
```

用户不进入详情页也应能理解事件的大意。

---

# 22. Event Detail UX

采用 progressive disclosure。

```text
Title

Status / Evidence / AI Role / Significance

What happened?

Why it matters?

Primary evidence

────────────

Claim

Mathematical significance

AI contribution

Human contribution

Verification

Technical details

Sources / Artifacts

Historical relationships

Verification history

Corrections
```

目标：

- Time to First Insight `< 30s`
- Time to Historical Context `< 60s`
- Time to Primary Evidence `≤ 1–2 clicks`

---

# 23. Search / Explore

MVP 使用静态搜索。

优先考虑：

> Pagefind 或同等级 static search

无需：

- Elasticsearch；
- vector DB；
- hosted search backend。

Filters 至少考虑：

- year；
- event type；
- significance；
- verification；
- system。

---

# 24. SEO

SEO 从 Schema 和页面设计第一天开始，而不是上线后补。

每个 Event 必须产生：

- stable URL；
- descriptive page title；
- meta description；
- canonical；
- visible date；
- modified date；
- internal links；
- citations；
- breadcrumbs；
- semantic HTML。

URL 应具有长期稳定性，例如：

```text
/events/alphaproof-imo-2024/
```

而不是 query-based opaque URLs。

---

# 25. GEO / AI Search

真正优先实施：

```text
static semantic HTML
stable URLs
visible factual structure
primary citations
sitemap.xml
robots.txt
RSS / Atom
JSON export
NDJSON export
JSON-LD where appropriate
canonical URLs
language metadata
```

机器容易识别的 Event 页面应显式包含：

```text
What happened
Date
Claim
AI contribution
Human contribution
Verification
Sources
Last reviewed
```

`llms.txt` 可作为低成本附加项，但不作为排名护城河。

禁止：

- hidden AI-only content；
- AI keyword stuffing；
- 大规模低质量自动页面；
- 把 GEO 营销指标当真实需求指标。

---

# 26. Machine Interface

MVP 网站同时必须设计为可机器消费的信息源。

静态生成：

```text
/data/events.json
/data/events.ndjson
/feed.xml
/sitemap.xml
```

未来可增加：

```text
/skill.md
```

MVP 不建设 API server。

---

# 27. Repository Architecture

MVP 固定：

> **Monorepo**

```text
ai4math-chronicle/
├── data/
│   ├── events/
│   └── entities/
├── content/
├── schema/
├── src/
├── scripts/
├── public/
├── docs/
├── tests/
└── .github/
```

暂不拆 dataset repo / website repo。

---

# 28. Technology Stack

冻结：

```text
Astro
TypeScript
Static Site Generation
GitHub Actions
GitHub Pages
```

原则：

> 不为技术先进而过度工程化。

GitHub Project Pages 必须正确处理：

```text
base = /ai4math-chronicle/
```

所有：

- assets；
- links；
- sitemap；
- canonical；
- RSS；

必须接受 project-site deployment QA。

---

# 29. Hosting

MVP：

> **GitHub Pages**

默认目标：

```text
https://charlie-wang-03.github.io/ai4math-chronicle/
```

MVP 不购买独立域名。

仓库保持 private，直到项目达到公开源代码验收标准。

若 GitHub 权限要求人工在 Settings → Pages 完成配置，则代码实现不得因此阻塞；准备好 workflow 后给出明确人工操作步骤。

---

# 30. Initial Content Strategy

MVP 目标内容规模：

## Anchor Events

约：

> **15–20**

必须具有完整：

- historical context；
- AI / human contribution；
- evidence；
- verification；
- relationships。

## Timeline Events

总量目标：

> **约 50–70**

轻量事件也必须满足 Schema 和 source requirements。

不得为了达到数量目标降低事实质量。

若内容审核成为瓶颈：

> quality > count

---

# 31. Open-source Workflow

未来公开后采用：

```text
New Event Issue
↓
Triage
↓
Candidate accepted
↓
Event PR
↓
Schema validation
↓
Evidence validation
↓
Preview
↓
Editorial review
↓
Merge
```

CI 检查：

- Schema；
- duplicate ID；
- duplicate DOI / arXiv；
- invalid date；
- missing required sources；
- invalid status transitions；
- internal relationships；
- site build；
- broken internal links；
- generated JSON consistency。

---

# 32. Agent Policy

AI Agent 可以：

- candidate discovery；
- metadata extraction；
- deduplication；
- source collection；
- classification suggestion；
- translation draft；
- broken-link checking；
- candidate summary。

AI Agent 不得自主最终决定：

```text
H1 historical significance
independently_verified
mathematical fact
```

最终 editorial judgment 保留 human gate。

MVP 不建设复杂 multi-agent pipeline。

---

# 33. MVP Explicit Non-goals

MVP 不做：

- real-time AI news；
- daily digest；
- model leaderboard；
- knowledge graph；
- graph database；
- chatbot；
- CMS；
- user account；
- comments；
- backend；
- database server；
- custom API server；
- vector search；
- autonomous publishing；
- newsletter platform；
- custom domain；
- mobile app。

---

# 34. MVP Acceptance Criteria

MVP 必须满足以下条件才算完成。

## Product

- 首页可以立即浏览 Timeline；
- Timeline 可按至少 year / category / significance 筛选；
- Event Card 可快速理解事件；
- Event Detail 具有 evidence / contribution / verification；
- search 可用；
- mobile layout 可用。

## Content

- 至少 15 个高质量 Anchor Events；
- 总事件目标约 50–70；
- 所有公开事件有 primary or adequately justified authoritative source；
- 不存在明显重复 event。

## Data

- Event Schema 有正式 JSON Schema；
- CI 校验结构化数据；
- canonical event IDs 稳定；
- JSON / NDJSON 可生成；
- RSS 可生成。

## SEO / AI Search

- static HTML；
- sitemap；
- canonical；
- robots；
- event metadata；
- structured internal linking；
- semantic source sections。

## Engineering

- Astro build PASS；
- GitHub Pages project base path PASS；
- GitHub Actions deployment workflow 准备完成；
- no unnecessary backend；
- repository structure clean；
- README / methodology / contribution basics 存在。

---

# 35. Scope Guardrails

出现以下情况立即阻止扩张：

1. 每天试图发布大量普通新闻；
2. 开始维护普通 paper feed；
3. 需要 database backend 才能继续 MVP；
4. Knowledge Graph 成为 MVP blocking feature；
5. Agent 自动判断数学突破；
6. 首页变成新闻门户；
7. 一个事件拥有多个互相冲突的数据源副本；
8. 为视觉效果牺牲 Timeline 可读性；
9. 为达到 50–70 条而发布证据不足的事件。

---

# 36. Change Control

本 Specification 为 MVP 的 frozen product contract。

以下属于 **implementation choice**，可以在不修改 Product Specification 的情况下调整：

- Astro component architecture；
- CSS solution；
- static search library；
- exact directory naming；
- timeline rendering implementation；
- CI tool choice。

以下修改必须显式升级 Product Specification：

- 改变 Primary Audience；
- 改变 timeline-first 定位；
- 改变 event inclusion boundary；
- 增加 news / leaderboard 等新产品类别；
- 引入 backend；
- 改变 canonical event model；
- 改变 bilingual canonical strategy；
- 改变 GitHub Pages MVP hosting；
- 改变 Agent human-review boundary。

任何新增功能首先回答：

> Does this improve discovery, historical comprehension, evidence access, SEO / AI Search, or canonical data quality?

若答案均为否，则默认不进入 MVP。
