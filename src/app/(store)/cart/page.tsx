'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react'
import { useCart } from '@/store/useCart'
import { useI18n } from '@/lib/i18n'
import { CartOrderModal } from '@/components/CartOrderModal'
import styles from './CartPage.module.css'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()
  const { lang, t } = useI18n()

  const formattedTotal = new Intl.NumberFormat(lang === 'uz' ? 'uz-UZ' : 'ru-RU', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0,
  }).format(totalPrice())

  const [isModalOpen, setIsModalOpen] = React.useState(false)

  if (items.length === 0) {
    return (
      <div className={`container ${styles.emptyContainer}`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.emptyContent}
        >
          <ShoppingBag size={64} strokeWidth={1} />
          <h1>{t('cart.empty')}</h1>
          <p>{lang === 'uz' ? 'Savatda hozircha hech narsa yo\'q. Kolleksiyalarimizni ko\'zdan kechiring.' : 'В вашей корзине пока ничего нет. Ознакомьтесь с нашими коллекциями.'}</p>
          <Link href="/categories" className={styles.continueBtn}>
            {lang === 'uz' ? 'Xarid qilishni boshlash' : 'Начать покупки'}
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('nav.cart')}</h1>
        <span className={styles.count}>{items.length} {lang === 'uz' ? 'mahsulot' : 'товара'}</span>
      </div>

      <div className={styles.grid}>
        {/* Items List */}
        <div className={styles.itemsSection}>
          <div className={styles.itemsList}>
            {items.map((item) => (
              <motion.div 
                key={item.id} 
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.cartItem}
              >
                <Link href={`/product/${item.slug}`} className={styles.imageLink}>
                  <img src={item.image} alt={item.name} className={styles.itemImage} />
                </Link>
                
                <div className={styles.itemInfo}>
                  <div className={styles.itemMain}>
                    <Link href={`/product/${item.slug}`}>
                      <h3 className={styles.itemName}>{item.name}</h3>
                    </Link>
                    <p className={styles.itemMeta}>
                      {item.color && <span>{lang === 'uz' ? 'Rang' : 'Цвет'}: {item.color}</span>}
                      {item.size && <span>{lang === 'uz' ? 'O\'lcham' : 'Размер'}: {item.size}</span>}
                    </p>
                  </div>

                  <div className={styles.itemActions}>
                    <div className={styles.quantityControls}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus size={16} />
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
              </motion.div>
            ))}
          </div>
          
          <Link href="/categories" className={styles.backBtn}>
            <ArrowLeft size={18} />
            <span>{lang === 'uz' ? 'Xaridlarni davom ettirish' : 'Продолжить покупки'}</span>
          </Link>
        </div>

        {/* Summary Sidebar */}
        <aside className={styles.summarySidebar}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>{lang === 'uz' ? 'Buyurtma tafsiloti' : 'Детали заказа'}</h2>
            
            <div className={styles.summaryRow}>
              <span>{lang === 'uz' ? 'Jami' : 'Итого'}</span>
              <span>{formattedTotal}</span>
            </div>
            
            <div className={styles.summaryRow}>
              <span>{lang === 'uz' ? 'Yetkazib berish' : 'Доставка'}</span>
              <span className={styles.free}>{lang === 'uz' ? 'Bepul' : 'Бесплатно'}</span>
            </div>

            <div className={styles.divider} />

            <div className={`${styles.summaryRow} ${styles.totalFinal}`}>
              <span>{t('cart.total')}</span>
              <span>{formattedTotal}</span>
            </div>

            <button 
              className={styles.checkoutBtn}
              onClick={() => setIsModalOpen(true)}
            >
              {t('cart.checkout')}
            </button>

            <div className={styles.secureInfo}>
              <p>✓ {lang === 'uz' ? 'Xavfsiz to\'lov kafolati' : 'Гарантия безопасного платежа'}</p>
              <p>✓ {lang === 'uz' ? '14 kun ichida qaytarish' : 'Возврат в течение 14 дней'}</p>
            </div>
          </div>
        </aside>
      </div>

      <CartOrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        items={items}
      />
    </div>
  )
}

