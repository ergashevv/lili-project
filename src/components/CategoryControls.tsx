'use client'

import React, { useState } from 'react'
import { FilterSidebar } from './FilterSidebar'
import { SlidersHorizontal } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import styles from './CategoryControls.module.css'

interface Props {
  colors: string[]
  sizes: string[]
  subCategories: { slug: string; nameUz: string; nameRu: string }[]
}

export function CategoryControls({ colors, sizes, subCategories }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useI18n()

  return (
    <>
      <div className={styles.controlsBar}>
        <div className="container">
          <div className={styles.inner}>
            <button className={styles.filterBtn} onClick={() => setIsOpen(true)}>
              <SlidersHorizontal size={18} />
              <span>{t('filter.title')}</span>
            </button>
          </div>
        </div>
      </div>

      <FilterSidebar 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        colors={colors}
        sizes={sizes}
        subCategories={subCategories}
      />
    </>
  )
}
