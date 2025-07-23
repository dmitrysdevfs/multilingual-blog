import Link from 'next/link';
import { getPosts, getPost } from '@/lib/api';
import styles from './page.module.css';

// Генеруємо статичні параметри для всіх постів під час білду
export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

// Генеруємо метадані для SEO
export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await getPost(id);

  return {
    title: post.title,
    description: post.body.substring(0, 160) + '...',
  };
}

export default async function PostPage({ params }) {
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
}
