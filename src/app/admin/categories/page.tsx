import prisma from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../AdminForms.module.css'
import { CategoryActions } from './CategoryActions'

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className={styles.container} style={{ maxWidth: '1100px' }}>
      <div className={styles.listHeader}>
        <h1 className={styles.title}>Kategoriyalar</h1>
        <Link href="/admin/categories/create" className={styles.addBtn}>
          + Yangi qo&apos;shish
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Rasm</th>
            <th>Nomi (UZ)</th>
            <th>Slug</th>
            <th>Asosiy Rang</th>
            <th>Status</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(c => (
            <tr key={c.id}>
              <td>
                {c.imageUrl ? (
                  <Image
                    src={c.imageUrl}
                    alt={c.nameUz}
                    width={50}
                    height={50}
                    loading="lazy"
                    style={{ objectFit: 'cover', borderRadius: 4 }}
                  />
                ) : (
                  <div style={{ width: 50, height: 50, background: '#eee', borderRadius: 4 }} />
                )}
              </td>
              <td>{c.nameUz}</td>
              <td><code style={{fontSize: '0.85rem', background: '#F3F4F6', padding: '2px 6px', borderRadius: 4}}>{c.slug}</code></td>
              <td>
                <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                  <div style={{width: 20, height: 20, background: c.mainColor || '#800020', borderRadius: '50%', border: '1px solid #eee'}} />
                  {c.mainColor}
                </div>
              </td>
              <td>{c.isActive ? 'Faol' : 'Nofaol'}</td>
              <td>
                <CategoryActions id={c.id} />
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan={6} style={{textAlign: 'center', padding: '2rem'}}>Kategoriyalar topilmadi.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
