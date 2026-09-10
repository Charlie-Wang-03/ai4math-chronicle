# Contributing

**English** · [简体中文](./CONTRIBUTING.zh-CN.md)

Thank you for helping improve AI4Math Chronicle. The project accepts focused corrections, evidence upgrades, new event proposals, metadata fixes, and implementation improvements that preserve the Chronicle's canonical-data model.

## Before you start

For content changes, read [Editorial Methodology](./docs/editorial-methodology.md) first. For implementation changes, read [Architecture](./docs/architecture.md).

The repository is still behind the v0.1 public-release gate, so contribution surfaces may evolve before visibility is switched to public.

## Event contribution workflow

For a new or modified event:

1. Add or edit one record under `data/events/*.yaml`.
2. Preserve stable Event IDs; do not rename an existing ID because a title changes.
3. Provide bilingual factual fields (`en` and `zh-CN`).
4. Add authoritative evidence. Every published event must include at least one S1 or S2 source.
5. Make AI contribution and human contribution explicit.
6. Keep significance, verification status, evidence level, and formal assurance separate.
7. Append status changes to `verification.history`.
8. Record factual corrections in `corrections` and cite the relevant source IDs.
9. Run the full local validation sequence.
10. Open a focused pull request describing the evidence, uncertainty, and intended editorial change.

## Human editorial gates

Automated analysis may suggest classifications, but a contribution must **not** unilaterally finalize:

- `H1`;
- `independently_verified`;
- a claim that a new mathematical fact is established.

Those decisions require human editorial review.

## Local validation

Requires Node.js `>=22.12.0`.

```bash
npm install
npm run validate
npm test
npm run build
```

A content pull request should not be considered ready until all three validation/build steps pass.

## Source expectations

Evidence tiers are defined as:

- **S1:** primary research record or artifact;
- **S2:** official institutional/researcher source;
- **S3:** independent scholarly verification or analysis;
- **S4:** reputable secondary media;
- **S5:** community discovery signal only.

S5 can help discover a candidate, but it is not sufficient evidence for publication.

## Pull request scope

Prefer small, reviewable pull requests. For event changes, one PR should normally address one event or one tightly related event cluster. Avoid mixing unrelated UI refactors, dependency upgrades, and editorial changes in the same PR.

A good PR description should state:

- what changed;
- why the change is needed;
- which sources support it;
- what uncertainty remains;
- whether any human editorial gate is triggered;
- which validation commands passed.

## Implementation contributions

The MVP is intentionally static and GitHub-native. Changes should preserve these constraints unless a future product specification explicitly changes them:

- no backend or account system;
- no second factual database outside canonical YAML;
- no autonomous publication without human editorial review;
- GitHub Pages project-site compatibility under `/ai4math-chronicle/`;
- static, indexable HTML and machine-readable exports remain first-class outputs.

## Corrections and disputed claims

Do not silently rewrite the historical record. If evidence changes after publication:

- update `verification.status` as appropriate;
- append to `verification.history`;
- add a `corrections` entry when a factual statement changed;
- preserve the sources necessary to understand what changed and why.

The Chronicle should make uncertainty visible rather than erase it.
