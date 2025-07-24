import { getDictionary } from '@/lib/getDictionary';
import styles from './page.module.css';

export default async function AboutPage({ params }) {
  const { locale } = await params;

  // Отримуємо переклади для поточної мови
  const dict = await getDictionary(locale);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>{dict.about.title}</h1>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{dict.about.team.title}</h2>
            <p className={styles.text}>{dict.about.team.description}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{dict.about.approach.title}</h2>
            <p className={styles.text}>{dict.about.approach.description}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {dict.about.technologies.title}
            </h2>
            <p className={styles.text}>{dict.about.technologies.description}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{dict.about.contact.title}</h2>
            <p className={styles.text}>{dict.about.contact.description}</p>
          </section>
        </div>
      </main>
    </div>
  );
}
