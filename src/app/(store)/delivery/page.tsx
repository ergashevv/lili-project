'use client'

import React from 'react'
import { useI18n } from '@/lib/i18n'
import styles from '../ContentPage.module.css'

export default function DeliveryPage() {
  const { lang } = useI18n()
  const isUz = lang === 'uz'

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.eyebrow}>Simpaty</div>
          <h1 className={styles.title}>
            {isUz ? 'Yetkazib berish va to‘lov' : 'Доставка и оплата'}
          </h1>
          <p className={styles.subtitle}>
            {isUz
              ? "Buyurtmangizni butun O‘zbekiston bo‘ylab ishonchli va qulay tarzda yetkazib beramiz."
              : 'Мы организуем удобную и надёжную доставку заказов по всему Узбекистану.'}
          </p>
          <div className={styles.divider} />
        </header>

        <section className={styles.content}>
          <div className={styles.twoColumn}>
            <div>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  {isUz ? 'Toshkent bo‘ylab yetkazib berish' : 'Доставка по Ташкенту'}
                </h2>
                <p className={styles.text}>
                  {isUz
                    ? "Toshkent shahri bo‘yicha yetkazib berish kuryer xizmati orqali amalga oshiriladi. Aniq narx va vaqt manzilga qarab menejer tomonidan aniqlashtiriladi."
                    : 'По городу Ташкент доставка осуществляется курьерской службой. Точная стоимость и время доставки зависят от района и уточняются менеджером.'}
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>
                    {isUz
                      ? 'O‘rtacha yetkazib berish vaqti: 1 kun'
                      : 'Средний срок доставки: 1 день'}
                  </li>
                  <li className={styles.listItem}>
                    {isUz
                      ? 'Yetkazib berish narxi: hududga qarab kelishiladi'
                      : 'Стоимость доставки: по договорённости, в зависимости от района'}
                  </li>
                </ul>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  {isUz ? 'Viloyatlarga yetkazib berish' : 'Доставка по регионам'}
                </h2>
                <p className={styles.text}>
                  {isUz
                    ? "Viloyatlarga yetkazib berish ishonchli kargo xizmati orqali amalga oshiriladi. Buyurtma tasdiqlangach, jo‘natma raqami sizga yuboriladi."
                    : 'В регионы Узбекистана отправка осуществляется надёжными транспортными и курьерскими службами. После отправки вы получите трек-номер посылки.'}
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>
                    {isUz
                      ? 'O‘rtacha yetkazib berish vaqti: 2–4 ish kuni'
                      : 'Средний срок доставки: 2–4 рабочих дня'}
                  </li>
                  <li className={styles.listItem}>
                    {isUz
                      ? "Yetkazib berish narxi — kargo xizmatining amaldagi tariflari bo‘yicha"
                      : 'Стоимость доставки — по действующим тарифам транспортной компании'}
                  </li>
                </ul>
              </div>
            </div>

            <aside className={styles.card}>
              <h2 className={styles.sectionTitle}>
                {isUz ? 'To‘lov turlari' : 'Способы оплаты'}
              </h2>
              <p className={styles.text}>
                {isUz
                  ? 'Quyidagi to‘lov shakllari mavjud (aniq variantlar menejer bilan kelishiladi):'
                  : 'Возможны следующие варианты оплаты (точный перечень согласуется с менеджером):'}
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  {isUz ? 'Naqd to‘lov kuryerga' : 'Наличный расчёт курьеру'}
                </li>
                <li className={styles.listItem}>
                  {isUz
                    ? 'Bank kartasi orqali to‘lov'
                    : 'Оплата банковской картой'}
                </li>
                <li className={styles.listItem}>
                  {isUz
                    ? 'Onlayn to‘lov xizmatlari (masalan, Click / Payme) — kelishilgan holda'
                    : 'Онлайн-сервисы оплаты (например, Click / Payme) — по согласованию'}
                </li>
              </ul>
              <p className={`${styles.text} ${styles.muted}`}>
                {isUz
                  ? "Muhim: ayrim hollarda buyurtma uchun qisman yoki to‘liq oldindan to‘lov talab qilinishi mumkin."
                  : 'Важно: в отдельных случаях может потребоваться частичная или полная предоплата заказа.'}
              </p>
            </aside>
          </div>
        </section>
      </div>
    </main>
  )
}

