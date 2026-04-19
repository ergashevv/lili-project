import prisma from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../AdminForms.module.css'
import { ProductActions } from './ProductActions'

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  return (
    <div className={styles.container} style={{ maxWidth: '1200px' }}>
      <div className={styles.listHeader}>
        <h1 className={styles.title}>Mahsulotlar</h1>
        <Link href="/admin/products/create" className={styles.addBtn}>
          + Yangi qo&apos;shish
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Rasm</th>
            <th>Nomi (UZ)</th>
            <th>Kategoriya</th>
            <th>Narx (UZS)</th>
            <th>Status</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>
                {p.primaryImage ? (
                  <Image
                    src={p.primaryImage}
                    alt={p.nameUz}
                    width={50}
                    height={50}
                    loading="lazy"
                    style={{ objectFit: 'cover', borderRadius: 4 }}
                  />
                ) : (
                  <div style={{ width: 50, height: 50, background: '#eee', borderRadius: 4 }} />
                )}
              </td>
              <td><strong>{p.nameUz}</strong></td>
              <td>{p.category?.nameUz}</td>
              <td>{new Intl.NumberFormat('uz-UZ').format(p.price)} so&apos;m</td>
              <td>{p.isActive ? 'Faol' : 'Nofaol'}</td>
              <td>
                <ProductActions id={p.id} />
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={6} style={{textAlign: 'center', padding: '2rem'}}>Mahsulotlar topilmadi.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
