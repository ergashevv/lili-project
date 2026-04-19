'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Product } from '@prisma/client'
import { useI18n } from '@/lib/i18n'
import { placeOrder } from '@/app/actions/order'
import { X } from 'lucide-react'
import styles from './OrderModal.module.css'

export function OrderModal({ 
  isOpen, 
  onClose, 
  product,
  selectedColor,
  selectedSize
}: { 
  isOpen: boolean
  onClose: () => void
  product: Product,
  selectedColor?: string | null,
  selectedSize?: string | null
}) {
  const { t, lang } = useI18n()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    formData.append('productId', product.id)
    if (selectedColor) formData.append('selectedColor', selectedColor)
    if (selectedSize) formData.append('selectedSize', selectedSize)
    
    try {
      const res = await placeOrder(formData)
      if (res.success) {
        setSuccess(true)
      } else {
        setError(res.error || 'Xatolik yuz berdi')
      }
    } catch {
      setError('Kutilmagan xatolik yuz berdi')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className={styles.overlay} onClick={onClose}>
        <motion.div 
          className={styles.modal}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
          
          <h2 className={styles.title}>{t('product.order')}</h2>
          <div className={styles.productSummary}>
            <p className={styles.productName}>
              {lang === 'uz' ? product.nameUz : product.nameRu}
            </p>
            {(selectedColor || selectedSize) && (
              <p className={styles.selectionSummary}>
                {selectedColor && <span>{t('product.color')}: {selectedColor}</span>}
                {selectedColor && selectedSize && <span> | </span>}
                {selectedSize && <span>{t('product.size')}: {selectedSize}</span>}
              </p>
            )}
          </div>
          
          {success ? (
            <div className={styles.success}>
              <h3>{t('order.success')}</h3>
              <p>{t('order.success.desc')}</p>
              <button className={styles.btn} onClick={onClose}>{t('common.close')}</button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              {error && <p className={styles.error}>{error}</p>}
              
              <div className={styles.formGroup}>
                <label className={styles.label}>{t('form.name')}</label>
                <input name="clientName" className={styles.input} required placeholder={lang === 'uz' ? 'To‘liq ismingizni kiriting' : 'Введите ваше имя'} />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>{t('form.phone')}</label>
                <input name="clientPhone" type="tel" className={styles.input} required placeholder="+998 90 123 45 67" />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>{t('form.address')} *</label>
                <textarea name="address" className={styles.input} rows={2} required placeholder={lang === 'uz' ? 'Shahar, tuman, ko‘cha va uy manzili' : 'Адрес доставки'} />
              </div>
              
              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? t('common.loading') : t('form.submit')}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
