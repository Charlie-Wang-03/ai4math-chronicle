# MVP 架构说明

[English](./architecture.md) · **简体中文**

## 核心原则

```text
Canonical YAML Event
        │
        ├── JSON Schema + semantic validation
        │
        ├── Astro static pages
        │   ├── /en/
        │   ├── /zh-CN/
        │   ├── Explore
        │   ├── Event detail
        │   ├── 标准与方法
        │   ├── 使用与共建
        │   └── 数据与订阅
        │
        ├── JSON / NDJSON
        ├── RSS
        ├── sitemap.xml
        └── Pagefind index
```

任何下游表面都不单独维护一份事实副本。Canonical YAML event record 是事件事实数据的唯一真源。

## GitHub Project Pages 安全性

`astro.config.mjs` 固定：

- `site = https://charlie-wang-03.github.io`
- `base = /ai4math-chronicle`
- static output
- trailing slashes

站内链接与 Pagefind 使用 `import.meta.env.BASE_URL`；canonical URL 通过 `src/lib/site.ts` 使用同一 base。因此 RSS、robots、sitemap、JSON / NDJSON 等路径均兼容 GitHub Project Pages，而不是错误假设站点部署在域名根目录。

## Canonical 数据校验

`schema/event.schema.json` 负责约束必要的双语字段、taxonomy、日期格式、source / artifact 结构、verification 字段与 relationship arrays。

`scripts/validate-events.mjs` 额外处理 JSON Schema 不适合单独表达的跨记录检查：

- 重复 Event ID；
- 重复 slug；
- 缺少 S1/S2 权威来源；
- `last_updated < added_to_chronicle`；
- 自引用 relationship；
- 指向不存在 Event ID 的 relationship。

多个相关事件引用同一篇论文或公告可能是合理情况，因此共享 source URL 只作为 warning 报告。

## 搜索与探索

Pagefind 在 Astro 渲染 `dist/` 之后运行。其 CLI glob 只索引 `**/events/**/*.html` 下的中英文 Event Detail 路由，因此 Timeline、Explore、标准与方法、使用与共建、数据与订阅等非事件页面不会出现在搜索结果中。浏览器侧搜索 API 使用 Project Pages base URL，因此搜索结果链接在 `/ai4math-chronicle/` 下仍然有效。npm Pagefind package 使用 extended binary，并支持中文 / 日文索引。

Event Detail 页面会从 canonical record 写入 Pagefind filter metadata。当前索引 facets 包括年份、事件类型、重要性、验证状态、系统、AI 角色、接口、证据等级、形式保障、数学新颖性、机构、人物、问题、方法、来源类型、工件类型与标签。因此全文搜索和结构化筛选通过同一个 Pagefind 查询求交，而不是分别生成多套结果。

所有面向用户的筛选控件均支持多选。同一个 facet 内部采用 OR 语义，不同 facets 之间采用 AND 语义。例如同时选择 `H1 + H2` 与 `Lean + Isabelle`，表示 `(H1 OR H2) AND (Lean OR Isabelle)`。客户端通过 Pagefind compound `any` filters 实现这一语义，并在本地 fallback 路径中保持一致。

Canonical taxonomy identifier 继续作为 YAML、`data-*` 属性、Pagefind filter 和可分享 URL query parameter 中的稳定值。面向读者的页面则统一通过 `src/lib/presentation.ts` 中的双语 presentation layer 把这些 identifier 转换为可读标签，因此 `under_verification`、`ai_primary_human_verified` 等机器友好值不再需要作为最终界面文案直接显示。

UI 明确区分两种发现方式：

- **Timeline：** 时间顺序始终是产品的主要阅读表面。全文搜索加上事件类型、重要性两个多选条件，只用于轻量收窄结果，且从不改变历史顺序。年份控件改为真正的页内 chronology anchors：点击年份直接跳到该年份的首条记录，不再与年份 facet 重复维护筛选状态。年份筛选、验证状态筛选以及更复杂的跨字段组合查询统一交给 Explore。
- **Explore：** 面向定向检索与比较。全文搜索、基础多选 facets、高级 facets、排序、逐值可移除的当前条件 chips 与 URL 查询状态共同作用于同一个事件结果集。高级筛选进一步按四类语义分组：**事件属性、AI 与数学、主体与对象、证据与验证**，避免随着 corpus 增长形成难以扫描的扁平控件墙。

Explore 使用可重复的 URL query parameters 持久化多选状态，因此筛选后的视图可以直接分享或重新访问，不需要 backend。整个交互仍然保持 static / client-side。

面向读者的 Event Card 不再把所有 taxonomy 维度做成同权重 pill。卡片首先呈现标题；**重要性 + 验证状态**作为两个主状态 badge；事件类型与证据等级下沉为更安静的次级文字元数据。主要证据仍保持一键可达，但每个快捷入口都会同时呈现双语来源类型与 canonical source title，使同一事件中的多篇论文、代码仓库或官方公告在点击前即可区分。当 Timeline 或 Explore 的搜索 / 筛选隐藏全部 Event 时，结果区域会切换为明确的双语空结果状态，并提供直接重置入口；Explore 还会提示读者优先移除上方可逐项删除的当前条件。

Event Detail 采用**静态渐进式披露**，而不是折叠 canonical 内容。页面 Header 下方首先提供紧凑的双语“一览”摘要，集中呈现重要性、验证状态、证据等级、AI 角色和形式保障；所有主要 section 都具有稳定页内 anchor。轻量 section navigator 将“**先读**”（发生了什么、为什么重要、主要证据）与视觉权重更低的“**深入记录**”区分开。宽屏下该导航保持 sticky；窄屏下回到普通文档流并自动换行，不要求横向拖动。事件正文、证据、验证历史、历史关系、工件与更正记录始终作为可见 semantic HTML 输出，继续服务于无障碍、SEO、GEO 与 Pagefind。

响应式展示不会复制导航或结果数据。窄屏下，在 JavaScript 可用时一级 Header 会通过可访问的菜单按钮进行渐进折叠；若 JavaScript 不可用，完整导航仍直接可见。Explore 始终保留同一份语义化结果表，筛选与排序只操作这一份结果；在手机 / 小型平板宽度下，CSS 将同一批表格行重排为纵向结果卡，同时保留供辅助技术读取的表头，从而避免主检索任务依赖横向拖动。

## 公共信息架构

面向读者的站点层级明确区分产品发现、可信度解释与实际使用 / 参与行动：

- **Timeline + Explore 是主产品表面。** Timeline 回答“AI4Math 随时间发生了什么？”，Explore 回答“哪些事件符合这些条件？”。
- **标准与方法是可信度与解释层。** 它面向普通读者解释收录规则、历史重要性、来源层级、证据等级、验证语义、形式化保障、不确定性与更正原则。它负责说明为什么 Chronicle 可被修正，但不再重复具体提交入口；实际行动统一导向“使用与共建”。
- **使用与共建是一级行动层。** 它集中承载研究引用与版本快照、机器可读数据与 AI 工作流，以及来源线索、遗漏事件提议、纠错和网站贡献等实际操作入口。
- **数据与订阅仍是专业 utility surface。** 它负责导出格式、feed、Quick Start、版本说明、许可与 canonical record 访问，而不与核心阅读模式争夺定位。

因此一级 Header 包含时间线、探索、标准与方法、使用与共建、GitHub；“数据与订阅”继续从“使用与共建”页面和 Footer 进入，而不作为独立的一级阅读模式。首页 Hero 仍然优先突出“探索”和“标准与方法”；独立 `/use/` 页面集中负责引用、机器复用与公开共建动作，使 Timeline 页面本身保持对历史阅读的聚焦。

交互遵循信息密集型出版物的结构：先给 overview，再允许 search / filter，最后按需进入 event-level evidence detail。Light / Dark / 跟随系统主题是轻量客户端增强，不改变内容或路由。

## SEO / GEO / AI 可读结构

事件详情页会把 date、claim、AI contribution、human contribution、verification、sources 与 last review 作为可见的语义化区块渲染。每个页面包含 canonical、hreflang，以及 schema.org `Article` 与 `BreadcrumbList` JSON-LD；时间线包含 `WebSite` JSON-LD。

同一 canonical data 还会生成 JSON、NDJSON、RSS 与 sitemap。这些机器可读表面被视为一级发布产物，而不是事后附加的导出功能。

## 双语架构

Canonical identifiers、source metadata、relationships 与 taxonomies 在两种语言之间共享。面向读者的事件字段在同一 YAML record 内同时保存 `en` 与 `zh-CN`。这样可以避免英文站与中文站逐渐演变成两套不同的事实数据库。

仓库文档采用成对 Markdown 文件并在顶部提供显式语言切换，例如：

- `README.md` ↔ `README.zh-CN.md`
- `CONTRIBUTING.md` ↔ `CONTRIBUTING.zh-CN.md`
- `docs/architecture.md` ↔ `docs/architecture.zh-CN.md`

## 部署

- `ci.yml` 对 Pull Request 与 push 执行 validation、tests 与 build。
- `deploy-pages.yml` 只从 `main` 构建并部署 `dist/`，同时保留 manual dispatch。
- Repository Settings → Pages 仍属于人工控制的部署设置。
- 仓库现已公开；未来涉及 visibility、ruleset 或发布设置等高影响操作仍必须获得人工授权。

## v0.1 明确非目标

MVP 不引入：

- backend 或数据库服务；
- CMS；
- 用户账号；
- vector database；
- leaderboard；
- chatbot；
- 绕过人工编辑审核的 autonomous publication。

这些是 v0.1 的架构约束，并不意味着未来版本永远不能加入相关能力。
