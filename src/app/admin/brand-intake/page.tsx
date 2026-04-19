import type { Metadata } from 'next'
import { listRecentBrandIntakes } from '@/lib/brand-intake-store'
import { BrandIntakeForm } from './BrandIntakeForm'
import styles from './BrandIntakePage.module.css'

export const metadata: Metadata = {
  title: 'Brand Intake | Lili Admin',
  description: 'Collect brand requirements and save onboarding answers to the database.',
}

export default async function BrandIntakePage() {
  const submissions = await listRecentBrandIntakes(5)

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.eyebrow}>Brand Intake</div>
        <h1 className={styles.title}>Collect the basics before design starts</h1>
        <p className={styles.subtitle}>
          Use this page to collect the essential answers for the site. Every
          submission is saved in the database and appears in the dashboard.
        </p>

        <div className={styles.heroGrid}>
          <div className={styles.heroCard}>
            <strong>Quick to fill</strong>
            <span>Only the fields we actually need are included.</span>
          </div>
          <div className={styles.heroCard}>
            <strong>Stored safely</strong>
            <span>The answers go straight into the database.</span>
          </div>
          <div className={styles.heroCard}>
            <strong>Recent briefs</strong>
            <span>See the latest submissions on this page.</span>
          </div>
        </div>
      </section>

      <div className={styles.layout}>
        <BrandIntakeForm />

        <aside className={styles.sidePanel}>
          <div className={styles.panelCard}>
            <h3>What this captures</h3>
            <p>
              This form gathers the essentials needed to build the website.
            </p>
            <ul className={styles.bulletList}>
              <li>
                <span className={styles.bulletDot} />
                Brand name, contact person, email, and website
              </li>
              <li>
                <span className={styles.bulletDot} />
                Pages to include, font style, and text tone
              </li>
              <li>
                <span className={styles.bulletDot} />
                Colors, social links, and extra notes
              </li>
            </ul>
          </div>

          <div className={styles.summaryCard}>
            <h3>Latest briefs</h3>
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
                No briefs yet. The latest entries will appear here after the
                first save.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
