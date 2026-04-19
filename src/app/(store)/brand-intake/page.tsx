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
        <p className={styles.heroNote}>
          No login needed. Just fill it out from top to bottom and submit.
        </p>
      </section>

      <BrandIntakeForm
        submitLabel="Submit brand intake"
        successMessage="Thank you. Your brand intake has been received."
        errorMessage="Could not submit the form. Please try again."
      />
    </div>
  )
}
