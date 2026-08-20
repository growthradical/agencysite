# Research Board

Six publishable research ideas, each traced back to real diagnostic fieldwork,
with a target reader and a per-channel campaign plan attached.

Live: `https://growthradical.github.io/agencysite/research-board/`
(served once this branch is merged to `main`, or once the branch is added to
`.github/workflows/pages.yml`).

## The six

| # | Paper | Thesis in one line | Status |
|---|-------|--------------------|--------|
| 01 | The Citation Paradox | AI citation share and organic traffic are decoupled | Ready to run |
| 02 | Four Ways to Lose | A decline is four separable failures, separable from public data | Method drafted |
| 03 | Green Grid, Quiet Phone | Geo-grid saturates and stops predicting revenue | Needs partner data |
| 04 | One Draw From a Distribution | Every AI-visibility number is one sample reported as a fact | Cheapest, fastest |
| 05 | Structure Beats Authority | Coverage completeness beats domain authority in entity categories | Needs multi-category sample |
| 06 | The Provenance Gap | AI-assisted analysis fails review on evidence chain, not correctness | Essay-ready now |

## Ground rules baked into the board

- **No client, employer, or prospect is named** — here or in any paper produced from this.
  Field observations appear as category descriptions only.
- **No paper depends on data supplied under an engagement.** Every published dataset is
  re-collected from public sources on a fresh sample. Internal assets inform study
  *design* and are never published as evidence.
- **Figures on the board are schematics of the hypothesis, not measured results.**
  They show the shape each study would test. Each is captioned as such.

## Editing

`index.html` is one self-contained file with no dependencies or build step.
All content lives in two arrays near the top of the `<script>` block:

- `PAPERS[]` — one object per idea. Fields: `title`, `sub`, `thesis`, `hook`,
  `badges`, `field`, `question`, `method[]`, `reader{}`, `message{}`,
  `channels[]`, `sources[]`, `fig`.
- `LIBRARY[]` — the source library rendered at the foot of the page.

Add or reorder papers by editing `PAPERS`; the board re-renders itself. To add a
new schematic, add a branch to `fig(kind, accentColor)` and set `fig:"yourkind"`
on the paper.

`sources` entries are `[label, url]`. Pass `null` as the url to render it as an
internal, unlinked asset.

Per-idea status (Backlog → Published) is stored in the reader's `localStorage`,
so it is a personal working state, not shared or committed.

## Suggested order

Ship **06** first — it needs no data collection and buys attention while **04**
and **01** are being run. **04** is the infrastructure paper both **01** and
**05** depend on for their sampling protocol, so run it before either.
