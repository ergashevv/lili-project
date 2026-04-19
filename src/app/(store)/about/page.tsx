'use client'

import React from 'react'
import { useI18n } from '@/lib/i18n'
import styles from '../ContentPage.module.css'

export default function AboutPage() {
  const { lang } = useI18n()
  const isUz = lang === 'uz'

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.eyebrow}>Simpaty</div>
          <h1 className={styles.title}>
            {isUz ? 'Brend haqida' : 'О бренде Simpaty'}
          </h1>
          <p className={styles.subtitle}>
            {isUz
              ? 'Simpaty — nafislik va ishonch uyg‘unligi. Biz har bir libos orqali ayolning ichki kuchi va individualligini ochishga intilamiz.'
              : 'Simpaty — это сочетание утончённости и уверенности. В каждом изделии мы стремимся подчеркнуть внутреннюю силу и индивидуальность женщины.'}
          </p>
          <div className={styles.divider} />
        </header>

        <section className={styles.content}>
          <div className={styles.twoColumn}>
            <div>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  {isUz ? 'Falsafamiz' : 'Наша философия'}
                </h2>
                <p className={styles.text}>
                  {isUz
                    ? "Simpaty kolleksiyalari zamonaviy shahar ayoli uchun yaratilgan. Biz uchun muhim jihat — libos nafaqat chiroyli ko‘rinishi, balki o‘zini ishonchli, qulay va o‘ziga xos his qilishidir."
                    : 'Коллекции Simpaty созданы для современной городской женщины. Для нас важно, чтобы одежда не только красиво смотрелась, но и дарила ощущение уверенности, комфорта и собственной уникальности.'}
                </p>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  {isUz ? 'Matolar va tikuv sifati' : 'Ткани и посадка'}
                </h2>
                <p className={styles.text}>
                  {isUz
                    ? "Har bir model uchun mato tanlash jarayoniga alohida eʼtibor beramiz. Siluetlar aniq o‘ylangan, o‘lchamlar esa Markaziy Osiyo ayollarining real parametrlariga moslashtirilgan."
                    : 'Мы уделяем особое внимание выбору тканей для каждой модели. Силуэты тщательно продуманы, а посадка адаптирована под реальные параметры женщин Центральной Азии.'}
                </p>
              </div>
            </div>

            <aside className={styles.card}>
              <h2 className={styles.sectionTitle}>
                {isUz ? 'Qayerda kiyish mumkin?' : 'Для каких случаев?'}
              </h2>
              <p className={styles.text}>
                {isUz
                  ? 'Simpaty liboslari quyidagi holatlar uchun ideal tanlov bo‘la oladi:'
                  : 'Образы Simpaty идеально подходят для следующих случаев:'}
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  {isUz ? 'To‘y va ziyofatlar' : 'Свадьбы и вечерние мероприятия'}
                </li>
                <li className={styles.listItem}>
                  {isUz ? 'Ish uchrashuvlari va biznes tadbirlar' : 'Деловые встречи и бизнес-мероприятия'}
                </li>
                <li className={styles.listItem}>
                  {isUz ? 'Fotosessiya va maxsus tadbirlar' : 'Фотосессии и особые события'}
                </li>
                <li className={styles.listItem}>
                  {isUz ? 'Kundalik nafis ko‘rinish' : 'Ежедневные элегантные образы'}
                </li>
              </ul>

              <div className={styles.badgeRow}>
                <span className={styles.badge}>
                  {isUz ? 'Premium sifat' : 'Премиальное качество'}
                </span>
                <span className={styles.badge}>
                  {isUz ? 'Cheklangan kolleksiyalar' : 'Лимитированные коллекции'}
                </span>
                <span className={styles.badge}>
                  {isUz ? 'Mahalliy brend' : 'Локальный бренд'}
                </span>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  )
}

