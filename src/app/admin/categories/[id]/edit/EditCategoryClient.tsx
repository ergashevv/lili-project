'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveCategory } from '@/app/actions/admin'
import { ImageUpload } from '@/components/ImageUpload'
import styles from '../../../AdminForms.module.css'

type Category = {
  id: string
  nameUz: string
  nameRu: string | null
  slug: string
  imageUrl: string | null
  mainColor: string | null
  secondaryColor: string | null
  isActive: boolean
}

export default function EditCategoryClient({ category }: { category: Category }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>(category.imageUrl || '')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    formData.append('imageUrl', imageUrl)
    formData.append('id', category.id)

    try {
      const res = await saveCategory(formData)
      if (res.error) alert(res.error)
      else router.push('/admin/categories')
    } catch {
      alert("Tizim xatosi")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Kategoriyani Tahrirlash</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Nomi (UZ) *</label>
            <input name="nameUz" required className={styles.input} defaultValue={category.nameUz} />
          </div>
          <div className={styles.formGroup}>
            <label>Nomi (RU)</label>
            <input name="nameRu" className={styles.input} defaultValue={category.nameRu || ''} />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Slug (URL) * masalan: oyoq-kiyimlar</label>
          <input name="slug" required className={styles.input} defaultValue={category.slug} />
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Asosiy Rang (Hex) *</label>
            <input name="mainColor" type="color" defaultValue={category.mainColor || '#800020'} className={styles.colorInput} />
          </div>
          <div className={styles.formGroup}>
            <label>Qo&apos;shimcha Rang (Hex) *</label>
            <input name="secondaryColor" type="color" defaultValue={category.secondaryColor || '#d4af37'} className={styles.colorInput} />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Rasm</label>
          <ImageUpload
            value={imageUrl}
            onChange={setImageUrl}
            hint="Tavsiya: 1280×720 px (landscape/gorizontal format)"
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="button" onClick={() => router.back()} className={styles.cancelBtn}>
            ← Bekor qilish
          </button>
          <button type="submit" disabled={loading} className={styles.btn} style={{ flex: 1 }}>
            {loading ? 'Saqlanmoqda...' : '✓ Saqlash'}
          </button>
        </div>
      </form>
    </div>
  )
}
