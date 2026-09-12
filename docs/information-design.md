# AI4Math Chronicle — Reader Information Design Contract

**Status:** Active v0.1.x implementation contract  
**Established:** 2026-09-12  
**Scope:** Reader-facing information hierarchy, typography, modular presentation, responsive density, and semantic color architecture

This document records the information-design system established by the owner-approved R1 work. It is an implementation contract inside the active v0.1.x product model; it does not amend the Product Specification, canonical Event model, editorial methodology, or governance protocol.

The visual direction is:

> **Modern Scholarly Editorial** — academic, archival, precise, quiet, dense-but-readable, and evidence-backed.

The site should look like a maintained scholarly archive and research publication, not a generic SaaS dashboard or a decorative “AI website.” Typography, whitespace, rules, evidence presentation, historical structure, and restrained semantic color should carry more hierarchy than rounded cards, gradients, shadows, icons, or animation.

## 1. Page roles

Different surfaces have different reading jobs and therefore must not share one oversized landing-page hierarchy.

| Role | Surface | Primary job | Presentation rule |
| --- | --- | --- | --- |
| Chronology | Timeline | Browse history | Expressive but compact editorial framing; chronology begins early |
| Record | Event Detail | Understand one canonical Event | Long-title-safe record heading; insight before taxonomy |
| Retrieval | Search & Explore | Find and compare Events | Utility-first; search controls appear before explanatory prose becomes a burden |
| Reference | Standards & Methodology | Interpret trust and editorial rules | Medium editorial heading plus a scannable trust-model overview |
| Project | About | Understand, cite, reuse, and contribute | Modular orientation/action sections rather than a product dashboard |

## 2. Task-first viewport budgets

Responsive design is evaluated by how soon the page exposes its primary task, not only by whether content technically fits.

At a representative `390 × 844` mobile viewport:

- Timeline should begin the first visible Event within the first viewport;
- Search & Explore should expose its search input within the first viewport;
- Event Detail should begin `What happened?` within the first viewport;
- Standards & Methodology should expose the four-dimensional trust model near the top of the page;
- About should expose project identity and the reading model without requiring a decorative prelude.

These are regression constraints, not universal pixel-perfect targets for every device.

## 3. Typography

Typography is role-aware and language-aware.

- Editorial headings use a Latin serif stack for English and a CJK-aware serif stack for Simplified Chinese.
- Chinese interface/body text uses a CJK-aware sans-serif stack before generic system fallbacks.
- Long record titles use a smaller scale than Timeline display headings.
- Retrieval pages use more compact headings than editorial/chronology pages.
- Metadata uses the monospaced metadata stack selectively for dates, compact labels, evidence metadata, and navigation aids; it should not become the default prose face.
- Long-form reading measure should remain approximately `72ch` where practical.
- Chinese headings should not inherit negative Latin-oriented letter spacing.

Do not commit font binaries merely to force visual uniformity. Prefer robust system/open-stack fallbacks and verify bilingual rendering in real browsers.

## 4. Semantic Event modules

Canonical Event data should map to stable reader-facing information primitives rather than one generic card or fact-grid treatment.

### Event Lead

`What happened?` is the primary factual statement and receives stronger narrative emphasis than ordinary metadata.

### Significance Note

`Why it matters` explains historical relevance. Its significance rationale may be visually separated, but significance must remain distinct from verification.

### Historical Lineage

`predecessors`, `successors`, and `related` are historical-comprehension primitives. They should read as lineage/relationship records, not as three equal dashboard cards and not as a knowledge graph.

### Evidence Citation

Primary evidence is presented with citation-like hierarchy. Evidence links remain one click away where practical.

### Trust Summary

Trust dimensions are hierarchical:

1. **Significance** and **Verification** are the primary quick-read statuses;
2. **Evidence level**, **AI role**, and **Formal assurance** are secondary interpretive dimensions.

The full taxonomy remains owned by Standards & Methodology.

### Contribution Split

AI contribution and human contribution are prose-bearing modules. They should not be compressed into tiny metadata cells merely because they originate in structured fields.

### Provenance Log

Verification history and corrections should read as an auditable revision/provenance record.

## 5. Timeline reading

Timeline is a historical reading surface, not a card feed.

- Chronology remains fixed; search and lightweight filters never reorder it.
- Years are visible chapter markers as well as navigation anchors.
- Event records prioritize title, significance, verification, concise summary, and low-friction evidence access.
- Secondary taxonomy and source metadata are visually quieter.
- Primary evidence may be compacted but must not be removed from the one-click reading path.
- Avoid cinematic timelines, graph visualization, scroll theatrics, or decorative animation that reduces scan efficiency.

## 6. Search & Explore

Search & Explore is a research retrieval surface, not a dashboard.

- Search appears early and remains the dominant action.
- Explanations of Timeline-vs-Explore semantics use progressive disclosure once the model is established.
- Advanced facets stay grouped and collapsed by default where appropriate.
- New schema fields do not automatically become filters.
- Results should remain readable records at desktop width and reflow into mobile-native records without creating a second data surface.

## 7. Standards & Methodology

The trust model is introduced as four independent dimensions before detailed taxonomies:

1. **Significance** — how historically important is the Event?
2. **Evidence** — how mature and inspectable is the public evidence?
3. **Verification** — how far is the core Event description corroborated?
4. **Formal Assurance** — how far has a formal artifact been checked or replayed?

These dimensions must not be collapsed into a single trust score. Source tiers explain evidence provenance and do not replace any of the four dimensions or adjudicate mathematical correctness.

## 8. Visual grammar

Prefer:

- typographic hierarchy;
- whitespace and vertical rhythm;
- thin rules and restrained borders;
- semantic modules;
- citation-like evidence presentation;
- compact, legible metadata;
- restrained status and editorial accents;
- perceptible but quiet surface separation.

Avoid by default:

- large-radius card systems;
- heavy shadows/elevation;
- glassmorphism;
- neon or cyberpunk AI styling;
- decorative gradients as the primary hierarchy device;
- equal visual weight for every taxonomy field;
- gratuitous icons or animations;
- assigning every module a saturated category color.

Typography and information hierarchy remain stable while visual-identity work is underway. Color should clarify the established information system rather than replace it.

## 9. CSS composition

`src/styles/information-design.css` is the canonical entry point for R1 reader-information layers. It composes the focused R1 styles while the established global/editorial/theme/brand/responsive layers continue to provide base behavior.

New information-design work should extend semantic primitives or page roles through this system rather than adding another unrelated override layer. A future cleanup may simplify legacy base rules, but correctness and regression safety take priority over rewriting working CSS for aesthetic purity.

## 10. Validation

Reader-interface changes should continue to pass:

```bash
npm test
npm run build
npm run test:browser
```

The browser suite protects critical responsive/accessibility behavior plus the R1 task-first viewport and semantic-hierarchy contracts. Visual review remains necessary for aesthetics, bilingual typography, unusual long titles, information density, and chromatic hierarchy that cannot be reduced to automated assertions.

## 11. R1.1 information budgets and edge cases

Canonical prose remains the factual source; reader surfaces may derive shorter presentation excerpts when a full canonical summary would overwhelm the job of that surface.

- Do not add parallel factual fields such as `timeline_summary` or `mobile_summary` merely to solve density problems.
- Timeline / collection records may use a deterministic presentation excerpt derived from the canonical `summary`.
- Event Detail may use a somewhat longer lead excerpt, but when condensation occurs the complete canonical `summary` must remain visibly available in the Event reading flow.
- Search & Explore may visually clamp summary text for scanning while retaining the canonical text in semantic HTML and the canonical Event Detail page.
- Presentation excerpting should prefer complete sentences; if no reasonable sentence boundary exists, cut at a safe word or punctuation boundary and mark the omission with an ellipsis.
- The implementation budgets are intentionally language-aware rather than assuming English and Simplified Chinese consume equal horizontal space.
- Mobile regression coverage must include both `en` and `zh-CN` plus at least one maintained long-title / long-summary edge-case Event. Do not satisfy the task-first budget by weakening the viewport threshold.
- Mobile breadcrumbs should not repeat a full long Event title immediately before the H1, and primary in-page navigation should expose its options without relying on undiscoverable horizontal scrolling.

These are presentation rules only. They do not change canonical Event prose, search indexing of Event Detail pages, Event IDs, or the editorial meaning of `summary`.

## 12. R1.2A semantic color architecture

Color is a reader-interface semantic system, not a derivative of the current logo artwork. The existing logo remains an editable brand asset and does not define the constitutional palette.

### Surface roles

The light and dark themes expose the same semantic hierarchy:

- **Canvas** — the outer archival workspace;
- **Paper** — the clearest reading / control surface;
- **Neutral context** — structured interface material without a domain-specific meaning;
- **Research context** — retrieval, links, sources, and research-oriented emphasis;
- **Archive context** — chronology and historical-context emphasis;
- **Milestone context** — historical-significance emphasis;
- **Evidence context** — inspectable evidence / provenance emphasis.

Canvas and Paper must remain visibly distinguishable in both light and dark modes. Context surfaces should be quieter than status colors and should never turn the archive into a set of saturated dashboard cards.

### Accent roles

- **Research blue** is the primary interaction / retrieval accent.
- **Milestone violet** represents historical-significance emphasis, especially H1 presentation.
- **Archive gold** is reserved for chronology / historical editorial meaning; it is not the warning color.
- **Evidence green** is available for evidence / provenance meaning; it is distinct from verification-state semantics.
- **Status good / warning / danger** remain separate state colors and must not be inferred from the editorial accents above.

Legacy variables such as `--bg`, `--surface`, `--accent`, and `--h1` are compatibility aliases only. New color work should use the semantic tokens defined in `src/styles/r1-color-system.css`.

R1.2A establishes the palette architecture and global tonal separation only. Page/module-specific chromatic hierarchy and mathematical editorial ornament belong to later controlled work; they must not be smuggled into this foundation pass.

---

R1 is a focused reader-experience refinement inside v0.1.x maintenance. It does not authorize a new feature family, backend, knowledge graph, or autonomous change to the Product Specification.
