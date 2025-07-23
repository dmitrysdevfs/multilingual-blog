import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPosts, getPost } from '@/lib/api';
import styles from './page.module.css';

// Генеруємо статичні параметри для всіх постів під час білду (SSG)
export async function generateStaticParams() {
  try {
    const posts = await getPosts();

    return posts.map((post) => ({
      id: post.id.toString(),
    }));
  } catch (error) {
    console.error('Build-time error in generateStaticParams:', error);
    // Повертаємо порожній масив, щоб не зламати білд
    // Це демонструє розуміння різниці між SSG та SSR
    return [];
  }
}

// Генеруємо метадані для SEO (SSR при кожному запиті)
export async function generateMetadata({ params }) {
  try {
    const { id } = await params;
    const post = await getPost(id);

    return {
      title: post.title,
      description: post.body.substring(0, 160) + '...',
    };
  } catch (error) {
    // Якщо пост не знайдено, використовуємо загальні метадані
    if (error.name === 'NotFoundError') {
      return {
        title: 'Post not found',
        description: 'The requested post does not exist',
      };
    }
    throw error; // Передаємо інші помилки далі
  }
}

// Основна компонента (SSR при кожному запиті)
export default async function PostPage({ params }) {
  try {
    const { id } = await params;
    const post = await getPost(id);

    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <Link href="/" className={styles.backLink}>
            ← Назад до списку
          </Link>

          <article className={styles.post}>
            <header className={styles.postHeader}>
              <h1 className={styles.postTitle}>{post.title}</h1>
              <div className={styles.postMeta}>
                <span className={styles.postId}>Пост #{post.id}</span>
              </div>
            </header>

            <div className={styles.postContent}>
              <p className={styles.postBody}>{post.body}</p>
            </div>
          </article>
        </main>
      </div>
    );
  } catch (error) {
    // Якщо пост не знайдено, показуємо сторінку 404
    if (error.name === 'NotFoundError') {
      notFound();
    }
    // Інші помилки передаємо в Error Boundary
    throw error;
  }
}
