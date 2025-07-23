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
      // Різні обробки для різних статусів
      if (response.status === 404) {
        throw new Error('Posts list not found');
      } else if (response.status >= 500) {
        throw new Error('API server error');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

/**
 * Отримує один пост за ID
 * @param {number} id - ID поста
 * @returns {Promise<Object>} Об'єкт поста
 */
export async function getPost(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      // Спеціальна обробка для 404 - пост не існує
      if (response.status === 404) {
        const notFoundError = new Error(`Post with ID ${id} not found`);
        notFoundError.name = 'NotFoundError';
        notFoundError.status = 404;
        throw notFoundError;
      } else if (response.status >= 500) {
        throw new Error('API server error');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    throw error;
  }
}
