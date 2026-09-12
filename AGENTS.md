# Agent Instructions

These instructions apply to the entire repository. They are a concise operating contract for coding and editorial agents; detailed guidance remains in the linked documents rather than being duplicated here.

## Project outcome

AI4Math Chronicle is a timeline-first, evidence-backed archive of major milestones in AI for Mathematics. Preserve discoverability, historical comprehension, primary-evidence access, canonical data quality, and static-site maintainability.

## Governance and state recovery

Before substantive work in a fresh conversation, read and reconcile:

1. [`docs/gpt-project-governance.md`](docs/gpt-project-governance.md) — agent authority, state recovery, hard gates, and handoff;
2. [`docs/product-spec-v0.1.md`](docs/product-spec-v0.1.md) together with any ratified amendment named by [`docs/project-state.md`](docs/project-state.md) — active v0.1 product contract;
3. [`docs/project-state.md`](docs/project-state.md) — approved semantic phase and active mainline;
4. live GitHub repository state — current HEAD, branches, PRs, Issues, releases, files, and task-relevant CI.

Do not treat old chat summaries, memory, copied commit SHAs, or stale branch names as current repository truth. Historical conversation context may explain rationale but cannot silently override live GitHub facts or the ratified governance contract.

## Read before changing

- Website / build work: [`docs/development.md`](docs/development.md) and [`docs/architecture.md`](docs/architecture.md)
- Reader-facing UI / information design: [`docs/information-design.md`](docs/information-design.md)
- Event data / classification / verification: [`docs/editorial-methodology.md`](docs/editorial-methodology.md)
- Candidate/source discovery: [`docs/deterministic-source-discovery.md`](docs/deterministic-source-discovery.md) and [`docs/source-intake.md`](docs/source-intake.md)
- Long-term cadence / dependency maintenance / release snapshots: [`docs/maintenance.md`](docs/maintenance.md)
- External contributions: [`CONTRIBUTING.md`](CONTRIBUTING.md)

## Repository invariants

1. `data/events/*.yaml` is the canonical factual source. Do not maintain a second event database.
2. Generated pages, JSON, NDJSON, RSS, sitemap, and search outputs must derive from canonical records.
3. Preserve GitHub Project Pages behavior under `/ai4math-chronicle/`; do not assume a domain-root deployment.
4. Keep the site static. Do not add a backend, CMS, account system, database server, vector database, server API, or unnecessary SSR without an explicit product-specification change.
5. Preserve English and `zh-CN` fields in the same canonical record; do not fork factual datasets by language.
6. Keep reader-facing README material separate from developer implementation documentation.

## Autonomy model

Within an approved mainline, agents have high execution authority: inspect, decompose, implement, validate, open PRs, respond to CI, and complete ordinary maintenance without repeated approval requests.

Agents do **not** have autonomous agenda or constitutional authority. Do not invent a new project phase, major maintained capability, product category, or governance rule merely because it appears useful. Follow the approved mainline in `docs/project-state.md` or the owner's current explicit instruction.

Use the rule:

> **Autonomous decomposition, not autonomous agenda creation.**

## Source discovery

For broad candidate discovery, prefer the repository's versioned deterministic and direct-source channels before relying on open-ended LLM/web search. Use [`docs/deterministic-source-discovery.md`](docs/deterministic-source-discovery.md) and `config/source-channels.yaml` to establish an explicit date window and inspectable candidate set. Probabilistic web search remains useful for gap filling, following a named lead, locating independent corroboration, and investigating known uncertainty; it should not be the only baseline enumeration method when a deterministic/direct channel covers the task.

Scanner output and Source Lead Issues are operational discovery records, not canonical factual data. Triage machine results before opening Source Leads; persist a lead when it is worth later editorial action; move mature evidence into the relevant canonical Event through the normal review path. Discovery automation must not become autonomous publication.

## Editorial boundaries

Agents may gather evidence, draft bilingual text, suggest taxonomy, detect duplicates, create ordinary H2/H3 Event records, maintain relationships, and apply lower-risk evidence / verification updates when the documented rule is satisfied and supporting sources are recorded.

The following are standing human hard gates unless the owner has explicitly approved the exact decision or an already-established policy explicitly delegates it:

- a new or materially changed `H1` classification;
- finalizing `independently_verified`;
- finalizing `disputed`;
- finalizing `corrected` as the current verification status;
- finalizing `retracted`;
- resolving a material mathematical-correctness, historical-priority, or attribution dispute on the Chronicle's own authority;
- changing the Product Specification, Governance Protocol, source-of-truth hierarchy, canonical Event model, inclusion boundary, significance framework, verification framework, or human-gate policy.

`independently_verified` remains an event-level evidence label: reliable sources independent of the originating claim must substantively corroborate the Chronicle's core event description. The human gate controls publication of the status; it does not redefine the status as certification that the underlying mathematics is ultimately correct.

Agents and the Chronicle must not present the correctness of a new mathematical fact as the project's own adjudication. High-risk wording such as “first”, “solves”, “proves”, or “disproves” should remain source-attributed unless the relevant historical fact is independently established.

Significance, event-level verification, formal assurance, and ultimate mathematical correctness are independent dimensions.

## Verification

Before considering a change complete, run the checks relevant to the change. For normal code or event-data changes, the full gate is:

```bash
npm ci
npm test
npm run build
```

Do not treat a visually plausible page or an agent-generated record as verified merely because it renders.

## Change discipline

- Use focused branches and reviewable pull requests for non-trivial work.
- Do not mix unrelated editorial, dependency, UI, and governance changes without a clear reason.
- Preserve stable Event IDs and explicit correction / verification history.
- Update `docs/project-state.md` when the semantic phase, approved mainline, standing work loop, blocker, human gate, or next actionable unit changes; do not mirror volatile SHAs or corpus counts there.
- Do not commit credentials, secrets, machine-specific private paths, or private source material.
- Do not force-push shared branches, rewrite published history, delete branches with active work, change repository visibility, or perform other destructive / high-blast-radius operations without explicit human authorization.
- Do not merge release work to `main` merely because CI is green when a human editorial, governance, or launch gate remains open.
- Do not move or rewrite published tags or GitHub Releases; treat them as historical snapshots.

## Definition of done

A change is done only when its intended outcome is implemented, canonical data remains valid, relevant tests/builds pass, documentation is updated when behavior or governance changes, semantic project state is updated when necessary, and any required human editorial / governance / release gate has been explicitly satisfied.

A future conversation should be able to recover the true project state from repository evidence without depending on the previous chat.
