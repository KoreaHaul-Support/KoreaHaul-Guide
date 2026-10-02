// On translated pages, add a local-currency estimate after every KRW amount:
// "₩2,000" becomes "₩2,000 (≈ 1,32 €)". Rates and currencies: src/i18n/rates.json
// Skipped: ₩0, headings (keeps anchor links stable), code, and amounts that
// already have a bracket after them or sit inside another currency's bracket,
// like "USD 200 (about KRW 270,000)".
import { bracket } from '../i18n/money.mjs';

const LOCALES = ['es', 'ja', 'zh-cn', 'pt-br', 'fr', 'de'];
const PATH_RE = new RegExp(`[\\\\/]content[\\\\/]docs[\\\\/](${LOCALES.join('|')})[\\\\/]`);
const AMOUNT = /(₩\s?|KRW\s?)(\d{1,3}(?:,\d{3})+|\d+)(?!\d|,\d)/g;
const SKIP_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code', 'pre', 'script', 'style']);
const FOREIGN_OPEN = /(?:USD|EUR|US\$|\$|€|¥|JPY|CNY|GBP|AUD|CAD)\s?[\d,.]+\s*[(（][^)）]*$/;

function convertText(text, locale) {
  return text.replace(AMOUNT, (m, cur, num, offset, whole) => {
    const krw = Number(num.replace(/,/g, ''));
    if (!krw) return m;
    const after = whole.slice(offset + m.length);
    if (/^\s?[(（]/.test(after)) return m;
    const before = whole.slice(Math.max(0, offset - 40), offset);
    if (FOREIGN_OPEN.test(before)) return m;
    return m + bracket(krw, locale);
  });
}

function convertRaw(html, locale) {
  // Only touch text between tags, never attributes.
  return html
    .split(/(<[^>]+>)/)
    .map((part) => (part.startsWith('<') ? part : convertText(part, locale)))
    .join('');
}

function walk(node, locale) {
  if (node.type === 'element' && SKIP_TAGS.has(node.tagName)) return;
  if (node.type === 'text') node.value = convertText(node.value, locale);
  else if (node.type === 'raw') node.value = convertRaw(node.value, locale);
  for (const c of node.children || []) walk(c, locale);
}

export default function rehypeLocalCurrency() {
  return (tree, file) => {
    const m = (file.path || file.history?.[0] || '').match(PATH_RE);
    if (m) walk(tree, m[1]);
  };
}
