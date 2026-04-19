'use client'

import React from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import styles from './Footer.module.css'

export function Footer() {
  const { lang } = useI18n()
  const isUz = lang === 'uz'
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>SIMPATY</div>
          <p className={styles.tagline}>
            {isUz
              ? "Simpaty — premium ayollar kiyimi, nafis siluetlar va sifatli matolar uyg'unligi. Maxsus kechalar, ish uchrashuvlari va kundalik hayot uchun tayyor obrazlar."
              : 'Simpaty — премиальная женская одежда с акцентом на утончённые силуэты и благородные ткани. Образы для особых случаев, деловых встреч и на каждый день.'}
          </p>
        </div>

        <div className={styles.columns}>
          <div>
            <h4 className={styles.columnTitle}>
              {isUz ? 'Do‘kon' : 'Магазин'}
            </h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <Link href="/categories" className={styles.link}>
                  {isUz ? 'Kategoriyalar' : 'Категории'}
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/collections" className={styles.link}>
                  {isUz ? 'Kolleksiyalar' : 'Коллекции'}
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/sale" className={styles.link}>
                  {isUz ? 'Chegirmalar' : 'Sale / Скидки'}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={styles.columnTitle}>
              {isUz ? 'Maʼlumot' : 'Информация'}
            </h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <Link href="/about" className={styles.link}>
                  {isUz ? 'Brend haqida' : 'О бренде'}
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/delivery" className={styles.link}>
                  {isUz ? 'Yetkazib berish' : 'Доставка'}
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/returns" className={styles.link}>
                  {isUz ? 'Qaytarish va almashtirish' : 'Возврат и обмен'}
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/size-guide" className={styles.link}>
                  {isUz ? 'O‘lchamlar jadvali' : 'Размерная сетка'}
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/faq" className={styles.link}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={styles.columnTitle}>
              {isUz ? 'Aloqa' : 'Контакты'}
            </h4>
            <p className={styles.contactText}>
              {isUz
                ? "Savollar va buyurtmalar uchun:\nTelefon / Telegram: +998 90 000 00 00\nInstagram: @simpaty.uz"
                : 'По вопросам и заказам:\nТелефон / Telegram: +998 90 000 00 00\nInstagram: @simpaty.uz'}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>
          © {year} Simpaty.{' '}
          {isUz ? 'Barcha huquqlar himoyalangan.' : 'Все права защищены.'}
        </span>
        <div className={styles.bottomRight}>
          <Link href="/privacy-policy" className={styles.bottomLink}>
            {isUz ? 'Maxfiylik siyosati' : 'Политика конфиденциальности'}
          </Link>
          <Link href="/terms" className={styles.bottomLink}>
            {isUz ? 'Ommaviy oferta' : 'Публичная оферта'}
          </Link>
        </div>
      </div>
    </footer>
  )
}

