'use client'

import React, { useTransition } from 'react'
import { updateOrderStatus } from '@/app/actions/admin'
import { OrderStatus } from '@prisma/client'

export function StatusUpdater({ orderId, currentStatus }: { orderId: string, currentStatus: OrderStatus }) {
  const [isPending, startTransition] = useTransition()

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as OrderStatus
    startTransition(() => {
      updateOrderStatus(orderId, newStatus)
    })
  }

  const statuses = [
    { value: 'PENDING', label: 'Kutilmoqda' },
    { value: 'PROCESSING', label: 'Jarayonda' },
    { value: 'SHIPPED', label: 'Yuborildi' },
    { value: 'DELIVERED', label: 'Yetkazildi' },
    { value: 'CANCELLED', label: 'Bekor qilindi' },
  ]

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING': return '#ffaa00'
      case 'PROCESSING': return '#0070f3'
      case 'SHIPPED': return '#7928ca'
      case 'DELIVERED': return '#00b400'
      case 'CANCELLED': return '#d32f2f'
      default: return '#555'
    }
  }

  return (
    <select
      value={currentStatus}
      onChange={handleStatusChange}
      disabled={isPending}
      style={{
        padding: '0.5rem',
        borderRadius: '4px',
        border: `1px solid ${getStatusColor(currentStatus)}`,
        color: getStatusColor(currentStatus),
        fontWeight: 600,
        backgroundColor: '#fff',
        cursor: isPending ? 'wait' : 'pointer'
      }}
    >
      {statuses.map(s => (
        <option key={s.value} value={s.value}>{s.label}</option>
      ))}
    </select>
  )
}
