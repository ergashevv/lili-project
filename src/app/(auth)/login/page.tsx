'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { login } from '@/app/actions/auth'
import { useI18n } from '@/lib/i18n'
import styles from '../Auth.module.css'

export default function LoginPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { t } = useI18n()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const formData = new FormData(e.currentTarget)
    try {
      const res = await login(formData)
      if (res.error) {
        setError(res.error)
      } else if (res.success) {
        router.refresh()
        if (res.role === 'ADMIN') {
          router.push('/admin')
        } else {
          router.push('/')
        }
      }
    } catch {
      setError(t('auth.login.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.card}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/" className={styles.logo}>SIMPATY</Link>
        <h1 className={styles.title}>{t('auth.login.title')}</h1>
        <p className={styles.subtitle}>{t('auth.login.subtitle')}</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.formGroup}>
            <label>Email</label>
            <input name="email" type="email" required />
          </div>
          <div className={styles.formGroup}>
            <label>Parol</label>
            <input name="password" type="password" required />
          </div>
          
          <button type="submit" disabled={loading} className={styles.btn}>
            {loading ? t('auth.login.loading') : t('auth.login.submit')}
          </button>
        </form>

        <p className={styles.footer}>
          {t('auth.login.footer')}{' '}
          <Link href="/signup">{t('auth.login.footerLink')}</Link>
        </p>
      </motion.div>
    </div>
  )
}
