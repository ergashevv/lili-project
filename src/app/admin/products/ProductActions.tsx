'use client'

import { useRouter } from 'next/navigation'
import { deleteProduct } from '@/app/actions/admin'
import styles from '../AdminForms.module.css'

export function ProductActions({ id }: { id: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm("Haqiqatan ham bu mahsulotni o'chirmoqchimisiz?")) return
    const res = await deleteProduct(id)
    if (res.error) alert(res.error)
    else router.refresh()
  }

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <a
        href={`/admin/products/${id}/edit`}
        className={styles.editBtn}
      >
        Tahrirlash
      </a>
      <button
        onClick={handleDelete}
        className={styles.deleteBtn}
      >
        O&apos;chirish
      </button>
    </div>
  )
}
