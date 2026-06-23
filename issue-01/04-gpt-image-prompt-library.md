# PAS — GPT Image Prompt Library & Visual System

This is the single source of truth for generating PAS imagery with
GPT-image / DALL·E-class models. Two rules make everything cohere:

1. **Generate text-free.** Image models render lettering badly. Every PAS prompt
   asks for **clean negative space**; the masthead, headlines, captions and
   handles are added afterward in InDesign / Figma / Canva.
2. **Always lead with the HOUSE STYLE block.** It carries the brand DNA so every
   image — cover, feature, Story — looks like the same magazine.

---

## ⭐ THE HOUSE STYLE BLOCK (paste this first, every time)

> **[HOUSE STYLE]** Editorial photography for *PAS*, a premium Macedonian
> football magazine. Cinematic, high-contrast, emotionally honest. Color palette:
> deep football red (#D7141A), warm sun-gold (#F2B705), near-black charcoal
> (#16181D) and off-white paper (#F4F1EA). Moody directional lighting with a warm
> rim and one hard key light; rich shadows; subtle film grain; shallow depth of
> field; 35–85mm lens feel. Dignified, premium, grounded — never cartoonish,
> never glossy stock. Composition leaves deliberate clean negative space for
> typography. **Absolutely no text, no letters, no numbers, no logos, no
> watermarks, no recognizable real club crests or brand marks.**

Append after the block: aspect ratio + the specific scene. Example tail:
`Vertical 4:5 portrait composition. <scene>.`

---

## Brand visual identity (for the designer)

| Element | Spec |
|---|---|
| **Masthead** | `PAS` / `ПАС` — heavy condensed grotesque (e.g. Druk, Anton, or a custom cut), all caps, set in red on light or off-white on dark. |
| **Display type** | Condensed bold sans for headlines; supports Cyrillic + Latin. |
| **Body type** | Humanist serif for longform (e.g. Lora/Source Serif), clean sans for captions/decks. |
| **Primary red** | `#D7141A` (flag red) |
| **Gold** | `#F2B705` (the eight-pointed sun) |
| **Charcoal** | `#16181D` |
| **Paper / off-white** | `#F4F1EA` |
| **Motif** | The 16-ray / eight-pointed sun used subtly — embosses, dividers, end-marks. Never overused. |
| **Grid** | 12-column, generous outer margins, strong baseline grid. |
| **Tone** | Documentary > studio gloss. Real texture, real emotion. |

---

## Reusable prompt templates (fill the brackets)

### 1) Hero portrait (player/manager)
> [HOUSE STYLE] + Vertical 4:5 editorial portrait of a [age] [player/manager] in
> a plain [red/neutral] football [jersey/coat], shot from a [slightly low / eye]
> angle against a textured charcoal backdrop, one hard key light from the
> [left/right] and a soft red rim, [determined/contemplative] expression, eyes
> [to camera / off-camera]. Three-quarter framing, generous negative space
> [top / one side] for text. No text, no logos, no numbers.

### 2) Match emotion (joy or defeat)
> [HOUSE STYLE] + Cinematic [wide/vertical] image of a footballer in plain red
> [celebrating arms-wide / crouched head-bowed], blurred [crowd/stadium] behind,
> [warm joyful / cold melancholic] floodlight grade, freeze-frame emotion, space
> for a headline. No text, no logos, no numbers.

### 3) Stadium / place atmosphere
> [HOUSE STYLE] + [Wide/vertical] atmospheric photograph of [a small Balkan
> stadium below mountains / an empty floodlit pitch / a players' tunnel], [time
> of day] light, [hopeful / reverent / melancholic] mood, strong leading lines,
> negative space [top/bottom] for type. No people in focus, no text, no logos.

### 4) Terrace / crowd (anonymous)
> [HOUSE STYLE] + Wide atmospheric crowd photo in red and gold, raised scarves,
> warm smoke haze, faces blurred for anonymity, euphoric collective energy,
> cinematic grain, darker band [bottom] for text. No readable text, no banners
> with letters, no logos.

### 5) Flat-lay / still life
> [HOUSE STYLE] + Top-down flat-lay of [objects: boots, scarf, ball, calendar,
> food, magazines] on [charcoal / rustic wood / off-white paper], soft [daylight
> / lamp] light, editorial [product / lifestyle / food] photography, clean space
> for [headline / list / grid]. No text, no logos.

### 6) Vintage / archive treatment (history pieces)
> [HOUSE STYLE] + Nostalgic [decade]-style grainy sports photograph of [subject],
> faded warm film tones, period blur behind, heroic low angle, like a treasured
> old magazine page, space for a headline. No text, no logos, no numbers.

### 7) Abstract / decorative (data, dividers, quote cards)
> [HOUSE STYLE] + Abstract [passing-network arcs / sunburst emboss / floodlight
> bokeh] in red and gold over a [charcoal / deep-red] field, restrained and
> elegant, large empty area for [a stat / a pull-quote]. No text, no numbers, no
> logos.

---

## Aspect-ratio cheat sheet
| Use | Ratio | Pixels (≥) |
|---|---|---|
| Print cover / full page | 230×300mm @300dpi | ~2717×3543 + bleed |
| IG feed (portrait) | 4:5 | 1080×1350 |
| IG/Story/Reel | 9:16 | 1080×1920 |
| Web hero | 16:9 | 1920×1080 |
| Square fallback | 1:1 | 1080×1080 |

> When the model can't hit print resolution, generate the largest available, then
> upscale (e.g. Topaz/Real-ESRGAN) before placing in InDesign.

## Quality / consistency checklist (per image)
- [ ] House-style block pasted first.
- [ ] Aspect ratio + negative-space instruction included.
- [ ] "No text / no logos / no numbers" present.
- [ ] Palette reads red + gold + charcoal + off-white.
- [ ] Mood matches the section (hope vs. melancholy vs. celebration).
- [ ] Faces kept anonymous/soft where the brief requires (avoids deepfake/likeness
      issues — never imitate a specific real, identifiable person).
- [ ] Final lettering added in layout, not generated.

## Ethics & disclosure
- AI images are for **covers, illustrative plates, decorative and social** use.
  **Reportage and the photo essay must be real, commissioned photography.**
- **Never generate the likeness of a specific real, named individual.** Use
  generic, anonymous figures; brief real subjects for real shoots.
- **Disclose AI-generated imagery** in the magazine's imprint/credits.
