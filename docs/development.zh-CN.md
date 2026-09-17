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

Chronicle 可以通过多个已批准公开入口提供访问，同时继续只使用一份静态构建与一套 canonical Event 单一事实源。当前入口政策以 [`product-spec-v0.1-public-entrypoints-amendment.md`](./product-spec-v0.1-public-entrypoints-amendment.md) 为准。若改动会迁移技术 SEO canonical origin 或改变产品架构，则仍属于需要单独决策的 migration。

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

涉及 reader interface 的修改还应针对 production build 运行聚焦的浏览器 smoke suite。该套件刻意只使用一套固定版本的 Chromium 工具链，而不是扩大成跨浏览器矩阵。Playwright 采用临时安装，因此不会成为网站运行依赖，也不会修改已提交的 lockfile：

```bash
npm run build
npm install --no-save --package-lock=false @playwright/test@1.55.0
npx playwright install chromium
npm run test:browser
```

CI 会安装相同固定版本的 Playwright、Chromium 及其系统依赖，并在正常 production build 之后执行 `npm run test:browser`。浏览器报告与失败产物只属于本地 / CI 输出，不提交进仓库。

## 仓库区域

```text
data/events/               canonical 事件记录
schema/event.schema.json   Event Schema
scripts/                   校验与导出生成
src/                       Astro 页面、layout、component 与样式
public/                    静态公开资源
tests/                     数据管线与静态契约测试
tests/browser/             聚焦的 reader-interface 浏览器 smoke tests
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
- Pagefind index build；
- 针对关键读者交互的小型真实浏览器 responsive / accessibility smoke gate。

浏览器 smoke gate 刻意保持窄范围。它保护 compact mobile header、Explore 的 mobile-native 布局、多选控件的键盘操作与 focus visibility、显式零结果恢复、双语路由切换、主题偏好持久化、关键 landmarks 与 Event Detail 页内导航。它不是像素级截图回归、完整 WCAG 认证或跨浏览器兼容性矩阵。

外部链接检查不应成为长期 flaky CI 来源。

## 正式公开入口与 self-hosted delivery

同一份 `main` Chronicle 构建通过三个已批准的**平级产品公开入口**提供访问：

- `https://charlie-wang-03.github.io/ai4math-chronicle/`
- `https://history.aixmath.org/`
- `https://timeline.aixmath.org/`

后两个入口通过 self-hosted delivery 提供服务。它们不是彼此独立的事实站点：三个入口展示的是同一套 Chronicle 产品与 canonical Event corpus。

为了保持技术 SEO 信号聚合，当前构建仍把 `site` 保持在 GitHub Pages origin，公开 HTML 也继续输出 GitHub Pages canonical URL；Sitemap、structured metadata、IndexNow 与机器可读 canonical URL 在另行批准 canonical-domain migration 前也继续使用现有 Pages URL scope。这个技术 canonical 策略**不表示** `history.aixmath.org` 或 `timeline.aixmath.org` 在产品宣传层面属于次级入口。

`.github/workflows/notify-deploy.yml` 会在 `main` 更新时向 self-hosted deploy API 发送签名通知，使 mirror 从同一 commit 重新构建。该 workflow 只是 notification：它不作为 CI gate；`AI4MATH_DEPLOY_WEBHOOK_SECRET` 缺失时会安全跳过；它也独立于 GitHub Pages deployment。

`https://news.aixmath.org/` 暂时保留给未来可能开发的 AI4Math News 产品，不属于当前 Chronicle 入口，也不应作为 Chronicle URL 对外宣传。如果外部基础设施目前仍在该 hostname 上提供 Chronicle 内容，应将其视为过渡状态，直到外部 routing 被停放或重新用途化；该 routing 修改发生在本仓库之外。

## UI 修改

产品始终坚持 timeline-first 与 evidence-first。UI 修改应直接改善可发现性、历史理解、证据访问、可访问性或可读性。避免为了视觉效果引入电影化时间线、WebGL、知识图谱或降低扫描效率的复杂交互。

当前结构见 [架构说明](./architecture.zh-CN.md)。

## 许可

源代码贡献按照 MIT License 接收；Chronicle 原创编辑内容与数据编纂则按 [内容许可说明](../LICENSE-CONTENT.zh-CN.md) 单独治理。