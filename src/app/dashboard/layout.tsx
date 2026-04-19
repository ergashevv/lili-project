import type { ReactNode } from 'react'
import AdminLayout from '../admin/layout'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>
}
