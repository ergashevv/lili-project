'use client'

import React from 'react'
import { useI18n } from '@/lib/i18n'
import styles from '../ContentPage.module.css'

export default function SalePage() {
  const { lang } = useI18n()
  const isUz = lang === 'uz'

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.eyebrow}>Simpaty</div>
          <h1 className={styles.title}>
            {isUz ? 'Chegirmalar va aksiyalar' : 'Sale и акции'}
          </h1>
          <p className={styles.subtitle}>
            {isUz
              ? "Hozircha chegirmalar bo‘limi onlayn katalog bilan bog‘lanmagan, biroq kelajakda maxsus takliflar shu yerda jamlanadi."
              : 'В данный момент раздел скидок не связан с онлайн-каталогом, но в будущем здесь будут собраны все специальные предложения.'}
          </p>
          <div className={styles.divider} />
        </header>

        <section className={styles.content}>
          <div className={styles.section}>
            <p className={styles.text}>
              {isUz
                ? "Ayni paytda amaldagi chegirmalar va individual takliflar bo‘yicha to‘g‘ridan-to‘g‘ri menejerlarimiz bilan bog‘lanishingiz mumkin."
                : 'Актуальные скидки и индивидуальные предложения вы можете уточнить напрямую у наших менеджеров.'}
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

