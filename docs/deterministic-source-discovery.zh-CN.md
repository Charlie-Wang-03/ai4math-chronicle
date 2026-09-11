# 确定性信源发现流程

[English](./deterministic-source-discovery.md) · **简体中文**

本文定义 AI4Math 大事记在 Source Lead triage 与 canonical Event 工作流之前使用的**可重复信源发现层**。

它针对一个具体的长期维护问题：如果广泛的信源发现完全依赖概率语言模型的一次网页搜索会话，就很难重放。模型可能改写查询，搜索排序与索引会变化，每次返回的子集也可能不同，而且真实覆盖边界通常不可见。因此，聊天记录并不适合作为“当时究竟扫描了哪些来源”的长期工程证据。

本流程的目标不是取消编辑判断，而是让**候选枚举这一步**更可观察、更可复现，使 AI 与人类都基于一个已知输入集合开展后续判断。

## 发现渠道优先级

默认按以下顺序使用信源发现渠道：

1. **版本化的确定性机器渠道** — 当前包括 [`config/source-channels.yaml`](../config/source-channels.yaml) 中固定的 arXiv API 查询，以及已经核实为官方来源的 RSS / Atom feed；
2. **版本化的直接来源检查清单** — 尚未发现可靠官方机器 feed 的实验室 / 研究机构页面与独立技术来源；
3. **辅助 discovery signal** — 例如 AI4Math Radar、社区讨论、社交媒体或其他 S5 来源；
4. **概率式网页搜索 / LLM 搜索** — 用于补漏、追踪已经命名的线索、寻找独立来源或调查已知不确定性；不再把它作为唯一的基础候选枚举方式。

无论候选来自哪种渠道，最终仍必须经过既有 scope、significance、evidence、deduplication 与 governance 规则。

## 版本化 Channel Registry

`config/source-channels.yaml` 是**操作层 discovery 配置**，不是第二套事实数据库。

每条渠道记录足够的信息，使信源收集策略本身可以被检查：

- 稳定 channel ID；
- 是否启用；
- `machine` 或 `manual` 模式；
- adapter 类型；
- 默认 source-tier 预期；
- 编辑用途；
- 精确机器查询、官方 feed endpoint 或直接 URL；
- 必要时的单渠道结果上限；
- 备注与可选 tracking Issue。

修改查询或机器 endpoint 等于修改 discovery policy，因此应通过普通、可审查的 commit / PR 完成。历史扫描 artifact 会保存本次使用 registry 的 SHA-256。

## 机器扫描：arXiv

`arxiv_api` adapter 由以下固定输入构造请求：

- 版本控制中的精确查询；
- 显式、包含端点的 `submittedDate` 时间窗；
- `start=0`；
- 显式最大返回数；
- `sortBy=submittedDate`；
- `sortOrder=descending`。

默认在连续 arXiv API 请求之间等待，并使用可识别项目身份的 User-Agent。

当前 arXiv lane 覆盖：

- formal mathematics / theorem proving / autoformalization；
- language model / agent 数学推理；
- AI 辅助 mathematical discovery / conjecture generation。

这些 lane 有意优先保证 candidate discovery 的 recall，而不是直接达到发布精度。出现在扫描结果中只表示“值得进入 triage”，不表示应被 Chronicle 收录。

## 机器扫描：官方 RSS / Atom

`rss_atom` adapter 直接读取已经核实为官方来源的 feed URL。当前第一条机器 feed 是 OpenAI News 的 RSS endpoint；该 endpoint 由 OpenAI 自己的 News 页面公开链接。

feed scanner 会：

- 保存扫描时上游实际提供的完整响应；
- 在已解析条目中按请求时间窗过滤；
- 标准化条目 URL，再与 canonical Event 的 sources / artifacts 比较；
- 记录 response SHA-256、上游条目总数、时间窗内条目数与本地 cap；
- 将 official-feed items 与 arXiv candidates 分开输出，避免混淆来源类型。

官方 RSS 条目属于 S2 官方记录，**并不表示它具有 AI4Math relevance**。综合 News feed 可能包含 Product、Company、Safety、政策等大量无关内容；当前选择保留高 recall，再在下游 triage，而不是让概率模型提前静默删除条目。

RSS / Atom 与可查询 API 还有一个重要区别：日期过滤只能作用于“上游 feed 当前仍暴露的历史条目”。因此报告会明确说明完整性受 provider 的 feed retention / history 限制。记录 response hash 可以使一次扫描可审计，但不能证明 provider 为目标时间窗保留了全部历史内容。

不要猜测未文档化的 feed URL。在官方机器 endpoint 未被核实时，该实验室继续保留在 direct manual checklist 中，而不是依赖第三方 RSS 代理。

## 本地运行

对两层机器来源使用同一明确日期范围：

```bash
npm run scan:sources -- --start 2026-09-01 --end 2026-09-11
npm run scan:feeds -- --start 2026-09-01 --end 2026-09-11
```

可选参数示例：

```bash
npm run scan:sources -- \
  --start 2026-09-01 \
  --end 2026-09-11 \
  --max-results 120 \
  --output source-scan-output

npm run scan:feeds -- \
  --start 2026-09-01 \
  --end 2026-09-11 \
  --max-results 120 \
  --output source-scan-output
```

默认输出目录已加入 `.gitignore`，因为扫描结果属于操作层证据，而不是 canonical corpus 数据。

## 通过 GitHub Actions 运行

进入 **Actions → Deterministic Source Scan → Run workflow**，填写：

- `start_date`；
- `end_date`；
- 可选 `max_results`。

在 v0.1.x 中，该 workflow 有意保持为**仅人工触发**。它不会定时执行，也不会自动创建 Issue、branch、PR 或 canonical Event。

workflow 会上传保留 30 天的 artifact：

- `source-scan.json` / `source-scan.md` — arXiv 扫描证据；
- `official-feed-scan.json` / `official-feed-scan.md` — 官方 RSS / Atom 扫描证据。

这样，后续维护者或 AI 对话可以基于持久证据复核候选，而无需把临时扫描结果提交进仓库。

## 审计字段与覆盖诊断

机器扫描会按来源类型记录：

- 精确起止日期；
- 生成时间；
- registry SHA-256；
- 精确 request URL 或官方 feed endpoint；
- 请求的最大结果数；
- 实际返回 / 上游暴露记录数；
- 每份上游响应的 SHA-256；
- cap / truncation 诊断；
- 标准化 metadata；
- canonical corpus 匹配；
- 仍需显式人工检查的 direct channel。

对 arXiv，如果某个 channel 达到配置上限，应把覆盖状态视为尚未解决：缩短时间窗或提高允许的上限后重新运行。对 RSS / Atom，即使没有达到本地 cap，也必须把 provider 当前暴露的 feed history 当作显式的上游覆盖上限。

HTTP 请求成功本身永远不能证明“全部相关 AI4Math 进展已经被枚举”。

## 这里的“确定性”意味着什么

这些扫描器主要降低以下可避免的不确定性：

- LLM 隐式改写查询；
- 随机或不透明的结果子集选择；
- 不透明排序；
- 被遗忘的日期边界；
- 不可见的本地返回上限；
- 聊天结束后丢失当时 discovery 输入。

它们**不保证完整性**。覆盖仍然取决于：

- 显式查询本身的设计；
- 上游索引与 metadata；
- provider feed retention；
- 尚未纳入当前 machine channel 的来源；
- AI4Math 术语随时间变化；
- 仍采用人工检查的 direct source。

因此准确的理解应当是：

> **确定、可审计的候选枚举，而不是“已经穷尽 AI4Math 的全部知识”。**

## 与 Source Lead 的关系

本流程位于 [`source-intake.zh-CN.md`](./source-intake.zh-CN.md) 的上游：

```text
版本化 source registry
→ deterministic arXiv/API + official-feed scan + direct-source checklist
→ 已知候选集合
→ deduplication / triage
→ 值得长期跟进时创建 Source Lead
→ 证据成熟后进入 Event proposal 或聚焦 Event PR
→ canonical data/events/*.yaml
```

不要机械地为每一条机器扫描结果创建 Source Lead。先做 triage。Source Lead 用于“值得记住或继续行动的线索”，而不是外部 feed 的镜像。

## 调整后的 AI 职责

AI 仍适合承担：

- 将重复论文、公告聚类成一个 event hypothesis；
- 初筛 scope 与 significance；
- 从聚合页或官方公告回溯 direct primary artifact；
- 为已经命名的候选寻找独立佐证；
- 提取结构化 metadata；
- 起草双语 Event；
- 识别不确定性与互相冲突的证据。

关键变化是：**AI 不再需要独自决定“最近有哪些来源存在”**。只要 deterministic / direct channel 可以覆盖，就先运行这些渠道，再让模型在已枚举集合之后参与判断。

## R0 明确不做什么

当前实现不增加：

- backend 或 source database；
- scheduled crawler；
- 对所有实验室网页进行 scraping；
- 对没有已核实官方 feed 的实验室猜测 URL 或使用第三方 RSS 代理；
- semantic embedding search；
- 把 LLM relevance scoring 作为发布门槛；
- 自动创建 Source Lead；
- 自动创建或发布 Event。

未来如果核实到稳定官方 feed / API，可以在不改变 v0.1.x 产品契约的前提下，作为普通 source-maintenance 改进继续增加 adapter。若进一步发展成更广泛的 autonomous publication system，则必须单独经过 product / governance 审查。
