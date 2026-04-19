import Link from 'next/link'
import prisma from '@/lib/prisma'
import { countBrandIntakes, listRecentBrandIntakes } from '@/lib/brand-intake-store'
import styles from './Dashboard.module.css'

function splitList(value: string | undefined) {
  return (value || '')
    .split(/\r?\n|,|;/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function text(value: string | undefined | null) {
  return value?.trim() || 'TBD'
}

function listText(value: string | undefined) {
  const items = splitList(value)
  return items.length > 0 ? items.join(' · ') : 'TBD'
}

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
            <p>Each submission appears here as a row in the table.</p>
          </div>
          <Link href="/admin/brand-intake" className={styles.sectionLink}>
            Open intake page
          </Link>
        </div>

        {brandIntakes.length > 0 ? (
          <div className={styles.tableShell}>
            <table className={styles.submissionsTable}>
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Website</th>
                  <th scope="col">Pages</th>
                  <th scope="col">Colors</th>
                  <th scope="col">Font</th>
                  <th scope="col">Tone</th>
                  <th scope="col">Social</th>
                  <th scope="col">Notes</th>
                </tr>
              </thead>
              <tbody>
                {brandIntakes.map((entry) => {
                  const answers = entry.answers as Record<string, string | undefined>
                  const colorList = [
                    { label: 'Primary', value: answers.primaryColor },
                    { label: 'Secondary', value: answers.secondaryColor },
                    { label: 'Accent', value: answers.accentColor },
                  ].filter((item): item is { label: string; value: string } => Boolean(item.value?.trim()))
                  return (
                    <tr key={entry.id}>
                      <td className={styles.dateCell}>{entry.createdAt.toLocaleDateString()}</td>
                      <td>
                        <div className={styles.brandCell}>
                          <strong>{text(entry.brandName)}</strong>
                        </div>
                      </td>
                      <td>{text(entry.contactName)}</td>
                      <td>{text(entry.email)}</td>
                      <td>{text(entry.phone)}</td>
                      <td>{text(entry.website)}</td>
                      <td>{listText(answers.requiredPages)}</td>
                      <td>
                        {colorList.length > 0 ? (
                          <div className={styles.colorList}>
                            {colorList.map((color) => (
                              <span key={color.label} className={styles.colorChip}>
                                <span
                                  className={styles.colorSwatch}
                                  style={{ backgroundColor: color.value }}
                                  aria-hidden="true"
                                />
                                <span>
                                  {color.label}: {color.value}
                                </span>
                              </span>
                            ))}
                          </div>
                        ) : (
                          'TBD'
                        )}
                      </td>
                      <td>{text(answers.typography)}</td>
                      <td>{text(answers.preferredTone)}</td>
                      <td>{listText(answers.socialLinks)}</td>
                      <td className={styles.notesCell}>{text(answers.notes)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
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
