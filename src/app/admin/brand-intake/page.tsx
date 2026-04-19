import type { Metadata } from 'next'
import prisma from '@/lib/prisma'
import { BrandIntakeForm } from './BrandIntakeForm'
import styles from './BrandIntakePage.module.css'

export const metadata: Metadata = {
  title: 'Brand Intake | Lili Admin',
  description: 'Collect brand requirements and save onboarding answers to the database.',
}

export default async function BrandIntakePage() {
  const submissions = await prisma.brandIntake.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.eyebrow}>Brand Intake</div>
        <h1 className={styles.title}>Client Brand Onboarding</h1>
        <p className={styles.subtitle}>
          Use this page to collect the key information needed to turn the project
          into a fully customized personal brand website. Every submission is
          stored in the database.
        </p>

        <div className={styles.heroGrid}>
          <div className={styles.heroCard}>
            <strong>Fast setup</strong>
            <span>Gather the essentials in one place.</span>
          </div>
          <div className={styles.heroCard}>
            <strong>Structured data</strong>
            <span>Top fields are saved cleanly, extra details go into JSON.</span>
          </div>
          <div className={styles.heroCard}>
            <strong>Easy follow-up</strong>
            <span>Review recent submissions directly on this page.</span>
          </div>
        </div>
      </section>

      <div className={styles.layout}>
        <BrandIntakeForm />

        <aside className={styles.sidePanel}>
          <div className={styles.panelCard}>
            <h3>What to collect</h3>
            <p>
              This form helps you gather the information needed for design,
              content, SEO, and launch planning before we build the final site.
            </p>
            <ul className={styles.bulletList}>
              <li>
                <span className={styles.bulletDot} />
                Brand identity, tone of voice, and audience details
              </li>
              <li>
                <span className={styles.bulletDot} />
                Visual direction, colors, typography, and references
              </li>
              <li>
                <span className={styles.bulletDot} />
                Homepage copy, required pages, and launch notes
              </li>
            </ul>
          </div>

          <div className={styles.summaryCard}>
            <h3>Recent submissions</h3>
            {submissions.length > 0 ? (
              <div className={styles.submissionList}>
                {submissions.map((submission) => (
                  <div key={submission.id} className={styles.submissionItem}>
                    <strong>{submission.brandName}</strong>
                    <span>
                      {submission.contactName} · {submission.email}
                    </span>
                    <span>{submission.createdAt.toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.emptyState}>
                No brand intake submissions yet. The latest entries will appear
                here after the first save.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
