'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLocaleFromPathname } from '@/lib/locale';
import styles from './error.module.css';

export default function Error({ error, reset }) {
  const pathname = usePathname();
  const [dict, setDict] = useState(null);

  useEffect(() => {
    // Визначаємо локаль з URL
    const locale = getLocaleFromPathname(pathname);

    // Завантажуємо словник для поточної локалі
    const loadDictionary = async () => {
      try {
        const dictionary = await import(`@/dictionaries/${locale}.json`);
        setDict(dictionary.default);
      } catch (err) {
        console.error('Failed to load dictionary:', err);
        // Fallback до української
        const fallbackDict = await import('@/dictionaries/uk.json');
        setDict(fallbackDict.default);
      }
    };

    loadDictionary();
  }, [pathname]);

  useEffect(() => {
    // Логуємо помилку для відладки
    console.error('Error boundary caught an error:', error);
  }, [error]);

  // Визначаємо тип помилки для більш специфічного повідомлення
  const getErrorMessage = () => {
    if (!dict) return 'Loading...';

    if (error.message.includes('API server error')) {
      return dict.errors.general.apiError;
    }
    if (
      error.message.includes('NetworkError') ||
      error.message.includes('fetch')
    ) {
      return dict.errors.general.networkError;
    }
    if (error.message.includes('HTTP error! status: 500')) {
      return dict.errors.general.serverError;
    }
    return dict.errors.general.defaultError;
  };

  // Показуємо loading поки словник завантажується
  if (!dict) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.content}>
            <div className={styles.errorIcon}>⏳</div>
            <h1 className={styles.title}>Loading...</h1>
          </div>
        </main>
      </div>
    );
  }

  const locale = getLocaleFromPathname(pathname);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.errorIcon}>⚠️</div>

          <h1 className={styles.title}>{dict.errors.general.title}</h1>

          <p className={styles.description}>{getErrorMessage()}</p>

          <div className={styles.errorDetails}>
            <details className={styles.details}>
              <summary className={styles.summary}>
                {dict.errors.general.errorDetails}
              </summary>
              <pre className={styles.errorMessage}>
                {error.message || 'Unknown error'}
              </pre>
            </details>
          </div>

          <div className={styles.actions}>
            <button onClick={reset} className={styles.primaryButton}>
              {dict.errors.general.tryAgain}
            </button>

            <Link href={`/${locale}`} className={styles.secondaryButton}>
              {dict.errors.general.backHome}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
