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
        <h1 className={styles.title}>Tell Us About Your Brand</h1>
        <p className={styles.subtitle}>
          This page is for anyone who wants a custom website. Just fill in what
          you know in simple words. The panel on the right shows exactly what
          each answer changes on the final site.
        </p>

        <div className={styles.heroGrid}>
          <div className={styles.heroCard}>
            <strong>No login needed</strong>
            <span>Open the page and start typing.</span>
          </div>
          <div className={styles.heroCard}>
            <strong>Answers are saved</strong>
            <span>Everything goes straight to the database.</span>
          </div>
          <div className={styles.heroCard}>
            <strong>Easy to understand</strong>
            <span>Each field shows where it will appear on the site.</span>
          </div>
        </div>
      </section>

      <BrandIntakeForm
        submitLabel="Submit brand intake"
        successMessage="Thank you. Your brand intake has been received."
        errorMessage="Could not submit the form. Please try again."
        showPreview
      />
    </div>
  )
}
