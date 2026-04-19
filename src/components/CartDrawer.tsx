'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus } from 'lucide-react'
import { useCart } from '@/store/useCart'
import { useI18n } from '@/lib/i18n'
import Image from 'next/image'
import styles from './CartDrawer.module.css'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()
  const { lang, t } = useI18n()

  const formattedTotal = new Intl.NumberFormat(lang === 'uz' ? 'uz-UZ' : 'ru-RU', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0,
  }).format(totalPrice())

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div 
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className={styles.header}>
              <h2 className={styles.headerTitle}>{t('nav.cart')}</h2>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className={styles.content}>
              {items.length === 0 ? (
                <div className={styles.empty}>
                  <p>{t('cart.empty')}</p>
                </div>
              ) : (
                <div className={styles.itemsList}>
                   {items.map((item) => (
                    <div key={item.id} className={styles.cartItem}>
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        width={80}
                        height={100}
                        className={styles.itemImage} 
                      />
                      <div className={styles.itemInfo}>
                        <h4 className={styles.itemName}>{item.name}</h4>
                        <div className={styles.itemMeta}>
                          {item.color && <span>{item.color}</span>}
                          {item.size && <span> | {item.size}</span>}
                        </div>
                        
                        <div className={styles.itemActions}>
                          <div className={styles.quantityControls}>
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                              <Minus size={12} />
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                              <Plus size={12} />
                            </button>
                          </div>
                          <button 
                            className={styles.removeBtn}
                            onClick={() => removeItem(item.id)}
                          >
                            {lang === 'uz' ? 'O\'chirish' : 'Удалить'}
                          </button>
                        </div>
                      </div>
                      <div className={styles.itemPrice}>
                        {new Intl.NumberFormat(lang === 'uz' ? 'uz-UZ' : 'ru-RU', {
                          minimumFractionDigits: 0,
                        }).format(item.price * item.quantity)} UZS
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.totalRow}>
                  <span>{t('cart.total')}:</span>
                  <span className={styles.totalAmount}>{formattedTotal}</span>
                </div>
                <button className={styles.checkoutBtn}>
                  {t('cart.checkout') || "Buyurtma berish"}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
