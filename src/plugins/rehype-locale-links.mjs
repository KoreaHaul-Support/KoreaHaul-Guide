// On translated pages (src/content/docs/<locale>/...), point internal links to the
// same language: /getting-started/fees/ becomes /es/getting-started/fees/.
// Translators keep the English links, this plugin adds the prefix at build time.
const LOCALES = ['es', 'ja', 'zh-cn', 'pt-br', 'fr', 'de'];
const RE = new RegExp(`[\\\\/]content[\\\\/]docs[\\\\/](${LOCALES.join('|')})[\\\\/]`);

function needsPrefix(href) {
  return (
    typeof href === 'string' &&
    href.startsWith('/') &&
    !href.startsWith('//') &&
    !LOCALES.some((l) => href === `/${l}` || href.startsWith(`/${l}/`)) &&
    !/\.[a-z0-9]{2,5}($|[?#])/i.test(href)
  );
}

function walk(node, locale) {
  if (node.type === 'element' && node.tagName === 'a' && needsPrefix(node.properties?.href)) {
    node.properties.href = `/${locale}${node.properties.href}`;
  }
  // HTML blocks written straight into the Markdown (home cards, topic lists, chips)
  if (node.type === 'raw' && typeof node.value === 'string') {
    node.value = node.value.replace(/href="([^"]*)"/g, (m, href) =>
      needsPrefix(href) ? `href="/${locale}${href}"` : m
    );
  }
  for (const c of node.children || []) walk(c, locale);
}

export default function rehypeLocaleLinks() {
  return (tree, file) => {
    const path = file.path || file.history?.[0] || '';
    const m = path.match(RE);
    if (m) walk(tree, m[1]);
  };
}
