'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Ruler, Check } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import styles from './SizeRecommender.module.css'

interface SizeRecommenderProps {
  isOpen: boolean
  onClose: () => void
  availableSizes: string[]
}

export function SizeRecommender({ isOpen, onClose, availableSizes }: SizeRecommenderProps) {
  const { lang, t } = useI18n()
  const [step, setStep] = useState(1)
  const [data, setData] = useState({
    gender: 'woman',
    age: '',
    height: '',
    weight: ''
  })
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null)

  const handleCalculate = () => {
    // Mock logic: choose a random size from available or based on height
    const heightNum = parseInt(data.height)
    let size = availableSizes[0] || 'M'
    
    if (heightNum > 175) size = availableSizes.includes('L') ? 'L' : size
    else if (heightNum < 160) size = availableSizes.includes('S') ? 'S' : size
    
    setRecommendedSize(size)
    setStep(3)
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <motion.div 
        className={styles.modal} 
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>

        <div className={styles.header}>
          <Ruler size={24} />
          <h2>{t('product.sizeGuide')}</h2>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={styles.step}
            >
              <p className={styles.subtitle}>{lang === 'uz' ? 'Jinsingizni belgilang' : 'Выберите ваш пол'}</p>
              <div className={styles.genderToggle}>
                <button 
                  className={data.gender === 'woman' ? styles.active : ''}
                  onClick={() => setData({...data, gender: 'woman'})}
                >
                  {lang === 'uz' ? 'Ayol' : 'Женщина'}
                </button>
                <button 
                  className={data.gender === 'man' ? styles.active : ''}
                  onClick={() => setData({...data, gender: 'man'})}
                >
                  {lang === 'uz' ? 'Erkak' : 'Мужчина'}
                </button>
              </div>
              <button className={styles.nextBtn} onClick={() => setStep(2)}>
                {lang === 'uz' ? 'Davom etish' : 'Продолжить'}
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={styles.step}
            >
              <div className={styles.inputGroup}>
                <label>{lang === 'uz' ? 'Yoshingiz' : 'Ваш возраст'}</label>
                <input 
                  type="number" 
                  placeholder="25" 
                  value={data.age}
                  onChange={e => setData({...data, age: e.target.value})}
                />
              </div>
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>{lang === 'uz' ? 'Bo‘yingiz (sm)' : 'Рост (см)'}</label>
                  <input 
                    type="number" 
                    placeholder="170" 
                    value={data.height}
                    onChange={e => setData({...data, height: e.target.value})}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>{lang === 'uz' ? 'Vazningiz (kg)' : 'Вес (кг)'}</label>
                  <input 
                    type="number" 
                    placeholder="60" 
                    value={data.weight}
                    onChange={e => setData({...data, weight: e.target.value})}
                  />
                </div>
              </div>
              <button 
                className={styles.nextBtn} 
                onClick={handleCalculate}
                disabled={!data.height || !data.weight}
              >
                {lang === 'uz' ? 'O‘lchamni aniqlash' : 'Рассчитать'}
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={styles.result}
            >
              <div className={styles.successIcon}>
                <Check size={40} />
              </div>
              <h3>{lang === 'uz' ? 'Siz uchun tavsiya etilgan o‘lcham:' : 'Вам рекомендуется:'}</h3>
              <div className={styles.recommendedSize}>{recommendedSize}</div>
              <p>{lang === 'uz' ? 'Ushbu o‘lcham sizga mukammal darajada mos keladi.' : 'Этот размер идеально подойдет вам.'}</p>
              <button className={styles.nextBtn} onClick={onClose}>
                OK
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
