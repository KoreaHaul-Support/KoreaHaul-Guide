// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkCjkFriendly from 'remark-cjk-friendly';
import rehypeTableLabels from './src/plugins/rehype-table-labels.mjs';
import rehypeLocaleLinks from './src/plugins/rehype-locale-links.mjs';
import rehypeLocalCurrency from './src/plugins/rehype-local-currency.mjs';
import { SIDEBAR } from './src/i18n/ui.ts';

// Sidebar group label plus its translations (see src/i18n/ui.ts)
const tr = (label) => ({ label, translations: SIDEBAR[label] ?? {} });

// Cloudflare Web Analytics.
// Leave empty if Cloudflare's automatic setup is on for guides.koreahaul.com.
// If Cloudflare shows a JS snippet instead, paste the token from it here
// (Web Analytics > guides.koreahaul.com > Manage site).
const CF_ANALYTICS_TOKEN = '';

export default defineConfig({
  // Live domain: used for the sitemap and canonical URLs
  site: 'https://guides.koreahaul.com',
  markdown: {
    // Bold/italic next to Japanese and Chinese punctuation, e.g. **課税価格（関税評価額）**は
    remarkPlugins: [remarkCjkFriendly],
    rehypePlugins: [rehypeTableLabels, rehypeLocaleLinks, rehypeLocalCurrency],
  },
  integrations: [
    starlight({
      title: 'KoreaHaul Guide',
      description: 'How KoreaHaul works: buying, receiving and shipping Korean products worldwide.',
      // English stays at the root (/fees/), translations get a prefix (/es/fees/).
      // Rules for translators: tools/i18n/STYLE.md
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        es: { label: 'Español', lang: 'es' },
        'pt-br': { label: 'Português', lang: 'pt-BR' },
        fr: { label: 'Français', lang: 'fr' },
        de: { label: 'Deutsch', lang: 'de' },
        ja: { label: '日本語', lang: 'ja' },
        'zh-cn': { label: '简体中文', lang: 'zh-CN' },
      },
      lastUpdated: true,
      // Help-center layout: no "On this page" column, no Previous/Next buttons
      tableOfContents: false,
      pagination: false,
      favicon: '/favicon.ico',
      head: [
        { tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' } },
        { tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon-48.png' } },
        { tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icon-192.png' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' } },
        ...(CF_ANALYTICS_TOKEN
          ? [
              {
                tag: 'script',
                attrs: {
                  defer: true,
                  src: 'https://static.cloudflareinsights.com/beacon.min.js',
                  'data-cf-beacon': JSON.stringify({ token: CF_ANALYTICS_TOKEN }),
                },
              },
            ]
          : []),
      ],
      // Shown as text links in the header (see src/components/SocialIcons.astro)
      social: [{ icon: 'email', label: 'Contact us', href: 'mailto:support@koreahaul.com' }],
      customCss: [
        '@fontsource-variable/inter',
        '@fontsource-variable/fraunces/opsz.css',
        './src/styles/custom.css',
      ],
      components: {
        Footer: './src/components/Footer.astro',
        Hero: './src/components/Hero.astro',
        PageTitle: './src/components/PageTitle.astro',
        SocialIcons: './src/components/SocialIcons.astro',
      },
      expressiveCode: {
        defaultProps: { wrap: true },
      },
      sidebar: [
        { ...tr('Home'), slug: 'index' },
        {
          ...tr('News & Updates'), collapsed: true,
          items: [
          { slug: 'news/koreahaul-launch-giveaway' },
          { slug: 'news/chuseok-holiday-schedule' },
          { slug: 'news/currency-and-pricing-update' },
          { slug: 'news/cpsc-efiling-for-us-shipments' },
          { slug: 'news/customs-handling-fee-ranges-updated' },
          { slug: 'news/unboxing-media-free-for-receive-for-me' },
          ],
        },
        {
          ...tr('Getting Started & Services'), collapsed: true,
          items: [
          { slug: 'getting-started' },
          { slug: 'getting-started/buy-for-me' },
          { slug: 'getting-started/setting-purchase-rules' },
          { slug: 'getting-started/receive-for-me' },
          { slug: 'getting-started/warehouse' },
          { slug: 'getting-started/ship-for-me' },
          { slug: 'getting-started/fees' },
          { slug: 'getting-started/payment-methods' },
          ],
        },
        {
          ...tr('International Shipping Tips'), collapsed: true,
          items: [
          { slug: 'shipping/carriers-and-rates' },
          { slug: 'shipping/duty-and-tax-calculation' },
          {
            ...tr('Country Guide'), collapsed: true,
            items: [
            { ...tr('Overview'), slug: 'country-guide' },
            {
            ...tr('Asia'), collapsed: true,
            items: [
            { slug: 'country-guide/japan' },
            { slug: 'country-guide/china' },
            { slug: 'country-guide/hong-kong' },
            { slug: 'country-guide/taiwan' },
            { slug: 'country-guide/singapore' },
            { slug: 'country-guide/philippines' },
            { slug: 'country-guide/malaysia' },
            { slug: 'country-guide/indonesia' },
            { slug: 'country-guide/thailand' },
            { slug: 'country-guide/vietnam' },
            { slug: 'country-guide/india' },
            ],
          },
            {
            ...tr('Oceania'), collapsed: true,
            items: [
            { slug: 'country-guide/australia' },
            { slug: 'country-guide/new-zealand' },
            ],
          },
            {
            ...tr('North America'), collapsed: true,
            items: [
            { slug: 'country-guide/united-states' },
            { slug: 'country-guide/canada' },
            { slug: 'country-guide/mexico' },
            ],
          },
            {
            ...tr('South America'), collapsed: true,
            items: [
            { slug: 'country-guide/brazil' },
            { slug: 'country-guide/chile' },
            { slug: 'country-guide/argentina' },
            { slug: 'country-guide/colombia' },
            { slug: 'country-guide/peru' },
            ],
          },
            {
            ...tr('Europe'), collapsed: true,
            items: [
            { slug: 'country-guide/european-union' },
            { slug: 'country-guide/united-kingdom' },
            { slug: 'country-guide/switzerland' },
            { slug: 'country-guide/norway' },
            ],
          },
            ],
          },
          { slug: 'shipping/hs-codes-for-common-items' },
          { slug: 'shipping/insurance-and-claims' },
          ],
        },
        {
          ...tr('Shopping Tips'), collapsed: true,
          items: [
          { slug: 'shopping-tips/how-to-spend-less-on-shipping' },
          { slug: 'shopping-tips/price-comparison' },
          { slug: 'shopping-tips/naver-smart-stores-and-other-shops' },
          { slug: 'shopping-tips/shop-from-popular-stores' },
          {
            ...tr('Stores'), collapsed: true,
            items: [
            { slug: 'shopping-tips/stores/bunjang' },
            { slug: 'shopping-tips/stores/kream' },
            { slug: 'shopping-tips/stores/soldout' },
            { slug: 'shopping-tips/stores/daangn' },
            { slug: 'shopping-tips/stores/olive-young' },
            { slug: 'shopping-tips/stores/coupang' },
            { slug: 'shopping-tips/stores/naver-smart-stores' },
            { slug: 'shopping-tips/stores/weverse-shop' },
            { slug: 'shopping-tips/stores/yg-select' },
            { slug: 'shopping-tips/stores/fans-shop' },
            { slug: 'shopping-tips/stores/smtown-and-store' },
            { slug: 'shopping-tips/stores/yes24' },
            { slug: 'shopping-tips/stores/aladin' },
            ],
          },
          { slug: 'shopping-tips/secondhand-and-resale-platforms' },
          { slug: 'shopping-tips/pre-order-presale-and-group-order' },
          { slug: 'shopping-tips/pop-up-and-concert-merchandise' },
          ],
        },
        {
          ...tr('What to Buy'), collapsed: true,
          items: [
          { slug: 'what-to-buy/k-beauty' },
          { slug: 'what-to-buy/k-fashion' },
          { slug: 'what-to-buy/k-pop-md' },
          { slug: 'what-to-buy/k-snack' },
          { slug: 'what-to-buy/books-and-magazines' },
          { slug: 'what-to-buy/pokemon-and-collectibles' },
          { slug: 'what-to-buy/lego' },
          { slug: 'what-to-buy/car-parts' },
          { slug: 'what-to-buy/daiso' },
          { slug: 'what-to-buy/electronics' },
          { slug: 'what-to-buy/starbucks' },
          ],
        },
      ],
    }),
  ],
});
