'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { saveProduct } from '@/app/actions/admin'
import { ImageUpload } from '@/components/ImageUpload'
import styles from '../../AdminForms.module.css'
import { getCategories } from './actions'
import { ProductPreview } from '../ProductPreview'

export default function CreateProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<{id: string, nameUz: string}[]>([])
  
  // Stateful form for Live Preview
  const [form, setForm] = useState({
    nameUz: '',
    nameRu: '',
    slug: '',
    price: 0,
    categoryId: '',
    isActive: 'true',
    colors: '',
    sizes: '',
    descriptionUz: '',
    descriptionRu: '',
    primaryImage: ''
  })

  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }))
  }

  const handlePngMock = () => {
    if (!form.primaryImage) return alert("Avval rasm yuklang")
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert("Fon avtomatik olib tashlandi (Simulyatsiya)")
    }, 1500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData()
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
          <h1 className={styles.title}>Yangi Mahsulot</h1>
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
                <input name="colors" value={form.colors} onChange={handleChange} placeholder="Red, Blue" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label>O&apos;lchamlar (vergul bilan)</label>
                <input name="sizes" value={form.sizes} onChange={handleChange} placeholder="S, M, L" className={styles.input} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Ta&apos;rif (UZ)</label>
              <textarea name="descriptionUz" value={form.descriptionUz} onChange={handleChange} rows={4} className={styles.textarea} />
            </div>

            <div className={styles.formGroup}>
              <label>Ta&apos;rif (RU)</label>
              <textarea name="descriptionRu" value={form.descriptionRu} onChange={handleChange} rows={4} className={styles.textarea} />
            </div>

            <div className={styles.formGroup}>
              <label>Asosiy Rasm *</label>
              <ImageUpload
                value={form.primaryImage}
                onChange={(url) => setForm(prev => ({...prev, primaryImage: url}))}
                hint="Tavsiya: 800×1000 px"
              />
              {form.primaryImage && (
                <button type="button" onClick={handlePngMock} style={{ marginTop: '10px', fontSize: '11px', padding: '5px 10px', background: '#f0f0f0', border: '1px solid #ccc', cursor: 'pointer', borderRadius: '4px' }}>
                  Auto PNG (Fonni o&apos;chirish)
                </button>
              )}
            </div>

            <button type="submit" disabled={loading} className={styles.btn}>
              {loading ? 'Saqlanmoqda...' : '✓ Saqlash'}
            </button>
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
