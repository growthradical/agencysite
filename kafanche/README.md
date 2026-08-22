# КафанЧе — one-page site

A single-page website for **КафанЧе (KafanCHE)**, a small kafana at Orce Nikolov 139 in
central Skopje. One self-contained `index.html` — no build step, no dependencies, no
tracking. Drop it on any static host.

**Live:** https://growthradical.github.io/agencysite/kafanche/

---

## The idea

A *kafana* is the old Balkan tavern: you eat slowly, drink slower, and stay longer than
planned. *Kafanche* is the diminutive — the small, young one. The whole design sits on
that tension between old room and young kitchen.

Two decisions drive the page:

**The structure is one day, not a feature list.** Kafanche is open 08:00–00:00 and the
menu is written each morning from whatever the market had. So the spine of the page is
`Утро → Попладне → Вечер → Доцна`, and the page reads the clock in `Europe/Skopje` and
highlights the band you are actually in right now, with an open/closed state in the
hero. Ordering the sections `01 / 02 / 03` would have been decoration; the day is real
information.

**The menu is a frame, not a fixed list.** Because the board genuinely rotates, the menu
section describes categories and points at Instagram for today's board rather than
publishing prices that go stale. See *Before launch* below.

## Design system

| | |
|---|---|
| **Ground** | `#180F12` wine-black (dark) · `#DCDFD1` enamel plaster (light) |
| **Text** | `#F3E9DB` bone · `#1E1418` ink |
| **Accent** | `#E24A2B` paprika (ajvar) |
| **Support** | `#A9BF74` pistachio · `#C4923F` brass |
| **Display** | Alegreya Sans 900 — signage, set uppercase and tight |
| **Text** | Alegreya — the tavern's voice, italic for statements |
| **Data** | JetBrains Mono — hours, phone, the board |

Dark-first: a kafana is a night room, so `:root` carries the dark palette and the light
theme is the override. All three typefaces carry full Cyrillic, which is non-negotiable
for «КафанЧе».

## What's in the build

- **Bilingual MK/EN** — defaults to Macedonian, toggle in the nav, choice remembered in
  `localStorage`. Every string lives in `data-mk` / `data-en` attributes on the element.
- **Live open/closed state** computed in `Europe/Skopje`, not the visitor's timezone.
- **Macedonian dates spelled out in JS** rather than left to `Intl` — not every browser
  build ships the `mk` locale, and the date sits in the hero where a silent fallback to
  English would be obvious.
- **`Restaurant` JSON-LD** for local search: address, phone, hours, cuisine, socials.
- **No photography.** The illustrations, the folk diamond band and the street sketch are
  inline SVG. When real photos are available they belong in the hero and the evenings
  section — see *Before launch*.
- Respects `prefers-reduced-motion`, keyboard-focusable throughout, no horizontal scroll
  at 390px.

## Editing

Everything is in `index.html`.

- **Copy** — each translated element carries `data-mk` and `data-en`. Edit both; the
  visible text should match `data-mk` since Macedonian is the default.
- **Menu** — the four cards under `<section id="meni">`. Each row is
  `row__name` / `row__lead` (the dotted leader) / `row__note`.
- **Hours** — `OPEN_HOUR` and `CLOSE_HOUR` at the top of the script, the `data-from` /
  `data-to` attributes on each `.slot`, the visit section, and the JSON-LD block.
- **Colour and type** — the `:root` token block. The light theme repeats the same token
  names in two places (a `prefers-color-scheme` query and a `[data-theme]` rule); change
  both.

## Before launch

The site is built; these items need the venue's sign-off, since they came from public
directories rather than from Kafanche:

- [ ] **Address** — `Orce Nikolov 139, 1000 Skopje`, per two directory listings. One
      other listing gives a different street, so confirm before this goes live.
- [ ] **Hours** — published as `every day 08:00–00:00`. Sources only firmly cover
      Tue–Fri, and one lists a 01:00 close. Confirm the real week, including the closing
      day if there is one, then update the four places listed under *Editing*.
- [ ] **Phone** — `+389 77 548 838`, consistent across listings.
- [ ] **Menu rows** — currently descriptive categories, deliberately unpriced. Replace
      with the real board, or leave as-is and let Instagram carry the daily detail.
- [ ] **Photography** — swap in real interior and food shots.
- [ ] **Wolt link** — points at the existing delivery listing; verify it is current.

Nothing on the page invents a review, a rating, an award, or a price beyond the
`800–1000 MKD` per-person range that appears in the public listings.

## License

Code is free to reuse. The КафанЧе name, wordmark and copy belong to the venue.
