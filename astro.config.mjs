// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import rehypeTableLabels from './src/plugins/rehype-table-labels.mjs';

export default defineConfig({
  // Set this to your live domain so the sitemap and canonical URLs are correct,
  // e.g. 'https://guide.koreahaul.com'
  // site: 'https://guide.koreahaul.com',
  markdown: {
    rehypePlugins: [rehypeTableLabels],
  },
  integrations: [
    starlight({
      title: 'KoreaHaul Guide',
      description: 'How KoreaHaul works: buying, receiving and shipping Korean products worldwide.',
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
        { label: 'Home', link: '/' },
        {
          label: 'News & Updates', collapsed: true,
          items: [
          { slug: 'news/chuseok-holiday-schedule' },
          { slug: 'news/currency-and-pricing-update' },
          { slug: 'news/cpsc-efiling-for-us-shipments' },
          { slug: 'news/customs-handling-fee-ranges-updated' },
          { slug: 'news/unboxing-media-free-for-receive-for-me' },
          ],
        },
        {
          label: 'Getting Started & Services', collapsed: true,
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
          label: 'International Shipping Tips', collapsed: true,
          items: [
          { slug: 'shipping/carriers-and-rates' },
          { slug: 'shipping/duty-and-tax-calculation' },
          {
            label: 'Country Guide', collapsed: true,
            items: [
            { label: 'Overview', slug: 'country-guide' },
            {
            label: 'Asia', collapsed: true,
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
            label: 'Oceania', collapsed: true,
            items: [
            { slug: 'country-guide/australia' },
            { slug: 'country-guide/new-zealand' },
            ],
          },
            {
            label: 'North America', collapsed: true,
            items: [
            { slug: 'country-guide/united-states' },
            { slug: 'country-guide/canada' },
            { slug: 'country-guide/mexico' },
            ],
          },
            {
            label: 'South America', collapsed: true,
            items: [
            { slug: 'country-guide/brazil' },
            { slug: 'country-guide/chile' },
            { slug: 'country-guide/argentina' },
            { slug: 'country-guide/colombia' },
            { slug: 'country-guide/peru' },
            ],
          },
            {
            label: 'Europe', collapsed: true,
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
          label: 'Shopping Tips', collapsed: true,
          items: [
          { slug: 'shopping-tips/how-to-spend-less-on-shipping' },
          { slug: 'shopping-tips/price-comparison' },
          { slug: 'shopping-tips/naver-smart-stores-and-other-shops' },
          { slug: 'shopping-tips/shop-from-popular-stores' },
          {
            label: 'Stores', collapsed: true,
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
          label: 'What to Buy', collapsed: true,
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
