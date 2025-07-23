/**
 * Завантажує словник для конкретної мови
 * @param {string} locale - Код мови (uk, en)
 * @returns {Promise<Object>} Об'єкт з перекладами
 */
export async function getDictionary(locale) {
  try {
    const dictionary = await import(`../dictionaries/${locale}.json`);
    return dictionary.default;
  } catch (error) {
    console.error(`Error loading dictionary for locale ${locale}:`, error);
    // Fallback до української мови
    const fallbackDictionary = await import(`../dictionaries/uk.json`);
    return fallbackDictionary.default;
  }
}
