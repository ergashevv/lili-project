'use client'

import React from 'react'
import { useI18n } from '@/lib/i18n'
import styles from '../(store)/ContentPage.module.css'

export default function PrivacyPolicyPage() {
  const { lang } = useI18n()
  const isUz = lang === 'uz'

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.eyebrow}>Simpaty</div>
          <h1 className={styles.title}>
            {isUz ? 'Maxfiylik siyosati' : 'Политика конфиденциальности'}
          </h1>
          <p className={styles.subtitle}>
            {isUz
              ? "Ushbu sahifada Simpaty foydalanuvchi maʼlumotlarini qanday yig‘ishi va himoya qilishi haqida maʼlumot beriladi."
              : 'На этой странице описано, как Simpaty собирает и защищает персональные данные пользователей.'}
          </p>
          <div className={styles.divider} />
        </header>

        <section className={styles.content}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {isUz ? 'Yig‘iladigan maʼlumotlar' : 'Собираемые данные'}
            </h2>
            <p className={styles.text}>
              {isUz
                ? "Buyurtma berish jarayonida biz ism, telefon raqami, elektron pochta va yetkazib berish manzili kabi maʼlumotlarni so‘rashimiz mumkin. Ushbu maʼlumotlar faqat buyurtmani qabul qilish va aloqa uchun ishlatiladi."
                : 'При оформлении заказа мы можем запрашивать имя, номер телефона, электронную почту и адрес доставки. Эти данные используются исключительно для обработки заказа и связи с вами.'}
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {isUz ? 'Maʼlumotlarni saqlash' : 'Хранение данных'}
            </h2>
            <p className={styles.text}>
              {isUz
                ? "Foydalanuvchi maʼlumotlari uchinchi shaxslarga sotilmaydi yoki ijaraga berilmaydi. Zarurat tug‘ilganda texnik xizmat ko‘rsatuvchi hamkorlar bilan faqat buyurtmani qayta ishlash doirasida ulashilishi mumkin."
                : 'Персональные данные не продаются и не передаются третьим лицам в коммерческих целях. В отдельных случаях данные могут быть переданы техническим партнёрам исключительно для обработки заказов.'}
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {isUz ? 'Foydalanuvchi huquqlari' : 'Права пользователя'}
            </h2>
            <p className={styles.text}>
              {isUz
                ? "Siz o‘zingiz haqingizdagi maʼlumotlarni aniqlashtirish, yangilash yoki o‘chirish bo‘yicha biz bilan bog‘lanishingiz mumkin."
                : 'Вы можете обратиться к нам с запросом на уточнение, обновление или удаление своих персональных данных.'}
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

