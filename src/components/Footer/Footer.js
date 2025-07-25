'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getLocaleFromPathname } from '@/lib/locale';
import styles from './Footer.module.css';

export default function Footer() {
  const pathname = usePathname();
  const currentLocale = getLocaleFromPathname(pathname);
  const currentYear = new Date().getFullYear();
  const [dict, setDict] = useState(null);

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dictionary = await import(`@/dictionaries/${currentLocale}.json`);
        setDict(dictionary.default);
      } catch (err) {
        console.error('Failed to load dictionary:', err);
        const fallbackDict = await import('@/dictionaries/uk.json');
        setDict(fallbackDict.default);
      }
    };
    loadDictionary();
  }, [currentLocale]);

  if (!dict) {
    return (
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.content}>
            <p className={styles.copyright}>Loading...</p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.copyright}>
            {dict.footer.copyright.replace('{year}', currentYear)}
          </p>
          <p className={styles.author}>{dict.footer.author}</p>
        </div>
      </div>
    </footer>
  );
}
