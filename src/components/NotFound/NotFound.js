'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLocaleFromPathname } from '@/lib/locale';
import styles from '../../app/not-found.module.css';

export default function NotFound() {
  const pathname = usePathname();
  const [dict, setDict] = useState(null);
  const [locale, setLocale] = useState('uk');

  useEffect(() => {
    // Визначаємо локаль з URL
    const detectedLocale = getLocaleFromPathname(pathname);
    setLocale(detectedLocale);

    // Завантажуємо словник для поточної локалі
    const loadDictionary = async () => {
      try {
        const dictionary = await import(
          `@/dictionaries/${detectedLocale}.json`
        );
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

  // Показуємо loading поки словник завантажується
  if (!dict) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.content}>
            <div className={styles.errorCode}>404</div>
            <h1 className={styles.title}>Loading...</h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.errorCode}>404</div>

          <h1 className={styles.title}>{dict.errors.notFound.title}</h1>

          <p className={styles.description}>
            {dict.errors.notFound.description}
          </p>

          <div className={styles.actions}>
            <Link href={`/${locale}`} className={styles.primaryButton}>
              {dict.errors.notFound.backHome}
            </Link>

            <Link href={`/${locale}/about`} className={styles.secondaryButton}>
              {dict.errors.notFound.about}
            </Link>
          </div>

          <div className={styles.helpText}>
            <p>{dict.errors.notFound.suggestions}</p>
            <ul className={styles.suggestions}>
              <li>
                <Link href={`/${locale}`} className={styles.suggestionLink}>
                  {dict.errors.notFound.homePage}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/about`}
                  className={styles.suggestionLink}
                >
                  {dict.errors.notFound.aboutPage}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/posts/1`}
                  className={styles.suggestionLink}
                >
                  {dict.errors.notFound.examplePost}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
