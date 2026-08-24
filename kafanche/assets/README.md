# Photography

The venue's photographs, cropped from their own Instagram posts. Each `<img>` in
`../index.html` points at one of these filenames, and every slot falls back to an olive
gingham panel if its file goes missing — so a broken image never shows.

| File | Where it appears | Subject |
|---|---|---|
| `hero.jpg` | Full-bleed hero | Two spritz glasses and the peach salad on the checked cloth |
| `salad-peach.jpg` | Atmosphere, large | Tomato, peach, basil and cheese in the metal bowl |
| `interior.jpg` | Atmosphere | The book-page wall and the gilt mirror |
| `spritz.jpg` | Atmosphere, square | A laid table — glasses, carafe and carnation against the bare wall |
| `menu-card.jpg` | Atmosphere, square | The printed ЛЕТНО МЕНИ card |
| `salad-strawberry.jpg` | Atmosphere, square | Tomato, strawberry and cheese salad with a glass of wine |

Guidance for replacements:

- **Format** — `.jpg` for photographs. If you prefer `.webp`, change the `src`
  attributes to match; nothing else needs touching.
- **Shape** — the gallery renders every slot square, and the hero 16:10 on desktop,
  4:5 on phones. Supply squares for the five gallery slots and something close to 16:10
  for the hero.
- **Size** — the current files are cropped straight from the source posts, so they run
  560–1050px on the long edge. Larger originals would sharpen the grid noticeably;
  roughly 1600px is plenty. Keep each file under ~400KB. The hero is the only one that
  loads eagerly, the rest are lazy.
- **Crop** — the grid crops with `object-fit: cover`, so keep the subject away from the
  extreme edges.
- **Alt text** — written in Macedonian on each `<img>`. If a photo is swapped for a
  different subject, update its `alt` to match.

## Where these came from

All six are cropped from screenshots of the venue's own Instagram, so they carry that
ceiling: the source frames are around 1100px wide before cropping, and the interior
shot is a video still, which is why it is the softest of the set. Originals from the
venue would be a straight upgrade — same crops, more resolution.
