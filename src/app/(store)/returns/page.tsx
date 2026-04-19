'use client'

import React from 'react'
import { useI18n } from '@/lib/i18n'
import styles from '../ContentPage.module.css'

export default function ReturnsPage() {
  const { lang } = useI18n()
  const isUz = lang === 'uz'

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.eyebrow}>Simpaty</div>
          <h1 className={styles.title}>
            {isUz ? 'Qaytarish va almashtirish' : 'Возврат и обмен'}
          </h1>
          <p className={styles.subtitle}>
            {isUz
              ? 'Sizning qulayligingiz va ishonchingiz biz uchun muhim. Shuning uchun qaytarish va almashtirish tartibini aniq va tushunarli qildik.'
              : 'Нам важно ваше доверие и комфорт, поэтому мы сделали условия возврата и обмена максимально прозрачными.'}
          </p>
          <div className={styles.divider} />
        </header>

        <section className={styles.content}>
          <div className={styles.twoColumn}>
            <div>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  {isUz ? 'Umumiy qoidalar' : 'Общие условия'}
                </h2>
                <p className={styles.text}>
                  {isUz
                    ? "Mahsulotni qaytarish yoki almashtirish imkoniyati amaldagi qonunchilikka va do‘kon siyosatiga muvofiq individual ravishda kelishib olinadi."
                    : 'Возможность возврата или обмена товара обсуждается индивидуально в соответствии с действующим законодательством и политикой магазина.'}
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>
                    {isUz
                      ? 'Mahsulot asl holatida, yorliqlari saqlangan bo‘lishi lozim'
                      : 'Товар должен быть в первоначальном виде с сохранёнными бирками и ярлыками'}
                  </li>
                  <li className={styles.listItem}>
                    {isUz
                      ? "Kiyim kiyib ko‘rilgan bo‘lishi mumkin, biroq foydalanish izlari bo‘lmasligi kerak"
                      : 'Допустима примерка, но не должно быть следов носки'}
                  </li>
                  <li className={styles.listItem}>
                    {isUz
                      ? 'Check / buyurtma raqami yoki tasdiqlovchi xabar bo‘lishi kerak'
                      : 'Необходимо наличие чека / номера заказа или подтверждающего сообщения'}
                  </li>
                </ul>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  {isUz ? 'Qaytarib bo‘lmaydigan tovarlar' : 'Товары, не подлежащие возврату'}
                </h2>
                <p className={styles.text}>
                  {isUz
                    ? 'Sanitariya-gigiyena talablari va mahsulot xususiyatlari tufayli ayrim turdagi tovarlarni qaytarish yoki almashtirish imkoni bo‘lmasligi mumkin, masalan:'
                    : 'По санитарным требованиям и особенностям товара некоторые категории могут не подлежать возврату или обмену, например:'}
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>
                    {isUz ? 'Aksessuarlar va biroz buyumlar' : 'Аксессуары и бижутерия'}
                  </li>
                  <li className={styles.listItem}>
                    {isUz
                      ? 'Buyurtmaga ko‘ra tikilgan yoki o‘zgartirilgan liboslar'
                      : 'Изделия, пошитые или изменённые под индивидуальные мерки'}
                  </li>
                </ul>
              </div>
            </div>

            <aside className={styles.card}>
              <h2 className={styles.sectionTitle}>
                {isUz ? 'Qanday murojaat qilish kerak?' : 'Как оформить возврат?'}
              </h2>
              <p className={styles.text}>
                {isUz
                  ? 'Qaytarish yoki almashtirishni muhokama qilish uchun avvalo biz bilan bog‘laning:'
                  : 'Чтобы обсудить возможность возврата или обмена, сначала свяжитесь с нами:'}
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  {isUz
                    ? 'Telegram / telefon orqali buyurtma raqamini yuboring'
                    : 'Отправьте номер заказа через Telegram или по телефону'}
                </li>
                <li className={styles.listItem}>
                  {isUz
                    ? 'Mahsulot bilan bog‘liq sababni qisqacha yozib yuboring'
                    : 'Кратко опишите причину возврата или обмена'}
                </li>
              </ul>
              <p className={`${styles.text} ${styles.muted}`}>
                {isUz
                  ? "Aniq muddatlar va shartlar har bir holatda alohida kelishiladi. Sahifada keltirilgan maʼlumotlar umumiy tanishish uchun mo‘ljallangan."
                  : 'Конкретные сроки и условия оговариваются индивидуально. Информация на странице носит ознакомительный характер.'}
              </p>
            </aside>
          </div>
        </section>
      </div>
    </main>
  )
}

