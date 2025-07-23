import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.errorCode}>404</div>

          <h1 className={styles.title}>Сторінку не знайдено</h1>

          <p className={styles.description}>
            Вибачте, але сторінка, яку ви шукаєте, не існує або була переміщена.
          </p>

          <div className={styles.actions}>
            <Link href="/" className={styles.primaryButton}>
              Повернутися на головну
            </Link>

            <Link href="/about" className={styles.secondaryButton}>
              Про нас
            </Link>
          </div>

          <div className={styles.helpText}>
            <p>Можливо, ви шукали:</p>
            <ul className={styles.suggestions}>
              <li>
                <Link href="/" className={styles.suggestionLink}>
                  Головна сторінка
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.suggestionLink}>
                  Сторінка &quot;Про нас&quot;
                </Link>
              </li>
              <li>
                <Link href="/posts/1" className={styles.suggestionLink}>
                  Приклад посту
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
