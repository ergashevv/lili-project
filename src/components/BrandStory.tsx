'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import Link from 'next/link'
import Image from 'next/image'
import styles from './BrandStory.module.css'

export function BrandStory() {
  const { t } = useI18n()

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.wrapper}>
          <motion.div 
            className={styles.textColumn}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={styles.title}>{t('home.story.title')}</h2>
            <p className={styles.desc}>{t('home.story.desc')}</p>
            <Link href="/categories" className={styles.btn}>
              {t('home.story.btn')}
            </Link>
          </motion.div>
          
          <motion.div 
            className={styles.imageColumn}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.imageContainer}>
              <Image 
                src="/images/brand-story.png" 
                alt="Brand Story" 
                className={styles.image}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

