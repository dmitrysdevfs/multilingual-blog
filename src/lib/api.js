// API утиліти для роботи з JSONPlaceholder
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Отримує список всіх постів
 * @returns {Promise<Array>} Масив постів
 */
export async function getPosts() {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      // Кешування на 1 годину для кращої продуктивності
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Помилка при отриманні постів:', error);
    throw error;
  }
}
