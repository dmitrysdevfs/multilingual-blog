import { getPosts } from '@/lib/api';
import PostList from '@/components/PostList/PostList';
import styles from './page.module.css';

export default async function Home() {
  // Отримуємо пости на сервері (Server Component)
  const posts = await getPosts();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Блог</h1>
        <p className={styles.description}>Всі пости з JSONPlaceholder API</p>

        <PostList posts={posts} />
      </main>
    </div>
  );
}
