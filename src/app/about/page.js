import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Про нас</h1>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Наша команда</h2>
            <p className={styles.text}>
              Ми - молода та амбітна команда розробників, яка створює
              інноваційні веб-рішення з використанням сучасних технологій. Наша
              місія - робити інтернет більш доступним та зручним для
              користувачів.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Наш підхід</h2>
            <p className={styles.text}>
              Ми віримо в силу простих, але ефективних рішень. Кожен проект ми
              розробляємо з увагою до деталей, використовуючи найкращі практики
              та сучасні технології, такі як Next.js, React та CSS Modules.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Технології</h2>
            <p className={styles.text}>
              Наш технологічний стек включає Next.js з App Router, React, CSS
              Modules для стилізації, та інтеграцію з різними API. Ми постійно
              вивчаємо нові технології та покращуємо наші навички.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Контакти</h2>
            <p className={styles.text}>
              Якщо у вас є питання або пропозиції, не соромтеся звертатися до
              нас. Ми завжди відкриті до нових ідей та співпраці.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
