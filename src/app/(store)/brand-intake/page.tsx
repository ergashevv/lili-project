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
        <h1 className={styles.title}>Tell us the basics of your brand</h1>
        <p className={styles.subtitle}>
          Fill in the form below in plain language. Your answers will be saved
          to the dashboard right away.
        </p>

        <div className={styles.heroGrid}>
          <div className={styles.heroCard}>
            <strong>No login needed</strong>
            <span>Anyone can open the page and start filling it out.</span>
          </div>
          <div className={styles.heroCard}>
            <strong>Simple fields</strong>
            <span>Brand name, domain, pages, colors, and contact info.</span>
          </div>
          <div className={styles.heroCard}>
            <strong>Saved to dashboard</strong>
            <span>The submission appears in the dashboard after submit.</span>
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
