# КафанЧе — website

A single-page site for **КафанЧе** — «едно ново симпатично лабаво кафанЧЕ» in Debar
Maalo, Skopje. One self-contained `index.html` plus a folder of photographs: no build
step, no dependencies, no tracking.

**Live:** https://growthradical.github.io/agencysite/kafanche/

---

## The design

**Ex-Yu retro, modern minimalist.** The reference is not a mood board — it is the
venue's own printed menu card: cream stock, cornflower display caps, orange-red dish
headings, typed descriptions, a punched ticket edge, a circular date stamp and a rubber
stamp reading *КАФАНЧЕ · СКОПЈЕ · 2023 · ЛАДНО ПИВО*. The site is that card, scaled to a
page, laid over the olive gingham of their tablecloths.

Restraint does the rest: hairline rules instead of heavy borders, one accent colour,
generous space, and photography carrying the weight. The retro devices — ticket
perforation, rubber stamp, typed menu lists — are the one place boldness is spent.

| | |
|---|---|
| **Stock** | `#F2ECDE` cream (light) · `#1B1A17` (dark) |
| **Accent** | `#E0552F` orange-red — their menu headings and stamps |
| **Secondary** | `#8FB3DD` cornflower — their display caps |
| **Cloth** | `#878A57` olive — the gingham, taken from their photographs |
| **Display** | Unbounded 800/900 |
| **Text** | Onest 300/400 |
| **Menu + labels** | JetBrains Mono — the typed feel of their printed card |

Light-first; the dark theme moves to a warm near-black. All three typefaces carry
Cyrillic, which «КафанЧе» requires.

## Content

Everything on the page comes from the venue: the tagline and the «Бројче» phone label
from their bio, the dishes from their printed **ЛЕТНО МЕНИ (08/06)**, the four standing
menus (monthly, dish of the day, breakfast, Lenten) from their posting rhythm, and the
map pin from their own Google listing.

The summer menu is labelled with its date on purpose — it is shown as an example of what
one of their boards looks like, not as the current one, which lives on Instagram.

## Photography

Six slots, all wired. Drop the files into [`assets/`](assets/) using the filenames in
[`assets/README.md`](assets/README.md) — the page picks them up with no other change.

Until then, each slot carries a **typographic panel** drawn from the venue's own printed
material rather than a "missing image" box: the dish name and description from the summer
board, the *КАФАНЧЕ · СКОПЈЕ · 2023* rubber stamp, the `08/06` date stamp, the wordmark,
and «ладно пиво». On olive gingham, the grid reads as a poster wall — which is close
enough to how their feed actually looks that it stands on its own. A photograph simply
replaces its panel.

The photographs are still the point, though. This holds the page together; it does not
finish it.

## Location

Pinned by the venue's own Google Maps embed — place id `0x13541564c2a84a27`, at
**42.0007324, 21.4268435**, which puts it in Debar Maalo, Centar. Those coordinates are
in the JSON-LD as a `geo` block.

**No street address is stated**, deliberately. Their feed carries a «СЕ СЕЛИМЕ … НОВА
ЛОКАЦИЈА» post and the «Каде сме?» highlight is a 38A house tile, which matches neither
street number in the public directories. The map pin is the source of truth until the
venue confirms. Opening hours are handled the same way — «провери на Инстаграм» rather
than times that could send someone to a closed door.

## Build notes

- **Bilingual MK/EN** — Macedonian default, toggle in the nav, choice kept in
  `localStorage`. Every string lives in `data-mk` / `data-en` on the element.
- **`Restaurant` JSON-LD** — name, phone, locality, `geo`, `hasMap`, socials. No
  `streetAddress`, no `openingHoursSpecification`; see above.
- **The map** is injected at runtime, not hard-coded into the markup, because it needs
  three conditions to be worth showing: the page must be top-level (Google refuses to be
  framed, and a framed preview would paint an empty box over the locator diagram),
  Google must be reachable (a blocked embed still fires `load` and paints an opaque error
  page — so a tiny image probes first), and the section must be near the viewport. That
  last one means no third-party request fires for a visitor who never scrolls to the map,
  which matters for an EU venue.
- Respects `prefers-reduced-motion`, keyboard-focusable throughout, no horizontal scroll
  at 390px.

## Still needed from the venue

- [ ] **Photographs** — see `assets/README.md`
- [ ] **The real logo** — the badge here is a typographic stand-in; theirs is a custom
      ligature. Replace `.badge` in the nav and footer.
- [ ] **Street address** — then add it to the visit section and to `streetAddress`
- [ ] **Opening hours** — then replace the «провери на Инстаграм» line and add
      `openingHoursSpecification`
- [ ] **Current menu** — the board on the page is the summer one, dated 08/06

## Editing

Everything is in `index.html`. Copy lives in `data-mk` / `data-en` attribute pairs on
each element — edit both. Colour and type live in the `:root` token block; the dark
theme repeats the same token names in two places (a `prefers-color-scheme` query and a
`[data-theme]` rule), so change both.

## License

Code is free to reuse. The КафанЧе name, marks, photographs and copy belong to the venue.
