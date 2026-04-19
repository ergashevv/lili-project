'use client'

import React from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import styles from './(store)/ContentPage.module.css'

export default function NotFound() {
  const { lang } = useI18n()
  const isUz = lang === 'uz'

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.eyebrow}>404</div>
          <h1 className={styles.title}>
            {isUz ? 'Sahifa topilmadi' : 'Страница не найдена'}
          </h1>
          <p className={styles.subtitle}>
            {isUz
              ? "Siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga ko‘chirilgan bo‘lishi mumkin."
              : 'Возможно, страница была удалена или адрес введён с ошибкой.'}
          </p>
          <div className={styles.divider} />
        </header>

        <section className={styles.content}>
          <div className={styles.section}>
            <p className={styles.text}>
              {isUz
                ? "Bosh sahifaga qaytib, maxsus to'plamlarimiz bilan tanishishingizni tavsiya etamiz."
                : 'Вы можете вернуться на главную страницу или в раздел категорий и подобрать подходящий образ.'}
            </p>
          </div>

          <div className={styles.badgeRow}>
            <Link href="/" className={styles.badge}>
              {isUz ? 'Bosh sahifa' : 'Главная'}
            </Link>
            <Link href="/categories" className={styles.badge}>
              {isUz ? 'Kategoriyalar' : 'Категории'}
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}

