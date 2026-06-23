# ПАС · Број 01 — designed magazine

Two ways to view Issue 01, both fully in **Macedonian Cyrillic**:

- **`flipbook.html` — a 3D page-flip magazine with real photographs.** Open it and
  drag the page corners to turn pages (StPageFlip). Photos are real images from
  **Wikimedia Commons (CC)** — Elmas, Pandev, Alioski, the Pančev Golden Boot, the
  Skopje arena, a Vardar European-night crowd, club logos — loaded live in the
  browser, with designed fallback art if any image is unavailable.
- **`index.html`** — a flat, print-style mockup (one page per screen) with custom
  vector artwork; good for Print → Save as PDF.

## View the 3D magazine online (no download)
If the repository is **public**, open the live render:

> **https://raw.githack.com/growthradical/agencysite/claude/pas-magazine-first-issue-noswj3/magazine/flipbook.html**

(That service renders the HTML straight from this branch.) If the repo is
**private**, the link won't load — instead download `magazine/flipbook.html` and
open it locally, or enable GitHub Pages for the branch.

---

## index.html — the flat mockup

## How to review it
- **Open `magazine/index.html` in any web browser** (double-click, or drag into a
  tab). No build step, no server needed.
- **To get a PDF:** in the browser choose **Print → Save as PDF**. The CSS sets a
  230 × 300 mm page size with one magazine page per sheet.

## What's inside (9 pages)
1. **Cover** — *ПОВТОРНО ШАМПИОНИ* (Vardar, Champions Again) with trophy + sun art
2. **Содржина** (Contents)
3. **Уводник** (Editor's letter)
4–5. **Кралот се врати** — the Vardar cover story (opening + text/data)
6. **Бумот** — the boom feature with a growth chart
7. **Збогум, легендо** — the Vasil Ringov (1955–2025) tribute
8. **На терен** — local match reports + a goal-map
9. **Заден капак** (Back cover)

## About the imagery
All visuals are **original vector artwork (SVG)** drawn in code — the cover scene,
the Macedonian 16-ray sun motif, confetti, the data chart, the tribute frame and
the goal-map. They stand in for **commissioned photography**: in production these
panels are replaced with real photos (and licensed archival images for the
Ringov/Pančev pages — never AI likenesses of real people). Photographs can't be
generated in this environment, so the layout uses designed art as faithful
placeholders.

## Note on facts
Figures marked with `*` (attendances, title number, etc.) are **illustrative for
the mockup** and must be verified before publication — see
[`../issue-01/02-topic-list-july-2026.md`](../issue-01/02-topic-list-july-2026.md).
