'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './error.module.css';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Логуємо помилку для відладки
    console.error('Error boundary caught an error:', error);
  }, [error]);

  // Визначаємо тип помилки для більш специфічного повідомлення
  const getErrorMessage = () => {
    if (error.message.includes('API server error')) {
      return 'Сервер API тимчасово недоступний. Спробуйте пізніше.';
    }
    if (
      error.message.includes('NetworkError') ||
      error.message.includes('fetch')
    ) {
      return "Проблема з мережевим з'єднанням. Перевірте інтернет-з'єднання.";
    }
    if (error.message.includes('HTTP error! status: 500')) {
      return 'Внутрішня помилка сервера. Спробуйте пізніше.';
    }
    return 'Вибачте, сталася неочікувана помилка. Спробуйте оновити сторінку або повернутися на головну.';
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.errorIcon}>⚠️</div>

          <h1 className={styles.title}>Щось пішло не так</h1>

          <p className={styles.description}>{getErrorMessage()}</p>

          <div className={styles.errorDetails}>
            <details className={styles.details}>
              <summary className={styles.summary}>
                Деталі помилки (для розробників)
              </summary>
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
