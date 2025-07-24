// Підтримувані локалі
export const locales = ['uk', 'en'];

// Локаль за замовчуванням
export const defaultLocale = 'uk';

/**
 * Перевіряє, чи є локаль підтримуваною
 */
export function isValidLocale(locale) {
  return locales.includes(locale);
}

/**
 * Отримує локаль з URL або повертає локаль за замовчуванням
 */
export function getLocaleFromPathname(pathname) {
  const segments = pathname.split('/');
  const locale = segments[1];
  return isValidLocale(locale) ? locale : defaultLocale;
}

/**
 * Створює URL для конкретної локалі
 */
export function createLocalizedUrl(pathname, locale) {
  const segments = pathname.split('/');

  if (isValidLocale(segments[1])) {
    segments[1] = locale;
  } else {
    segments.splice(1, 0, locale);
  }

  return segments.join('/');
}

/**
 * Отримує альтернативну локаль
 */
export function getAlternateLocale(currentLocale) {
  return currentLocale === 'uk' ? 'en' : 'uk';
}

/**
 * Отримує локаль з параметрів Next.js
 */
export async function getLocaleFromParams(params) {
  const awaitedParams = await params;
  const locale = awaitedParams?.locale;
  return isValidLocale(locale) ? locale : defaultLocale;
}
