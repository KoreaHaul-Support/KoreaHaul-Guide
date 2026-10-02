# Translation rules for the KoreaHaul Guide

English pages in `src/content/docs/` (built from Notion) are the source.
Translations live in `src/content/docs/<locale>/` with the same path.

Locales: `es` Spanish, `ja` Japanese, `zh-cn` Chinese (Simplified),
`pt-br` Portuguese (Brazil), `fr` French, `de` German.

## Keep exactly as in English
- Markdown and HTML structure: every tag, class name, attribute, `<details>`,
  `<div class="kh-...">`, table layout, blank lines around HTML blocks.
- URLs and link targets. Internal links stay like `/getting-started/fees/`;
  the site adds the language prefix automatically.
- All numbers, prices, currencies, dates, weights, sizes, percentages
  (₩2,000, USD 155, EUR 150, 45 days, 10 kg, 12%).
- Email addresses, codes and IDs (KF2331, BF, RF, SF, RT, HS codes).
- Brand and service names: KoreaHaul, Buy For Me, Receive For Me, Ship For Me,
  Postbox code (may add a short translation in brackets the first time),
  Store Credit, Basic Proxy / Standard Proxy / Premium Proxy.
- Site name "KoreaHaul Guide".
- Names customers see on koreahaul.com, which is in English: option names
  (Inclusions Basic, Inclusions Premium, Extra Protection, Vacuum Packing,
  Optimized Pack, Remove Original Box, Priority Pack, Package Split,
  Adult Signature Required, Shipping Insurance), shipping service names
  (International Standard Shipping, Standard Shipping), and invoice labels
  (Additional Charge). Write the English name first. In a table or heading you
  may add a short translation in brackets after it, e.g.
  "Optimized Pack (最適化梱包)". Translate the explanation around them.
- Store, platform and carrier names: Naver, Coupang, Kream, Bunjang, Olive Young,
  Weverse Shop, FedEx International Connect Plus, EMS, Korea Post, PayPal, Wise, etc.
- Trade terms DDP, DAP, DDU, IOSS, VAT, GST, HS code, CPSC (keep the English
  abbreviation; translate the explanation around it).
- Frontmatter keys and non-text values (`lastUpdated`, `template`, `sidebar`,
  `order`, `link`, `variant`). Translate only `title`, `description`,
  `hero.title`, `hero.tagline`, and `actions[].text`.

## Style
- Plain, friendly help-center tone. Short sentences. Address the reader directly
  (es: tú, pt-br: você, fr: vous, de: Sie, ja: です/ます, zh-cn: 您).
- Never use em dashes (—) or Chinese double dashes (——). Use a hyphen, colon,
  comma or brackets instead.
- Natural local wording, not word-for-word. Keep the meaning and every rule exact.
- Korean words already romanised in English (Chuseok, Daangn) stay as they are.
- Keep `**bold**` and `*italic*` on the same phrases.
- Dates may use the local format (2026年12月31日, 31. Dezember 2026,
  31 de diciembre de 2026). The date itself never changes.
- Keep numbers as written in English (₩1,000, 2%), even where local style differs.
- When text names another page without a link ("see Payment Methods"), use that
  page's translated title from `tools/i18n/titles/<locale>.json` when it exists.
