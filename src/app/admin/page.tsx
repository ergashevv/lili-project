import Link from 'next/link'
import prisma from '@/lib/prisma'
import { countBrandIntakes, listRecentBrandIntakes } from '@/lib/brand-intake-store'
import styles from './Dashboard.module.css'

export default async function DashboardPage() {
  const [orders, products, categories, brandIntakeCount, brandIntakes] = await Promise.all([
    prisma.order.count(),
    prisma.product.count(),
    prisma.category.count(),
    countBrandIntakes(),
    listRecentBrandIntakes(5),
  ])

  return (
    <div>
      <h1 className={styles.title}>Boshqaruv Paneli (Dashboard)</h1>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Buyurtmalar</h3>
          <p className={styles.value}>{orders}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Mahsulotlar</h3>
          <p className={styles.value}>{products}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Kategoriyalar</h3>
          <p className={styles.value}>{categories}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Brand Intake</h3>
          <p className={styles.value}>{brandIntakeCount}</p>
        </div>
      </div>
      
      <div className={styles.welcomeInfo}>
        <h2>Lili E-Commerce Xush Kelibsiz!</h2>
        <p>Chap tarafdagi menyudan kerakli bo&apos;limni tanlang. Kategoriyalarni yaratishingiz, mahsulot qo&apos;shishingiz, yangi tushgan buyurtmalarni boshqarishingiz va brand intake formalarini ko&apos;rishingiz mumkin.</p>
        <br/>
        <p><strong>Eslatma:</strong> Saytdagi ranglar dinamik tarzda Kategoriyalar bo&apos;limidan har bir kategoriya uchun (Asosiy rang va Qo&apos;shimcha rang) kiritilgan ranglar orqali avtomatik ishlaydi.</p>
      </div>

      <div className={styles.recentSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Recent Brand Intake Submissions</h2>
            <p>Newest form submissions are shown here as soon as they are saved.</p>
          </div>
          <Link href="/admin/brand-intake" className={styles.sectionLink}>
            Open intake page
          </Link>
        </div>

        {brandIntakes.length > 0 ? (
          <div className={styles.intakeGrid}>
            {brandIntakes.map((entry) => {
              const answers = entry.answers as Record<string, string | undefined>
              return (
                <article key={entry.id} className={styles.intakeCard}>
                  <div className={styles.intakeHeader}>
                    <h3>{entry.brandName}</h3>
                    <span>{entry.createdAt.toLocaleDateString()}</span>
                  </div>
                  <p className={styles.intakeMeta}>
                    {entry.contactName} · {entry.email}
                  </p>
                  <ul className={styles.intakeList}>
                    <li>
                      <strong>Industry:</strong> {answers.industry || 'TBD'}
                    </li>
                    <li>
                      <strong>Audience:</strong> {answers.primaryAudience || 'TBD'}
                    </li>
                    <li>
                      <strong>Hero:</strong> {answers.heroTitle || 'TBD'}
                    </li>
                  </ul>
                </article>
              )
            })}
          </div>
        ) : (
          <div className={styles.emptyState}>
            No brand intake submissions yet. When the form is submitted, the latest
            entries will appear here.
          </div>
        )}
      </div>
    </div>
  )
}
