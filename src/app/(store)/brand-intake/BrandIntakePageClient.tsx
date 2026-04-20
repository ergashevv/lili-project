'use client'

import React from 'react'
import { BrandIntakeForm } from '@/app/admin/brand-intake/BrandIntakeForm'
import { BRAND_INTAKE_COPY } from '@/lib/brand-intake-content'
import { type BrandIntakeLanguage } from '@/lib/brand-intake-types'
import { useI18n } from '@/lib/i18n'
import styles from '@/app/admin/brand-intake/BrandIntakePage.module.css'

const LANGUAGE_ORDER: BrandIntakeLanguage[] = ['uz', 'ru', 'en']

function getInitialBrandIntakeLanguage(siteLanguage: string): BrandIntakeLanguage {
  return siteLanguage === 'ru' ? 'ru' : 'uz'
}

export function BrandIntakePageClient() {
  const { lang: siteLanguage } = useI18n()
  const [language, setLanguage] = React.useState<BrandIntakeLanguage>(() =>
    getInitialBrandIntakeLanguage(siteLanguage),
  )

  React.useEffect(() => {
    const saved = localStorage.getItem('brand-intake-lang')
    if (saved === 'uz' || saved === 'ru' || saved === 'en') {
      setLanguage(saved)
    }
  }, [])

  React.useEffect(() => {
    localStorage.setItem('brand-intake-lang', language)
    document.documentElement.lang = language
  }, [language])

  const copy = BRAND_INTAKE_COPY[language]

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.eyebrow}>{copy.page.badge}</div>

        <div className={styles.heroTop}>
          <div>
            <h1 className={styles.title}>{copy.page.title}</h1>
            <p className={styles.subtitle}>{copy.page.subtitle}</p>
            <p className={styles.heroNote}>{copy.page.heroNote}</p>
          </div>

          <div className={styles.languageSwitcher}>
            <span className={styles.languageLabel}>{copy.page.languageLabel}</span>
            <div className={styles.languageButtons} role="tablist" aria-label={copy.page.languageLabel}>
              {LANGUAGE_ORDER.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`${styles.languageButton} ${option === language ? styles.languageButtonActive : ''}`}
                  onClick={() => setLanguage(option)}
                  aria-pressed={option === language}
                >
                  {copy.page.languageOptions[option]}
                </button>
              ))}
            </div>
            <p className={styles.languageHint}>{copy.page.languageHint}</p>
          </div>
        </div>
      </section>

      <BrandIntakeForm language={language} />
    </div>
  )
}
