'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  getLocaleFromPathname,
  getAlternateLocale,
  createLocalizedUrl,
} from '@/lib/locale';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const currentLocale = getLocaleFromPathname(pathname);
  const [dict, setDict] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const isActive = (href) => {
    return pathname === href;
  };

  const getLocalizedPath = (locale) => {
    return createLocalizedUrl(pathname, locale);
  };

  const handleLanguageChange = (locale) => {
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDropdownOpen &&
        !event.target.closest(`.${styles.languageDropdown}`)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (!dict) {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <div className={styles.logoLink}>Loading...</div>
          </div>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <div className={styles.navLink}>Loading...</div>
              </li>
            </ul>
          </nav>
          <div className={styles.languageSwitcher}>
            <div className={styles.languageDropdown}>...</div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href={`/${currentLocale}`} className={styles.logoLink}>
            {dict.home.title}
          </Link>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link
                href={`/${currentLocale}`}
                className={`${styles.navLink} ${
                  isActive(`/${currentLocale}`) ? styles.active : ''
                }`}
              >
                {dict.nav.home}
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                href={`/${currentLocale}/about`}
                className={`${styles.navLink} ${
                  isActive(`/${currentLocale}/about`) ? styles.active : ''
                }`}
              >
                {dict.nav.about}
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.languageSwitcher}>
          <div className={styles.languageDropdown}>
            <button
              className={styles.languageButton}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
            >
              {currentLocale === 'uk' ? 'UA' : 'EN'}
              <span className={styles.dropdownArrow}>▼</span>
            </button>

            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <Link
                  href={getLocalizedPath('uk')}
                  className={`${styles.dropdownItem} ${
                    currentLocale === 'uk' ? styles.active : ''
                  }`}
                  onClick={() => handleLanguageChange('uk')}
                >
                  UA
                </Link>
                <Link
                  href={getLocalizedPath('en')}
                  className={`${styles.dropdownItem} ${
                    currentLocale === 'en' ? styles.active : ''
                  }`}
                  onClick={() => handleLanguageChange('en')}
                >
                  EN
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
