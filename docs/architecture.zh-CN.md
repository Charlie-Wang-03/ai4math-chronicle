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
        │   ├── Methodology
        │   └── Data
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

Pagefind 在 Astro 渲染 `dist/` 之后运行。其 CLI glob 只索引 `**/events/**/*.html` 下的中英文 Event Detail 路由，因此 Timeline、Explore、Methodology、Data 等非事件页面不会出现在搜索结果中。浏览器侧搜索 API 使用 Project Pages base URL，因此搜索结果链接在 `/ai4math-chronicle/` 下仍然有效。npm Pagefind package 使用 extended binary，并支持中文 / 日文索引。

Event Detail 页面还会从 canonical record 写入 Pagefind filter metadata，包括年份、事件类型、重要性、验证状态、系统、AI 角色、接口、证据等级与形式保障。因此全文搜索和结构化筛选通过同一个 Pagefind 查询求交，而不是分别生成两套结果。

UI 明确区分两种发现方式：

- **Timeline：** 时间顺序始终是产品的主要阅读表面。搜索、年份、事件类型、重要性和验证状态只收窄当前可见时间线，不改变历史顺序。
- **Explore：** 面向定向检索与比较。全文搜索、基础筛选、高级 facets、排序、可移除的当前条件 chips 与 URL 查询状态共同作用于同一个事件结果集。

Explore 使用普通 URL query parameters 持久化当前查询状态，因此筛选后的视图可以直接分享或重新访问，不需要 backend。

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
