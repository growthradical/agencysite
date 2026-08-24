# Photography

Drop the venue's photographs in here using these exact filenames. Each `<img>` in
`../index.html` points at one of them, and every slot falls back to an olive gingham
panel until its file exists — so a missing photo never shows a broken image.

| File | Where it appears | Suggested shot |
|---|---|---|
| `hero.jpg` | Full-bleed hero, 16:10 | The two spritz glasses and the salad on the checked cloth |
| `salad-peach.jpg` | Atmosphere, large 4:3 | Tomato, peach, basil and cheese in the metal bowl |
| `interior.jpg` | Atmosphere, 4:3 | The book-page wall and the gilt mirror |
| `spritz.jpg` | Atmosphere, square | Spritz glasses, overhead, on the gingham |
| `menu-card.jpg` | Atmosphere, square | The printed ЛЕТНО МЕНИ card |
| `salad-strawberry.jpg` | Atmosphere, square | Tomato, strawberry and cheese salad with a glass of wine |

Guidance:

- **Format** — `.jpg` for photographs. If you prefer `.webp`, change the `src`
  attributes to match; nothing else needs touching.
- **Size** — roughly 1600px on the long edge is plenty. Keep each file under ~400KB;
  the hero is the only one that loads eagerly, the rest are lazy.
- **Crop** — the grid crops with `object-fit: cover`, so keep the subject away from the
  extreme edges. The hero goes 16:10 on desktop and 4:5 on phones, so leave headroom.
- **Alt text** — already written in Macedonian on each `<img>`. If a photo is swapped
  for a different subject, update its `alt` to match.
