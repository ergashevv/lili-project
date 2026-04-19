'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUser, getUserOrders, logout } from '@/app/actions/auth'
import { useI18n } from '@/lib/i18n'
import styles from './Profile.module.css'
import { motion } from 'framer-motion'
import { Package, User as UserIcon, LogOut } from 'lucide-react'

export default function ProfilePage() {
  const [user, setUser] = useState<{ id: string; email: string; name: string | null; role: string; createdAt: Date } | null>(null)
  const [orders, setOrders] = useState<{ id: string; status: string; createdAt: Date; product: { nameUz: string; nameRu: string; price: number; primaryImage: string | null } }[]>([])
  const [loading, setLoading] = useState(true)
  const { t, lang } = useI18n()
  const router = useRouter()

  useEffect(() => {
    async function loadData() {
      try {
        const userData = await getUser()
        if (!userData) {
          router.push('/login')
          return
        }
        setUser(userData)
        const userOrders = await getUserOrders()
        setOrders(userOrders)
      } catch (err) {
        console.error('Failed to load profile:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [router])

  const handleLogout = async () => {
    await logout()
    router.push('/')
    router.refresh()
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>{t('auth.login.loading') || 'Loading...'}</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.profileCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>{t('profile.title') || 'Mening Profilim'}</h1>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={18} style={{ marginRight: 8 }} />
            {t('nav.logout')}
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.infoSection}>
            <h2>
              <UserIcon size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />
              {t('profile.info') || 'Ma\'lumotlar'}
            </h2>
            <div className={styles.infoItem}>
              <label>{t('form.name')}</label>
              <p>{user.name}</p>
            </div>
            <div className={styles.infoItem}>
              <label>Email</label>
              <p>{user.email}</p>
            </div>
            <div className={styles.infoItem}>
              <label>{t('profile.joined') || 'Azolik sanasi'}</label>
              <p>{new Date(user.createdAt).toLocaleDateString(lang === 'uz' ? 'uz-UZ' : 'ru-RU')}</p>
            </div>
          </div>

          <div className={styles.orderSection}>
            <h2>
              <Package size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />
              {t('profile.orders') || 'Buyurtmalar tarix'}
            </h2>
            {orders.length === 0 ? (
              <div className={styles.empty}>
                {t('profile.noOrders') || 'Sizda hali buyurtmalar yo\'q'}
              </div>
            ) : (
              <div className={styles.orderList}>
                {orders.map((order) => (
                  <div key={order.id} className={styles.orderItem}>
                    {order.product.primaryImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={order.product.primaryImage} 
                        alt={lang === 'uz' ? order.product.nameUz : order.product.nameRu} 
                        className={styles.productImg}
                      />
                    )}
                    <div className={styles.orderInfo}>
                      <div className={styles.productName}>
                        {lang === 'uz' ? order.product.nameUz : order.product.nameRu}
                      </div>
                      <div className={styles.orderMeta}>
                        <span>{order.product.price.toLocaleString()} UZS</span>
                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className={`${styles.status} ${styles['status_' + order.status]}`}>
                      {order.status}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
