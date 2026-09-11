# 信源收集与 Intake 工作流

[English](./source-intake.md) · **简体中文**

本文定义 AI4Math 大事记如何在一个原始信源线索成熟为 Event proposal 或 canonical Event 证据之前，对它进行**持久化收集与 triage**。

本文补充而不替代 [编辑方法论](./editorial-methodology.zh-CN.md)、[长期维护政策](./maintenance.zh-CN.md)、[贡献指南](../CONTRIBUTING.zh-CN.md) 与 [GPT 项目治理协议](./gpt-project-governance.md)。它不修改冻结的 Event model、信源分级、重要性框架、verification 框架或人工 hard gates。

## 为什么需要单独的 Source Intake

Chronicle 中有两类编辑对象，不应混为一谈：

1. **Source lead / 信源线索** —— 一篇论文、代码仓库、官方公告、独立分析、replay、媒体报道、社区讨论或其他公开来源；它可能有价值，但尚未被整理成 Event 级编辑判断。
2. **Event proposal / canonical Event** —— 已经形成事件假设，并能描述日期、事实性 claim、AI / 人类贡献、重要性理由、证据集合、去重判断与 verification 状态。

公开的 Event proposal 表单有意保持较高门槛，因为 Chronicle 正式发布的事件必须精选。但维护者或贡献者经常会先发现有价值的信源，而当时还不足以判断它是否应形成一条 Event。如果没有持久化入口，这些线索就容易散落在浏览器标签页、聊天记录或临时研究笔记中。

因此，Source Lead Issue Form 被用作 GitHub-native 的持久化信源 inbox。

## 当前实现

当某个公开信源值得后续 triage，但尚不足以形成完整 Event proposal 时，使用结构化的 **Source lead / 信源线索** Issue 表单。

Source Lead Issue 使用标题前缀：

```text
[Source]
```

并复用现有 `editorial-review` label。它属于操作性编辑记录，不是 canonical factual data。

表单收集：

- 信源标题与直接公开 URL；
- 已知时的发布时间 / 发现日期；
- 初步 S1–S5 tier；
- 可能承担的编辑角色；
- 可选的已有 Event / Issue 关联；
- 为什么值得关注；
- 已知不确定性或缺失证据；
- 去重、隐私与 S5 边界检查。

提交者给出的 source tier 只是 triage hint。真正进入 canonical Event 的 source tier 仍由维护者负责确认。

## 两种 Intake 入口

### 适合使用 Source Lead 的情况

- 发现了一篇可能重要的论文、仓库、公告、分析、replay 或讨论；
- 它可能更新已有 Event，但还没确认具体会改变什么；
- 它可能对应新的候选 Event，但 scope / significance 尚不清晰；
- 它只是 S5 发现信号，需要继续寻找更强来源；
- attribution、provenance、correction 或 dispute 信号需要先调查，尚不适合立即修改 canonical record。

### 适合使用 Event Proposal 的情况

已经能够识别其中大部分内容：

- 候选事件及 event date；
- 简洁的事实性 claim；
- AI 与人类分别完成了什么；
- 至少一个强 S1 / S2 来源，或同等强度的权威记录；
- 已知的独立佐证 / 争议 / 不确定性；
- 一个合理的 H1/H2/H3 建议。

对于维护者，如果研究已经成熟到可以直接形成 canonical draft，则不强制先创建中间 Event Proposal Issue；在治理允许时，可以直接从 Source Lead 进入聚焦 Event PR。

## Triage 流程

每个 Source Lead 按以下步骤处理。

### 1. 信源去重

搜索：

- `data/events/*.yaml` 中是否已有完全相同 URL、标题、机构、作者、系统或数学问题；
- open / closed `[Source]` Issues；
- Event proposal 与 correction Issues；
- 最近 PR 是否已经纳入该来源。

同一个 URL 可能合法支持多个相关 Event，因此 URL 重复不必然等于 duplicate。真正需要判断的是：这个**线索和拟执行的编辑动作**是否已经存在。

### 2. 规范化信源角色

按照既有 source hierarchy 进行分类：

- **S1** —— 一手研究记录或产物；
- **S2** —— 官方机构 / 研究者来源；
- **S3** —— 独立学术佐证、分析、复现、replay 或 peer review；
- **S4** —— 高质量二手媒体；
- **S5** —— 社区发现信号。

同时判断它可能承担的编辑功能：

- 发现新的候选事件；
- 为已有 Event 加强证据；
- 提供独立佐证或 artifact replay；
- 触发 correction / dispute / attribution / provenance / priority review；
- 提供历史上下文或 relationships。

### 3. 聚类到 Event、已有记录或 watch item

判断该信源属于：

- 一个已有 canonical Event；
- 一个已有 candidate / Issue；
- 一个真正的新 Event candidate；
- 尚未达到发布条件的 watch item；
- scope 外或重要性不足的条目。

不要因为多个来源报道同一个底层事件，就生成多个 Timeline 条目。

### 4. 深入取证前先做 scope / significance 筛查

Candidate Pool 可以宽进，但成本较高的证据收集应优先集中在可能满足冻结 inclusion boundary 的候选上。

S5 热度、引用数、社区互动或多篇新闻报道可以说明“值得调查”，但不能替代数学或历史重要性证据。

### 5. 选择 disposition

采用以下一种结果：

**A. 关联已有 Event**  
如果该来源实质加强了证据、归属、provenance、relationships 或 correction history，则按照正常编辑规则准备一个聚焦 PR。如果它并不改变现有记录，则关闭 Source Lead，并简要说明原因。

**B. 升级为新 Event candidate**  
当信源集合能够支持一个 scope 内事件，且已有 primary / official evidence 时，继续执行去重、重要性筛查、证据收集、双语草稿与 canonical Event pipeline。如果 Event Proposal 有助于公开审核，可以创建；若维护者已经掌握完整证据包，也可直接进入聚焦 branch / PR。

**C. 继续 watch**  
只有在存在明确未满足依赖时保持 open，例如论文尚未公开、artifact 尚未发布、承诺中的 independent replay 尚未出现、机构回应仍待发布，或缺乏足够权威来源。应在 Issue 中明确写出等待的 trigger，避免后续维护反复做同一轮无结果搜索。

**D. 关闭但不发布**  
可以因为 duplicate、out of scope、重要性不足、已被更好记录取代或当前无可执行价值而关闭。关闭时保留简短 disposition，并在适用时链接到相关 Event / Issue / PR。关闭 Source Lead 不等于删除其历史发现记录。

## Promotion 边界：Issue 不是第二套数据库

Canonical factual source 始终是：

```text
data/events/*.yaml
```

Source Lead 与 Event Proposal Issue 只是编辑工作流记录，其中可能包含初步假设、不完整 metadata、未验证解释或后来被替代的链接。

只有当来源的规范化 metadata 通过正常 review / validation 路径写入 canonical Event 或 correction 时，它才成为正式 Chronicle record 的一部分。

因此：

- 不从 Source Lead Issue 直接生成公开 Event 页面；
- 不把 open / closed Source Lead 当作某个 Event 为真或足够重要的证据；
- 不额外维护一份与发布事实平行的 `sources.yaml` 或 source database；
- 一旦信源用于正式发布，Event 级 provenance 必须回写 canonical YAML。

## 维护者搜索方式

常用 GitHub 查询：

```text
repo:Charlie-Wang-03/ai4math-chronicle is:issue is:open in:title "[Source]"
repo:Charlie-Wang-03/ai4math-chronicle is:issue is:closed in:title "[Source]"
repo:Charlie-Wang-03/ai4math-chronicle is:issue is:open label:editorial-review
```

创建新 Source Lead 前，还应直接在仓库中搜索 exact source URL。

## AI 辅助收集

AI 维护者可以使用网页搜索、学术搜索、GitHub 搜索、官方 feed、社区讨论与已有 watch Issue 做 candidate discovery。

长期 handoff 规则是：

> 如果一个信源值得未来继续采取编辑动作，但还没准备好进入 canonical Event 工作，就应把它持久化为 Source Lead，而不是依赖聊天历史。

在已批准 maintenance loop 内，AI 可以高自治完成来源收集、metadata 规范化、去重和 triage。H1 与高风险 verification / dispute 决定仍严格遵守 Governance Protocol 中的人工 hard gates。

## 当前自动化边界

v0.1.x 当前只实现 GitHub-native intake queue，**不运行**自动从 arXiv、RSS、社交媒体或实验室 feed 定时抓取并自动创建 Issue 的 crawler。

如果未来明确批准 collector，它也应把结果送到同一 Source Lead 边界，而不是直接发布 canonical Event。

> Autonomous discovery must not become autonomous publication.

## 隐私、版权与信源卫生

- 链接公开来源并概述其相关性，不要把完整论文或大段受版权保护文本复制进 Issue；
- 不要通过公开仓库提交 confidential、private、embargoed、leaked、需要凭证访问或其他非公开材料；
- 优先使用最直接、稳定的 URL：paper / DOI / official repository / institutional announcement 优先于镜像或聚合站；
- 当发布日期、作者、provenance 或 claim scope 尚未确定时，应显式记录不确定性。

## 健康 Source Intake Queue 的标准

满足以下条件时，可以认为信源 intake 健康：

- 有价值的 raw lead 不依赖某一个维护者的浏览器或 Chat 历史；
- duplicate search 成本低；
- 每个 open lead 都有明确继续保持 open 的理由；
- closed lead 保留 disposition 与关联链接，但不污染 canonical corpus；
- 成熟证据会进入 canonical Event，而不是无限堆积在 Issues；
- 即使 candidate/source inbox 较宽，正式 Event corpus 仍保持精选。
