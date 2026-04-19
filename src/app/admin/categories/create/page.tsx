'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveCategory } from '@/app/actions/admin'
import { ImageUpload } from '@/components/ImageUpload'
import styles from '../../AdminForms.module.css'

export default function CreateCategoryPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    formData.append('imageUrl', imageUrl)
    
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
      <h1 className={styles.title}>Yangi Kategoriya</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Nomi (UZ) *</label>
            <input name="nameUz" required className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label>Nomi (RU)</label>
            <input name="nameRu" className={styles.input} />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Slug (URL) * masalan: oyoq-kiyimlar</label>
          <input name="slug" required className={styles.input} />
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Asosiy Rang (Hex) * dinamik</label>
            <input name="mainColor" type="color" defaultValue="#800020" className={styles.colorInput} />
          </div>
          <div className={styles.formGroup}>
            <label>Qo&apos;shimcha Rang (Hex) *</label>
            <input name="secondaryColor" type="color" defaultValue="#d4af37" className={styles.colorInput} />
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

        <button type="submit" disabled={loading} className={styles.btn}>
          {loading ? 'Saqlanmoqda...' : 'Saqlash'}
        </button>
      </form>
    </div>
  )
}
