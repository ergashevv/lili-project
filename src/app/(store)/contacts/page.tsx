'use client'

import React from 'react'
import { useI18n } from '@/lib/i18n'
import styles from '../ContentPage.module.css'

export default function ContactsPage() {
  const { lang } = useI18n()
  const isUz = lang === 'uz'

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.eyebrow}>Simpaty</div>
          <h1 className={styles.title}>
            {isUz ? 'Kontaktlar' : 'Контакты'}
          </h1>
          <p className={styles.subtitle}>
            {isUz
              ? "Savollar, buyurtmalar va hamkorlik bo‘yicha biz bilan qulay aloqa kanallari orqali bog‘laning."
              : 'По вопросам заказов, сотрудничества и консультаций свяжитесь с нами удобным для вас способом.'}
          </p>
          <div className={styles.divider} />
        </header>

        <section className={styles.content}>
          <div className={styles.twoColumn}>
            <div>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  {isUz ? 'Aloqa maʼlumotlari' : 'Контактные данные'}
                </h2>
                <p className={styles.text}>
                  {isUz
                    ? "Quyidagi kanallar orqali bizga yozishingiz yoki qo‘ng‘iroq qilishingiz mumkin. Menejerlarimiz buyurtma berish, o‘lcham tanlash va yetkazib berish bo‘yicha maslahat beradi."
                    : 'Вы можете написать или позвонить нам по следующим контактам. Наши менеджеры помогут с оформлением заказа, подбором размера и уточнением условий доставки.'}
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>
                    {isUz
                      ? 'Telefon / Telegram: +998 90 000 00 00'
                      : 'Телефон / Telegram: +998 90 000 00 00'}
                  </li>
                  <li className={styles.listItem}>
                    {isUz
                      ? 'Instagram: @simpaty.uz'
                      : 'Instagram: @simpaty.uz'}
                  </li>
                  <li className={styles.listItem}>
                    {isUz
                      ? 'Email: info@simpaty.uz'
                      : 'Email: info@simpaty.uz'}
                  </li>
                </ul>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  {isUz ? 'Ish vaqti' : 'Режим работы'}
                </h2>
                <p className={styles.text}>
                  {isUz
                    ? 'Onlayn buyurtmalar — haftaning 7 kuni 24/7. Menejerlarimiz sizga quyidagi vaqtda javob berishadi:'
                    : 'Онлайн-заказы принимаются 24/7. Менеджеры обрабатывают обращения и заказы в следующее время:'}
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>
                    {isUz
                      ? 'Dushanba–Yakshanba: 10:00 — 20:00'
                      : 'Понедельник–Воскресенье: 10:00 — 20:00'}
                  </li>
                </ul>
              </div>
            </div>

            <aside className={styles.card}>
              <h2 className={styles.sectionTitle}>
                {isUz ? 'Manzil (namuna)' : 'Адрес (пример)'}
              </h2>
              <p className={styles.text}>
                {isUz
                  ? "Toshkent shahri, markaziy hudud.\nAniq manzil va butik joylashuvi bo‘yicha maʼlumotlar alohida kelishiladi."
                  : 'Город Ташкент, центральный район.\nТочный адрес и локация шоурума/бутика оговариваются индивидуально.'}
              </p>
              <p className={`${styles.text} ${styles.muted}`}>
                {isUz
                  ? "Izoh: ushbu bo‘limda haqiqiy manzil va xarita havolasini joylashtirishingiz mumkin."
                  : 'Примечание: здесь вы можете разместить фактический адрес и ссылку на карту.'}
              </p>
            </aside>
          </div>
        </section>
      </div>
    </main>
  )
}

