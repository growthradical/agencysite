# КафанЧе — one-page site

A single-page website for **КафанЧе** — «едно ново симпатично лабаво кафанЧЕ» in Skopje.
One self-contained `index.html`: no build step, no dependencies, no tracking.

**Live:** https://growthradical.github.io/agencysite/kafanche/

---

## Where the brand came from

Everything visual and most of the copy is taken from the venue's own Instagram
([@kafanche](https://www.instagram.com/kafanche)) — the coral badge, the cream poster
stock, the cornflower blue of the summer-menu poster, the navy type, and the gingham
tablecloth that runs through half their grid. The tagline and the phone label («Бројче»)
are their own words, lifted verbatim from their bio.

This is a real identity applied, not an invented one. The one thing still missing is the
actual logo file — see *Before launch*.

## Design system

| | |
|---|---|
| **Ground** | `#F7F0E4` cream (light) · `#17203A` navy (dark) |
| **Primary** | `#EE7A45` coral — the badge colour |
| **Secondary** | `#86A9DA` cornflower · `#C8281C` stamp red · `#7A1F2E` burgundy |
| **Type** | `#1E2B47` navy ink |
| **Display** | Unbounded 800/900 — geometric constructed Cyrillic, closest to their lettering |
| **Text** | Onest |
| **Data** | JetBrains Mono — the typed-list feel of their menu posters |

Light-first: their world is printed paper, not a dark room. The dark theme moves to a
navy ground and lifts the coral for contrast. All three typefaces carry Cyrillic, which
«КафанЧе» requires.

The gingham is a two-axis `repeating-linear-gradient` on `.gingham`, so it inherits the
theme and costs nothing to load.

## Structure

The page follows the venue's real posting rhythm rather than a generic restaurant
template. Their feed is organised around a monthly menu, a dish of the day, a breakfast
menu and an Orthodox fasting menu — so those are the four menu cards. Themed evenings
(Грчка вечер, takeovers, feast days) get their own band, and the yard gets one, because
their summer menu is written for it.

## What's in the build

- **Bilingual MK/EN** — Macedonian default, toggle in the nav, choice kept in
  `localStorage`. Every string lives in `data-mk` / `data-en` on the element.
- **`Restaurant` JSON-LD** — name, phone, locality, `hasMap`, socials. Deliberately **no
  `streetAddress` and no opening hours**; see below.
- **A map in two layers** — a drawn locator, with a Google embed injected over it. It is
  geocoded from the venue's own Maps pin, only injected top-level (Google refuses to be
  framed, so a framed preview would paint an empty box over the locator), and only after
  a reachability probe succeeds — a blocked embed still fires `load` and paints an opaque
  error page. Lazy, and deferred until the section nears the viewport, so no third-party
  request fires unless a visitor actually scrolls to the map.
- **No photography.** Every graphic — badge, house-number tile, yard scene, locator — is
  inline SVG.
- Respects `prefers-reduced-motion`, keyboard-focusable throughout, no horizontal scroll
  at 390px.

## The address problem — read this first

**The site deliberately does not state a street address.** Two things from their own feed
say the previously-published one is stale:

- a post reading «СЕ СЕЛИМЕ … НОВА ЛОКАЦИЈА» (*we are moving … new location*)
- the «Каде сме?» highlight cover is a **38A** house-number tile, which matches neither
  of the two conflicting street numbers in public directories

So the page shows the 38A tile, points at the venue's own Google Maps pin as the source
of truth, and says nothing it cannot stand behind. Opening hours are handled the same
way — the page says «провери на Инстаграм» rather than publishing times that could send
someone to a closed door.

Both are one-line fixes once the venue confirms. The hours block is in the visit section;
the map query is `MAP_QUERY` in the script.

## Before launch

- [ ] **Street address** — confirm with the venue, then add it to the visit section and
      to `streetAddress` in the JSON-LD.
- [ ] **Opening hours** — confirm, then replace the «провери на Инстаграм» line and add
      an `openingHoursSpecification` block.
- [ ] **The real logo** — the coral badge here is a typographic stand-in («КЧ» set in
      Unbounded). Their actual mark is a custom ligature; drop in the SVG and replace
      both `.badge` in the nav/footer and the hero `svg`.
- [ ] **Photography** — the feed has plenty. The hero and the yard section are where it
      belongs.
- [ ] **Menu detail** — the four cards describe the menu *system*, not dishes. If they
      want dishes and prices on the site rather than on Instagram, they go here.

Nothing on the page invents a review, rating, award, price, coordinate, or address.

## Editing

Everything is in `index.html`.

- **Copy** — each translated element carries `data-mk` and `data-en`. Edit both; the
  visible text should match `data-mk` since Macedonian is the default.
- **Colour and type** — the `:root` token block. The dark theme repeats the same token
  names in two places (a `prefers-color-scheme` query and a `[data-theme]` rule); change
  both.

## License

Code is free to reuse. The КафанЧе name, marks and copy belong to the venue.
