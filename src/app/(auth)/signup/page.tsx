'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signup } from '@/app/actions/auth'
import { useI18n } from '@/lib/i18n'
import styles from '../Auth.module.css'

export default function SignupPage() {
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
      const res = await signup(formData)
      if (res.error) {
        setError(res.error)
      } else if (res.success) {
        router.refresh()
        router.push('/')
      }
    } catch {
      setError(t('auth.signup.error'))
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
        <h1 className={styles.title}>{t('auth.signup.title')}</h1>
        <p className={styles.subtitle}>{t('auth.signup.subtitle')}</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.formGroup}>
            <label>{t('form.name')}</label>
            <input name="name" type="text" required />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input name="email" type="email" required />
          </div>
          <div className={styles.formGroup}>
            <label>Parol</label>
            <input name="password" type="password" required />
          </div>
          
          <button type="submit" disabled={loading} className={styles.btn}>
            {loading ? t('auth.signup.loading') : t('auth.signup.submit')}
          </button>
        </form>

        <p className={styles.footer}>
          {t('auth.signup.footer')}{' '}
          <Link href="/login">{t('auth.signup.footerLink')}</Link>
        </p>
      </motion.div>
    </div>
  )
}
