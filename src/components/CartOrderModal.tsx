'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { placeCartOrder } from '@/app/actions/order'
import { X, ShoppingBag } from 'lucide-react'
import styles from './OrderModal.module.css'
import { useCart } from '@/store/useCart'

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  color?: string
  size?: string
  slug: string
}

export function CartOrderModal({ 
  isOpen, 
  onClose,
  items
}: { 
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
}) {
  const { t, lang } = useI18n()
  const { clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const formattedTotal = new Intl.NumberFormat(lang === 'uz' ? 'uz-UZ' : 'ru-RU', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0,
  }).format(totalPrice)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    
    // Simplify items for the server action
    const simplifiedItems = items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      color: item.color,
      size: item.size
    }))
    
    formData.append('items', JSON.stringify(simplifiedItems))
    
    try {
      const res = await placeCartOrder(formData)
      if (res.success) {
        setSuccess(true)
        clearCart()
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
          
          <h2 className={styles.title}>{t('cart.checkout')}</h2>
          
          <div className={styles.cartSummary}>
            <div className={styles.summaryInfo}>
              <ShoppingBag size={20} />
              <span>{items.length} {lang === 'uz' ? 'ta mahsulot' : 'товара'}</span>
            </div>
            <p className={styles.totalAmount}>
              {lang === 'uz' ? 'Jami summa' : 'Общая сумма'}: <strong>{formattedTotal}</strong>
            </p>
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
                <textarea 
                  name="address" 
                  className={styles.input} 
                  rows={2} 
                  required 
                  placeholder={lang === 'uz' ? 'Shahar, tuman, ko‘cha va uy manzili' : 'Адрес доставки'}
                />
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
