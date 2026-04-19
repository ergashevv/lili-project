'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './FilterSidebar.module.css'

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  colors: string[]
  sizes: string[]
  subCategories: { slug: string; nameUz: string; nameRu: string }[]
}

export function FilterSidebar({
  isOpen,
  onClose,
  colors,
  sizes,
  subCategories
}: FilterSidebarProps) {
  const { lang, t } = useI18n()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedSub, setSelectedSub] = useState<string | null>(searchParams.get('sub'))
  const [selectedColor, setSelectedColor] = useState<string | null>(searchParams.get('color'))
  const [selectedSize, setSelectedSize] = useState<string | null>(searchParams.get('size'))
  const [selectedSort, setSelectedSort] = useState<string | null>(searchParams.get('sort') || 'newest')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const handleApply = () => {
    const params = new URLSearchParams()
    if (selectedSub) params.set('sub', selectedSub)
    if (selectedColor) params.set('color', selectedColor)
    if (selectedSize) params.set('size', selectedSize)
    if (selectedSort && selectedSort !== 'newest') params.set('sort', selectedSort)

    router.push(`?${params.toString()}`)
    onClose()
  }

  const handleClear = () => {
    setSelectedSub(null)
    setSelectedColor(null)
    setSelectedSize(null)
    setSelectedSort('newest')
    router.push('?')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay} onClick={onClose}>
          <motion.div
            className={styles.sidebar}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>{t('filter.title')}</h2>
              <button className={styles.closeBtn} onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.content}>
              {/* Sort Section */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>{t('filter.sort.title')}</h3>
                <div className={styles.sortList}>
                  {['newest', 'price_asc', 'price_desc'].map((s) => (
                    <div
                      key={s}
                      className={`${styles.sortItem} ${selectedSort === s ? styles.active : ''}`}
                      onClick={() => setSelectedSort(s)}
                    >
                      {t(`filter.sort.${s}`)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Subcategories */}
              {subCategories.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>{t('filter.subcategory')}</h3>
                  <div className={styles.optionsGrid}>
                    {subCategories.map((sub) => (
                      <button
                        key={sub.slug}
                        className={`${styles.optionBtn} ${selectedSub === sub.slug ? styles.active : ''}`}
                        onClick={() => setSelectedSub(selectedSub === sub.slug ? null : sub.slug)}
                      >
                        {lang === 'uz' ? sub.nameUz : sub.nameRu}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {colors.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>{t('filter.color')}</h3>
                  <div className={styles.colorGrid}>
                    {colors.map((color) => (
                      <button
                        key={color}
                        className={`${styles.colorTick} ${selectedColor === color ? styles.active : ''}`}
                        style={{ backgroundColor: color.toLowerCase() }}
                        onClick={() => setSelectedColor(selectedColor === color ? null : color)}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {sizes.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>{t('filter.size')}</h3>
                  <div className={styles.optionsGrid}>
                    {sizes.map((size) => (
                      <button
                        key={size}
                        className={`${styles.optionBtn} ${selectedSize === size ? styles.active : ''}`}
                        onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className={styles.footer}>
              <button className={styles.clearBtn} onClick={handleClear}>
                {t('filter.clear')}
              </button>
              <button className={styles.applyBtn} onClick={handleApply}>
                {t('filter.apply')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
