import type { Metadata } from 'next'
import { BrandIntakeForm } from '@/app/admin/brand-intake/BrandIntakeForm'
import styles from '@/app/admin/brand-intake/BrandIntakePage.module.css'

export const metadata: Metadata = {
  title: 'Brand Intake | Lili',
  description:
    'Fill out the brand intake form without signing in. Share your brand details, visual direction, and homepage copy in one place.',
}

export default function BrandIntakePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.eyebrow}>Public Brand Intake</div>
        <h1 className={styles.title}>Fill out the brand brief</h1>
        <p className={styles.subtitle}>
          Write the answers the way you would explain them to a designer. Just
          fill the form below and submit when you are ready.
        </p>

        <div className={styles.heroGrid}>
          <div className={styles.heroCard}>
            <strong>No login needed</strong>
            <span>Open the page and start filling it in.</span>
          </div>
          <div className={styles.heroCard}>
            <strong>Simple form</strong>
            <span>Answer in plain language, one section at a time.</span>
          </div>
          <div className={styles.heroCard}>
            <strong>Saved to database</strong>
            <span>The brief is stored automatically after submit.</span>
          </div>
        </div>
      </section>

      <BrandIntakeForm
        submitLabel="Submit brand intake"
        successMessage="Thank you. Your brand intake has been received."
        errorMessage="Could not submit the form. Please try again."
      />
    </div>
  )
}
