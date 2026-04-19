'use client'

import React from 'react'
import { useI18n } from '@/lib/i18n'
import styles from '../(store)/ContentPage.module.css'

export default function TermsPage() {
  const { lang } = useI18n()
  const isUz = lang === 'uz'

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.eyebrow}>Simpaty</div>
          <h1 className={styles.title}>
            {isUz ? 'Ommaviy oferta (namuna)' : 'Публичная оферта (пример)'}
          </h1>
          <p className={styles.subtitle}>
            {isUz
              ? "Mazkur sahifada onlayn-do‘kon bilan xaridor o‘rtasidagi munosabatlarning umumiy tamoyillari keltirilgan. Yakuniy matnni yuridik maslahatchi bilan birgalikda ishlab chiqishingiz mumkin."
              : 'На этой странице приведены общие принципы взаимоотношений между интернет-магазином и покупателем. Окончательный текст рекомендуется согласовать с юридическим консультантом.'}
          </p>
          <div className={styles.divider} />
        </header>

        <section className={styles.content}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {isUz ? 'Umumiy qoidalar' : 'Общие положения'}
            </h2>
            <p className={styles.text}>
              {isUz
                ? "Saytdan foydalanish va buyurtma joylashtirish orqali foydalanuvchi mazkur shartlar bilan tanishgan va ularga rozilik bildirgan hisoblanadi."
                : 'Пользователь, совершая заказ на сайте, подтверждает, что ознакомлен с данными условиями и согласен с ними.'}
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {isUz ? 'Buyurtma va to‘lov' : 'Заказ и оплата'}
            </h2>
            <p className={styles.text}>
              {isUz
                ? 'Buyurtma menejer tomonidan tasdiqlangach, tomonlar o‘rtasida masofaviy savdo shartnomasi kuchga kiradi. To‘lov shakli va yetkazib berish shartlari individual ravishda kelishiladi.'
                : 'После подтверждения заказа менеджером между сторонами считается заключённым договор розничной купли-продажи. Способ оплаты и условия доставки согласуются индивидуально.'}
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {isUz ? 'Tomonlarning huquq va majburiyatlari' : 'Права и обязанности сторон'}
            </h2>
            <p className={styles.text}>
              {isUz
                ? "Do‘kon sifatli mahsulot yetkazib berishga intiladi, xaridor esa o‘z navbatida to‘lov majburiyatlarini o‘z vaqtida bajarishi lozim."
                : 'Магазин обязуется поставить качественный товар, а покупатель — своевременно произвести оплату и принять заказ.'}
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

