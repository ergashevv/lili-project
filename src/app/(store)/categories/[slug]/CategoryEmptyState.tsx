'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import styles from './CategoryPage.module.css'

export function CategoryEmptyState() {
  const { t } = useI18n()

  return (
    <div className={styles.empty}>
      <h2 className={styles.emptyTitle}>{t('category.empty.title') || 'Hech narsa topilmadi'}</h2>
      <p className={styles.emptyDesc}>
        {t('category.empty.desc') || 'Kechirasiz, ushbu ruknda hozircha mahsulotlar mavjud emas. Tezp orada yangilanishlar bo\'ladi.'}
      </p>
      <Link href="/categories" className={styles.backBtn}>
        {t('category.back')}
      </Link>
    </div>
  )
}

