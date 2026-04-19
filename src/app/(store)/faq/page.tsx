'use client'

import React from 'react'
import { useI18n } from '@/lib/i18n'
import styles from '../ContentPage.module.css'

export default function FaqPage() {
  const { lang } = useI18n()
  const isUz = lang === 'uz'

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.eyebrow}>Simpaty</div>
          <h1 className={styles.title}>FAQ</h1>
          <p className={styles.subtitle}>
            {isUz
              ? 'Buyurtma, yetkazib berish va o‘lcham bo‘yicha tez-tez beriladigan savollarga qisqa javoblar.'
              : 'Краткие ответы на частые вопросы о заказе, доставке и размерах.'}
          </p>
          <div className={styles.divider} />
        </header>

        <section className={styles.content}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {isUz ? 'Buyurtma qanday beriladi?' : 'Как оформить заказ?'}
            </h2>
            <p className={styles.text}>
              {isUz
                ? "Har bir mahsulot kartasida “Buyurtma berish” tugmasi mavjud. Forma orqali ismingiz va telefon raqamingizni qoldirasiz — menejerimiz siz bilan bog‘lanib, tafsilotlarni aniqlashtiradi."
                : 'На карточке товара есть кнопка «Заказать». Оставьте своё имя и номер телефона — наш менеджер свяжется с вами для уточнения деталей.'}
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {isUz ? 'Savat bormi?' : 'Есть ли корзина?'}
            </h2>
            <p className={styles.text}>
              {isUz
                ? "Hozircha buyurtmalar savatsiz, to‘g‘ridan-to‘g‘ri menejer orqali rasmiylashtiriladi. Bu sizga o‘lcham, rang va boshqa detallarni aniq kelishishga yordam beradi."
                : 'Сейчас заказы оформляются без корзины — напрямую через менеджера. Так мы можем точнее подобрать размер, цвет и обсудить все детали.'}
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {isUz ? 'Yetkazib berish qancha vaqt oladi?' : 'Сколько длится доставка?'}
            </h2>
            <p className={styles.text}>
              {isUz
                ? 'Odatda Toshkent bo‘yicha 1 kun, viloyatlar uchun esa 2–4 ish kuni. Batafsil maʼlumot uchun “Yetkazib berish” sahifasini ko‘ring.'
                : 'Обычно по Ташкенту доставка занимает 1 день, по регионам — 2–4 рабочих дня. Подробности смотрите на странице «Доставка».'}
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {isUz ? "O‘lchamni qanday tanlash mumkin?" : 'Как выбрать размер?'}
            </h2>
            <p className={styles.text}>
              {isUz
                ? "O‘z parametrlaringizni (ko‘krak, bel, son) o‘lchab, menejerimizga yuboring — biz sizga mos o‘lchamni tavsiya qilamiz. Shuningdek, “O‘lchamlar jadvali” sahifasi bilan tanishib chiqing."
                : 'Снимите основные мерки (грудь, талия, бёдра) и отправьте менеджеру — мы подскажем оптимальный размер. Также рекомендуем ознакомиться со страницей «Размерная сетка».'}
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {isUz ? 'Qaytarish imkoni bormi?' : 'Можно ли вернуть товар?'}
            </h2>
            <p className={styles.text}>
              {isUz
                ? 'Ayrim hollarda individual kelishuv asosida qaytarish yoki almashtirish mumkin. Batafsil shartlar “Qaytarish va almashtirish” sahifasida keltirilgan.'
                : 'В отдельных случаях возможен возврат или обмен по индивидуальной договорённости. Подробные условия указаны на странице «Возврат и обмен».'}
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

