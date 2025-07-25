import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './layout.module.css';

export default function LocaleLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
