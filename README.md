# Jugoslavija — Sweden 1992 · Commemorative Sticker Album

A 3-page print-ready sticker album for the Yugoslavia team that qualified for
Euro 92, travelled to Sweden, and was banned ten days before kickoff:

- **Page 1** — Players I (9 sticker slots)
- **Page 2** — Players II (9 sticker slots)
- **Page 3** — Storyline ("The Team That Never Played")

Lives at `jugoslavija-1992/` so it gets its own URL on GitHub Pages:
`https://growthradical.github.io/agencysite/jugoslavija-1992/`

## How to use

1. **Add your sticker scans** to `jugoslavija-1992/assets/` using the exact
   filenames listed in [`jugoslavija-1992/assets/README.md`](jugoslavija-1992/assets/README.md).
   Missing images show as labelled placeholders, so the album always prints cleanly.
2. **Adjust the roster** if needed: edit the `PAGE1` / `PAGE2` arrays at the top
   of [`jugoslavija-1992/index.html`](jugoslavija-1992/index.html) (names, numbers, filenames).
3. **Open `jugoslavija-1992/index.html`** in any browser to preview.

## Export the print-ready PDF

### Option A — browser (no install, recommended)
Open `jugoslavija-1992/index.html`, press **Cmd/Ctrl + P**, choose **Save as
PDF**, set paper to **A4** and margins to **None/Default**. You get a clean
3-page PDF.

### Option B — one command (needs Node + internet to fetch Puppeteer once)
```bash
npm install            # installs puppeteer
npm run pdf            # writes album.pdf
```

## Layout / design
- A4 portrait, retro album styling: orange page, Yugoslavia-blue header band,
  tricolour flag tab, gold trim, cream sticker frames with number chips.
- 3×3 sticker grid per player page (5:7 portrait stickers).

## A note on sources
The artwork is from the **Panini / Decje Novine "UEFA Euro Sweden 1992"** set
and is © Panini. This project is assembled as a **personal commemorative
album**. If you ever publish it publicly, recreate the sticker frames in the
retro style rather than reusing Panini's scans, to stay clear of their rights.
