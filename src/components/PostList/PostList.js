import Link from 'next/link';
import styles from './PostList.module.css';

export default function PostList({ posts }) {
  return (
    <div className={styles.postsGrid}>
      {posts.map((post) => (
        <article key={post.id} className={styles.postCard}>
          <h2 className={styles.postTitle}>{post.title}</h2>
          <Link href={`/posts/${post.id}`} className={styles.readMoreButton}>
            Читати далі
          </Link>
        </article>
      ))}
    </div>
  );
}
