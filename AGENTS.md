# Agent Instructions

These instructions apply to the entire repository. They are a concise operating contract for coding and editorial agents; detailed guidance remains in the linked documents rather than being duplicated here.

## Project outcome

AI4Math Chronicle is a timeline-first, evidence-backed archive of major milestones in AI for Mathematics. Preserve discoverability, historical comprehension, primary-evidence access, canonical data quality, and static-site maintainability.

## Read before changing

- Website / build work: [`docs/development.md`](docs/development.md) and [`docs/architecture.md`](docs/architecture.md)
- Event data / classification / verification: [`docs/editorial-methodology.md`](docs/editorial-methodology.md)
- Long-term cadence / dependency maintenance / release snapshots: [`docs/maintenance.md`](docs/maintenance.md)
- External contributions: [`CONTRIBUTING.md`](CONTRIBUTING.md)

## Repository invariants

1. `data/events/*.yaml` is the canonical factual source. Do not maintain a second event database.
2. Generated pages, JSON, NDJSON, RSS, sitemap, and search outputs must derive from canonical records.
3. Preserve GitHub Project Pages behavior under `/ai4math-chronicle/`; do not assume a domain-root deployment.
4. Keep the site static. Do not add a backend, CMS, account system, database server, vector database, server API, or unnecessary SSR without an explicit product-specification change.
5. Preserve English and `zh-CN` fields in the same canonical record; do not fork factual datasets by language.
6. Keep reader-facing README material separate from developer implementation documentation.

## Editorial boundaries

Agents may gather evidence, draft bilingual text, suggest taxonomy, detect duplicates, and propose or apply verification updates when the documented evidence rule is satisfied and supporting sources are recorded.

They must not independently finalize a new `H1` classification unless a human editor directly approves it or has explicitly delegated that classification pass under an established policy.

`independently_verified` is an event-level evidence label. It may be assigned when reliable sources independent of the originating claim substantively corroborate the Chronicle's core event description. It must not be treated as a declaration that the underlying mathematics is ultimately correct.

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
- Do not mix unrelated editorial, dependency, and UI changes without a clear reason.
- Preserve stable Event IDs and explicit correction / verification history.
- Do not commit credentials, secrets, machine-specific private paths, or private source material.
- Do not force-push shared branches, rewrite published history, delete branches with active work, change repository visibility, or perform other destructive / high-blast-radius operations without explicit human authorization.
- Do not merge release work to `main` merely because CI is green when a human H1 editorial or launch gate remains open.
- Do not move or rewrite published tags or GitHub Releases; treat them as historical snapshots.

## Definition of done

A change is done only when its intended outcome is implemented, canonical data remains valid, relevant tests/builds pass, documentation is updated when behavior or governance changes, and any required human H1 editorial or release gate has been explicitly satisfied.
