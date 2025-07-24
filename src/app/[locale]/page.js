import { getPosts } from '@/lib/api';
import { getDictionary } from '@/lib/getDictionary';
import PostList from '@/components/PostList/PostList';
import styles from './page.module.css';

export default async function Home({ params }) {
  const { locale } = await params;

  // Отримуємо переклади для поточної мови
  const dict = await getDictionary(locale);

  // Отримуємо пости на сервері (Server Component)
  const posts = await getPosts();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>{dict.home.title}</h1>
        <p className={styles.description}>{dict.home.description}</p>

        <PostList posts={posts} locale={locale} dict={dict} />
      </main>
    </div>
  );
}
