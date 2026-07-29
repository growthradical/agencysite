# Extra Fungi — Brand Website

A modern, multi-page website for **Extra Fungi**, the family-owned wild-mushroom
company from Kočani, North Macedonia (founded 1988).

Palette: **Bosnia & Herzegovina** blue + gold with **Canada** red, on white.

## Live
`https://growthradical.github.io/agencysite/extrafungi/`

## Structure
- `index.html`, `about.html`, `products.html`, `recipes.html`, `blog.html`, `press.html`, `contact.html`
- Product detail pages: `product-porcini.html`, `product-chanterelle.html`, `product-saffron-milk-cap.html`, `product-st-georges.html`, `product-morel.html`, `product-produce.html`
- Blog posts: `blog-porcini-risotto.html`, `blog-beef-wellington.html`, `blog-caesar-salad.html`, `blog-kocani-forests.html`, `blog-grading-porcini.html`, `blog-cold-chain.html`, `blog-extra-food.html`
- `styles.css` — shared design system
- `script.js` — injects the shared header/footer and runs interactions
- `build.mjs` — static generator; run `node build.mjs` to regenerate all HTML

## Editing
Edit content in `build.mjs` (data arrays + page templates) and re-run
`node build.mjs`. Header/footer/nav live once in `script.js`. Contact email and
street address are placeholders pending verified details.
