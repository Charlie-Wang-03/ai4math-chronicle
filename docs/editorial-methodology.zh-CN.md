# 编辑方法论

[English](./editorial-methodology.md) · **简体中文**

本文档是网站公开 Methodology 页面在仓库侧的对应说明。

## 发布门槛

候选事件发现阶段可以保持较高 recall，但正式发布到 Chronicle 的事件必须先去重并形成 canonical event，同时具备明确事实陈述、权威来源、重要性理由、显式 AI / human contribution，以及 verification state。

## 重要性分级

- **H1 — Historical Milestone / 历史级里程碑：** AI for Mathematics 中具有长期历史意义的转折点，包括 AI 实质参与得到的重大新数学结果或新算法、标志性形式化成果，以及真正改变“AI 在数学上能做到什么”这一历史判断的竞赛或研究突破。H1 衡量历史重要性，而不是 verification status；H1 事件的底层研究 claim 仍可能在范围、归属、接受度或正确性上存在未决问题。
- **H2 — Field Milestone / 领域级里程碑：** 对重要 AI4Math 子领域或技术方向具有明确实质影响，包括数学专项系统、benchmark、dataset、proof-search 方法、形式化基础设施，以及显著推进领域能力但尚不足以构成顶层历史转折点的竞赛结果。
- **H3 — Context Event / 背景事件：** 主要用于补充历史上下文，而不是实质性的 AI4Math 里程碑。当某个通用模型发布中数学主要只是能力 benchmark，且事件本身没有贡献新数学或数学专项系统时，归入 H3。

v0.1 语料当前为 **11 H1 / 38 H2 / 2 H3**。H3 被刻意定义得很窄：一条事件属于 benchmark、dataset、基础设施或数学专项系统，本身并不是降为 H3 的理由。

项目不使用公开的 0–100 “数学重要性”打分。

## 证据层级

- **S1：** 一手研究记录或原始 artifact。
- **S2：** 机构或研究者官方来源。
- **S3：** 独立学术佐证或分析，包括复现、外部评分、同行评议或 artifact replay。
- **S4：** 高质量二手媒体。
- **S5：** 仅作为社区发现信号。

每条正式发布的 MVP 事件至少必须包含一个 S1 或 S2 来源。重大历史性陈述应尽可能让读者从事件卡片或详情页一次点击到主要证据。

## Verification 的含义

AI4Math Chronicle 核验的是**“发生了什么”及其证据**：事件是否如记录所述真实发生、原发布机构或研究者公开声称了什么、发布了哪些 artifact，以及可靠的独立来源在多大程度上佐证 Chronicle 的核心事件描述。

Chronicle **不充当数学正确性的最终裁判**。项目不自行裁决一个新定理、新证明、新反例或开放问题解答最终是否正确。数学正确性、优先权与学术共同体接受度，应通过带归属的可靠来源、后续发展、争议、纠错与历史记录变化来呈现。

Evidence level（`E0`–`E4`）、verification status、formal assurance 与 significance 是彼此独立的维度。具体而言：

- `claimed` —— 可靠的一手或官方来源足以确认“该事件或 claim 被公开提出”，但尚未记录明显的独立佐证；
- `paper_released` —— 已存在公开研究记录，但论文公开本身不等于独立佐证；
- `under_verification` —— 事件本身真实存在，但其公开 claim、范围、归属或历史解释的关键部分仍处于活跃的外部审查之中；
- `partially_verified` —— Chronicle 事件描述的重要部分已有独立或外部佐证，但仍有实质内容尚未充分确认或存在未决问题；
- `independently_verified` —— 独立于原始发布方的可靠来源已经对 Chronicle 的核心事件描述提供了实质性佐证；
- `disputed` —— 可靠来源对事件事实、归属、范围或公开 claim 提出实质性争议；
- `corrected` —— Chronicle 记录因后续纠错发生了实质更新；
- `retracted` —— 原始 claim 或研究记录已经被撤回或正式撤稿。

因此，`independently_verified` 是一个**事件级证据标签**，不表示 Chronicle 宣布底层数学已经最终证明正确。同样，`machine_checked` 或 `independently_replayed` 描述的是形式化 artifact 的检查状态，本身不能自动解决数学 novelty、忠实性、优先权或非形式化 claim 真伪等问题。

状态变化必须追加到 `verification.history`。事实纠正应写入 `corrections`，并引用相关 source IDs。

## AI 与人工编辑边界

AI 可以参与来源收集、双语文本草拟、taxonomy 建议、重复 metadata 检测、一致性检查、新增普通 H2/H3 Event，以及在文档规则已满足且证据已经记录时执行较低风险的 evidence / verification 更新。

长期保留的人工 hard gates 为：

- 最终确定新的 **H1 — 历史级里程碑**，或将既有事件实质性移入 / 移出 H1；
- 最终确定 `independently_verified`；
- 最终确定 `disputed`；
- 最终将 `corrected` 设为当前 verification status；
- 最终确定 `retracted`；
- 以 Chronicle 自身权威解决存在实质冲突的数学正确性、归属或历史优先权争议。

AI 可以把证据收集、完整 patch 与推荐结论准备到 gate 边界，但除非既有人工政策已经明确授权该类决定，否则 gated decision 的正式发布必须经过直接人工编辑批准。

`independently_verified` 的人工 gate 是**发布治理要求**，不会改变该状态的含义：它仍然表示事件级独立佐证，而不是 Chronicle 对底层数学最终正确性的认证。

AI 与 Chronicle 都不应把“这个新数学事实是正确的”写成项目自身的最终裁决。对于“首次”“解决”“证明”“反驳”等高风险历史措辞，除非对应历史事实已经得到独立确认，否则应明确归属于可靠来源。

v0.1 的 significance 终审是在人工整体验收并显式授权分类调整的前提下完成的。今后的新增 H1 仍保持同样的人工门槛。

跨对话的 AI 权限、state recovery 与 hard-gate 规则，以 [`gpt-project-governance.md`](./gpt-project-governance.md) 为准。

## 历史记录不等于正确性背书

Chronicle 收录一条事件，表示该事件、结果或 claim 真实进入了 AI4Math 的历史记录，并对其历史重要性作出编辑判断；这不自动意味着项目认可所有底层数学结论已经最终正确。对于开放、争议或仍在审查中的研究 claim，尤其需要区分“事件真实且重要”与“数学结论最终被共同体接受”。

## 纠错政策

Chronicle 应保留可审计的历史轨迹。当后续证据改变了对某条事件的理解时：

1. 更新当前 verification state；
2. 向 `verification.history` 追加记录；
3. 当事实文本改变时新增 `corrections`；
4. 保留或补充足以解释“为什么修改”的来源。

不鼓励静默进行追溯性改写，因为那会丢失有价值的 provenance。
