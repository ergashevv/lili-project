'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveProduct } from '@/app/actions/admin'
import { ImageUpload } from '@/components/ImageUpload'
import styles from '../../../AdminForms.module.css'
import { ProductPreview } from '../../ProductPreview'

type Product = {
  id: string
  nameUz: string
  nameRu: string | null
  slug: string
  descriptionUz: string | null
  descriptionRu: string | null
  categoryId: string
  price: number
  primaryImage: string | null
  isActive: boolean
  colors: string[]
  sizes: string[]
}

type Category = {
  id: string
  nameUz: string
}

export default function EditProductClient({ product, categories }: { product: Product, categories: Category[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [form, setForm] = useState({
    nameUz: product.nameUz,
    nameRu: product.nameRu || '',
    slug: product.slug,
    price: product.price,
    categoryId: product.categoryId,
    isActive: String(product.isActive),
    colors: product.colors?.join(', ') || '',
    sizes: product.sizes?.join(', ') || '',
    descriptionUz: product.descriptionUz || '',
    descriptionRu: product.descriptionRu || '',
    primaryImage: product.primaryImage || ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('id', product.id)
    Object.entries(form).forEach(([key, val]) => formData.append(key, val.toString()))

    try {
      const res = await saveProduct(formData)
      if (res.error) alert(res.error)
      else router.push('/admin/products')
    } catch {
      alert("Tizim xatosi")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container} style={{ maxWidth: '1400px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 450px', gap: '40px' }}>
        
        <div>
          <h1 className={styles.title}>Mahsulotni Tahrirlash</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Nomi (UZ) *</label>
                <input name="nameUz" value={form.nameUz} onChange={handleChange} required className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label>Nomi (RU)</label>
                <input name="nameRu" value={form.nameRu} onChange={handleChange} className={styles.input} />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Slug (URL) *</label>
                <input name="slug" value={form.slug} onChange={handleChange} required className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label>Narx (UZS) *</label>
                <input name="price" value={form.price} onChange={handleChange} type="number" required className={styles.input} />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Kategoriya *</label>
                <select name="categoryId" value={form.categoryId} onChange={handleChange} required className={styles.select}>
                  <option value="">Tanlang...</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.nameUz}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Status</label>
                <select name="isActive" value={form.isActive} onChange={handleChange} className={styles.select}>
                  <option value="true">Faol</option>
                  <option value="false">Nofaol</option>
                </select>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Ranglar (vergul bilan)</label>
                <input name="colors" value={form.colors} onChange={handleChange} className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label>O&apos;lchamlar (vergul bilan)</label>
                <input name="sizes" value={form.sizes} onChange={handleChange} className={styles.input} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Ta&apos;rif (UZ)</label>
              <textarea name="descriptionUz" value={form.descriptionUz} onChange={handleChange} rows={4} className={styles.textarea} />
            </div>

            <div className={styles.formGroup}>
              <label>Asosiy Rasm</label>
              <ImageUpload
                value={form.primaryImage}
                onChange={(url) => setForm(prev => ({...prev, primaryImage: url}))}
                hint="Tavsiya: 800×1000 px"
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

        <div>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', letterSpacing: '1px', textTransform: 'uppercase' }}>Live Preview</h2>
          <ProductPreview data={{
            ...form,
            colors: form.colors.split(',').map(s => s.trim()).filter(Boolean),
            sizes: form.sizes.split(',').map(s => s.trim()).filter(Boolean),
          }} />
        </div>

      </div>
    </div>
  )
}
