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
        <h1 className={styles.title}>Start Your Brand Project</h1>
        <p className={styles.subtitle}>
          This page is open to everyone. Fill in the form below and we will use
          your answers to shape the website, content, and visual direction.
          The live preview on the right shows exactly where each answer will
          appear on the final site.
        </p>

        <div className={styles.heroGrid}>
          <div className={styles.heroCard}>
            <strong>No login required</strong>
            <span>Anyone can submit the form from this page.</span>
          </div>
          <div className={styles.heroCard}>
            <strong>Saved to database</strong>
            <span>Every submission is stored for the admin team.</span>
          </div>
          <div className={styles.heroCard}>
            <strong>Built for clarity</strong>
            <span>Answer only what you know now. You can update later.</span>
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
