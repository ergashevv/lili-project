'use client'

import React from 'react'
import { useI18n } from '@/lib/i18n'
import styles from '../ContentPage.module.css'

export default function CollectionsPage() {
  const { lang } = useI18n()
  const isUz = lang === 'uz'

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.eyebrow}>Simpaty</div>
          <h1 className={styles.title}>
            {isUz ? 'Kolleksiyalar va obrazlar' : 'Коллекции и образы'}
          </h1>
          <p className={styles.subtitle}>
            {isUz
              ? "Simpaty kollektsiyalari mavsum, kayfiyat va turmush tarziga qarab tuziladi. Har bir yo‘nalish o‘ziga xos rang va siluetlarga ega."
              : 'Коллекции Simpaty формируются по сезонам, настроению и образу жизни. Каждое направление имеет свою палитру и характер силуэтов.'}
          </p>
          <div className={styles.divider} />
        </header>

        <section className={styles.content}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {isUz ? 'Asosiy yo‘nalishlar' : 'Основные направления коллекций'}
            </h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                {isUz
                  ? 'Evening — kechki liboslar va maxsus tadbirlar uchun nafis ko‘rinishlar'
                  : 'Evening — вечерние платья и образы для особых случаев'}
              </li>
              <li className={styles.listItem}>
                {isUz
                  ? 'Business — ish uchrashuvlari va ofis uchun zamonaviy kostyumlar'
                  : 'Business — современные костюмы и образы для офиса и деловых встреч'}
              </li>
              <li className={styles.listItem}>
                {isUz
                  ? 'Spring / Summer — yengil, havodor va rang-barang liboslar'
                  : 'Spring / Summer — лёгкие, воздушные и цветные изделия для тёплого сезона'}
              </li>
              <li className={styles.listItem}>
                {isUz
                  ? 'Accessories — obrazni to‘ldiruvchi kamar, sumka va boshqa detallar'
                  : 'Accessories — пояса, сумки и детали, дополняющие образ'}
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {isUz ? 'Lookbook g‘oyasi' : 'Идея lookbook'}
            </h2>
            <p className={styles.text}>
              {isUz
                ? "Mazkur sahifani kelajakda to‘liq lookbook formatiga — tayyor obrazlar, stilist tavsiyalari va fotosuratlar bilan to‘ldirish mumkin. Hozircha siz asosiy kollektsiyalar bo‘yicha tasavvurga ega bo‘lasiz."
                : 'В дальнейшем этот раздел можно оформить как полноценный lookbook — с готовыми образами, советами стилистов и фотосъёмками. Сейчас здесь представлено общее описание основных направлений.'}
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

