'use client'

import { useRouter } from 'next/navigation'
import { deleteCategory } from '@/app/actions/admin'
import styles from '../AdminForms.module.css'

export function CategoryActions({ id }: { id: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm("Haqiqatan ham bu kategoriyani o'chirmoqchimisiz?")) return
    const res = await deleteCategory(id)
    if (res.error) alert(res.error)
    else router.refresh()
  }

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <a
        href={`/admin/categories/${id}/edit`}
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
