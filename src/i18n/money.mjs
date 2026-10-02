// Shared by the build plugin and the page note: turn a KRW amount into a
// local-currency estimate, e.g. 2000 -> "≈ 1,32 €". Rates: src/i18n/rates.json
import rates from './rates.json' with { type: 'json' };

export { rates };

export function localCurrency(locale) {
  return rates.locales[locale];
}

/** Format a KRW amount in the locale's currency (no prefix). */
export function formatLocal(krw, locale) {
  const cfg = rates.locales[locale];
  if (!cfg) return '';
  const value = krw * rates.perKRW[cfg.currency];
  const digits = cfg.currency === 'JPY' || value >= 100 ? 0 : 2;
  return new Intl.NumberFormat(cfg.format, {
    style: 'currency',
    currency: cfg.currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

/** The bracket text added after an amount, in the locale's style. */
export function bracket(krw, locale) {
  const v = formatLocal(krw, locale);
  if (locale === 'ja') return `（約${v}）`;
  if (locale === 'zh-cn') return `（约 ${v}）`;
  return ` (≈ ${v})`;
}
