# AI4Math Chronicle — Current Project State

**Status:** Canonical semantic operational state  
**Last governance review:** 2026-09-12

This file records the **approved semantic state** that a future conversation needs in order to resume work. It intentionally does not mirror volatile GitHub facts such as commit SHAs, branch lists, corpus counts, workflow-run IDs, or temporary implementation details.

## Product phase

**Post-launch v0.1.x maintenance and corpus stewardship** under the v0.1 product/editorial contract.

The active product contract is the frozen [`product-spec-v0.1.md`](./product-spec-v0.1.md) together with the owner-approved [`product-spec-v0.1-r0-amendment.md`](./product-spec-v0.1-r0-amendment.md). The R0 amendment reconciles the post-launch reader experience with the approved Timeline / Search & Explore / Event Detail / About product model; it does not create a new product phase or change the canonical Event model, editorial boundaries, or human-review gates.

The owner-approved R1 reader-information work is recorded in [`information-design.md`](./information-design.md). It is an implementation-level design contract inside v0.1.x, not a Product Specification amendment and not a new product phase. The owner-approved R1.2C-A signature-ornament language is recorded in [`ornament-language.md`](./ornament-language.md) as a subordinate visual-identity contract; it defines ornament boundaries without authorizing a broader redesign or new product phase.

The public v0.1 line is already launched. Ordinary maintenance, incremental Event additions, corrections, evidence improvements, metadata, dependency work, and focused UI / UX / SEO / GEO improvements may continue without creating a new product phase as long as they remain inside the active v0.1 contract.

## Approved active mainline

The approved long-term mainline has two standing tracks:

1. **Product / engineering maintenance** — keep the static GitHub Pages site reliable, discoverable, professional, accessible, coherent, and easy to navigate under the active v0.1 product contract.
2. **Chronicle / corpus maintenance** — continue evidence-backed candidate intake, deduplication, Event drafting, normal H2/H3 publication, source maintenance, corrections, relationships, and verification follow-up under the Editorial Methodology and Governance Protocol.

These are standing maintenance loops, not authorization to invent a new major feature family or a new product phase.

## Current semantic objective

Maintain AI4Math Chronicle as a trustworthy, living historical archive while preserving:

- timeline-first historical discovery;
- persistent, low-friction Search & Explore retrieval;
- one canonical Event record per event;
- insight-first Event Detail reading with historical context surfaced early;
- low-friction primary-evidence access;
- task-aware page hierarchy and modular scholarly information presentation;
- stable, language-aware bilingual typography and responsive density;
- auditable verification and correction history;
- a static, maintainable GitHub-native architecture.

### Approved R0 product-coherence model

The following decisions are approved product state:

- **Timeline = browse history.** It preserves chronology and uses only lightweight refinement; year controls are chronology anchors rather than duplicate filter state.
- **Search & Explore = find events.** It owns richer structured retrieval. Text queries default contextually to relevance, while no-query views default to newest-first; explicit user sorting is preserved.
- **Event Detail = insight first, evidence-backed.** Readers encounter what happened, why it matters, historical context, and primary evidence before the fuller trust taxonomy and detailed record.
- **Historical relationships are a primary comprehension aid.** Existing predecessor / successor / related fields should be surfaced early rather than treated only as deep metadata.
- **About / 关于 is a top-level project surface.** It absorbs and retains the former Use & Contribute responsibilities while also explaining what the Chronicle is, how its reading surfaces differ, how to cite/reuse it, and how to participate.
- **Standards & Methodology owns the complete trust explanation.** Core reading surfaces should expose necessary status/evidence signals without repeatedly reproducing the full taxonomy.
- **Advanced facet expansion is frozen by default.** New reader-facing facets require a concrete user retrieval job rather than merely a corresponding schema field.
- Major visual redesign is not an active priority; visual work should support product coherence, readability, and accessibility rather than restart the visual system.

### Approved R1 reader-information model

R1 refines how the approved R0 product model is visually expressed. The durable implementation rules are documented in [`information-design.md`](./information-design.md), with signature ornament rules in [`ornament-language.md`](./ornament-language.md).

- **Visual direction = Modern Scholarly Editorial.** Prefer academic, archival, precise, quiet, dense-but-readable presentation over SaaS/dashboard or decorative AI styling.
- **Page roles have different hierarchy.** Timeline is chronology-first, Event Detail is record/insight-first, Search & Explore is utility-first, Standards & Methodology is reference-first, and About is project-orientation/action-first.
- **Mobile presentation is task-first.** Core Timeline, Search & Explore, and Event Detail tasks should begin within the first representative mobile viewport rather than spending the first screen on decorative or explanatory prelude.
- **Event Detail uses semantic information primitives.** What happened, significance, historical relationships, primary evidence, trust state, AI/human contribution, and provenance should have distinct visual grammar while continuing to derive from one canonical Event record.
- **Trust summary is hierarchical.** Significance and verification are primary quick-read dimensions; evidence level, AI role, and formal assurance are secondary interpretive dimensions.
- **Timeline reads as historical chapters.** Years are visible chapter markers as well as chronology anchors, while Event records remain compact and evidence remains low-friction.
- **Standards & Methodology introduces four independent trust dimensions.** Significance, evidence, verification, and formal assurance are explained before detailed taxonomies and are never collapsed into a single trust score.
- **Typography is bilingual and role-aware.** English and Simplified Chinese use appropriate editorial/interface stacks, long record titles are more compact than display headings, and reading measure remains restrained.
- **Visual identity uses a controlled ornament layer.** The owner-approved R1.2C-A language defines Chronicle Graph, Mathematical Construction Geometry, and Scholarly Marginalia as reusable identity motifs. Ornament remains subordinate to content, may disappear without semantic loss, and is forbidden from turning dense reading/retrieval areas into decorative AI surfaces.
- **R1.2C-B identity anchors passed owner visual review.** Home hero, Standards & Methodology top, and About top use the approved ornament language; the compact mobile compositions were explicitly tuned and then accepted by the owner. Timeline Event records, active Search & Explore retrieval, and Event Detail reading remain ornament-free (`O0`).
- **R1.2C-C structural accents are owner-approved.** The controlled rollout may add only restrained structural echoes: a non-mobile chronology transition between the Home/Timeline identity surface and chronology controls, an ornament visible only in the Search & Explore zero-result state, and a low-strength global footer echo. These accents must not enter Timeline Event records, active retrieval results/filters, or Event Detail reading content.
- **R1.2C-D remains stabilization, not expansion.** After C-C, final visual QA may tune or remove approved ornaments across light/dark, English/Chinese, and desktop/mobile, but it must not create new ornament surfaces without another explicit owner decision.
- **Logo redesign remains a separate decision.** The current logo is not treated as a constitutional palette or ornament source and may be revisited independently.

## Currently tracked editorial concern

GitHub **Issue #17 — H1 corroboration watch: active disputes and follow-up after v0.1.0** remains the known active high-significance watch item.

Future conversations must re-check the live Issue state rather than assuming it is still open or unchanged.

## Autonomous work allowed inside this state

Without a new phase decision, agents may continue:

- scoped website bug fixes and UX improvements;
- accessibility, SEO, GEO, structured-data, search, and navigation maintenance;
- incremental work that reinforces the approved R0 product-coherence and R1 information-design models;
- dependency and GitHub Pages maintenance;
- schema, CI, documentation, and data-quality improvements;
- candidate event discovery and source collection;
- ordinary H2/H3 Event creation when evidence and scope rules are satisfied;
- routine evidence-level and lower-risk verification updates;
- relationship, metadata, translation, and provenance maintenance;
- focused correction preparation up to any human hard gate.

## Human gates currently in force

The standing hard gates are defined canonically in [`gpt-project-governance.md`](./gpt-project-governance.md). In particular, do not autonomously finalize:

- new or materially changed H1 classification;
- `independently_verified`;
- `disputed`;
- `corrected` as current verification status;
- `retracted`;
- an unresolved mathematical-correctness / priority adjudication;
- a new product phase, scope change, governance amendment, or weakened human gate.

The R0 product-coherence and R1 reader-information decisions listed above have already been explicitly approved by the owner and therefore are not open human gates. R1.2C-B has passed the required owner visual review, and the owner has explicitly approved R1.2C-C within the bounded structural-accent scope above. Broader ornament expansion remains outside the approved mainline.

## No-autonomous-agenda rule

If the standing maintenance loops and any already-approved Issue / milestone / handoff contain no actionable work, the agent must not create a new long-term direction on its own.

Instead:

1. summarize the current repository state;
2. identify a small number of evidence-based candidate next milestones;
3. explain the trade-offs;
4. return the phase decision to the project owner.

## Next-action rule for a fresh conversation

When the owner gives a broad instruction such as “continue AI4Math Chronicle”:

1. execute the state-recovery protocol in `gpt-project-governance.md`;
2. read the frozen v0.1 Product Specification, the ratified R0 amendment, the R1 information-design contract, and the R1.2C ornament-language contract when visual-identity work is relevant;
3. re-check live Issues / PRs / recent commits and this semantic state;
4. continue an existing approved objective or standing maintenance task if one is clearly actionable;
5. if none exists, do not invent a new phase — surface candidate next milestones for owner selection.

## State hygiene

Update this file only when the **semantic operational state** changes: phase, approved mainline, standing work loop, blocker, human gate, or next actionable unit.

Do not update it merely because HEAD, a branch name, corpus count, or CI run changed.
