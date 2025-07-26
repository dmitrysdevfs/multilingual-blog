'use client';
import styles from './LoadingSpinner.module.css';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getDictionary } from '@/lib/getDictionary';

export default function LoadingSpinner() {
  const { locale } = useParams();
  const [dict, setDict] = useState(null);
  const [dots, setDots] = useState('');

  useEffect(() => {
    getDictionary(locale).then(setDict);

    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    return () => clearInterval(interval);
  }, [locale]);

  if (!dict) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <p className={styles.message}>
          {dict.loading.message}
          <span>{dots}</span>
        </p>
        <p className={styles.subtitle}>{dict.loading.subtitle}</p>
      </div>
    </div>
  );
}
