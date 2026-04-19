'use client'

import React from 'react'
import { useI18n } from '@/lib/i18n'
import styles from '../ContentPage.module.css'

export default function SizeGuidePage() {
  const { lang } = useI18n()
  const isUz = lang === 'uz'

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.eyebrow}>Simpaty</div>
          <h1 className={styles.title}>
            {isUz ? "O‘lchamlar jadvali" : 'Размерная сетка'}
          </h1>
          <p className={styles.subtitle}>
            {isUz
              ? "To‘g‘ri o‘lcham tanlash — ideal siluet va qulaylik kaliti. Quyidagi tavsiyalar sizga mos libos topishda yordam beradi."
              : 'Правильно подобранный размер — залог идеального силуэта и комфорта. Следуйте рекомендациям ниже, чтобы подобрать подходящее изделие.'}
          </p>
          <div className={styles.divider} />
        </header>

        <section className={styles.content}>
          <div className={styles.twoColumn}>
            <div>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  {isUz ? "O‘lchamni qanday o‘lchash kerak?" : 'Как правильно снимать мерки?'}
                </h2>
                <p className={styles.text}>
                  {isUz
                    ? "O‘lchovlarni yupqa kiyim ustidan, metrani juda qattiq tortmasdan oling. Asosiy uchta parametrga eʼtibor bering:"
                    : 'Снимайте мерки по лёгкой одежде, не перетягивая сантиметровую ленту. Обратите внимание на три основных параметра:'}
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>
                    {isUz
                      ? "Ko‘krak aylanasi — eng bo‘rtib chiqqan nuqtalar bo‘ylab"
                      : 'Обхват груди — по наиболее выступающим точкам'}
                  </li>
                  <li className={styles.listItem}>
                    {isUz
                      ? "Bel aylanasi — eng ingichka qism bo‘ylab"
                      : 'Обхват талии — по самой узкой части'}
                  </li>
                  <li className={styles.listItem}>
                    {isUz
                      ? "Sonlar aylanasi — eng keng qism bo‘ylab"
                      : 'Обхват бёдер — по самой широкой части'}
                  </li>
                </ul>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  {isUz ? "O‘lcham tavsiyasi (umumiy)" : 'Общая рекомендация по размерам'}
                </h2>
                <p className={styles.text}>
                  {isUz
                    ? "Simpaty kolleksiyalarida o‘lchamlar asosan S, M, L, XL diapazonida. Har bir model uchun aniq o‘lcham bo‘yicha menejerlarimiz qo‘shimcha tavsiya berishi mumkin."
                    : 'В коллекциях Simpaty размеры, как правило, представлены в диапазоне S, M, L, XL. По каждому изделию менеджер может подсказать, если модель маломерит или полномерная.'}
                </p>
              </div>
            </div>

            <aside className={styles.card}>
              <h2 className={styles.sectionTitle}>
                {isUz ? 'Qo‘shimcha maslahatlar' : 'Дополнительные советы'}
              </h2>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  {isUz
                    ? "Ikki o‘lcham orasida ikkilanayotgan bo‘lsangiz, figura turiga qarab menejer bilan maslahatlashgan holda tanlang."
                    : 'Если сомневаетесь между двумя размерами — выбирайте с учётом особенностей фигуры и советов менеджера.'}
                </li>
                <li className={styles.listItem}>
                  {isUz
                    ? 'Siluet juda yopishib turishini xohlamasangiz, yarmi kattaroq o‘lchamni ko‘rib chiqing.'
                    : 'Если не любите слишком обтягивающий силуэт — рассмотрите вариант на полразмера свободнее.'}
                </li>
                <li className={styles.listItem}>
                  {isUz
                    ? "Buyurtma berishdan oldin bo‘yingiz va odatdagi kiyim o‘lchamingizni yozib yuborsangiz, biz mos variantni tavsiya qilamiz."
                    : 'Перед оформлением заказа можете указать свой рост и привычный размер одежды — мы подскажем оптимальный вариант.'}
                </li>
              </ul>
            </aside>
          </div>
        </section>
      </div>
    </main>
  )
}

