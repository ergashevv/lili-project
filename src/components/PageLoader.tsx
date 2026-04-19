'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import styles from './PageLoader.module.css'

export function PageLoader() {
  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.logoWrapper}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.95, 1, 0.95] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image 
          src="/logo-simpaty.svg" 
          alt="Simpaty" 
          width={180} 
          height={46} 
          className={styles.logo}
          priority
        />
        <div className={styles.progressBar}>
          <motion.div 
            className={styles.progressFill}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  )
}
