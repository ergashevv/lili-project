'use client'

import React from 'react'
import { useI18n } from '@/lib/i18n'
import styles from '../ContentPage.module.css'

export default function ReviewsPage() {
  const { lang } = useI18n()
  const isUz = lang === 'uz'

  const reviews = [
    {
      name: 'Dilnoza',
      textUz:
        "Kiyim sifati va tikilishi juda yoqdi. Ayniqsa, mato tanlovi zo‘r — tanada juda yumshoq va qulay turadi.",
      textRu:
        'Очень понравилось качество и посадка. Ткани приятные к телу, силуэт выглядит аккуратно и дорого.',
    },
    {
      name: 'Malika',
      textUz:
        "Kechki libos buyurtma qilgan edim, fotosuratdagidan ham chiroyli chiqdi. Yetkazib berish ham tez bo‘ldi.",
      textRu:
        'Заказывала вечернее платье — вживую выглядит даже лучше, чем на фото. Доставка прошла быстро.',
    },
    {
      name: 'Anastasiya',
      textUz:
        "Ish uslubidagi kostyum juda professional ko‘rinadi. Ishxonada hamma so‘rayapti, qayerdan olganimni.",
      textRu:
        'Костюм в деловом стиле смотрится очень профессионально. Коллеги постоянно спрашивают, где покупала.',
    },
  ]

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.eyebrow}>Simpaty</div>
          <h1 className={styles.title}>
            {isUz ? 'Mijozlar fikrlari' : 'Отзывы клиентов'}
          </h1>
          <p className={styles.subtitle}>
            {isUz
              ? 'Real mijozlar tajribasi — brend uchun eng katta qadriyat. Quyida ayrim fikrlar bilan tanishishingiz mumkin.'
              : 'Опыт реальных клиентов — главная ценность для бренда. Ниже вы можете прочитать несколько отзывов.'}
          </p>
          <div className={styles.divider} />
        </header>

        <section className={styles.content}>
          <div className={styles.twoColumn}>
            <div>
              {reviews.map((review) => (
                <div key={review.name} className={styles.section}>
                  <h2 className={styles.sectionTitle}>{review.name}</h2>
                  <p className={styles.text}>
                    {isUz ? review.textUz : review.textRu}
                  </p>
                </div>
              ))}
            </div>

            <aside className={styles.card}>
              <h2 className={styles.sectionTitle}>
                {isUz ? 'Sizning fikringiz muhim' : 'Ваш отзыв важен для нас'}
              </h2>
              <p className={styles.text}>
                {isUz
                  ? "Agar siz allaqachon Simpaty liboslarini xarid qilgan bo‘lsangiz, bizga Telegram yoki Instagram orqali fikringizni yuborishingiz mumkin."
                  : 'Если вы уже приобретали одежду Simpaty, вы можете отправить свой отзыв через Telegram или Instagram.'}
              </p>
              <p className={`${styles.text} ${styles.muted}`}>
                {isUz
                  ? "Kelajakda bu bo‘limni to‘liq dinamik sharhlar va reytinglar bilan boyitish mumkin."
                  : 'В дальнейшем этот раздел можно дополнить полноценной системой отзывов и рейтингов.'}
              </p>
            </aside>
          </div>
        </section>
      </div>
    </main>
  )
}

