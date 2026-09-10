# 编辑方法论

[English](./editorial-methodology.md) · **简体中文**

本文档是网站公开 Methodology 页面在仓库侧的对应说明。

## 发布门槛

候选事件发现阶段可以保持较高 recall，但正式发布到 Chronicle 的事件必须先去重并形成 canonical event，同时具备明确事实陈述、权威来源、重要性理由、显式 AI / human contribution，以及 verification state。

## 重要性分级

- **H1 — Historical Milestone / 历史级里程碑：** AI for Mathematics 中具有长期历史意义的转折点，尤其包括 AI 参与得到重大新数学结果、证明、反例、形式化里程碑，或连续产生研究级进展的情况。最终 H1 必须经过人工编辑审核。H1 衡量的是历史重要性，而不是验证确定性，因此 H1 事件仍可能处于 `under_verification`。
- **H2 — Field Milestone / 领域级里程碑：** 对重要 AI4Math 子领域或技术方向具有明确实质影响，包括数学专项系统、benchmark、dataset、proof-search 方法、形式化基础设施，以及显著改变领域进展的竞赛结果，但尚不足以视为顶层历史转折点。
- **H3 — Context Event / 背景事件：** 主要用于补充历史上下文。当某个通用模型发布中数学主要只是能力 benchmark，而事件本身并没有贡献新数学结果或数学专项系统时，归入 H3。

冻结的 v0.1 语料当前为 **6 H1 / 43 H2 / 2 H3**。两条 H3 分别为 OpenAI o1 与 DeepSeek-R1，体现了上述刻意收窄的 H3 政策。

项目不使用公开的 0–100 “数学重要性”打分。

## 证据层级

- **S1：** 一手研究记录或原始 artifact。
- **S2：** 机构或研究者官方来源。
- **S3：** 独立学术验证 / 分析。
- **S4：** 高质量二手媒体。
- **S5：** 仅作为社区发现信号。

每条正式发布的 MVP 事件至少必须包含一个 S1 或 S2 来源。重大科学事实应尽可能让读者从事件卡片或详情页一次点击到主要证据。

## 验证状态

Evidence level（`E0`–`E4`）、verification status 与 formal assurance 是彼此独立的维度。`machine_checked` 不自动等同于 `independently_verified`，两者也都不自动证明数学 novelty。重要性分级同样独立：历史上足够重要的 claim 可以是 H1，同时仍处于 `under_verification`。

状态变化必须追加到 `verification.history`。事实纠正应写入 `corrections`，并引用相关 source IDs。

## AI 边界

AI 可以参与来源收集、双语文本草拟、taxonomy 建议、重复 metadata 检测与一致性检查，但不得单方面最终确定：

- `H1`；
- `independently_verified`；
- “一个新数学事实已经成立”的判断。

这些决定保留为人工编辑门槛。

## 历史记录不等于正确性背书

Chronicle 收录一条事件，表示该 claim 或 milestone 具有历史记录价值，并不自动意味着项目认可其数学结论已经正确成立。对于开放、争议或仍在验证的研究 claim，尤其需要同时显式呈现 significance 与 verification status。

## 纠错政策

Chronicle 应保留可审计的历史轨迹。当后续证据改变了对某条事件的理解时：

1. 更新当前 verification state；
2. 向 `verification.history` 追加记录；
3. 当事实文本改变时新增 `corrections`；
4. 保留或补充足以解释“为什么修改”的来源。

不鼓励静默进行追溯性改写，因为那会丢失有价值的 provenance。
