import prisma from '@/lib/prisma'
import styles from './Dashboard.module.css'

export default async function DashboardPage() {
  const [orders, products, categories] = await Promise.all([
    prisma.order.count(),
    prisma.product.count(),
    prisma.category.count()
  ])

  return (
    <div>
      <h1 className={styles.title}>Boshqaruv Paneli (Dashboard)</h1>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Buyurtmalar</h3>
          <p className={styles.value}>{orders}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Mahsulotlar</h3>
          <p className={styles.value}>{products}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Kategoriyalar</h3>
          <p className={styles.value}>{categories}</p>
        </div>
      </div>
      
      <div className={styles.welcomeInfo}>
        <h2>Simpaty E-Commerce Xush Kelibsiz!</h2>
        <p>Chap tarafdagi menyudan kerakli bo&apos;limni tanlang. Kategoriyalarni yaratishingiz, mahsulot qo&apos;shishingiz hamda yangi tushgan buyurtmalarni boshqarishingiz mumkin.</p>
        <br/>
        <p><strong>Eslatma:</strong> Saytdagi ranglar dinamik tarzda Kategoriyalar bo&apos;limidan har bir kategoriya uchun (Asosiy rang va Qo&apos;shimcha rang) kiritilgan ranglar orqali avtomatik ishlaydi.</p>
      </div>
    </div>
  )
}
