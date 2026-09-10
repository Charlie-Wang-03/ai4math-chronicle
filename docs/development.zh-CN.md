# 开发指南

[English](./development.md) · **简体中文**

本文面向参与网站实现、构建管线、数据校验与仓库自动化的开发者。面向普通网站读者的项目介绍放在根目录 README；编辑政策由编辑方法论文档维护。

## 技术契约

v0.1 刻意保持静态、GitHub-native：

- Astro + TypeScript；
- 仅使用静态站点生成；
- canonical 事件数据使用 YAML；
- JSON Schema + semantic validation；
- Pagefind 静态搜索；
- GitHub Actions；
- GitHub Pages Project Pages base path `/ai4math-chronicle/`。

除非未来 Product Specification 明确修改方向，否则不要引入 backend、CMS、账号系统、数据库服务器、vector database、server API 或不必要的 SSR。

## 本地环境

需要 Node.js `>=22.12.0`。

```bash
npm ci
npm run validate
npm test
npm run dev
```

生产环境验收：

```bash
npm run build
```

生产构建会校验 canonical YAML、生成机器可读输出、检查 Astro / TypeScript、渲染静态站点并构建 Pagefind 索引。

## 仓库区域

```text
data/events/               canonical 事件记录
schema/event.schema.json   Event Schema
scripts/                   校验与导出生成
src/                       Astro 页面、layout、component 与样式
public/                    静态公开资源
tests/                     数据管线测试
.github/workflows/         CI 与 Pages 部署
```

## 实现规则

1. 保持 single source of truth：公开页面与导出均从 canonical event 派生。
2. 所有内部链接与静态资源必须兼容 Project Pages base path。
3. 保持语义化静态 HTML 与可索引内容。
4. 在合理情况下让 JavaScript 保持渐进增强，而不是成为阅读的硬依赖。
5. 简单静态实现能满足需求时，不引入更重的前端框架或状态系统。
6. 自动化不得削弱人工编辑门槛。
7. PR 保持聚焦，不混入无关依赖升级、UI 重构与编辑性改动。

## 校验要求

CI 应保持 deterministic，并至少覆盖：

- Schema validation；
- duplicate ID / slug；
- 日期与 enum 合法性；
- 权威来源要求；
- 内部 relationships；
- generated data consistency；
- Astro / TypeScript checks；
- 静态 production build；
- Pagefind index build。

外部链接检查不应成为长期 flaky CI 来源。

## UI 修改

产品始终坚持 timeline-first 与 evidence-first。UI 修改应直接改善可发现性、历史理解、证据访问、可访问性或可读性。避免为了视觉效果引入电影化时间线、WebGL、知识图谱或降低扫描效率的复杂交互。

当前结构见 [架构说明](./architecture.zh-CN.md)。

## 许可

源代码贡献按照 MIT License 接收；Chronicle 原创编辑内容与数据编纂则按 [内容许可说明](../LICENSE-CONTENT.zh-CN.md) 单独治理。
