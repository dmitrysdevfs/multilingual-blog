'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './error.module.css';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Логуємо помилку для відладки
    console.error('Error boundary caught an error:', error);
  }, [error]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.errorIcon}>⚠️</div>

          <h1 className={styles.title}>Щось пішло не так</h1>

          <p className={styles.description}>
            Вибачте, сталася неочікувана помилка. Спробуйте оновити сторінку або
            повернутися на головну.
          </p>

          <div className={styles.errorDetails}>
            <details className={styles.details}>
              <summary className={styles.summary}>Деталі помилки</summary>
              <pre className={styles.errorMessage}>
                {error.message || 'Невідома помилка'}
              </pre>
            </details>
          </div>

          <div className={styles.actions}>
            <button onClick={reset} className={styles.primaryButton}>
              Спробувати знову
            </button>

            <Link href="/" className={styles.secondaryButton}>
              Повернутися на головну
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
