// app/admin/(dashboard)/dashboard/page.tsx
import { Metadata } from 'next'
import AdminDashboard from '../../../../components/admin/AdminDashboard'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Admin dashboard overview',
}

export default function DashboardPage() {
  return <AdminDashboard />
}