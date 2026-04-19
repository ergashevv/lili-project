'use client'

import { useRouter } from 'next/navigation'
import { deleteOrder } from '@/app/actions/admin'
import styles from '../AdminForms.module.css'

export function OrderDeleteBtn({ id }: { id: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm("Haqiqatan ham bu buyurtmani o'chirmoqchimisiz?")) return
    const res = await deleteOrder(id)
    if (res.error) alert(res.error)
    else router.refresh()
  }

  return (
    <button onClick={handleDelete} className={styles.deleteBtn}>
      O&apos;chirish
    </button>
  )
}
