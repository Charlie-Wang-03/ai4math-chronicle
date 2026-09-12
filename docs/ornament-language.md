# AI4Math Chronicle — Signature Mathematical Ornament Language

**Status:** Owner-approved R1.2C-A implementation contract  
**Established:** 2026-09-12  
**Scope:** Decorative and identity-bearing visual ornament for reader-facing surfaces inside the active v0.1.x design system

This document defines the controlled visual-signature language for AI4Math Chronicle. It extends the active [`information-design.md`](./information-design.md) contract; it does not amend the Product Specification, canonical Event model, editorial methodology, typography architecture, semantic color meanings, or governance protocol.

The purpose of ornament is narrow:

> **Make AI4Math Chronicle recognizably AI × Mathematics × Scholarly Archive without competing with chronology, evidence, verification, or reading tasks.**

Ornament is an **identity layer**, not an information layer. If a decorative element is necessary to understand a claim, status, relationship, navigation action, or evidence state, it is no longer ornament and must use the site's normal semantic UI system instead.

---

## 1. Design principles

### 1.1 Structural, not illustrative

Prefer abstract mathematical structure over literal illustration. The signature language should feel derived from mathematical diagrams, proof structure, archival annotation, and historical relationships rather than from stock imagery or AI-generated scenes.

### 1.2 Quiet but recognizable

A reader should notice the site's identity within a few seconds, but the ornament should recede once reading begins. Typography, chronology, evidence, and canonical content remain visually dominant.

### 1.3 Sparse rather than dense

Use a few deliberate nodes, lines, arcs, marks, or annotations. Do not create dense neural-network backgrounds, equation wallpaper, or decorative complexity that increases cognitive load.

### 1.4 Systemic rather than page-specific

The same visual grammar should recur at different strengths across Home, Timeline, Standards & Methodology, About, and selected empty/transition states. Avoid one-off hero artwork that cannot become a coherent site language.

### 1.5 Static by default

Ornament is static unless a later owner-approved implementation demonstrates that motion materially improves comprehension without reducing accessibility or scan efficiency. R1.2C-A does not authorize decorative animation.

---

## 2. Motif inventory

R1.2C uses one primary motif family and two supporting families.

### 2.1 Primary motif — Chronicle Graph

**Visual vocabulary:**

- thin chronological spines;
- filled and hollow nodes;
- short branches and joins;
- sparse dependency-like edges;
- small clusters with clear negative space.

**Conceptual associations:**

- historical chronology;
- research lineage;
- proof / dependency structure;
- multi-step AI or agent workflows;
- evidence relationships.

**Rules:**

- It must remain abstract and editorial, not resemble a network-monitoring dashboard.
- Do not render dense neural-network meshes, force-directed graphs, or knowledge graphs.
- Main spines should read as deliberate structure; branches should be few and short.
- Nodes may borrow restrained semantic accent colors, but they must not imply Event status unless they are part of the actual Timeline UI.

The Chronicle Graph is the strongest candidate for a durable AI4Math Chronicle signature because it naturally connects chronology, mathematical structure, and computational reasoning.

### 2.2 Supporting motif — Mathematical Construction Geometry

**Visual vocabulary:**

- circles and partial arcs;
- tangents / secants;
- intersections;
- sparse coordinate traces;
- construction lines;
- point sets;
- simple affine or geometric scaffolds.

**Rules:**

- Geometry should remain diagrammatic and abstract rather than decorative illustration.
- Prefer strokes and points over filled shapes.
- Do not use random formula wallpaper (`∫`, `Σ`, `π`, `∀`, matrices, source code, binary strings) as a shortcut for “mathematics.”
- Do not depict a specific theorem, equation, or proof unless the graphic becomes real explanatory content rather than ornament.

This motif supplies mathematical identity without competing with the Chronicle Graph as the primary brand structure.

### 2.3 Supporting motif — Scholarly Marginalia

**Visual vocabulary:**

- compact ordinals;
- citation-like ticks;
- small brackets or rule marks;
- margin annotations;
- tiny node labels;
- archival section marks;
- understated reference numerals.

**Rules:**

- Marginalia should resemble scholarly annotation, not iconography.
- It should reinforce the sense of an edited archive and research publication.
- It must not introduce pseudo-data, fake citations, or labels that readers could mistake for canonical metadata.

---

## 3. Ornament strength levels

The same motif family may appear at different strengths. Strength is defined by perceptual prominence, not a single fixed opacity value.

| Level | Name | Intended use | Rule |
| --- | --- | --- | --- |
| **O0** | None | Dense reading / retrieval areas | No decorative ornament |
| **O1** | Ambient | Background identity | Very low contrast, sparse, visually ignorable |
| **O2** | Structural accent | Section / transition identity | Small or edge-aligned ornament that reinforces hierarchy |
| **O3** | Signature | Hero / project identity surfaces | Clearly recognizable motif, still subordinate to heading / task |

### O0 — None

Use where reading, comparison, evidence inspection, or data density is the primary task.

Typical surfaces:

- Event Detail prose body;
- Primary Evidence citation lists;
- Evidence & status structures;
- Search & Explore result records;
- dense filter controls.

### O1 — Ambient

Use as quiet background or peripheral identity. It should disappear perceptually once the reader focuses on content.

Typical uses:

- broad hero background geometry;
- very light Timeline-header traces;
- secondary background marks in About / Methodology.

### O2 — Structural accent

Use at section boundaries or empty states where the ornament can reinforce page identity without becoming a hero.

Typical uses:

- compact Chronicle Graph fragment near a section heading;
- small construction geometry near a reference overview;
- restrained marginalia at a divider or no-results state.

### O3 — Signature

Reserved for identity surfaces with enough negative space.

Typical uses:

- Home hero;
- potentially a future dedicated project/brand surface.

O3 must not be used repeatedly down a page. Mobile may reduce an O3 treatment to O1 or remove it entirely.

---

## 4. Surface usage matrix

| Surface | Allowed motif | Maximum strength | Notes |
| --- | --- | --- | --- |
| **Home hero** | Chronicle Graph + Construction Geometry | **O3** | Primary signature anchor; keep title/CTA area clean |
| **Timeline header / chronology introduction** | Chronicle Graph | **O2** | Reinforce historical structure; do not decorate every Event |
| **Timeline Event records** | None beyond existing semantic Timeline UI | **O0** | Significance gradients / dots are semantic UI, not ornament |
| **Search & Explore active retrieval UI** | None | **O0** | Search and comparison remain utility-first |
| **Search & Explore empty / no-result state** | Construction Geometry or Marginalia | **O2** | Small static aid only |
| **Event Detail header** | Chronicle Graph or Marginalia | **O1** | Optional and peripheral; never push insight below task-first budget |
| **Event Detail main reading body** | None by default | **O0** | Existing section rules remain primary structure |
| **Standards & Methodology top** | Marginalia + Construction Geometry | **O2** | Reference-oriented rather than hero-like |
| **About top** | Chronicle Graph + Marginalia | **O2** | Project identity / orientation surface |
| **Data & Feeds** | Marginalia only | **O1** | Utility surface stays restrained |
| **Footer** | Chronicle Graph fragment or Marginalia | **O1** | Optional signature echo, not a second hero |

This matrix is the default. A later implementation may use less ornament than the maximum; exceeding the maximum requires an explicit visual rationale and review.

---

## 5. Color behavior

Ornament consumes the existing semantic color architecture; it does not create a parallel palette.

Preferred sources:

- `--research` / `--research-soft` for computational / retrieval traces;
- `--milestone` / `--milestone-soft` for a small number of signature nodes;
- `--archive` / `--archive-soft` for chronology / archival traces;
- neutral rule / ink tokens for most structural lines.

`--evidence` may be used sparingly only when the ornament visually echoes provenance or citation structure. It must not turn decorative marks into apparent evidence-status signals.

### Color guardrails

- Ornament must never reuse `status-good`, `status-warn`, or `status-danger` as decorative colors.
- Archive Gold remains historical/editorial, not warning.
- Evidence Green remains evidence/provenance-oriented, not “verified.”
- Decorative nodes must not look like the real Timeline significance dots unless they are spatially and contextually separated from the Timeline component.
- Most ornament strokes should remain neutral or low-chroma; semantic accents are sparse highlights.

---

## 6. Asset and implementation strategy

R1.2C-A defines strategy only; it does **not** create production ornament assets or page implementations.

For later implementation waves:

1. Prefer **SVG + CSS**, not raster artwork.
2. Prefer reusable Astro ornament components or a small shared SVG primitive set rather than copied inline artwork per page.
3. Use semantic CSS custom properties instead of hard-coded theme-specific colors where practical.
4. Keep path / node count modest and markup inspectable.
5. Avoid SVG filters, glow, blur-heavy effects, WebGL, canvas rendering, particle systems, or third-party animation libraries.
6. Decorative SVG must be non-interactive and normally use `aria-hidden="true"` and `focusable="false"`.
7. Ornament must not introduce semantic text that duplicates or contradicts canonical page content.
8. Respect the GitHub Pages base path when any external SVG asset is introduced.
9. No ornament asset may require a backend, remote rendering service, or runtime API.

### Proposed component boundary for later waves

A future implementation may use a small namespace such as:

```text
src/components/ornament/
├── ChronicleGraph.astro
├── ConstructionGeometry.astro
└── MarginaliaMark.astro
```

This is a recommended boundary, not an R1.2C-A requirement. Do not create components merely to satisfy the document before an actual surface implementation needs them.

---

## 7. Responsive and accessibility behavior

### Mobile

- Ornament must never displace the primary task from the R1 task-first viewport budget.
- O3 desktop treatments normally reduce to O1 or disappear on compact layouts.
- Do not introduce horizontal overflow or require panning to see decorative graphics.
- Crop / hide peripheral ornament rather than shrinking core text to preserve artwork.

### Dark theme

- Re-evaluate ornament contrast independently in dark mode; do not simply invert light artwork.
- Dark ornament should remain quiet and must not become luminous / neon.

### Accessibility

- Decoration is not a carrier of semantic meaning.
- Decorative SVG is hidden from assistive technology.
- High-contrast / forced-color environments may suppress ornament without loss of information or navigation.
- No flashing, looping motion, or motion-triggered comprehension dependency is permitted by default.

---

## 8. Explicitly prohibited visual shortcuts

Do not use the following as the Chronicle's signature language by default:

- robot heads, brains, humanoid AI mascots;
- glowing neural networks;
- dense node clouds;
- cyberpunk grids;
- neon purple/blue glow;
- stock circuit-board imagery;
- code rain / binary strings;
- random equations or mathematical-symbol wallpaper;
- 3D abstract blobs;
- glassmorphism;
- decorative particle animation;
- pseudo-scientific diagrams that appear to encode data but do not.

The visual identity should feel **mathematically structured and editorially authored**, not generically “AI-themed.”

---

## 9. Future implementation sequence

R1.2C-A ends with this language definition. Later implementation remains separated into controlled waves:

### R1.2C-B — Identity anchor surfaces

First implementation targets:

1. Home hero;
2. Standards & Methodology top;
3. About top.

These provide the highest identity benefit with low interference in dense reading tasks.

### R1.2C-C — Structural accents

Only after B passes visual review, consider:

- Timeline heading / chronology introduction;
- Search & Explore empty state;
- selected section transitions / marginalia;
- a restrained footer echo.

### R1.2C-D — Visual QA and stabilization

Review the final system across:

- light / dark;
- English / Simplified Chinese;
- desktop / mobile;
- Home / Timeline / Search & Explore / Event Detail / Methodology / About.

Do not expand ornament into dense reading surfaces merely to make usage more uniform.

---

## 10. Acceptance criteria for later ornament implementation

A future R1.2C implementation is acceptable only if all of the following remain true:

1. **Identity:** the site is more recognizably AI4Math-specific rather than a generic scholarly template.
2. **Restraint:** headings, chronology, evidence, and prose remain more prominent than ornament.
3. **Coherence:** recurring motifs are visibly part of one system across multiple surfaces.
4. **Task safety:** R1 / R1.1 mobile viewport and information-density contracts remain intact.
5. **Semantic safety:** ornament never replaces status labels, evidence semantics, Timeline meaning, or navigation cues.
6. **Theme safety:** light and dark implementations are both intentional and non-neon.
7. **Bilingual safety:** ornament does not depend on English-only text or Latin-specific composition.
8. **Maintainability:** the implementation remains static, reusable, small, and inspectable.
9. **Accessibility:** decorative graphics can disappear without any loss of meaning or functionality.
10. **Visual QA:** screenshots are reviewed by a human before broad rollout because aesthetic success cannot be established by DOM assertions alone.

---

## 11. R1.2C-A completion boundary

R1.2C-A is complete when this language is documented and discoverable from the repository's active information-design contract.

It intentionally does **not**:

- redesign the logo;
- create production ornament SVGs;
- add ornament components;
- change page CSS;
- alter Timeline / Event Detail layouts;
- change typography or semantic color roles;
- authorize a new product phase.

Those are separate implementation or owner-decision boundaries.