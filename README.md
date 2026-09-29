# KoreaHaul Guide (v1.2)

Astro Starlight site built from the Notion page "KoreaHaul Guide Version 1.2" (source of truth).
75 pages: home, News, Getting Started & Services, International Shipping Tips (with 25 country guides),
Shopping Tips (with 13 store pages), What to Buy.

## Run locally

    npm install
    npm run dev        # http://localhost:4321
    npm run build      # static site in dist/

## Deploy on Cloudflare Pages

1. Push this folder to a GitHub repo.
2. Cloudflare dashboard > Workers & Pages > Create > Pages > Connect to Git > pick the repo.
3. Build settings:
   - Framework preset: Astro
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable: `NODE_VERSION` = `22`
4. Deploy. Add your custom domain under the project's Custom domains tab.
5. Then set `site` in `astro.config.mjs` to that domain (for sitemap and canonical URLs).

## Where things are

- Pages: `src/content/docs/**.md` (one file per Notion page)
- Sidebar order and groups: `astro.config.mjs`
- "Ready to start?" block shown under every page (except home): `src/components/Footer.astro`
- Responsive styles: `src/styles/custom.css`
  - Tables become stacked cards on phones (under 640px), normal tables on tablet and desktop.
- Table labels for the phone cards: `src/plugins/rehype-table-labels.mjs` (runs automatically)
- Favicon: `public/favicon.ico` plus PNG sizes (32, 48, 192) and `apple-touch-icon.png` (180), made from the KoreaHaul K logo.

## To do by hand

- `src/content/docs/shopping-tips/price-comparison.md` has an `<!-- IMAGE -->` comment where the
  Enuri screenshot goes. Download it from Notion, save as `src/assets/enuri-result.png`, and replace
  the comment with the line shown inside it.

## Notion to Markdown

- Callouts become Starlight asides: yellow = caution, blue/gray = note, green/purple = tip.
  A bold lead-in ending in ":", "?" or "!" becomes the aside title.
- Links between guide pages point to the site paths, not Notion.
- Each page's `lastUpdated` is Notion's last-edited date.

## Updating from Notion

Notion ("KoreaHaul Guide Version 1.2") is the source of truth. The converter lives in `tools/notion-sync/`:

- `raw/` - a copy of each Notion page (one file per page)
- `tree.json` - page list: title, site path, sidebar order, Notion page ID
- `convert.py` - turns `raw/` into `src/content/docs/`, and builds the home page and `/topics/` section pages

After a Notion edit: update the matching file in `raw/`, run `python3 tools/notion-sync/convert.py`, commit, push.
Do not edit files in `src/content/docs/` by hand - the next conversion overwrites them.
