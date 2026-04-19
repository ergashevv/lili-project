'use client'

import React from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import styles from './(store)/ContentPage.module.css'

export default function GlobalError() {
  const { lang } = useI18n()
  const isUz = lang === 'uz'

  return (
    <html>
      <body>
        <main className={styles.page}>
          <div className="container">
            <header className={styles.header}>
              <div className={styles.eyebrow}>Simpaty</div>
              <h1 className={styles.title}>
                {isUz ? 'Tizim xatosi' : 'Системная ошибка'}
              </h1>
              <p className={styles.subtitle}>
                {isUz
                  ? "Kutilmagan xatolik yuz berdi. Iltimos, sahifani yangilab ko‘ring yoki biroz kuting."
                  : 'Произошла непредвиденная ошибка. Обновите страницу или попробуйте зайти чуть позже.'}
              </p>
              <div className={styles.divider} />
            </header>

            <section className={styles.content}>
              <div className={styles.section}>
                <p className={styles.text}>
                  {isUz
                    ? "Xatolik takrorlangan taqdirda, biz bilan bog'lanishingizni so'raymiz."
                    : 'Если ошибка повторяется, пожалуйста, свяжитесь с нами через раздел контактов.'}
                </p>
              </div>

              <div className={styles.badgeRow}>
                <Link href="/" className={styles.badge}>
                  {isUz ? 'Bosh sahifa' : 'Главная'}
                </Link>
                <Link href="/contacts" className={styles.badge}>
                  {isUz ? 'Kontaktlar' : 'Контакты'}
                </Link>
              </div>
            </section>
          </div>
        </main>
      </body>
    </html>
  )
}

