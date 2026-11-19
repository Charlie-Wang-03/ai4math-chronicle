# AI4Math Chronicle — Weekly Research & Editorial Loop

**Status:** Approved standing corpus-maintenance procedure (2026-11-19)
**Authority:** [H1 Governance Amendment](./gpt-project-governance-h1-autonomy-amendment.md) · [H1 Product Amendment](./product-spec-v0.1-h1-autonomy-amendment.md)
**Scheduling:** External ChatGPT Tasks automation; timezone, cadence and enabled state are managed there (not in a GitHub cron file).

## Window and scope

Each run covers **the rolling seven days ending at execution time** in the task's configured timezone, and credible new evidence about older watch items emerging during that window. Report the exact interval. Keep event date, first public claim, artifact/paper date, Chronicle added date and source-discovery date separate. A retrospectively discovered historical Event must retain its authentic historical date.

Chronicle and **AI4Math Radar** are separate products and repositories. Do not change `Charlie-Wang-03/ai4math-radar`, import its corpus as canonical Chronicle evidence, or infer significance from Radar publication.

## Required procedure

1. **Recover repository state.** Read the live `main`, `AGENTS.md`, `docs/project-state.md`, current Product Specification and amendments, Governance Protocol and amendments, Editorial Methodology, Source Intake, Deterministic Source Discovery and Maintenance Policy; inspect relevant open PRs, Issues, recent events and CI.
2. **Discover.** Define the date window with `config/source-channels.yaml`. Use the on-demand deterministic source scanner via GitHub workflow dispatch **if supported by available tools**; otherwise independently enumerate official machine/direct channels and disclose missing coverage. Supplement with targeted web research, public research papers, institutional announcements, inspectable formal artifacts, code repositories and scholarly critiques. A machine result is a lead, not evidence of a publishable event.
3. **Deduplicate and screen.** Compare all candidates with `data/events/*.yaml`, Source Leads, existing PRs and watch items. Cluster multiple reports of the same milestone. Separate H1 turning points, H2 field milestones, H3 context, updates to existing Events, watch items and exclusions.
4. **Validate claims.** Inspect at least one S1/S2 authoritative source for every publishable Event, seek independent scrutiny when available, distinguish AI/human roles and claim scope, and never claim independently established mathematical truth from publicity or automatic scoring.
5. **Publish only qualified work.** Edit canonical bilingual YAML, provenance, relationships and histories on focused branches and PRs. Run/review required CI and merge only with protected branch checks passed and no remaining human gate. If evidence is immature, save a deduplicated Source Lead with a concrete follow-up trigger; do not create a thin Event to meet a quota.
6. **Respect other hard gates.** Never autonomously finalize `independently_verified`, `disputed`, `corrected` as current status, `retracted`, or material mathematical correctness / historical priority / attribution adjudication. Prepare a reviewable decision package and escalate precisely that decision; keep other work moving.
7. **Report in Chinese.** Include exact research window, source/channel coverage limits, candidate evaluation and significance rationales, new/updated Event or PR links, verification caveats, pending human gates, CI/merge status, and reasons for watch/exclusion. A truthful result may be **zero published events**. Do not state that a PR was merged or deployment completed without checking.

## Invariants

- **Historical selection over news volume**; no weekly publication quota or guaranteed publication SLA.
- One factual source of truth (`data/events/*.yaml`), with stable IDs and explicit correction / verification provenance.
- No autonomous new product phase, alternate database, backend, mass ingestion, unreviewed direct publishing or release/tag mutation.
- Honor the active trusted co-maintainer conflict and protected-branch rules.
