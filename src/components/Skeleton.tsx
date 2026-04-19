'use client'

import React from 'react'
import { motion } from 'framer-motion'
import styles from './Skeleton.module.css'

interface SkeletonProps {
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  className?: string
}

export function Skeleton({ width, height, borderRadius, className }: SkeletonProps) {
  return (
    <motion.div 
      className={`${styles.skeleton} ${className || ''}`}
      style={{ width, height, borderRadius }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  )
}

export function ProductSkeleton() {
  return (
    <div className={styles.productSkeleton}>
      <Skeleton height="auto" className={styles.aspectRatio34} />
      <div className={styles.info}>
        <Skeleton width="80%" height="12px" />
        <Skeleton width="40%" height="12px" />
      </div>
    </div>
  )
}
