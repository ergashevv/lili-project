import prisma from '@/lib/prisma'
import { StatusUpdater } from './StatusUpdater'
import { OrderDeleteBtn } from './OrderDeleteBtn'
import styles from '../AdminForms.module.css'
import { OrderStatus, User, Product } from '@prisma/client'

interface AdminOrder {
  id: string
  createdAt: Date
  clientName: string
  clientPhone: string
  address: string | null
  selectedColor: string | null
  selectedSize: string | null
  status: OrderStatus
  product: Product
  user: User | null
}

export default async function AdminOrdersPage() {
  const rawOrders = await prisma.order.findMany({
    include: { product: true, user: true },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  const orders = rawOrders as unknown as AdminOrder[]

  return (
    <div className={styles.container} style={{ maxWidth: '1300px' }}>
      <div className={styles.listHeader}>
        <h1 className={styles.title}>Buyurtmalar</h1>
        <span style={{ color: '#6B7280', fontSize: '0.95rem' }}>
          Jami: <strong>{orders.length}</strong> ta buyurtma
        </span>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Vaqt</th>
            <th>Mijoz Ismi</th>
            <th>Telefon</th>
            <th>Mahsulot</th>
            <th>Rang / O&apos;lcham</th>
            <th>Manzil</th>
            <th>Status</th>
            <th>O&apos;chirish</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td><span style={{fontSize: '0.8rem', color: '#999', fontFamily: 'monospace'}}>#{o.id.slice(-6).toUpperCase()}</span></td>
              <td style={{ fontSize: '0.85rem' }}>{new Date(o.createdAt).toLocaleString('uz-UZ')}</td>
              <td><strong>{o.clientName}</strong></td>
              <td>
                <a href={`tel:${o.clientPhone}`} style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 600 }}>
                  {o.clientPhone}
                </a>
              </td>
              <td>
                <a href={`/product/${o.product.slug}`} target="_blank" style={{color: 'var(--primary-color)', fontWeight: 500}}>
                  {o.product.nameUz}
                </a>
              </td>
              <td style={{ fontSize: '0.85rem' }}>
                {o.selectedColor && <span className={styles.tag}>{o.selectedColor}</span>}
                {o.selectedSize && <span className={styles.tag} style={{background: '#f3f4f6', color: '#374151'}}>{o.selectedSize}</span>}
                {!o.selectedColor && !o.selectedSize && '-'}
              </td>
              <td style={{maxWidth: '150px', fontSize: '0.9rem'}}>{o.address || '-'}</td>
              <td>
                <StatusUpdater orderId={o.id} currentStatus={o.status as OrderStatus} />
              </td>
              <td>
                <OrderDeleteBtn id={o.id} />
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan={8} style={{textAlign: 'center', padding: '2rem'}}>Buyurtmalar topilmadi.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
